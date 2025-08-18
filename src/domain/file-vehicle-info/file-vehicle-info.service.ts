import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainFileVehicleInfoRepository } from './file-vehicle-info.repository';
import { BaseService } from '@libs/services/base.service';
import { FileVehicleInfo } from '@libs/entities/file-vehicle-info.entity';

@Injectable()
export class DomainFileVehicleInfoService extends BaseService<FileVehicleInfo> {
    constructor(private readonly fileVehicleInfoRepository: DomainFileVehicleInfoRepository) {
        super(fileVehicleInfoRepository);
    }

    async findByFileVehicleInfoId(fileVehicleInfoId: string): Promise<FileVehicleInfo> {
        const fileVehicleInfo = await this.fileVehicleInfoRepository.findOne({
            where: { fileVehicleInfoId },
        });
        return fileVehicleInfo;
    }

    async findByVehicleInfoId(vehicleInfoId: string): Promise<FileVehicleInfo[]> {
        return this.fileVehicleInfoRepository.findAll({
            where: { vehicleInfoId },
            relations: ['vehicleInfo', 'file'],
        });
    }

    async findByFileId(fileId: string): Promise<FileVehicleInfo[]> {
        return this.fileVehicleInfoRepository.findAll({
            where: { fileId },
            relations: ['vehicleInfo', 'file'],
        });
    }

    async findByType(type: string): Promise<FileVehicleInfo[]> {
        return this.fileVehicleInfoRepository.findAll({
            where: { type },
            relations: ['vehicleInfo', 'file'],
        });
    }
}
