import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DataSource, In, MoreThanOrEqual, Not, Raw } from 'typeorm';
import { Maintenance, Employee } from '@libs/entities';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { Role } from '@libs/enums/role-type.enum';

// Domain Services
import { DomainMaintenanceService } from '@src/domain/maintenance/maintenance.service';
import { DomainConsumableService } from '@src/domain/consumable/consumable.service';
import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { DomainFileService } from '@src/domain/file/file.service';

// Context Services
import { FileContextService } from '../../file/services/file.context.service';

// DTOs
import { CreateMaintenanceDto } from '@src/business/resource-management/dtos/vehicle/create-vehicle-info.dto';
import { UpdateMaintenanceDto } from '@src/business/resource-management/dtos/vehicle/update-vehicle-info.dto';
import { MaintenanceResponseDto } from '@src/business/resource-management/dtos/vehicle/vehicle-response.dto';
import { PaginationData } from '@libs/dtos/pagination-response.dto';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';

@Injectable()
export class MaintenanceContextService {
    constructor(
        private readonly domainMaintenanceService: DomainMaintenanceService,
        private readonly domainConsumableService: DomainConsumableService,
        private readonly domainVehicleInfoService: DomainVehicleInfoService,
        private readonly domainEmployeeService: DomainEmployeeService,
        private readonly domainFileService: DomainFileService,
        private readonly fileContextService: FileContextService,
        private readonly dataSource: DataSource,
    ) {}

    async 정비이력을_저장한다(createMaintenanceDto: CreateMaintenanceDto): Promise<MaintenanceResponseDto> {
        const existingMaintenance = await this.domainMaintenanceService.findOne({
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
            // 파일 ID 배열 준비 (기본값 빈 배열)
            if (!createMaintenanceDto.images) createMaintenanceDto.images = [];

            // 이미지 파일들을 임시에서 영구로 변경
            if (createMaintenanceDto.images.length > 0) {
                await this.fileContextService.파일들을_영구로_변경한다(createMaintenanceDto.images, queryRunner);
            }

            // 정비 이력 저장 (이미지 필드 제외)
            const { images, ...maintenanceData } = createMaintenanceDto;
            const maintenance = await this.domainMaintenanceService.save(maintenanceData, { queryRunner });

            // 정비에 파일들을 연결
            await this.fileContextService.정비에_파일들을_연결한다(
                maintenance.maintenanceId!,
                createMaintenanceDto.images,
                queryRunner,
            );

            if (createMaintenanceDto.mileage) {
                const consumable = await this.domainConsumableService.findOne({
                    where: { consumableId: maintenance.consumableId },
                    relations: ['vehicleInfo'],
                });

                if (consumable.vehicleInfo.totalMileage < createMaintenanceDto.mileage) {
                    await this.domainVehicleInfoService.update(
                        consumable.vehicleInfo.vehicleInfoId,
                        {
                            totalMileage: createMaintenanceDto.mileage,
                        },
                        { queryRunner },
                    );
                }
            }

            await queryRunner.commitTransaction();

            // 시스템 관리자들에게 알림 발송
            const systemAdmins = await this.domainEmployeeService.findAll({
                where: {
                    roles: Raw(() => `'${Role.SYSTEM_ADMIN}' = ANY("roles")`),
                },
            });

            const consumable = await this.domainConsumableService.findOne({
                where: { consumableId: maintenance.consumableId },
                relations: ['vehicleInfo', 'vehicleInfo.resource'],
                withDeleted: true,
            });

            // await this.notificationService.createNotification(
            //     NotificationType.RESOURCE_MAINTENANCE_COMPLETED,
            //     {
            //         resourceId: consumable.vehicleInfo.resource.resourceId,
            //         resourceType: consumable.vehicleInfo.resource.type,
            //         consumableName: consumable.name,
            //         resourceName: consumable.vehicleInfo.resource.name,
            //     },
            //     systemAdmins.map((admin) => admin.employeeId),
            // );

            // 정비 이력 이미지 조회
            const maintenanceFiles = await this.fileContextService.정비_파일을_조회한다(maintenance.maintenanceId!);

            return {
                maintenanceId: maintenance.maintenanceId,
                consumableId: maintenance.consumableId,
                date: maintenance.date,
                mileage: maintenance.mileage,
                cost: maintenance.cost,
                images: maintenanceFiles.map((file) => file.filePath),
            };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async 모든_정비이력을_조회한다(user: Employee): Promise<MaintenanceResponseDto[]> {
        const maintenances = await this.domainMaintenanceService.findAll({
            relations: ['consumable', 'consumable.vehicleInfo', 'consumable.vehicleInfo.resource'],
            order: { date: 'DESC' },
        });

        return await Promise.all(
            maintenances.map(async (maintenance) => {
                // 정비 이력 이미지 조회
                const maintenanceFiles = await this.fileContextService.정비_파일을_조회한다(maintenance.maintenanceId);

                return {
                    maintenanceId: maintenance.maintenanceId,
                    consumableId: maintenance.consumableId,
                    resourceName: maintenance.consumable?.vehicleInfo?.resource?.name,
                    consumableName: maintenance.consumable?.name,
                    date: maintenance.date,
                    mileage: maintenance.mileage,
                    cost: maintenance.cost,
                    images: maintenanceFiles.map((file) => file.filePath),
                };
            }),
        );
    }

    async 차량별_정비이력을_조회한다(
        vehicleInfoId: string,
        page: number = 1,
        limit: number = 10,
    ): Promise<PaginationData<MaintenanceResponseDto>> {
        const vehicleInfo = await this.domainVehicleInfoService.findOne({
            where: { vehicleInfoId },
            relations: ['resource', 'consumables', 'consumables.maintenances'],
            withDeleted: true,
        });
        const options: IRepositoryOptions<Maintenance> = {
            where: {
                maintenanceId: In(
                    vehicleInfo.consumables.flatMap((consumable) =>
                        consumable.maintenances.map((maintenance) => maintenance.maintenanceId),
                    ),
                ),
            },
            withDeleted: true,
        };
        const count = await this.domainMaintenanceService.count(options);

        if (page && limit) {
            options.skip = (page - 1) * limit;
            options.take = limit;
        }
        options.relations = ['consumable'];
        options.order = { createdAt: 'DESC' };
        const maintenances = await this.domainMaintenanceService.findAll(options);

        const items = await Promise.all(
            maintenances.map(async (maintenance, index, array) => {
                // 정비 이력 이미지 조회
                const maintenanceFiles = await this.fileContextService.정비_파일을_조회한다(maintenance.maintenanceId);

                return {
                    maintenanceId: maintenance.maintenanceId,
                    consumableId: maintenance.consumableId,
                    date: maintenance.date,
                    mileage: maintenance.mileage,
                    cost: maintenance.cost,
                    images: maintenanceFiles.map((file) => file.filePath),
                    consumableName: maintenance.consumable.name,
                    resourceName: vehicleInfo.resource.name,
                    previousMileage: index !== array.length - 1 ? array[index + 1].mileage : 0,
                    isLatest: index === 0,
                };
            }),
        );

        return {
            items,
            meta: {
                total: count,
                page,
                limit,
                hasNext: page * limit < count,
            },
        };
    }

    async 정비이력을_조회한다(maintenanceId: string): Promise<MaintenanceResponseDto> {
        const maintenance = await this.domainMaintenanceService.findOne({
            where: { maintenanceId },
            relations: ['consumable', 'consumable.vehicleInfo', 'consumable.vehicleInfo.resource'],
        });

        if (!maintenance) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.MAINTENANCE.NOT_FOUND);
        }

        // 정비 이력 이미지 조회
        const maintenanceFiles = await this.fileContextService.정비_파일을_조회한다(maintenanceId);

        return {
            maintenanceId: maintenance.maintenanceId,
            consumableId: maintenance.consumableId,
            resourceName: maintenance.consumable?.vehicleInfo?.resource?.name,
            consumableName: maintenance.consumable?.name,
            date: maintenance.date,
            mileage: maintenance.mileage,
            cost: maintenance.cost,
            images: maintenanceFiles.map((file) => file.filePath),
        };
    }

    async 정비이력을_수정한다(
        maintenanceId: string,
        updateMaintenanceDto: UpdateMaintenanceDto,
    ): Promise<MaintenanceResponseDto> {
        const existingMaintenance = await this.domainMaintenanceService.findOne({
            where: { maintenanceId },
        });

        if (!existingMaintenance) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.MAINTENANCE.NOT_FOUND);
        }

