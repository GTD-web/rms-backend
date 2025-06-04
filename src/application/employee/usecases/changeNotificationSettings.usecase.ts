import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { UserResponseDto } from '@resource/application/employee/dtos/user-response.dto';
import { UpdateNotificationSettingsDto } from '@resource/application/employee/dtos/notification-settings.dto';

@Injectable()
export class ChangeNotificationSettingsUsecase {
    constructor(private readonly employeeService: DomainEmployeeService) {}

    async execute(employeeId: string, updateDto: UpdateNotificationSettingsDto): Promise<UserResponseDto> {
        const employee = await this.employeeService.findByEmployeeId(employeeId);
        if (!employee) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.AUTH.USER_NOT_FOUND);
        }
        employee.isPushNotificationEnabled = updateDto.isPushNotificationEnabled;
        await this.employeeService.update(employee.employeeId, employee);
        return this.employeeService.findByEmployeeId(employeeId);
    }
}
