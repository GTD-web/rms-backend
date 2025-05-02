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
    LessThan,
    DataSource,
    In,
    MoreThanOrEqual,
    LessThanOrEqual,
    Between,
    Raw,
    MoreThan,
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
import { User as UserEntity } from '@libs/entities';
import { VehicleInfoUsecase } from '@resource/modules/resource/vehicle/application/usecases/vehicle-info.usecase';
import { ParticipantsType, ReservationStatus } from '@libs/enums/reservation-type.enum';
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
import { ConsumableService } from '@resource/modules/resource/vehicle/application/services/consumable.service';

@Injectable()
export class ResourceUsecase {
    constructor(
        private readonly resourceService: ResourceService,
        private readonly resourceManagerService: ResourceManagerService,
        private readonly resourceGroupService: ResourceGroupService,
        private readonly vehicleInfoService: VehicleInfoService,
        private readonly vehicleInfoUsecase: VehicleInfoUsecase,
        private readonly maintenanceService: MaintenanceService,
        private readonly consumableService: ConsumableService,
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
        user: UserEntity,
        type: ResourceType,
        startDate: string,
        endDate: string,
        isMine?: boolean,
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
                        const dateCondition = Raw(
                            (alias) =>
                                `(${alias} BETWEEN :startDateObj AND :endDateObj OR
                              "Reservation"."endDate" BETWEEN :startDateObj AND :endDateObj OR
                              (${alias} <= :startDateObj AND "Reservation"."endDate" >= :endDateObj))`,
                            { startDateObj, endDateObj },
                        );

                        const where = {
                            startDate: dateCondition,
                            resourceId: resource.resourceId,
                            status: In([ReservationStatus.CONFIRMED, ReservationStatus.CLOSED]),
                        };

                        const [reservations] = await this.eventEmitter.emitAsync('find.reservation', {
                            repositoryOptions: {
                                where: where,
                                relations: ['participants'],
                                order: {
                                    startDate: 'ASC',
                                },
                            },
                        });

                        const reservationResponseDtos = reservations
                            .map((reservation) => {
                                const isMine = reservation.participants.some(
                                    (participant) =>
                                        participant.type === ParticipantsType.RESERVER &&
                                        participant.employeeId === user.employeeId,
                                );
                                return {
                                    ...reservation,
                                    startDate: DateUtil.date(reservation.startDate).format(),
                                    endDate: DateUtil.date(reservation.endDate).format(),
                                    isMine: isMine,
                                };
                            })
                            .filter((reservation) => {
                                if (isMine) {
                                    return reservation.participants.some(
                                        (participant) => participant.employeeId === user.employeeId,
                                    );
                                }
                                delete reservation.participants;
                                return true;
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
    async findResourceDetailForUser(employeeId: string, resourceId: string): Promise<ResourceResponseDto> {
        const resource = await this.resourceService.findOne({
            where: { resourceId: resourceId },
            relations: [
                'resourceGroup',
                'vehicleInfo',
                // 'vehicleInfo.consumables',
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

        //  소모품 현황과 정비내역 및 정비내역 추가 기능 필요
        if (resource.vehicleInfo && resource.resourceManagers.some((manager) => manager.employeeId === employeeId)) {
            resource.vehicleInfo['consumables'] = await this.consumableService.findAll({
                where: { vehicleInfoId: resource.vehicleInfo.vehicleInfoId },
            });
            if (resource.vehicleInfo.consumables && resource.vehicleInfo.consumables.length > 0) {
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
        return new ResourceResponseDto(resource);
    }

    async findResourceDetailForAdmin(resourceId: string): Promise<ResourceResponseDto> {
        const resource = await this.resourceService.findOne({
            where: { resourceId: resourceId },
            relations: [
                'resourceGroup',
                'vehicleInfo',
                'vehicleInfo.consumables',
                'meetingRoomInfo',
                'accommodationInfo',
                'resourceManagers',
                'resourceManagers.employee',
            ],
        });

        if (!resource) {
            throw new NotFoundException('Resource not found');
        }
        console.log(resource.images);
        resource['imageFiles'] = await this.fileService.findAllFilesByFilePath(resource.images);
        console.log(resource['imageFiles']);

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

        return new ResourceResponseDto(resource);
    }

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

        const resources = await this.resourceService.findAll({
            where: {
                isAvailable: true,
                resourceGroupId: resourceGroupId,
                type: resourceType,
            },
            relations: ['resourceGroup'],
        });

        const startDateObj = LessThan(
            endTime ? DateUtil.date(endDate + ' ' + endTime).toDate() : DateUtil.date(endDate + ' 23:59:59').toDate(),
        );
        const endDateObj = MoreThanOrEqual(
            startTime
                ? DateUtil.date(startDate + ' ' + startTime).toDate()
                : DateUtil.date(startDate + ' 00:00:00').toDate(),
        );

        for (const resource of resources) {
            const [reservations] = await this.eventEmitter.emitAsync('find.reservation', {
                repositoryOptions: {
                    where: {
                        resourceId: resource.resourceId,
                        reservationId: reservationId ? Not(reservationId) : undefined,
                        status: In([ReservationStatus.CONFIRMED, ReservationStatus.CLOSED]),
                        startDate: startDateObj,
                        endDate: endDateObj,
                    },
                },
            });
            resource.reservations = reservations;
        }
        const result: ResourceAvailabilityDto[] = [];

        if (!resources || (resources && resources.length === 0)) {
            return result;
        }

        // 결과 리스트 초기화

        // 날짜가 같은 경우 (당일 예약건)
        const isSameDay = startDate === endDate;
        const isAccommodation = resourceType === ResourceType.ACCOMMODATION;
        // 숙소 예약이 아닌 당일 예약건 -> 시간 슬롯
        // 숙소 예약 혹은 여러 일 예약건 -> 자원 슬롯

        // timeUnit이 있는 경우: 시간 슬롯 계산
        if (!isAccommodation && isSameDay && timeUnit) {
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
        else if (isAccommodation || !isSameDay) {
            const combinedStartDateTime = startTime ? `${startDate} ${startTime}` : `${startDate} 00:00:00`; // 기본 시작 시간은 09:00

            const combinedEndDateTime = endTime ? `${endDate} ${endTime}` : `${endDate} 23:59:59`; // 기본 종료 시간은 18:00

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
        } else {
            throw new BadRequestException('시간 조회 조건이 올바르지 않습니다.');
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
        console.log(am, pm);
        const availableSlots: TimeSlotDto[] = [];
        const existingReservations = resource.reservations || [];

        // 예약 상태가 CONFIRMED인 예약만 필터링
        const confirmedReservations = existingReservations; //.filter((reservation) => reservation.status === 'CONFIRMED');

        if (isSameDay) {
            // 당일 예약건 처리
            const dateStr = startDate; // YYYY-MM-DD 형식
            const currentMinute = DateUtil.now().toDate().getMinutes();
            const roundedHour =
                currentMinute < 30 ? DateUtil.now().format('HH:00:00') : DateUtil.now().format('HH:30:00');
            const startTime =
                DateUtil.date(startDate).format('YYYY-MM-DD') === DateUtil.now().format('YYYY-MM-DD')
                    ? roundedHour
                    : am
                      ? '09:00:00'
                      : '13:00:00';
            const endTime = pm ? '18:00:00' : '12:00:00';
            if (am && pm) {
                this.processTimeRange(dateStr, startTime, endTime, timeUnit, confirmedReservations, availableSlots);
            } else if (am) {
                this.processTimeRange(dateStr, startTime, endTime, timeUnit, confirmedReservations, availableSlots);
            } else if (pm) {
                this.processTimeRange(dateStr, startTime, endTime, timeUnit, confirmedReservations, availableSlots);
            }
        } else {
            // 여러 일 예약건 처리 - 시작일부터 종료일까지 일별로 처리
            let currentDate = DateUtil.date(startDate);
            const endDateObj = DateUtil.date(endDate);

            // 날짜를 순회하며 처리
            while (this.isSameOrBefore(currentDate, endDateObj)) {
                const dateStr = currentDate.format('YYYY-MM-DD');

                // 하루 전체 시간대 처리 (09:00 ~ 18:00)
                this.processTimeRange(dateStr, '09:00:00', '18:00:00', timeUnit, confirmedReservations, availableSlots);
                // 점심시간 제외
                // this.processTimeRange(dateStr, '13:00:00', '18:00:00', timeUnit, confirmedReservations, availableSlots);

                // 하루 증가
                currentDate = currentDate.addDays(1);
            }
        }

        return availableSlots;
    }

    /**
     * 특정 시간 범위에 대한 가용 시간 슬롯을 처리합니다.
     * timeUnit: 각 예약의 길이(기간) (분 단위)
     * 슬롯 시작 시간은 30분 간격으로 생성됩니다.
     */
    private processTimeRange(
        dateStr: string,
        startTime: string,
        endTime: string,
        timeUnit: number,
        confirmedReservations: Reservation[],
        availableSlots: TimeSlotDto[],
    ): void {
        const startTime_obj = DateUtil.date(`${dateStr} ${startTime}`);
        const endTime_obj = DateUtil.date(`${dateStr} ${endTime}`);
        // 30분 간격으로 슬롯 시작 시간 생성
        const slotIntervalMinutes = 30;

        // 각 슬롯 시작 시간에 대해 반복
        let slotStart = startTime_obj;

        while (this.isBefore(slotStart, endTime_obj)) {
            // timeUnit 만큼의 슬롯 길이를 계산
            const slotEnd = slotStart.addMinutes(timeUnit);

            // 슬롯 끝이 허용된 종료 시간을 초과하면, 처리하지 않고 다음 시작 시간으로 넘어감
            if (this.isAfter(slotEnd, endTime_obj)) {
                slotStart = slotStart.addMinutes(slotIntervalMinutes);
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

            // 다음 슬롯 시작 시간은 30분 후
            slotStart = slotStart.addMinutes(slotIntervalMinutes);
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

    async checkAvailability(resourceId: string, startDate: string, endDate: string): Promise<boolean> {
        const startDateObj = DateUtil.date(startDate).toDate();
        const endDateObj = DateUtil.date(endDate).toDate();

        const resource = await this.resourceService.findOne({
            where: {
                resourceId: resourceId,
                reservations: {
                    status: ReservationStatus.CONFIRMED,
                    startDate: LessThan(endDateObj),
                    endDate: MoreThan(startDateObj),
                },
            },
            relations: ['reservations'],
        });

        return !resource;
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

        // if (managers.length > 1) {
        //     throw new BadRequestException('Only one manager is allowed');
        // }

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
                const newManagerIds = updateRequest.managers.map((m) => m.employeeId);
                await this.resourceManagerService.updateManagers(resourceId, newManagerIds, { queryRunner });
            }

            await queryRunner.commitTransaction();

            return this.findResourceDetailForAdmin(resourceId);
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
