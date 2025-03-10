import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateReservationDto } from '../dtos/create-reservation.dto';
import {
    CreateReservationResponseDto,
    ReservationResponseDto,
    ReservationWithRelationsResponseDto,
    ReservationWithResourceResponseDto,
} from '../dtos/reservation-response.dto';
import { ParticipantsType, ReservationStatus } from '@libs/enums/reservation-type.enum';
import { DataSource, FindOptionsWhere, LessThan, MoreThan, In, Between } from 'typeorm';
import { DateUtil } from '@libs/utils/date.util';
import { ReservationService } from '../services/reservation.service';
import { ParticipantService } from '../services/participant.service';
import { ReservationParticipant, Reservation } from '@libs/entities';
import { ResourceType } from '@libs/enums/resource-type.enum';
import {
    UpdateReservationCcReceipientDto,
    UpdateReservationParticipantsDto,
    UpdateReservationStatusDto,
    UpdateReservationTimeDto,
    UpdateReservationTitleDto,
} from '../dtos/update-reservation.dto';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { User } from '@libs/entities';
@Injectable()
export class ReservationUsecase {
    constructor(
        private readonly reservationService: ReservationService,
        private readonly participantService: ParticipantService,
        private readonly dataSource: DataSource,
    ) {}

    async makeReservation(user: User, createDto: CreateReservationDto): Promise<CreateReservationResponseDto> {
        const conflicts = await this.reservationService.findConflictingReservations(
            createDto.resourceId,
            DateUtil.parse(createDto.startDate).format(),
            DateUtil.parse(createDto.endDate).format(),
        );

        if (conflicts.length > 0) {
            throw new BadRequestException('Reservation time conflict');
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const reservation = this.reservationService.create(createDto);

            const savedReservation = await this.reservationService.save(reservation, { queryRunner });
            // Schedule 생성
            // const scheduleDates = ScheduleUtils.createScheduleDates(createDto.startDate, createDto.endDate);
            // console.log(scheduleDates);
            // const savedSchedules = await Promise.all(
            //     scheduleDates.map((scheduleDate) => {
            //         const schedule = new Schedule({
            //             reservationId: savedReservation.reservationId!,
            //             ...scheduleDate,
            //         });
            //         return this.scheduleRepository.save(schedule, { queryRunner });
            //     }),
            // );

            // 참가자 정보 저장
            await Promise.all([
                this.participantService.save(
                    {
                        reservationId: savedReservation.reservationId!,
                        employeeId: user.employeeId,
                        type: ParticipantsType.RESERVER,
                    } as ReservationParticipant,
                    { queryRunner },
                ),
                // ...createDto.reserverIds.map((employeeId) =>
                //     this.participantService.save(
                //         {
                //             reservationId: savedReservation.reservationId!,
                //             employeeId,
                //             type: ParticipantsType.RESERVER,
                //         } as ReservationParticipant,
                //         { queryRunner },
                //     ),
                // ),
                ...createDto.participantIds.map((employeeId) =>
                    this.participantService.save(
                        {
                            reservationId: savedReservation.reservationId!,
                            employeeId,
                            type: ParticipantsType.PARTICIPANT,
                        } as ReservationParticipant,
                        { queryRunner },
                    ),
                ),
            ]);

            await queryRunner.commitTransaction();
            return {
                reservationId: savedReservation.reservationId,
            };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async findReservationDetail(reservationId: string): Promise<ReservationWithRelationsResponseDto> {
        const reservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: [
                'resource',
                'resource.vehicleInfo',
                'resource.meetingRoomInfo',
                'resource.accommodationInfo',
                'participants',
                'participants.employee',
            ],
        });

        const reservationResponseDto = new ReservationWithRelationsResponseDto(reservation);

        return reservationResponseDto;
    }

    async findMyReservationList(
        employeeId: string,
        startDate?: string,
        resourceType?: ResourceType,
    ): Promise<ReservationWithRelationsResponseDto[]> {
        const where: FindOptionsWhere<Reservation> = { participants: { employeeId, type: ParticipantsType.RESERVER } };
        if (startDate) {
            where.startDate = Between(startDate + ' 00:00:00', startDate + ' 23:59:59');
        }
        if (resourceType) {
            where.resource = {
                type: resourceType as ResourceType,
            };
        }
        const reservations = await this.reservationService.findAll({
            where,
        });

        const reservationWithParticipants = await this.reservationService.findAll({
            where: {
                reservationId: In(reservations.map((r) => r.reservationId)),
            },
            relations: ['resource', 'participants', 'participants.employee'],
        });
        return reservationWithParticipants.map((reservation) => new ReservationWithRelationsResponseDto(reservation));
    }

