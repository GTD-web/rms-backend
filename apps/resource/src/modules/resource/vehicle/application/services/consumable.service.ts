import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ConsumableRepositoryPort } from '@resource/modules/resource/vehicle/domain/ports/consumable.repository.port';
import { Consumable, User } from '@libs/entities';
import { CreateConsumableDto } from '@resource/modules/resource/vehicle/application/dtos/create-vehicle-info.dto';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { UpdateConsumableDto } from '@resource/modules/resource/vehicle/application/dtos/update-vehicle-info.dto';
import { Role } from '@libs/enums/role-type.enum';

@Injectable()
export class ConsumableService {
    constructor(
        @Inject('ConsumableRepositoryPort')
        private readonly consumableRepository: ConsumableRepositoryPort,
    ) {}

    async save(createConsumableDto: CreateConsumableDto, repositoryOptions?: RepositoryOptions): Promise<Consumable> {
        return this.consumableRepository.save(createConsumableDto, repositoryOptions);
    }

    async findAll(repositoryOptions?: RepositoryOptions): Promise<Consumable[]> {
        return this.consumableRepository.findAll(repositoryOptions);
    }

    async findOne(repositoryOptions?: RepositoryOptions): Promise<Consumable | null> {
        return this.consumableRepository.findOne(repositoryOptions);
    }

    async update(
        id: string,
        updateData: UpdateConsumableDto,
        repositoryOptions?: RepositoryOptions,
    ): Promise<Consumable> {
        return this.consumableRepository.update(id, updateData, repositoryOptions);
    }

    async delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        return this.consumableRepository.delete(id, repositoryOptions);
    }

    async checkRole(consumableId: string, user: User): Promise<boolean> {
        if (user.roles.includes(Role.SYSTEM_ADMIN)) return true;
        const consumable = await this.findOne({
            where: { consumableId },
            relations: ['vehicleInfo', 'vehicleInfo.resource', 'vehicleInfo.resource.resourceManagers'],
        });
        return consumable.vehicleInfo.resource.resourceManagers.some(
            (manager) => manager.employeeId === user.employeeId,
        );
    }
}
