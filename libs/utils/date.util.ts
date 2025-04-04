import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

// 플러그인 등록
dayjs.extend(utc);
dayjs.extend(timezone);

// 기본 타임존 설정
dayjs.tz.setDefault('Asia/Seoul');

class DateUtilWrapper {
    constructor(private date: dayjs.Dayjs) {}

    toDate() {
        return this.date.toDate();
    }

    format(format = 'YYYY-MM-DD HH:mm:ss') {
        return this.date.format(format);
    }

    addDays(days: number) {
        return new DateUtilWrapper(this.date.add(days, 'day'));
    }

    addMinutes(minutes: number) {
        return new DateUtilWrapper(this.date.add(minutes, 'minute'));
    }

    toISOString() {
        return this.date.toISOString();
    }

    toMinutes() {
        return this.date.hour() * 60 + this.date.minute();
    }

    hour(hours: number) {
        return new DateUtilWrapper(this.date.hour(hours));
    }

    minute(minutes: number) {
        return new DateUtilWrapper(this.date.minute(minutes));
    }

    second(seconds: number) {
        return new DateUtilWrapper(this.date.second(seconds));
    }
}

export class DateUtil {
    static now() {
        return new DateUtilWrapper(dayjs().tz('Asia/Seoul'));
    }

    static date(date: Date | string | number) {
        return new DateUtilWrapper(dayjs.tz(date, 'Asia/Seoul'));
    }

    static format(date: Date | string | number, format = 'YYYY-MM-DD HH:mm:ss') {
        return this.date(date).format(format);
    }

    static parse(dateString: string) {
        return this.date(dateString);
    }

    static addDays(date: Date | string | number, days: number) {
        return this.date(date).addDays(days);
    }

    static addMinutes(date: Date | string | number, minutes: number) {
        return this.date(date).addMinutes(minutes);
    }

    static toISOString(date: Date | string | number) {
        return this.date(date).toISOString();
    }

    static toMinutes(date: Date | string | number) {
        const d = this.date(date);
        return d.toMinutes();
    }

    static fromMinutes(minutes: number) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return this.now().hour(hours).minute(mins).second(0);
    }
}
