import {
    Injectable,
    BadRequestException,
    NotFoundException,
    InternalServerErrorException,
    Inject,
} from '@nestjs/common';
import { ResourceGroupWithResourcesResponseDto, ResourceResponseDto } from '../dtos/resource-response.dto';
import { ResourceService } from '../services/resource.service';
import { ResourceGroupService } from '../services/resource-group.service';
import {
    IsNull,
    Not,
    MoreThan,
    LessThan,
    DataSource,
    In,
    MoreThanOrEqual,
    LessThanOrEqual,
    Between,
    TypeORMError,
    DriverOptionNotSetError,
} from 'typeorm';
import { ResourceType } from '@libs/enums/resource-type.enum';
import {
    ReturnVehicleDto,
    UpdateResourceInfoDto,
    UpdateResourceOrdersDto,
} from '@resource/modules/resource/common/application/dtos/update-resource.dto';
import { VehicleInfoService } from '@resource/modules/resource/vehicle/application/services/vehicle-info.service';
import { Resource } from '@libs/entities/resource.entity';
import { CreateResourceInfoDto } from '../dtos/create-resource.dto';
import { ResourceTypeHandler } from '@resource/modules/resource/common/domain/ports/resource-type.handler.port';
import { ResourceManagerService } from '../services/resource-manager.service';
import { Role } from '@libs/enums/role-type.enum';
import { UserService } from '@resource/modules/auth/application/services/user.service';
import { User as UserEntity } from '@libs/entities';
import { VehicleInfoUsecase } from '@resource/modules/resource/vehicle/application/usecases/vehicle-info.usecase';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { FileService } from '@resource/modules/file/application/services/file.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DateUtil } from '@libs/utils/date.util';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { MaintenanceService } from '@resource/modules/resource/vehicle/application/services/maintenance.service';
import {
    ResourceAvailabilityDto,
    TimeSlotDto,
} from '@resource/modules/resource/common/application/dtos/available-time-response.dto';
import { Reservation } from '@libs/entities/reservation.entity';
import { ResourceQueryDto } from '../dtos/resource-query.dto';

