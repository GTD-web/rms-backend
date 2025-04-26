import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from '@resource/modules/auth/application/services/user.service';
import { User } from '@libs/entities';
import { Role } from '@libs/enums/role-type.enum';

@ApiTags('User Domain Test')
@Controller('domain/users')
export class UserControllers {
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiOperation({ summary: '모든 사용자 조회' })
    @ApiResponse({ status: 200, description: '모든 사용자 조회 성공', type: [User] })
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get('employee/:employeeId')
    @ApiOperation({ summary: '사원 ID로 사용자 조회' })
    @ApiResponse({ status: 200, description: '사용자 조회 성공', type: User })
    async findByEmployeeId(@Param('employeeId') employeeId: string): Promise<User | null> {
        return this.userService.findByEmployeeId(employeeId);
    }

    @Get('email/:email')
    @ApiOperation({ summary: '이메일로 사용자 조회' })
    @ApiResponse({ status: 200, description: '사용자 조회 성공', type: User })
    async findByEmail(@Param('email') email: string): Promise<User | null> {
        return this.userService.findByEmail(email);
    }

    @Get(':userId')
    @ApiOperation({ summary: '사용자 ID로 사용자 조회' })
    @ApiResponse({ status: 200, description: '사용자 조회 성공', type: User })
    async findByUserId(@Param('userId') userId: string): Promise<User | null> {
        return this.userService.findByUserId(userId);
    }

    @Post()
    @ApiOperation({ summary: '사용자 저장' })
    @ApiResponse({ status: 201, description: '사용자 저장 성공', type: User })
    async save(@Body() user: User): Promise<User> {
        return this.userService.save(user);
    }

    @Patch(':userId')
    @ApiOperation({ summary: '사용자 정보 업데이트' })
    @ApiResponse({ status: 200, description: '사용자 정보 업데이트 성공', type: User })
    async update(@Param('userId') userId: string, @Body() user: User): Promise<User> {
        return this.userService.update({...user, userId});
    }
}
