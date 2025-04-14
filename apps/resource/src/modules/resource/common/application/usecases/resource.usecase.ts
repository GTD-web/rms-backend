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
import { IsNull, Not, MoreThan, LessThan, DataSource, In, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
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

@Injectable()
export class ResourceUsecase {
    constructor(
        private readonly resourceService: ResourceService,
        private readonly resourceManagerService: ResourceManagerService,
        private readonly resourceGroupService: ResourceGroupService,
        private readonly vehicleInfoService: VehicleInfoService,
        private readonly vehicleInfoUsecase: VehicleInfoUsecase,
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
                        const [reservations] = await this.eventEmitter.emitAsync('find.reservation', {
                            repositoryOptions: {
                                where: {
                                    resourceId: resource.resourceId,
                                    startDate: MoreThanOrEqual(
                                        regex.test(startDate)
                                            ? DateUtil.date(startDate).toDate()
                                            : DateUtil.date(startDate + ' 00:00:00').toDate(),
                                    ),
                                    endDate: LessThanOrEqual(
                                        regex.test(endDate)
                                            ? DateUtil.date(endDate).toDate()
                                            : DateUtil.date(endDate + ' 23:59:59').toDate(),
                                    ),
                                    status: In([ReservationStatus.CONFIRMED, ReservationStatus.CLOSED]),
                                },
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
                'vehicleInfo.consumables.maintenances',
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
                resource.vehicleInfo.consumables.forEach((consumable) => {
                    const replaceCycle = Number(consumable.replaceCycle);
                    if (consumable.maintenances && consumable.maintenances.length > 0) {
                        console.log('consumable.maintenances', consumable.maintenances);
                        // 각 maintenance에 계산 필드 추가
                        consumable.maintenances = [consumable.maintenances[0]].map((maintenance) => {
                            return {
                                ...maintenance,
                                mileageFromLastMaintenance: mileage - Number(maintenance.mileage),
                                maintanceRequired: mileage - Number(maintenance.mileage) > replaceCycle,
                            };
                        });
                    }
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
                    return this.resourceManagerService.save(
                        {
                            resourceId: savedResource.resourceId,
                            employeeId: manager.employeeId,
                        },
                        { queryRunner },
                    );
                }),
                ...managers.map((manager) =>
                    this.eventEmitter.emit('add.user.role', {
                        employeeId: manager.employeeId,
                        role: Role.RESOURCE_ADMIN,
                        repositoryOptions: { queryRunner },
                    }),
                ),
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
                const currentManagers = await this.resourceManagerService.findAll({
                    where: {
                        resourceId: resourceId,
                    },
                });
                const currentManagerIds = currentManagers.map((m) => m.employeeId);
                const newManagerIds = updateRequest.managers.map((m) => m.employeeId);

                // 제거된 관리자들의 role 업데이트
                const removedManagerIds = currentManagerIds.filter((id) => !newManagerIds.includes(id));
                await Promise.all(
                    removedManagerIds.map(async (employeeId) => {
                        const otherResources = await this.resourceManagerService.findAll({
                            where: {
                                employeeId: employeeId,
                            },
                        });
                        if (otherResources.length === 1) {
                            await this.eventEmitter.emit('remove.user.role', {
                                employeeId: employeeId,
                                role: Role.RESOURCE_ADMIN,
                                repositoryOptions: { queryRunner },
                            });
                        }
                    }),
                );

                // 새로운 관리자들의 role 업데이트
                const addedManagerIds = newManagerIds.filter((id) => !currentManagerIds.includes(id));
                await Promise.all(
                    addedManagerIds.map((employeeId) =>
                        this.eventEmitter.emit('add.user.role', {
                            employeeId: employeeId,
                            role: Role.RESOURCE_ADMIN,
                            repositoryOptions: { queryRunner },
                        }),
                    ),
                );

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
            relations: ['resourceGroup'],
        });
        if (!resource) {
            throw new NotFoundException('Resource not found');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
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
