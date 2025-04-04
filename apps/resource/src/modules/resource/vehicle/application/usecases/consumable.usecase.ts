import { Injectable, ForbiddenException } from '@nestjs/common';
import { ConsumableService } from '@resource/modules/resource/vehicle/application/services/consumable.service';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { Consumable, User } from '@libs/entities';
import { CreateConsumableDto } from '../dtos/create-vehicle-info.dto';
import { Role } from '@libs/enums/role-type.enum';
import { UpdateConsumableDto } from '../dtos/update-vehicle-info.dto';

@Injectable()
export class ConsumableUsecase {
    constructor(private readonly consumableService: ConsumableService) {}

    async save(
        user: User,
        createConsumableDto: CreateConsumableDto,
        repositoryOptions?: RepositoryOptions,
    ): Promise<Consumable> {
        const result = await this.checkRole(createConsumableDto.vehicleInfoId, user);
        if (!result) throw new ForbiddenException('권한이 없습니다.');
        return this.consumableService.save(createConsumableDto, repositoryOptions);
    }

    async findAll(user: User, repositoryOptions?: RepositoryOptions): Promise<Consumable[]> {
        const result = await this.checkRole(repositoryOptions?.where.vehicleInfoId, user);
        if (!result) throw new ForbiddenException('권한이 없습니다.');
        return this.consumableService.findAll(repositoryOptions);
    }

    async findOne(user: User, repositoryOptions?: RepositoryOptions): Promise<Consumable | null> {
        const result = await this.checkRole(repositoryOptions?.where.vehicleInfoId, user);
        if (!result) throw new ForbiddenException('권한이 없습니다.');
        return this.consumableService.findOne(repositoryOptions);
    }

    async update(
        user: User,
        id: string,
        updateData: UpdateConsumableDto,
        repositoryOptions?: RepositoryOptions,
    ): Promise<Consumable> {
        const result = await this.checkRole(repositoryOptions?.where.vehicleInfoId, user);
        if (!result) throw new ForbiddenException('권한이 없습니다.');
        return this.consumableService.update(id, updateData, repositoryOptions);
    }

    async delete(user: User, id: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        const result = await this.checkRole(repositoryOptions?.where.vehicleInfoId, user);
        if (!result) throw new ForbiddenException('권한이 없습니다.');
        return await this.consumableService.delete(id, repositoryOptions);
    }

    async checkRole(vehicleInfoId: string, user: User): Promise<boolean> {
        if (user.roles.includes(Role.SYSTEM_ADMIN)) return true;
        const result = await this.consumableService.findOne({
            where: {
                vehicleInfoId: vehicleInfoId,
                vehicleInfo: {
                    resource: {
                        resourceManagers: {
                            employeeId: user.employeeId,
                        },
                    },
                },
            },
            relations: ['vehicleInfo', 'vehicleInfo.resource', 'vehicleInfo.resource.resourceManagers'],
        });
        return !!result;
    }
}
