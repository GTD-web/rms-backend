import { ApiProperty } from '@nestjs/swagger';

export class MaintenanceResponseDto {
    @ApiProperty()
    maintenanceId: string;

    @ApiProperty()
    resourceId: string;

    @ApiProperty()
    title: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty()
    cost: number;

    @ApiProperty()
    maintenanceDate: Date;

    @ApiProperty({ required: false })
    maintenanceShop?: string;

    @ApiProperty()
    mileage: number;
}

export class ConsumableResponseDto {
    @ApiProperty()
    consumableId: string;

    @ApiProperty()
    resourceId: string;

    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty()
    cost: number;

    @ApiProperty()
    replacementDate: Date;

    @ApiProperty()
    mileage: number;

    @ApiProperty({ required: false })
    nextReplacementDate?: Date;

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
