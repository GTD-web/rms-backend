import { Module } from '@nestjs/common';
import { ProjectContextService } from './project.context.service';

@Module({
    imports: [],
    providers: [ProjectContextService],
    exports: [ProjectContextService],
})
export class ProjectContextModule {}
