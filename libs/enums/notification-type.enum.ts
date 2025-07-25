export enum NotificationType {
    RESERVATION_STATUS_PENDING = 'RESERVATION_STATUS_PENDING',
    RESERVATION_STATUS_CONFIRMED = 'RESERVATION_STATUS_CONFIRMED',
    RESERVATION_STATUS_CANCELLED = 'RESERVATION_STATUS_CANCELLED',
    RESERVATION_STATUS_REJECTED = 'RESERVATION_STATUS_REJECTED',
    RESERVATION_DATE_UPCOMING = 'RESERVATION_DATE_UPCOMING',
    RESERVATION_TIME_CHANGED = 'RESERVATION_TIME_CHANGED',
    RESERVATION_PARTICIPANT_CHANGED = 'RESERVATION_PARTICIPANT_CHANGED',
    RESOURCE_CONSUMABLE_REPLACING = 'RESOURCE_CONSUMABLE_REPLACING',
    RESOURCE_CONSUMABLE_DELAYED_REPLACING = 'RESOURCE_CONSUMABLE_DELAYED_REPLACING',
    RESOURCE_VEHICLE_RETURNED = 'RESOURCE_VEHICLE_RETURNED',
    RESOURCE_VEHICLE_DELAYED_RETURNED = 'RESOURCE_VEHICLE_DELAYED_RETURNED',
    RESOURCE_MAINTENANCE_COMPLETED = 'RESOURCE_MAINTENANCE_COMPLETED',
}
