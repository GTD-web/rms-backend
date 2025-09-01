import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeletedAtToSchedule1756192300000 implements MigrationInterface {
    name = 'AddDeletedAtToSchedule1756192300000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // deletedAt 컬럼 추가 (nullable timestamp with time zone)
        await queryRunner.query(`
            ALTER TABLE "schedules" 
            ADD COLUMN "deletedAt" timestamp with time zone
        `);

        // 컬럼 코멘트 추가
        await queryRunner.query(`
            COMMENT ON COLUMN "schedules"."deletedAt" IS '소프트 삭제 일시'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // deletedAt 컬럼 제거
        await queryRunner.query(`
            ALTER TABLE "schedules" 
            DROP COLUMN "deletedAt"
        `);
    }
}
