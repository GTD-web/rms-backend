import { Public } from '@libs/decorators/public.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { FileContextService } from '../services/file.context.service';

@ApiTags('v2 파일 ')
@Public()
@Controller('v2/files')
export class CronFileController {
    constructor(private readonly fileContextService: FileContextService) {}

    @ApiExcludeEndpoint()
    @Get('cron-job/delete-temporary-file')
    async deleteTemporaryFile() {
        return this.fileContextService.임시_파일들을_삭제한다();
    }
}
