import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ResourceService } from '../services/resource.service';
import { ResourceGroupService } from '../services/resource-group.service';
import { IsNull, Not } from 'typeorm';
import { ReservationService } from '@resource/modules/reservation/application/services/reservation.service';
import { ResourceGroupResponseDto } from '../dtos/resource-response.dto';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { UpdateResourceGroupOrdersDto, UpdateResourceGroupDto } from '../dtos/update-resource.dto';
import { DataSource } from 'typeorm';
import { CreateResourceGroupDto } from '../dtos/create-resource.dto';
import { ResourceGroup } from '@libs/entities';

@Injectable()
export class ResourceGroupUsecase {
    constructor(
        private readonly resourceService: ResourceService,
        private readonly resourceGroupService: ResourceGroupService,
        private readonly dataSource: DataSource,
    ) {}

    async findParentResourceGroups(): Promise<ResourceGroupResponseDto[]> {
        const resourceGroups = await this.resourceGroupService.findAll({
            where: {
                parentResourceGroupId: IsNull(),
            },
            order: {
                order: 'ASC',
            },
        });
        return resourceGroups;
    }

    async findResourceGroupsWithResourceData(type?: ResourceType): Promise<ResourceGroupResponseDto[]> {
        const resourceGroups = await this.resourceGroupService.findAll({
            where: {
                parentResourceGroupId: IsNull(),
                ...(type && { type }),
            },
            relations: ['children'],
            order: {
                order: 'ASC',
            },
        });
        const resourceGroupsResponse = await Promise.all(
            resourceGroups.map(async (resourceGroup) => ({
                resourceGroupId: resourceGroup.resourceGroupId,
                ...resourceGroup,
                children: await Promise.all(
                    resourceGroup.children.map(async (child) => ({
                        resourceGroupId: child.resourceGroupId,
                        ...child,
                        resources: (
                            await this.resourceService.findAll({
                                where: {
                                    resourceGroupId: child.resourceGroupId,
                                },
                                order: {
                                    order: 'ASC',
                                },
                            })
                        ).map((resource) => ({
                            resourceId: resource.resourceId,
                            name: resource.name,
                            isAvailable: resource.isAvailable,
                            unavailableReason: resource.unavailableReason,
                            resourceGroupId: child.resourceGroupId,
                        })),
                    })),
                ),
            })),
        );
        return resourceGroupsResponse;
    }

    async createResourceGroup(createResourceGroupDto: CreateResourceGroupDto): Promise<ResourceGroupResponseDto> {
        const resourceGroups = await this.resourceGroupService.findAll({
            where: {
                parentResourceGroupId: createResourceGroupDto.parentResourceGroupId,
            },
        });
        const resourceGroupOrder = resourceGroups.length;

        const resourceGroup = await this.resourceGroupService.save({
            ...createResourceGroupDto,
            order: resourceGroupOrder,
        } as ResourceGroup);
        return resourceGroup;
    }

    async updateResourceGroup(
        resourceGroupId: string,
        updateResourceGroupDto: UpdateResourceGroupDto,
    ): Promise<ResourceGroupResponseDto> {
        const resourceGroup = await this.resourceGroupService.update(resourceGroupId, updateResourceGroupDto);
        return resourceGroup;
    }

    async reorderResourceGroups(updateResourceGroupOrdersDto: UpdateResourceGroupOrdersDto): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await Promise.all(
                updateResourceGroupOrdersDto.orders.map(async (order) => {
                    await this.resourceGroupService.update(
                        order.resourceGroupId,
                        { order: order.newOrder },
                        { queryRunner },
                    );
                }),
            );

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async deleteResourceGroup(resourceGroupId: string): Promise<void> {
        const resourceGroup = await this.resourceGroupService.findOne({
            where: {
                resourceGroupId: resourceGroupId,
            },
            relations: ['resources'],
        });

        if (!resourceGroup) {
            throw new NotFoundException('Resource group not found');
        }
        if (resourceGroup.resources.length > 0) {
            throw new BadRequestException('Resource group has resources');
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await this.resourceGroupService.delete(resourceGroupId, { queryRunner });

            const siblings = await this.resourceGroupService.findAll({
                where: {
                    resourceGroupId: Not(resourceGroupId),
                    parentResourceGroupId: resourceGroup.parentResourceGroupId,
                },
                order: {
                    order: 'ASC',
                },
            });
            for (let i = 0; i < siblings.length; i++) {
                await this.resourceGroupService.update(siblings[i].resourceGroupId, { order: i }, { queryRunner });
            }

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
}