@Injectable()
export class ResourceUsecase {
    constructor(
        private readonly resourceService: ResourceService,
        private readonly resourceManagerService: ResourceManagerService,
        private readonly resourceGroupService: ResourceGroupService,
        private readonly vehicleInfoService: VehicleInfoService,
        private readonly vehicleInfoUsecase: VehicleInfoUsecase,
        private readonly maintenanceService: MaintenanceService,
        private readonly dataSource: DataSource,
        private readonly fileService: FileService,
        @Inject('ResourceTypeHandlers')
        private readonly typeHandlers: Map<ResourceType, ResourceTypeHandler>,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    async findResources(type: ResourceType): Promise<ResourceResponseDto[]> {
        let relations: string[] = [];
        if (type === ResourceType.VEHICLE) {
            relations = ['vehicleInfo', 'vehicleInfo.consumables'];
        } else if (type === ResourceType.MEETING_ROOM) {
            relations = ['meetingRoomInfo'];
        } else if (type === ResourceType.ACCOMMODATION) {
            relations = ['accommodationInfo'];
        }
        const resources = await this.resourceService.findAll({
            where: {
                type: type,
            },
            relations: relations,
        });
        return resources.map((resource) => new ResourceResponseDto(resource));
    }

    async findResourcesByTypeAndDateWithReservations(
        type: ResourceType,
        startDate: string,
        endDate: string,
        user: UserEntity,
    ): Promise<ResourceGroupWithResourcesResponseDto[]> {
        if (!!startDate && !!endDate && startDate > endDate) {
            throw new BadRequestException('Start date must be before end date');
        }
        const regex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
        const startDateObj = regex.test(startDate)
            ? DateUtil.date(startDate).toDate()
            : DateUtil.date(startDate + ' 00:00:00').toDate();

        const endDateObj = regex.test(endDate)
            ? DateUtil.date(endDate).toDate()
            : DateUtil.date(endDate + ' 23:59:59').toDate();
        const resourceGroups = await this.resourceGroupService.findAll({
            where: {
                type: type,
                parentResourceGroupId: Not(IsNull()),
            },
            order: {
                order: 'ASC',
            },
        });

        const resourceGroupsWithResources = await Promise.all(
            resourceGroups.map(async (resourceGroup) => {
                const resources = await this.resourceService.findAll({
                    where: {
                        resourceGroupId: resourceGroup.resourceGroupId,
                    },
                    order: {
                        order: 'ASC',
                    },
                });

                const resourcesWithReservations = await Promise.all(
                    resources.map(async (resource) => {
                        const where = {
                            resourceId: resource.resourceId,
                            status: In([ReservationStatus.CONFIRMED, ReservationStatus.CLOSED]),
                        };
                        const whereArray = [
                            {
                                ...where,
                                startDate: MoreThanOrEqual(startDateObj),
                                endDate: LessThanOrEqual(endDateObj),
                            },
                            {
                                ...where,
                                startDate: Between(startDateObj, endDateObj),
                            },
                            {
                                ...where,
                                endDate: Between(startDateObj, endDateObj),
                            },
                        ];

                        const [reservations] = await this.eventEmitter.emitAsync('find.reservation', {
                            repositoryOptions: {
                                where: whereArray,
                                relations: ['participants'],
                                order: {
                                    startDate: 'ASC',
                                },
                            },
                        });

                        const reservationResponseDtos = reservations.map((reservation) => {
                            const isMine = reservation.participants.some(
                                (participant) => participant.employeeId === user.employeeId,
                            );
                            delete reservation.participants;
                            return {
                                ...reservation,
                                startDate: DateUtil.date(reservation.startDate).format(),
                                endDate: DateUtil.date(reservation.endDate).format(),
                                isMine: isMine,
                            };
                        });

                        return {
                            ...resource,
                            resourceId: resource.resourceId,
                            reservations: reservationResponseDtos,
                        };
                    }),
                );

                return {
                    ...resourceGroup,
                    resources: resourcesWithReservations,
                };
            }),
        );

        return resourceGroupsWithResources;
    }

    async findResourceDetail(resourceId: string): Promise<ResourceResponseDto> {
        const resource = await this.resourceService.findOne({
            where: { resourceId: resourceId },
            relations: [
                'resourceGroup',
                'vehicleInfo',
                'vehicleInfo.consumables',
                // 'vehicleInfo.consumables.maintenances',
                'meetingRoomInfo',
                'accommodationInfo',
                'resourceManagers',
                'resourceManagers.employee',
            ],
        });

        if (!resource) {
            throw new NotFoundException('Resource not found');
        }
        resource['imageFiles'] = await this.fileService.findAllFilesByFilePath(resource.images);

        // 관리자 페이지 내 자원 상세 페이지에서 사용하는 정비기록 관련 계산 필드 추가
        if (resource.vehicleInfo) {
            if (resource.vehicleInfo.consumables) {
                const mileage = Number(resource.vehicleInfo.totalMileage);
                for (const consumable of resource.vehicleInfo.consumables) {
                    const replaceCycle = Number(consumable.replaceCycle);
                    const latestMaintenance = await this.maintenanceService.findOne({
                        where: { consumableId: consumable.consumableId },
                        order: { date: 'DESC' },
                    });
                    if (latestMaintenance) {
                        consumable.maintenances = [latestMaintenance].map((maintenance) => {
                            return {
                                ...maintenance,
                                mileageFromLastMaintenance: mileage - Number(maintenance.mileage),
                                maintanceRequired: mileage - Number(maintenance.mileage) > replaceCycle,
                            };
                        });
                    }
                }
                resource.vehicleInfo.consumables.sort((a, b) => {
                    // Check if both consumables have maintenance records
                    if (!a.maintenances?.length && !b.maintenances?.length) {
                        // Neither has maintenance records, sort by name or other property
                        return a.name.localeCompare(b.name);
                    }

                    // If only one has maintenance records, prioritize the one without maintenance
                    if (!a.maintenances?.length) return -1;
                    if (!b.maintenances?.length) return 1;

                    // Now safely access maintenance records
                    const aMileage = a.maintenances[0]?.['mileageFromLastMaintenance'] || 0;
                    const bMileage = b.maintenances[0]?.['mileageFromLastMaintenance'] || 0;

                    return aMileage - bMileage;
                });
            }
            resource.vehicleInfo['parkingLocationFiles'] = await this.fileService.findAllFilesByFilePath(
                resource.vehicleInfo.parkingLocationImages,
            );
            resource.vehicleInfo['odometerFiles'] = await this.fileService.findAllFilesByFilePath(
                resource.vehicleInfo.odometerImages,
            );
        }

        return resource;
    }

    async findAvailableTime(query: ResourceQueryDto): Promise<ResourceAvailabilityDto[]> {
        const { resourceType, resourceGroupId, startDate, endDate, startTime, endTime, am, pm, timeUnit } = query;
        const resources = await this.resourceService.findAll({
            where: {
                isAvailable: true,
                resourceGroupId: resourceGroupId,
                type: resourceType,
            },
            relations: ['resourceGroup', 'reservations'],
        });

        if (!resources || resources.length === 0) {
            return [];
        }

        // 결과 리스트 초기화
        const result: ResourceAvailabilityDto[] = [];

        // 날짜가 같은 경우 (당일 예약건)
        const isSameDay = startDate === endDate;

        // timeUnit이 있는 경우: 시간 슬롯 계산
        if (timeUnit) {
            for (const resource of resources) {
                const availabilityDto = new ResourceAvailabilityDto();
                availabilityDto.resourceId = resource.resourceId;
                availabilityDto.resourceName = resource.name;

                // 시간 슬롯 계산
                availabilityDto.availableTimeSlots = this.calculateAvailableTimeSlots(
                    resource,
                    startDate,
                    endDate,
                    am,
                    pm,
                    timeUnit,
                    isSameDay,
                );

                result.push(availabilityDto);
            }
        }
        // timeUnit이 없는 경우: 예약 가능한 자원만 필터링하여 반환 (시간 슬롯 없음)
        else {
            const combinedStartDateTime = startTime
                ? `${startDate} ${startTime}`
                : am
                  ? `${startDate} 09:00:00`
                  : `${startDate} 13:00:00`;
            const combinedEndDateTime = endTime
                ? `${endDate} ${endTime}`
                : pm
                  ? `${endDate} 18:00:00`
                  : `${endDate} 12:00:00`;

            const startDateObj = DateUtil.date(combinedStartDateTime);
            const endDateObj = DateUtil.date(combinedEndDateTime);

            // 자원별로 예약 가능 여부 확인
            for (const resource of resources) {
                // 확정된 예약만 필터링
                const confirmedReservations = resource.reservations.filter(
                    (reservation) => reservation.status === ReservationStatus.CONFIRMED,
                );

                // 예약 충돌 체크
                const hasConflict = confirmedReservations.some((reservation) => {
                    const reserveStart = DateUtil.date(reservation.startDate);
                    const reserveEnd = DateUtil.date(reservation.endDate);

                    // 완전한 겹침 체크 (새 예약의 시작이 기존 예약 범위 내 또는 새 예약의 종료가 기존 예약 범위 내)
                    return (
                        (this.isSameOrAfter(startDateObj, reserveStart) && this.isBefore(startDateObj, reserveEnd)) ||
                        (this.isAfter(endDateObj, reserveStart) && this.isSameOrBefore(endDateObj, reserveEnd)) ||
                        (this.isBefore(startDateObj, reserveStart) && this.isAfter(endDateObj, reserveEnd))
                    );
                });

                // 충돌이 없는 경우에만 결과에 추가
                if (!hasConflict) {
                    const availabilityDto = new ResourceAvailabilityDto();
                    availabilityDto.resourceId = resource.resourceId;
                    availabilityDto.resourceName = resource.name;

                    // 위치 정보 추가
                    if (resource.location) {
                        const location = resource.location as { address: string; detailAddress?: string };
                        availabilityDto.resourceLocation =
                            location.address + (location.detailAddress ? ` ${location.detailAddress}` : '');
                    }

                    result.push(availabilityDto);
                }
            }
        }

        return result;
    }

    /**
     * 자원의 가용 시간 슬롯을 계산합니다.
     */
    private calculateAvailableTimeSlots(
        resource: Resource,
        startDate: string,
        endDate: string,
        am: boolean,
        pm: boolean,
        timeUnit: number,
        isSameDay: boolean,
    ): TimeSlotDto[] {
        const availableSlots: TimeSlotDto[] = [];
        const existingReservations = resource.reservations || [];

        // 예약 상태가 CONFIRMED인 예약만 필터링
        const confirmedReservations = existingReservations.filter((reservation) => reservation.status === 'CONFIRMED');

        if (isSameDay) {
            // 당일 예약건 처리
            const dateStr = startDate; // YYYY-MM-DD 형식

            // 오전 시간대 처리 (09:00 ~ 12:00)
            if (am) {
                this.processTimeRange(dateStr, '09:00:00', '12:00:00', timeUnit, confirmedReservations, availableSlots);
            }

            // 오후 시간대 처리 (13:00 ~ 18:00)
            if (pm) {
                this.processTimeRange(dateStr, '13:00:00', '18:00:00', timeUnit, confirmedReservations, availableSlots);
            }
        } else {
            // 여러 일 예약건 처리 - 시작일부터 종료일까지 일별로 처리
            let currentDate = DateUtil.date(startDate);
            const endDateObj = DateUtil.date(endDate);

            // 날짜를 순회하며 처리
            while (this.isSameOrBefore(currentDate, endDateObj)) {
                const dateStr = currentDate.format('YYYY-MM-DD');

                // 하루 전체 시간대 처리 (09:00 ~ 18:00, 점심시간 제외)
                this.processTimeRange(dateStr, '09:00:00', '12:00:00', timeUnit, confirmedReservations, availableSlots);
                this.processTimeRange(dateStr, '13:00:00', '18:00:00', timeUnit, confirmedReservations, availableSlots);

                // 하루 증가
                currentDate = currentDate.addDays(1);
            }
        }

        return availableSlots;
    }

    /**
     * 특정 시간 범위에 대한 가용 시간 슬롯을 처리합니다.
     */
    private processTimeRange(
        dateStr: string,
        startTime: string,
        endTime: string,
        timeUnit: number,
        confirmedReservations: Reservation[],
        availableSlots: TimeSlotDto[],
    ): void {
        let slotStart = DateUtil.date(`${dateStr} ${startTime}`);
        const endTime_obj = DateUtil.date(`${dateStr} ${endTime}`);

        // timeUnit 단위로 시간 슬롯 생성
        while (this.isBefore(slotStart, endTime_obj)) {
            const slotEnd = slotStart.addMinutes(timeUnit);

            // 슬롯이 종료 시간을 초과하면 종료 시간으로 조정
            if (this.isAfter(slotEnd, endTime_obj)) {
                continue;
            }

            // 이 시간 슬롯이 기존 예약과 겹치는지 확인
            const isAvailable = !confirmedReservations.some((reservation) => {
                const reservationStart = DateUtil.date(reservation.startDate);
                const reservationEnd = DateUtil.date(reservation.endDate);

                // 슬롯 시작이 예약 범위 내에 있거나, 슬롯 종료가 예약 범위 내에 있거나,
                // 슬롯이 예약을 완전히 포함하는 경우 충돌
                return (
                    (this.isSameOrAfter(slotStart, reservationStart) && this.isBefore(slotStart, reservationEnd)) ||
                    (this.isAfter(slotEnd, reservationStart) && this.isSameOrBefore(slotEnd, reservationEnd)) ||
                    (this.isBefore(slotStart, reservationStart) && this.isAfter(slotEnd, reservationEnd))
                );
            });

            if (isAvailable) {
                availableSlots.push({
                    startTime: slotStart.format(),
                    endTime: slotEnd.format(),
                });
            }

            slotStart = slotStart.addMinutes(timeUnit);
        }
    }

    /**
     * DateUtil 헬퍼 메서드: d1이 d2와 같거나 이전인지 확인
     */
    private isSameOrBefore(d1: any, d2: any): boolean {
        return d1.toDate().getTime() <= d2.toDate().getTime();
    }

    /**
     * DateUtil 헬퍼 메서드: d1이 d2 이전인지 확인
     */
    private isBefore(d1: any, d2: any): boolean {
        return d1.toDate().getTime() < d2.toDate().getTime();
    }

    /**
     * DateUtil 헬퍼 메서드: d1이 d2 이후인지 확인
     */
    private isAfter(d1: any, d2: any): boolean {
        return d1.toDate().getTime() > d2.toDate().getTime();
    }

    /**
     * DateUtil 헬퍼 메서드: d1이 d2와 같거나 이후인지 확인
     */
    private isSameOrAfter(d1: any, d2: any): boolean {
        return d1.toDate().getTime() >= d2.toDate().getTime();
    }

    async returnVehicle(user: UserEntity, resourceId: string, updateDto: ReturnVehicleDto): Promise<boolean> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        //자원 위치 정보 수정
        const resource = await this.resourceService.findOne({
            where: { resourceId: resourceId },
            relations: ['vehicleInfo', 'resourceManagers'],
        });

        if (!resource) {
            throw new NotFoundException('Resource not found');
        }

        // 차량 주행거리정보, 차량 주차위치 이미지 저장
        const vehicleInfo = await this.vehicleInfoService.findOne({
            where: { vehicleInfoId: resource.vehicleInfo.vehicleInfoId },
        });
        if (!vehicleInfo) {
            throw new NotFoundException('Vehicle info not found');
        }

        try {
            await this.resourceService.update(resourceId, { location: updateDto.location }, { queryRunner });

            await this.vehicleInfoUsecase.updateVehicleInfo(
                vehicleInfo.vehicleInfoId,
                {
                    leftMileage: updateDto.leftMileage,
                    totalMileage: updateDto.totalMileage,
                    parkingLocationImages: updateDto.parkingLocationImages,
                    odometerImages: updateDto.odometerImages,
                },
                { queryRunner },
            );

            const notiTarget = [...resource.resourceManagers.map((manager) => manager.employeeId), user.employeeId];
            this.eventEmitter.emit('create.notification', {
                notificationType: NotificationType.RESOURCE_VEHICLE_RETURNED,
                notificationData: {
                    resourceId: resource.resourceId,
                    resourceName: resource.name,
                    resourceType: resource.type,
                },
                notiTarget,
            });

            await queryRunner.commitTransaction();

            return true;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException('Failed to return vehicle');
        } finally {
            await queryRunner.release();
        }
    }

