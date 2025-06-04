import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DomainResourceGroupService } from '@src/domain/resource-group/resource-group.service';
import { DomainResourceManagerService } from '@src/domain/resource-manager/resource-manager.service';
import { CreateResourceInfoDto } from '../../dtos/create-resource.dto';
import { Resource } from '@libs/entities/resource.entity';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { DataSource, In } from 'typeorm';
import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';
import { DomainMeetingRoomInfoService } from '@src/domain/meeting-room-info/meeting-room-info.service';
import { DomainAccommodationInfoService } from '@src/domain/accommodation-info/accommodation-info.service';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { DomainFileService } from '@src/domain/file/file.service';
import { CreateResourceResponseDto } from '../../dtos/resource-response.dto';

@Injectable()
export class CreateResourceWithInfosUsecase {
    constructor(
        private readonly resourceService: DomainResourceService,
        private readonly resourceGroupService: DomainResourceGroupService,
        private readonly resourceManagerService: DomainResourceManagerService,
        private readonly vehicleInfoService: DomainVehicleInfoService,
        private readonly meetingRoomInfoService: DomainMeetingRoomInfoService,
        private readonly accommodationInfoService: DomainAccommodationInfoService,
        private readonly fileService: DomainFileService,
        private readonly dataSource: DataSource,
    ) {}

    async execute(createResourceInfo: CreateResourceInfoDto): Promise<CreateResourceResponseDto> {
        const { resource, typeInfo, managers } = createResourceInfo;

        if (!resource.resourceGroupId) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESOURCE.GROUP_ID_REQUIRED);
        }

        if (!managers || managers.length === 0) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESOURCE.MANAGERS_REQUIRED);
        }

        const group = await this.resourceGroupService.findOne({
            where: { resourceGroupId: resource.resourceGroupId },
        });

        if (!group) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESOURCE_GROUP.NOT_FOUND);
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const resources = await this.resourceService.findAll({
                where: {
                    resourceGroupId: group.resourceGroupId,
                },
            });
            const resourceOrder = resources.length;

            const savedResource = await this.resourceService.save({ ...resource, order: resourceOrder } as Resource, {
                queryRunner,
            });

            await this.fileService.updateTemporaryFiles(resource.images, false, { queryRunner });

            switch (group.type) {
                case ResourceType.VEHICLE:
                    await this.vehicleInfoService.save(
                        { ...typeInfo, resourceId: savedResource.resourceId },
                        { queryRunner },
                    );
                    break;
                case ResourceType.MEETING_ROOM:
                    await this.meetingRoomInfoService.save(
                        { ...typeInfo, resourceId: savedResource.resourceId },
                        { queryRunner },
                    );
                    break;
                case ResourceType.ACCOMMODATION:
                    await this.accommodationInfoService.save(
                        { ...typeInfo, resourceId: savedResource.resourceId },
                        { queryRunner },
                    );
                    break;
            }

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
            ]);

            await queryRunner.commitTransaction();

            const resourceWithTypeInfo = await this.resourceService.findOne({
                where: { resourceId: savedResource.resourceId },
                relations: ['vehicleInfo', 'meetingRoomInfo', 'accommodationInfo'],
            });
            return {
                resourceId: resourceWithTypeInfo.resourceId,
                type: resourceWithTypeInfo.type,
                typeInfoId:
                    resourceWithTypeInfo.vehicleInfo?.vehicleInfoId ||
                    resourceWithTypeInfo.meetingRoomInfo?.meetingRoomInfoId ||
                    resourceWithTypeInfo.accommodationInfo?.accommodationInfoId,
            };
        } catch (err) {
            console.error(err);
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(ERROR_MESSAGE.BUSINESS.RESOURCE.FAILED_CREATE);
        } finally {
            await queryRunner.release();
        }
    }
}
