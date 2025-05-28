import { Injectable } from '@nestjs/common';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DateUtil } from '@libs/utils/date.util';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { LessThan, MoreThan } from 'typeorm';

@Injectable()
export class CheckAvailabilityUsecase {
    constructor(private readonly resourceService: DomainResourceService) {}

    async execute(resourceId: string, startDate: string, endDate: string): Promise<boolean> {
        const startDateObj = DateUtil.date(startDate).toDate();
        const endDateObj = DateUtil.date(endDate).toDate();

        const resource = await this.resourceService.findOne({
            where: {
                resourceId: resourceId,
                reservations: {
                    status: ReservationStatus.CONFIRMED,
                    startDate: LessThan(endDateObj),
                    endDate: MoreThan(startDateObj),
                },
            },
            relations: ['reservations'],
        });

        return !resource;
    }
}
