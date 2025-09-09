import { Injectable } from '@nestjs/common';
import { Employee } from '@libs/entities';
import { ResourceContextService } from '@src/context/resource/services/resource.context.service';
import { NotificationContextService } from '@src/context/notification/services/notification.context.service';
import { Role } from '@libs/enums/role-type.enum';
import { ParticipantsType, ReservationStatus } from '@libs/enums/reservation-type.enum';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { DateUtil } from '@libs/utils/date.util';
import { LessThan, MoreThan, Raw } from 'typeorm';
import { TaskListResponseDto, TaskResponseDto } from './dtos/task-response.dto';
import { ReservationContextService } from '@src/context/reservation/services/reservation.context.service';
import { ScheduleQueryContextService } from '@src/context/schedule/services/schedule-query.context.service';

@Injectable()
export class TaskManagementService {
    constructor(
        private readonly resourceContextService: ResourceContextService,
        private readonly reservationContextService: ReservationContextService,
        private readonly notificationContextService: NotificationContextService,
        private readonly scheduleQueryContextService: ScheduleQueryContextService,
    ) {}

    /**
     * 사용자의 작업 목록을 조회한다
     */
    async getTaskList(user: Employee, type?: string): Promise<TaskListResponseDto> {
        let delayedReturnTasks = [];
        let consumableReplaceTasks = [];

        if (type === '차량반납지연' || type === '전체') {
            // 반납 지연된 예약 조회
            const scheduleIds = await this.scheduleQueryContextService.직원의_역할별_일정ID들을_조회한다(
                user.employeeId,
                ParticipantsType.RESERVER,
            );
            const scheduleRelations = await this.scheduleQueryContextService.복수_일정과_관계정보들을_조회한다(
                scheduleIds,
                {
                    withReservation: true,
                    withResource: true, // 리소스 정보도 함께 조회
                },
            );
            // 메모리에서 지연반납 조건 체크
            const now = new Date();
            const potentialDelayedReservations = scheduleRelations
                .filter(
                    ({ reservation }) => reservation && reservation.status === 'CONFIRMED' && reservation.endDate < now,
                )
                .map(({ reservation, resource }) => ({ reservation, resource }));

            // 지연반납 확인을 위해 reservationVehicles 정보가 필요한 예약들만 추가 조회
            const delayedReturnReservations = await this.reservationContextService.지연반납_예약_상세정보를_조회한다(
                potentialDelayedReservations.map(({ reservation }) => reservation.reservationId),
            );

            // 실제 지연반납 상태인 예약들만 필터링 및 작업 목록 변환
            delayedReturnTasks = delayedReturnReservations
                .filter(
                    (reservation) =>
                        reservation.reservationVehicles &&
                        reservation.reservationVehicles.some((vehicle) => !vehicle.isReturned),
                )
                .map((reservation) => {
                    // scheduleRelations에서 이미 조회한 resource 정보 활용
                    const scheduleData = scheduleRelations.find(
                        ({ reservation: r }) => r?.reservationId === reservation.reservationId,
                    );
                    const resourceInfo = scheduleData?.resource || reservation.resource;

                    return {
                        type: '반납지연',
                        title: `${resourceInfo.name} 반납 지연 중`,
                        scheduleId: scheduleData?.schedule?.scheduleId,
                        reservationId: reservation.reservationId,
                        resourceId: resourceInfo.resourceId,
                        resourceName: resourceInfo.name,
                        startDate: reservation.startDate,
                        endDate: reservation.endDate,
                    };
                });
        }
        if (type === '소모품교체' || type === '전체') {
            const isResourceAdmin = user.roles.includes(Role.RESOURCE_ADMIN);
            const isSystemAdmin = user.roles.includes(Role.SYSTEM_ADMIN);

            let needReplaceConsumable = [];
            if (isResourceAdmin || isSystemAdmin) {
                // 소모품 교체 필요한 자원들 조회
                needReplaceConsumable = await this.교체필요한_소모품을_조회한다(user, isSystemAdmin);
            }
            // 소모품 교체 작업 목록 변환
            consumableReplaceTasks = needReplaceConsumable.map((item) => ({
                type: '소모품교체',
                title: item.title,
                reservationId: null,
                resourceId: item.resourceId,
                resourceName: item.resourceName,
                consumableId: item.consumableId,
                consumableName: item.consumableName,
                startDate: null,
                endDate: null,
            }));
        }

        const items = [...delayedReturnTasks, ...consumableReplaceTasks];

        return {
            totalCount: items.length,
            items,
        };
    }

