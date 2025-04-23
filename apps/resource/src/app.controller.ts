import { Controller, Get } from '@nestjs/common';
import { DateUtil } from '@libs/utils/date.util';
import { Public } from '@libs/decorators/public.decorator';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('')
export class AppController {
    @Public()
    @Get('version')
    getVersion(): { version: string; date: string } {
        return {
            version: '1.0.0',
            date: DateUtil.now().format(),
        };
    }
}
