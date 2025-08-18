import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { UpdateVehicleInfoDto } from '../dtos/update-vehicle-info.dto';
import { VehicleInfoResponseDto } from '../dtos/vehicle-response.dto';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { VehicleInfoService } from '@src/application/resource/vehicle/services/vehicle-info.service';
import { ReservationVehicleResponseDto } from '@src/application/reservation/core/dtos/reservation-response.dto';
import {
    ReturnVehicleDetailResponseDto,
    ReturnVehicleResponseDto,
} from '@src/application/reservation/core/dtos/return-vehicle-response.dto';

@ApiTags('4. 차량 정보 - 관리자 ')
@Controller('v1/admin/vehicle-info')
@ApiBearerAuth()
@Roles(Role.SYSTEM_ADMIN)
export class AdminVehicleInfoController {
    constructor(private readonly vehicleInfoService: VehicleInfoService) {}

    @Get(':vehicleInfoId')
    @ApiOperation({ summary: '차량 정보 조회' })
    @ApiDataResponse({
        status: 200,
        description: '차량 정보를 성공적으로 조회했습니다.',
        type: VehicleInfoResponseDto,
    })
    async findVehicleInfo(@Param('vehicleInfoId') vehicleInfoId: string): Promise<VehicleInfoResponseDto> {
        return this.vehicleInfoService.findVehicleInfo(vehicleInfoId);
    }

    @Patch(':vehicleInfoId')
    @ApiOperation({ summary: '차량 정보 수정' })
    @ApiDataResponse({
        status: 200,
        description: '차량 정보가 성공적으로 수정되었습니다.',
        type: VehicleInfoResponseDto,
    })
    async update(
        @Param('vehicleInfoId') vehicleInfoId: string,
        @Body() updateVehicleInfoDto: UpdateVehicleInfoDto,
    ): Promise<VehicleInfoResponseDto> {
        return this.vehicleInfoService.updateVehicleInfo(vehicleInfoId, updateVehicleInfoDto);
    }

    // 차량 반납 리스트
    @Get(':vehicleInfoId/return-list')
    @ApiOperation({ summary: '차량 반납 리스트 조회' })
    @ApiDataResponse({
        status: 200,
        description: '차량 반납 리스트를 성공적으로 조회했습니다.',
        type: [ReturnVehicleResponseDto],
    })
    async findReturnList(@Param('vehicleInfoId') vehicleInfoId: string): Promise<ReturnVehicleResponseDto[]> {
        return this.vehicleInfoService.findReturnList(vehicleInfoId);
    }
}
