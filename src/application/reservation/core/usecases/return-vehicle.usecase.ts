import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { DomainReservationVehicleService } from '@src/domain/reservation-vehicle/reservation-vehicle.service';
import { ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { ReturnVehicleDto } from '../dtos/update-reservation.dto';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { DataSource, In } from 'typeorm';
import { Employee } from '@libs/entities';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { DateUtil } from '@libs/utils/date.util';
import { NotificationService } from '@src/application/notification/services/notification.service';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';
import { DomainFileService } from '@src/domain/file/file.service';
import { DomainFileReservationVehicleService } from '@src/domain/file-reservation-vehicle/file-reservation-vehicle.service';
import { DomainFileVehicleInfoService } from '@src/domain/file-vehicle-info/file-vehicle-info.service';

@Injectable()
export class ReturnVehicleUsecase {
    constructor(
        private readonly reservationService: DomainReservationService,
        private readonly reservationVehicleService: DomainReservationVehicleService,
        private readonly resourceService: DomainResourceService,
        private readonly vehicleInfoService: DomainVehicleInfoService,
        private readonly notificationService: NotificationService,
        private readonly fileService: DomainFileService,
        private readonly fileReservationVehicleService: DomainFileReservationVehicleService,
        private readonly fileVehicleInfoService: DomainFileVehicleInfoService,
        private readonly dataSource: DataSource,
    ) {}

    async execute(user: Employee, reservationId: string, returnDto: ReturnVehicleDto): Promise<boolean> {
        const reservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: ['resource', 'resource.vehicleInfo', 'resource.resourceManagers'],
            withDeleted: true,
        });

        if (!reservation) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESERVATION.NOT_FOUND);
        }

        if (reservation.resource.type !== ResourceType.VEHICLE) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.INVALID_RESOURCE_TYPE);
        }

        if (reservation.status !== ReservationStatus.CONFIRMED) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.CANNOT_RETURN_STATUS(reservation.status));
        }

        if (reservation.resource.vehicleInfo.totalMileage > returnDto.totalMileage) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.INVALID_MILEAGE);
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const reservationVehicles = await this.reservationVehicleService.findAll({
                where: { reservationId },
                relations: ['reservation', 'vehicleInfo'],
            });

            if (!reservationVehicles || reservationVehicles.length === 0) {
                throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESERVATION.VEHICLE_NOT_FOUND);
            }

            const reservationVehicle = reservationVehicles[0];

            if (reservationVehicle.isReturned) {
                throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.VEHICLE_ALREADY_RETURNED);
            }

            await this.reservationService.update(
                reservationId,
                {
                    status: ReservationStatus.CLOSED,
                },
                { queryRunner },
            );

            await this.reservationVehicleService.update(
                reservationVehicle.reservationVehicleId,
                {
                    endOdometer: returnDto.totalMileage,
                    isReturned: true,
                    returnedAt: DateUtil.now().toDate(),
                },
                { queryRunner },
            );

            const vehicleInfoId = reservation.resource.vehicleInfo.vehicleInfoId;

            await this.resourceService.update(
                reservation.resource.resourceId,
                { location: returnDto.location },
                { queryRunner },
            );

            if (!returnDto.parkingLocationImages) returnDto.parkingLocationImages = [];
            if (!returnDto.odometerImages) returnDto.odometerImages = [];
            if (!returnDto.indoorImages) returnDto.indoorImages = [];
            returnDto.parkingLocationImages = returnDto.parkingLocationImages.map((image) =>
                this.fileService.getFileUrl(image),
            );
            returnDto.odometerImages = returnDto.odometerImages.map((image) => this.fileService.getFileUrl(image));
            returnDto.indoorImages = returnDto.indoorImages.map((image) => this.fileService.getFileUrl(image));

            const images = [...returnDto.parkingLocationImages, ...returnDto.odometerImages, ...returnDto.indoorImages];

            if (images.length > 0) {
                await this.fileService.updateTemporaryFiles(images, false, {
                    queryRunner,
                });
            }

            // 파일 경로로 파일 ID 찾기
            let parkingLocationFileIds: string[] = [];
            let odometerFileIds: string[] = [];
            let indoorFileIds: string[] = [];

            if (returnDto.parkingLocationImages.length > 0) {
                const files = await this.fileService.findAllFilesByFilePath(returnDto.parkingLocationImages);
                parkingLocationFileIds = files.map((file) => file.fileId);
            }

            if (returnDto.odometerImages.length > 0) {
                const files = await this.fileService.findAllFilesByFilePath(returnDto.odometerImages);
                odometerFileIds = files.map((file) => file.fileId);
            }

            if (returnDto.indoorImages.length > 0) {
                const files = await this.fileService.findAllFilesByFilePath(returnDto.indoorImages);
                indoorFileIds = files.map((file) => file.fileId);
            }

            // 차량예약에 파일들을 연결 (히스토리성 - 기존 데이터 유지하고 새로 추가)
            const reservationVehicleConnections = [];

            if (parkingLocationFileIds.length > 0) {
                reservationVehicleConnections.push(
                    ...parkingLocationFileIds.map((fileId) => ({
                        reservationVehicleId: reservationVehicle.reservationVehicleId,
                        fileId,
                        type: 'PARKING_LOCATION',
                    })),
                );
            }

            if (odometerFileIds.length > 0) {
                reservationVehicleConnections.push(
                    ...odometerFileIds.map((fileId) => ({
                        reservationVehicleId: reservationVehicle.reservationVehicleId,
                        fileId,
                        type: 'ODOMETER',
                    })),
                );
            }

            if (indoorFileIds.length > 0) {
                reservationVehicleConnections.push(
                    ...indoorFileIds.map((fileId) => ({
                        reservationVehicleId: reservationVehicle.reservationVehicleId,
                        fileId,
                        type: 'INDOOR',
                    })),
                );
            }

            if (reservationVehicleConnections.length > 0) {
                await this.fileReservationVehicleService.saveMultiple(reservationVehicleConnections, { queryRunner });
            }

            // 차량정보에 파일들을 연결 (기존 데이터 삭제 후 새로 생성)
            await this.fileVehicleInfoService.deleteByVehicleInfoId(vehicleInfoId, { queryRunner });

            const vehicleInfoConnections = [];

            if (parkingLocationFileIds.length > 0) {
                vehicleInfoConnections.push(
                    ...parkingLocationFileIds.map((fileId) => ({
                        vehicleInfoId,
                        fileId,
                        type: 'PARKING_LOCATION',
                    })),
                );
            }

            if (odometerFileIds.length > 0) {
                vehicleInfoConnections.push(
                    ...odometerFileIds.map((fileId) => ({
                        vehicleInfoId,
                        fileId,
                        type: 'ODOMETER',
                    })),
                );
            }

            if (indoorFileIds.length > 0) {
                vehicleInfoConnections.push(
                    ...indoorFileIds.map((fileId) => ({
                        vehicleInfoId,
                        fileId,
                        type: 'INDOOR',
                    })),
                );
            }

            if (vehicleInfoConnections.length > 0) {
                await this.fileVehicleInfoService.saveMultiple(vehicleInfoConnections, { queryRunner });
            }

            await this.vehicleInfoService.update(
                vehicleInfoId,
                {
                    totalMileage: returnDto.totalMileage,
                    leftMileage: returnDto.leftMileage,
                    parkingLocationImages: returnDto.parkingLocationImages,
                    odometerImages: returnDto.odometerImages,
                    indoorImages: returnDto.indoorImages,
                },
                { queryRunner },
            );

            const notiTarget = [user.employeeId];
            await this.notificationService.createNotification(
                NotificationType.RESOURCE_VEHICLE_RETURNED,
                {
                    resourceId: reservation.resource.resourceId,
                    resourceName: reservation.resource.name,
                    resourceType: reservation.resource.type,
                },
                notiTarget,
            );

            await queryRunner.commitTransaction();
            return true;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error('Error in returnVehicle:', error);
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
