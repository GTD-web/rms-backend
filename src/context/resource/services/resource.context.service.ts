import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { DataSource, In, IsNull, LessThan, MoreThan, Not } from 'typeorm';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { Resource } from '@libs/entities/resource.entity';

// Domain Services
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DomainResourceGroupService } from '@src/domain/resource-group/resource-group.service';
import { DomainResourceManagerService } from '@src/domain/resource-manager/resource-manager.service';
import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';
import { DomainMeetingRoomInfoService } from '@src/domain/meeting-room-info/meeting-room-info.service';
import { DomainAccommodationInfoService } from '@src/domain/accommodation-info/accommodation-info.service';
import { DomainEquipmentInfoService } from '@src/domain/equipment-info/equipment-info.service';
import { DomainFileService } from '@src/domain/file/file.service';

// DTOs
import {
    ResourceResponseDto,
    CreateResourceResponseDto,
} from '@src/business/resource-management/dtos/resource/resource-response.dto';
import { CreateResourceInfoDto } from '@src/business/resource-management/dtos/resource/create-resource.dto';
import {
    UpdateResourceInfoDto,
    UpdateResourceOrdersDto,
} from '@src/business/resource-management/dtos/resource/update-resource.dto';
import { CheckAvailabilityQueryDto } from '@src/business/resource-management/dtos/resource/check-availability.dto';
import { ResourceAvailabilityDto } from '@src/business/resource-management/dtos/resource/available-time-response.dto';
import { UpdateVehicleInfoDto } from '@src/business/resource-management/dtos/vehicle/update-vehicle-info.dto';
import { UpdateMeetingRoomInfoDto } from '@src/business/resource-management/dtos/meeting-room/update-meeting-room-info.dto';
import { UpdateAccommodationInfoDto } from '@src/business/resource-management/dtos/accommodation/update-accommodation-info.dto';
import { UpdateEquipmentInfoDto } from '@src/business/resource-management/dtos/equipment/update-equipment-info.dto';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';

@Injectable()
export class ResourceContextService {
    constructor(
        private readonly domainResourceService: DomainResourceService,
        private readonly domainResourceGroupService: DomainResourceGroupService,
        private readonly domainResourceManagerService: DomainResourceManagerService,
        private readonly domainVehicleInfoService: DomainVehicleInfoService,
        private readonly domainMeetingRoomInfoService: DomainMeetingRoomInfoService,
        private readonly domainAccommodationInfoService: DomainAccommodationInfoService,
        private readonly domainEquipmentInfoService: DomainEquipmentInfoService,
        private readonly domainFileService: DomainFileService,
        private readonly dataSource: DataSource,
    ) {}

    async 자원_목록을_조회한다(type: ResourceType): Promise<ResourceResponseDto[]> {
        let relations: string[] = [];
        if (type === ResourceType.VEHICLE) {
            relations = ['vehicleInfo', 'vehicleInfo.consumables'];
        } else if (type === ResourceType.MEETING_ROOM) {
            relations = ['meetingRoomInfo'];
        } else if (type === ResourceType.ACCOMMODATION) {
            relations = ['accommodationInfo'];
        } else if (type === ResourceType.EQUIPMENT) {
            relations = ['equipmentInfo'];
        }

        const resources = await this.domainResourceService.findAll({
            where: { type: type },
            relations: relations,
        });

        return resources.map((resource) => new ResourceResponseDto(resource));
    }

