import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { VehicleInfoResponseDto } from '../vehicle/vehicle-response.dto';
import { AccommodationInfoResponseDto } from '../accommodation/accommodation-info-response.dto';
import { MeetingRoomInfoResponseDto } from '../meeting-room/meeting-room-info-response.dto';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ResourceLocation, ResourceLocationURL } from './create-resource.dto';
import { ReservationResponseDto } from '@src/business/reservation-management/dtos/reservation-response.dto';
import { EmployeeResponseDto } from '@src/business/employee-management/dtos/employee-response.dto';
import { Resource } from '@libs/entities/resource.entity';
import { FileResponseDto } from '@src/context/file/dtos/file-response.dto';
import { EquipmentInfoResponseDto } from '@src/business/resource-management/dtos/equipment/equipment-info-response.dto';

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
        } else if (resource?.equipmentInfo) {
            this.typeInfo = resource.equipmentInfo as unknown as EquipmentInfoResponseDto;
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
            { $ref: getSchemaPath(EquipmentInfoResponseDto) },
        ],
    })
    typeInfo?:
        | VehicleInfoResponseDto
        | MeetingRoomInfoResponseDto
        | AccommodationInfoResponseDto
        | EquipmentInfoResponseDto;

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

export class ResourceGroupWithResourcesDto extends ResourceGroupResponseDto {
    @ApiProperty({
        type: [ResourceResponseDto],
        required: false,
    })
    resources?: ResourceResponseDto[];
}

export class ResourceTypeGroupDto {
    @ApiProperty({ enum: ResourceType, description: '자원 타입' })
    type: ResourceType;

    @ApiProperty({
        type: [ResourceGroupWithResourcesDto],
        description: '해당 타입의 그룹 목록',
        required: false,
    })
    groups?: ResourceGroupWithResourcesDto[];

    @ApiProperty({
        type: [ResourceResponseDto],
        description: '그룹이 없는 자원들',
        required: false,
    })
    ungroupedResources?: ResourceResponseDto[];
}

export class MyManagementResourcesResponseDto {
    @ApiProperty({
        type: [ResourceTypeGroupDto],
        description: '타입별로 분류된 자원 그룹들',
    })
    resourcesByType: ResourceTypeGroupDto[];
}
