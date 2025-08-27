import { Injectable } from '@nestjs/common';
import { PaginationData } from '@libs/dtos/pagination-response.dto';

// Context Services
import { MaintenanceContextService } from '@src/context/resource/services/maintenance.context.service';
import { NotificationContextService } from '@src/context/notification/services/notification.context.service';

// DTOs
import { CreateMaintenanceDto } from '../dtos/vehicle/create-vehicle-info.dto';
import { UpdateMaintenanceDto } from '../dtos/vehicle/update-vehicle-info.dto';
import { MaintenanceResponseDto } from '../dtos/vehicle/vehicle-response.dto';

@Injectable()
export class MaintenanceService {
    constructor(
        private readonly maintenanceContextService: MaintenanceContextService,
        private readonly notificationContextService: NotificationContextService,
    ) {}

    async save(createMaintenanceDto: CreateMaintenanceDto): Promise<MaintenanceResponseDto> {
        const maintenance = await this.maintenanceContextService.정비이력을_저장한다(createMaintenanceDto);
        // await this.notificationContextService.시스템_관리자들에게_알림을_발송한다();
        return maintenance;
    }

    async findAllByVehicleInfoId(
        vehicleInfoId: string,
        page: number,
        limit: number,
    ): Promise<PaginationData<MaintenanceResponseDto>> {
        return this.maintenanceContextService.차량별_정비이력을_조회한다(vehicleInfoId, page, limit);
    }

    async findOne(maintenanceId: string): Promise<MaintenanceResponseDto> {
        return this.maintenanceContextService.정비이력을_조회한다(maintenanceId);
    }

    async update(maintenanceId: string, updateMaintenanceDto: UpdateMaintenanceDto): Promise<MaintenanceResponseDto> {
        return this.maintenanceContextService.정비이력을_수정한다(maintenanceId, updateMaintenanceDto);
    }

    async delete(maintenanceId: string): Promise<void> {
        return this.maintenanceContextService.정비이력을_삭제한다(maintenanceId);
    }
}