    async 자원과_상세정보를_생성한다(createResourceInfo: CreateResourceInfoDto): Promise<CreateResourceResponseDto> {
        const { resource, typeInfo, managers } = createResourceInfo;

        if (!resource.resourceGroupId) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESOURCE.GROUP_ID_REQUIRED);
        }

        if (!managers || managers.length === 0) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESOURCE.MANAGERS_REQUIRED);
        }

        const group = await this.domainResourceGroupService.findOne({
            where: { resourceGroupId: resource.resourceGroupId },
        });

        if (!group) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESOURCE_GROUP.NOT_FOUND);
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const resources = await this.domainResourceService.findAll({
                where: { resourceGroupId: group.resourceGroupId },
            });
            const resourceOrder = resources.length;

            if (!resource.images) resource.images = [];
            resource.images = resource.images.map((image) => this.domainFileService.getFileUrl(image));

            const savedResource = await this.domainResourceService.save(
                { ...resource, order: resourceOrder } as Resource,
                { queryRunner },
            );

            await this.domainFileService.updateTemporaryFiles(resource.images, false, { queryRunner });

            switch (group.type) {
                case ResourceType.VEHICLE:
                    await this.domainVehicleInfoService.save(
                        { ...typeInfo, resourceId: savedResource.resourceId },
                        { queryRunner },
                    );
                    break;
                case ResourceType.MEETING_ROOM:
                    await this.domainMeetingRoomInfoService.save(
                        { ...typeInfo, resourceId: savedResource.resourceId },
                        { queryRunner },
                    );
                    break;
                case ResourceType.ACCOMMODATION:
                    await this.domainAccommodationInfoService.save(
                        { ...typeInfo, resourceId: savedResource.resourceId },
                        { queryRunner },
                    );
                    break;
                case ResourceType.EQUIPMENT:
                    await this.domainEquipmentInfoService.save(
                        { ...typeInfo, resourceId: savedResource.resourceId },
                        { queryRunner },
                    );
                    break;
            }

            await Promise.all([
                ...managers.map((manager) => {
                    return this.domainResourceManagerService.save(
                        {
                            resourceId: savedResource.resourceId,
                            employeeId: manager.employeeId,
                        },
                        { queryRunner },
                    );
                }),
            ]);

            await queryRunner.commitTransaction();

            const resourceWithTypeInfo = await this.domainResourceService.findOne({
                where: { resourceId: savedResource.resourceId },
                relations: ['vehicleInfo', 'meetingRoomInfo', 'accommodationInfo', 'equipmentInfo'],
            });

            return {
                resourceId: resourceWithTypeInfo.resourceId,
                type: resourceWithTypeInfo.type,
                typeInfoId:
                    resourceWithTypeInfo.vehicleInfo?.vehicleInfoId ||
                    resourceWithTypeInfo.meetingRoomInfo?.meetingRoomInfoId ||
                    resourceWithTypeInfo.accommodationInfo?.accommodationInfoId ||
                    resourceWithTypeInfo.equipmentInfo?.equipmentInfoId,
            };
        } catch (err) {
            console.error(err);
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(ERROR_MESSAGE.BUSINESS.RESOURCE.FAILED_CREATE);
        } finally {
            await queryRunner.release();
        }
    }

    async 자원정보를_조회한다(resourceId: string): Promise<ResourceResponseDto> {
        return this.자원_상세정보를_조회한다(resourceId);
    }

    async 자원_상세정보를_조회한다(resourceId: string): Promise<ResourceResponseDto> {
        const resource = await this.domainResourceService.findOne({
            where: { resourceId },
            relations: [
                'vehicleInfo',
                'meetingRoomInfo',
                'accommodationInfo',
                'equipmentInfo',
                'resourceManagers',
                'resourceManagers.employee',
                'resourceGroup',
            ],
        });

        if (!resource) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESOURCE.NOT_FOUND);
        }

        return new ResourceResponseDto(resource);
    }

    async 그룹별_자원_목록을_조회한다(resourceGroupId: string): Promise<ResourceResponseDto[]> {
        const resources = await this.domainResourceService.findAll({
            where: { resourceGroupId },
            relations: ['vehicleInfo', 'meetingRoomInfo', 'accommodationInfo', 'equipmentInfo'],
            order: { order: 'ASC' },
        });

        return resources.map((resource) => new ResourceResponseDto(resource));
    }

    async 자원을_수정한다(
        resourceId: string,
        updateResourceInfoDto: UpdateResourceInfoDto,
    ): Promise<ResourceResponseDto> {
        const resource = await this.domainResourceService.findOne({
            where: {
                resourceId: resourceId,
            },
            relations: ['resourceGroup'],
        });

        if (!resource) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESOURCE.NOT_FOUND);
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            if (updateResourceInfoDto.resource) {
                if (updateResourceInfoDto.resource.images && updateResourceInfoDto.resource.images.length > 0) {
                    updateResourceInfoDto.resource.images = updateResourceInfoDto.resource.images.map((image) =>
                        this.domainFileService.getFileUrl(image),
                    );
                    await this.domainFileService.updateTemporaryFiles(updateResourceInfoDto.resource.images, false, {
                        queryRunner,
                    });
                }

                await this.domainResourceService.update(resourceId, updateResourceInfoDto.resource, { queryRunner });
            }

            if (updateResourceInfoDto.typeInfo) {
                switch (resource.type) {
                    case ResourceType.VEHICLE:
                        const vehicleInfo = updateResourceInfoDto.typeInfo as UpdateVehicleInfoDto;
                        await this.domainVehicleInfoService.update(vehicleInfo.vehicleInfoId, vehicleInfo, {
                            queryRunner,
                        });
                        break;
                    case ResourceType.MEETING_ROOM:
                        const meetingRoomInfo = updateResourceInfoDto.typeInfo as UpdateMeetingRoomInfoDto;
                        await this.domainMeetingRoomInfoService.update(
                            meetingRoomInfo.meetingRoomInfoId,
                            meetingRoomInfo,
                            {
                                queryRunner,
                            },
                        );
                        break;
                    case ResourceType.ACCOMMODATION:
                        const accommodationInfo = updateResourceInfoDto.typeInfo as UpdateAccommodationInfoDto;
                        await this.domainAccommodationInfoService.update(
                            accommodationInfo.accommodationInfoId,
                            accommodationInfo,
                            {
                                queryRunner,
                            },
                        );
                        break;
                    case ResourceType.EQUIPMENT:
                        const equipmentInfo = updateResourceInfoDto.typeInfo as UpdateEquipmentInfoDto;
                        await this.domainEquipmentInfoService.update(equipmentInfo.equipmentInfoId, equipmentInfo, {
                            queryRunner,
                        });
                        break;
                }
            }
            if (updateResourceInfoDto.managers) {
                const newManagerIds = updateResourceInfoDto.managers.map((m) => m.employeeId);
                const currentManagers = await this.domainResourceManagerService.findAll({
                    where: {
                        resourceId: resourceId,
                    },
                });
                const currentManagerIds = currentManagers.map((m) => m.employeeId);

                // 삭제될 관리자 처리
                const managersToRemove = currentManagers.filter(
                    (manager) => !newManagerIds.includes(manager.employeeId),
                );
                await Promise.all(
                    managersToRemove.map((manager) =>
                        this.domainResourceManagerService.delete(manager.resourceManagerId, { queryRunner }),
                    ),
                );

                // 새로 추가될 관리자 처리
                const managersToAdd = newManagerIds.filter((employeeId) => !currentManagerIds.includes(employeeId));
                await Promise.all(
                    managersToAdd.map((employeeId) =>
                        this.domainResourceManagerService.save({ resourceId, employeeId }, { queryRunner }),
                    ),
                );
            }

            await queryRunner.commitTransaction();

            return this.자원_상세정보를_조회한다(resourceId);
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(ERROR_MESSAGE.BUSINESS.RESOURCE.FAILED_UPDATE);
        } finally {
            await queryRunner.release();
        }
    }

    async 자원_순서를_변경한다(updateResourceOrdersDto: UpdateResourceOrdersDto): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await Promise.all(
                updateResourceOrdersDto.orders.map((order) =>
                    this.domainResourceService.update(order.resourceId, { order: order.newOrder }, { queryRunner }),
                ),
            );

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async 자원을_삭제한다(resourceId: string): Promise<void> {
        const resource = await this.domainResourceService.findOne({
            where: {
                resourceId: resourceId,
            },
        });
        if (!resource) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESOURCE.NOT_FOUND);
        }
        if (resource.isAvailable) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESOURCE.IS_AVAILABLE);
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await this.domainResourceService.update(resourceId, { resourceGroupId: null }, { queryRunner });

            const resourceManagers = await this.domainResourceManagerService.findAll({
                where: {
                    resourceId: resourceId,
                },
            });
            for (const manager of resourceManagers) {
                await this.domainResourceManagerService.delete(manager.resourceManagerId, { queryRunner });
            }

            await this.domainResourceService.softDelete(resourceId, { queryRunner });

            const resources = await this.domainResourceService.findAll({
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
                await this.domainResourceService.update(resources[i].resourceId, { order: i }, { queryRunner });
            }

            await queryRunner.commitTransaction();
        } catch (err) {
            console.error(err);
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(ERROR_MESSAGE.BUSINESS.RESOURCE.FAILED_DELETE);
        } finally {
            await queryRunner.release();
        }

        // const resource = await this.domainResourceService.findOne({
        //     where: { resourceId },
        // });

        // if (!resource) {
        //     throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESOURCE.NOT_FOUND);
        // }

        // await this.domainResourceService.delete(resourceId);
    }

    /**
     * 자원 타입 라벨 반환
     */
    자원타입_라벨을_가져온다(type: string): string {
        switch (type) {
            case 'MEETING_ROOM':
                return '회의실';
            case 'VEHICLE':
                return '차량';
            case 'ACCOMMODATION':
                return '숙소';
            case 'EQUIPMENT':
                return '장비';
            default:
                return type;
        }
    }

    // ==================== 태스크 관련 메서드들 ====================

    /**
     * 관리자별 자원을 소모품 정보와 함께 조회한다
     */
    async 관리자별_자원을_소모품정보와_함께_조회한다(employeeId: string, isSystemAdmin: boolean): Promise<any[]> {
        const resources = await this.domainResourceService.findAll({
            where: {
                ...(isSystemAdmin ? {} : { resourceManagers: { employeeId: employeeId } }),
            },
            relations: [
                'resourceManagers',
                'vehicleInfo',
                'vehicleInfo.consumables',
                'vehicleInfo.consumables.maintenances',
            ],
            order: {
                vehicleInfo: {
                    consumables: {
                        maintenances: {
                            date: 'DESC',
                        },
                    },
                },
            },
        });

        return resources;
    }

    /**
     * 소모품 정보와 함께 모든 자원을 조회한다
     */
    async 소모품정보와_함께_모든자원을_조회한다(): Promise<any[]> {
        const resources = await this.domainResourceService.findAll({
            relations: [
                'resourceManagers',
                'resourceManagers.employee',
                'vehicleInfo',
                'vehicleInfo.consumables',
                'vehicleInfo.consumables.maintenances',
            ],
        });

        return resources;
    }

    /**
     * 자원 타입별 상세 정보를 조회한다
     */
    async 자원의_타입별_상세정보를_조회한다(resource: Resource): Promise<any> {
        switch (resource.type) {
            case ResourceType.VEHICLE:
                const vehicleInfo = await this.domainVehicleInfoService.findOne({
                    where: { resourceId: resource.resourceId },
                });
                return vehicleInfo;

            case ResourceType.MEETING_ROOM:
                return await this.domainMeetingRoomInfoService.findOne({
                    where: { resourceId: resource.resourceId },
                });

            case ResourceType.ACCOMMODATION:
                return await this.domainAccommodationInfoService.findOne({
                    where: { resourceId: resource.resourceId },
                });

            case ResourceType.EQUIPMENT:
                return await this.domainEquipmentInfoService.findOne({
                    where: { resourceId: resource.resourceId },
                });

            default:
                return null;
        }
    }

    /**
     * 자원 타입별 운영 시간 규칙을 가져온다
     */
    자원_타입별_운영시간_규칙을_가져온다(resourceType: ResourceType): {
        startTime: string;
        endTime: string;
        is24Hour: boolean;
    } {
        switch (resourceType) {
            case ResourceType.VEHICLE:
                return { startTime: '00:00:00', endTime: '24:00:00', is24Hour: true };
            case ResourceType.MEETING_ROOM:
            case ResourceType.EQUIPMENT:
                return { startTime: '09:00:00', endTime: '18:00:00', is24Hour: false };
            case ResourceType.ACCOMMODATION:
                return { startTime: '00:00:00', endTime: '24:00:00', is24Hour: true };
            default:
                return { startTime: '09:00:00', endTime: '18:00:00', is24Hour: false };
        }
    }

    /**
     * 자원 그룹별로 사용 가능한 자원 목록을 조회한다
     */
    async 그룹별_사용가능한_자원_목록을_조회한다(
        resourceGroupId?: string,
        resourceType?: ResourceType,
    ): Promise<Resource[]> {
        const whereCondition: any = {
            isAvailable: true,
        };

        if (resourceGroupId) {
            whereCondition.resourceGroupId = resourceGroupId;
        }

        if (resourceType) {
            whereCondition.type = resourceType;
        }

        return await this.domainResourceService.findAll({
            where: whereCondition,
            order: { order: 'ASC' },
        });
    }

    /**
     * 현재 시간 기준으로 자원별 가용 시간대를 계산한다
     */
    현재시간_기준_가용시간대를_계산한다(
        resourceType: ResourceType,
        targetDate: string,
        isToday: boolean,
    ): { startTime: string; endTime: string } {
        const operatingHours = this.자원_타입별_운영시간_규칙을_가져온다(resourceType);

        if (!isToday) {
            return operatingHours;
        }

        // 오늘인 경우 현재 시간의 30분 단위로 올림하여 시작 시간 계산
        const now = new Date();
        const currentMinutes = now.getMinutes();
        const roundedStartTime = new Date(now);

        if (currentMinutes < 30) {
            roundedStartTime.setMinutes(0, 0, 0);
        } else {
            roundedStartTime.setMinutes(30, 0, 0);
        }

        // 차량은 24시간, 다른 자원은 운영 시간 고려
        let calculatedStartTime: string;
        if (resourceType === ResourceType.VEHICLE) {
            calculatedStartTime = roundedStartTime.toTimeString().slice(0, 8);
        } else {
            const operatingStartTime = new Date(`${targetDate} ${operatingHours.startTime}`);
            calculatedStartTime =
                roundedStartTime > operatingStartTime
                    ? roundedStartTime.toTimeString().slice(0, 8)
                    : operatingHours.startTime;
        }

        return {
            startTime: calculatedStartTime,
            endTime: operatingHours.endTime,
        };
    }

    async 자원의_해당시간_예약을_확인한다(
        resourceId: string,
        startDate: string,
        endDate: string,
        reservationId?: string,
    ): Promise<boolean> {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        const resource = await this.domainResourceService.findOne({
            where: {
                resourceId: resourceId,
                reservations: {
                    reservationId: reservationId ? Not(reservationId) : undefined,
                    status: ReservationStatus.CONFIRMED,
                    startDate: LessThan(endDateObj),
                    endDate: MoreThan(startDateObj),
                },
            },
            relations: ['reservations'],
        });

        return !!resource;
    }
}
