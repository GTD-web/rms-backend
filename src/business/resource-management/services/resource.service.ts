import { Injectable, BadRequestException } from '@nestjs/common';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { Employee } from '@libs/entities';

// Context Services
import { ResourceContextService } from '@src/context/resource/services/resource.context.service';
import { ReservationContextService } from '@src/context/reservation/services/reservation.context.service';

// DTOs
import {
    ResourceResponseDto,
    ResourceGroupWithResourcesAndReservationsResponseDto,
    CreateResourceResponseDto,
} from '../dtos/resource/resource-response.dto';
import { ResourceAvailabilityDto, TimeSlotDto } from '../dtos/resource/available-time-response.dto';
import { ResourceQueryDto } from '../dtos/resource/resource-query.dto';
import { CreateResourceInfoDto } from '../dtos/resource/create-resource.dto';
import { UpdateResourceInfoDto, UpdateResourceOrdersDto } from '../dtos/resource/update-resource.dto';
import { CheckAvailabilityQueryDto } from '../dtos/resource/check-availability.dto';
@Injectable()
export class ResourceService {
    constructor(
        private readonly resourceContextService: ResourceContextService,
        private readonly reservationContextService: ReservationContextService,
    ) {}
    // Admin Resource Controller
    async createResourceWithInfos(createResourceInfo: CreateResourceInfoDto): Promise<CreateResourceResponseDto> {
        return this.resourceContextService.자원과_상세정보를_생성한다(createResourceInfo);
    }

    async findResources(type: ResourceType): Promise<ResourceResponseDto[]> {
        return this.resourceContextService.자원_목록을_조회한다(type);
    }

    async findResourcesByResourceGroupId(resourceGroupId: string): Promise<ResourceResponseDto[]> {
        return this.resourceContextService.그룹별_자원_목록을_조회한다(resourceGroupId);
    }

    async findResourceDetailForAdmin(resourceId: string): Promise<ResourceResponseDto> {
        return this.resourceContextService.자원_상세정보를_조회한다(resourceId);
    }

    async reorderResources(updateResourceOrdersDto: UpdateResourceOrdersDto): Promise<void> {
        return this.resourceContextService.자원_순서를_변경한다(updateResourceOrdersDto);
    }

    async updateResource(
        resourceId: string,
        updateResourceInfoDto: UpdateResourceInfoDto,
    ): Promise<ResourceResponseDto> {
        return this.resourceContextService.자원을_수정한다(resourceId, updateResourceInfoDto);
    }

    async deleteResource(resourceId: string): Promise<void> {
        return this.resourceContextService.자원을_삭제한다(resourceId);
    }

    // User Resource Controller (임시로 기본 메서드들 사용)
    async findResourcesByTypeAndDateWithReservations(
        user: Employee,
        type: ResourceType,
        startDate: string,
        endDate: string,
        isMine: boolean,
    ): Promise<ResourceGroupWithResourcesAndReservationsResponseDto[]> {
        // TODO: 컨텍스트 서비스에 해당 메서드 추가 필요
        return [];
    }

    /**
     * 자원 가용 시간 조회 (표준 파이프라인 적용)
     */
    async findAvailableTime(query: ResourceQueryDto): Promise<ResourceAvailabilityDto[]> {
        const {
            resourceType,
            resourceGroupId,
            startDate,
            endDate,
            startTime,
            endTime,
            am,
            pm,
            timeUnit,
            reservationId,
        } = query;

        // 1. 권한: 자원 조회는 모든 직원이 가능 (생략)

        // 2. 그래프 조회: 파라미터 검증 및 자원 목록 조회
        this.validateAvailabilityQuery(query);
        const resources = await this.resourceContextService.그룹별_사용가능한_자원_목록을_조회한다(
            resourceGroupId,
            resourceType,
        );

        if (resources.length === 0) {
            return [];
        }

        // 3. 정책 판단: 자원 타입별 처리 방식 결정
        const isAccommodation = resourceType === ResourceType.ACCOMMODATION;
        const isSameDay = startDate === endDate;
        const isTimeSlotRequest = !isAccommodation && isSameDay && timeUnit;

        const result: ResourceAvailabilityDto[] = [];

        // 4. 실행/전이: 가용성 계산
        for (const resource of resources) {
            // 해당 자원의 예약 정보 조회
            const dateRangeStart = startTime
                ? new Date(`${startDate} ${startTime}`)
                : new Date(`${startDate} 00:00:00`);
            const dateRangeEnd = endTime ? new Date(`${endDate} ${endTime}`) : new Date(`${endDate} 23:59:59`);

            const reservations = await this.reservationContextService.자원의_날짜범위_예약을_조회한다(
                resource.resourceId,
                dateRangeStart,
                dateRangeEnd,
                reservationId,
            );

            if (isTimeSlotRequest) {
                // 시간 슬롯 방식: 30분 단위로 가용 시간 계산
                const availabilityDto = await this.calculateTimeSlotAvailability(
                    resource,
                    startDate!,
                    endDate!,
                    am,
                    pm,
                    timeUnit!,
                    reservations,
                );
                result.push(availabilityDto);
            } else if (isAccommodation || !isSameDay) {
                // 날짜 단위 방식: 전체 날짜/시간 범위에서 충돌 여부만 확인
                const hasConflict = this.checkDateRangeConflict(reservations, dateRangeStart, dateRangeEnd);

                if (!hasConflict) {
                    const availabilityDto = new ResourceAvailabilityDto();
                    availabilityDto.resourceId = resource.resourceId;
                    availabilityDto.resourceName = resource.name;

                    if (resource.location) {
                        const location = resource.location as any;
                        availabilityDto.resourceLocation =
                            location.address + (location.detailAddress ? ` ${location.detailAddress}` : '');
                    }

                    result.push(availabilityDto);
                }
            } else {
                throw new BadRequestException('시간 조회 조건이 올바르지 않습니다.');
            }
        }

        // 5. 후처리: 없음

        // 6. 응답 DTO 변환: 이미 완료됨
        return result;
    }

