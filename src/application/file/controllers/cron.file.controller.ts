import { Public } from '@libs/decorators/public.decorator';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { FileService } from '../file.service';
import { ResponseInterceptor } from '@libs/interceptors/response.interceptor';
import { ErrorInterceptor } from '@libs/interceptors/error.interceptor';

@ApiTags('0. 파일 - 공통 ')
@Public()
@Controller('v1/files')
@UseInterceptors(ResponseInterceptor, ErrorInterceptor)
export class CronFileController {
    constructor(private readonly fileService: FileService) {}

    @ApiExcludeEndpoint()
    @Get('cron-job/delete-temporary-file')
    async deleteTemporaryFile() {
        return this.fileService.deleteTemporaryFile();
    }
}
