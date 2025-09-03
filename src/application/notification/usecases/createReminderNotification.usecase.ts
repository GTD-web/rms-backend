import { Injectable } from '@nestjs/common';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { DateUtil } from '@libs/utils/date.util';
import { CreateNotificationDataDto, CreateNotificationDto } from '../dtos/create-notification.dto';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { ResourceType } from '@libs/enums/resource-type.enum';

@Injectable()
export class CreateReminderNotificationUsecase {
    constructor(private readonly reservationService: DomainReservationService) {}

    async execute(createNotificationDatatDto: CreateNotificationDataDto): Promise<CreateNotificationDto> {
        const now = DateUtil.now().toDate();
        const reservation = await this.reservationService.findOne({
            where: {
                reservationId: createNotificationDatatDto.reservationId,
            },
        });
        const diffInMilliseconds = reservation.startDate.getTime() - now.getTime();
        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

        const days = Math.floor(diffInMinutes / (24 * 60));
        const hours = Math.floor((diffInMinutes % (24 * 60)) / 60);
        const minutes = diffInMinutes % 60;

        const parts: string[] = [];
        if (diffInMilliseconds > 0) {
            switch (createNotificationDatatDto.resourceType) {
                case ResourceType.MEETING_ROOM:
                    parts.push('회의 시작까지');
                    break;
                case ResourceType.VEHICLE:
                    parts.push('차량 이용 시작까지');
                    break;
                case ResourceType.ACCOMMODATION:
                    parts.push('입실 까지');
                    break;
                case ResourceType.EQUIPMENT:
                    parts.push('장비 이용 시작까지');
                    break;
            }

            if (days > 0) {
                parts.push(`${days}일`);
            }
            if (hours > 0) {
                parts.push(`${hours}시간`);
            }
            if (minutes > 0 || parts.length === 0) {
                parts.push(`${minutes}분`);
            }

            parts.push('남았습니다.');
        } else {
            switch (createNotificationDatatDto.resourceType) {
                case ResourceType.MEETING_ROOM:
                    parts.push('회의 참여 알림');
                    break;

                case ResourceType.VEHICLE:
                    parts.push('차량 탑승 알림');
                    break;

                case ResourceType.ACCOMMODATION:
                    parts.push('입실 알림');
                    break;

                case ResourceType.EQUIPMENT:
                    parts.push('장비 이용 알림');
                    break;
            }
        }

        const timeDifferencePhrase = parts.join(' ');

        return {
            title: `[${createNotificationDatatDto.reservationTitle}]\n${timeDifferencePhrase}`,
            body: createNotificationDatatDto.reservationDate,
            notificationType: NotificationType.RESERVATION_DATE_UPCOMING,
            notificationData: createNotificationDatatDto,
            createdAt: DateUtil.now().format('YYYY-MM-DD HH:mm'),
            isSent: true,
        };
    }
}
