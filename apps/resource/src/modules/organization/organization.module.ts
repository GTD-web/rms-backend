import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OrganizationController } from './presentation/controllers/organization.controller';
import { OrganizationService } from './application/services/organization.service';
import { OrganizationHttpAdapter } from './infrastructure/adapters/organization-http.adapter';

@Module({
    imports: [HttpModule],
    controllers: [OrganizationController],
    providers: [
        OrganizationService,
        {
            provide: 'IOrganizationClient',
            useClass: OrganizationHttpAdapter,
        },
    ],
    exports: [OrganizationService],
})
export class OrganizationModule {}
