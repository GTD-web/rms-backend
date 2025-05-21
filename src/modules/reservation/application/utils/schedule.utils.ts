import { DateUtil } from '@libs/utils/date.util';

interface TimeRange {
    startDateTime: string; // 분 단위 (0-1439)
    endDateTime: string; // 분 단위 (0-1439)
}

interface Schedule {
    year: string;
    month: string;
    day: string;
    startDateTime: string;
    endDateTime: string;
}

export class ScheduleUtils {
    static readonly BUSINESS_HOUR_START = 9 * 60; // 09:00
    static readonly BUSINESS_HOUR_END = 18 * 60; // 18:00

    static createScheduleDates(startDate: string, endDate: string): Schedule[] {
        const start = DateUtil.parse(startDate);
        const end = DateUtil.parse(endDate);
        const schedules: Schedule[] = [];

        // 다른 날짜인 경우 기존 로직대로 처리
        let currentDate = start;
        const endDateString = end.format('YYYY-MM-DD');

        while (currentDate.format('YYYY-MM-DD') <= endDateString) {
            const timeRange = this.getTimeRange(currentDate.format('YYYY-MM-DD'), startDate, endDate);

            schedules.push({
                year: currentDate.format('YYYY'),
                month: currentDate.format('MM'),
                day: currentDate.format('DD'),
                startDateTime: timeRange.startDateTime,
                endDateTime: timeRange.endDateTime,
            });

            currentDate = currentDate.addDays(1);
        }

        return schedules;
    }

    private static getTimeRange(currentDateStr: string, startDateStr: string, endDateStr: string): TimeRange {
        const currentDate = DateUtil.parse(currentDateStr);
        const startDate = DateUtil.parse(startDateStr);
        const endDate = DateUtil.parse(endDateStr);

        const isStartDay = currentDate.format('YYYY-MM-DD') === startDate.format('YYYY-MM-DD');
        const isEndDay = currentDate.format('YYYY-MM-DD') === endDate.format('YYYY-MM-DD');

        let startMinutes = this.BUSINESS_HOUR_START;
        let endMinutes = this.BUSINESS_HOUR_END;

        if (isStartDay) {
            startMinutes = DateUtil.toMinutes(startDateStr);
        }

        if (isEndDay) {
            endMinutes = DateUtil.toMinutes(endDateStr);
        }

        return {
            startDateTime: startMinutes.toString(),
            endDateTime: endMinutes.toString(),
        };
    }
}
