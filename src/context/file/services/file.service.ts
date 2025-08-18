import { Injectable } from '@nestjs/common';
import { DomainFileService } from '@src/domain/file/file.service';
import { DomainFileReservationVehicleService } from '@src/domain/file-reservation-vehicle/file-reservation-vehicle.service';
import { In } from 'typeorm';
import { File } from '@libs/entities/file.entity';
import { ReservationVehicleFileResponseDto } from '../dtos';

@Injectable()
export class FileService {
    constructor(
        private readonly domainFileService: DomainFileService,
        private readonly domainFileReservationVehicleService: DomainFileReservationVehicleService,
    ) {}

    async 차량예약_파일을_조회한다(reservationVehicleId: string): Promise<ReservationVehicleFileResponseDto> {
        const fileReservationVehicles = await this.domainFileReservationVehicleService.findAll({
            where: { reservationVehicleId },
        });
        const result = {
            parkingLocationImages: [],
            odometerImages: [],
            indoorImages: [],
        };

        for (const fileReservationVehicle of fileReservationVehicles) {
            if (fileReservationVehicle.type === 'PARKING_LOCATION') {
                result.parkingLocationImages.push(fileReservationVehicle.fileId);
            } else if (fileReservationVehicle.type === 'ODOMETER') {
                result.odometerImages.push(fileReservationVehicle.fileId);
            } else if (fileReservationVehicle.type === 'INDOOR') {
                result.indoorImages.push(fileReservationVehicle.fileId);
            }
        }

        return {
            parkingLocationImages: await this.domainFileService.findAll({
                where: { fileId: In(result.parkingLocationImages) },
            }),
            odometerImages: await this.domainFileService.findAll({
                where: { fileId: In(result.odometerImages) },
            }),
            indoorImages: await this.domainFileService.findAll({
                where: { fileId: In(result.indoorImages) },
            }),
        };
    }
}
