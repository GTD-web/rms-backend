import { Injectable, BadRequestException } from '@nestjs/common';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DateUtil } from '@libs/utils/date.util';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { ResourceQueryDto } from '@src/application/resource/core/dtos/resource-query.dto';
import { ResourceAvailabilityDto } from '@src/application/resource/core/dtos/available-time-response.dto';
import { TimeSlotDto } from '@src/application/resource/core/dtos/time-slot.dto';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { LessThan, MoreThanOrEqual, In, Not } from 'typeorm';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';

@Injectable()
export class FindAvailableTimeUsecase {
    constructor(
        private readonly resourceService: DomainResourceService,
        private readonly reservationService: DomainReservationService,
    ) {}

    async execute(query: ResourceQueryDto): Promise<ResourceAvailabilityDto[]> {
        const {
            resourceType,
            resourceGroupId,
            startDate,
            endDate,
            startTime,
            endTime,
            am,
            pm,
            timeUnit,
            reservationId,
        } = query;

        if (!startDate && !endDate) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESOURCE.DATE_REQUIRED);
        }

        if (startDate && endDate && startDate > endDate) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESOURCE.INVALID_DATE_RANGE);
        }

        const isTimeRange = startTime && endTime;
        const isTimeSelected = (am !== undefined || pm !== undefined) && timeUnit;

        if (isTimeRange && isTimeSelected) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESOURCE.TIME_RANGE_CONFLICT);
        }

        const resources = await this.resourceService.findAll({
            where: {
                isAvailable: true,
                resourceGroupId: resourceGroupId,
                type: resourceType,
            },
            relations: ['resourceGroup'],
        });

        const startDateObj = LessThan(
            endTime ? DateUtil.date(endDate + ' ' + endTime).toDate() : DateUtil.date(endDate + ' 23:59:59').toDate(),
        );
        const endDateObj = MoreThanOrEqual(
            startTime
                ? DateUtil.date(startDate + ' ' + startTime).toDate()
                : DateUtil.date(startDate + ' 00:00:00').toDate(),
        );

        for (const resource of resources) {
            const reservations = await this.reservationService.findAll({
                where: {
                    resourceId: resource.resourceId,
                    reservationId: reservationId ? Not(reservationId) : undefined,
                    status: In([ReservationStatus.PENDING, ReservationStatus.CONFIRMED, ReservationStatus.CLOSED]),
                    startDate: startDateObj,
                    endDate: endDateObj,
                },
            });
            resource.reservations = reservations;
        }

        const result: ResourceAvailabilityDto[] = [];

        if (!resources || (resources && resources.length === 0)) {
            return result;
        }

        const isSameDay = startDate === endDate;
        const isAccommodation = resourceType === ResourceType.ACCOMMODATION;

        if (!isAccommodation && isSameDay && timeUnit) {
            for (const resource of resources) {
                const availabilityDto = new ResourceAvailabilityDto();
                availabilityDto.resourceId = resource.resourceId;
                availabilityDto.resourceName = resource.name;

                availabilityDto.availableTimeSlots = this.calculateAvailableTimeSlots(
                    resource,
                    startDate,
                    endDate,
                    am,
                    pm,
                    timeUnit,
                    isSameDay,
                );

                result.push(availabilityDto);
            }
        } else if (isAccommodation || !isSameDay) {
            const combinedStartDateTime = startTime ? `${startDate} ${startTime}` : `${startDate} 00:00:00`;
            const combinedEndDateTime = endTime ? `${endDate} ${endTime}` : `${endDate} 24:00:00`;

            const startDateObj = DateUtil.date(combinedStartDateTime);
            const endDateObj = DateUtil.date(combinedEndDateTime);

            for (const resource of resources) {
                const confirmedReservations = resource.reservations.filter(
                    (reservation) =>
                        reservation.status === ReservationStatus.CONFIRMED ||
                        reservation.status === ReservationStatus.PENDING,
                );

                const hasConflict = confirmedReservations.some((reservation) => {
                    const reserveStart = DateUtil.date(reservation.startDate);
                    const reserveEnd = DateUtil.date(reservation.endDate);

                    return (
                        (this.isSameOrAfter(startDateObj, reserveStart) && this.isBefore(startDateObj, reserveEnd)) ||
                        (this.isAfter(endDateObj, reserveStart) && this.isSameOrBefore(endDateObj, reserveEnd)) ||
                        (this.isBefore(startDateObj, reserveStart) && this.isAfter(endDateObj, reserveEnd))
                    );
                });

                if (!hasConflict) {
                    const availabilityDto = new ResourceAvailabilityDto();
                    availabilityDto.resourceId = resource.resourceId;
                    availabilityDto.resourceName = resource.name;

                    if (resource.location) {
                        const location = resource.location as { address: string; detailAddress?: string };
                        availabilityDto.resourceLocation =
                            location.address + (location.detailAddress ? ` ${location.detailAddress}` : '');
                    }

                    result.push(availabilityDto);
                }
            }
        } else {
            throw new BadRequestException('시간 조회 조건이 올바르지 않습니다.');
        }

        return result;
    }

    private calculateAvailableTimeSlots(
        resource: any,
        startDate: string,
        endDate: string,
        am: boolean,
        pm: boolean,
        timeUnit: number,
        isSameDay: boolean,
    ): TimeSlotDto[] {
        const availableSlots: TimeSlotDto[] = [];
        const existingReservations = resource.reservations || [];
        const confirmedReservations = existingReservations;

        if (isSameDay) {
            const now = DateUtil.now();
            const dateStr = startDate;
            const currentMinute = now.toDate().getMinutes();
            const roundedHour = now.format(
                `${now.format('HH') < '09' ? '09' : now.format('HH')}:${currentMinute < 30 ? '00' : '30'}:00`,
            );
            const isToday = startDate === now.format('YYYY-MM-DD');
            const isAllDay = (am && pm) || (!am && !pm);
            const isVehicle = resource.type === ResourceType.VEHICLE;

            let startTime: string;
            let endTime: string;

            if (isVehicle) {
                if (isToday) {
                    startTime = roundedHour;
                    endTime = '24:00:00';
                } else {
                    if (isAllDay) {
                        startTime = '00:00:00';
                        endTime = '24:00:00';
                    } else {
                        startTime = am ? '00:00:00' : '12:00:00';
                        endTime = am ? '12:00:00' : '24:00:00';
                    }
                }
            } else {
                if (isToday) {
                    startTime = roundedHour;
                    endTime = '18:00:00';
                } else {
                    if (isAllDay) {
                        startTime = '09:00:00';
                        endTime = '18:00:00';
                    } else {
                        startTime = am ? '09:00:00' : '12:00:00';
                        endTime = am ? '12:00:00' : '18:00:00';
                    }
                }
            }

            this.processTimeRange(dateStr, startTime, endTime, timeUnit, confirmedReservations, availableSlots);
        } else {
            let currentDate = DateUtil.date(startDate);
            const endDateObj = DateUtil.date(endDate);

            while (this.isSameOrBefore(currentDate, endDateObj)) {
                const dateStr = currentDate.format('YYYY-MM-DD');
                this.processTimeRange(dateStr, '00:00:00', '23:59:59', timeUnit, confirmedReservations, availableSlots);
                currentDate = currentDate.addDays(1);
            }
        }

        return availableSlots;
    }

    private processTimeRange(
        dateStr: string,
        startTime: string,
        endTime: string,
        timeUnit: number,
        confirmedReservations: any[],
        availableSlots: TimeSlotDto[],
    ): void {
        const startTime_obj = DateUtil.date(`${dateStr} ${startTime}`);
        const endTime_obj = DateUtil.date(`${dateStr} ${endTime}`);
        const slotIntervalMinutes = 30;

        let slotStart = startTime_obj;

        while (this.isBefore(slotStart, endTime_obj)) {
            const slotEnd = slotStart.addMinutes(timeUnit);

            if (this.isAfter(slotEnd, endTime_obj)) {
                slotStart = slotStart.addMinutes(slotIntervalMinutes);
                continue;
            }

            const isAvailable = !confirmedReservations.some((reservation) => {
                const reservationStart = DateUtil.date(reservation.startDate);
                const reservationEnd = DateUtil.date(reservation.endDate);
                return (
                    (this.isSameOrAfter(slotStart, reservationStart) && this.isBefore(slotStart, reservationEnd)) ||
                    (this.isAfter(slotEnd, reservationStart) && this.isSameOrBefore(slotEnd, reservationEnd)) ||
                    (this.isBefore(slotStart, reservationStart) && this.isAfter(slotEnd, reservationEnd))
                );
            });

            if (isAvailable) {
                availableSlots.push({
                    startTime: slotStart.format(),
                    endTime: slotEnd.format(),
                });
            }

            slotStart = slotStart.addMinutes(slotIntervalMinutes);
        }
    }

    private isSameOrBefore(d1: any, d2: any): boolean {
        return d1.toDate().getTime() <= d2.toDate().getTime();
    }

    private isBefore(d1: any, d2: any): boolean {
        return d1.toDate().getTime() < d2.toDate().getTime();
    }

    private isAfter(d1: any, d2: any): boolean {
        return d1.toDate().getTime() > d2.toDate().getTime();
    }

    private isSameOrAfter(d1: any, d2: any): boolean {
        return d1.toDate().getTime() >= d2.toDate().getTime();
    }
}
