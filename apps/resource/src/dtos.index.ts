// Resource Module DTOs

// Auth Module DTOs
export { LoginDto } from './modules/auth/application/dto/login.dto';
export { LoginResponseDto } from './modules/auth/application/dto/login-response.dto';

// Common
export { CreateResourceDto } from './modules/resource/common/application/dtos/create-resource.dto';
export { CreateResourceGroupDto } from './modules/resource/common/application/dtos/create-resource-group.dto';
export { CreateResourceManagerDto } from './modules/resource/common/application/dtos/create-resource-manager.dto';
export { UpdateResourceDto } from './modules/resource/common/application/dtos/update-resource.dto';
export { UpdateResourceGroupDto } from './modules/resource/common/application/dtos/update-resource-group.dto';
export { CreateResourceRequestDto } from './modules/resource/common/application/dtos/create-resource-request.dto';
export { UpdateResourceRequestDto } from './modules/resource/common/application/dtos/update-resource-request.dto';
export { ResourceResponseDto } from './modules/resource/common/application/dtos/resource-response.dto';
export { ResourceManagerResponseDto } from './modules/resource/common/application/dtos/resource-manager-response.dto';
export { ResourceGroupResponseDto } from './modules/resource/common/application/dtos/resource-group-response.dto';

// Vehicle
export { CreateVehicleInfoDto } from './modules/resource/vehicle/application/dtos/create-vehicle-info.dto';
export { CreateConsumableDto } from './modules/resource/vehicle/application/dtos/create-consumable.dto';
export { CreateMaintenanceDto } from './modules/resource/vehicle/application/dtos/create-maintenance.dto';
export { UpdateVehicleInfoDto } from './modules/resource/vehicle/application/dtos/update-vehicle-info.dto';
export { UpdateConsumableDto } from './modules/resource/vehicle/application/dtos/update-consumable.dto';
export { UpdateMaintenanceDto } from './modules/resource/vehicle/application/dtos/update-maintenance.dto';
export { VehicleInfoResponseDto } from './modules/resource/vehicle/application/dtos/vehicle-info-response.dto';
export { ConsumableResponseDto } from './modules/resource/vehicle/application/dtos/consumable-response.dto';
export { MaintenanceResponseDto } from './modules/resource/vehicle/application/dtos/maintenance-response.dto';

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
export { CreateReservationResponseDto } from './modules/reservation/application/dtos/create-reservation-response.dto';
export {
    UpdateReservationTitleDto,
    UpdateReservationTimeDto,
    UpdateReservationStatusDto,
    UpdateReservationParticipantsDto,
    UpdateReservationCcReceipientDto,
} from './modules/reservation/application/dtos/update-reservation.dto';
export { ReservationResponseDto } from './modules/reservation/application/dtos/reservation-response.dto';

// File Module DTOs
export { FileResponseDto } from './modules/file/application/dtos/file-response.dto';
