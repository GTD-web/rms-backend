import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRemarksToReservationVehicle1756193200000 implements MigrationInterface {
    name = 'AddRemarksToReservationVehicle1756193200000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // reservation_vehicles 테이블에 remarks 컬럼 추가
        await queryRunner.query(`
            ALTER TABLE "reservation_vehicles" 
            ADD COLUMN "remarks" varchar
        `);

        // 컬럼에 코멘트 추가
        await queryRunner.query(`
            COMMENT ON COLUMN "reservation_vehicles"."remarks" IS '비고'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // reservation_vehicles 테이블의 remarks 컬럼 삭제
        await queryRunner.query(`
            ALTER TABLE "reservation_vehicles" 
            DROP COLUMN "remarks"
        `);
    }
}
