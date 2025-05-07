import { VehicleInfoService } from '../services/vehicle-info.service';
import { MaintenanceResponseDto } from '../dtos/vehicle-response.dto';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UpdateMaintenanceDto } from '../dtos/update-vehicle-info.dto';
import { ConsumableService } from '@resource/modules/resource/vehicle/application/services/consumable.service';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { MaintenanceService } from '../services/maintenance.service';
import { Maintenance } from '@libs/entities';
import { CreateMaintenanceDto } from '../dtos/create-vehicle-info.dto';
import { User as UserEntity } from '@libs/entities';
import { DataSource, In, LessThan, MoreThan, MoreThanOrEqual, Not } from 'typeorm';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { ERROR_MESSAGE } from '@libs/constants/error-message';

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
        if (!result) throw new ForbiddenException(ERROR_MESSAGE.BUSINESS.MAINTENANCE.UNAUTHORIZED);

        const existingMaintenance = await this.maintenanceService.findOne({
            where: {
                consumableId: createMaintenanceDto.consumableId,
                date: MoreThanOrEqual(createMaintenanceDto.date),
            },
        });
        if (existingMaintenance) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.MAINTENANCE.INVALID_DATE);
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const maintenance = await this.maintenanceService.save(
                { ...createMaintenanceDto, maintananceBy: user.employeeId },
                { queryRunner },
            );
            if (createMaintenanceDto.mileage) {
                const consumable = await this.consumableService.findOne({
                    where: { consumableId: maintenance.consumableId },
                    relations: ['vehicleInfo'],
                });
                if (consumable.vehicleInfo.totalMileage < createMaintenanceDto.mileage) {
                    await this.vehicleInfoService.update(
                        consumable.vehicleInfo.vehicleInfoId,
                        {
                            totalMileage: createMaintenanceDto.mileage,
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

    async findAllByVehicleInfoId(
        user: UserEntity,
        vehicleInfoId: string,
        page: number,
        limit: number,
    ): Promise<PaginationData<MaintenanceResponseDto>> {
        const result = await this.vehicleInfoService.checkRole(vehicleInfoId, user);
        if (!result) throw new ForbiddenException(ERROR_MESSAGE.BUSINESS.MAINTENANCE.UNAUTHORIZED);

        const vehicleInfo = await this.vehicleInfoService.findOne({
            where: { vehicleInfoId },
            relations: ['resource', 'consumables', 'consumables.maintenances'],
            withDeleted: true,
        });
        const options: RepositoryOptions = {
            where: {
                maintenanceId: In(
                    vehicleInfo.consumables.flatMap((consumable) =>
                        consumable.maintenances.map((maintenance) => maintenance.maintenanceId),
                    ),
                ),
            },
            withDeleted: true,
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
        if (!result) throw new ForbiddenException(ERROR_MESSAGE.BUSINESS.MAINTENANCE.UNAUTHORIZED);
        return this.maintenanceService.findAll({
            where: { consumableId },
        });
    }

    async findOne(user: UserEntity, maintenanceId: string): Promise<MaintenanceResponseDto> {
        const result = await this.maintenanceService.checkRole(maintenanceId, user);
        if (!result) throw new ForbiddenException(ERROR_MESSAGE.BUSINESS.MAINTENANCE.UNAUTHORIZED);
        const maintenance = await this.maintenanceService.findOne({
            where: { maintenanceId },
            relations: ['consumable', 'consumable.vehicleInfo', 'consumable.vehicleInfo.resource'],
            withDeleted: true,
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
            previousDate: previousMaintenance ? previousMaintenance.date : null,
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
        if (!result) throw new ForbiddenException(ERROR_MESSAGE.BUSINESS.MAINTENANCE.UNAUTHORIZED);

        if (updateMaintenanceDto.date) {
            const existingMaintenance = await this.maintenanceService.findOne({
                where: {
                    maintenanceId: Not(maintenanceId),
                    consumableId: updateMaintenanceDto.consumableId,
                    date: MoreThan(updateMaintenanceDto.date),
                },
            });
            if (existingMaintenance) {
                throw new BadRequestException(ERROR_MESSAGE.BUSINESS.MAINTENANCE.INVALID_DATE);
            }
        }

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
                    withDeleted: true,
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
            return await this.maintenanceService.findOne({
                where: {
                    maintenanceId: maintenanceId,
                },
            });
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async delete(user: UserEntity, maintenanceId: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        const result = await this.maintenanceService.checkRole(maintenanceId, user);
        if (!result) throw new ForbiddenException(ERROR_MESSAGE.BUSINESS.MAINTENANCE.UNAUTHORIZED);
        return await this.maintenanceService.delete(maintenanceId, repositoryOptions);
    }
}
