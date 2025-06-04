import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DomainResourceGroupService } from '@src/domain/resource-group/resource-group.service';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DataSource, Not } from 'typeorm';

@Injectable()
export class DeleteResourceGroupUsecase {
    constructor(
        private readonly resourceGroupService: DomainResourceGroupService,
        private readonly resourceService: DomainResourceService,
        private readonly dataSource: DataSource,
    ) {}

    async execute(resourceGroupId: string): Promise<void> {
        const resourceGroup = await this.resourceGroupService.findOne({
            where: {
                resourceGroupId: resourceGroupId,
            },
            relations: ['resources'],
        });

        if (!resourceGroup) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESOURCE_GROUP.NOT_FOUND);
        }
        if (resourceGroup.resources.length > 0) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESOURCE.HAS_RESOURCES);
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
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESOURCE_GROUP.FAILED_REORDER);
        } finally {
            await queryRunner.release();
        }
    }
}
