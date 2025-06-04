import { NotificationType } from '@libs/enums/notification-type.enum';
import { DateUtil } from '@libs/utils/date.util';
import { Injectable } from '@nestjs/common';
import { CreateNotificationDataDto, CreateNotificationDto } from '../dtos/create-notification.dto';

@Injectable()
export class CreateNotificationUsecase {
    constructor() {}

    async execute(
        notificationType: NotificationType,
        createNotificationDatatDto: CreateNotificationDataDto,
    ): Promise<CreateNotificationDto> {
        const createNotificationDto: CreateNotificationDto = {
            title: '',
            body: '',
            notificationType: notificationType,
            notificationData: createNotificationDatatDto,
            createdAt: DateUtil.now().format('YYYY-MM-DD HH:mm'),
            isSent: true,
        };
        switch (notificationType) {
            case NotificationType.RESERVATION_DATE_UPCOMING:
                createNotificationDto.title = `예약 시간이 ${createNotificationDatatDto.beforeMinutes}분 남았습니다.`;
                createNotificationDto.body = `${createNotificationDatatDto.resourceName}`;
                createNotificationDto.createdAt = DateUtil.parse(createNotificationDatatDto.reservationDate)
                    .addMinutes(-createNotificationDatatDto.beforeMinutes)
                    .format('YYYY-MM-DD HH:mm');
                createNotificationDto.isSent = false;
                break;
            case NotificationType.RESERVATION_STATUS_PENDING:
                createNotificationDto.title = `[숙소 확정 대기중] ${createNotificationDatatDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDatatDto.reservationDate}`;
                break;
            case NotificationType.RESERVATION_STATUS_CONFIRMED:
                createNotificationDto.title = `[예약 확정] ${createNotificationDatatDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDatatDto.reservationDate}`;
                break;
            case NotificationType.RESERVATION_STATUS_CANCELLED:
                createNotificationDto.title = `[예약 취소] ${createNotificationDatatDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDatatDto.reservationDate}`;
                break;
            case NotificationType.RESERVATION_STATUS_REJECTED:
                createNotificationDto.title = `[예약 취소 (관리자)] ${createNotificationDatatDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDatatDto.reservationDate}`;
                break;
            case NotificationType.RESERVATION_TIME_CHANGED:
                createNotificationDto.title = `[예약 시간 변경] ${createNotificationDatatDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDatatDto.reservationDate}`;
                break;
            case NotificationType.RESERVATION_PARTICIPANT_CHANGED:
                createNotificationDto.title = `[참가자 변경] ${createNotificationDatatDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDatatDto.reservationDate}`;
                break;
            case NotificationType.RESOURCE_CONSUMABLE_REPLACING:
                createNotificationDto.title = `[교체 주기 알림] ${createNotificationDatatDto.consumableName}`;
                createNotificationDto.body = `${createNotificationDatatDto.resourceName}`;
                break;
            case NotificationType.RESOURCE_VEHICLE_RETURNED:
                createNotificationDto.title = `[차량 반납] 차량이 반납되었습니다.`;
                createNotificationDto.body = `${createNotificationDatatDto.resourceName}`;
                break;
            case NotificationType.RESOURCE_MAINTENANCE_COMPLETED:
                createNotificationDto.title = `[정비 완료] ${createNotificationDatatDto.consumableName}`;
                createNotificationDto.body = `${createNotificationDatatDto.resourceName}`;
                break;
        }

        return createNotificationDto;
    }
}
