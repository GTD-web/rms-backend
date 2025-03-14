import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsArray, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateMaintenanceDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    cost?: string;

    @ApiProperty({ required: false })
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    maintenanceDate?: Date;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    maintenanceShop?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    mileage?: string;
}

export class UpdateConsumableDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    cost?: number;

    @ApiProperty({ required: false })
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    replacementDate?: Date;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    mileage?: number;

    @ApiProperty({ required: false })
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    nextReplacementDate?: Date;
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
    @IsString()
    @IsOptional()
    totalMileage?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    leftMileage?: string;

    @ApiProperty({ required: false })
    @IsArray()
    @IsOptional()
    parkingLocationImages?: string[];

    @ApiProperty({ required: false })
    @IsArray()
    @IsOptional()
    odometerImages?: string[];
}
