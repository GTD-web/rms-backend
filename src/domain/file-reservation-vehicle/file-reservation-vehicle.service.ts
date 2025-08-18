import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainFileReservationVehicleRepository } from './file-reservation-vehicle.repository';
import { BaseService } from '@libs/services/base.service';
import { FileReservationVehicle } from '@libs/entities/file-reservation-vehicle.entity';

@Injectable()
export class DomainFileReservationVehicleService extends BaseService<FileReservationVehicle> {
    constructor(private readonly fileReservationVehicleRepository: DomainFileReservationVehicleRepository) {
        super(fileReservationVehicleRepository);
    }

    async findByFileReservationVehicleId(fileReservationVehicleId: string): Promise<FileReservationVehicle> {
        const fileReservationVehicle = await this.fileReservationVehicleRepository.findOne({
            where: { fileReservationVehicleId },
        });
        return fileReservationVehicle;
    }

    async findByReservationVehicleId(reservationVehicleId: string): Promise<FileReservationVehicle[]> {
        return this.fileReservationVehicleRepository.findAll({
            where: { reservationVehicleId },
            relations: ['reservationVehicle', 'file'],
        });
    }

    async findByFileId(fileId: string): Promise<FileReservationVehicle[]> {
        return this.fileReservationVehicleRepository.findAll({
            where: { fileId },
            relations: ['reservationVehicle', 'file'],
        });
    }

    async findByType(type: string): Promise<FileReservationVehicle[]> {
        return this.fileReservationVehicleRepository.findAll({
            where: { type },
            relations: ['reservationVehicle', 'file'],
        });
    }
}
