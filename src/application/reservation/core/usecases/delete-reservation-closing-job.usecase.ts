import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class DeleteReservationClosingJobUsecase {
    constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

    execute(reservationId: string): void {
        const jobName = `closing-${reservationId}`;
        try {
            if (this.schedulerRegistry.doesExist('cron', jobName)) {
                this.schedulerRegistry.deleteCronJob(jobName);
                console.log(`Job ${jobName} deleted successfully`);
            }
        } catch (error) {
            console.log(`Failed to delete job ${jobName}: ${error.message}`);
        }
    }
}
