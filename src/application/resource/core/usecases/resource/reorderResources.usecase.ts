import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { UpdateResourceOrdersDto } from '../../dtos/update-resource.dto';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { DataSource } from 'typeorm';

@Injectable()
export class ReorderResourcesUsecase {
    constructor(
        private readonly resourceService: DomainResourceService,
        private readonly dataSource: DataSource,
    ) {}

    async execute(updateResourceOrdersDto: UpdateResourceOrdersDto): Promise<void> {
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
            throw new InternalServerErrorException(ERROR_MESSAGE.BUSINESS.RESOURCE.FAILED_REORDER);
        } finally {
            await queryRunner.release();
        }
    }
}
