import { Employee as EmployeeEntity } from '@libs/entities';
import { Employee as EmployeeDomain } from '@resource/modules/employee/domain/models/employee';

export class EmployeeMapper {
    static toDomain(entity: EmployeeEntity): EmployeeDomain {
        return new EmployeeDomain({
            employeeId: entity.employeeId,
            name: entity.name,
            employeeNumber: entity.employeeNumber,
            department: entity.department,
            position: entity.position,
        });
    }

    static toEntity(domain: EmployeeDomain | Partial<EmployeeDomain>): Partial<EmployeeEntity> {
        const props = domain instanceof EmployeeDomain ? domain.toJSON() : domain;
        return {
            employeeId: props.employeeId,
            name: props.name,
            employeeNumber: props.employeeNumber,
            department: props.department,
            position: props.position,
        };
    }
}
