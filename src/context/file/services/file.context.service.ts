import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DomainFileService } from '@src/domain/file/file.service';
import { DomainFileReservationVehicleService } from '@src/domain/file-reservation-vehicle/file-reservation-vehicle.service';
import { DomainFileVehicleInfoService } from '@src/domain/file-vehicle-info/file-vehicle-info.service';
import { In, LessThan } from 'typeorm';
import { File } from '@libs/entities/file.entity';
import { ReservationVehicleFileResponseDto } from '../dtos';
import { S3Service } from '../adapter/s3.service';
import { MimeType } from '@libs/enums/mime-type.enum';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { DateUtil } from '@libs/utils/date.util';

export interface CreateFileDataDto {
    filePath: string;
}

@Injectable()
export class FileContextService {
    constructor(
        private readonly domainFileService: DomainFileService,
        private readonly domainFileReservationVehicleService: DomainFileReservationVehicleService,
        private readonly domainFileVehicleInfoService: DomainFileVehicleInfoService,
        private readonly s3Service: S3Service,
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

    // 파일 업로드 관련 메서드들
    async 파일을_업로드한다(file: Express.Multer.File): Promise<File> {
        const newFile = await this.s3Service.uploadFile(file);
        const savedFile = await this.domainFileService.save(newFile);
        return savedFile;
    }

    async 다중_파일을_업로드한다(files: Express.Multer.File[]): Promise<File[]> {
        const uploadPromises = files.map((file) => this.파일을_업로드한다(file));
        return await Promise.all(uploadPromises);
    }

    // 파일 삭제 관련 메서드들
    async 파일을_삭제한다(fileId: string): Promise<void> {
        let file: File;
        if (fileId) {
            file = await this.domainFileService.findFileById(fileId);
            if (!file) throw new NotFoundException(ERROR_MESSAGE.BUSINESS.FILE.NOT_FOUND);
        } else {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.FILE.ID_OR_PATH_REQUIRED);
        }

        await this.s3Service.deleteFile(file);
        await this.domainFileService.delete(file.fileId);
    }

    async 다중_파일을_삭제한다(fileIds: string[]): Promise<void> {
        const deletePromises = fileIds.map((fileId) => this.파일을_삭제한다(fileId));
        await Promise.all(deletePromises);
    }

    async 임시_파일들을_삭제한다(): Promise<void> {
        const files = await this.임시_파일들을_조회한다();
        const deletePromises = files.map((file) => this.파일을_삭제한다(file.fileId));
        await Promise.all(deletePromises);
    }

    // 파일 조회 관련 메서드들
    async 임시_파일들을_조회한다(): Promise<File[]> {
        return await this.domainFileService.findAll({
            where: { isTemporary: true, createdAt: LessThan(DateUtil.now().addDays(-1).toDate()) },
        });
    }

    // Presigned URL 관련 메서드들
    async 프리사인드_URL을_생성한다(mime: MimeType): Promise<string> {
        if (!mime) {
            throw new BadRequestException('Mime type is required');
        }
        return this.s3Service.generatePresignedUrl(mime);
    }

    // 파일 데이터 생성 관련 메서드들
    async 파일_데이터를_생성한다(createFileDataDto: CreateFileDataDto): Promise<File> {
        const fileName = createFileDataDto.filePath.split('/').pop();
        const fileExists = await this.s3Service.checkFileExists(fileName);

        if (!fileExists) {
            throw new BadRequestException('File not found in S3');
        }

        const file = await this.domainFileService.create({
            fileName,
            filePath: this.s3Service.getFileUrl(fileName),
        });
        return await this.domainFileService.save(file);
    }

    /**
     * 차량정보의 파일들을 조회
     */
    async 차량정보_파일을_조회한다(vehicleInfoId: string): Promise<{
        parkingLocationImages: File[];
        odometerImages: File[];
        indoorImages: File[];
    }> {
        const fileVehicleInfos = await this.domainFileVehicleInfoService.findByVehicleInfoId(vehicleInfoId);

        const result = {
            parkingLocationImages: [],
            odometerImages: [],
            indoorImages: [],
        };

        // 타입별로 파일 ID 분류
        for (const fileVehicleInfo of fileVehicleInfos) {
            if (fileVehicleInfo.type === 'PARKING_LOCATION') {
                result.parkingLocationImages.push(fileVehicleInfo.fileId);
            } else if (fileVehicleInfo.type === 'ODOMETER') {
                result.odometerImages.push(fileVehicleInfo.fileId);
            } else if (fileVehicleInfo.type === 'INDOOR') {
                result.indoorImages.push(fileVehicleInfo.fileId);
            }
        }

        // 파일 ID로 실제 파일 정보 조회
        return {
            parkingLocationImages:
                result.parkingLocationImages.length > 0
                    ? await this.domainFileService.findAll({
                          where: { fileId: In(result.parkingLocationImages) },
                      })
                    : [],
            odometerImages:
                result.odometerImages.length > 0
                    ? await this.domainFileService.findAll({
                          where: { fileId: In(result.odometerImages) },
                      })
                    : [],
            indoorImages:
                result.indoorImages.length > 0
                    ? await this.domainFileService.findAll({
                          where: { fileId: In(result.indoorImages) },
                      })
                    : [],
        };
    }
}
