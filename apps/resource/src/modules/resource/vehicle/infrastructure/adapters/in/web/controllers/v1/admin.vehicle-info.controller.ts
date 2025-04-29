import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { UpdateVehicleInfoDto } from '@resource/modules/resource/vehicle/application/dtos/update-vehicle-info.dto';
import { VehicleInfoResponseDto } from '@resource/modules/resource/vehicle/application/dtos/vehicle-response.dto';
import { VehicleInfoUsecase } from '@resource/modules/resource/vehicle/application/usecases/vehicle-info.usecase';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';

@ApiTags('4. 차량 정보 - 관리자 페이지')
@Controller('v1/admin/vehicle-info')
@ApiBearerAuth()
@Roles(Role.SYSTEM_ADMIN)
export class AdminVehicleInfoController {
    constructor(private readonly vehicleInfoUsecase: VehicleInfoUsecase) {}

    @Get(':vehicleInfoId')
    @ApiOperation({ summary: '차량 정보 조회' })
    @ApiDataResponse({
        status: 200,
        description: '차량 정보를 성공적으로 조회했습니다.',
        type: VehicleInfoResponseDto,
    })
    async findVehicleInfo(@Param('vehicleInfoId') vehicleInfoId: string): Promise<VehicleInfoResponseDto> {
        return this.vehicleInfoUsecase.findVehicleInfo(vehicleInfoId);
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
        return this.vehicleInfoUsecase.updateVehicleInfo(vehicleInfoId, updateVehicleInfoDto);
    }
}
