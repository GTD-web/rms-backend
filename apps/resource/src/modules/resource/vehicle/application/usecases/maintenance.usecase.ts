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
import { DataSource } from 'typeorm';

@Injectable()
export class MaintenanceUsecase {
    constructor(
        private readonly maintenanceService: MaintenanceService,
        private readonly consumableService: ConsumableService,
        private readonly vehicleInfoService: VehicleInfoService,
        private readonly dataSource: DataSource,
    ) {}

    async save(user: UserEntity, createMaintenanceDto: CreateMaintenanceDto): Promise<Maintenance> {
        const result = await this.checkRole(createMaintenanceDto.consumableId, user);
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

    async findAll(user: UserEntity, consumableId: string): Promise<Maintenance[]> {
        const result = await this.checkRole(consumableId, user);
        if (!result) throw new ForbiddenException('권한이 없습니다.');
        return this.maintenanceService.findAll({
            where: { consumableId },
        });
    }

    async findOne(user: UserEntity, maintenanceId: string): Promise<Maintenance> {
        const result = await this.checkRole(maintenanceId, user);
        if (!result) throw new ForbiddenException('권한이 없습니다.');
        return this.maintenanceService.findOne({ where: { maintenanceId } });
    }

    async update(
        user: UserEntity,
        maintenanceId: string,
        updateMaintenanceDto: UpdateMaintenanceDto,
        repositoryOptions?: RepositoryOptions,
    ): Promise<Maintenance> {
        const result = await this.checkRole(maintenanceId, user);
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
                await this.vehicleInfoService.update(
                    savedMaintenance.consumable.vehicleInfo.vehicleInfoId,
                    {
                        totalMileage: updateMaintenanceDto.mileage,
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

    async delete(user: UserEntity, maintenanceId: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        const result = await this.checkRole(maintenanceId, user);
        if (!result) throw new ForbiddenException('권한이 없습니다.');
        return await this.maintenanceService.delete(maintenanceId, repositoryOptions);
    }

    async checkRole(consumableId: string, user: UserEntity): Promise<boolean> {
        if (user.roles.includes(Role.SYSTEM_ADMIN)) return true;
        const result = await this.maintenanceService.findOne({
            where: {
                consumableId: consumableId,
                consumable: {
                    vehicleInfo: {
                        resource: {
                            resourceManagers: {
                                employeeId: user.employeeId,
                            },
                        },
                    },
                },
            },
            relations: [
                'consumable',
                'consumable.vehicleInfo',
                'consumable.vehicleInfo.resource',
                'consumable.vehicleInfo.resource.resourceManagers',
            ],
        });
        return !!result;
    }
}
1;
