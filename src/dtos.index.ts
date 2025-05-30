// Resource Module DTOs

// Auth Module DTOs
export { LoginDto } from './application/auth/dto/login.dto';
export { LoginResponseDto } from './application/auth/dto/login-response.dto';
export { UserResponseDto } from './application/auth/dto/user-response.dto';
export { ChangeRoleDto } from './application/auth/dto/change-role.dto';
export { ChangePasswordDto } from './application/auth/dto/change-password.dto';
export { CheckPasswordDto } from './application/auth/dto/check-password.dto';
export { UpdateNotificationSettingsDto } from './application/auth/dto/notification-settings.dto';

// Common
export {
    CreateResourceDto,
    CreateResourceGroupDto,
    CreateResourceManagerDto,
    CreateResourceInfoDto,
} from './application/resource/core/dtos/create-resource.dto';
export {
    UpdateResourceDto,
    UpdateResourceGroupDto,
    UpdateResourceInfoDto,
    UpdateResourceGroupOrdersDto,
    UpdateResourceOrdersDto,
    NewOrderResourceDto,
    NewOrderResourceGroupDto,
} from './application/resource/core/dtos/update-resource.dto';
export {
    CreateResourceResponseDto,
    ResourceResponseDto,
    ResourceSelectResponseDto,
    ResourceWithReservationsResponseDto,
    ResourceGroupResponseDto,
    ChildResourceGroupResponseDto,
    ResourceGroupWithResourcesResponseDto,
    ResourceGroupWithResourcesAndReservationsResponseDto,
    ResourceManagerResponseDto,
} from './application/resource/core/dtos/resource-response.dto';

// Vehicle
export {
    CreateVehicleInfoDto,
    CreateConsumableDto,
    CreateMaintenanceDto,
} from './application/resource/vehicle/dtos/create-vehicle-info.dto';
export {
    UpdateVehicleInfoDto,
    UpdateConsumableDto,
    UpdateMaintenanceDto,
} from './application/resource/vehicle/dtos/update-vehicle-info.dto';
export {
    VehicleInfoResponseDto,
    ConsumableResponseDto,
    MaintenanceResponseDto,
} from './application/resource/vehicle/dtos/vehicle-response.dto';

// Meeting Room
export { CreateMeetingRoomInfoDto } from './application/resource/meeting-room/dtos/create-meeting-room-info.dto';
export { UpdateMeetingRoomInfoDto } from './application/resource/meeting-room/dtos/update-meeting-room-info.dto';
export { MeetingRoomInfoResponseDto } from './application/resource/meeting-room/dtos/meeting-room-info-response.dto';

// Accommodation
export { CreateAccommodationInfoDto } from './application/resource/accommodation/dtos/create-accommodation-info.dto';
export { UpdateAccommodationInfoDto } from './application/resource/accommodation/dtos/update-accommodation-info.dto';
export { AccommodationInfoResponseDto } from './application/resource/accommodation/dtos/accommodation-info-response.dto';

// Employee
export { CreateEmployeeDto } from './application/employee/dtos/create-employee.dto';
export { UpdateEmployeeDto } from './application/employee/dtos/update-employee.dto';
export { EmployeeResponseDto } from './application/employee/dtos/employee-response.dto';
export { EmplyeesByDepartmentResponseDto } from './application/employee/dtos/employees-by-department-response.dto';

// Reservation Module DTOs (향후 추가될 수 있음)
export { CreateReservationDto } from './application/reservation/core/dtos/create-reservation.dto';
export {
    UpdateReservationTitleDto,
    UpdateReservationTimeDto,
    UpdateReservationStatusDto,
    UpdateReservationParticipantsDto,
    UpdateReservationCcReceipientDto,
} from './application/reservation/core/dtos/update-reservation.dto';
export {
    CreateReservationResponseDto,
    ReservationResponseDto,
    ReservationWithResourceResponseDto,
    ReservationWithRelationsResponseDto,
    GroupedReservationResponseDto,
    GroupedReservationWithResourceResponseDto,
    CalendarResponseDto,
} from './application/reservation/core/dtos/reservation-response.dto';

// Reservation Snapshot Module DTOs
export {
    AttendeeDto,
    DroppableGroupItemDto,
    DroppableGroupDataDto,
    ReminderTimeDto,
    DateRangeDto,
    TimeInfoDto,
    TimeRangeDto,
    SelectedResourceDto,
    CreateReservationSnapshotDto,
    UpdateReservationSnapshotDto,
    ReservationSnapshotResponseDto,
    DateRangeResponseDto,
    TimeInfoResponseDto,
    TimeRangeResponseDto,
    SelectedResourceResponseDto,
} from './application/reservation/snapshot/dtos/reservation-snapshot.dto';

// Reservation Query DTOs
export { ResourceQueryDto } from './application/resource/core/dtos/resource-query.dto';
export { ResourceAvailabilityDto } from './application/resource/core/dtos/available-time-response.dto';
export { CheckAvailabilityQueryDto } from './application/resource/core/dtos/check-availability.dto';
export { CheckAvailabilityResponseDto } from './application/resource/core/dtos/check-availability.dto';

// File Module DTOs
export { FileResponseDto } from './application/file/dtos/file-response.dto';

// Notification Module DTOs
export { CreateNotificationDto, SendNotificationDto } from './application/notification/dtos/create-notification.dto';
export { PushSubscriptionDto } from './application/notification/dtos/push-subscription.dto';
export { ResponseNotificationDto } from './application/notification/dtos/response-notification.dto';
export { NotificationDataDto } from './application/notification/dtos/response-notification.dto';
export { PushNotificationDto, PushNotificationPayload } from './application/notification/dtos/send-notification.dto';

// Statistics
export {
    EmployeeReservationStatsFilterDto,
    EmployeeReservationStatsResponseDto,
} from './application/statistics/dtos/employee-reservation-stats.dto';

export {
    ResourceUsageStatsFilterDto,
    ResourceUsageStatsResponseDto,
} from './application/statistics/dtos/resource-usage-stats.dto';

export {
    VehicleMaintenanceHistoryFilterDto,
    VehicleMaintenanceHistoryResponseDto,
} from './application/statistics/dtos/vehicle-maintenance-history.dto';

export {
    ConsumableMaintenanceStatsFilterDto,
    ConsumableMaintenanceStatsResponseDto,
} from './application/statistics/dtos/consumable-maintenance-stats.dto';

export { StatisticsResponseDto } from './application/statistics/dtos/base.dto';
