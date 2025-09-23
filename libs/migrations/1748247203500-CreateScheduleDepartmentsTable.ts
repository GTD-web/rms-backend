import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateScheduleDepartmentsTable1748247203500 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // schedule_departments 테이블 생성
        await queryRunner.query(`
            CREATE TABLE "schedule_departments" (
                "scheduleDepartmentId" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "scheduleId" uuid NOT NULL,
                "departmentId" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_schedule_departments" PRIMARY KEY ("scheduleDepartmentId")
            );
            COMMENT ON TABLE "schedule_departments" IS '일정-부서 중간 테이블';
            COMMENT ON COLUMN "schedule_departments"."scheduleDepartmentId" IS '일정-부서 관계 ID';
            COMMENT ON COLUMN "schedule_departments"."scheduleId" IS '일정 ID';
            COMMENT ON COLUMN "schedule_departments"."departmentId" IS '부서 ID';
            COMMENT ON COLUMN "schedule_departments"."createdAt" IS '생성일시';
        `);

        // 인덱스 생성
        await queryRunner.query(`
            CREATE INDEX "IDX_schedule_departments_scheduleId" ON "schedule_departments" ("scheduleId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_schedule_departments_departmentId" ON "schedule_departments" ("departmentId")
        `);

        // 유니크 제약조건 (하나의 일정에 같은 부서가 중복으로 배정되지 않도록)
        await queryRunner.query(`
            ALTER TABLE "schedule_departments" 
            ADD CONSTRAINT "UQ_schedule_departments_schedule_department" 
            UNIQUE ("scheduleId", "departmentId")
        `);

        // 외래키 제약조건
        await queryRunner.query(`
            ALTER TABLE "schedule_departments" 
            ADD CONSTRAINT "FK_schedule_departments_scheduleId" 
            FOREIGN KEY ("scheduleId") 
            REFERENCES "schedules"("scheduleId") 
            ON DELETE CASCADE 
            ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "schedule_departments" 
            ADD CONSTRAINT "FK_schedule_departments_departmentId" 
            FOREIGN KEY ("departmentId") 
            REFERENCES "departments"("id") 
            ON DELETE CASCADE 
            ON UPDATE NO ACTION
        `);

        // 기존 schedule_relations 테이블의 departmentId 데이터를 새 테이블로 마이그레이션
        await queryRunner.query(`
            INSERT INTO "schedule_departments" ("scheduleId", "departmentId", "createdAt")
            SELECT "scheduleId", "departmentId", now()
            FROM "schedule_relations"
            WHERE "departmentId" IS NOT NULL
        `);

        // schedule_relations 테이블에서 departmentId 컬럼 제거
        await queryRunner.query(`
            ALTER TABLE "schedule_relations" DROP COLUMN IF EXISTS "departmentId"
        `);

        // schedule_relations 테이블의 departmentId 인덱스 제거
        await queryRunner.query(`
            DROP INDEX IF EXISTS "IDX_schedule_relations_departmentId"
        `);

        // schedule_relations 테이블의 부서 관련 외래키 제거
        await queryRunner.query(`
            ALTER TABLE "schedule_relations" 
            DROP CONSTRAINT IF EXISTS "FK_schedule_relations_departmentId"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // schedule_relations 테이블에 departmentId 컬럼 다시 추가
        await queryRunner.query(`
            ALTER TABLE "schedule_relations" 
            ADD COLUMN "departmentId" uuid
        `);

        // 기존 schedule_departments 데이터를 schedule_relations로 백업 (첫 번째 부서만)
        await queryRunner.query(`
            UPDATE "schedule_relations" 
            SET "departmentId" = (
                SELECT "departmentId" 
                FROM "schedule_departments" 
                WHERE "schedule_departments"."scheduleId" = "schedule_relations"."scheduleId" 
                LIMIT 1
            )
            WHERE EXISTS (
                SELECT 1 
                FROM "schedule_departments" 
                WHERE "schedule_departments"."scheduleId" = "schedule_relations"."scheduleId"
            )
        `);

        // 외래키 제약조건 다시 추가
        await queryRunner.query(`
            ALTER TABLE "schedule_relations" 
            ADD CONSTRAINT "FK_schedule_relations_departmentId" 
            FOREIGN KEY ("departmentId") 
            REFERENCES "departments"("id") 
            ON DELETE SET NULL 
            ON UPDATE NO ACTION
        `);

        // 인덱스 다시 추가
        await queryRunner.query(`
            CREATE INDEX "IDX_schedule_relations_departmentId" ON "schedule_relations" ("departmentId")
        `);

        // schedule_departments 테이블 삭제
        await queryRunner.query(`DROP TABLE IF EXISTS "schedule_departments"`);
    }
}
