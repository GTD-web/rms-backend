import { MigrationInterface, QueryRunner } from 'typeorm';

export class TransformNotificationDataToNestedStructure1756191156147 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('🔄 NotificationData에 중첩된 구조 추가 (기존 구조 유지) 시작...');

        // 기존 flat 구조를 유지하면서 새로운 nested 구조를 추가
        await queryRunner.query(`
            UPDATE notifications 
            SET "notificationData" = 
                CASE 
                    WHEN "notificationData" IS NULL OR "notificationData" = '{}' THEN '{}'::jsonb
                    ELSE (
                        "notificationData" || jsonb_build_object(
                            'schedule', CASE 
                                WHEN ("notificationData"->>'scheduleId') IS NOT NULL OR 
                                     ("notificationData"->>'scheduleTitle') IS NOT NULL OR 
                                     ("notificationData"->>'beforeMinutes') IS NOT NULL OR
                                     ("notificationData"->>'startDate') IS NOT NULL OR
                                     ("notificationData"->>'endDate') IS NOT NULL OR
                                     ("notificationData"->>'reservationId') IS NOT NULL
                                THEN jsonb_build_object(
                                    'scheduleId', COALESCE(
                                        "notificationData"->>'scheduleId',
                                        (SELECT "scheduleId" FROM schedule_relations WHERE "reservationId"::text = "notificationData"->>'reservationId' LIMIT 1),
                                        ''
                                    ),
                                    'scheduleTitle', COALESCE("notificationData"->>'scheduleTitle', "notificationData"->>'reservationTitle', ''),
                                    'beforeMinutes', CASE 
                                        WHEN ("notificationData"->>'beforeMinutes') IS NOT NULL 
                                        THEN ("notificationData"->>'beforeMinutes')::int 
                                        ELSE NULL 
                                    END,
                                    'startDate', COALESCE("notificationData"->>'startDate', "notificationData"->>'reservationDate', NOW()::text),
                                    'endDate', COALESCE("notificationData"->>'endDate', "notificationData"->>'reservationDate', NOW()::text)
                                )
                                ELSE NULL
                            END,
                            'reservation', CASE 
                                WHEN ("notificationData"->>'reservationId') IS NOT NULL OR 
                                     ("notificationData"->>'reservationTitle') IS NOT NULL OR 
                                     ("notificationData"->>'reservationDate') IS NOT NULL
                                THEN jsonb_build_object(
                                    'reservationId', COALESCE("notificationData"->>'reservationId', ''),
                                    'reservationTitle', COALESCE("notificationData"->>'reservationTitle', ''),
                                    'reservationDate', COALESCE("notificationData"->>'reservationDate', ''),
                                    'status', COALESCE("notificationData"->>'status', 'PENDING')
                                )
                                ELSE NULL
                            END,
                            'resource', CASE 
                                WHEN ("notificationData"->>'resourceId') IS NOT NULL OR 
                                     ("notificationData"->>'resourceName') IS NOT NULL OR 
                                     ("notificationData"->>'resourceType') IS NOT NULL OR
                                     ("notificationData"->>'consumableName') IS NOT NULL
                                THEN jsonb_build_object(
                                    'resourceId', COALESCE("notificationData"->>'resourceId', ''),
                                    'resourceName', COALESCE("notificationData"->>'resourceName', ''),
                                    'resourceType', COALESCE("notificationData"->>'resourceType', 'MEETING_ROOM'),
                                    'vehicleInfo', CASE 
                                        WHEN ("notificationData"->>'consumableName') IS NOT NULL 
                                        THEN jsonb_build_object(
                                            'consumable', jsonb_build_object(
                                                'consumableName', "notificationData"->>'consumableName'
                                            )
                                        )
                                        ELSE NULL
                                    END
                                )
                                ELSE NULL
                            END,
                            'project', CASE 
                                WHEN ("notificationData"->>'projectId') IS NOT NULL OR 
                                     ("notificationData"->>'projectName') IS NOT NULL
                                THEN jsonb_build_object(
                                    'projectId', COALESCE("notificationData"->>'projectId', ''),
                                    'projectName', "notificationData"->>'projectName'
                                )
                                ELSE NULL
                            END
                        )
                    )
                END
            WHERE "notificationData" IS NOT NULL;
        `);

        // 변환된 레코드 수 확인
        const result = await queryRunner.query(`
            SELECT COUNT(*) as count FROM notifications WHERE "notificationData" IS NOT NULL;
        `);

        // schedule_relations에서 scheduleId를 찾아서 설정된 레코드 수 확인
        const scheduleIdUpdatedResult = await queryRunner.query(`
            SELECT COUNT(*) as count 
            FROM notifications 
            WHERE "notificationData"->>'reservationId' IS NOT NULL 
            AND "notificationData"->'schedule'->>'scheduleId' IS NOT NULL 
            AND "notificationData"->'schedule'->>'scheduleId' != '';
        `);

        console.log(`✅ NotificationData 중첩 구조 추가 완료! 변환된 레코드 수: ${result[0]?.count || 0}개`);
        console.log(
            `📊 schedule_relations에서 scheduleId를 찾아서 설정된 레코드 수: ${scheduleIdUpdatedResult[0]?.count || 0}개`,
        );
        console.log(
            '📋 새로운 구조: 기존 flat 필드 + { schedule: {...}, reservation: {...}, resource: {...}, project: {...} }',
        );
        console.log(
            '🔗 개선사항: reservationId가 있는 경우 schedule_relations 테이블에서 실제 scheduleId를 조회하여 설정합니다.',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        console.log('🔄 NotificationData에서 중첩된 구조만 제거 (기존 flat 구조 유지) 시작...');

        // 중첩된 구조(schedule, reservation, resource, project)만 제거하고 기존 flat 구조는 유지
        await queryRunner.query(`
            UPDATE notifications 
            SET "notificationData" = 
                CASE 
                    WHEN "notificationData" IS NULL OR "notificationData" = '{}' THEN '{}'::jsonb
                    ELSE (
                        "notificationData" - 'schedule' - 'reservation' - 'resource' - 'project'
                    )
                END
            WHERE "notificationData" IS NOT NULL;
        `);

        // 롤백된 레코드 수 확인
        const result = await queryRunner.query(`
            SELECT COUNT(*) as count FROM notifications WHERE "notificationData" IS NOT NULL;
        `);

        console.log(`✅ NotificationData 중첩 구조 제거 완료! 롤백된 레코드 수: ${result[0]?.count || 0}개`);
        console.log('📋 롤백된 구조: 기존 flat 필드만 유지 (nested 구조 제거됨)');
    }
}
