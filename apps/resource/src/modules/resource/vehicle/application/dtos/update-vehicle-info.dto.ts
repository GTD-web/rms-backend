import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsArray, IsDate, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateMaintenanceDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    date?: string;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    mileage?: number;

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
    @IsOptional()
    consumableId?: string;
}

export class UpdateConsumableDto {
    @ApiProperty({ description: '소모품 이름' })
    @IsString()
    name: string;

    @ApiProperty({ description: '소모품 교체 주기' })
    @IsNumber()
    replaceCycle: number;

    @ApiProperty({ default: true, description: '소모품 교체 알림 주기' })
    @IsBoolean()
    @IsOptional()
    notifyReplacementCycle?: boolean;

    @ApiProperty({
        description: '차량 ID',
        example: 'vehicle-123',
    })
    vehicleInfoId: string;
}

export class UpdateVehicleInfoDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    insuranceName?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    insuranceNumber?: string;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    totalMileage?: number;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    leftMileage?: number;

    @ApiProperty({ required: false })
    @IsArray()
    @IsOptional()
    parkingLocationImages?: string[];

    @ApiProperty({ required: false })
    @IsArray()
    @IsOptional()
    odometerImages?: string[];
}
