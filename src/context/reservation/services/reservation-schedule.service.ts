// import { Injectable } from '@nestjs/common';
// import { DomainReservationService } from '@src/domain/reservation/reservation.service';
// import { ReservationResponseDto } from '../dtos/reservation-response.dto';

// /**
//  * 예약 일정 관리 서비스
//  *
//  * 예약 일정의 조회 및 관리를 담당하는 서비스입니다:
//  * - 일정별 예약 조회
//  * - 캘린더 형태의 예약 정보 제공
//  * - 예약 통계 정보 제공
//  */
// @Injectable()
// export class ReservationScheduleService {
//     constructor(private readonly domainReservationService: DomainReservationService) {}

//     /**
//      * 특정 날짜의 예약 목록 조회
//      */
//     async getDayReservations(date: Date, resourceId?: number): Promise<ReservationResponseDto[]> {
//         try {
//             const dayStart = new Date(date);
//             dayStart.setHours(0, 0, 0, 0);

//             const dayEnd = new Date(date);
//             dayEnd.setHours(23, 59, 59, 999);

//             const whereCondition: any = {};

//             if (resourceId) {
//                 whereCondition.resourceId = resourceId.toString();
//             }

//             const reservations = await this.domainReservationService.findAll({
//                 where: whereCondition,
//                 orderBy: { startDate: 'ASC' },
//             });

//             // 해당 날짜와 겹치는 예약들만 필터링
//             const dayReservations = reservations.filter((reservation) => {
//                 const reservationStart = new Date(reservation.startDate);
//                 const reservationEnd = new Date(reservation.endDate);

//                 // 시간 겹침 확인
//                 return !(dayEnd <= reservationStart || dayStart >= reservationEnd);
//             });

//             return dayReservations.map((reservation) => new ReservationResponseDto(reservation));
//         } catch (error) {
//             console.error('일별 예약 조회 중 오류:', error);
//             return [];
//         }
//     }

//     /**
//      * 주간 예약 현황 조회
//      */
//     async getWeekReservations(
//         startDate: Date,
//         resourceId?: number,
//     ): Promise<{
//         [key: string]: ReservationResponseDto[];
//     }> {
//         try {
//             const weekSchedule: { [key: string]: ReservationResponseDto[] } = {};

//             // 주간 7일 동안의 예약 조회
//             for (let i = 0; i < 7; i++) {
//                 const currentDate = new Date(startDate);
//                 currentDate.setDate(startDate.getDate() + i);

//                 const dateKey = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD 형식
//                 weekSchedule[dateKey] = await this.getDayReservations(currentDate, resourceId);
//             }

//             return weekSchedule;
//         } catch (error) {
//             console.error('주간 예약 조회 중 오류:', error);
//             return {};
//         }
//     }

//     /**
//      * 월간 예약 현황 조회
//      */
//     async getMonthReservations(
//         year: number,
//         month: number,
//         resourceId?: number,
//     ): Promise<{
//         [key: string]: ReservationResponseDto[];
//     }> {
//         try {
//             const monthSchedule: { [key: string]: ReservationResponseDto[] } = {};

//             const monthStart = new Date(year, month - 1, 1); // month는 0부터 시작
//             const monthEnd = new Date(year, month, 0); // 해당 월의 마지막 날

//             // 월 전체 기간의 예약 조회
//             const whereCondition: any = {};

//             if (resourceId) {
//                 whereCondition.resourceId = resourceId.toString();
//             }

//             const reservations = await this.domainReservationService.findAll({
//                 where: whereCondition,
//                 orderBy: { startDate: 'ASC' },
//             });

//             // 해당 월에 속하는 예약들만 필터링 및 날짜별 그룹화
//             for (const reservation of reservations) {
//                 const reservationStart = new Date(reservation.startDate);
//                 const reservationEnd = new Date(reservation.endDate);

//                 // 해당 월과 겹치는지 확인
//                 if (reservationStart <= monthEnd && reservationEnd >= monthStart) {
//                     // 예약이 겹치는 모든 날짜에 추가
//                     const currentDate = new Date(Math.max(reservationStart.getTime(), monthStart.getTime()));
//                     const endDate = new Date(Math.min(reservationEnd.getTime(), monthEnd.getTime()));

//                     while (currentDate <= endDate) {
//                         const dateKey = currentDate.toISOString().split('T')[0];

//                         if (!monthSchedule[dateKey]) {
//                             monthSchedule[dateKey] = [];
//                         }

//                         monthSchedule[dateKey].push(new ReservationResponseDto(reservation));
//                         currentDate.setDate(currentDate.getDate() + 1);
//                     }
//                 }
//             }

//             return monthSchedule;
//         } catch (error) {
//             console.error('월간 예약 조회 중 오류:', error);
//             return {};
//         }
//     }

//     /**
//      * 특정 사용자의 예약 일정 조회
//      */
//     async getUserSchedule(employeeId: number, startDate: Date, endDate: Date): Promise<ReservationResponseDto[]> {
//         try {
//             const reservations = await this.domainReservationService.findAll({
//                 where: {
//                     requesterId: employeeId,
//                 },
//                 orderBy: { startDate: 'ASC' },
//             });

//             // 날짜 범위에 해당하는 예약들만 필터링
//             const scheduleReservations = reservations.filter((reservation) => {
//                 const reservationStart = new Date(reservation.startDate);
//                 const reservationEnd = new Date(reservation.endDate);

//                 return !(endDate <= reservationStart || startDate >= reservationEnd);
//             });

//             return scheduleReservations.map((reservation) => new ReservationResponseDto(reservation));
//         } catch (error) {
//             console.error('사용자 일정 조회 중 오류:', error);
//             return [];
//         }
//     }

