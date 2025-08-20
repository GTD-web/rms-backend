import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ERROR_MESSAGE } from '@libs/constants/error-message';

// Domain Services
import { DomainConsumableService } from '@src/domain/consumable/consumable.service';
import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';

// DTOs
import { CreateConsumableDto } from '@src/business/resource-management/dtos/vehicle/create-vehicle-info.dto';
import { UpdateConsumableDto } from '@src/business/resource-management/dtos/vehicle/update-vehicle-info.dto';
import { ConsumableResponseDto } from '@src/business/resource-management/dtos/vehicle/vehicle-response.dto';

@Injectable()
export class ConsumableContextService {
    constructor(
        private readonly domainConsumableService: DomainConsumableService,
        private readonly domainVehicleInfoService: DomainVehicleInfoService,
    ) {}

    async 소모품을_저장한다(createConsumableDto: CreateConsumableDto): Promise<ConsumableResponseDto> {
        const vehicleInfo = await this.domainVehicleInfoService.findOne({
            where: {
                vehicleInfoId: createConsumableDto.vehicleInfoId,
            },
            relations: ['consumables'],
        });

        if (!vehicleInfo) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.VEHICLE_INFO.NOT_FOUND);
        }

        createConsumableDto.initMileage = vehicleInfo.totalMileage;

        if (vehicleInfo.consumables.length > 0) {
            const hasSameName = vehicleInfo.consumables.some(
                (consumable) => consumable.name === createConsumableDto.name,
            );
            if (hasSameName) {
                throw new BadRequestException(ERROR_MESSAGE.BUSINESS.CONSUMABLE.ALREADY_EXISTS);
            }
        }

        const savedConsumable = await this.domainConsumableService.save(createConsumableDto);

        return {
            consumableId: savedConsumable.consumableId,
            vehicleInfoId: savedConsumable.vehicleInfoId,
            name: savedConsumable.name,
            replaceCycle: savedConsumable.replaceCycle,
            notifyReplacementCycle: savedConsumable.notifyReplacementCycle,
        };
    }

    async 차량별_소모품목록을_조회한다(vehicleInfoId: string): Promise<ConsumableResponseDto[]> {
        const consumables = await this.domainConsumableService.findAll({
            where: { vehicleInfoId },
            relations: ['maintenances'],
            order: { name: 'ASC' },
        });

        return consumables.map((consumable) => ({
            consumableId: consumable.consumableId,
            vehicleInfoId: consumable.vehicleInfoId,
            name: consumable.name,
            replaceCycle: consumable.replaceCycle,
            notifyReplacementCycle: consumable.notifyReplacementCycle,
            maintenances: consumable.maintenances,
        }));
    }

    async 소모품을_조회한다(consumableId: string): Promise<ConsumableResponseDto> {
        const consumable = await this.domainConsumableService.findOne({
            where: { consumableId },
            relations: ['maintenances'],
        });

        if (!consumable) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.CONSUMABLE.NOT_FOUND);
        }

        return {
            consumableId: consumable.consumableId,
            vehicleInfoId: consumable.vehicleInfoId,
            name: consumable.name,
            replaceCycle: consumable.replaceCycle,
            notifyReplacementCycle: consumable.notifyReplacementCycle,
            maintenances: consumable.maintenances,
        };
    }

    async 소모품을_수정한다(
        consumableId: string,
        updateConsumableDto: UpdateConsumableDto,
    ): Promise<ConsumableResponseDto> {
        const existingConsumable = await this.domainConsumableService.findOne({
            where: { consumableId },
        });

        if (!existingConsumable) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.CONSUMABLE.NOT_FOUND);
        }

        // 같은 차량의 다른 소모품과 이름이 중복되는지 확인
        const vehicleConsumables = await this.domainConsumableService.findAll({
            where: { vehicleInfoId: updateConsumableDto.vehicleInfoId },
        });

        const hasSameName = vehicleConsumables.some(
            (consumable) => consumable.name === updateConsumableDto.name && consumable.consumableId !== consumableId,
        );

        if (hasSameName) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.CONSUMABLE.ALREADY_EXISTS);
        }

        await this.domainConsumableService.update(consumableId, updateConsumableDto);

        const updatedConsumable = await this.domainConsumableService.findOne({
            where: { consumableId },
            relations: ['maintenances'],
        });

        return {
            consumableId: updatedConsumable.consumableId,
            vehicleInfoId: updatedConsumable.vehicleInfoId,
            name: updatedConsumable.name,
            replaceCycle: updatedConsumable.replaceCycle,
            notifyReplacementCycle: updatedConsumable.notifyReplacementCycle,
            maintenances: updatedConsumable.maintenances,
        };
    }

    async 소모품을_삭제한다(consumableId: string): Promise<void> {
        const consumable = await this.domainConsumableService.findOne({
            where: { consumableId },
            relations: ['maintenances'],
        });

        if (!consumable) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.CONSUMABLE.NOT_FOUND);
        }

        // 정비 이력이 있는 경우 삭제 불가
        if (consumable.maintenances && consumable.maintenances.length > 0) {
            throw new BadRequestException('정비 이력이 있는 소모품은 삭제할 수 없습니다.');
        }

        await this.domainConsumableService.delete(consumableId);
    }
}
