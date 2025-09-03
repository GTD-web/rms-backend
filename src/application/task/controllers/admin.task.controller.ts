import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { TaskResponseDto } from '../dtos/task-response.dto';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { PaginationQueryDto } from '@libs/dtos/pagination-query.dto';
import { AdminTaskService } from '../services/admin.task.service';
import { ResponseInterceptor } from '@libs/interceptors/response.interceptor';
import { ErrorInterceptor } from '@libs/interceptors/error.interceptor';

@ApiTags('3. 태스크 관리 - 관리자')
@ApiBearerAuth()
@Roles(Role.SYSTEM_ADMIN)
@Controller('v1/admin/tasks')
@UseInterceptors(ResponseInterceptor, ErrorInterceptor)
export class AdminTaskController {
    constructor(private readonly adminTaskService: AdminTaskService) {}

    @Get()
    @ApiOperation({ summary: '태스크 목록 조회' })
    @ApiDataResponse({
        status: 200,
        description: '태스크 목록 조회 성공',
        type: [TaskResponseDto],
    })
    @ApiQuery({
        name: 'type',
        type: String,
        required: false,
        description: '태스크 타입',
        enum: ['차량반납지연', '소모품교체'],
    })
    async getTasks(@Query('type') type: string) {
        return this.adminTaskService.getTasks(type);
    }
}
