import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsBoolean, IsNumber } from 'class-validator';

export class CreateVehicleInfoDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    leftMileage?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    totalMileage?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    insuranceName?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    insuranceNumber?: string;

    @ApiProperty({ required: false, type: [String], description: '주차위치 이미지 배열' })
    @IsOptional()
    @IsArray()
    parkingLocationImages?: string[];

    @ApiProperty({ required: false, type: [String], description: '계기판 이미지 배열' })
    @IsOptional()
    @IsArray()
    odometerImages?: string[];
}

export class CreateConsumableDto {
    @ApiProperty({ description: '소모품 이름' })
    @IsString()
    name: string;

    @ApiProperty({ description: '소모품 교체 주기' })
    @IsNumber()
    replaceCycle: number;

    @ApiProperty({ default: true, description: '소모품 교체 알림 주기' })
    @IsBoolean()
    notifyReplacementCycle: boolean;

    @ApiProperty({
        description: '차량 ID',
        example: 'vehicle-123',
    })
    vehicleInfoId: string;
}

export class CreateMaintenanceDto {
    @ApiProperty()
    @IsString()
    date: string;

    @ApiProperty()
    @IsNumber()
    mileage: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    cost?: number;

    @ApiProperty({ required: false, type: [String] })
    @IsOptional()
    @IsArray()
    images?: string[];

    @ApiProperty({
        description: '소모품 ID',
        example: 'consumable-123',
    })
    consumableId: string;
}
