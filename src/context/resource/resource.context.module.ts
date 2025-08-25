import { Module } from '@nestjs/common';

// Domain Modules
import { DomainResourceModule } from '@src/domain/resource/resource.module';
import { DomainResourceGroupModule } from '@src/domain/resource-group/resource-group.module';
import { DomainResourceManagerModule } from '@src/domain/resource-manager/resource-manager.module';
import { DomainVehicleInfoModule } from '@src/domain/vehicle-info/vehicle-info.module';
import { DomainMeetingRoomInfoModule } from '@src/domain/meeting-room-info/meeting-room-info.module';
import { DomainAccommodationInfoModule } from '@src/domain/accommodation-info/accommodation-info.module';
import { DomainEquipmentInfoModule } from '@src/domain/equipment-info/equipment-info.module';
import { DomainFileModule } from '@src/domain/file/file.module';
import { DomainConsumableModule } from '@src/domain/consumable/consumable.module';
import { DomainMaintenanceModule } from '@src/domain/maintenance/maintenance.module';
import { DomainReservationVehicleModule } from '@src/domain/reservation-vehicle/reservation-vehicle.module';
import { DomainEmployeeModule } from '@src/domain/employee/employee.module';

// Application Modules
import { NotificationModule } from '@src/application/notification/notification.module';

// Context Services
import { ResourceContextService } from './services/resource.context.service';
import { ResourceGroupContextService } from './services/resource-group.context.service';
import { VehicleInfoContextService } from './services/vehicle-info.context.service';
import { MeetingRoomInfoContextService } from './services/meeting-room-info.context.service';
import { AccommodationInfoContextService } from './services/accommodation-info.context.service';
import { EquipmentInfoContextService } from './services/equipment-info.context.service';
import { ConsumableContextService } from './services/consumable.context.service';
import { MaintenanceContextService } from './services/maintenance.context.service';

/**
 * 자원 관리 컨텍스트 모듈
 *
 * 이 모듈은 자원 관리에 관련된 모든 비즈니스 로직을 포함합니다:
 * - 자원 및 자원 그룹 관리
 * - 차량 정보 관리
 * - 소모품 및 정비 이력 관리
 * - 복합적인 비즈니스 워크플로우 조합
 *
 * 특징:
 * - Domain 레이어의 서비스들을 조합하여 비즈니스 로직 구성
 * - 한국어 메서드명을 사용하여 비즈니스 의도 명확화
 * - 트랜잭션 관리 및 복합적인 데이터 처리
 */
@Module({
    imports: [
        // Domain Layer Modules
        DomainResourceModule,
        DomainResourceGroupModule,
        DomainResourceManagerModule,
        DomainVehicleInfoModule,
        DomainMeetingRoomInfoModule,
        DomainAccommodationInfoModule,
        DomainEquipmentInfoModule,
        DomainFileModule,
        DomainConsumableModule,
        DomainMaintenanceModule,
        DomainReservationVehicleModule,
        DomainEmployeeModule,

        // Application Layer Modules
        NotificationModule,
    ],
    providers: [
        // Context Services
        ResourceContextService,
        ResourceGroupContextService,
        VehicleInfoContextService,
        MeetingRoomInfoContextService,
        AccommodationInfoContextService,
        EquipmentInfoContextService,
        ConsumableContextService,
        MaintenanceContextService,
    ],
    exports: [
        // Context Services
        ResourceContextService,
        ResourceGroupContextService,
        VehicleInfoContextService,
        MeetingRoomInfoContextService,
        AccommodationInfoContextService,
        EquipmentInfoContextService,
        ConsumableContextService,
        MaintenanceContextService,
    ],
})
export class ResourceContextModule {}
