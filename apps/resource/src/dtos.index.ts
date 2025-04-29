// Resource Module DTOs

// Auth Module DTOs
export { LoginDto } from './modules/auth/application/dto/login.dto';
export { LoginResponseDto } from './modules/auth/application/dto/login-response.dto';
export { UserResponseDto } from './modules/auth/application/dto/user-response.dto';

// Common
export {
    CreateResourceDto,
    CreateResourceGroupDto,
    CreateResourceManagerDto,
    CreateResourceInfoDto,
} from './modules/resource/common/application/dtos/create-resource.dto';
export {
    UpdateResourceDto,
    UpdateResourceGroupDto,
    UpdateResourceInfoDto,
    UpdateResourceGroupOrdersDto,
    UpdateResourceOrdersDto,
    NewOrderResourceDto,
    NewOrderResourceGroupDto,
    ReturnVehicleDto,
} from './modules/resource/common/application/dtos/update-resource.dto';
export {
    ResourceResponseDto,
    ResourceSelectResponseDto,
    ResourceWithReservationsResponseDto,
    ResourceGroupResponseDto,
    ChildResourceGroupResponseDto,
    ResourceGroupWithResourcesResponseDto,
    ResourceGroupWithResourcesAndReservationsResponseDto,
    ResourceManagerResponseDto,
} from './modules/resource/common/application/dtos/resource-response.dto';

// Vehicle
export {
    CreateVehicleInfoDto,
    CreateConsumableDto,
    CreateMaintenanceDto,
} from './modules/resource/vehicle/application/dtos/create-vehicle-info.dto';
export {
    UpdateVehicleInfoDto,
    UpdateConsumableDto,
    UpdateMaintenanceDto,
} from './modules/resource/vehicle/application/dtos/update-vehicle-info.dto';
export {
    VehicleInfoResponseDto,
    ConsumableResponseDto,
    MaintenanceResponseDto,
} from './modules/resource/vehicle/application/dtos/vehicle-response.dto';

// Meeting Room
export { CreateMeetingRoomInfoDto } from './modules/resource/meeting-room/application/dtos/create-meeting-room-info.dto';
export { UpdateMeetingRoomInfoDto } from './modules/resource/meeting-room/application/dtos/update-meeting-room-info.dto';
export { MeetingRoomInfoResponseDto } from './modules/resource/meeting-room/application/dtos/meeting-room-info-response.dto';

// Accommodation
export { CreateAccommodationInfoDto } from './modules/resource/accommodation/application/dtos/create-accommodation-info.dto';
export { UpdateAccommodationInfoDto } from './modules/resource/accommodation/application/dtos/update-accommodation-info.dto';
export { AccommodationInfoResponseDto } from './modules/resource/accommodation/application/dtos/accommodation-info-response.dto';

// Employee
export { CreateEmployeeDto } from './modules/employee/application/dtos/create-employee.dto';
export { UpdateEmployeeDto } from './modules/employee/application/dtos/update-employee.dto';
export { EmployeeResponseDto } from './modules/employee/application/dtos/employee-response.dto';
export { EmplyeesByDepartmentResponseDto } from './modules/employee/application/dtos/employees-by-department-response.dto';

// Reservation Module DTOs (향후 추가될 수 있음)
export { CreateReservationDto } from './modules/reservation/application/dtos/create-reservation.dto';
export {
    UpdateReservationTitleDto,
    UpdateReservationTimeDto,
    UpdateReservationStatusDto,
    UpdateReservationParticipantsDto,
    UpdateReservationCcReceipientDto,
} from './modules/reservation/application/dtos/update-reservation.dto';
export {
    CreateReservationResponseDto,
    ReservationResponseDto,
    ReservationWithResourceResponseDto,
    ReservationWithRelationsResponseDto,
    GroupedReservationResponseDto,
    GroupedReservationWithResourceResponseDto,
} from './modules/reservation/application/dtos/reservation-response.dto';

// Reservation Snapshot Module DTOs
export {
    CreateReservationSnapshotDto,
    UpdateReservationSnapshotDto,
    ReservationSnapshotResponseDto,
} from './modules/reservation/application/dtos/reservation-snapshot.dto';

// Reservation Query DTOs
export { ResourceQueryDto } from './modules/resource/common/application/dtos/resource-query.dto';
export { ResourceAvailabilityDto } from './modules/resource/common/application/dtos/available-time-response.dto';
export { CheckAvailabilityQueryDto } from './modules/resource/common/application/dtos/check-availability.dto';
export { CheckAvailabilityResponseDto } from './modules/resource/common/application/dtos/check-availability.dto';

// File Module DTOs
export { FileResponseDto } from './modules/file/application/dtos/file-response.dto';

// Notification Module DTOs
export {
    CreateNotificationDto,
    SendNotificationDto,
} from './modules/notification/application/dto/create-notification.dto';
export { PushSubscriptionDto } from './modules/notification/application/dto/push-subscription.dto';
export { ResponseNotificationDto } from './modules/notification/application/dto/response-notification.dto';
export { NotificationDataDto } from './modules/notification/application/dto/response-notification.dto';

// Statistics
export {
    EmployeeReservationStatsFilterDto,
    EmployeeReservationStatsResponseDto,
} from './statistics/employee-reservation-stats.dto';

export { ResourceUsageStatsFilterDto, ResourceUsageStatsResponseDto } from './statistics/resource-usage-stats.dto';

export {
    VehicleMaintenanceHistoryFilterDto,
    VehicleMaintenanceHistoryResponseDto,
} from './statistics/vehicle-maintenance-history.dto';

export {
    ConsumableMaintenanceStatsFilterDto,
    ConsumableMaintenanceStatsResponseDto,
} from './statistics/consumable-maintenance-stats.dto';

export { StatisticsResponseDto } from './common/base.dto';
