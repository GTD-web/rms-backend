import { ApiProperty } from '@nestjs/swagger';

export class MaintenanceResponseDto {
    @ApiProperty()
    maintenanceId: string;

    @ApiProperty()
    consumableId: string;

    @ApiProperty()
    date: string;

    @ApiProperty()
    mileage: string;

    @ApiProperty()
    cost: string;

    @ApiProperty()
    images: string[];

    @ApiProperty()
    mileageFromLastMaintenance?: number;

    @ApiProperty()
    maintanceRequired?: boolean;
}

export class ConsumableResponseDto {
    @ApiProperty()
    consumableId: string;

    @ApiProperty()
    vehicleInfoId: string;

    @ApiProperty({ description: '소모품 이름' })
    name: string;

    @ApiProperty({ description: '소모품 교체 주기' })
    replaceCycle: string;

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

    @ApiProperty({ type: [ConsumableResponseDto], required: false })
    consumables?: ConsumableResponseDto[];
}
