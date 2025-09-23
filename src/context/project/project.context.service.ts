import { Injectable, Logger } from '@nestjs/common';
// import { DomainProjectService } from '@src/domain/project/project.service';

@Injectable()
export class ProjectContextService {
    private readonly logger = new Logger(ProjectContextService.name);

    // constructor(private readonly domainProjectService: DomainProjectService) {}

    async 프로젝트_존재여부를_확인한다(projectId: string): Promise<boolean> {
        return true;
    }
}
