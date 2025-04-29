import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
// import { VehicleInsurance } from './vehicle-insurance.entity';

@Entity('insurance_companies')
export class InsuranceCompany {
    @PrimaryColumn('uuid', {
        generated: 'uuid',
    })
    insuranceCompanyId: string;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    contactNumber: string;

    @Column({ nullable: true })
    description: string;

    // @OneToMany(() => VehicleInsurance, (vi) => vi.insuranceCompany)
    // vehicleInsurances: VehicleInsurance[];
}
