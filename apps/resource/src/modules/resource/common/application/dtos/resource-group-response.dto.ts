import { ApiProperty } from '@nestjs/swagger';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ResourceResponseDto } from './resource-response.dto';

export class ResourceGroupResponseDto {
    @ApiProperty()
    resourceGroupId?: string;

    @ApiProperty()
    title: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty({ enum: ResourceType })
    type: ResourceType;

    @ApiProperty({ required: false })
    parentResourceGroupId?: string;

    @ApiProperty({ type: [ResourceGroupResponseDto], required: false })
    children?: ResourceGroupResponseDto[];

    @ApiProperty({ required: false })
    parent?: ResourceGroupResponseDto;

    @ApiProperty({ type: [ResourceResponseDto], required: false })
    resources?: ResourceResponseDto[];
}
