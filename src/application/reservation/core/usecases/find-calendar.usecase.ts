import { Injectable } from '@nestjs/common';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { In, Raw } from 'typeorm';
import { CalendarResponseDto, ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { DateUtil } from '@libs/utils/date.util';
import { ReservationStatus, ParticipantsType } from '@libs/enums/reservation-type.enum';
import { Employee } from '@libs/entities/employee.entity';
import { DomainNotificationService } from '@src/domain/notification/notification.service';
import { ReservationQueryDto } from '../dtos/reservaion-query.dto';

@Injectable()
export class FindCalendarUsecase {
    constructor(
        private readonly reservationService: DomainReservationService,
        private readonly notificationService: DomainNotificationService,
    ) {}

    async execute(user: Employee, query: ReservationQueryDto): Promise<CalendarResponseDto> {
        console.time('FindCalendarUsecase');
        const { startDate, endDate, resourceType, isMine, isMySchedules } = query;
        const startDateObj = DateUtil.date(startDate).toDate();
        const endDateObj = DateUtil.date(endDate).toDate();

        // TODO: 추가 최적화 옵션들
        // 1. Redis 캐싱: 자주 조회되는 예약 데이터 캐싱 (TTL: 5분)
        // 2. 페이지네이션: 대량 데이터 처리시 청크 단위로 처리
        // 3. DB 인덱스: (start_date, status), (employee_id, is_read) 인덱스 확인

        const dateCondition = Raw(
            (alias) =>
                `(${alias} BETWEEN :startDateObj AND :endDateObj OR
              "Reservation"."endDate" BETWEEN :startDateObj AND :endDateObj OR
              (${alias} <= :startDateObj AND "Reservation"."endDate" >= :endDateObj))`,
            { startDateObj, endDateObj },
        );
        let participantCondition = {};
        if (!!isMine && !isMySchedules) {
            participantCondition = { participants: { employeeId: user.employeeId, type: ParticipantsType.RESERVER } };
        } else if (!isMine && !isMySchedules) {
            participantCondition = {};
        } else {
            participantCondition = { participants: { employeeId: user.employeeId } };
        }
        const where = {
            startDate: dateCondition,
            status: In([ReservationStatus.PENDING, ReservationStatus.CONFIRMED, ReservationStatus.CLOSED]),
            ...(resourceType ? { resource: { type: resourceType } } : {}),
            ...participantCondition,
        };

        // 병렬 처리로 성능 개선: 85ms + 139ms → ~139ms (60% 개선 예상)
        console.time('parallel-queries');
        const [reservations, notis] = await Promise.all([
            this.reservationService.findAll({
                where: where,
                relations: ['resource', 'participants', 'participants.employee'],
                order: {
                    startDate: 'ASC',
                },
                select: {
                    reservationId: true,
                    startDate: true,
                    endDate: true,
                    title: true,
                    status: true,
                    resource: {
                        resourceId: true,
                        name: true,
                        type: true,
                    },
                    participants: {
                        employeeId: true,
                        type: true,
                        employee: {
                            employeeId: true,
                            name: true,
                        },
                    },
                },
                withDeleted: true,
            }),
            this.notificationService.findAll({
                where: {
                    employees: {
                        employeeId: user.employeeId,
                        isRead: false,
                    },
                },
                relations: ['employees'],
            }),
        ]);
        console.timeEnd('parallel-queries');

        console.time('map');
        const map = new Map();
        notis.forEach((noti) => {
            if (!map.has(noti.notificationData.reservationId)) {
                map.set(noti.notificationData.reservationId, true);
            }
        });
        console.timeEnd('map');

        console.time('map2');

        // 타임존 적용한 효율적인 날짜 포맷팅
        const formatter = new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Seoul',
            hour12: false,
        });

        const formatDate = (date: Date | string) => {
            if (!date) return undefined;
            const dateObj = typeof date === 'string' ? new Date(date) : date;

            // 한 번의 formatToParts 호출로 모든 부분 가져오기
            const parts = formatter.formatToParts(dateObj);

            // parts를 객체로 변환하여 빠른 접근
            const partsObj: Record<string, string> = {};
            for (const part of parts) {
                partsObj[part.type] = part.value;
            }

            return `${partsObj.year}-${partsObj.month}-${partsObj.day} ${partsObj.hour}:${partsObj.minute}:${partsObj.second}`;
        };

        const reservationsWithNotifications = reservations.map((reservation) => {
            // filter 2번 → 1번 순회로 최적화
            const participants = reservation.participants || [];
            const reservers = [];
            const participantsOnly = [];

            for (const participant of participants) {
                if (participant.type === ParticipantsType.RESERVER) {
                    reservers.push(participant);
                } else if (participant.type === ParticipantsType.PARTICIPANT) {
                    participantsOnly.push(participant);
                }
            }

            return {
                reservationId: reservation.reservationId,
                title: reservation.title,
                startDate: formatDate(reservation.startDate),
                endDate: formatDate(reservation.endDate),
                status: reservation.status,
                resource: reservation.resource,
                reservers,
                participants: participantsOnly,
                hasUnreadNotification: map.has(reservation.reservationId),
            };
        });
        console.timeEnd('map2');

        console.timeEnd('FindCalendarUsecase');
        return {
            reservations: reservationsWithNotifications,
        };
    }
}
