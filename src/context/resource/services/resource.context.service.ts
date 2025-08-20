import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
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
import {
    CheckAvailabilityQueryDto,
    CheckAvailabilityResponseDto,
} from '@src/business/resource-management/dtos/resource/check-availability.dto';
import { ResourceAvailabilityDto } from '@src/business/resource-management/dtos/resource/available-time-response.dto';

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
            where: { resourceId },
        });

        if (!resource) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESOURCE.NOT_FOUND);
        }

        await this.domainResourceService.delete(resourceId);
    }
}
