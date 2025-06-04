import { Injectable, NotFoundException, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { ParticipantsType } from '@libs/enums/reservation-type.enum';
import { ERROR_MESSAGE } from '@libs/constants/error-message';

@Injectable()
export class CheckReservationAccessUsecase {
    constructor(private readonly reservationService: DomainReservationService) {}

    async execute(reservationId: string, employeeId: string): Promise<boolean> {
        const reservation = await this.reservationService.findOne({
            where: { reservationId, participants: { employeeId, type: ParticipantsType.RESERVER } },
            relations: ['participants'],
        });
        if (!reservation) {
            throw new UnauthorizedException(ERROR_MESSAGE.BUSINESS.COMMON.UNAUTHORIZED);
        }
        return true;
    }
}
