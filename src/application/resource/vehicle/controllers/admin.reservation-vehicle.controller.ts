import { Controller, Get, Param, Patch, Body, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { UpdateVehicleInfoDto } from '../dtos/update-vehicle-info.dto';
import { VehicleInfoResponseDto } from '../dtos/vehicle-response.dto';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { ResponseInterceptor } from '@libs/interceptors/response.interceptor';
import { ErrorInterceptor } from '@libs/interceptors/error.interceptor';
import { VehicleInfoService } from '@src/application/resource/vehicle/services/vehicle-info.service';
import { ReservationVehicleResponseDto } from '@src/application/reservation/core/dtos/reservation-response.dto';
import {
    ReturnVehicleDetailResponseDto,
    ReturnVehicleResponseDto,
} from '@src/application/reservation/core/dtos/return-vehicle-response.dto';

@ApiTags('4. 차량 예약 정보 - 관리자 ')
@Controller('v1/admin/reservation-vehicle')
@ApiBearerAuth()
@Roles(Role.SYSTEM_ADMIN)
@UseInterceptors(ResponseInterceptor, ErrorInterceptor)
export class AdminReservationVehicleController {
    constructor(private readonly vehicleInfoService: VehicleInfoService) {}

    // 차량 반납 상세 조회
    @Get(':reservationVehicleId')
    @ApiOperation({ summary: '차량 반납 상세 조회' })
    @ApiDataResponse({
        status: 200,
        description: '차량 반납 상세를 성공적으로 조회했습니다.',
        type: ReturnVehicleDetailResponseDto,
    })
    async findReturnDetail(
        @Param('reservationVehicleId') reservationVehicleId: string,
    ): Promise<ReturnVehicleDetailResponseDto> {
        return this.vehicleInfoService.findReturnDetail(reservationVehicleId);
    }
}
