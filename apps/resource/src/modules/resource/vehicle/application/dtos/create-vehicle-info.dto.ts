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
    @IsString({ message: '차량 번호는 문자열이어야 합니다.' })
    @Length(0, 100, { message: '차량 번호는 100자 이하여야 합니다.' })
    vehicleNumber: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt({ message: '남은 주행거리는 숫자여야 합니다.' })
    @Min(0, { message: '남은 주행거리는 0 이상이어야 합니다.' })
    @Max(999999999, { message: '남은 주행거리는 999999999 이하여야 합니다.' })
    leftMileage?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt({ message: '총 주행거리는 숫자여야 합니다.' })
    @Min(0, { message: '총 주행거리는 0 이상이어야 합니다.' })
    @Max(999999999, { message: '총 주행거리는 999999999 이하여야 합니다.' })
    totalMileage?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString({ message: '보험 이름은 문자열이어야 합니다.' })
    @Length(0, 100, { message: '보험 이름은 100자 이하여야 합니다.' })
    insuranceName?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString({ message: '보험사 전화 번호는 문자열이어야 합니다.' })
    @Length(0, 100, { message: '보험사 전화 번호는 100자 이하여야 합니다.' })
    insuranceNumber?: string;

    @ApiProperty({ required: false, type: [String], description: '주차위치 이미지 배열' })
    @IsOptional()
    @IsArray({ message: '주차위치 이미지 입력 값은 배열이어야 합니다.' })
    parkingLocationImages?: string[];

    @ApiProperty({ required: false, type: [String], description: '계기판 이미지 배열' })
    @IsOptional()
    @IsArray({ message: '계기판 이미지 입력 값은 배열이어야 합니다.' })
    odometerImages?: string[];
}

export class CreateConsumableDto {
    @ApiProperty({ description: '소모품 이름' })
    @IsString({ message: '소모품 이름은 문자열이어야 합니다.' })
    @Length(0, 100, { message: '소모품 이름은 100자 이하여야 합니다.' })
    name: string;

    @ApiProperty({ description: '소모품 교체 주기' })
    @IsInt({ message: '소모품 교체 주기는 숫자여야 합니다.' })
    @Min(0, { message: '소모품 교체 주기는 0 이상이어야 합니다.' })
    @Max(999999999, { message: '소모품 교체 주기는 999999999 이하여야 합니다.' })
    replaceCycle: number;

    @ApiProperty({ default: true, description: '소모품 교체 알림 주기' })
    @IsBoolean({ message: '소모품 교체 알림 주기는 불리언 값이어야 합니다.' })
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
    @IsInt({ message: '주행거리는 숫자여야 합니다.' })
    @Min(0, { message: '주행거리는 0 이상이어야 합니다.' })
    @Max(999999999, { message: '주행거리는 999999999 이하여야 합니다.' })
    mileage: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt({ message: '비용은 숫자여야 합니다.' })
    @Min(0, { message: '비용은 0 이상이어야 합니다.' })
    @Max(999999999, { message: '비용은 999999999 이하여야 합니다.' })
    cost?: number;

    @ApiProperty({ required: false, type: [String], description: '이미지 배열' })
    @IsOptional()
    @IsArray({ message: '이미지 입력 값은 배열이어야 합니다.' })
    images?: string[];

    @ApiProperty({ required: false, description: '정비 담당자' })
    @IsOptional()
    @IsString({ message: '정비 담당자는 문자열이어야 합니다.' })
    @Length(0, 100, { message: '정비 담당자는 100자 이하여야 합니다.' })
    maintananceBy?: string;

    @ApiProperty({
        description: '소모품 ID',
        example: 'consumable-123',
    })
    consumableId: string;
}
