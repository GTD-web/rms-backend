// 🎯 Business Layer DTOs - 비즈니스 레이어 모든 DTO Export

// ============================================================================
// 📋 RESERVATION MANAGEMENT DTOs
// ============================================================================
export * from './business/reservation-management/dtos/create-reservation.dto';
export * from './business/reservation-management/dtos/reservaion-query.dto';
export * from './business/reservation-management/dtos/reservation-response.dto';
export * from './business/reservation-management/dtos/return-vehicle-response.dto';
export * from './business/reservation-management/dtos/update-reservation.dto';

// ============================================================================
// 📋 RESOURCE MANAGEMENT DTOs
// ============================================================================

// 🏨 Accommodation DTOs
export * from './business/resource-management/dtos/accommodation/dtos/accommodation-info-response.dto';
export * from './business/resource-management/dtos/accommodation/dtos/create-accommodation-info.dto';
export * from './business/resource-management/dtos/accommodation/dtos/update-accommodation-info.dto';

// 🔧 Equipment DTOs
export * from './business/resource-management/dtos/equipment/dtos/create-equipment-info.dto';
export * from './business/resource-management/dtos/equipment/dtos/equipment-info-response.dto';
export * from './business/resource-management/dtos/equipment/dtos/update-equipment-info.dto';

// 🏢 Meeting Room DTOs
export * from './business/resource-management/dtos/meeting-room/dtos/create-meeting-room-info.dto';
export * from './business/resource-management/dtos/meeting-room/dtos/meeting-room-info-response.dto';
export * from './business/resource-management/dtos/meeting-room/dtos/update-meeting-room-info.dto';

// 📦 Resource DTOs
export * from './business/resource-management/dtos/resource/check-availability.dto';
export * from './business/resource-management/dtos/resource/create-resource.dto';
export * from './business/resource-management/dtos/resource/resource-query.dto';
export * from './business/resource-management/dtos/resource/resource-response.dto';
export * from './business/resource-management/dtos/resource/time-slot.dto';
export * from './business/resource-management/dtos/resource/update-resource.dto';
// Note: available-time-response.dto exports ResourceAvailabilityDto (TimeSlotDto already exported above)
export { ResourceAvailabilityDto } from './business/resource-management/dtos/resource/available-time-response.dto';

// 🚗 Vehicle DTOs
export * from './business/resource-management/dtos/vehicle/create-vehicle-info.dto';
export * from './business/resource-management/dtos/vehicle/update-vehicle-info.dto';
export * from './business/resource-management/dtos/vehicle/vehicle-response.dto';
// Note: return-vehicle-response.dto already exported from reservation-management

// ============================================================================
// 📋 CONTEXT LAYER DTOs
// ============================================================================

// 📢 Context Notification DTOs
export {
    CreateNotificationDto as ContextCreateNotificationDto,
    CreateNotificationDataDto as ContextCreateNotificationDataDto,
    CreateEmployeeNotificationDto as ContextCreateEmployeeNotificationDto,
    SendNotificationDto as ContextSendNotificationDto,
} from './context/notification/dtos/create-notification.dto';

export {
    ResponseNotificationDto as ContextResponseNotificationDto,
    NotificationDataDto as ContextNotificationDataDto,
    PushNotificationSendResult,
    ScheduleResponseDto,
    ReservationResponseDto,
    ResourceResponseDto as ContextResourceResponseDto,
    ProjectResponseDto,
    ConsumableResponseDto as ContextConsumableResponseDto,
    VehicleInfoResponseDto as ContextVehicleInfoResponseDto,
} from './context/notification/dtos/response-notification.dto';

export { PushSubscriptionDto as ContextPushSubscriptionDto } from './context/notification/dtos/push-subscription.dto';
export {
    PushNotificationDto as ContextPushNotificationDto,
    PushNotificationPayload as ContextPushNotificationPayload,
} from './context/notification/dtos/send-notification.dto';

// 📁 Context File DTOs
export { CreateFileDataDto as ContextCreateFileDataDto } from './context/file/dtos/create-filedata.dto';
export { FileResponseDto as ContextFileResponseDto } from './context/file/dtos/file-response.dto';
export { ReservationVehicleFileResponseDto } from './context/file/dtos/reservation-vehicle-file-response.dto';
export * from './context/file/dtos/index';
