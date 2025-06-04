import { ApiProperty } from '@nestjs/swagger';

export class TesterInfoResponseDto {
    @ApiProperty()
    testerInfoId: string;

    @ApiProperty()
    resourceId: string;
}
