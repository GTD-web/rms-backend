import { Controller, Get } from '@nestjs/common';
import { DateUtil } from '@libs/utils/date.util';
import { Public } from '@libs/decorators/public.decorator';

@Controller('')
export class AppController {
    @Public()
    @Get('version')
    getVersion(): string {
        return '1.0.0';
    }
}
