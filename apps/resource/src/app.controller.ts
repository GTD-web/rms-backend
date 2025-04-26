import { Controller, Get, Query } from '@nestjs/common';
import { DateUtil } from '@libs/utils/date.util';
import { Public } from '@libs/decorators/public.decorator';
import { ApiExcludeController, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
    ConsumableMaintenanceStats,
    EmployeeReservationStats,
    ResourceUsageStats,
    VehicleMaintenanceHistory,
} from '@libs/entities';
import { AppService } from './app.service';
import {
    ConsumableMaintenanceStatsFilterDto,
    ConsumableMaintenanceStatsResponseDto,
    EmployeeReservationStatsFilterDto,
    EmployeeReservationStatsResponseDto,
    ResourceUsageStatsFilterDto,
    ResourceUsageStatsResponseDto,
    StatisticsResponseDto,
    VehicleMaintenanceHistoryFilterDto,
    VehicleMaintenanceHistoryResponseDto,
} from './app.dto';

@ApiTags('6. 통계 - 관리자 페이지')
@Controller('v1/statistics')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Public()
    @Get('version')
    getVersion(): { version: string; date: string } {
        return {
            version: '1.0.0',
            date: DateUtil.now().format(),
        };
    }

    @Public()
    @Get('resource-usage-stats')
    @ApiOkResponse({
        description: '자원 사용 통계 조회 성공',
        type: [ResourceUsageStatsResponseDto],
    })
    async getResourceUsageStats(
        @Query() filter: ResourceUsageStatsFilterDto,
    ): Promise<ResourceUsageStatsResponseDto[]> {
        const stats = await this.appService.getResourceUsageStats(filter);
        return stats as unknown as ResourceUsageStatsResponseDto[];
    }

    @Public()
    @Get('vehicle-maintenance-history')
    @ApiOkResponse({
        description: '차량 정비 이력 조회 성공',
        type: [VehicleMaintenanceHistoryResponseDto],
    })
    async getVehicleMaintenanceHistory(
        @Query() filter: VehicleMaintenanceHistoryFilterDto,
    ): Promise<VehicleMaintenanceHistoryResponseDto[]> {
        const history = await this.appService.getVehicleMaintenanceHistory(filter);
        return history as unknown as VehicleMaintenanceHistoryResponseDto[];
    }

    @Public()
    @Get('consumable-maintenance-stats')
    @ApiOkResponse({
        description: '소모품 정비 통계 조회 성공',
        type: [ConsumableMaintenanceStatsResponseDto],
    })
    async getConsumableMaintenanceStats(
        @Query() filter: ConsumableMaintenanceStatsFilterDto,
    ): Promise<ConsumableMaintenanceStatsResponseDto[]> {
        const stats = await this.appService.getConsumableMaintenanceStats(filter);
        return stats as unknown as ConsumableMaintenanceStatsResponseDto[];
    }

    @Public()
    @Get('employee-reservation-stats')
    @ApiOkResponse({
        description: '직원 예약 통계 조회 성공',
        type: [EmployeeReservationStatsResponseDto],
    })
    async getEmployeeReservationStats(
        @Query() filter: EmployeeReservationStatsFilterDto,
    ): Promise<EmployeeReservationStatsResponseDto[]> {
        const stats = await this.appService.getEmployeeReservationStats(filter);
        return stats as unknown as EmployeeReservationStatsResponseDto[];
    }

    @Public()
    @Get('statistics')
    @ApiOkResponse({
        description: '모든 통계 데이터 조회 성공',
        type: StatisticsResponseDto,
    })
    async getAllStatistics(): Promise<StatisticsResponseDto> {
        const [employeeReservationStats, resourceUsageStats, vehicleMaintenanceHistory, consumableMaintenanceStats] =
            await Promise.all([
                this.appService.getEmployeeReservationStats({}),
                this.appService.getResourceUsageStats({}),
                this.appService.getVehicleMaintenanceHistory({}),
                this.appService.getConsumableMaintenanceStats({}),
            ]);

        return {
            employeeReservationStats: employeeReservationStats as unknown as EmployeeReservationStatsResponseDto[],
            resourceUsageStats: resourceUsageStats as unknown as ResourceUsageStatsResponseDto[],
            vehicleMaintenanceHistory: vehicleMaintenanceHistory as unknown as VehicleMaintenanceHistoryResponseDto[],
            consumableMaintenanceStats:
                consumableMaintenanceStats as unknown as ConsumableMaintenanceStatsResponseDto[],
        };
    }
}
