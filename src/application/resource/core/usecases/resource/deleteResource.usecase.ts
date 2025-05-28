import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DomainResourceManagerService } from '@src/domain/resource-manager/resource-manager.service';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { DataSource, IsNull, Not } from 'typeorm';

@Injectable()
export class DeleteResourceUsecase {
    constructor(
        private readonly resourceService: DomainResourceService,
        private readonly resourceManagerService: DomainResourceManagerService,
        private readonly dataSource: DataSource,
    ) {}

    async execute(resourceId: string): Promise<void> {
        const resource = await this.resourceService.findOne({
            where: {
                resourceId: resourceId,
            },
            relations: ['resourceGroup', 'resourceManagers'],
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
            await this.resourceService.update(resourceId, { resourceGroupId: null }, { queryRunner });

            for (const manager of resource.resourceManagers) {
                await this.resourceManagerService.delete(manager.resourceManagerId, { queryRunner });
            }

            await this.resourceService.softDelete(resourceId, { queryRunner });

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
            throw new InternalServerErrorException(ERROR_MESSAGE.BUSINESS.RESOURCE.FAILED_DELETE);
        } finally {
            await queryRunner.release();
        }
    }
}
