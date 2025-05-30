import { Public } from '@libs/decorators/public.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { FileService } from '../file.service';

@ApiTags('0. 파일 - 공통 ')
@Public()
@Controller('v1/files')
export class CronFileController {
    constructor(private readonly fileService: FileService) {}

    @ApiExcludeEndpoint()
    @Get('cron-job/delete-temporary-file')
    async deleteTemporaryFile() {
        return this.fileService.deleteTemporaryFile();
    }
}