    async findReservationList(
        startDate?: string,
        endDate?: string,
        resourceType?: ResourceType,
        resourceId?: string,
        status?: string[],
    ): Promise<ReservationWithResourceResponseDto[]> {
        if (startDate && endDate && startDate > endDate) {
            throw new BadRequestException('Start date must be before end date');
        }
        if (status && status.filter((s) => ReservationStatus[s]).length === 0) {
            throw new BadRequestException('Invalid status');
        }
        const regex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
        let where: FindOptionsWhere<Reservation> = {};
        if (status && status.length > 0) {
            where.status = In(status);
        }
        if (resourceType) {
            where.resource = {
                type: resourceType as ResourceType,
            };
        }
        if (resourceId) {
            where.resource = {
                resourceId,
            };
        }
        if (startDate && endDate) {
            // 예약 기간이 검색 범위와 겹치는 경우를 찾음
            // (예약 시작일 <= 검색 종료일) AND (예약 종료일 >= 검색 시작일)
            where = {
                ...where,
                startDate: LessThan(regex.test(endDate) ? endDate : endDate + ' 23:59:59'),
                endDate: MoreThan(regex.test(startDate) ? startDate : startDate + ' 00:00:00'),
            };
        }
        if (!startDate && !endDate) {
            const thisMonth = DateUtil.format(new Date(), 'YYYY-MM');
            const startDate = `${thisMonth}-01 00:00:00`;
            const endDate = `${thisMonth}-31 23:59:59`;

            where = {
                ...where,
                startDate: MoreThan(startDate),
                endDate: LessThan(endDate),
            };
        }

        const reservations = await this.reservationService.findAll({ where, relations: ['resource'] });

        const reservationResponseDtos = reservations.map(
            (reservation) => new ReservationWithResourceResponseDto(reservation),
        );
        return reservationResponseDtos;
    }

    async updateTitle(
        reservationId: string,
        updateDto: UpdateReservationTitleDto,
        repositoryOptions?: RepositoryOptions,
    ): Promise<ReservationResponseDto> {
        const reservation = await this.reservationService.findOne({ where: { reservationId } });
        if (!reservation) {
            throw new NotFoundException('Reservation not found');
        }

        const updatedReservation = await this.reservationService.update(reservationId, updateDto, repositoryOptions);
        return new ReservationResponseDto(updatedReservation);
    }

    async updateTime(reservationId: string, updateDto: UpdateReservationTimeDto): Promise<ReservationResponseDto> {
        const reservation = await this.reservationService.findOne({ where: { reservationId } });
        if (!reservation) {
            throw new NotFoundException('Reservation not found');
        }

        const updatedReservation = await this.reservationService.update(reservationId, updateDto);
        return new ReservationResponseDto(updatedReservation);
    }

    async updateStatus(
        reservationId: string,
        updateDto: UpdateReservationStatusDto,
        employeeId: string,
        isAdmin: boolean,
    ): Promise<ReservationResponseDto> {
        const reservation = await this.reservationService.findOne({ where: { reservationId } });
        if (!reservation) {
            throw new NotFoundException('Reservation not found');
        }

        const reserver = await this.participantService.findOne({
            where: { reservationId, type: ParticipantsType.RESERVER },
        });
        const isMyReservation = reserver?.employeeId === employeeId;

        if (isMyReservation || isAdmin) {
            const updatedReservation = await this.reservationService.update(reservationId, updateDto);
            return new ReservationResponseDto(updatedReservation);
        }

        throw new ForbiddenException('You are not authorized to update this reservation');
    }

    async updateParticipants(
        reservationId: string,
        updateDto: UpdateReservationParticipantsDto,
    ): Promise<ReservationResponseDto> {
        // 기존 참가자 조회
        const participants = await this.participantService.findAll({ where: { reservationId } });

        // 기존 참가자 삭제
        await Promise.all(participants.map((participant) => this.participantService.delete(participant.participantId)));

        // 새로운 참가자 저장
        await Promise.all(
            updateDto.participantIds.map((employeeId) =>
                this.participantService.save({
                    reservationId,
                    employeeId,
                    type: ParticipantsType.PARTICIPANT,
                } as ReservationParticipant),
            ),
        );

        const updatedReservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: ['participants'],
        });
        return new ReservationResponseDto(updatedReservation);
    }

    async updateCcReceipient(
        reservationId: string,
        updateDto: UpdateReservationCcReceipientDto,
    ): Promise<ReservationResponseDto> {
        // 기존 수신참조자 조회
        const ccReceipients = await this.participantService.findAll({ where: { reservationId } });

        // 기존 수신참조자 삭제
        await Promise.all(
            ccReceipients.map((ccReceipient) => this.participantService.delete(ccReceipient.participantId)),
        );

        // 새로운 수신참조자 저장
        await Promise.all(
            updateDto.ccReceipientIds.map((employeeId) =>
                this.participantService.save({
                    reservationId,
                    employeeId,
                    type: ParticipantsType.CC_RECEIPIENT,
                } as ReservationParticipant),
            ),
        );

        const updatedReservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: ['participants'],
        });
        return new ReservationResponseDto(updatedReservation);
    }
}
