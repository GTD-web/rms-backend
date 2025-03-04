import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';
import { ResourceLocation } from '@libs/entities/resource.entity';

class LocationDto implements ResourceLocation {
    @ApiProperty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsString()
    detailAddress: string;
}

// 차량 반납
export class ReturnVehicleDto {
    @ApiProperty()
    location: LocationDto;

    @ApiProperty()
    @IsString()
    leftMileage: string;

    @ApiProperty()
    @IsString()
    totalMileage: string;

    @ApiProperty()
    @IsArray()
    @IsString({ each: true })
    parkingLocationImages: string[];

    @ApiProperty()
    @IsArray()
    @IsString({ each: true })
    odometerImages: string[];
}
