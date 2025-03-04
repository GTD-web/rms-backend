import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ConsumableRepositoryPort } from '@resource/modules/resource/vehicle/domain/ports/consumable.repository.port';
import { Consumable } from '@libs/entities';
import { CreateConsumableDto } from '../dtos/create-consumable.dto';

@Injectable()
export class ConsumableService {
    constructor(
        @Inject('ConsumableRepositoryPort')
        private readonly consumableRepository: ConsumableRepositoryPort,
    ) {}

    // async create(createDto: CreateConsumableDto & { vehicleId: string }) {
    //   const consumable = new Consumable({
    //     vehicleId: createDto.vehicleId,
    //     name: createDto.name,
    //     replaceCycle: createDto.replaceCycle,
    //     notifyReplacementCycle: createDto.notifyReplacementCycle,
    //   });
    //   return this.consumableRepository.save(consumable);
    // }

    // async findById(id: string) {
    //   const consumable = await this.consumableRepository.findById(id);
    //   if (!consumable) {
    //     throw new NotFoundException('Consumable not found');
    //   }
    //   return consumable;
    // }

    // async findByVehicleId(vehicleId: string) {
    //   return this.consumableRepository.findByVehicleId(vehicleId);
    // }

    // async update(id: string, updateData: Partial<CreateConsumableDto>) {
    //   const consumable = await this.findById(id);
    //   return this.consumableRepository.update(id, {
    //     ...consumable,
    //     ...updateData,
    //   });
    // }

    // async remove(id: string) {
    //   await this.consumableRepository.delete(id);
    // }
}
