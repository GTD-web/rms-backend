import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ResourceLocationURL } from '../../../../business/resource-management/dtos/resource/create-resource.dto';

export class CreateAccommodationInfoDto {
    @ApiProperty({ type: ResourceLocationURL })
    @IsOptional()
    locationURLs?: ResourceLocationURL;
}
