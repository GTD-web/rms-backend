// Auth Module DTOs
export { LoginDto } from './application/auth/dto/login.dto';
export { LoginResponseDto } from './application/auth/dto/login-response.dto';
export { UserResponseDto } from './application/auth/dto/user-response.dto';
export { ChangeRoleDto } from './application/auth/dto/change-role.dto';
export { ChangePasswordDto } from './application/auth/dto/change-password.dto';
export { CheckPasswordDto } from './application/auth/dto/check-password.dto';
export { UpdateNotificationSettingsDto } from './application/auth/dto/notification-settings.dto';

// Employee Module DTOs
export { CreateEmployeeDto } from './application/employee/dtos/create-employee.dto';
export { UpdateEmployeeDto } from './application/employee/dtos/update-employee.dto';
export { EmployeeResponseDto } from './application/employee/dtos/employee-response.dto';
export { EmplyeesByDepartmentResponseDto } from './application/employee/dtos/employees-by-department-response.dto';

// Task Module DTOs
export { ManagerResponseDto, TaskResponseDto } from './application/task/dtos/task-response.dto';

// Resource Module DTOs
export { ResourceQueryDto } from './application/resource/core/dtos/resource-query.dto';
export {
    CreateResourceResponseDto,
    ResourceManagerResponseDto,
    ResourceGroupResponseDto,
    ResourceResponseDto,
    ResourceSelectResponseDto,
    ResourceWithReservationsResponseDto,
    ChildResourceGroupResponseDto,
    ResourceGroupWithResourcesResponseDto,
    ResourceGroupWithResourcesAndReservationsResponseDto,
} from './application/resource/core/dtos/resource-response.dto';
export {
    UpdateResourceGroupDto,
    UpdateResourceDto,
    UpdateResourceInfoDto,
    NewOrderResourceDto,
    UpdateResourceOrdersDto,
    NewOrderResourceGroupDto,
    UpdateResourceGroupOrdersDto,
} from './application/resource/core/dtos/update-resource.dto';
export {
    CreateResourceGroupDto,
    CreateResourceManagerDto,
    ResourceLocation,
    ResourceLocationURL,
    CreateResourceDto,
    CreateResourceInfoDto,
} from './application/resource/core/dtos/create-resource.dto';
export {
    CheckAvailabilityQueryDto,
    CheckAvailabilityResponseDto,
} from './application/resource/core/dtos/check-availability.dto';
export { TimeSlotDto, ResourceAvailabilityDto } from './application/resource/core/dtos/available-time-response.dto';

// Vehicle DTOs
export {
    CreateVehicleInfoDto,
    CreateConsumableDto,
    CreateMaintenanceDto,
} from './application/resource/vehicle/dtos/create-vehicle-info.dto';
export {
    UpdateMaintenanceDto,
    UpdateConsumableDto,
    UpdateVehicleInfoDto,
} from './application/resource/vehicle/dtos/update-vehicle-info.dto';
export {
    MaintenanceResponseDto,
    ConsumableResponseDto,
    VehicleInfoResponseDto,
} from './application/resource/vehicle/dtos/vehicle-response.dto';

// Meeting Room DTOs
export { CreateMeetingRoomInfoDto } from './application/resource/meeting-room/dtos/create-meeting-room-info.dto';
export { UpdateMeetingRoomInfoDto } from './application/resource/meeting-room/dtos/update-meeting-room-info.dto';
export { MeetingRoomInfoResponseDto } from './application/resource/meeting-room/dtos/meeting-room-info-response.dto';

// Accommodation DTOs
export { CreateAccommodationInfoDto } from './application/resource/accommodation/dtos/create-accommodation-info.dto';
export { UpdateAccommodationInfoDto } from './application/resource/accommodation/dtos/update-accommodation-info.dto';
export { AccommodationInfoResponseDto } from './application/resource/accommodation/dtos/accommodation-info-response.dto';

