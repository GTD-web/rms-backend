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

    @ApiTags('sprint0.3-')
    @Get()
    @ApiOperation({ summary: '차량 정보 조회' })
    @ApiDataResponse({
        status: 200,
        description: '차량 정보를 성공적으로 조회했습니다.',
        type: VehicleInfoResponseDto,
    })
    async findByResourceId(@Param('resourceId') resourceId: string): Promise<VehicleInfoResponseDto> {
        return; //this.toResponseDto(vehicleInfo);
    }

    @ApiTags('sprint0.3-')
    @Patch()
    @ApiOperation({ summary: '차량 정보 수정' })
    @ApiDataResponse({
        status: 200,
        description: '차량 정보가 성공적으로 수정되었습니다.',
        type: VehicleInfoResponseDto,
    })
    async update(
        @Param('resourceId') resourceId: string,
        @Body() updateVehicleInfoDto: UpdateVehicleInfoDto,
    ): Promise<VehicleInfoResponseDto> {
        const vehicleInfo = await this.vehicleInfoService.update(resourceId, updateVehicleInfoDto);
        return; //this.toResponseDto(vehicleInfo);
    }
}
