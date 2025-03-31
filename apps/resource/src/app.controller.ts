import { Controller, Get } from '@nestjs/common';
import { DateUtil } from '@libs/utils/date.util';
import { Public } from '@libs/decorators/public.decorator';

@Controller('')
export class AppController {
    @Public()
    @Get('version')
    getVersion(): string {
        console.log('DateUtil.now', DateUtil.now().format());
        console.log('DateUtil.parse', DateUtil.parse('2025-03-30 10:00:00').format());
        return '1.0.0';
    }
}
