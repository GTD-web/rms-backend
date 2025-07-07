import { ApiProperty } from '@nestjs/swagger';

export class ManagerResponseDto {
    @ApiProperty({
        type: 'string',
    })
    employeeId: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    employeeNumber: string;

    @ApiProperty()
    department: string;

    @ApiProperty()
    position: string;
}

export class TaskResponseDto {
    @ApiProperty({
        type: 'string',
        description: '태스크 타입',
    })
    type: string;

    @ApiProperty({
        type: 'string',
        description: '태스크 제목',
    })
    title: string;

    @ApiProperty({
        type: 'string',
        description: '예약 ID',
    })
    reservationId: string;

    @ApiProperty({
        type: 'string',
        description: '자원 ID',
    })
    resourceId: string;

    @ApiProperty({
        type: 'string',
        description: '자원 이름',
    })
    resourceName: string;

    @ApiProperty({
        type: 'string',
        description: '시작 날짜',
    })
    startDate: string;

    @ApiProperty({
        type: 'string',
        description: '종료 날짜',
    })
    endDate: string;

    @ApiProperty({
        type: ManagerResponseDto,
        description: '관리자',
    })
    manager: ManagerResponseDto;
}
