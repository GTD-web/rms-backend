import { File as FileEntity } from '@libs/entities';
import { File } from '@resource/modules/file/domain/models/file';

export class FileMapper {
    static toDomain(entity: FileEntity): File {
        if (!entity) return null;
        return new File({
            fileId: entity.fileId ?? undefined,
            fileName: entity.fileName,
            filePath: entity.filePath,
        });
    }

    static toEntity(domain: File): Partial<FileEntity> {
        if (!domain) return null;
        const props = domain.toJSON();
        return {
            fileId: props.fileId,
            fileName: props.fileName,
            filePath: props.filePath,
        };
    }
}