    async createResourceWithInfos(createResourceInfo: CreateResourceInfoDto): Promise<boolean> {
        const { resource, typeInfo, managers } = createResourceInfo;

        if (!resource.resourceGroupId) {
            throw new BadRequestException('Resource group ID is required');
        }

        if (!managers || managers.length === 0) {
            throw new BadRequestException('Managers are required');
        }

        if (managers.length > 1) {
            throw new BadRequestException('Only one manager is allowed');
        }

        // const manager = await this.resourceManagerService.findOne({
        //     where: { employeeId: managers[0].employeeId },
        //     relations: ['employee', 'employee.user'],
        // });
        // console.log(manager);
        // if (!manager.employee.user.roles.includes(Role.RESOURCE_ADMIN)) {
        //     throw new BadRequestException('The manager is not a resource admin');
        // }

        // 1. 그룹 존재 확인
        const group = await this.resourceGroupService.findOne({
            where: { resourceGroupId: resource.resourceGroupId },
        });

        if (!group) {
            throw new NotFoundException('Resource group not found');
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // 자원 순서 계산
            const resources = await this.resourceService.findAll({
                where: {
                    resourceGroupId: group.resourceGroupId,
                    // deletedAt: IsNull(),
                },
            });
            const resourceOrder = resources.length;

            // 3. 기본 자원 정보 저장
            const savedResource = await this.resourceService.save({ ...resource, order: resourceOrder } as Resource, {
                queryRunner,
            });

            // 4. 타입별 정보 저장
            const handler = this.typeHandlers.get(group.type);

            if (!handler) {
                throw new BadRequestException(`Unsupported resource type: ${group.type}`);
            }
            await handler.createTypeInfo(savedResource, typeInfo, { queryRunner });

            // 5. 자원 관리자 정보 저장
            await Promise.all([
                ...managers.map((manager) => {
                    console.log(manager);
                    return this.resourceManagerService.save(
                        {
                            resourceId: savedResource.resourceId,
                            employeeId: manager.employeeId,
                        },
                        { queryRunner },
                    );
                }),
                // ...managers.map((manager) =>
                //     this.eventEmitter.emit('add.user.role', {
                //         employeeId: manager.employeeId,
                //         role: Role.RESOURCE_ADMIN,
                //         repositoryOptions: { queryRunner },
                //     }),
                // ),
            ]);

            await queryRunner.commitTransaction();

            return true;
        } catch (err) {
            console.error(err);
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException('Failed to create resource');
        } finally {
            await queryRunner.release();
        }
    }

