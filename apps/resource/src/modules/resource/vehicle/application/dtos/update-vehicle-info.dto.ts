import { ApiProperty } from '@nestjs/swagger';
import {
    IsOptional,
    IsArray,
    IsBoolean,
    Min,
    Max,
    IsInt,
    IsDateString,
    Matches,
    IsString,
    Length,
} from 'class-validator';

export class UpdateMaintenanceDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, {
        message: '날짜 형식이 올바르지 않습니다. YYYY-MM-DD 형식이어야 합니다.',
    })
    date?: string;

    @ApiProperty({ required: false })
    @IsInt()
    @Min(0)
    @Max(999999999)
    @IsOptional()
    mileage?: number;

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
    @IsOptional()
    consumableId?: string;
}

export class UpdateConsumableDto {
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
    @Length(0, 100)
    @IsOptional()
    vehicleNumber?: string;

    @ApiProperty({ required: false })
    @IsString()
    @Length(0, 100)
    @IsOptional()
    insuranceName?: string;

    @ApiProperty({ required: false })
    @IsString()
    @Length(0, 100)
    @IsOptional()
    insuranceNumber?: string;

    @ApiProperty({ required: false })
    @IsInt()
    @Min(0)
    @Max(999999999)
    @IsOptional()
    totalMileage?: number;

    @ApiProperty({ required: false })
    @IsInt()
    @Min(0)
    @Max(999999999)
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
