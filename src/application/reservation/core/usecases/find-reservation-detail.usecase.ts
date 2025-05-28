import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { Employee } from '@libs/entities';
import { ERROR_MESSAGE } from '@libs/constants/error-message';

@Injectable()
export class FindReservationDetailUsecase {
    constructor(private readonly reservationService: DomainReservationService) {}

    async execute(user: Employee, reservationId: string): Promise<ReservationWithRelationsResponseDto> {
        const reservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: [
                'resource',
                'resource.vehicleInfo',
                'resource.meetingRoomInfo',
                'resource.accommodationInfo',
                'participants',
                'participants.employee',
                'reservationVehicles',
            ],
            withDeleted: true,
        });

        if (!reservation) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESERVATION.NOT_FOUND);
        }

        const reservationResponseDto = new ReservationWithRelationsResponseDto(reservation);
        reservationResponseDto.isMine = reservationResponseDto.reservers.some(
            (reserver) => reserver.employeeId === user.employeeId,
        );

        return reservationResponseDto;
    }
}