    async updateResource(resourceId: string, updateRequest: UpdateResourceInfoDto): Promise<ResourceResponseDto> {
        const resource = await this.resourceService.findOne({
            where: {
                resourceId: resourceId,
            },
            relations: ['resourceGroup'],
        });

        if (!resource) {
            throw new NotFoundException('Resource not found');
        }

        // if (updateRequest.managers && Array.isArray(updateRequest.managers) && updateRequest.managers.length > 1) {
        //     throw new BadRequestException('Only one manager is allowed');
        // }

        // if (updateRequest.managers && Array.isArray(updateRequest.managers) && updateRequest.managers.length > 0) {
        //     const managerId = updateRequest.managers[0].employeeId;
        //     const manager = await this.resourceManagerService.findOne({
        //         where: {
        //             employeeId: managerId,
        //         },
        //         relations: ['employee', 'employee.user'],
        //     });
        //     if (!manager.employee.user.roles.includes(Role.RESOURCE_ADMIN)) {
        //         throw new BadRequestException('The manager is not a resource admin');
        //     }
        // }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // 1. 기본 자원 정보 업데이트
            if (updateRequest.resource) {
                await this.resourceService.update(resourceId, updateRequest.resource, { queryRunner });
            }

            // 2. 자원 관리자 정보 업데이트
            if (updateRequest.managers) {
                // const currentManagers = await this.resourceManagerService.findAll({
                //     where: {
                //         resourceId: resourceId,
                //     },
                // });
                // const currentManagerIds = currentManagers.map((m) => m.employeeId);
                const newManagerIds = updateRequest.managers.map((m) => m.employeeId);

                // 제거된 관리자들의 role 업데이트
                // const removedManagerIds = currentManagerIds.filter((id) => !newManagerIds.includes(id));
                // await Promise.all(
                //     removedManagerIds.map(async (employeeId) => {
                //         const otherResources = await this.resourceManagerService.findAll({
                //             where: {
                //                 employeeId: employeeId,
                //             },
                //         });
                //         if (otherResources.length === 1) {
                //             await this.eventEmitter.emit('remove.user.role', {
                //                 employeeId: employeeId,
                //                 role: Role.RESOURCE_ADMIN,
                //                 repositoryOptions: { queryRunner },
                //             });
                //         }
                //     }),
                // );

                // // 새로운 관리자들의 role 업데이트
                // const addedManagerIds = newManagerIds.filter((id) => !currentManagerIds.includes(id));
                // await Promise.all(
                //     addedManagerIds.map((employeeId) =>
                //         this.eventEmitter.emit('add.user.role', {
                //             employeeId: employeeId,
                //             role: Role.RESOURCE_ADMIN,
                //             repositoryOptions: { queryRunner },
                //         }),
                //     ),
                // );

                await this.resourceManagerService.updateManagers(resourceId, newManagerIds, { queryRunner });
            }

            await queryRunner.commitTransaction();

            return this.findResourceDetail(resourceId);
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException('Failed to update resource');
        } finally {
            await queryRunner.release();
        }
    }
    async reorderResources(updateResourceOrdersDto: UpdateResourceOrdersDto): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await Promise.all(
                updateResourceOrdersDto.orders.map(async (order) => {
                    await this.resourceService.update(order.resourceId, { order: order.newOrder }, { queryRunner });
                }),
            );

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException('Failed to reorder resources');
        } finally {
            await queryRunner.release();
        }
    }

    async deleteResource(resourceId: string): Promise<void> {
        const resource = await this.resourceService.findOne({
            where: {
                resourceId: resourceId,
            },
            relations: ['resourceGroup', 'resourceManagers'],
        });
        if (!resource) {
            throw new NotFoundException('Resource not found');
        }
        if (resource.isAvailable) {
            throw new BadRequestException('Resource is available');
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await this.resourceService.update(resourceId, { resourceGroupId: null }, { queryRunner });

            for (const manager of resource.resourceManagers) {
                await this.resourceManagerService.remove(manager.resourceManagerId, { queryRunner });
            }

            await this.resourceService.softDelete(resourceId, { queryRunner });

            // 자원 순서 재계산
            const resources = await this.resourceService.findAll({
                where: {
                    resourceId: Not(resourceId),
                    resourceGroupId: resource.resourceGroupId,
                    deletedAt: IsNull(),
                },
                order: {
                    order: 'ASC',
                },
            });

            for (let i = 0; i < resources.length; i++) {
                await this.resourceService.update(resources[i].resourceId, { order: i }, { queryRunner });
            }

            await queryRunner.commitTransaction();
        } catch (err) {
            console.error(err);
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException('Failed to delete resource');
        } finally {
            await queryRunner.release();
        }
    }
}
