import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeService } from '@src/modules/employee/application/services/employee.service';
import { MMSEmployeeResponseDto } from '@resource/application/employee/dtos/mms-employee-response.dto';
import axios from 'axios';

@Injectable()
export class GetEmployeeInfoUsecase {
    constructor() {}

    async execute(employeeNumber?: string): Promise<MMSEmployeeResponseDto[]> {
        let url = `${process.env.METADATA_MANAGER_URL}/api/employees?detailed=true`;
        if (employeeNumber) {
            url += `&employeeNumber=${employeeNumber}`;
        }
        const result = await axios.get(url);
        if (employeeNumber) {
            return [new MMSEmployeeResponseDto(result.data)];
        }
        return result.data.map((employee) => new MMSEmployeeResponseDto(employee));
    }
}