    /**
     * 가용성 조회 파라미터 검증
     */
    private validateAvailabilityQuery(query: ResourceQueryDto): void {
        const { startDate, endDate, startTime, endTime, am, pm, timeUnit } = query;

        // 1. 날짜 필수 검증
        if (!startDate && !endDate) {
            throw new BadRequestException('시작날짜 또는 종료날짜가 필요합니다.');
        }

        // 2. 날짜 범위 검증
        if (startDate && endDate && startDate > endDate) {
            throw new BadRequestException('시작날짜가 종료날짜보다 늦을 수 없습니다.');
        }

        // 3. 시간 옵션 충돌 검증
        const isTimeRange = startTime && endTime;
        const isTimeSelected = (am !== undefined || pm !== undefined) && timeUnit;

        if (isTimeRange && isTimeSelected) {
            throw new BadRequestException('시간 범위와 시간대 선택을 동시에 할 수 없습니다.');
        }
    }

    /**
     * 시간 슬롯 기반 가용성 계산
     */
    private async calculateTimeSlotAvailability(
        resource: any,
        startDate: string,
        endDate: string,
        am?: boolean,
        pm?: boolean,
        timeUnit?: number,
        reservations: any[] = [],
    ): Promise<ResourceAvailabilityDto> {
        const availabilityDto = new ResourceAvailabilityDto();
        availabilityDto.resourceId = resource.resourceId;
        availabilityDto.resourceName = resource.name;

        const isToday = startDate === new Date().toISOString().slice(0, 10);
        const timeRange = this.resourceContextService.현재시간_기준_가용시간대를_계산한다(
            resource.type,
            startDate,
            isToday,
        );

        const availableSlots = this.calculateAvailableTimeSlots(
            startDate,
            timeRange.startTime,
            timeRange.endTime,
            timeUnit!,
            am,
            pm,
            reservations,
        );

        availabilityDto.availableTimeSlots = availableSlots;
        return availabilityDto;
    }

    /**
     * 30분 단위 시간 슬롯별 가용성 계산
     */
    private calculateAvailableTimeSlots(
        dateStr: string,
        startTime: string,
        endTime: string,
        timeUnit: number,
        am?: boolean,
        pm?: boolean,
        reservations: any[] = [],
    ): TimeSlotDto[] {
        const availableSlots: TimeSlotDto[] = [];
        const slotIntervalMinutes = 30; // 30분 간격

        // 오전/오후 필터링
        let actualStartTime = startTime;
        let actualEndTime = endTime;

        if (am && !pm) {
            actualEndTime = '12:00:00';
        } else if (!am && pm) {
            actualStartTime = '12:00:00';
        }

        const startDateTime = new Date(`${dateStr} ${actualStartTime}`);
        const endDateTime = new Date(`${dateStr} ${actualEndTime}`);

        const slotStart = new Date(startDateTime);
        while (slotStart < endDateTime) {
            const slotEnd = new Date(slotStart);
            slotEnd.setMinutes(slotEnd.getMinutes() + timeUnit);

            // 슬롯이 종료 시간을 초과하면 다음 슬롯으로
            if (slotEnd > endDateTime) {
                slotStart.setMinutes(slotStart.getMinutes() + slotIntervalMinutes);
                continue;
            }

            // 예약 충돌 확인
            const isAvailable = this.reservationContextService.시간슬롯별_예약가능여부를_계산한다(
                reservations,
                slotStart,
                slotEnd,
            );

            if (isAvailable) {
                availableSlots.push({
                    startTime: slotStart.toISOString(),
                    endTime: slotEnd.toISOString(),
                });
            }

            // 다음 30분 슬롯으로 이동
            slotStart.setMinutes(slotStart.getMinutes() + slotIntervalMinutes);
        }

        return availableSlots;
    }

    /**
     * 날짜 범위 충돌 확인
     */
    private checkDateRangeConflict(reservations: any[], requestStart: Date, requestEnd: Date): boolean {
        return reservations.some((reservation) => {
            const reservationStart = new Date(reservation.startDate);
            const reservationEnd = new Date(reservation.endDate);

            return (
                (requestStart >= reservationStart && requestStart < reservationEnd) ||
                (requestEnd > reservationStart && requestEnd <= reservationEnd) ||
                (requestStart < reservationStart && requestEnd > reservationEnd)
            );
        });
    }

    async checkAvailability(
        resourceId: string,
        startDate: string,
        endDate: string,
        reservationId?: string,
    ): Promise<boolean> {
        const result = await this.resourceContextService.자원의_해당시간_예약을_확인한다(
            resourceId,
            startDate,
            endDate,
            reservationId,
        );
        return !result;
    }

    async findResourceDetailForUser(employeeId: string, resourceId: string): Promise<ResourceResponseDto> {
        return this.resourceContextService.자원_상세정보를_조회한다(resourceId);
    }
}
