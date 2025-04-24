import { ApiProperty } from '@nestjs/swagger';
import { FileResponseDto } from '@resource/modules/file/application/dtos/file-response.dto';

export class MaintenanceResponseDto {
    @ApiProperty()
    maintenanceId: string;

    @ApiProperty()
    consumableId: string;

    @ApiProperty({ required: false })
    resourceName?: string;

    @ApiProperty({ required: false })
    consumableName?: string;

    @ApiProperty()
    date: string;

    @ApiProperty()
    mileage: number;

    @ApiProperty()
    cost: number;

    @ApiProperty()
    images: string[];

    @ApiProperty({ required: false })
    mileageFromLastMaintenance?: number;

    @ApiProperty({ required: false })
    maintanceRequired?: boolean;

    @ApiProperty({ required: false })
    previousMileage?: number;

    @ApiProperty({ required: false })
    isLatest?: boolean;

    @ApiProperty({ required: false })
    previousDate?: string;
}

export class ConsumableResponseDto {
    @ApiProperty()
    consumableId: string;

    @ApiProperty()
    vehicleInfoId: string;

    @ApiProperty({ description: '소모품 이름' })
    name: string;

    @ApiProperty({ description: '소모품 교체 주기' })
    replaceCycle: number;

    @ApiProperty({ description: '소모품 교체 알림 주기' })
    notifyReplacementCycle: boolean;

    @ApiProperty({ type: [MaintenanceResponseDto], required: false })
    maintenances?: MaintenanceResponseDto[];
}

export class VehicleInfoResponseDto {
    @ApiProperty()
    vehicleInfoId: string;

    @ApiProperty()
    resourceId: string;

    @ApiProperty()
    insuranceName: string;

    @ApiProperty()
    insuranceNumber: string;

    @ApiProperty()
    totalMileage: number;

    @ApiProperty()
    leftMileage: number;

    @ApiProperty()
    parkingLocationImages: string[];

    @ApiProperty()
    odometerImages: string[];

    @ApiProperty({ type: [FileResponseDto], required: false })
    parkingLocationFiles?: FileResponseDto[];

    @ApiProperty({ type: [FileResponseDto], required: false })
    odometerFiles?: FileResponseDto[];

    @ApiProperty({ type: [ConsumableResponseDto], required: false })
    consumables?: ConsumableResponseDto[];
}
