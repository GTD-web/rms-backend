import { Injectable } from '@nestjs/common';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { Employee } from '@libs/entities';

// Context Services
import { ResourceContextService } from '@src/context/resource/services/resource.context.service';

// DTOs
import {
    ResourceResponseDto,
    ResourceGroupWithResourcesAndReservationsResponseDto,
    CreateResourceResponseDto,
} from '../dtos/resource/resource-response.dto';
import { ResourceAvailabilityDto } from '../dtos/resource/available-time-response.dto';
import { ResourceQueryDto } from '../dtos/resource/resource-query.dto';
import { CreateResourceInfoDto } from '../dtos/resource/create-resource.dto';
import { UpdateResourceInfoDto, UpdateResourceOrdersDto } from '../dtos/resource/update-resource.dto';
import { CheckAvailabilityQueryDto, CheckAvailabilityResponseDto } from '../dtos/resource/check-availability.dto';
@Injectable()
export class ResourceService {
    constructor(private readonly resourceContextService: ResourceContextService) {}
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

    async findAvailableTime(query: ResourceQueryDto): Promise<ResourceAvailabilityDto[]> {
        // TODO: 컨텍스트 서비스에 해당 메서드 추가 필요
        return [];
    }

    async checkAvailability(
        resourceId: string,
        startDate: string,
        endDate: string,
        reservationId?: string,
    ): Promise<boolean> {
        // TODO: 컨텍스트 서비스에 해당 메서드 추가 필요
        return true;
    }

    async findResourceDetailForUser(employeeId: string, resourceId: string): Promise<ResourceResponseDto> {
        return this.resourceContextService.자원_상세정보를_조회한다(resourceId);
    }
}
