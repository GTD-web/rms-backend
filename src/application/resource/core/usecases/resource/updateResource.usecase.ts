import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { UpdateResourceInfoDto } from '../../dtos/update-resource.dto';
import { ResourceResponseDto } from '../../dtos/resource-response.dto';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { DataSource } from 'typeorm';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DomainResourceManagerService } from '@src/domain/resource-manager/resource-manager.service';
import { DomainFileService } from '@src/domain/file/file.service';
import { DomainFileResourceService } from '@src/domain/file-resource/file-resource.service';

@Injectable()
export class UpdateResourceUsecase {
    constructor(
        private readonly resourceService: DomainResourceService,
        private readonly resourceManagerService: DomainResourceManagerService,
        private readonly dataSource: DataSource,
        private readonly fileService: DomainFileService,
        private readonly fileResourceService: DomainFileResourceService,
    ) {}

    async execute(resourceId: string, updateRequest: UpdateResourceInfoDto): Promise<ResourceResponseDto> {
        const resource = await this.resourceService.findOne({
            where: {
                resourceId: resourceId,
            },
            relations: ['resourceGroup'],
        });

        if (!resource) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESOURCE.NOT_FOUND);
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            if (updateRequest.resource) {
                // 파일 관련 처리
                if (updateRequest.resource.images !== undefined) {
                    // 기존 파일 연결 삭제
                    await this.fileResourceService.deleteByResourceId(resourceId, { queryRunner });

                    if (updateRequest.resource.images && updateRequest.resource.images.length > 0) {
                        updateRequest.resource.images = updateRequest.resource.images.map((image) =>
                            this.fileService.getFileUrl(image),
                        );
                        await this.fileService.updateTemporaryFiles(updateRequest.resource.images, false, {
                            queryRunner,
                        });

                        // 파일 경로로 파일 ID 찾아서 중간테이블에 연결
                        const files = await this.fileService.findAllFilesByFilePath(updateRequest.resource.images);
                        const fileIds = files.map((file) => file.fileId);

                        if (fileIds.length > 0) {
                            const fileResourceConnections = fileIds.map((fileId) => ({
                                resourceId,
                                fileId,
                            }));

                            await this.fileResourceService.saveMultiple(fileResourceConnections, { queryRunner });
                        }
                    }
                }

                await this.resourceService.update(resourceId, updateRequest.resource, { queryRunner });
            }

            if (updateRequest.managers) {
                const newManagerIds = updateRequest.managers.map((m) => m.employeeId);
                const currentManagers = await this.resourceManagerService.findAll({
                    where: {
                        resourceId: resourceId,
                    },
                });
                const currentManagerIds = currentManagers.map((m) => m.employeeId);

                // 삭제될 관리자 처리
                const managersToRemove = currentManagers.filter(
                    (manager) => !newManagerIds.includes(manager.employeeId),
                );
                await Promise.all(
                    managersToRemove.map((manager) =>
                        this.resourceManagerService.delete(manager.resourceManagerId, { queryRunner }),
                    ),
                );

                // 새로 추가될 관리자 처리
                const managersToAdd = newManagerIds.filter((employeeId) => !currentManagerIds.includes(employeeId));
                await Promise.all(
                    managersToAdd.map((employeeId) =>
                        this.resourceManagerService.save({ resourceId, employeeId }, { queryRunner }),
                    ),
                );
            }

            await queryRunner.commitTransaction();

            return this.findResourceDetailForAdmin(resourceId);
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(ERROR_MESSAGE.BUSINESS.RESOURCE.FAILED_UPDATE);
        } finally {
            await queryRunner.release();
        }
    }

    private async findResourceDetailForAdmin(resourceId: string): Promise<ResourceResponseDto> {
        const resource = await this.resourceService.findOne({
            where: { resourceId: resourceId },
            relations: [
                'resourceGroup',
                'vehicleInfo',
                'vehicleInfo.consumables',
                'meetingRoomInfo',
                'accommodationInfo',
                'resourceManagers',
                'resourceManagers.employee',
            ],
        });

        if (!resource) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESOURCE.NOT_FOUND);
        }

        // 자원과 연결된 파일 정보 조회
        const resourceFiles = await this.fileResourceService.findByResourceId(resourceId);
        const files = resourceFiles.map((connection) => connection.file);

        // 리소스 객체에 파일 정보 추가
        (resource as any).imageFiles = files;

        return new ResourceResponseDto(resource);
    }
}
