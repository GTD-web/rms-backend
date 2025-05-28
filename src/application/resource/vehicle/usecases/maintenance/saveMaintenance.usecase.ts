import { Injectable, BadRequestException } from '@nestjs/common';
import { DataSource, MoreThanOrEqual, Raw } from 'typeorm';
import { Maintenance, Employee } from '@libs/entities';
import { CreateMaintenanceDto } from '../../dtos/create-vehicle-info.dto';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { DomainMaintenanceService } from '@src/domain/maintenance/maintenance.service';
import { DomainConsumableService } from '@src/domain/consumable/consumable.service';
import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { NotificationService } from '@src/application/notification/notification.service';
import { Role } from '@libs/enums/role-type.enum';

@Injectable()
export class SaveMaintenanceUsecase {
    constructor(
        private readonly maintenanceService: DomainMaintenanceService,
        private readonly consumableService: DomainConsumableService,
        private readonly vehicleInfoService: DomainVehicleInfoService,
        private readonly employeeService: DomainEmployeeService,
        private readonly notificationService: NotificationService,
        private readonly dataSource: DataSource,
    ) {}

    async execute(user: Employee, createMaintenanceDto: CreateMaintenanceDto): Promise<Maintenance> {
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
            const maintenance = await this.maintenanceService.save(createMaintenanceDto);
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

            const systemAdmins = await this.employeeService.findAll({
                where: {
                    roles: Raw(() => `'${Role.SYSTEM_ADMIN}' = ANY("roles")`),
                },
            });

            const consumable = await this.consumableService.findOne({
                where: { consumableId: maintenance.consumableId },
                relations: ['vehicleInfo', 'vehicleInfo.resource'],
                withDeleted: true,
            });
            this.notificationService.createNotification(
                NotificationType.RESOURCE_MAINTENANCE_COMPLETED,
                {
                    resourceId: consumable.vehicleInfo.resource.resourceId,
                    resourceType: consumable.vehicleInfo.resource.type,
                    consumableName: consumable.name,
                    resourceName: consumable.vehicleInfo.resource.name,
                },
                systemAdmins.map((admin) => admin.employeeId),
            );

            return maintenance;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
