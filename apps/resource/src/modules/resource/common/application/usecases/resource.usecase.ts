import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { ResourceGroupResponseDto } from '../dtos/resource-group-response.dto';
import { ResourceService } from '../services/resource.service';
import { ResourceGroupService } from '../services/resource-group.service';
import { IsNull, Not, MoreThanOrEqual, LessThanOrEqual, MoreThan, LessThan, DataSource } from 'typeorm';
import { ReservationService } from '@resource/modules/reservation/application/services/reservation.service';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ReturnVehicleDto } from '@resource/modules/resource/common/application/dtos/return-vehicle.dto';
import { ReservationResponseDto } from '@resource/modules/reservation/application/dtos/reservation-response.dto';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { VehicleInfoService } from '@resource/modules/resource/vehicle/application/services/vehicle-info.service';

@Injectable()
export class ResourceUsecase {
    constructor(
        private readonly resourceService: ResourceService,
        private readonly resourceGroupService: ResourceGroupService,
        private readonly reservationService: ReservationService,
        private readonly vehicleInfoService: VehicleInfoService,
        private readonly dataSource: DataSource,
    ) {}

    async findResourcesByTypeAndDateWithReservations(
        type: ResourceType,
        startDate: string,
        endDate: string,
    ): Promise<ResourceGroupResponseDto[]> {
        if (startDate && endDate && startDate > endDate) {
            throw new BadRequestException('Start date must be before end date');
        }
        const regex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
        const resourceGroups = await this.resourceGroupService.findAll({
            where: {
                type: type,
                parentResourceGroupId: Not(IsNull()),
            },
        });

        const resourceGroupsWithResources = await Promise.all(
            resourceGroups.map(async (resourceGroup) => {
                const resources = await this.resourceService.findByResourceGroupId(resourceGroup.resourceGroupId);

                const resourcesWithReservations = await Promise.all(
                    resources.map(async (resource) => {
                        return {
                            ...resource,
                            resourceId: resource.resourceId,
                            reservations: await this.reservationService.findAll({
                                where: {
                                    resourceId: resource.resourceId,
                                    startDate: LessThan(regex.test(endDate) ? endDate : endDate + ' 23:59:59'),
                                    endDate: MoreThan(regex.test(startDate) ? startDate : startDate + ' 00:00:00'),
                                },
                            }),
                        };
                    }),
                );

                return {
                    ...resourceGroup,
                    resources: resourcesWithReservations,
                };
            }),
        );

        return resourceGroupsWithResources;
    }

    async returnVehicle(resourceId: string, updateDto: ReturnVehicleDto): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            //자원 위치 정보 수정
            const resource = await this.resourceService.findOne({
                where: { resourceId: resourceId },
                relations: ['vehicleInfo'],
            });
            if (!resource) {
                throw new NotFoundException('Resource not found');
            }

            await this.resourceService.update(resourceId, { location: updateDto.location }, { queryRunner });

            // 차량 주행거리정보, 차량 주차위치 이미지 저장
            const vehicleInfo = await this.vehicleInfoService.findOne({
                where: { vehicleInfoId: resource.vehicleInfo.vehicleInfoId },
            });
            if (!vehicleInfo) {
                throw new NotFoundException('Vehicle info not found');
            }

