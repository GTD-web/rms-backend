import { Controller, Post, UseInterceptors, UploadedFile, Delete, Param, UseGuards, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '@resource/modules/file/application/services/file.service';
import { ApiTags, ApiConsumes, ApiBody, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Public } from '@libs/decorators/public.decorator';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { FileResponseDto } from '@resource/modules/file/application/dtos/file-response.dto';

@ApiTags('0. 파일 - 공통 페이지')
@Controller('v1/files')
@ApiBearerAuth()
@Public()
export class CommonFileController {
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
        await this.fileService.deleteFile({ fileId });
    }

    // @Delete('')
    // @ApiOperation({ summary: '파일 삭제' })
    // @ApiDataResponse({ status: 200, description: '파일 삭제 성공' })
    // @ApiQuery({ name: 'fileId', required: false })
    // @ApiQuery({ name: 'filePath', required: false })
    // async deleteFile(@Query('fileId') fileId?: string, @Query('filePath') filePath?: string) {
    //     await this.fileService.deleteFile({ fileId, filePath });
    // }
}
