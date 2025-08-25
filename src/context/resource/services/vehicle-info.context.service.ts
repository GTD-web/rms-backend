import { Injectable, NotFoundException } from '@nestjs/common';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { DataSource, In } from 'typeorm';

// Domain Services
import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';
import { DomainReservationVehicleService } from '@src/domain/reservation-vehicle/reservation-vehicle.service';
import { ReservationVehicle } from '@libs/entities/reservation-vehicle.entity';
import { DomainFileService } from '@src/domain/file/file.service';
import { DomainConsumableService } from '@src/domain/consumable/consumable.service';
import { Consumable } from '@libs/entities/consumable.entity';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';

// DTOs
import { VehicleInfoResponseDto } from '@src/business/resource-management/dtos/vehicle/vehicle-response.dto';
import { UpdateVehicleInfoDto } from '@src/business/resource-management/dtos/vehicle/update-vehicle-info.dto';

@Injectable()
export class VehicleInfoContextService {
    constructor(
        private readonly domainVehicleInfoService: DomainVehicleInfoService,
        private readonly domainReservationVehicleService: DomainReservationVehicleService,
        private readonly domainFileService: DomainFileService,
        private readonly domainConsumableService: DomainConsumableService,
        private readonly domainEmployeeService: DomainEmployeeService,
        private readonly dataSource: DataSource,
    ) {}

    async 차량정보를_조회한다(vehicleInfoId: string): Promise<VehicleInfoResponseDto> {
        const vehicleInfo = await this.domainVehicleInfoService.findOne({
            where: { vehicleInfoId },
        });

        if (!vehicleInfo) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.VEHICLE_INFO.NOT_FOUND);
        }

        return {
            vehicleInfoId: vehicleInfo.vehicleInfoId,
            resourceId: vehicleInfo.resourceId,
            totalMileage: Number(vehicleInfo.totalMileage),
            leftMileage: Number(vehicleInfo.leftMileage),
            insuranceName: vehicleInfo.insuranceName,
            insuranceNumber: vehicleInfo.insuranceNumber,
            parkingLocationImages: vehicleInfo.parkingLocationImages,
            odometerImages: vehicleInfo.odometerImages,
            indoorImages: vehicleInfo.indoorImages,
        };
    }

    async 차량정보를_수정한다(
        vehicleInfoId: string,
        updateVehicleInfoDto: UpdateVehicleInfoDto,
    ): Promise<VehicleInfoResponseDto> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            if (!updateVehicleInfoDto.parkingLocationImages) updateVehicleInfoDto.parkingLocationImages = [];
            if (!updateVehicleInfoDto.odometerImages) updateVehicleInfoDto.odometerImages = [];
            if (!updateVehicleInfoDto.indoorImages) updateVehicleInfoDto.indoorImages = [];
            updateVehicleInfoDto.parkingLocationImages = updateVehicleInfoDto.parkingLocationImages.map((image) =>
                this.domainFileService.getFileUrl(image),
            );
            updateVehicleInfoDto.odometerImages = updateVehicleInfoDto.odometerImages.map((image) =>
                this.domainFileService.getFileUrl(image),
            );
            updateVehicleInfoDto.indoorImages = updateVehicleInfoDto.indoorImages.map((image) =>
                this.domainFileService.getFileUrl(image),
            );

            const vehicleInfo = await this.domainVehicleInfoService.update(vehicleInfoId, updateVehicleInfoDto, {
                queryRunner,
            });

            const images = [
                ...updateVehicleInfoDto.parkingLocationImages,
                ...updateVehicleInfoDto.odometerImages,
                ...updateVehicleInfoDto.indoorImages,
            ];

            if (images.length > 0) {
                await this.domainFileService.updateTemporaryFiles(images, false, {
                    queryRunner,
                });
            }

            // 소모품 복사
            const hasConsumables = await this.domainConsumableService.count({
                where: {
                    vehicleInfoId: vehicleInfoId,
                },
            });
            if (hasConsumables === 0) {
                const sourceConsumables = await queryRunner.manager
                    .createQueryBuilder(Consumable, 'consumable')
                    .select(
                        'DISTINCT ON (consumable.name) consumable.name, consumable.notifyReplacementCycle, consumable.replaceCycle',
                    )
                    .where('consumable.vehicleInfoId != :vehicleInfoId', { vehicleInfoId })
                    .orderBy('consumable.name', 'ASC')
                    .getRawMany();

                // 이름으로 그룹화하여 각 이름별로 하나씩만 선택
                const newConsumables = sourceConsumables.map((consumable) => {
                    const newConsumable = new Consumable();
                    newConsumable.vehicleInfoId = vehicleInfoId;
                    newConsumable.name = consumable.name;
                    newConsumable.notifyReplacementCycle = consumable.notifyReplacementCycle;
                    newConsumable.replaceCycle = consumable.replaceCycle;
                    newConsumable.initMileage = updateVehicleInfoDto.totalMileage || 0;
                    return newConsumable;
                });

                await this.domainConsumableService.bulkCreate(newConsumables, {
                    queryRunner,
                });
            }

            await queryRunner.commitTransaction();
            return {
                vehicleInfoId: vehicleInfo.vehicleInfoId,
                resourceId: vehicleInfo.resourceId,
                totalMileage: Number(vehicleInfo.totalMileage),
                leftMileage: Number(vehicleInfo.leftMileage),
                insuranceName: vehicleInfo.insuranceName,
                insuranceNumber: vehicleInfo.insuranceNumber,
                parkingLocationImages: vehicleInfo.parkingLocationImages,
                odometerImages: vehicleInfo.odometerImages,
                indoorImages: vehicleInfo.indoorImages,
            };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async 반납_리스트를_조회한다(vehicleInfoId: string): Promise<ReservationVehicle[]> {
        const reservationVehicles = await this.domainReservationVehicleService.findAll({
            where: { isReturned: true, vehicleInfoId },
            order: {
                returnedAt: 'DESC',
            },
        });
        const employees = await this.domainEmployeeService.findAll({
            where: { employeeId: In(reservationVehicles.map((reservationVehicle) => reservationVehicle.returnedBy)) },
        });
        const employeeMap = new Map(employees.map((employee) => [employee.employeeId, employee]));
        reservationVehicles.forEach((reservationVehicle) => {
            reservationVehicle.returnedBy = employeeMap.get(reservationVehicle.returnedBy)?.name;
        });
        return reservationVehicles;
    }

    async 반납_상세정보를_조회한다(reservationVehicleId: string): Promise<ReservationVehicle> {
        const reservationVehicle =
            await this.domainReservationVehicleService.findByReservationVehicleId(reservationVehicleId);
        const employee = await this.domainEmployeeService.findOne({
            where: { employeeId: reservationVehicle.returnedBy },
        });
        reservationVehicle.returnedBy = employee.name;
        return reservationVehicle;
    }

    /**
     * resourceId로 차량 정보만 조회
     */
    async 차량정보만_조회한다(resourceId: string) {
        const vehicleInfo = await this.domainVehicleInfoService.findOne({
            where: { resourceId },
        });
        return vehicleInfo;
    }
}
