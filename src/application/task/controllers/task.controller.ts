import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { User } from '@libs/decorators/user.decorator';
import { Employee } from '@libs/entities';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { ResponseInterceptor } from '@libs/interceptors/response.interceptor';
import { ErrorInterceptor } from '@libs/interceptors/error.interceptor';

@ApiTags('3. 태스크 관리 ')
@ApiBearerAuth()
@Roles(Role.USER)
@Controller('v1/tasks')
@UseInterceptors(ResponseInterceptor, ErrorInterceptor)
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    @ApiOperation({ summary: '태스크 목록 조회' })
    @ApiResponse({
        status: 200,
        description: '태스크 목록 조회 성공',
        schema: {
            type: 'object',
            properties: {
                totalCount: { type: 'number' },
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            type: { type: 'string' },
                            title: { type: 'string' },
                            reservationId: { type: 'string', nullable: true },
                            resourceId: { type: 'string', nullable: true },
                            resourceName: { type: 'string', nullable: true },
                            startDate: { type: 'string', nullable: true },
                            endDate: { type: 'string', nullable: true },
                        },
                    },
                },
            },
        },
    })
    async getTasks(@User() user: Employee) {
        return this.taskService.getTasks(user);
    }

    // @Get('status')
    // @ApiOperation({ summary: '태스크 상태 조회' })
    // @ApiResponse({
    //     status: 200,
    //     description: '태스크 상태 조회 성공',
    //     schema: {
    //         type: 'object',
    //         properties: {
    //             title: { type: 'string' },
    //         },
    //     },
    // })
    // async getTaskStatus(@User() user: Employee) {
    //     return this.taskService.getTaskStatus(user);
    // }
}