        // 날짜 변경 시 유효성 검사
        if (updateMaintenanceDto.date && updateMaintenanceDto.date !== existingMaintenance.date) {
            const conflictingMaintenance = await this.domainMaintenanceService.findOne({
                where: {
                    consumableId: existingMaintenance.consumableId,
                    date: MoreThanOrEqual(updateMaintenanceDto.date),
                    maintenanceId: Not(maintenanceId),
                },
            });

            if (conflictingMaintenance) {
                throw new BadRequestException(ERROR_MESSAGE.BUSINESS.MAINTENANCE.INVALID_DATE);
            }
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // 파일 관련 처리
            if (updateMaintenanceDto.images !== undefined) {
                const fileIds = updateMaintenanceDto.images || [];

                // 파일들을 임시에서 영구로 변경
                if (fileIds.length > 0) {
                    await this.fileContextService.파일들을_영구로_변경한다(fileIds, queryRunner);
                }

                // 정비에 파일들을 연결 (덮어쓰기)
                await this.fileContextService.정비에_파일들을_연결한다(maintenanceId, fileIds, queryRunner);
            }

            // 정비 이력 업데이트 (이미지 필드 제외)
            const { images, ...maintenanceData } = updateMaintenanceDto;
            await this.domainMaintenanceService.update(maintenanceId, maintenanceData, { queryRunner });

            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }

        const updatedMaintenance = await this.domainMaintenanceService.findOne({
            where: { maintenanceId },
            relations: ['consumable', 'consumable.vehicleInfo', 'consumable.vehicleInfo.resource'],
        });

        // 정비 이력 이미지 조회
        const maintenanceFiles = await this.fileContextService.정비_파일을_조회한다(maintenanceId);

        return {
            maintenanceId: updatedMaintenance.maintenanceId,
            consumableId: updatedMaintenance.consumableId,
            resourceName: updatedMaintenance.consumable?.vehicleInfo?.resource?.name,
            consumableName: updatedMaintenance.consumable?.name,
            date: updatedMaintenance.date,
            mileage: updatedMaintenance.mileage,
            cost: updatedMaintenance.cost,
            images: maintenanceFiles.map((file) => file.filePath),
        };
    }

    async 정비이력을_삭제한다(maintenanceId: string): Promise<void> {
        const maintenance = await this.domainMaintenanceService.findOne({
            where: { maintenanceId },
        });

        if (!maintenance) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.MAINTENANCE.NOT_FOUND);
        }

        await this.domainMaintenanceService.delete(maintenanceId);
    }
}
