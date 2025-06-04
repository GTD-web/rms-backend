import { Injectable } from '@nestjs/common';
import { Employee } from '@libs/entities';
import { DomainConsumableService } from '@src/domain/consumable/consumable.service';

@Injectable()
export class FindAllConsumablesUsecase {
    constructor(private readonly consumableService: DomainConsumableService) {}

    async execute(user: Employee, vehicleInfoId: string) {
        const consumables = await this.consumableService.findAll({
            where: {
                vehicleInfoId: vehicleInfoId,
            },
        });
        return consumables.map((consumable) => ({
            consumableId: consumable.consumableId,
            vehicleInfoId: consumable.vehicleInfoId,
            name: consumable.name,
            replaceCycle: consumable.replaceCycle,
            notifyReplacementCycle: consumable.notifyReplacementCycle,
        }));
    }
}