//     /**
//      * 예약 통계 정보 조회
//      */
//     async getReservationStats(
//         startDate: Date,
//         endDate: Date,
//         resourceId?: number,
//     ): Promise<{
//         totalReservations: number;
//         confirmedReservations: number;
//         pendingReservations: number;
//         cancelledReservations: number;
//         utilizationRate: number;
//     }> {
//         try {
//             const whereCondition: any = {};

//             if (resourceId) {
//                 whereCondition.resourceId = resourceId.toString();
//             }

//             const reservations = await this.domainReservationService.findAll({
//                 where: whereCondition,
//             });

//             // 기간 내 예약들 필터링
//             const periodReservations = reservations.filter((reservation) => {
//                 const reservationStart = new Date(reservation.startDate);
//                 const reservationEnd = new Date(reservation.endDate);

//                 return !(endDate <= reservationStart || startDate >= reservationEnd);
//             });

//             const totalReservations = periodReservations.length;
//             const confirmedReservations = periodReservations.filter((r) => r.status === 'CONFIRMED').length;
//             const pendingReservations = periodReservations.filter((r) => r.status === 'PENDING').length;
//             const cancelledReservations = periodReservations.filter((r) => r.status === 'CANCELLED').length;

//             // 이용률 계산 (확정된 예약 시간 / 전체 가능 시간)
//             const totalPossibleHours = this.calculateTotalPossibleHours(startDate, endDate);
//             const totalReservedHours = this.calculateTotalReservedHours(
//                 periodReservations.filter((r) => r.status === 'CONFIRMED'),
//             );

//             const utilizationRate = totalPossibleHours > 0 ? (totalReservedHours / totalPossibleHours) * 100 : 0;

//             return {
//                 totalReservations,
//                 confirmedReservations,
//                 pendingReservations,
//                 cancelledReservations,
//                 utilizationRate: Math.round(utilizationRate * 100) / 100, // 소수점 2자리
//             };
//         } catch (error) {
//             console.error('예약 통계 조회 중 오류:', error);
//             return {
//                 totalReservations: 0,
//                 confirmedReservations: 0,
//                 pendingReservations: 0,
//                 cancelledReservations: 0,
//                 utilizationRate: 0,
//             };
//         }
//     }

//     /**
//      * 예약 가능한 시간대 조회
//      */
//     async getAvailableSlots(
//         resourceId: number,
//         date: Date,
//         slotDuration: number = 60, // 기본 1시간 단위
//     ): Promise<{ start: Date; end: Date }[]> {
//         try {
//             const dayReservations = await this.getDayReservations(date, resourceId);

//             const dayStart = new Date(date);
//             dayStart.setHours(9, 0, 0, 0); // 업무시간 9시 시작

//             const dayEnd = new Date(date);
//             dayEnd.setHours(18, 0, 0, 0); // 업무시간 18시 종료

//             const availableSlots: { start: Date; end: Date }[] = [];
//             let currentTime = new Date(dayStart);

//             // 예약들을 시간순으로 정렬
//             const sortedReservations = dayReservations
//                 .filter((r) => r.status === 'CONFIRMED' || r.status === 'PENDING')
//                 .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

//             for (const reservation of sortedReservations) {
//                 const reservationStart = new Date(reservation.startDate);

//                 // 현재 시간과 다음 예약 사이에 여유가 있으면 슬롯 추가
//                 if (currentTime < reservationStart) {
//                     const slotEnd = new Date(Math.min(reservationStart.getTime(), dayEnd.getTime()));

//                     if (slotEnd.getTime() - currentTime.getTime() >= slotDuration * 60 * 1000) {
//                         availableSlots.push({
//                             start: new Date(currentTime),
//                             end: slotEnd,
//                         });
//                     }
//                 }

//                 // 현재 시간을 예약 종료 시간으로 업데이트
//                 const reservationEnd = new Date(reservation.endDate);
//                 currentTime = reservationEnd > currentTime ? reservationEnd : currentTime;
//             }

//             // 마지막 예약 이후부터 업무시간 끝까지
//             if (currentTime < dayEnd) {
//                 const remainingTime = dayEnd.getTime() - currentTime.getTime();
//                 if (remainingTime >= slotDuration * 60 * 1000) {
//                     availableSlots.push({
//                         start: new Date(currentTime),
//                         end: dayEnd,
//                     });
//                 }
//             }

//             return availableSlots;
//         } catch (error) {
//             console.error('가능한 시간대 조회 중 오류:', error);
//             return [];
//         }
//     }

//     /**
//      * 전체 가능 시간 계산 (업무시간 기준)
//      */
//     private calculateTotalPossibleHours(startDate: Date, endDate: Date): number {
//         const workingHoursPerDay = 9; // 9시-18시 = 9시간
//         const msPerDay = 24 * 60 * 60 * 1000;
//         const days = Math.ceil((endDate.getTime() - startDate.getTime()) / msPerDay);

//         // 주말 제외 계산 (간단한 구현)
//         let workingDays = 0;
//         const currentDate = new Date(startDate);

//         while (currentDate <= endDate) {
//             const dayOfWeek = currentDate.getDay();
//             if (dayOfWeek !== 0 && dayOfWeek !== 6) {
//                 // 일요일(0), 토요일(6) 제외
//                 workingDays++;
//             }
//             currentDate.setDate(currentDate.getDate() + 1);
//         }

//         return workingDays * workingHoursPerDay;
//     }

//     /**
//      * 총 예약 시간 계산
//      */
//     private calculateTotalReservedHours(reservations: any[]): number {
//         let totalHours = 0;

//         for (const reservation of reservations) {
//             const start = new Date(reservation.startDate);
//             const end = new Date(reservation.endDate);
//             const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
//             totalHours += hours;
//         }

//         return totalHours;
//     }
// }
