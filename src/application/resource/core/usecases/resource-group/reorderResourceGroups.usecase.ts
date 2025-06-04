import { Injectable } from '@nestjs/common';
import { DomainResourceGroupService } from '@src/domain/resource-group/resource-group.service';
import { UpdateResourceGroupOrdersDto } from '@src/application/resource/core/dtos/update-resource.dto';
import { ResourceGroup } from '@libs/entities/resource-group.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class ReorderResourceGroupsUsecase {
    constructor(
        private readonly resourceGroupService: DomainResourceGroupService,
        private readonly dataSource: DataSource,
    ) {}

    async execute(updateResourceGroupOrdersDto: UpdateResourceGroupOrdersDto): Promise<void> {
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
}
