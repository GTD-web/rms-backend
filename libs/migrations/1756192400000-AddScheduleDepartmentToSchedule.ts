import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddScheduleDepartmentToSchedule1756192400000 implements MigrationInterface {
    name = 'AddScheduleDepartmentToSchedule1756192400000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // scheduleDepartment 컬럼 추가 (nullable varchar)
        await queryRunner.query(`
            ALTER TABLE "schedules" 
            ADD COLUMN "scheduleDepartment" character varying
        `);

        // 컬럼 코멘트 추가
        await queryRunner.query(`
            COMMENT ON COLUMN "schedules"."scheduleDepartment" IS '일정 담당 부서'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // scheduleDepartment 컬럼 제거
        await queryRunner.query(`
            ALTER TABLE "schedules" 
            DROP COLUMN "scheduleDepartment"
        `);
    }
}
