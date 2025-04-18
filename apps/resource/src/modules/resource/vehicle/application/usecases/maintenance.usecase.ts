import { VehicleInfoService } from '../services/vehicle-info.service';
import { MaintenanceResponseDto, VehicleInfoResponseDto } from '../dtos/vehicle-response.dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UpdateMaintenanceDto, UpdateVehicleInfoDto } from '../dtos/update-vehicle-info.dto';
import { ConsumableService } from '@resource/modules/resource/vehicle/application/services/consumable.service';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { NotificationUsecase } from '@resource/modules/notification/application/usecases/notification.usecase';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { MaintenanceService } from '../services/maintenance.service';
import { Maintenance } from '@libs/entities';
import { CreateMaintenanceDto } from '../dtos/create-vehicle-info.dto';
import { User } from '@libs/decorators/user.decorator';
import { User as UserEntity } from '@libs/entities';
import { Role } from '@libs/enums/role-type.enum';
import { DataSource, In, LessThan, MoreThan } from 'typeorm';
import { PaginationData } from '@libs/dtos/paginate-response.dto';

@Injectable()
export class MaintenanceUsecase {
    constructor(
        private readonly maintenanceService: MaintenanceService,
        private readonly consumableService: ConsumableService,
        private readonly vehicleInfoService: VehicleInfoService,
        private readonly dataSource: DataSource,
    ) {}

    async save(user: UserEntity, createMaintenanceDto: CreateMaintenanceDto): Promise<Maintenance> {
        const result = await this.consumableService.checkRole(createMaintenanceDto.consumableId, user);
        if (!result) throw new ForbiddenException('권한이 없습니다.');
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const maintenance = await this.maintenanceService.save(createMaintenanceDto, { queryRunner });
            if (createMaintenanceDto.mileage) {
                const consumable = await this.consumableService.findOne({
                    where: { consumableId: maintenance.consumableId },
                    relations: ['vehicleInfo'],
                });
                console.log(consumable);
                await this.vehicleInfoService.update(
                    consumable.vehicleInfo.vehicleInfoId,
                    {
                        totalMileage: createMaintenanceDto.mileage,
                    },
                    { queryRunner },
                );
            }
            await queryRunner.commitTransaction();
            return maintenance;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async findAllByVehicleInfoId(
        user: UserEntity,
        vehicleInfoId: string,
        page: number,
        limit: number,
    ): Promise<PaginationData<MaintenanceResponseDto>> {
        const result = await this.vehicleInfoService.checkRole(vehicleInfoId, user);
        if (!result) throw new ForbiddenException('권한이 없습니다.');

        const vehicleInfo = await this.vehicleInfoService.findOne({
            where: { vehicleInfoId },
            relations: ['resource', 'consumables', 'consumables.maintenances'],
        });
        const options: RepositoryOptions = {
            where: {
                maintenanceId: In(
                    vehicleInfo.consumables.flatMap((consumable) =>
                        consumable.maintenances.map((maintenance) => maintenance.maintenanceId),
                    ),
                ),
            },
        };
        const count = await this.maintenanceService.count(options);

        if (page && limit) {
            options.skip = (page - 1) * limit;
            options.take = limit;
        }
        options.relations = ['consumable'];
        options.order = { createdAt: 'DESC' };
        const maintenances = await this.maintenanceService.findAll(options);

        return {
            items: maintenances.map((maintenance, index, array) => ({
                maintenanceId: maintenance.maintenanceId,
                consumableId: maintenance.consumableId,
                date: maintenance.date,
                mileage: maintenance.mileage,
                cost: maintenance.cost,
                images: maintenance.images,
                consumableName: maintenance.consumable.name,
                resourceName: vehicleInfo.resource.name,
                previousMileage: index !== array.length - 1 ? array[index + 1].mileage : 0,
                isLatest: index === 0,
            })),

            meta: {
                total: count,
                page,
                limit,
                hasNext: page * limit < count,
            },
        };
    }

    async findAll(user: UserEntity, consumableId: string): Promise<Maintenance[]> {
        const result = await this.consumableService.checkRole(consumableId, user);
        if (!result) throw new ForbiddenException('권한이 없습니다.');
        return this.maintenanceService.findAll({
            where: { consumableId },
        });
    }

    async findOne(user: UserEntity, maintenanceId: string): Promise<MaintenanceResponseDto> {
        const result = await this.maintenanceService.checkRole(maintenanceId, user);
        if (!result) throw new ForbiddenException('권한이 없습니다.');
        const maintenance = await this.maintenanceService.findOne({
            where: { maintenanceId },
            relations: ['consumable', 'consumable.vehicleInfo', 'consumable.vehicleInfo.resource'],
        });
        const previousMaintenance = await this.maintenanceService.findOne({
            where: { consumableId: maintenance.consumableId, createdAt: LessThan(maintenance.createdAt) },
            order: { createdAt: 'DESC' },
        });

        maintenance.createdAt.setTime(maintenance.createdAt.getTime() + 1);
        const nextMaintenance = await this.maintenanceService.findOne({
            where: { consumableId: maintenance.consumableId, createdAt: MoreThan(maintenance.createdAt) },
            order: { createdAt: 'ASC' },
        });

        return {
            maintenanceId: maintenance.maintenanceId,
            consumableId: maintenance.consumableId,
            date: maintenance.date,
            mileage: maintenance.mileage,
            cost: maintenance.cost,
            images: maintenance.images,
            consumableName: maintenance.consumable.name,
            resourceName: maintenance.consumable.vehicleInfo.resource.name,
            previousMileage: previousMaintenance ? previousMaintenance.mileage : 0,
            isLatest: !nextMaintenance,
        };
    }

    async update(
        user: UserEntity,
        maintenanceId: string,
        updateMaintenanceDto: UpdateMaintenanceDto,
        repositoryOptions?: RepositoryOptions,
    ): Promise<Maintenance> {
        const result = await this.maintenanceService.checkRole(maintenanceId, user);
        if (!result) throw new ForbiddenException('권한이 없습니다.');

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const maintenance = await this.maintenanceService.update(maintenanceId, updateMaintenanceDto, {
                queryRunner,
                ...repositoryOptions,
            });
            if (updateMaintenanceDto.mileage) {
                const savedMaintenance = await this.maintenanceService.findOne({
                    where: { maintenanceId: maintenance.maintenanceId },
                    relations: ['consumable', 'consumable.vehicleInfo'],
                    order: { createdAt: 'DESC' },
                });
                if (savedMaintenance.consumable.vehicleInfo.totalMileage < updateMaintenanceDto.mileage) {
                    await this.vehicleInfoService.update(
                        savedMaintenance.consumable.vehicleInfo.vehicleInfoId,
                        {
                            totalMileage: updateMaintenanceDto.mileage,
                        },
                        { queryRunner },
                    );
                }
            }
            await queryRunner.commitTransaction();
            return maintenance;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async delete(user: UserEntity, maintenanceId: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        const result = await this.maintenanceService.checkRole(maintenanceId, user);
        if (!result) throw new ForbiddenException('권한이 없습니다.');
        return await this.maintenanceService.delete(maintenanceId, repositoryOptions);
    }
}
