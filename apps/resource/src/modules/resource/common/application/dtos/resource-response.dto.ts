import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { ResourceManagerResponseDto } from './resource-manager-response.dto';
import { VehicleInfoResponseDto } from '@resource/modules/resource/vehicle/application/dtos/vehicle-info-response.dto';
import { MeetingRoomInfoResponseDto } from '@resource/modules/resource/meeting-room/application/dtos/meeting-room-info-response.dto';
import { AccommodationInfoResponseDto } from '@resource/modules/resource/accommodation/application/dtos/accommodation-info-response.dto';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ResourceLocation } from './create-resource.dto';
import { ReservationResponseDto } from '@resource/modules/reservation/application/dtos/reservation-response.dto';

export class ResourceResponseDto {
    @ApiProperty({ required: false })
    resourceId?: string;

    @ApiProperty({ required: false })
    resourceGroupId?: string;

    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty({ required: false, type: 'object' })
    location?: ResourceLocation;

    @ApiProperty({ required: false, type: [String] })
    images?: string[];

    @ApiProperty({ enum: ResourceType })
    type?: ResourceType;

    @ApiProperty()
    isAvailable?: boolean;

    @ApiProperty({ required: false })
    unavailableReason?: string;

    @ApiProperty()
    notifyParticipantChange?: boolean;

    @ApiProperty()
    notifyReservationChange?: boolean;

    @ApiProperty({
        required: false,
        oneOf: [
            { $ref: getSchemaPath(VehicleInfoResponseDto) },
            { $ref: getSchemaPath(MeetingRoomInfoResponseDto) },
            { $ref: getSchemaPath(AccommodationInfoResponseDto) },
        ],
    })
    typeInfo?: VehicleInfoResponseDto | MeetingRoomInfoResponseDto | AccommodationInfoResponseDto;

    @ApiProperty({ required: false, type: [ResourceManagerResponseDto] })
    managers?: ResourceManagerResponseDto[];

    @ApiProperty({ required: false, type: [ReservationResponseDto] })
    reservations?: ReservationResponseDto[];
}
