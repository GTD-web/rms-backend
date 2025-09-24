import { Module } from '@nestjs/common';
import { ProjectContextService } from './project.context.service';
import { DomainProjectModule } from '@src/domain/project/project.module';

@Module({
    imports: [DomainProjectModule],
    providers: [ProjectContextService],
    exports: [ProjectContextService],
})
export class ProjectContextModule {}
