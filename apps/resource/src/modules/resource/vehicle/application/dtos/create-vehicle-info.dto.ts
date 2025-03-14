import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsBoolean } from 'class-validator';

export class CreateVehicleInfoDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    leftMileage?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    totalMileage?: string;

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
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    replaceCycle: string;

    @ApiProperty({ default: true })
    @IsBoolean()
    notifyReplacementCycle: boolean;

    @ApiProperty({
        description: '차량 ID',
        example: 'vehicle-123',
    })
    vehicleId: string;
}

export class CreateMaintenanceDto {
    @ApiProperty()
    @IsString()
    date: string;

    @ApiProperty()
    @IsString()
    mileage: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    cost?: string;

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
