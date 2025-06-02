import { NotificationDataDto } from '../dtos/response-notification.dto';
import { Injectable } from '@nestjs/common';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
import { ResponseNotificationDto } from '../dtos/response-notification.dto';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
import { Notification } from '@libs/entities';
import { DomainNotificationService } from '@src/domain/notification/notification.service';

@Injectable()
export class GetMyNotificationUsecase {
    constructor(private readonly notificationService: DomainNotificationService) {}

    async execute(employeeId: string, query?: PaginationQueryDto): Promise<PaginationData<ResponseNotificationDto>> {
        const options: IRepositoryOptions<Notification> = {
            where: {
                employees: { employeeId },
                isSent: true,
            },
        };
        const total = await this.notificationService.count({
            where: options.where,
        });

        if (query) {
            options.skip = query.getOffset();
            options.take = query.limit;
        }
        const notifications = await this.notificationService.findAll({
            ...options,
            relations: ['employees'],
            order: {
                createdAt: 'DESC',
            },
        });

        return {
            items: notifications.map((notification) => {
                return {
                    notificationId: notification.notificationId,
                    title: notification.title,
                    body: notification.body,
                    notificationData: notification.notificationData as NotificationDataDto,
                    notificationType: notification.notificationType,
                    createdAt: notification.createdAt,
                    isRead: notification.employees.find((employee) => employee.employeeId === employeeId).isRead,
                };
            }),
            meta: {
                total,
                page: query.page,
                limit: query.limit,
                hasNext: query.page * query.limit < total,
            },
        };
    }
}
