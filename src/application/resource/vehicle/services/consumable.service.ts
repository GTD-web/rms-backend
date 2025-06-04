import { Injectable } from '@nestjs/common';
import { CreateConsumableDto } from '../dtos/create-vehicle-info.dto';
import { UpdateConsumableDto } from '../dtos/update-vehicle-info.dto';
import { ConsumableResponseDto } from '../dtos/vehicle-response.dto';
import { Employee } from '@libs/entities';
import { SaveConsumableUsecase } from '../usecases/consumable/saveConsumable.usecase';
import { UpdateConsumableUsecase } from '../usecases/consumable/updateConsumable.usecase';
import { DeleteConsumableUsecase } from '../usecases/consumable/deleteConsumable.usecase';
import { FindAllConsumablesUsecase } from '../usecases/consumable/findAllConsumables.usecase';
import { FindOneConsumableUsecase } from '../usecases/consumable/findOneConsumable.usecase';

@Injectable()
export class ConsumableService {
    constructor(
        private readonly saveConsumableUsecase: SaveConsumableUsecase,
        private readonly updateConsumableUsecase: UpdateConsumableUsecase,
        private readonly deleteConsumableUsecase: DeleteConsumableUsecase,
        private readonly findAllConsumablesUsecase: FindAllConsumablesUsecase,
        private readonly findOneConsumableUsecase: FindOneConsumableUsecase,
    ) {}

    async save(user: Employee, createConsumableDto: CreateConsumableDto): Promise<ConsumableResponseDto> {
        return this.saveConsumableUsecase.execute(user, createConsumableDto);
    }

    async findAll(user: Employee, vehicleInfoId: string): Promise<ConsumableResponseDto[]> {
        return this.findAllConsumablesUsecase.execute(user, vehicleInfoId);
    }

    async findOne(user: Employee, consumableId: string): Promise<ConsumableResponseDto> {
        return this.findOneConsumableUsecase.execute(user, consumableId);
    }

    async update(
        user: Employee,
        consumableId: string,
        updateConsumableDto: UpdateConsumableDto,
    ): Promise<ConsumableResponseDto> {
        return this.updateConsumableUsecase.execute(user, consumableId, updateConsumableDto);
    }

    async delete(user: Employee, consumableId: string): Promise<void> {
        return this.deleteConsumableUsecase.execute(user, consumableId);
    }
}
