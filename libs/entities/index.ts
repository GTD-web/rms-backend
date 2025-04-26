import { Employee } from './employee.entity';
import { User } from './user.entity';
import { Resource } from './resource.entity';
import { ResourceGroup } from './resource-group.entity';
import { VehicleInfo } from './vehicle-info.entity';
import { MeetingRoomInfo } from './meeting-room-info.entity';
import { AccommodationInfo } from './accommodation-info.entity';
import { Reservation } from './reservation.entity';
import { ReservationParticipant } from './reservation-participant.entity';
import { Schedule } from './schedule.entity';
import { ResourceManager } from './resource-manager.entity';
import { Consumable } from './consumable.entity';
import { Maintenance } from './maintenance.entity';
import { Notification } from './notification.entity';
import { EmployeeNotification } from './employee-notification.entity';
import { File } from './file.entity';
import {
    EmployeeReservationStats,
    ResourceUsageStats,
    VehicleMaintenanceHistory,
    ConsumableMaintenanceStats,
} from './view';
import { ReservationSnapshot } from './reservation-snapshot.entity';

export const Entities = [
    Employee,
    User,
    Resource,
    ResourceGroup,
    VehicleInfo,
    MeetingRoomInfo,
    AccommodationInfo,
    Reservation,
    ReservationSnapshot,
    ReservationParticipant,
    Schedule,
    ResourceManager,
    Consumable,
    Maintenance,
    Notification,
    EmployeeNotification,
    File,
    EmployeeReservationStats,
    ResourceUsageStats,
    VehicleMaintenanceHistory,
    ConsumableMaintenanceStats,
];

export const EntitiesMap = {
    Employee,
    User,
    Resource,
    ResourceGroup,
    VehicleInfo,
    MeetingRoomInfo,
    AccommodationInfo,
    Reservation,
    ReservationSnapshot,
    ReservationParticipant,
    Schedule,
    ResourceManager,
    Consumable,
    Maintenance,
    Notification,
    EmployeeNotification,
    File,
    EmployeeReservationStats,
    ResourceUsageStats,
    VehicleMaintenanceHistory,
    ConsumableMaintenanceStats,
};

export {
    Employee,
    User,
    Resource,
    ResourceGroup,
    VehicleInfo,
    MeetingRoomInfo,
    AccommodationInfo,
    Reservation,
    ReservationSnapshot,
    ReservationParticipant,
    Schedule,
    ResourceManager,
    Consumable,
    Maintenance,
    Notification,
    EmployeeNotification,
    File,
    EmployeeReservationStats,
    ResourceUsageStats,
    VehicleMaintenanceHistory,
    ConsumableMaintenanceStats,
};
