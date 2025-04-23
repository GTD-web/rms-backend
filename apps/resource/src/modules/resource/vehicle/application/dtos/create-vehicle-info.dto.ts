import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsOptional,
    IsArray,
    IsBoolean,
    IsNumber,
    Max,
    Min,
    IsInt,
    Length,
    IsDateString,
    Matches,
} from 'class-validator';

export class CreateVehicleInfoDto {
    @ApiProperty({ required: true })
    @IsString()
    @Length(0, 100)
    vehicleNumber: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(999999999)
    leftMileage?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(999999999)
    totalMileage?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @Length(0, 100)
    insuranceName?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @Length(0, 100)
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
    @Length(0, 100)
    name: string;

    @ApiProperty({ description: '소모품 교체 주기' })
    @IsInt()
    @Min(0)
    @Max(999999999)
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
    @IsDateString()
    @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, {
        message: '날짜 형식이 올바르지 않습니다. YYYY-MM-DD 형식이어야 합니다.',
    })
    date: string;

    @ApiProperty()
    @IsInt()
    @Min(0)
    @Max(999999999)
    mileage: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(999999999)
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
