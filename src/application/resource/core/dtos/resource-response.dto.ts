import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { VehicleInfoResponseDto } from '@src/application/resource/vehicle/dtos/vehicle-response.dto';
import { MeetingRoomInfoResponseDto } from '@src/application/resource/meeting-room/dtos/meeting-room-info-response.dto';
import { AccommodationInfoResponseDto } from '@src/application/resource/accommodation/dtos/accommodation-info-response.dto';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ResourceLocation, ResourceLocationURL } from './create-resource.dto';
import { ReservationResponseDto } from '@src/application/reservation/core/dtos/reservation-response.dto';
import { EmployeeResponseDto } from '@src/application/employee/dtos/employee-response.dto';
import { Resource } from '@libs/entities/resource.entity';
import { FileResponseDto } from '@src/application/file/dtos/file-response.dto';
import { TesterInfoResponseDto } from '@src/application/resource/tester/dtos/tester-info-response.dto';

export class CreateResourceResponseDto {
    @ApiProperty()
    resourceId: string;

    @ApiProperty({ enum: ResourceType })
    type: ResourceType;

    @ApiProperty()
    typeInfoId: string;
}

export class ResourceManagerResponseDto {
    @ApiProperty()
    resourceManagerId: string;

    @ApiProperty()
    resourceId: string;

    @ApiProperty()
    employeeId: string;

    @ApiProperty()
    employee: EmployeeResponseDto;
}

export class ResourceGroupResponseDto {
    @ApiProperty()
    resourceGroupId?: string;

    @ApiProperty()
    title: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty({ enum: ResourceType })
    type: ResourceType;

    @ApiProperty()
    order: number;

    @ApiProperty({ required: false })
    parentResourceGroupId?: string;
}

export class ResourceResponseDto {
    constructor(resource?: Resource) {
        this.resourceId = resource?.resourceId;
        this.resourceGroupId = resource?.resourceGroupId;
        this.name = resource?.name;
        this.description = resource?.description;
        this.location = resource?.location;
        this.locationURLs = resource?.locationURLs;
        this.images = resource?.images;
        this.type = resource?.type;
        this.isAvailable = resource?.isAvailable;
        this.unavailableReason = resource?.unavailableReason;
        this.notifyParticipantChange = resource?.notifyParticipantChange;
        this.notifyReservationChange = resource?.notifyReservationChange;
        this.order = resource?.order;
        this.managers = resource?.resourceManagers;
        this.resourceGroup = resource?.resourceGroup;
        this.imageFiles = resource?.images ? resource['imageFiles'] : [];

        if (resource?.vehicleInfo) {
            this.typeInfo = resource.vehicleInfo as unknown as VehicleInfoResponseDto;
        } else if (resource?.meetingRoomInfo) {
            this.typeInfo = resource.meetingRoomInfo as unknown as MeetingRoomInfoResponseDto;
        } else if (resource?.accommodationInfo) {
            this.typeInfo = resource.accommodationInfo as unknown as AccommodationInfoResponseDto;
        } else if (resource?.testerInfo) {
            this.typeInfo = resource.testerInfo as unknown as TesterInfoResponseDto;
        }
    }

    @ApiProperty({ required: false })
    resourceId?: string;

    @ApiProperty({ required: false })
    resourceGroupId?: string;

    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty({ required: false, type: ResourceLocation })
    location?: ResourceLocation;

    @ApiProperty({ required: false, type: ResourceLocationURL })
    locationURLs?: ResourceLocationURL;

    @ApiProperty({ required: false, type: [String] })
    images?: string[];

    @ApiProperty({ required: false, type: [FileResponseDto] })
    imageFiles?: FileResponseDto[];

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

    @ApiProperty()
    order: number;

    @ApiProperty({
        required: false,
        oneOf: [
            { $ref: getSchemaPath(VehicleInfoResponseDto) },
            { $ref: getSchemaPath(MeetingRoomInfoResponseDto) },
            { $ref: getSchemaPath(AccommodationInfoResponseDto) },
            { $ref: getSchemaPath(TesterInfoResponseDto) },
        ],
    })
    typeInfo?:
        | VehicleInfoResponseDto
        | MeetingRoomInfoResponseDto
        | AccommodationInfoResponseDto
        | TesterInfoResponseDto;

    @ApiProperty({ required: false, type: [ResourceManagerResponseDto] })
    managers?: ResourceManagerResponseDto[];

    @ApiProperty({ required: false })
    resourceGroup?: ResourceGroupResponseDto;
}

export class ResourceSelectResponseDto {
    @ApiProperty()
    resourceId?: string;

    @ApiProperty()
    name: string;

    @ApiProperty({ required: false, type: [String] })
    images?: string[];

    @ApiProperty()
    isAvailable?: boolean;

    @ApiProperty({ required: false })
    unavailableReason?: string;

    @ApiProperty()
    resourceGroupId?: string;

    @ApiProperty()
    order: number;
}

export class ResourceWithReservationsResponseDto extends ResourceResponseDto {
    constructor(resource?: Resource) {
        super(resource);
        this.reservations = resource?.reservations.map((reservation) => new ReservationResponseDto(reservation));
    }

    @ApiProperty({ required: false, type: [ReservationResponseDto] })
    reservations?: ReservationResponseDto[];
}

export class ChildResourceGroupResponseDto extends ResourceGroupResponseDto {
    @ApiProperty({ type: () => ResourceSelectResponseDto, required: false })
    resources?: ResourceSelectResponseDto[];
}

export class ResourceGroupWithResourcesResponseDto extends ResourceGroupResponseDto {
    @ApiProperty({
        type: [ChildResourceGroupResponseDto],
        required: false,
    })
    children?: ChildResourceGroupResponseDto[];
}

export class ResourceGroupWithResourcesAndReservationsResponseDto extends ResourceGroupResponseDto {
    @ApiProperty({
        type: [ResourceWithReservationsResponseDto],
        required: false,
    })
    resources?: ResourceWithReservationsResponseDto[];
}
