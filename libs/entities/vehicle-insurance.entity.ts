import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { InsuranceCompany } from './insurance-company.entity';
import { VehicleInfo } from './vehicle-info.entity';

@Entity('vehicle_insurances')
export class VehicleInsurance {
    @PrimaryColumn('uuid', {
        generated: 'uuid',
    })
    vehicleInsuranceId: string;

    @Column()
    vehicleInfoId: string;

    @Column()
    insuranceCompanyId: string;

    @Column({ nullable: true })
    policyNumber: string;

    @Column({ nullable: true, type: 'timestamp with time zone' })
    startDate: Date;

    @Column({ nullable: true, type: 'timestamp with time zone' })
    endDate: Date;

    @Column({ nullable: true })
    coverage: string;

    // @ManyToOne(() => VehicleInfo)
    // @JoinColumn({ name: 'vehicleInfoId', referencedColumnName: 'vehicleInfoId' })
    // vehicleInfo: VehicleInfo;

    // @ManyToOne(() => InsuranceCompany)
    // @JoinColumn({ name: 'insuranceCompanyId', referencedColumnName: 'insuranceCompanyId' })
    // insuranceCompany: InsuranceCompany;
}
