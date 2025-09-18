import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetDeletedAtForCancelledSchedules1756193100000 implements MigrationInterface {
    name = 'SetDeletedAtForCancelledSchedules1756193100000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('🔄 취소된 일정에 deletedAt 설정 시작...');

        // 취소된 일정에 deletedAt 설정 (시작날짜 1일 전으로)
        await queryRunner.query(`
            UPDATE "schedules" 
            SET "deletedAt" = ("startDate" - INTERVAL '1 day')
            WHERE "status" = 'CANCELLED' 
            AND "deletedAt" IS NULL
        `);

        // 취소된 일정에 완료 사유 설정
        await queryRunner.query(`
            UPDATE "schedules" 
            SET "completionReason" = '일정 취소'
            WHERE "status" = 'CANCELLED' 
            AND "completionReason" IS NULL
        `);

        // 마이그레이션 결과 확인 및 로깅
        const result = await queryRunner.query(`
            SELECT COUNT(*) as count 
            FROM "schedules" 
            WHERE "status" = 'CANCELLED' 
            AND "deletedAt" IS NOT NULL 
            AND "completionReason" IS NOT NULL
        `);

        console.log('✅ 취소된 일정 deletedAt 및 완료 사유 설정 완료!');
        console.log(`🗑️ 처리된 취소 일정: ${result[0]?.count || 0}개`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        console.log('🔄 취소된 일정 deletedAt 및 완료 사유 초기화 시작...');

        // 취소된 일정의 deletedAt과 완료 사유 초기화
        await queryRunner.query(`
            UPDATE "schedules" 
            SET "deletedAt" = NULL,
                "completionReason" = NULL
            WHERE "status" = 'CANCELLED'
            AND ("deletedAt" IS NOT NULL OR "completionReason" IS NOT NULL)
        `);

        console.log('✅ 취소된 일정 deletedAt 및 완료 사유 초기화 완료!');
    }
}
