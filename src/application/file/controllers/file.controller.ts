import { Controller, Post, Get, Delete, Param, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '@resource/application/file/file.service';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { FileResponseDto } from '@resource/application/file/dtos/file-response.dto';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';

@ApiTags('0. 파일 - 공통 페이지')
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

    @Delete(':fileId')
    @ApiOperation({ summary: '파일 삭제' })
    @ApiDataResponse({ status: 200, description: '파일 삭제 성공' })
    async deleteFile(@Param('fileId') fileId: string) {
        await this.fileService.deleteFile(fileId);
    }
}
