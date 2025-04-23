import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResourceManagerService } from '@resource/modules/resource/common/application/services/resource-manager.service';

// @ApiTags('resource-managers')
@Controller('resources/:resourceId/managers')
export class ResourceManagerController {
    constructor(private readonly resourceManagerService: ResourceManagerService) {}

    // @Post()
    // @ApiOperation({ summary: '자원 관리자 할당' })
    // create(
    //   @Param('resourceId') resourceId: string,
    //   @Body() createResourceManagerDto: CreateResourceManagerDto
    // ) {
    //   return this.resourceManagerService.create({
    //     ...createResourceManagerDto,
    //     resourceId,
    //   });
    // }

    // @Get()
    // @ApiOperation({ summary: '자원 관리자 목록 조회' })
    // findByResourceId(@Param('resourceId') resourceId: string) {
    //   return this.resourceManagerService.findByResourceId(resourceId);
    // }

    // @Delete(':employeeId')
    // @ApiOperation({ summary: '자원 관리자 할당 해제' })
    // remove(
    //   @Param('resourceId') resourceId: string,
    //   @Param('employeeId') employeeId: string
    // ) {
    //   return this.resourceManagerService.remove(resourceId, employeeId);
    // }
}
