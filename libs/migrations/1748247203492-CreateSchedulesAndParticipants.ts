import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSchedulesAndParticipants1748247203492 implements MigrationInterface {
    name = 'CreateSchedulesAndParticipants1748247203492';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // uuid-ossp 확장 활성화 (uuid_generate_v4() 함수 사용을 위해)
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        // 기존 schedules 관련 테이블들 삭제 (사용하지 않는 테이블들)
        await queryRunner.query(`DROP TABLE IF EXISTS "schedules"`);

        // 기존 enum 타입들도 삭제
        await queryRunner.query(`
            DO $$
            BEGIN
                IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'schedule_participants_type_enum') THEN
                    DROP TYPE "public"."schedule_participants_type_enum";
                END IF;
            END
            $$;
        `);
        await queryRunner.query(`
            DO $$
            BEGIN
                IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'schedule_type_enum') THEN
                    DROP TYPE "public"."schedule_type_enum";
                END IF;
            END
            $$;
        `);

        // enum type for schedule_participants.type
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'schedule_participants_type_enum') THEN
                    CREATE TYPE "public"."schedule_participants_type_enum" AS ENUM ('RESERVER', 'PARTICIPANT', 'CC_RECEIPIENT');
                END IF;
            END
            $$;
        `);

        // enum type for schedule_relations.scheduleType
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'schedule_type_enum') THEN
                    CREATE TYPE "public"."schedule_type_enum" AS ENUM ('COMPANY', 'DEPARTMENT', 'PERSONAL');
                END IF;
            END
            $$;
        `);

        // schedules table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "schedules" (
                "scheduleId" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "description" text,
                "location" character varying,
                "startDate" TIMESTAMP WITH TIME ZONE NOT NULL,
                "endDate" TIMESTAMP WITH TIME ZONE NOT NULL,
                "notifyBeforeStart" boolean NOT NULL DEFAULT false,
                "notifyMinutesBeforeStart" jsonb,
                "scheduleType" "public"."schedule_type_enum" NOT NULL DEFAULT 'PERSONAL',
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_schedules" PRIMARY KEY ("scheduleId")
            );
        `);

        // schedule_participants table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "schedule_participants" (
                "participantId" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "scheduleId" uuid NOT NULL,
                "employeeId" uuid NOT NULL,
                "type" "public"."schedule_participants_type_enum" NOT NULL,
                CONSTRAINT "PK_schedule_participants" PRIMARY KEY ("participantId"),
                CONSTRAINT "FK_schedule_participants_schedules" FOREIGN KEY ("scheduleId") REFERENCES "schedules"("scheduleId") ON DELETE CASCADE
            );
        `);

        await queryRunner.query(
            `CREATE INDEX IF NOT EXISTS "IDX_schedule_participants_scheduleId" ON "schedule_participants" ("scheduleId");`,
        );
        await queryRunner.query(
            `CREATE INDEX IF NOT EXISTS "IDX_schedule_participants_employeeId" ON "schedule_participants" ("employeeId");`,
        );

        // schedule_relations table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "schedule_relations" (
                "scheduleRelationId" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "scheduleId" uuid NOT NULL,
                "reservationId" uuid,
                "projectId" uuid,
                CONSTRAINT "PK_schedule_relations" PRIMARY KEY ("scheduleRelationId"),
                CONSTRAINT "FK_schedule_relations_schedule" FOREIGN KEY ("scheduleId") REFERENCES "schedules"("scheduleId") ON DELETE CASCADE
            );
        `);
        await queryRunner.query(
            `CREATE INDEX IF NOT EXISTS "IDX_schedule_relations_scheduleId" ON "schedule_relations" ("scheduleId");`,
        );

        // backfill schedules from reservations (use reservationId as scheduleId for stable mapping)
        await queryRunner.query(`
            INSERT INTO "schedules" (
                "scheduleId", "title", "description", "startDate", "endDate",
                "notifyBeforeStart", "notifyMinutesBeforeStart", "scheduleType", "createdAt", "updatedAt"
            )
            SELECT r."reservationId", r."title", r."description", r."startDate", r."endDate",
                   r."notifyBeforeStart", r."notifyMinutesBeforeStart", 'PERSONAL', now(), now()
            FROM "reservations" r
            WHERE NOT EXISTS (
                SELECT 1 FROM "schedules" s WHERE s."scheduleId" = r."reservationId"
            );
        `);

        // backfill schedule_participants from reservation_participants
        await queryRunner.query(`
            INSERT INTO "schedule_participants" (
                "participantId", "scheduleId", "employeeId", "type"
            )
            SELECT uuid_generate_v4(), rp."reservationId", rp."employeeId",
                   (rp."type"::text)::"public"."schedule_participants_type_enum"
            FROM "reservation_participants" rp
            WHERE EXISTS (
                SELECT 1 FROM "schedules" s WHERE s."scheduleId" = rp."reservationId"
            );
        `);

        // backfill schedule_relations from reservations <-> schedules
        await queryRunner.query(`
            INSERT INTO "schedule_relations" (
                "scheduleRelationId", "scheduleId", "reservationId", "projectId"
            )
            SELECT uuid_generate_v4(), r."reservationId", r."reservationId", NULL
            FROM "reservations" r
            WHERE EXISTS (
                SELECT 1 FROM "schedules" s WHERE s."scheduleId" = r."reservationId"
            )
            AND NOT EXISTS (
                SELECT 1 FROM "schedule_relations" sr WHERE sr."reservationId" = r."reservationId"
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // remove backfilled relations
        await queryRunner.query(`
            DELETE FROM "schedule_relations" sr
            USING "reservations" r
            WHERE sr."reservationId" = r."reservationId";
        `);
        // remove backfilled participants
        await queryRunner.query(`
            DELETE FROM "schedule_participants" sp
            USING "reservations" r
            WHERE sp."scheduleId" = r."reservationId";
        `);

        // remove backfilled schedules
        await queryRunner.query(`
            DELETE FROM "schedules" s
            USING "reservations" r
            WHERE s."scheduleId" = r."reservationId";
        `);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_schedule_participants_employeeId"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_schedule_participants_scheduleId"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_schedule_relations_scheduleId"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "schedule_relations"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "schedule_participants"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "schedules"`);
        // drop enum types if exist
        await queryRunner.query(`
            DO $$
            BEGIN
                IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'schedule_participants_type_enum') THEN
                    DROP TYPE "public"."schedule_participants_type_enum";
                END IF;
            END
            $$;
        `);
        await queryRunner.query(`
            DO $$
            BEGIN
                IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'schedule_type_enum') THEN
                    DROP TYPE "public"."schedule_type_enum";
                END IF;
            END
            $$;
        `);
    }
}