// Equipment DTOs
export { CreateEquipmentInfoDto } from './application/resource/equipment/dtos/create-equipment-info.dto';
export { UpdateEquipmentInfoDto } from './application/resource/equipment/dtos/update-equipment-info.dto';
export { EquipmentInfoResponseDto } from './application/resource/equipment/dtos/equipment-info-response.dto';

// Notification Module DTOs
export {
    NotificationDataDto,
    ResponseNotificationDto,
    PushNotificationSendResult,
} from './application/notification/dtos/response-notification.dto';
export {
    CreateNotificationDataDto,
    CreateNotificationDto,
    CreateEmployeeNotificationDto,
    SendNotificationDto,
} from './application/notification/dtos/create-notification.dto';
export { PushNotificationPayload, PushNotificationDto } from './application/notification/dtos/send-notification.dto';
export { FCMDto, WebPushDto, PushSubscriptionDto } from './application/notification/dtos/push-subscription.dto';
export { FcmSendRequestDto } from './context/notification/dtos/fcm-send-request.dto';
export { FcmSendResponseDto, FcmBulkSendResponseDto } from './context/notification/dtos/fcm-send-response.dto';

// Statistics Module DTOs
export {
    VehicleMaintenanceHistoryFilterDto,
    VehicleMaintenanceHistoryResponseDto,
} from './application/statistics/dtos/vehicle-maintenance-history.dto';
export {
    ResourceUsageStatsFilterDto,
    ResourceUsageStatsResponseDto,
} from './application/statistics/dtos/resource-usage-stats.dto';
export {
    EmployeeReservationStatsFilterDto,
    EmployeeReservationStatsResponseDto,
} from './application/statistics/dtos/employee-reservation-stats.dto';
export {
    ConsumableMaintenanceStatsFilterDto,
    ConsumableMaintenanceStatsResponseDto,
} from './application/statistics/dtos/consumable-maintenance-stats.dto';
export { DateRangeFilterDto, YearMonthFilterDto, StatisticsResponseDto } from './application/statistics/dtos/base.dto';

// Reservation Module DTOs
export {
    ReturnVehicleResponseDto,
    ReturnVehicleDetailResponseDto,
} from './application/reservation/core/dtos/return-vehicle-response.dto';
export {
    ReservationResponseDto,
    ReservationParticipantResponseDto,
    ReservationVehicleResponseDto,
    ReservationWithResourceResponseDto,
    ReservationWithRelationsResponseDto,
    CreateReservationResponseDto,
    GroupedReservationResponseDto,
    GroupedReservationWithResourceResponseDto,
    CalendarResponseDto,
} from './application/reservation/core/dtos/reservation-response.dto';
export { ReservationQueryDto } from './application/reservation/core/dtos/reservaion-query.dto';
export { CreateReservationDto } from './application/reservation/core/dtos/create-reservation.dto';
export {
    UpdateReservationTitleDto,
    UpdateReservationTimeDto,
    UpdateReservationStatusDto,
    UpdateReservationParticipantsDto,
    UpdateReservationCcReceipientDto,
    UpdateReservationDto,
    ReturnVehicleDto,
} from './application/reservation/core/dtos/update-reservation.dto';

// Reservation Snapshot DTOs
export {
    AttendeeDto,
    DroppableGroupItemDto,
    DroppableGroupDataDto,
    DateRangeDto,
    TimeInfoDto,
    TimeRangeDto,
    SelectedResourceDto,
    ReminderTimeDto,
    CreateReservationSnapshotDto,
    UpdateReservationSnapshotDto,
    DateRangeResponseDto,
    TimeInfoResponseDto,
    TimeRangeResponseDto,
    SelectedResourceResponseDto,
    ReservationSnapshotResponseDto,
} from './application/reservation/snapshot/dtos/reservation-snapshot.dto';

// File Module DTOs
export { CreateFileDataDto } from './application/file/dtos/create-filedata.dto';
export { FileResponseDto } from './application/file/dtos/file-response.dto';
