import { Injectable } from '@nestjs/common';
import { DateUtil } from '@libs/utils/date.util';
import { LessThan } from 'typeorm';
import { ParticipantsType, ReservationStatus } from '@libs/enums/reservation-type.enum';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';

@Injectable()
export class GetDelayedReturnVehicleUsecase {
    constructor(private readonly reservationService: DomainReservationService) {}

    async execute() {
        const delayedReturnVehicles = await this.reservationService.findAll({
            where: {
                status: ReservationStatus.CONFIRMED,
                endDate: LessThan(DateUtil.now().toDate()),
                reservationVehicles: {
                    isReturned: false,
                },
            },
            relations: ['participants', 'participants.employee', 'resource', 'reservationVehicles'],
        });

        return delayedReturnVehicles.map((reservation) => {
            const manager = reservation.participants.find(
                (participant) => participant.type === ParticipantsType.RESERVER,
            );
            return {
                type: '차량반납지연',
                title: `${reservation.resource.name} 반납 지연 중`,
                reservationId: reservation.reservationId,
                resourceId: reservation.resource.resourceId,
                resourceName: reservation.resource.name,
                startDate: reservation.startDate,
                endDate: reservation.endDate,
                manager: {
                    employeeId: manager.employee.employeeId,
                    name: manager.employee.name,
                    employeeNumber: manager.employee.employeeNumber,
                    department: manager.employee.department,
                    position: manager.employee.position,
                },
            };
        });
    }
}
