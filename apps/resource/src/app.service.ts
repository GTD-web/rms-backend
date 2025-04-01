import { Injectable } from '@nestjs/common';
import {
    employeesSeedData,
    resourceGroupsSeedData,
    resourcesSeedData,
    subResourceGroupsSeedData,
} from './mockdata.seed';
import { Not, Repository } from 'typeorm';
import {
    ResourceGroup as ResourceGroupEntity,
    Employee as EmployeeEntity,
    User as UserEntity,
    Resource as ResourceEntity,
} from '@libs/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { DateUtil } from '@libs/utils/date.util';

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(EmployeeEntity)
        private readonly employeeRepository: Repository<EmployeeEntity>,
        @InjectRepository(ResourceGroupEntity)
        private readonly resourceGroupRepository: Repository<ResourceGroupEntity>,
        @InjectRepository(ResourceEntity)
        private readonly resourceRepository: Repository<ResourceEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
    ) {}

    async onModuleInit() {
        // await this.clear();
        // await this.seedEmployee();
        // await this.seedResourceGroup();
        // await this.seedSubResourceGroup();
        // await this.seedResource();
    }

    async seedEmployee() {
        const employees = await this.employeeRepository.find();
        if (employees.length === 0) {
            for (const employee of employeesSeedData) {
                const savedEmployee = await this.employeeRepository.save(employee);
                const password = await bcrypt.hash(employee.password, 10);
                const user = await this.userRepository.save({
                    email: employee.email,
                    password: password,
                    employeeId: savedEmployee.employeeId,
                    roles: employee.roles,
                });

                const accessToken = this.jwtService.sign(
                    {
                        email: employee.email,
                        employeeId: savedEmployee.employeeId,
                        userId: user.userId,
                    },
                    { expiresIn: '24h' },
                );
                user.accessToken = accessToken;
                user.expiredAt = DateUtil.now().addDays(1).format();
                await this.userRepository.save(user);
                savedEmployee.userId = user.userId;
                await this.employeeRepository.save(savedEmployee);
            }
        }
    }

    async seedResourceGroup() {
        const resourceGroups = await this.resourceGroupRepository.find();
        if (resourceGroups.length === 0) {
            for (const resourceGroup of resourceGroupsSeedData) {
                await this.resourceGroupRepository.save(resourceGroup);
            }
        }
    }

    async seedSubResourceGroup() {
        const resourceGroups = await this.resourceGroupRepository.find({
            where: { parentResourceGroupId: IsNull() },
            relations: ['children'],
        });
        if (resourceGroups.length > 0) {
            if (resourceGroups[0].children.length === 0) {
                for (const data of subResourceGroupsSeedData) {
                    const parentResourceGroup = resourceGroups.find((group) => group.type === data.type);
                    const resourceGroup = {
                        ...data,
                        parentResourceGroupId: parentResourceGroup.resourceGroupId,
                    };
                    await this.resourceGroupRepository.save(resourceGroup);
                }
            }
        }
    }

    async seedResource() {
        const resources = await this.resourceRepository.find();
        if (resources.length === 0) {
            const resourceGroups = await this.resourceGroupRepository.find({
                where: { parentResourceGroupId: IsNull() },
            });
            for (const resource of resourcesSeedData) {
                const parentResourceGroup = resourceGroups.find((group) => group.type === resource.type);
                await this.resourceRepository.save({
                    ...resource,
                    resourceGroupId: parentResourceGroup.resourceGroupId,
                });
            }
        }
    }

    async clear() {
        await this.resourceRepository.delete({});

        // 1. 먼저 하위 자원 그룹 삭제 (parentResourceGroupId가 있는 그룹)
        await this.resourceGroupRepository.delete({
            parentResourceGroupId: Not(IsNull()),
        });

        // 2. 그 다음 최상위 자원 그룹 삭제 (parentResourceGroupId가 null인 그룹)
        await this.resourceGroupRepository.delete({
            parentResourceGroupId: IsNull(),
        });

        await this.userRepository.update({}, { employeeId: null });
        await this.employeeRepository.update({}, { userId: null });
        await this.userRepository.delete({});

        await this.employeeRepository.delete({});
    }
}
