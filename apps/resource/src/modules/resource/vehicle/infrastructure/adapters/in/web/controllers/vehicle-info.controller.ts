import { Controller, Get, Post, Put, Delete, Body, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { VehicleInfoService } from '@resource/modules/resource/vehicle/application/services/vehicle-info.service';
import { CreateVehicleInfoDto } from '@resource/modules/resource/vehicle/application/dtos/create-vehicle-info.dto';
import { UpdateVehicleInfoDto } from '@resource/modules/resource/vehicle/application/dtos/update-vehicle-info.dto';
import { VehicleInfoResponseDto } from '@resource/modules/resource/vehicle/application/dtos/vehicle-info-response.dto';

@ApiTags('차량 정보')
@Controller('resources/:resourceId/vehicle-info')
@ApiBearerAuth()
export class VehicleInfoController {
    constructor(private readonly vehicleInfoService: VehicleInfoService) {}

    private toResponseDto(vehicleInfo: any): VehicleInfoResponseDto {
        return {
            vehicleInfoId: vehicleInfo.vehicleInfoId,
            resourceId: vehicleInfo.resourceId,
            insuranceName: vehicleInfo.insuranceName,
            insuranceNumber: vehicleInfo.insuranceNumber,
            totalMileage: vehicleInfo.totalMileage,
            leftMileage: vehicleInfo.leftMileage,
            parkingLocationImages: vehicleInfo.parkingLocationImages,
            odometerImages: vehicleInfo.odometerImages,
        };
    }

    // @Post()
    // @ApiOperation({ summary: '차량 정보 등록' })
    // @ApiDataResponse({
    //     status: 201,
    //     description: '차량 정보가 성공적으로 등록되었습니다.',
    //     type: VehicleInfoResponseDto,
    // })
    // async create(
    //     @Param('resourceId') resourceId: string,
    //     @Body() createVehicleInfoDto: CreateVehicleInfoDto,
    // ): Promise<VehicleInfoResponseDto> {
    //     const vehicleInfo = await this.vehicleInfoService.create({
    //         ...createVehicleInfoDto,
    //         resourceId,
    //     });
    //     return this.toResponseDto(vehicleInfo);
    // }

    // @Get()
    // @ApiOperation({ summary: '차량 정보 조회' })
    // @ApiDataResponse({
    //     status: 200,
    //     description: '차량 정보를 성공적으로 조회했습니다.',
    //     type: VehicleInfoResponseDto,
    // })
    // async findByResourceId(@Param('resourceId') resourceId: string): Promise<VehicleInfoResponseDto> {
    //     const vehicleInfo = await this.vehicleInfoService.findByResourceId(resourceId);
    //     return this.toResponseDto(vehicleInfo);
    // }

    // @Patch()
    // @ApiOperation({ summary: '차량 정보 수정' })
    // @ApiDataResponse({
    //     status: 200,
    //     description: '차량 정보가 성공적으로 수정되었습니다.',
    //     type: VehicleInfoResponseDto,
    // })
    // async update(
    //     @Param('resourceId') resourceId: string,
    //     @Body() updateVehicleInfoDto: UpdateVehicleInfoDto,
    // ): Promise<VehicleInfoResponseDto> {
    //     const vehicleInfo = await this.vehicleInfoService.update(resourceId, updateVehicleInfoDto);
    //     return this.toResponseDto(vehicleInfo);
    // }

    // @Delete()
    // @ApiOperation({ summary: '차량 정보 삭제' })
    // @ApiDataResponse({
    //     status: 200,
    //     description: '차량 정보가 성공적으로 삭제되었습니다.',
    // })
    // async remove(@Param('resourceId') resourceId: string): Promise<void> {
    //     await this.vehicleInfoService.remove(resourceId);
    // }
}
