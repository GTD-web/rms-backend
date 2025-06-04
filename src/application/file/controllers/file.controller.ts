import {
    Controller,
    Post,
    Get,
    Delete,
    Param,
    UseInterceptors,
    UploadedFile,
    UploadedFiles,
    Query,
    Body,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from '@resource/application/file/file.service';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { FileResponseDto } from '@resource/application/file/dtos/file-response.dto';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';

@ApiTags('0. 파일 - 공통 ')
@Controller('v1/files')
@ApiBearerAuth()
@Roles(Role.USER)
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiOperation({ summary: '파일 업로드' })
    @ApiDataResponse({ status: 200, description: '파일 업로드 성공', type: FileResponseDto })
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.fileService.uploadFile(file);
    }

    @Post('upload/multiple')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    })
    @ApiOperation({ summary: '여러 파일 업로드' })
    @ApiDataResponse({ status: 200, description: '여러 파일 업로드 성공', type: [FileResponseDto] })
    @UseInterceptors(FilesInterceptor('files', 10)) // 최대 10개 파일 업로드 가능
    async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
        return this.fileService.uploadMultipleFiles(files);
    }

    @Delete('multiple')
    @ApiOperation({ summary: '여러 파일 삭제' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                fileIds: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
            },
        },
    })
    @ApiDataResponse({ status: 200, description: '여러 파일 삭제 성공' })
    async deleteMultipleFiles(@Body('fileIds') fileIds: string[]) {
        await this.fileService.deleteMultipleFiles(fileIds);
    }

    @Delete(':fileId')
    @ApiOperation({ summary: '파일 삭제' })
    @ApiDataResponse({ status: 200, description: '파일 삭제 성공' })
    async deleteFile(@Param('fileId') fileId: string) {
        await this.fileService.deleteFile(fileId);
    }
}