    /**
     * 관리자용 작업 목록을 조회한다
     */
    async getAdminTaskList(type?: string): Promise<TaskResponseDto[]> {
        if (type === '차량반납지연') {
            return this.reservationContextService.모든_지연반납_차량을_조회한다();
        } else if (type === '소모품교체') {
            return this.교체필요한_모든_소모품을_조회한다();
        } else {
            return [];
        }
    }

    /**
     * 교체 필요한 모든 소모품을 조회한다 (관리자용)
     */
    private async 교체필요한_모든_소모품을_조회한다() {
        // 모든 자원의 소모품 상태 조회
        const resources = await this.resourceContextService.소모품정보와_함께_모든자원을_조회한다();

        const needReplaceConsumables = [];

        for (const resource of resources) {
            for (const consumable of resource.vehicleInfo?.consumables || []) {
                const latestMaintenance = consumable.maintenances.sort((a, b) => a.date - b.date)[0] || null;
                if (latestMaintenance) {
                    const maintenanceRequired =
                        resource.vehicleInfo.totalMileage - Number(latestMaintenance.mileage) > consumable.replaceCycle;

                    if (maintenanceRequired) {
                        // 해당 소모품에 대한 알림 조회
                        const notifications = await this.notificationContextService.소모품교체_알림을_조회한다(
                            resource.resourceId,
                            consumable.name,
                            // latestMaintenance.date,
                        );

                        needReplaceConsumables.push({
                            type: '소모품교체',
                            title: `${consumable.name} 교체 필요`,
                            reservationId: null,
                            resourceId: resource.resourceId,
                            resourceName: resource.name,
                            consumableId: consumable.consumableId,
                            consumableName: consumable.name,
                            startDate: null,
                            endDate: null,
                            manager: {
                                employeeId: resource.resourceManagers[0].employee.employeeId,
                                name: resource.resourceManagers[0].employee.name,
                                employeeNumber: resource.resourceManagers[0].employee.employeeNumber,
                                department: resource.resourceManagers[0].employee.department,
                                position: resource.resourceManagers[0].employee.position,
                            },
                            notifications: notifications,
                        });
                    }
                }
            }
        }

        return needReplaceConsumables;
    }

    /**
     * 교체 필요한 소모품을 조회한다 (사용자별)
     */
    private async 교체필요한_소모품을_조회한다(user: Employee, isSystemAdmin: boolean) {
        const resources = await this.resourceContextService.관리자별_자원을_소모품정보와_함께_조회한다(
            user.employeeId,
            isSystemAdmin,
        );

        const needReplaceConsumables = [];

        for (const resource of resources) {
            for (const consumable of resource.vehicleInfo?.consumables || []) {
                const latestMaintenance = consumable.maintenances.sort((a, b) => a.date - b.date)[0] || null;

                if (latestMaintenance) {
                    const maintenanceRequired =
                        resource.vehicleInfo.totalMileage - Number(latestMaintenance.mileage) > consumable.replaceCycle;

                    if (maintenanceRequired) {
                        needReplaceConsumables.push({
                            type: '소모품교체',
                            title: `${consumable.name} 교체 필요`,
                            reservationId: null,
                            resourceId: resource.resourceId,
                            resourceName: resource.name,
                            consumableId: consumable.consumableId,
                            consumableName: consumable.name,
                            startDate: null,
                            endDate: null,
                        });
                    }
                }
            }
        }

        return needReplaceConsumables;
    }
}
