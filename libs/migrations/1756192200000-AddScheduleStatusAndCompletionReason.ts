import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddScheduleStatusAndCompletionReason1756192200000 implements MigrationInterface {
    name = 'AddScheduleStatusAndCompletionReason1756192200000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. ScheduleStatus ENUM 타입 생성
        await queryRunner.query(`
            CREATE TYPE "schedules_status_enum" AS ENUM(
                'PENDING',
                'PROCESSING', 
                'COMPLETED',
                'CANCELLED'
            )
        `);

        // 2. status 컬럼 추가 (기본값: PENDING)
        await queryRunner.query(`
            ALTER TABLE "schedules" 
            ADD COLUMN "status" "schedules_status_enum" 
            NOT NULL DEFAULT 'PENDING'
        `);

        // 3. completionReason 컬럼 추가 (nullable)
        await queryRunner.query(`
            ALTER TABLE "schedules" 
            ADD COLUMN "completionReason" character varying
        `);

        // 4. 컬럼 코멘트 추가
        await queryRunner.query(`
            COMMENT ON COLUMN "schedules"."status" IS '일정 상태 (대기/진행중/완료/취소)'
        `);

        await queryRunner.query(`
            COMMENT ON COLUMN "schedules"."completionReason" IS '완료 사유'
        `);

        // 5. 기존 데이터의 상태를 적절히 설정
        // 예약이 취소된 경우 일정도 취소, 그 외는 시간 기준으로 설정
        await queryRunner.query(`
            UPDATE "schedules" 
            SET "status" = CASE 
                -- 예약이 취소된 경우 일정도 취소
                WHEN EXISTS (
                    SELECT 1 FROM "schedule_relations" sr
                    JOIN "reservations" r ON sr."reservationId" = r."reservationId"
                    WHERE sr."scheduleId" = "schedules"."scheduleId" 
                    AND r."status" = 'CANCELLED'
                ) THEN 'CANCELLED'::schedules_status_enum
                -- 그 외는 시간 기준으로 상태 설정
                WHEN "endDate" < NOW() THEN 'COMPLETED'::schedules_status_enum
                WHEN "startDate" <= NOW() AND "endDate" >= NOW() THEN 'PROCESSING'::schedules_status_enum
                ELSE 'PENDING'::schedules_status_enum
            END
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 1. completionReason 컬럼 제거
        await queryRunner.query(`
            ALTER TABLE "schedules" 
            DROP COLUMN "completionReason"
        `);

        // 2. status 컬럼 제거
        await queryRunner.query(`
            ALTER TABLE "schedules" 
            DROP COLUMN "status"
        `);

        // 3. ScheduleStatus ENUM 타입 제거
        await queryRunner.query(`
            DROP TYPE "schedules_status_enum"
        `);
    }
}