            await this.vehicleInfoService.update(
                vehicleInfo.vehicleInfoId,
                {
                    leftMileage: updateDto.leftMileage,
                    totalMileage: updateDto.totalMileage,
                    parkingLocationImages: updateDto.parkingLocationImages,
                    odometerImages: updateDto.odometerImages,
                },
                { queryRunner },
            );

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException('Failed to return vehicle');
        } finally {
            await queryRunner.release();
        }
    }

    // async updateAll(resourceId: string, updateRequest: UpdateResourceRequestDto): Promise<ResourceResponseDto> {
    //     const resource = await this.resourceRepository.findOne({
    //         where: {
    //             resourceId: resourceId,
    //         },
    //         relations: ['resourceGroup'],
    //     });
    //     if (!resource) {
    //         throw new NotFoundException('Resource not found');
    //     }

    //     const queryRunner = this.dataSource.createQueryRunner();
    //     await queryRunner.connect();
    //     await queryRunner.startTransaction();

    //     try {
    //         // 1. 기본 자원 정보 업데이트
    //         if (updateRequest.resource) {
    //             await this.resourceRepository.update(resourceId, updateRequest.resource, { queryRunner });
    //         }

    //         // 2. 타입별 정보 업데이트
    //         if (updateRequest.typeInfo) {
    //             const group = await this.resourceGroupService.findOne(resource.resourceGroupId);
    //             const handler = this.typeHandlers.get(group.type);
    //             if (!handler) {
    //                 throw new BadRequestException(`Unsupported resource type: ${group.type}`);
    //             }
    //             await handler.updateTypeInfo(resource, updateRequest.typeInfo, { queryRunner });
    //         }

    //         // 3. 자원 관리자 정보 업데이트
    //         if (updateRequest.managers) {
    //             const currentManagers = await this.resourceManagerRepository.findByResourceId(resourceId);
    //             const currentManagerIds = currentManagers.map((m) => m.employeeId);
    //             const newManagerIds = updateRequest.managers.map((m) => m.employeeId);

    //             // 제거된 관리자들의 role 업데이트
    //             const removedManagerIds = currentManagerIds.filter((id) => !newManagerIds.includes(id));
    //             await Promise.all(
    //                 removedManagerIds.map(async (employeeId) => {
    //                     const otherResources = await this.resourceManagerRepository.findByEmployeeId(employeeId);
    //                     if (otherResources.length === 1) {
    //                         await this.userService.removeRole(employeeId, Role.RESOURCE_ADMIN, { queryRunner });
    //                     }
    //                 }),
    //             );

    //             // 새로운 관리자들의 role 업데이트
    //             const addedManagerIds = newManagerIds.filter((id) => !currentManagerIds.includes(id));
    //             await Promise.all(
    //                 addedManagerIds.map((employeeId) =>
    //                     this.userService.addRole(employeeId, Role.RESOURCE_ADMIN, { queryRunner }),
    //                 ),
    //             );

    //             await this.resourceManagerService.updateManagers(resourceId, newManagerIds, { queryRunner });
    //         }

    //         await queryRunner.commitTransaction();

    //         return this.findOne(resourceId);
    //     } catch (err) {
    //         await queryRunner.rollbackTransaction();
    //         throw new InternalServerErrorException('Failed to update resource');
    //     } finally {
    //         await queryRunner.release();
    //     }
    // }

    // async delete(resourceId: string): Promise<void> {
    //     const resource = await this.resourceRepository.findOne({
    //         where: {
    //             resourceId: resourceId,
    //         },
    //         relations: ['resourceGroup'],
    //     });
    //     if (!resource) {
    //         throw new NotFoundException('Resource not found');
    //     }

    //     const handler = this.typeHandlers.get(resource.type);
    //     if (!handler) {
    //         throw new BadRequestException(`Unsupported resource type: ${resource.type}`);
    //     }

    //     const queryRunner = this.dataSource.createQueryRunner();
    //     await queryRunner.connect();
    //     await queryRunner.startTransaction();

    //     try {
    //         // 1. 타입별 정보 삭제
    //         await handler.deleteTypeInfo(resourceId, { queryRunner });

    //         const resourceManagers = await this.resourceManagerRepository.findByResourceId(resourceId);

    //         // 2. 자원 관리자 정보 삭제
    //         await this.resourceManagerRepository.deleteByResourceId(resourceId, { queryRunner });

    //         // 3. 자원 관리자 해제
    //         for (const resourceManager of resourceManagers) {
    //             const otherResources = await this.resourceManagerRepository.findByEmployeeId(
    //                 resourceManager.employeeId,
    //             );
    //             if (otherResources.length === 0) {
    //                 await this.userService.removeRole(resourceManager.employeeId, Role.RESOURCE_ADMIN);
    //             }
    //         }

    //         // 3. 공통 자원 정보 삭제
    //         await this.resourceRepository.delete(resourceId, { queryRunner });

    //         await queryRunner.commitTransaction();
    //     } catch (err) {
    //         await queryRunner.rollbackTransaction();
    //         throw new InternalServerErrorException('Failed to delete resource');
    //     } finally {
    //         await queryRunner.release();
    //     }
    // }

    // async createResourceWithDetails(createRequest: CreateResourceRequestDto): Promise<ResourceResponseDto> {
    //     const { resource: resourceDto, typeInfo, managers } = createRequest;

    //     if (!resourceDto.resourceGroupId) {
    //         throw new BadRequestException('Resource group ID is required');
    //     }

    //     if (!managers || managers.length === 0) {
    //         throw new BadRequestException('Managers are required');
    //     }

    //     // 1. 그룹 존재 확인
    //     const group = await this.resourceGroupService.findOne(resourceDto.resourceGroupId);

    //     if (!group) {
    //         throw new NotFoundException('Resource group not found');
    //     }
    //     // 2. 자원의 타입을 그룹의 타입으로 설정
    //     const resource = new Resource({
    //         resourceGroupId: resourceDto.resourceGroupId,
    //         name: resourceDto.name,
    //         description: resourceDto.description,
    //         location: resourceDto.location,
    //         images: resourceDto.images || [],
    //         notifyParticipantChange: resourceDto.notifyParticipantChange,
    //         notifyReservationChange: resourceDto.notifyReservationChange,
    //         type: group.type,
    //         isAvailable: true,
    //     });

    //     const queryRunner = this.dataSource.createQueryRunner();
    //     await queryRunner.connect();
    //     await queryRunner.startTransaction();

    //     try {
    //         // 3. 기본 자원 정보 저장
    //         const savedResource = await this.resourceRepository.save(resource, { queryRunner });

    //         // 4. 타입별 정보 저장
    //         const handler = this.typeHandlers.get(group.type);

    //         if (!handler) {
    //             throw new BadRequestException(`Unsupported resource type: ${group.type}`);
    //         }
    //         await handler.createTypeInfo(savedResource, typeInfo, { queryRunner });

    //         // 5. 자원 관리자 정보 저장
    //         await Promise.all([
    //             ...managers.map((manager) => {
    //                 const resourceManager = new ResourceManager({
    //                     resourceId: savedResource.resourceId,
    //                     employeeId: manager.employeeId,
    //                 });
    //                 return this.resourceManagerRepository.save(resourceManager, { queryRunner });
    //             }),
    //             ...managers.map((manager) =>
    //                 this.userService.addRole(manager.employeeId, Role.RESOURCE_ADMIN, { queryRunner }),
    //             ),
    //         ]);

    //         await queryRunner.commitTransaction();

    //         const response: ResourceResponseDto = {
    //             ...savedResource.toJSON(),
    //             typeInfo: await handler.getTypeInfo(savedResource.resourceId),
    //             managers: await this.resourceManagerRepository.findByResourceId(savedResource.resourceId),
    //         };

    //         return response;
    //     } catch (err) {
    //         console.error(err);
    //         await queryRunner.rollbackTransaction();
    //         throw new InternalServerErrorException('Failed to create resource');
    //     } finally {
    //         await queryRunner.release();
    //     }
    // }
}
