import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddForeignKeysToScheduleRelations1756193000000 implements MigrationInterface {
    name = 'AddForeignKeysToScheduleRelations1756193000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // ScheduleRelation과 Schedule 간의 외래키 제약조건 추가
        await queryRunner.query(`
            ALTER TABLE "schedule_relations" 
            ADD CONSTRAINT "FK_schedule_relations_scheduleId" 
            FOREIGN KEY ("scheduleId") 
            REFERENCES "schedules"("scheduleId") 
            ON DELETE CASCADE 
            ON UPDATE NO ACTION
        `);

        // ScheduleRelation과 Reservation 간의 외래키 제약조건 추가
        await queryRunner.query(`
            ALTER TABLE "schedule_relations" 
            ADD CONSTRAINT "FK_schedule_relations_reservationId" 
            FOREIGN KEY ("reservationId") 
            REFERENCES "reservations"("reservationId") 
            ON DELETE SET NULL 
            ON UPDATE NO ACTION
        `);

        // scheduleId에 인덱스 추가 (성능 최적화) - 이미 존재
        // await queryRunner.query(`
        //     CREATE INDEX "IDX_schedule_relations_scheduleId"
        //     ON "schedule_relations" ("scheduleId")
        // `);

        // reservationId에 인덱스 추가 (성능 최적화)
        await queryRunner.query(`
            CREATE INDEX "IDX_schedule_relations_reservationId" 
            ON "schedule_relations" ("reservationId")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 인덱스 제거
        await queryRunner.query(`DROP INDEX "IDX_schedule_relations_reservationId"`);
        await queryRunner.query(`DROP INDEX "IDX_schedule_relations_scheduleId"`);

        // 외래키 제약조건 제거
        await queryRunner.query(
            `ALTER TABLE "schedule_relations" DROP CONSTRAINT "FK_schedule_relations_reservationId"`,
        );
        await queryRunner.query(`ALTER TABLE "schedule_relations" DROP CONSTRAINT "FK_schedule_relations_scheduleId"`);
    }
}
