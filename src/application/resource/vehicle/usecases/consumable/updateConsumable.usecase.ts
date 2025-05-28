import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from '@libs/entities';
import { DomainConsumableService } from '@src/domain/consumable/consumable.service';
import { UpdateConsumableDto } from '../../dtos/update-vehicle-info.dto';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';

@Injectable()
export class UpdateConsumableUsecase {
    constructor(
        private readonly consumableService: DomainConsumableService,
        private readonly vehicleInfoService: DomainVehicleInfoService,
    ) {}

    async execute(user: Employee, consumableId: string, updateConsumableDto: UpdateConsumableDto) {
        const vehicleInfo = await this.vehicleInfoService.findOne({
            where: {
                vehicleInfoId: updateConsumableDto.vehicleInfoId,
            },
            relations: ['consumables'],
        });
        if (!vehicleInfo) throw new NotFoundException(ERROR_MESSAGE.BUSINESS.VEHICLE_INFO.NOT_FOUND);
        if (vehicleInfo.consumables.length > 0) {
            const hasSameName = vehicleInfo.consumables.some(
                (consumable) =>
                    consumable.name === updateConsumableDto.name && consumable.consumableId !== consumableId,
            );
            if (hasSameName) throw new BadRequestException(ERROR_MESSAGE.BUSINESS.CONSUMABLE.ALREADY_EXISTS);
        }

        return this.consumableService.update(consumableId, updateConsumableDto);
    }
}
