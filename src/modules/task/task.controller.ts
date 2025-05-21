import { Controller, Get, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { User } from '@libs/decorators/user.decorator';
import { User as UserEntity } from '@libs/entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';

@ApiTags('3. 자원 관리 - 태스크')
@ApiBearerAuth()
@Roles(Role.USER)
@Controller('v1/tasks')
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
    async getTasks(@User() user: UserEntity) {
        return this.taskService.getTasks(user);
    }

    @Get('status')
    @ApiOperation({ summary: '태스크 상태 조회' })
    @ApiResponse({
        status: 200,
        description: '태스크 상태 조회 성공',
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
            },
        },
    })
    async getTaskStatus(@User() user: UserEntity) {
        return this.taskService.getTaskStatus(user);
    }
}
