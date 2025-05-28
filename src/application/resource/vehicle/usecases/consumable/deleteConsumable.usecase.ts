import { Injectable } from '@nestjs/common';
import { Employee } from '@libs/entities';
import { DomainConsumableService } from '@src/domain/consumable/consumable.service';

@Injectable()
export class DeleteConsumableUsecase {
    constructor(private readonly consumableService: DomainConsumableService) {}

    async execute(user: Employee, consumableId: string): Promise<void> {
        return await this.consumableService.delete(consumableId);
    }
}
