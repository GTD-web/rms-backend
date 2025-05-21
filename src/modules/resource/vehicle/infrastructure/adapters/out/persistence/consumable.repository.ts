import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consumable as ConsumableEntity } from '@libs/entities';
import { Consumable } from '@libs/entities';
import { ConsumableRepositoryPort } from '@resource/modules/resource/vehicle/domain/ports/consumable.repository.port';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { CreateConsumableDto } from '@resource/modules/resource/vehicle/application/dtos/create-vehicle-info.dto';
import { UpdateConsumableDto } from '@resource/dtos.index';
import { DateUtil } from '@libs/utils/date.util';
@Injectable()
export class ConsumableRepository implements ConsumableRepositoryPort {
    constructor(
        @InjectRepository(ConsumableEntity)
        private readonly repository: Repository<ConsumableEntity>,
    ) {}

    async save(createConsumableDto: CreateConsumableDto, repositoryOptions?: RepositoryOptions): Promise<Consumable> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ConsumableEntity)
            : this.repository;
        const savedEntity = await repository.save(createConsumableDto);
        return savedEntity;
    }

    async findAll(repositoryOptions?: RepositoryOptions): Promise<Consumable[]> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ConsumableEntity)
            : this.repository;
        const entities = await repository.find({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            order: repositoryOptions?.order,
            skip: repositoryOptions?.skip,
            take: repositoryOptions?.take,
            withDeleted: repositoryOptions?.withDeleted,
        });
        return entities;
    }

    async findOne(repositoryOptions?: RepositoryOptions): Promise<Consumable | null> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ConsumableEntity)
            : this.repository;
        const entity = await repository.findOne({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            withDeleted: repositoryOptions?.withDeleted,
        });
        return entity ? entity : null;
    }

    async update(
        id: string,
        consumable: UpdateConsumableDto,
        repositoryOptions?: RepositoryOptions,
    ): Promise<Consumable> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ConsumableEntity)
            : this.repository;
        await repository.update({ consumableId: id }, consumable);
        const updated = await this.findOne({ where: { consumableId: id }, relations: repositoryOptions?.relations });
        if (!updated) throw new NotFoundException('Consumable not found');
        return updated;
    }

    async delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ConsumableEntity)
            : this.repository;
        // 기존 name 조회
        const consumable = await repository.findOne({ where: { consumableId: id }, withDeleted: true });
        if (!consumable) throw new NotFoundException('Consumable not found');

        // 고유값(타임스탬프) 추가
        const deletedName = `${consumable.name}(삭제된 소모품-${DateUtil.now().format('YYYY.MM.DD HH:mm:ss')})`;

        await repository.update({ consumableId: id }, { name: deletedName });
        await repository.softDelete({ consumableId: id });
    }
}
