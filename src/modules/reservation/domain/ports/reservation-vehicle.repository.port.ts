import { ReservationVehicle } from '@libs/entities';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

export interface ReservationVehicleRepositoryPort {
    /**
     * ReservationVehicle 엔티티 저장
     */
    save(reservationVehicle: ReservationVehicle, repositoryOptions?: RepositoryOptions): Promise<ReservationVehicle>;

    /**
     * 조건에 맞는 단일 ReservationVehicle 엔티티 조회
     */
    findOne(repositoryOptions?: RepositoryOptions): Promise<ReservationVehicle | null>;

    /**
     * 조건에 맞는 모든 ReservationVehicle 엔티티 조회
     */
    findAll(repositoryOptions?: RepositoryOptions): Promise<ReservationVehicle[]>;

    /**
     * ReservationVehicle 엔티티 업데이트
     */
    update(
        id: string,
        reservationVehicle: Partial<ReservationVehicle>,
        repositoryOptions?: RepositoryOptions,
    ): Promise<ReservationVehicle>;

    /**
     * ReservationVehicle 엔티티 삭제
     */
    delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void>;

    /**
     * 조건에 맞는 ReservationVehicle 엔티티 개수 조회
     */
    count(repositoryOptions?: RepositoryOptions): Promise<number>;

    /**
     * 주행거리 업데이트 (차량 반납 시)
     */
    updateOdometer(
        id: string,
        startOdometer: number,
        endOdometer: number,
        repositoryOptions?: RepositoryOptions,
    ): Promise<ReservationVehicle>;

    /**
     * 연료 레벨 업데이트 (차량 반납 시)
     */
    updateFuelLevel(
        id: string,
        startFuelLevel: number,
        endFuelLevel: number,
        repositoryOptions?: RepositoryOptions,
    ): Promise<ReservationVehicle>;

    /**
     * 차량 반납 처리
     */
    markAsReturned(id: string, repositoryOptions?: RepositoryOptions): Promise<ReservationVehicle>;

    /**
     * 예약 ID로 ReservationVehicle 조회
     */
    findByReservationId(reservationId: string, repositoryOptions?: RepositoryOptions): Promise<ReservationVehicle[]>;

    /**
     * 차량 정보 ID로 ReservationVehicle 조회
     */
    findByVehicleInfoId(vehicleInfoId: string, repositoryOptions?: RepositoryOptions): Promise<ReservationVehicle[]>;
}
