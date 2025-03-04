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
}

export class DateUtil {
  static now() {
    return new DateUtilWrapper(dayjs().tz());
  }

  static format(date: Date | string | number, format = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(date).tz().format(format);
  }

  static parse(dateString: string) {
    return new DateUtilWrapper(dayjs(dateString).tz());
  }

  static addDays(date: Date | string | number, days: number) {
    return dayjs(date).tz().add(days, 'day');
  }

  static addMinutes(date: Date | string | number, minutes: number) {
    return dayjs(date).tz().add(minutes, 'minute');
  }

  static toISOString(date: Date | string | number) {
    return dayjs(date).tz().toISOString();
  }

  static toMinutes(date: Date | string | number) {
    const d = dayjs(date).tz();
    return d.hour() * 60 + d.minute();
  }

  static fromMinutes(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return new DateUtilWrapper(dayjs().tz().hour(hours).minute(mins).second(0));
  }
} 