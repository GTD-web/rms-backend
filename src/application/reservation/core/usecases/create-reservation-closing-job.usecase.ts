import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { Reservation } from '@libs/entities';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { DateUtil } from '@libs/utils/date.util';
import { DeleteReservationClosingJobUsecase } from './delete-reservation-closing-job.usecase';

@Injectable()
export class CreateReservationClosingJobUsecase {
    constructor(
        private readonly schedulerRegistry: SchedulerRegistry,
        private readonly reservationService: DomainReservationService,
        private readonly deleteReservationClosingJob: DeleteReservationClosingJobUsecase,
    ) {}

    async execute(reservation: Reservation): Promise<void> {
        const jobName = `closing-${reservation.reservationId}`;
        console.log('createReservationClosingJob', jobName);
        const executeTime = DateUtil.date(reservation.endDate).toDate();

        // 과거 시간 체크
        if (executeTime.getTime() <= Date.now()) {
            console.log(`ExecuteTime time ${executeTime} is in the past, skipping cron job creation`);
            await this.reservationService.update(reservation.reservationId, { status: ReservationStatus.CLOSED });
            return;
        }

        // 기존 Job이 있다면 삭제
        this.deleteReservationClosingJob.execute(reservation.reservationId);

        const job = new CronJob(executeTime, async () => {
            await this.reservationService.update(reservation.reservationId, { status: ReservationStatus.CLOSED });
        });

        this.schedulerRegistry.addCronJob(jobName, job as any);
        job.start();
    }
}
