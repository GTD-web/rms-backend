import { Injectable } from '@nestjs/common';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { Employee } from '@libs/entities';
import {
    ResourceResponseDto,
    ResourceGroupWithResourcesAndReservationsResponseDto,
    CreateResourceResponseDto,
} from '@src/application/resource/core/dtos/resource-response.dto';
import { ResourceAvailabilityDto } from '@src/application/resource/core/dtos/available-time-response.dto';
import { ResourceQueryDto } from '@src/application/resource/core/dtos/resource-query.dto';
import { CreateResourceInfoDto } from '@src/application/resource/core/dtos/create-resource.dto';
import {
    UpdateResourceInfoDto,
    UpdateResourceOrdersDto,
} from '@src/application/resource/core/dtos/update-resource.dto';
import {
    CheckAvailabilityQueryDto,
    CheckAvailabilityResponseDto,
} from '@src/application/resource/core/dtos/check-availability.dto';
import {
    FindResourcesUsecase,
    FindResourceDetailUsecase,
    ReorderResourcesUsecase,
    UpdateResourceUsecase,
    DeleteResourceUsecase,
    CreateResourceWithInfosUsecase,
    CheckAvailabilityUsecase,
    FindAvailableTimeUsecase,
    FindResourcesByTypeAndDateWithReservationsUsecase,
    FindResourcesByGroupUsecase,
} from '@src/application/resource/core/usecases/resource';
@Injectable()
export class ResourceService {
    constructor(
        private readonly findResourcesUsecase: FindResourcesUsecase,
        private readonly findResourcesByGroupUsecase: FindResourcesByGroupUsecase,
        private readonly findResourceDetailUsecase: FindResourceDetailUsecase,
        private readonly reorderResourcesUsecase: ReorderResourcesUsecase,
        private readonly updateResourceUsecase: UpdateResourceUsecase,
        private readonly deleteResourceUsecase: DeleteResourceUsecase,
        private readonly findAvailableTimeUsecase: FindAvailableTimeUsecase,
        private readonly findResourcesByTypeAndDateWithReservationsUsecase: FindResourcesByTypeAndDateWithReservationsUsecase,
        private readonly checkAvailabilityUsecase: CheckAvailabilityUsecase,
        private readonly createResourceWithInfosUsecase: CreateResourceWithInfosUsecase,
    ) {}
    // Admin Resource Controller
    async createResourceWithInfos(createResourceInfo: CreateResourceInfoDto): Promise<CreateResourceResponseDto> {
        return this.createResourceWithInfosUsecase.execute(createResourceInfo);
    }

    async findResources(type: ResourceType): Promise<ResourceResponseDto[]> {
        return this.findResourcesUsecase.execute(type);
    }

    async findResourcesByResourceGroupId(resourceGroupId: string): Promise<ResourceResponseDto[]> {
        return this.findResourcesByGroupUsecase.execute(resourceGroupId);
    }

    async findResourceDetailForAdmin(resourceId: string): Promise<ResourceResponseDto> {
        return this.findResourceDetailUsecase.executeForAdmin(resourceId);
    }

    async reorderResources(updateResourceOrdersDto: UpdateResourceOrdersDto): Promise<void> {
        return this.reorderResourcesUsecase.execute(updateResourceOrdersDto);
    }

    async updateResource(
        resourceId: string,
        updateResourceInfoDto: UpdateResourceInfoDto,
    ): Promise<ResourceResponseDto> {
        return this.updateResourceUsecase.execute(resourceId, updateResourceInfoDto);
    }

    async deleteResource(resourceId: string): Promise<void> {
        return this.deleteResourceUsecase.execute(resourceId);
    }

    // User Resource Controller
    async findResourcesByTypeAndDateWithReservations(
        user: Employee,
        type: ResourceType,
        startDate: string,
        endDate: string,
        isMine: boolean,
    ): Promise<ResourceGroupWithResourcesAndReservationsResponseDto[]> {
        return this.findResourcesByTypeAndDateWithReservationsUsecase.execute(user, type, startDate, endDate, isMine);
    }

    async findAvailableTime(query: ResourceQueryDto): Promise<ResourceAvailabilityDto[]> {
        return this.findAvailableTimeUsecase.execute(query);
    }

    async checkAvailability(
        resourceId: string,
        startDate: string,
        endDate: string,
        reservationId?: string,
    ): Promise<boolean> {
        return this.checkAvailabilityUsecase.execute(resourceId, startDate, endDate, reservationId);
    }

    async findResourceDetailForUser(employeeId: string, resourceId: string): Promise<ResourceResponseDto> {
        return this.findResourceDetailUsecase.executeForUser(employeeId, resourceId);
    }
}
