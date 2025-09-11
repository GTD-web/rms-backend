import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { NotificationContextService } from './notification.context.service';
import { Schedule } from '@libs/entities/schedule.entity';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { Reservation } from '@libs/entities/reservation.entity';
import { Resource } from '@libs/entities/resource.entity';
import { DateUtil } from '@libs/utils/date.util';
import { CreateNotificationDataDto } from '@src/context/notification/dtos/create-notification.dto';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ScheduleUpdateResult } from '@src/context/schedule/services/schedule-state-transition.service';
import { UpdateScenarios } from '@src/context/schedule/services/schedule-policy.service';
import { DomainEmployeeNotificationService } from '@src/domain/employee-notification/employee-notification.service';

@Injectable()
export class ReservationNotificationContextService {
    private readonly logger = new Logger(ReservationNotificationContextService.name);
    constructor(
        private readonly notificationContextService: NotificationContextService,
        private readonly employeeNotificationService: DomainEmployeeNotificationService,
    ) {}

    async 차량반납_알림을_전송한다(data: { resource: Resource }, targetEmployeeIds: string[]): Promise<void> {
        const notificationData: CreateNotificationDataDto = {
            resource: {
                resourceId: data.resource?.resourceId,
                resourceName: data.resource?.name,
                resourceType: data.resource?.type,
            },
        };

        await this.notificationContextService.알림_전송_프로세스를_진행한다(
            NotificationType.RESOURCE_VEHICLE_RETURNED,
            notificationData,
            targetEmployeeIds,
        );
    }
}
