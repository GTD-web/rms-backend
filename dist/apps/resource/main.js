/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/resource/src/app.controller.ts":
/*!*********************************************!*\
  !*** ./apps/resource/src/app.controller.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const public_decorator_1 = __webpack_require__(/*! @libs/decorators/public.decorator */ "./libs/decorators/public.decorator.ts");
let AppController = class AppController {
    getHello() {
        return 'Hello World';
    }
};
exports.AppController = AppController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('')
], AppController);


/***/ }),

/***/ "./apps/resource/src/app.module.ts":
/*!*****************************************!*\
  !*** ./apps/resource/src/app.module.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const typeorm_config_1 = __webpack_require__(/*! @libs/configs/typeorm.config */ "./libs/configs/typeorm.config.ts");
const env_config_1 = __webpack_require__(/*! @libs/configs/env.config */ "./libs/configs/env.config.ts");
const jwt_config_1 = __webpack_require__(/*! @libs/configs/jwt.config */ "./libs/configs/jwt.config.ts");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
const auth_module_1 = __webpack_require__(/*! ./modules/auth/auth.module */ "./apps/resource/src/modules/auth/auth.module.ts");
const resource_module_1 = __webpack_require__(/*! ./modules/resource/resource.module */ "./apps/resource/src/modules/resource/resource.module.ts");
const employee_module_1 = __webpack_require__(/*! ./modules/employee/employee.module */ "./apps/resource/src/modules/employee/employee.module.ts");
const reservation_module_1 = __webpack_require__(/*! ./modules/reservation/reservation.module */ "./apps/resource/src/modules/reservation/reservation.module.ts");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./apps/resource/src/app.service.ts");
const notification_module_1 = __webpack_require__(/*! ./modules/notification/notification.module */ "./apps/resource/src/modules/notification/notification.module.ts");
const file_module_1 = __webpack_require__(/*! ./modules/file/file.module */ "./apps/resource/src/modules/file/file.module.ts");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./apps/resource/src/app.controller.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [env_config_1.default, env_config_1.JWT_CONFIG],
            }),
            jwt_1.JwtModule.registerAsync({
                global: true,
                useFactory: jwt_config_1.jwtConfig,
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: typeorm_config_1.typeOrmConfig,
            }),
            typeorm_1.TypeOrmModule.forFeature(entities_1.Entities),
            auth_module_1.AuthModule,
            employee_module_1.EmployeeModule,
            resource_module_1.ResourceModule,
            reservation_module_1.ReservationModule,
            notification_module_1.NotificationModule,
            file_module_1.FileModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),

/***/ "./apps/resource/src/app.service.ts":
/*!******************************************!*\
  !*** ./apps/resource/src/app.service.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mockdata_seed_1 = __webpack_require__(/*! ./mockdata.seed */ "./apps/resource/src/mockdata.seed.ts");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
const typeorm_2 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_3 = __webpack_require__(/*! typeorm */ "typeorm");
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const date_util_1 = __webpack_require__(/*! @libs/utils/date.util */ "./libs/utils/date.util.ts");
let AppService = class AppService {
    constructor(employeeRepository, resourceGroupRepository, resourceRepository, userRepository, jwtService) {
        this.employeeRepository = employeeRepository;
        this.resourceGroupRepository = resourceGroupRepository;
        this.resourceRepository = resourceRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async onModuleInit() {
    }
    async seedEmployee() {
        const employees = await this.employeeRepository.find();
        if (employees.length === 0) {
            for (const employee of mockdata_seed_1.employeesSeedData) {
                const savedEmployee = await this.employeeRepository.save(employee);
                const password = await bcrypt.hash(employee.password, 10);
                const user = await this.userRepository.save({
                    email: employee.email,
                    password: password,
                    employeeId: savedEmployee.employeeId,
                    roles: employee.roles,
                });
                const accessToken = this.jwtService.sign({
                    email: employee.email,
                    employeeId: savedEmployee.employeeId,
                    userId: user.userId,
                }, { expiresIn: '24h' });
                user.accessToken = accessToken;
                user.expiredAt = date_util_1.DateUtil.now().addDays(1).format();
                await this.userRepository.save(user);
                savedEmployee.userId = user.userId;
                await this.employeeRepository.save(savedEmployee);
            }
        }
    }
    async seedResourceGroup() {
        const resourceGroups = await this.resourceGroupRepository.find();
        if (resourceGroups.length === 0) {
            for (const resourceGroup of mockdata_seed_1.resourceGroupsSeedData) {
                await this.resourceGroupRepository.save(resourceGroup);
            }
        }
    }
    async seedSubResourceGroup() {
        const resourceGroups = await this.resourceGroupRepository.find({
            where: { parentResourceGroupId: (0, typeorm_3.IsNull)() },
            relations: ['children'],
        });
        if (resourceGroups.length > 0) {
            if (resourceGroups[0].children.length === 0) {
                for (const data of mockdata_seed_1.subResourceGroupsSeedData) {
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
                where: { parentResourceGroupId: (0, typeorm_3.IsNull)() },
            });
            for (const resource of mockdata_seed_1.resourcesSeedData) {
                const parentResourceGroup = resourceGroups.find((group) => group.type === resource.type);
                await this.resourceRepository.save({
                    ...resource,
                    resourceGroupId: parentResourceGroup.resourceGroupId,
                });
            }
        }
    }
    async clear() {
        await this.resourceGroupRepository.delete({
            parentResourceGroupId: (0, typeorm_1.Not)((0, typeorm_3.IsNull)()),
        });
        await this.resourceGroupRepository.delete({
            parentResourceGroupId: (0, typeorm_3.IsNull)(),
        });
        await this.userRepository.delete({});
        await this.employeeRepository.delete({});
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(entities_1.Employee)),
    __param(1, (0, typeorm_2.InjectRepository)(entities_1.ResourceGroup)),
    __param(2, (0, typeorm_2.InjectRepository)(entities_1.Resource)),
    __param(3, (0, typeorm_2.InjectRepository)(entities_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _d : Object, typeof (_e = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _e : Object])
], AppService);


/***/ }),

/***/ "./apps/resource/src/dtos.index.ts":
/*!*****************************************!*\
  !*** ./apps/resource/src/dtos.index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileResponseDto = exports.ReservationWithRelationsResponseDto = exports.ReservationWithResourceResponseDto = exports.ReservationResponseDto = exports.CreateReservationResponseDto = exports.UpdateReservationCcReceipientDto = exports.UpdateReservationParticipantsDto = exports.UpdateReservationStatusDto = exports.UpdateReservationTimeDto = exports.UpdateReservationTitleDto = exports.CreateReservationDto = exports.EmplyeesByDepartmentResponseDto = exports.EmployeeResponseDto = exports.UpdateEmployeeDto = exports.CreateEmployeeDto = exports.AccommodationInfoResponseDto = exports.UpdateAccommodationInfoDto = exports.CreateAccommodationInfoDto = exports.MeetingRoomInfoResponseDto = exports.UpdateMeetingRoomInfoDto = exports.CreateMeetingRoomInfoDto = exports.MaintenanceResponseDto = exports.ConsumableResponseDto = exports.VehicleInfoResponseDto = exports.UpdateMaintenanceDto = exports.UpdateConsumableDto = exports.UpdateVehicleInfoDto = exports.CreateMaintenanceDto = exports.CreateConsumableDto = exports.CreateVehicleInfoDto = exports.ResourceManagerResponseDto = exports.ResourceGroupWithResourcesAndReservationsResponseDto = exports.ResourceGroupWithResourcesResponseDto = exports.ChildResourceGroupResponseDto = exports.ResourceGroupResponseDto = exports.ResourceWithReservationsResponseDto = exports.ResourceSelectResponseDto = exports.ResourceResponseDto = exports.ReturnVehicleDto = exports.UpdateResourceInfoDto = exports.UpdateResourceGroupDto = exports.UpdateResourceDto = exports.CreateResourceInfoDto = exports.CreateResourceManagerDto = exports.CreateResourceGroupDto = exports.CreateResourceDto = exports.UserResponseDto = exports.LoginResponseDto = exports.LoginDto = void 0;
var login_dto_1 = __webpack_require__(/*! ./modules/auth/application/dto/login.dto */ "./apps/resource/src/modules/auth/application/dto/login.dto.ts");
Object.defineProperty(exports, "LoginDto", ({ enumerable: true, get: function () { return login_dto_1.LoginDto; } }));
var login_response_dto_1 = __webpack_require__(/*! ./modules/auth/application/dto/login-response.dto */ "./apps/resource/src/modules/auth/application/dto/login-response.dto.ts");
Object.defineProperty(exports, "LoginResponseDto", ({ enumerable: true, get: function () { return login_response_dto_1.LoginResponseDto; } }));
var user_response_dto_1 = __webpack_require__(/*! ./modules/auth/application/dto/user-response.dto */ "./apps/resource/src/modules/auth/application/dto/user-response.dto.ts");
Object.defineProperty(exports, "UserResponseDto", ({ enumerable: true, get: function () { return user_response_dto_1.UserResponseDto; } }));
var create_resource_dto_1 = __webpack_require__(/*! ./modules/resource/common/application/dtos/create-resource.dto */ "./apps/resource/src/modules/resource/common/application/dtos/create-resource.dto.ts");
Object.defineProperty(exports, "CreateResourceDto", ({ enumerable: true, get: function () { return create_resource_dto_1.CreateResourceDto; } }));
Object.defineProperty(exports, "CreateResourceGroupDto", ({ enumerable: true, get: function () { return create_resource_dto_1.CreateResourceGroupDto; } }));
Object.defineProperty(exports, "CreateResourceManagerDto", ({ enumerable: true, get: function () { return create_resource_dto_1.CreateResourceManagerDto; } }));
Object.defineProperty(exports, "CreateResourceInfoDto", ({ enumerable: true, get: function () { return create_resource_dto_1.CreateResourceInfoDto; } }));
var update_resource_dto_1 = __webpack_require__(/*! ./modules/resource/common/application/dtos/update-resource.dto */ "./apps/resource/src/modules/resource/common/application/dtos/update-resource.dto.ts");
Object.defineProperty(exports, "UpdateResourceDto", ({ enumerable: true, get: function () { return update_resource_dto_1.UpdateResourceDto; } }));
Object.defineProperty(exports, "UpdateResourceGroupDto", ({ enumerable: true, get: function () { return update_resource_dto_1.UpdateResourceGroupDto; } }));
Object.defineProperty(exports, "UpdateResourceInfoDto", ({ enumerable: true, get: function () { return update_resource_dto_1.UpdateResourceInfoDto; } }));
Object.defineProperty(exports, "ReturnVehicleDto", ({ enumerable: true, get: function () { return update_resource_dto_1.ReturnVehicleDto; } }));
var resource_response_dto_1 = __webpack_require__(/*! ./modules/resource/common/application/dtos/resource-response.dto */ "./apps/resource/src/modules/resource/common/application/dtos/resource-response.dto.ts");
Object.defineProperty(exports, "ResourceResponseDto", ({ enumerable: true, get: function () { return resource_response_dto_1.ResourceResponseDto; } }));
Object.defineProperty(exports, "ResourceSelectResponseDto", ({ enumerable: true, get: function () { return resource_response_dto_1.ResourceSelectResponseDto; } }));
Object.defineProperty(exports, "ResourceWithReservationsResponseDto", ({ enumerable: true, get: function () { return resource_response_dto_1.ResourceWithReservationsResponseDto; } }));
Object.defineProperty(exports, "ResourceGroupResponseDto", ({ enumerable: true, get: function () { return resource_response_dto_1.ResourceGroupResponseDto; } }));
Object.defineProperty(exports, "ChildResourceGroupResponseDto", ({ enumerable: true, get: function () { return resource_response_dto_1.ChildResourceGroupResponseDto; } }));
Object.defineProperty(exports, "ResourceGroupWithResourcesResponseDto", ({ enumerable: true, get: function () { return resource_response_dto_1.ResourceGroupWithResourcesResponseDto; } }));
Object.defineProperty(exports, "ResourceGroupWithResourcesAndReservationsResponseDto", ({ enumerable: true, get: function () { return resource_response_dto_1.ResourceGroupWithResourcesAndReservationsResponseDto; } }));
Object.defineProperty(exports, "ResourceManagerResponseDto", ({ enumerable: true, get: function () { return resource_response_dto_1.ResourceManagerResponseDto; } }));
var create_vehicle_info_dto_1 = __webpack_require__(/*! ./modules/resource/vehicle/application/dtos/create-vehicle-info.dto */ "./apps/resource/src/modules/resource/vehicle/application/dtos/create-vehicle-info.dto.ts");
Object.defineProperty(exports, "CreateVehicleInfoDto", ({ enumerable: true, get: function () { return create_vehicle_info_dto_1.CreateVehicleInfoDto; } }));
var create_consumable_dto_1 = __webpack_require__(/*! ./modules/resource/vehicle/application/dtos/create-consumable.dto */ "./apps/resource/src/modules/resource/vehicle/application/dtos/create-consumable.dto.ts");
Object.defineProperty(exports, "CreateConsumableDto", ({ enumerable: true, get: function () { return create_consumable_dto_1.CreateConsumableDto; } }));
var create_maintenance_dto_1 = __webpack_require__(/*! ./modules/resource/vehicle/application/dtos/create-maintenance.dto */ "./apps/resource/src/modules/resource/vehicle/application/dtos/create-maintenance.dto.ts");
Object.defineProperty(exports, "CreateMaintenanceDto", ({ enumerable: true, get: function () { return create_maintenance_dto_1.CreateMaintenanceDto; } }));
var update_vehicle_info_dto_1 = __webpack_require__(/*! ./modules/resource/vehicle/application/dtos/update-vehicle-info.dto */ "./apps/resource/src/modules/resource/vehicle/application/dtos/update-vehicle-info.dto.ts");
Object.defineProperty(exports, "UpdateVehicleInfoDto", ({ enumerable: true, get: function () { return update_vehicle_info_dto_1.UpdateVehicleInfoDto; } }));
var update_consumable_dto_1 = __webpack_require__(/*! ./modules/resource/vehicle/application/dtos/update-consumable.dto */ "./apps/resource/src/modules/resource/vehicle/application/dtos/update-consumable.dto.ts");
Object.defineProperty(exports, "UpdateConsumableDto", ({ enumerable: true, get: function () { return update_consumable_dto_1.UpdateConsumableDto; } }));
var update_maintenance_dto_1 = __webpack_require__(/*! ./modules/resource/vehicle/application/dtos/update-maintenance.dto */ "./apps/resource/src/modules/resource/vehicle/application/dtos/update-maintenance.dto.ts");
Object.defineProperty(exports, "UpdateMaintenanceDto", ({ enumerable: true, get: function () { return update_maintenance_dto_1.UpdateMaintenanceDto; } }));
var vehicle_info_response_dto_1 = __webpack_require__(/*! ./modules/resource/vehicle/application/dtos/vehicle-info-response.dto */ "./apps/resource/src/modules/resource/vehicle/application/dtos/vehicle-info-response.dto.ts");
Object.defineProperty(exports, "VehicleInfoResponseDto", ({ enumerable: true, get: function () { return vehicle_info_response_dto_1.VehicleInfoResponseDto; } }));
var consumable_response_dto_1 = __webpack_require__(/*! ./modules/resource/vehicle/application/dtos/consumable-response.dto */ "./apps/resource/src/modules/resource/vehicle/application/dtos/consumable-response.dto.ts");
Object.defineProperty(exports, "ConsumableResponseDto", ({ enumerable: true, get: function () { return consumable_response_dto_1.ConsumableResponseDto; } }));
var maintenance_response_dto_1 = __webpack_require__(/*! ./modules/resource/vehicle/application/dtos/maintenance-response.dto */ "./apps/resource/src/modules/resource/vehicle/application/dtos/maintenance-response.dto.ts");
Object.defineProperty(exports, "MaintenanceResponseDto", ({ enumerable: true, get: function () { return maintenance_response_dto_1.MaintenanceResponseDto; } }));
var create_meeting_room_info_dto_1 = __webpack_require__(/*! ./modules/resource/meeting-room/application/dtos/create-meeting-room-info.dto */ "./apps/resource/src/modules/resource/meeting-room/application/dtos/create-meeting-room-info.dto.ts");
Object.defineProperty(exports, "CreateMeetingRoomInfoDto", ({ enumerable: true, get: function () { return create_meeting_room_info_dto_1.CreateMeetingRoomInfoDto; } }));
var update_meeting_room_info_dto_1 = __webpack_require__(/*! ./modules/resource/meeting-room/application/dtos/update-meeting-room-info.dto */ "./apps/resource/src/modules/resource/meeting-room/application/dtos/update-meeting-room-info.dto.ts");
Object.defineProperty(exports, "UpdateMeetingRoomInfoDto", ({ enumerable: true, get: function () { return update_meeting_room_info_dto_1.UpdateMeetingRoomInfoDto; } }));
var meeting_room_info_response_dto_1 = __webpack_require__(/*! ./modules/resource/meeting-room/application/dtos/meeting-room-info-response.dto */ "./apps/resource/src/modules/resource/meeting-room/application/dtos/meeting-room-info-response.dto.ts");
Object.defineProperty(exports, "MeetingRoomInfoResponseDto", ({ enumerable: true, get: function () { return meeting_room_info_response_dto_1.MeetingRoomInfoResponseDto; } }));
var create_accommodation_info_dto_1 = __webpack_require__(/*! ./modules/resource/accommodation/application/dtos/create-accommodation-info.dto */ "./apps/resource/src/modules/resource/accommodation/application/dtos/create-accommodation-info.dto.ts");
Object.defineProperty(exports, "CreateAccommodationInfoDto", ({ enumerable: true, get: function () { return create_accommodation_info_dto_1.CreateAccommodationInfoDto; } }));
var update_accommodation_info_dto_1 = __webpack_require__(/*! ./modules/resource/accommodation/application/dtos/update-accommodation-info.dto */ "./apps/resource/src/modules/resource/accommodation/application/dtos/update-accommodation-info.dto.ts");
Object.defineProperty(exports, "UpdateAccommodationInfoDto", ({ enumerable: true, get: function () { return update_accommodation_info_dto_1.UpdateAccommodationInfoDto; } }));
var accommodation_info_response_dto_1 = __webpack_require__(/*! ./modules/resource/accommodation/application/dtos/accommodation-info-response.dto */ "./apps/resource/src/modules/resource/accommodation/application/dtos/accommodation-info-response.dto.ts");
Object.defineProperty(exports, "AccommodationInfoResponseDto", ({ enumerable: true, get: function () { return accommodation_info_response_dto_1.AccommodationInfoResponseDto; } }));
var create_employee_dto_1 = __webpack_require__(/*! ./modules/employee/application/dtos/create-employee.dto */ "./apps/resource/src/modules/employee/application/dtos/create-employee.dto.ts");
Object.defineProperty(exports, "CreateEmployeeDto", ({ enumerable: true, get: function () { return create_employee_dto_1.CreateEmployeeDto; } }));
var update_employee_dto_1 = __webpack_require__(/*! ./modules/employee/application/dtos/update-employee.dto */ "./apps/resource/src/modules/employee/application/dtos/update-employee.dto.ts");
Object.defineProperty(exports, "UpdateEmployeeDto", ({ enumerable: true, get: function () { return update_employee_dto_1.UpdateEmployeeDto; } }));
var employee_response_dto_1 = __webpack_require__(/*! ./modules/employee/application/dtos/employee-response.dto */ "./apps/resource/src/modules/employee/application/dtos/employee-response.dto.ts");
Object.defineProperty(exports, "EmployeeResponseDto", ({ enumerable: true, get: function () { return employee_response_dto_1.EmployeeResponseDto; } }));
var employees_by_department_response_dto_1 = __webpack_require__(/*! ./modules/employee/application/dtos/employees-by-department-response.dto */ "./apps/resource/src/modules/employee/application/dtos/employees-by-department-response.dto.ts");
Object.defineProperty(exports, "EmplyeesByDepartmentResponseDto", ({ enumerable: true, get: function () { return employees_by_department_response_dto_1.EmplyeesByDepartmentResponseDto; } }));
var create_reservation_dto_1 = __webpack_require__(/*! ./modules/reservation/application/dtos/create-reservation.dto */ "./apps/resource/src/modules/reservation/application/dtos/create-reservation.dto.ts");
Object.defineProperty(exports, "CreateReservationDto", ({ enumerable: true, get: function () { return create_reservation_dto_1.CreateReservationDto; } }));
var update_reservation_dto_1 = __webpack_require__(/*! ./modules/reservation/application/dtos/update-reservation.dto */ "./apps/resource/src/modules/reservation/application/dtos/update-reservation.dto.ts");
Object.defineProperty(exports, "UpdateReservationTitleDto", ({ enumerable: true, get: function () { return update_reservation_dto_1.UpdateReservationTitleDto; } }));
Object.defineProperty(exports, "UpdateReservationTimeDto", ({ enumerable: true, get: function () { return update_reservation_dto_1.UpdateReservationTimeDto; } }));
Object.defineProperty(exports, "UpdateReservationStatusDto", ({ enumerable: true, get: function () { return update_reservation_dto_1.UpdateReservationStatusDto; } }));
Object.defineProperty(exports, "UpdateReservationParticipantsDto", ({ enumerable: true, get: function () { return update_reservation_dto_1.UpdateReservationParticipantsDto; } }));
Object.defineProperty(exports, "UpdateReservationCcReceipientDto", ({ enumerable: true, get: function () { return update_reservation_dto_1.UpdateReservationCcReceipientDto; } }));
var reservation_response_dto_1 = __webpack_require__(/*! ./modules/reservation/application/dtos/reservation-response.dto */ "./apps/resource/src/modules/reservation/application/dtos/reservation-response.dto.ts");
Object.defineProperty(exports, "CreateReservationResponseDto", ({ enumerable: true, get: function () { return reservation_response_dto_1.CreateReservationResponseDto; } }));
Object.defineProperty(exports, "ReservationResponseDto", ({ enumerable: true, get: function () { return reservation_response_dto_1.ReservationResponseDto; } }));
Object.defineProperty(exports, "ReservationWithResourceResponseDto", ({ enumerable: true, get: function () { return reservation_response_dto_1.ReservationWithResourceResponseDto; } }));
Object.defineProperty(exports, "ReservationWithRelationsResponseDto", ({ enumerable: true, get: function () { return reservation_response_dto_1.ReservationWithRelationsResponseDto; } }));
var file_response_dto_1 = __webpack_require__(/*! ./modules/file/application/dtos/file-response.dto */ "./apps/resource/src/modules/file/application/dtos/file-response.dto.ts");
Object.defineProperty(exports, "FileResponseDto", ({ enumerable: true, get: function () { return file_response_dto_1.FileResponseDto; } }));


/***/ }),

/***/ "./apps/resource/src/mockdata.seed.ts":
/*!********************************************!*\
  !*** ./apps/resource/src/mockdata.seed.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resourcesSeedData = exports.subResourceGroupsSeedData = exports.resourceGroupsSeedData = exports.employeesSeedData = void 0;
const resource_type_enum_1 = __webpack_require__(/*! @libs/enums/resource-type.enum */ "./libs/enums/resource-type.enum.ts");
const role_type_enum_1 = __webpack_require__(/*! @libs/enums/role-type.enum */ "./libs/enums/role-type.enum.ts");
exports.employeesSeedData = [
    {
        name: '관리자',
        employeeNumber: '00000',
        position: '관리자',
        department: '관리자',
        email: 'admin@lumir.space',
        password: '1234',
        roles: [role_type_enum_1.Role.USER, role_type_enum_1.Role.RESOURCE_ADMIN, role_type_enum_1.Role.SYSTEM_ADMIN],
    },
    {
        name: '김종식',
        employeeNumber: '23027',
        position: '선임연구원',
        department: 'Web파트',
        email: 'kim.jongsik@lumir.space',
        password: '1234',
    },
    {
        name: '우창욱',
        employeeNumber: '23047',
        position: '연구원',
        department: 'Web파트',
        email: 'woo.changuk@lumir.space',
        password: '1234',
    },
    {
        name: '김민수',
        employeeNumber: '24008',
        position: '연구원',
        department: 'Web파트',
        email: 'kim.minsu@lumir.space',
        password: '1234',
    },
    {
        name: '김규현',
        employeeNumber: '24016',
        position: '연구원',
        department: 'Web파트',
        email: 'kim.kyuhyun@lumir.space',
        password: '1234',
    },
    {
        name: '김성훈',
        employeeNumber: '24017',
        position: '연구원',
        department: 'Web파트',
        email: 'kim.seonghun@lumir.space',
        password: '1234',
    },
    {
        name: '조민경',
        employeeNumber: '24019',
        position: '연구원',
        department: 'Web파트',
        email: 'jo.minkyeong@lumir.space',
        password: '1234',
    },
    {
        name: '이화영',
        employeeNumber: '24024',
        position: '연구원',
        department: 'Web파트',
        email: 'lee.hwayoung@lumir.space',
        password: '1234',
    },
    {
        name: '황성빈',
        employeeNumber: '24048',
        position: '연구원',
        department: 'Web파트',
        email: 'hwang.sungbin@lumir.space',
        password: '1234',
    },
    {
        name: '전영미',
        employeeNumber: '20029',
        position: '이사',
        department: '경영지원실',
        email: 'jeon.youngmi@lumir.space',
        password: '1234',
    },
    {
        name: '박태연',
        employeeNumber: '22008',
        position: '책임매니저',
        department: '경영지원실',
        email: 'park.taeyeon@lumir.space',
        password: '1234',
    },
    {
        name: '정재일',
        employeeNumber: '23012',
        position: '책임매니저',
        department: '경영지원실',
        email: 'jung.jaeil@lumir.space',
        password: '1234',
    },
    {
        name: '박승현',
        employeeNumber: '24044',
        position: '책임매니저',
        department: '경영지원실',
        email: 'park.david@lumir.space',
        password: '1234',
    },
    {
        name: '우은진',
        employeeNumber: '22020',
        position: '선임매니저',
        department: '경영지원실',
        email: 'woo.eunjin@lumir.space',
        password: '1234',
    },
    {
        name: '이서연',
        employeeNumber: '22042',
        position: '선임매니저',
        department: '경영지원실',
        email: 'lee.seoyeon@lumir.space',
        password: '1234',
    },
    {
        name: '김민영',
        employeeNumber: '23006',
        position: '선임매니저',
        department: '경영지원실',
        email: 'kim.minyoung@lumir.space',
        password: '1234',
    },
    {
        name: '김민찬',
        employeeNumber: '23032',
        position: '매니저',
        department: '경영지원실',
        email: 'kim.minchan@lumir.space',
        password: '1234',
    },
    {
        name: '조아라',
        employeeNumber: '24047',
        position: '매니저',
        department: '경영지원실',
        email: 'cho.ahra@lumir.space',
        password: '1234',
    },
    {
        name: '강남규',
        employeeNumber: '17007',
        position: '책임연구원',
        department: '전자1파트',
        email: 'kang.nk@lumir.space',
        password: '1234',
    },
    {
        name: '정석화',
        employeeNumber: '22025',
        position: '책임연구원',
        department: '전자1파트',
        email: 'jung.suckhwa@lumir.space',
        password: '1234',
    },
    {
        name: '정양희',
        employeeNumber: '20035',
        position: '책임연구원',
        department: '전자1파트',
        email: 'jeong.yanghee@lumir.space',
        password: '1234',
    },
    {
        name: '정성훈',
        employeeNumber: '21008',
        position: '책임연구원',
        department: '전자1파트',
        email: 'jeong.sunghoon@lumir.space',
        password: '1234',
    },
    {
        name: '이준',
        employeeNumber: '21013',
        position: '책임연구원',
        department: '전자1파트',
        email: 'lee.jun@lumir.space',
        password: '1234',
    },
    {
        name: '조수형',
        employeeNumber: '19003',
        position: '책임연구원',
        department: '전자1파트',
        email: 'cho.sh@lumir.space',
        password: '1234',
    },
    {
        name: '정영식',
        employeeNumber: '24041',
        position: '책임연구원',
        department: '전자1파트',
        email: 'jeung.youngsic@lumir.space',
        password: '1234',
    },
    {
        name: '김기표',
        employeeNumber: '23025',
        position: '선임연구원',
        department: '전자1파트',
        email: 'kim.kipyo@lumir.space',
        password: '1234',
    },
    {
        name: '하태식',
        employeeNumber: '23022',
        position: '연구원',
        department: '전자1파트',
        email: 'ha.taesik@lumir.space',
        password: '1234',
    },
    {
        name: '최은지',
        employeeNumber: '23034',
        position: '연구원',
        department: '전자1파트',
        email: 'choi.eunji@lumir.space',
        password: '1234',
    },
    {
        name: '서상준',
        employeeNumber: '22038',
        position: '책임연구원',
        department: '전자2파트',
        email: 'seo.sangjun@lumir.space',
        password: '1234',
    },
    {
        name: '이승기',
        employeeNumber: '23048',
        position: '책임연구원',
        department: '전자2파트',
        email: 'lee.seungky@lumir.space',
        password: '1234',
    },
    {
        name: '전구영',
        employeeNumber: '23010',
        position: '책임연구원',
        department: '전자2파트',
        email: 'jeon.kuyoung@lumir.space',
        password: '1234',
    },
    {
        name: '천윤범',
        employeeNumber: '25004',
        position: '책임연구원',
        department: '전자2파트',
        email: 'chun.yoonbum@lumir.space',
        password: '1234',
    },
    {
        name: '정승헌',
        employeeNumber: '24005',
        position: '연구원',
        department: '전자2파트',
        email: 'jeong.seungheon@lumir.space',
        password: '1234',
    },
    {
        name: '이준형',
        employeeNumber: '24046',
        position: '연구원',
        department: '전자2파트',
        email: 'lee.junhyeong@lumir.space',
        password: '1234',
    },
    {
        name: '김경민',
        employeeNumber: '23028',
        position: '책임연구원',
        department: 'RF파트',
        email: 'kim.kyoungmin@lumir.space',
        password: '1234',
    },
    {
        name: '홍연창',
        employeeNumber: '25006',
        position: '책임연구원',
        department: 'RF파트',
        email: 'hong.yonchang@lumir.space',
        password: '1234',
    },
    {
        name: '유경준',
        employeeNumber: '25007',
        position: '책임연구원',
        department: 'RF파트',
        email: 'yu.gyeongjun@lumir.space',
        password: '1234',
    },
    {
        name: '신승규',
        employeeNumber: '25003',
        position: '책임연구원',
        department: 'RF파트',
        email: 'shin.seunggyu@lumir.space',
        password: '1234',
    },
    {
        name: '박평식1',
        employeeNumber: '24006',
        position: '선임연구원',
        department: 'RF파트',
        email: 'park.pyungsik1@lumir.space',
        password: '1234',
    },
    {
        name: '박영배',
        employeeNumber: '24045',
        position: '선임연구원',
        department: 'RF파트',
        email: 'park.youngbae@lumir.space',
        password: '1234',
    },
    {
        name: '담현규',
        employeeNumber: '25005',
        position: '선임연구원',
        department: 'RF파트',
        email: 'dam.hyounkyou@lumir.space',
        password: '1234',
    },
    {
        name: '김은정',
        employeeNumber: '23036',
        position: '연구원',
        department: 'RF파트',
        email: 'kim.eunjeong@lumir.space',
        password: '1234',
    },
    {
        name: '박창서',
        employeeNumber: '19002',
        position: '책임연구원',
        department: '안테나파트',
        email: 'park.cs@lumir.space',
        password: '1234',
    },
    {
        name: '김익환',
        employeeNumber: '24038',
        position: '선임연구원',
        department: '안테나파트',
        email: 'kim.ikhwan@lumir.space',
        password: '1234',
    },
    {
        name: '고영훈',
        employeeNumber: '22002',
        position: '책임연구원',
        department: '기구파트',
        email: 'ko.younghun@lumir.space',
        password: '1234',
    },
    {
        name: '박동조',
        employeeNumber: '23045',
        position: '선임연구원',
        department: '기구파트',
        email: 'park.dongjo@lumir.space',
        password: '1234',
    },
    {
        name: '구석현',
        employeeNumber: '24020',
        position: '선임연구원',
        department: '기구파트',
        email: 'koo.sukhyun@lumir.space',
        password: '1234',
    },
    {
        name: '손진우',
        employeeNumber: '22040',
        position: '선임연구원',
        department: '기구파트',
        email: 'son.jinwoo@lumir.space',
        password: '1234',
    },
    {
        name: '김동현1',
        employeeNumber: '23035',
        position: '연구원',
        department: '기구파트',
        email: 'kim.donghyun1@lumir.space',
        password: '1234',
    },
    {
        name: '박일수',
        employeeNumber: '24031',
        position: '책임연구원',
        department: '지상운용파트',
        email: 'park.ilsoo@lumir.space',
        password: '1234',
    },
    {
        name: '김형기',
        employeeNumber: '22011',
        position: '연구원',
        department: '지상운용파트',
        email: 'kim.hyunggi@lumir.space',
        password: '1234',
    },
    {
        name: '박정조',
        employeeNumber: '22014',
        position: '연구원',
        department: '지상운용파트',
        email: 'park.jeongjo@lumir.space',
        password: '1234',
    },
    {
        name: '김일진',
        employeeNumber: '22035',
        position: '책임연구원',
        department: 'SAR시스템파트',
        email: 'kim.iljin@lumir.space',
        password: '1234',
    },
    {
        name: '이해림',
        employeeNumber: '24003',
        position: '연구원',
        department: 'SAR시스템파트',
        email: 'lee.haerim@lumir.space',
        password: '1234',
    },
    {
        name: '민정호',
        employeeNumber: '24026',
        position: '연구원',
        department: '영상분석파트',
        email: 'min.jeongho@lumir.space',
        password: '1234',
    },
    {
        name: '손성빈',
        employeeNumber: '24032',
        position: '연구원',
        department: '영상분석파트',
        email: 'son.sungbin@lumir.space',
        password: '1234',
    },
    {
        name: '김형진',
        employeeNumber: '24043',
        position: '책임연구원',
        department: '추진파트',
        email: 'kim.hyungjin@lumir.space',
        password: '1234',
    },
    {
        name: '김기용',
        employeeNumber: '24004',
        position: '책임제조원',
        department: '제조파트',
        email: 'kim.kiyong@lumir.space',
        password: '1234',
    },
    {
        name: '김동현',
        employeeNumber: '22005',
        position: '선임제조원',
        department: '제조파트',
        email: 'kim.donghyun@lumir.space',
        password: '1234',
    },
    {
        name: '안광헌',
        employeeNumber: '25001',
        position: '선임제조원',
        department: '제조파트',
        email: 'an.gwangheon@lumir.space',
        password: '1234',
    },
    {
        name: '원동주',
        employeeNumber: '24035',
        position: '연구원',
        department: '제조파트',
        email: 'won.dongju@lumir.space',
        password: '1234',
    },
    {
        name: '채민수',
        employeeNumber: '22037',
        position: '제조원',
        department: '제조파트',
        email: 'chae.minsu1@lumir.space',
        password: '1234',
    },
    {
        name: '남명조',
        employeeNumber: '24042',
        position: '제조원',
        department: '제조파트',
        email: 'nam.myungjo@lumir.space',
        password: '1234',
    },
    {
        name: '최동원',
        employeeNumber: '25002',
        position: '제조원',
        department: '제조파트',
        email: 'choi.dongwon@lumir.space',
        password: '1234',
    },
    {
        name: '박재훈',
        employeeNumber: '25008',
        position: '선임연구원',
        department: 'QA파트',
        email: 'park.jaehun@lumir.space',
        password: '1234',
    },
    {
        name: '서유민1',
        employeeNumber: '24010',
        position: '연구원',
        department: 'QA파트',
        email: 'seo.yumin1@lumir.space',
        password: '1234',
    },
    {
        name: '윤성영',
        employeeNumber: '23050',
        position: '연구원',
        department: 'QA파트',
        email: 'youn.sungyoung@lumir.space',
        password: '1234',
    },
    {
        name: '이우림',
        employeeNumber: '20032',
        position: '연구원',
        department: 'QA파트',
        email: 'lee.woolim@lumir.space',
        password: '1234',
    },
    {
        name: '강민기',
        employeeNumber: '24028',
        position: '연구원',
        department: 'PA파트',
        email: 'kang.minki@lumir.space',
        password: '1234',
    },
    {
        name: '김성훈1',
        employeeNumber: '24034',
        position: '연구원',
        department: 'PA파트',
        email: 'kim.seonghun1@lumir.space',
        password: '1234',
    },
];
exports.resourceGroupsSeedData = [
    {
        title: '회의실',
        description: '회의 공간',
        type: resource_type_enum_1.ResourceType.MEETING_ROOM,
    },
    {
        title: '차량',
        description: '업무용 차량',
        type: resource_type_enum_1.ResourceType.VEHICLE,
    },
    {
        title: '숙소',
        description: '숙소',
        type: resource_type_enum_1.ResourceType.ACCOMMODATION,
    },
];
exports.subResourceGroupsSeedData = [
    {
        title: '11층 회의실',
        description: '11층 회의실',
        type: resource_type_enum_1.ResourceType.MEETING_ROOM,
    },
    {
        title: '5층 회의실',
        description: '5층 회의실',
        type: resource_type_enum_1.ResourceType.MEETING_ROOM,
    },
    {
        title: '법인 차량',
        description: '법인 차량',
        type: resource_type_enum_1.ResourceType.VEHICLE,
    },
    {
        title: '대전 숙소',
        description: '대전 숙소',
        type: resource_type_enum_1.ResourceType.ACCOMMODATION,
    },
    {
        title: '사천 숙소',
        description: '사천 숙소',
        type: resource_type_enum_1.ResourceType.ACCOMMODATION,
    },
];
exports.resourcesSeedData = [
    {
        name: '11층 대회의실',
        description: '11층 대회의실',
        type: resource_type_enum_1.ResourceType.MEETING_ROOM,
        images: ['https://www.lumir-inc.com/assets/imgs/renewal/introduce/overview/%EC%82%BC%EC%A1%B1%EC%98%A4.png'],
    },
    {
        name: '11층 중회의실',
        description: '11층 중회의실',
        type: resource_type_enum_1.ResourceType.MEETING_ROOM,
        images: ['https://www.lumir-inc.com/assets/imgs/renewal/introduce/overview/%EC%82%BC%EC%A1%B1%EC%98%A4.png'],
    },
    {
        name: '11층 소회의실',
        description: '11층 소회의실',
        type: resource_type_enum_1.ResourceType.MEETING_ROOM,
        images: ['https://www.lumir-inc.com/assets/imgs/renewal/introduce/overview/%EC%82%BC%EC%A1%B1%EC%98%A4.png'],
    },
    {
        name: '대표이사실',
        description: '대표이사실',
        type: resource_type_enum_1.ResourceType.MEETING_ROOM,
        images: ['https://www.lumir-inc.com/assets/imgs/renewal/introduce/overview/%EC%82%BC%EC%A1%B1%EC%98%A4.png'],
    },
    {
        name: '5층 중회의실',
        description: '5층 중회의실',
        type: resource_type_enum_1.ResourceType.MEETING_ROOM,
        images: ['https://www.lumir-inc.com/assets/imgs/renewal/introduce/overview/%EC%82%BC%EC%A1%B1%EC%98%A4.png'],
    },
    {
        name: '5층 소회의실',
        description: '5층 소회의실',
        type: resource_type_enum_1.ResourceType.MEETING_ROOM,
        images: ['https://www.lumir-inc.com/assets/imgs/renewal/introduce/overview/%EC%82%BC%EC%A1%B1%EC%98%A4.png'],
    },
    {
        name: '5층 오대수이사실',
        description: '5층 오대수이사실',
        type: resource_type_enum_1.ResourceType.MEETING_ROOM,
        images: ['https://www.lumir-inc.com/assets/imgs/renewal/introduce/overview/%EC%82%BC%EC%A1%B1%EC%98%A4.png'],
    },
    {
        name: '럭셔리모텔1',
        description: '럭셔리모텔1',
        type: resource_type_enum_1.ResourceType.ACCOMMODATION,
        images: ['https://www.lumir-inc.com/assets/imgs/renewal/introduce/overview/%EC%82%BC%EC%A1%B1%EC%98%A4.png'],
    },
    {
        name: '럭셔리모텔2',
        description: '럭셔리모텔2',
        type: resource_type_enum_1.ResourceType.ACCOMMODATION,
        images: ['https://www.lumir-inc.com/assets/imgs/renewal/introduce/overview/%EC%82%BC%EC%A1%B1%EC%98%A4.png'],
    },
    {
        name: '럭셔리모텔3',
        description: '럭셔리모텔3',
        type: resource_type_enum_1.ResourceType.ACCOMMODATION,
        images: ['https://www.lumir-inc.com/assets/imgs/renewal/introduce/overview/%EC%82%BC%EC%A1%B1%EC%98%A4.png'],
    },
    {
        name: '럭셔리모텔4',
        description: '럭셔리모텔4',
        type: resource_type_enum_1.ResourceType.ACCOMMODATION,
        images: ['https://www.lumir-inc.com/assets/imgs/renewal/introduce/overview/%EC%82%BC%EC%A1%B1%EC%98%A4.png'],
    },
    {
        name: '럭셔리모텔5',
        description: '럭셔리모텔5',
        type: resource_type_enum_1.ResourceType.ACCOMMODATION,
        images: ['https://www.lumir-inc.com/assets/imgs/renewal/introduce/overview/%EC%82%BC%EC%A1%B1%EC%98%A4.png'],
    },
    {
        name: '럭셔리모텔6',
        description: '럭셔리모텔6',
        type: resource_type_enum_1.ResourceType.ACCOMMODATION,
        images: ['https://www.lumir-inc.com/assets/imgs/renewal/introduce/overview/%EC%82%BC%EC%A1%B1%EC%98%A4.png'],
    },
    {
        name: '싼타페(25어5677)',
        description: '싼타페(25어5677)',
        type: resource_type_enum_1.ResourceType.VEHICLE,
        images: ['https://www.lumir-inc.com/assets/imgs/renewal/introduce/overview/%EC%82%BC%EC%A1%B1%EC%98%A4.png'],
    },
    {
        name: '스타렉스(75누7885)',
        description: '스타렉스(75누7885)',
        type: resource_type_enum_1.ResourceType.VEHICLE,
        images: ['https://www.lumir-inc.com/assets/imgs/renewal/introduce/overview/%EC%82%BC%EC%A1%B1%EC%98%A4.png'],
    },
    {
        name: '셀토스(126서1152)',
        description: '셀토스(126서1152)',
        type: resource_type_enum_1.ResourceType.VEHICLE,
        images: ['https://www.lumir-inc.com/assets/imgs/renewal/introduce/overview/%EC%82%BC%EC%A1%B1%EC%98%A4.png'],
    },
    {
        name: '카니발(116너5351)',
        description: '카니발(116너5351)',
        type: resource_type_enum_1.ResourceType.VEHICLE,
        images: ['https://www.lumir-inc.com/assets/imgs/renewal/introduce/overview/%EC%82%BC%EC%A1%B1%EC%98%A4.png'],
    },
];


/***/ }),

/***/ "./apps/resource/src/modules/auth/application/dto/change-password.dto.ts":
/*!*******************************************************************************!*\
  !*** ./apps/resource/src/modules/auth/application/dto/change-password.dto.ts ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChangePasswordDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class ChangePasswordDto {
}
exports.ChangePasswordDto = ChangePasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'newPassword123',
        description: '새로운 비밀번호',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "newPassword", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/auth/application/dto/check-password.dto.ts":
/*!******************************************************************************!*\
  !*** ./apps/resource/src/modules/auth/application/dto/check-password.dto.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CheckPasswordDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CheckPasswordDto {
}
exports.CheckPasswordDto = CheckPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'currentPassword123',
        description: '현재 비밀번호',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CheckPasswordDto.prototype, "password", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/auth/application/dto/login-response.dto.ts":
/*!******************************************************************************!*\
  !*** ./apps/resource/src/modules/auth/application/dto/login-response.dto.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class LoginResponseDto {
}
exports.LoginResponseDto = LoginResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....',
    }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'test@lumir.space',
    }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '홍길동',
    }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Web 파트',
    }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '연구원',
    }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['USER', 'RESOURCE_ADMIN', 'SYSTEM_ADMIN'],
    }),
    __metadata("design:type", Array)
], LoginResponseDto.prototype, "roles", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/auth/application/dto/login.dto.ts":
/*!*********************************************************************!*\
  !*** ./apps/resource/src/modules/auth/application/dto/login.dto.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin@lumir.space' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1234' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/auth/application/dto/user-response.dto.ts":
/*!*****************************************************************************!*\
  !*** ./apps/resource/src/modules/auth/application/dto/user-response.dto.ts ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class UserResponseDto {
}
exports.UserResponseDto = UserResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'test@lumir.space',
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '01012345678',
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "mobile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '홍길동',
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Web 파트',
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '연구원',
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['USER', 'RESOURCE_ADMIN', 'SYSTEM_ADMIN'],
    }),
    __metadata("design:type", Array)
], UserResponseDto.prototype, "roles", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/auth/application/mappers/user.mapper.ts":
/*!***************************************************************************!*\
  !*** ./apps/resource/src/modules/auth/application/mappers/user.mapper.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserMapper = void 0;
const user_1 = __webpack_require__(/*! @resource/modules/auth/domain/models/user */ "./apps/resource/src/modules/auth/domain/models/user.ts");
class UserMapper {
    static toDomain(entity) {
        return new user_1.User({
            userId: entity.userId,
            employeeId: entity.employeeId,
            email: entity.email,
            mobile: entity.mobile,
            password: entity.password,
            accessToken: entity.accessToken,
            expiredAt: entity.expiredAt,
            subscription: entity.subscription,
            roles: entity.roles,
            name: entity.employee?.name,
            employeeNumber: entity.employee?.employeeNumber,
            department: entity.employee?.department,
            position: entity.employee?.position,
        });
    }
    static toEntity(domain) {
        const props = domain.toJSON();
        return {
            userId: props.userId,
            employeeId: props.employeeId,
            email: props.email,
            mobile: props.mobile,
            password: props.password,
            accessToken: props.accessToken,
            expiredAt: props.expiredAt,
            subscription: props.subscription,
            roles: props.roles,
        };
    }
}
exports.UserMapper = UserMapper;


/***/ }),

/***/ "./apps/resource/src/modules/auth/application/services/user.service.ts":
/*!*****************************************************************************!*\
  !*** ./apps/resource/src/modules/auth/application/services/user.service.ts ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_repository_port_1 = __webpack_require__(/*! @resource/modules/auth/domain/ports/user.repository.port */ "./apps/resource/src/modules/auth/domain/ports/user.repository.port.ts");
const user_mapper_1 = __webpack_require__(/*! ../mappers/user.mapper */ "./apps/resource/src/modules/auth/application/mappers/user.mapper.ts");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findAll(repositoryOptions) {
        const users = await this.userRepository.find(repositoryOptions);
        return users.map((user) => user_mapper_1.UserMapper.toDomain(user));
    }
    async findByEmployeeId(employeeId) {
        const user = await this.userRepository.findOne({ where: { employeeId }, relations: ['employee'] });
        return user ? user_mapper_1.UserMapper.toDomain(user) : null;
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({ where: { email }, relations: ['employee'] });
        return user ? user_mapper_1.UserMapper.toDomain(user) : null;
    }
    async findByUserId(userId) {
        const user = await this.userRepository.findOne({ where: { userId }, relations: ['employee'] });
        return user ? user_mapper_1.UserMapper.toDomain(user) : null;
    }
    async save(user, repositoryOptions) {
        const userEntity = user_mapper_1.UserMapper.toEntity(user);
        const savedUser = await this.userRepository.save(userEntity, repositoryOptions);
        return user_mapper_1.UserMapper.toDomain(savedUser);
    }
    async update(user, repositoryOptions) {
        const userEntity = user_mapper_1.UserMapper.toEntity(user);
        const updatedUser = await this.userRepository.update(user.userId, userEntity, repositoryOptions);
        return user_mapper_1.UserMapper.toDomain(updatedUser);
    }
    async addRole(employeeId, role, repositoryOptions) {
        const user = await this.userRepository.findOne({ where: { employeeId }, relations: ['employee'] });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const userDomain = user_mapper_1.UserMapper.toDomain(user);
        userDomain.addRole(role);
        await this.userRepository.update(user.userId, user_mapper_1.UserMapper.toEntity(userDomain), repositoryOptions);
    }
    async removeRole(employeeId, role, repositoryOptions) {
        const user = await this.userRepository.findOne({ where: { employeeId }, relations: ['employee'] });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const userDomain = user_mapper_1.UserMapper.toDomain(user);
        userDomain.removeRole(role);
        await this.userRepository.update(user.userId, user_mapper_1.UserMapper.toEntity(userDomain), repositoryOptions);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('UserRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof user_repository_port_1.UserRepositoryPort !== "undefined" && user_repository_port_1.UserRepositoryPort) === "function" ? _a : Object])
], UserService);


/***/ }),

/***/ "./apps/resource/src/modules/auth/application/usecases/jwt-auth.usecase.ts":
/*!*********************************************************************************!*\
  !*** ./apps/resource/src/modules/auth/application/usecases/jwt-auth.usecase.ts ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthUsecase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const date_util_1 = __webpack_require__(/*! @libs/utils/date.util */ "./libs/utils/date.util.ts");
const user_service_1 = __webpack_require__(/*! ../services/user.service */ "./apps/resource/src/modules/auth/application/services/user.service.ts");
let JwtAuthUsecase = class JwtAuthUsecase {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async validateUser(email, password) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const isPasswordValid = await user.checkPassword(password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        return user;
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        const payload = {
            userId: user.userId,
            employeeId: user.employeeId,
            roles: user.roles,
        };
        const accessToken = this.jwtService.sign(payload);
        const expiredAt = date_util_1.DateUtil.now().addDays(1).format();
        user.updateAccessToken(accessToken, expiredAt);
        await this.userService.update(user);
        return {
            accessToken,
            email: user.email,
            name: user.name,
            department: user.department,
            position: user.position,
            roles: user.roles,
        };
    }
};
exports.JwtAuthUsecase = JwtAuthUsecase;
exports.JwtAuthUsecase = JwtAuthUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _b : Object])
], JwtAuthUsecase);


/***/ }),

/***/ "./apps/resource/src/modules/auth/application/usecases/sso-auth.usecase.ts":
/*!*********************************************************************************!*\
  !*** ./apps/resource/src/modules/auth/application/usecases/sso-auth.usecase.ts ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SsoAuthUsecase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let SsoAuthUsecase = class SsoAuthUsecase {
    async validateUser(email, password) {
        return null;
    }
    async login(loginDto) {
        return null;
    }
};
exports.SsoAuthUsecase = SsoAuthUsecase;
exports.SsoAuthUsecase = SsoAuthUsecase = __decorate([
    (0, common_1.Injectable)()
], SsoAuthUsecase);


/***/ }),

/***/ "./apps/resource/src/modules/auth/application/usecases/user.usecase.ts":
/*!*****************************************************************************!*\
  !*** ./apps/resource/src/modules/auth/application/usecases/user.usecase.ts ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserUsecase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_service_1 = __webpack_require__(/*! ../services/user.service */ "./apps/resource/src/modules/auth/application/services/user.service.ts");
let UserUsecase = class UserUsecase {
    constructor(userService) {
        this.userService = userService;
    }
    async findByUserId(userId) {
        const user = await this.userService.findByUserId(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            userId: user.userId,
            email: user.email,
            mobile: user.mobile,
            name: user.name,
            department: user.department,
            position: user.position,
            roles: user.roles,
        };
    }
    async checkPassword(userId, password) {
        const user = await this.userService.findByUserId(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user.checkPassword(password);
    }
    async changePassword(userId, password) {
        const user = await this.userService.findByUserId(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await user.updatePassword(password);
        await this.userService.update(user);
    }
};
exports.UserUsecase = UserUsecase;
exports.UserUsecase = UserUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], UserUsecase);


/***/ }),

/***/ "./apps/resource/src/modules/auth/auth.module.ts":
/*!*******************************************************!*\
  !*** ./apps/resource/src/modules/auth/auth.module.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const jwt_auth_usecase_1 = __webpack_require__(/*! ./application/usecases/jwt-auth.usecase */ "./apps/resource/src/modules/auth/application/usecases/jwt-auth.usecase.ts");
const sso_auth_usecase_1 = __webpack_require__(/*! ./application/usecases/sso-auth.usecase */ "./apps/resource/src/modules/auth/application/usecases/sso-auth.usecase.ts");
const auth_controller_1 = __webpack_require__(/*! ./infrastructure/adapters/in/web/auth.controller */ "./apps/resource/src/modules/auth/infrastructure/adapters/in/web/auth.controller.ts");
const user_repository_1 = __webpack_require__(/*! ./infrastructure/adapters/out/user.repository */ "./apps/resource/src/modules/auth/infrastructure/adapters/out/user.repository.ts");
const jwt_strategy_1 = __webpack_require__(/*! ./infrastructure/strategies/jwt.strategy */ "./apps/resource/src/modules/auth/infrastructure/strategies/jwt.strategy.ts");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
const user_service_1 = __webpack_require__(/*! ./application/services/user.service */ "./apps/resource/src/modules/auth/application/services/user.service.ts");
const user_controller_1 = __webpack_require__(/*! ./infrastructure/adapters/in/web/user.controller */ "./apps/resource/src/modules/auth/infrastructure/adapters/in/web/user.controller.ts");
const user_usecase_1 = __webpack_require__(/*! ./application/usecases/user.usecase */ "./apps/resource/src/modules/auth/application/usecases/user.usecase.ts");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [passport_1.PassportModule, typeorm_1.TypeOrmModule.forFeature([entities_1.User, entities_1.Employee])],
        providers: [
            jwt_strategy_1.JwtStrategy,
            {
                provide: 'AuthService',
                useClass: process.env.USE_SSO === 'true' ? sso_auth_usecase_1.SsoAuthUsecase : jwt_auth_usecase_1.JwtAuthUsecase,
            },
            user_service_1.UserService,
            user_repository_1.UserRepository,
            {
                provide: 'UserRepositoryPort',
                useClass: user_repository_1.UserRepository,
            },
            user_usecase_1.UserUsecase,
        ],
        controllers: [auth_controller_1.AuthController, user_controller_1.UserController],
        exports: [
            jwt_strategy_1.JwtStrategy,
            {
                provide: 'AuthService',
                useClass: process.env.USE_SSO === 'true' ? sso_auth_usecase_1.SsoAuthUsecase : jwt_auth_usecase_1.JwtAuthUsecase,
            },
            user_service_1.UserService,
            user_usecase_1.UserUsecase,
        ],
    })
], AuthModule);


/***/ }),

/***/ "./apps/resource/src/modules/auth/domain/models/user.ts":
/*!**************************************************************!*\
  !*** ./apps/resource/src/modules/auth/domain/models/user.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
class User {
    constructor(props) {
        this.validateProps(props);
        this.props = props;
    }
    validateProps(props) {
        if (!props.email)
            throw new Error('Email is required');
        if (!props.employeeId)
            throw new Error('Employee ID is required');
        if (!props.password)
            throw new Error('Password is required');
    }
    get userId() {
        return this.props.userId;
    }
    get employeeId() {
        return this.props.employeeId;
    }
    get email() {
        return this.props.email;
    }
    get mobile() {
        return this.props.mobile;
    }
    get password() {
        return this.props.password;
    }
    get accessToken() {
        return this.props.accessToken;
    }
    get expiredAt() {
        return this.props.expiredAt;
    }
    get subscription() {
        return this.props.subscription;
    }
    get roles() {
        return this.props.roles;
    }
    get name() {
        return this.props.name;
    }
    get employeeNumber() {
        return this.props.employeeNumber;
    }
    get department() {
        return this.props.department;
    }
    get position() {
        return this.props.position;
    }
    async checkPassword(password) {
        return await bcrypt.compare(password, this.props.password);
    }
    async updatePassword(password) {
        this.props.password = await bcrypt.hash(password, 10);
    }
    updateAccessToken(token, expiredAt) {
        this.props.accessToken = token;
        this.props.expiredAt = expiredAt;
    }
    addRole(role) {
        if (!this.props.roles.includes(role)) {
            this.props.roles.push(role);
        }
    }
    removeRole(role) {
        this.props.roles = this.props.roles.filter((r) => r !== role);
    }
    toJSON() {
        return { ...this.props };
    }
}
exports.User = User;


/***/ }),

/***/ "./apps/resource/src/modules/auth/domain/ports/auth.service.port.ts":
/*!**************************************************************************!*\
  !*** ./apps/resource/src/modules/auth/domain/ports/auth.service.port.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/resource/src/modules/auth/domain/ports/user.repository.port.ts":
/*!*****************************************************************************!*\
  !*** ./apps/resource/src/modules/auth/domain/ports/user.repository.port.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/resource/src/modules/auth/infrastructure/adapters/in/web/auth.controller.ts":
/*!******************************************************************************************!*\
  !*** ./apps/resource/src/modules/auth/infrastructure/adapters/in/web/auth.controller.ts ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const login_dto_1 = __webpack_require__(/*! @resource/modules/auth/application/dto/login.dto */ "./apps/resource/src/modules/auth/application/dto/login.dto.ts");
const auth_service_port_1 = __webpack_require__(/*! @resource/modules/auth/domain/ports/auth.service.port */ "./apps/resource/src/modules/auth/domain/ports/auth.service.port.ts");
const public_decorator_1 = __webpack_require__(/*! @libs/decorators/public.decorator */ "./libs/decorators/public.decorator.ts");
const api_responses_decorator_1 = __webpack_require__(/*! @libs/decorators/api-responses.decorator */ "./libs/decorators/api-responses.decorator.ts");
const login_response_dto_1 = __webpack_require__(/*! @resource/modules/auth/application/dto/login-response.dto */ "./apps/resource/src/modules/auth/application/dto/login-response.dto.ts");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(loginDto) {
        return this.authService.login(loginDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: '로그인' }),
    (0, api_responses_decorator_1.ApiDataResponse)({ status: 200, description: '로그인 성공', type: login_response_dto_1.LoginResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiTags)('인증'),
    (0, common_1.Controller)('auth'),
    __param(0, (0, common_1.Inject)('AuthService')),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_port_1.AuthService !== "undefined" && auth_service_port_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),

/***/ "./apps/resource/src/modules/auth/infrastructure/adapters/in/web/user.controller.ts":
/*!******************************************************************************************!*\
  !*** ./apps/resource/src/modules/auth/infrastructure/adapters/in/web/user.controller.ts ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const api_responses_decorator_1 = __webpack_require__(/*! @libs/decorators/api-responses.decorator */ "./libs/decorators/api-responses.decorator.ts");
const user_decorator_1 = __webpack_require__(/*! @libs/decorators/user.decorator */ "./libs/decorators/user.decorator.ts");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
const user_usecase_1 = __webpack_require__(/*! @resource/modules/auth/application/usecases/user.usecase */ "./apps/resource/src/modules/auth/application/usecases/user.usecase.ts");
const user_response_dto_1 = __webpack_require__(/*! @resource/modules/auth/application/dto/user-response.dto */ "./apps/resource/src/modules/auth/application/dto/user-response.dto.ts");
const check_password_dto_1 = __webpack_require__(/*! @resource/modules/auth/application/dto/check-password.dto */ "./apps/resource/src/modules/auth/application/dto/check-password.dto.ts");
const change_password_dto_1 = __webpack_require__(/*! @resource/modules/auth/application/dto/change-password.dto */ "./apps/resource/src/modules/auth/application/dto/change-password.dto.ts");
let UserController = class UserController {
    constructor(userUsecase) {
        this.userUsecase = userUsecase;
    }
    findUser(user) {
        return this.userUsecase.findByUserId(user.userId);
    }
    checkPassword(user, checkPasswordDto) {
        return this.userUsecase.checkPassword(user.userId, checkPasswordDto.password);
    }
    changePassword(user, changePasswordDto) {
        return this.userUsecase.changePassword(user.userId, changePasswordDto.newPassword);
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiTags)('sprint0.2'),
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({ summary: '내 상세 정보 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({ status: 200, description: '내 상세 정보 조회 성공', type: user_response_dto_1.UserResponseDto }),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findUser", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.2'),
    (0, common_1.Post)('check-password'),
    (0, swagger_1.ApiOperation)({ summary: '비밀번호 확인' }),
    (0, api_responses_decorator_1.ApiDataResponse)({ status: 200, description: '비밀번호 확인 성공' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _c : Object, typeof (_d = typeof check_password_dto_1.CheckPasswordDto !== "undefined" && check_password_dto_1.CheckPasswordDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "checkPassword", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.2'),
    (0, common_1.Post)('change-password'),
    (0, swagger_1.ApiOperation)({ summary: '비밀번호 변경' }),
    (0, api_responses_decorator_1.ApiDataResponse)({ status: 200, description: '비밀번호 변경 성공' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _e : Object, typeof (_f = typeof change_password_dto_1.ChangePasswordDto !== "undefined" && change_password_dto_1.ChangePasswordDto) === "function" ? _f : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "changePassword", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('유저'),
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_usecase_1.UserUsecase !== "undefined" && user_usecase_1.UserUsecase) === "function" ? _a : Object])
], UserController);


/***/ }),

/***/ "./apps/resource/src/modules/auth/infrastructure/adapters/out/user.repository.ts":
/*!***************************************************************************************!*\
  !*** ./apps/resource/src/modules/auth/infrastructure/adapters/out/user.repository.ts ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
let UserRepository = class UserRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async findOne(repositoryOptions) {
        const repository = this.repository;
        const entity = await repository.findOne({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            order: repositoryOptions?.order,
        });
        return entity;
    }
    async find(repositoryOptions) {
        const repository = this.repository;
        const entities = await repository.find({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            order: repositoryOptions?.order,
            skip: repositoryOptions?.skip,
            take: repositoryOptions?.take,
        });
        return entities;
    }
    async save(user, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.User)
            : this.repository;
        const entity = await repository.save(user);
        return entity;
    }
    async update(userId, userData, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.User)
            : this.repository;
        await repository.update(userId, userData);
        const updated = await repository.findOne({
            where: { userId },
            relations: ['employee'],
        });
        return updated;
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], UserRepository);


/***/ }),

/***/ "./apps/resource/src/modules/auth/infrastructure/strategies/jwt.strategy.ts":
/*!**********************************************************************************!*\
  !*** ./apps/resource/src/modules/auth/infrastructure/strategies/jwt.strategy.ts ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(userRepository, configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('jwt.secret'),
        });
        this.userRepository = userRepository;
    }
    async validate(payload) {
        const user = await this.userRepository.findOne({
            where: { userId: payload.userId },
            relations: ['employee'],
        });
        if (!user || user.userId !== payload.userId) {
            throw new common_1.UnauthorizedException();
        }
        return payload;
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], JwtStrategy);


/***/ }),

/***/ "./apps/resource/src/modules/employee/application/dtos/create-employee.dto.ts":
/*!************************************************************************************!*\
  !*** ./apps/resource/src/modules/employee/application/dtos/create-employee.dto.ts ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateEmployeeDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateEmployeeDto {
}
exports.CreateEmployeeDto = CreateEmployeeDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "position", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/employee/application/dtos/employee-response.dto.ts":
/*!**************************************************************************************!*\
  !*** ./apps/resource/src/modules/employee/application/dtos/employee-response.dto.ts ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class EmployeeResponseDto {
}
exports.EmployeeResponseDto = EmployeeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "position", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/employee/application/dtos/employees-by-department-response.dto.ts":
/*!*****************************************************************************************************!*\
  !*** ./apps/resource/src/modules/employee/application/dtos/employees-by-department-response.dto.ts ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmplyeesByDepartmentResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class EmplyeesByDepartmentResponseDto {
}
exports.EmplyeesByDepartmentResponseDto = EmplyeesByDepartmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EmplyeesByDepartmentResponseDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], EmplyeesByDepartmentResponseDto.prototype, "employees", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/employee/application/dtos/update-employee.dto.ts":
/*!************************************************************************************!*\
  !*** ./apps/resource/src/modules/employee/application/dtos/update-employee.dto.ts ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateEmployeeDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateEmployeeDto {
}
exports.UpdateEmployeeDto = UpdateEmployeeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEmployeeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEmployeeDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEmployeeDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEmployeeDto.prototype, "position", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/employee/application/mappers/employee.mapper.ts":
/*!***********************************************************************************!*\
  !*** ./apps/resource/src/modules/employee/application/mappers/employee.mapper.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeMapper = void 0;
const employee_1 = __webpack_require__(/*! @resource/modules/employee/domain/models/employee */ "./apps/resource/src/modules/employee/domain/models/employee.ts");
class EmployeeMapper {
    static toDomain(entity) {
        return new employee_1.Employee({
            employeeId: entity.employeeId,
            name: entity.name,
            employeeNumber: entity.employeeNumber,
            department: entity.department,
            position: entity.position,
        });
    }
    static toEntity(domain) {
        const props = domain instanceof employee_1.Employee ? domain.toJSON() : domain;
        return {
            employeeId: props.employeeId,
            name: props.name,
            employeeNumber: props.employeeNumber,
            department: props.department,
            position: props.position,
        };
    }
}
exports.EmployeeMapper = EmployeeMapper;


/***/ }),

/***/ "./apps/resource/src/modules/employee/application/services/employee.service.ts":
/*!*************************************************************************************!*\
  !*** ./apps/resource/src/modules/employee/application/services/employee.service.ts ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const employee_repository_port_1 = __webpack_require__(/*! ../../domain/ports/employee.repository.port */ "./apps/resource/src/modules/employee/domain/ports/employee.repository.port.ts");
let EmployeeService = class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    async findAllEmplyeesByDepartment(repositoryOptions) {
        const employees = await this.employeeRepository.findAll();
        const departments = new Map();
        employees.forEach((employee) => {
            if (!departments.has(employee.department)) {
                departments.set(employee.department, []);
            }
            departments.get(employee.department)?.push(employee);
        });
        return Array.from(departments.entries()).map(([department, employees]) => ({
            department,
            employees,
        }));
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('EmployeeRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_repository_port_1.EmployeeRepositoryPort !== "undefined" && employee_repository_port_1.EmployeeRepositoryPort) === "function" ? _a : Object])
], EmployeeService);


/***/ }),

/***/ "./apps/resource/src/modules/employee/domain/models/employee.ts":
/*!**********************************************************************!*\
  !*** ./apps/resource/src/modules/employee/domain/models/employee.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Employee = void 0;
class Employee {
    constructor(props) {
        this.validateProps(props);
        this.props = props;
    }
    validateProps(props) {
        if (!props.name) {
            throw new Error('Employee name is required');
        }
        if (!props.employeeNumber) {
            throw new Error('Employee number is required');
        }
        if (!props.department) {
            throw new Error('Department is required');
        }
        if (!props.position) {
            throw new Error('Position is required');
        }
    }
    get employeeId() {
        return this.props.employeeId;
    }
    get name() {
        return this.props.name;
    }
    get employeeNumber() {
        return this.props.employeeNumber;
    }
    get department() {
        return this.props.department;
    }
    get position() {
        return this.props.position;
    }
    update(props) {
        Object.assign(this.props, props);
    }
    toJSON() {
        return { ...this.props };
    }
}
exports.Employee = Employee;


/***/ }),

/***/ "./apps/resource/src/modules/employee/domain/ports/employee.repository.port.ts":
/*!*************************************************************************************!*\
  !*** ./apps/resource/src/modules/employee/domain/ports/employee.repository.port.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/resource/src/modules/employee/employee.module.ts":
/*!***************************************************************!*\
  !*** ./apps/resource/src/modules/employee/employee.module.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
const employee_service_1 = __webpack_require__(/*! ./application/services/employee.service */ "./apps/resource/src/modules/employee/application/services/employee.service.ts");
const employee_controller_1 = __webpack_require__(/*! ./infrastructure/adapters/in/web/controllers/employee.controller */ "./apps/resource/src/modules/employee/infrastructure/adapters/in/web/controllers/employee.controller.ts");
const employee_repository_1 = __webpack_require__(/*! ./infrastructure/adapters/out/persistence/employee.repository */ "./apps/resource/src/modules/employee/infrastructure/adapters/out/persistence/employee.repository.ts");
let EmployeeModule = class EmployeeModule {
};
exports.EmployeeModule = EmployeeModule;
exports.EmployeeModule = EmployeeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.Employee]),
        ],
        providers: [
            employee_service_1.EmployeeService,
            {
                provide: 'EmployeeRepositoryPort',
                useClass: employee_repository_1.EmployeeRepository,
            },
        ],
        controllers: [employee_controller_1.EmployeeController],
        exports: [employee_service_1.EmployeeService],
    })
], EmployeeModule);


/***/ }),

/***/ "./apps/resource/src/modules/employee/infrastructure/adapters/in/web/controllers/employee.controller.ts":
/*!**************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/employee/infrastructure/adapters/in/web/controllers/employee.controller.ts ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const api_responses_decorator_1 = __webpack_require__(/*! @libs/decorators/api-responses.decorator */ "./libs/decorators/api-responses.decorator.ts");
const employee_service_1 = __webpack_require__(/*! @resource/modules/employee/application/services/employee.service */ "./apps/resource/src/modules/employee/application/services/employee.service.ts");
const role_type_enum_1 = __webpack_require__(/*! @libs/enums/role-type.enum */ "./libs/enums/role-type.enum.ts");
const role_decorator_1 = __webpack_require__(/*! @libs/decorators/role.decorator */ "./libs/decorators/role.decorator.ts");
const employees_by_department_response_dto_1 = __webpack_require__(/*! @resource/modules/employee/application/dtos/employees-by-department-response.dto */ "./apps/resource/src/modules/employee/application/dtos/employees-by-department-response.dto.ts");
let EmployeeController = class EmployeeController {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async findAllEmplyeesByDepartment() {
        return this.employeeService.findAllEmplyeesByDepartment();
    }
};
exports.EmployeeController = EmployeeController;
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Get)('department'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: '부서별 직원 목록 조회 #사용자/참석자설정/모달' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '부서별 직원 목록을 성공적으로 조회했습니다.',
        type: [employees_by_department_response_dto_1.EmplyeesByDepartmentResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], EmployeeController.prototype, "findAllEmplyeesByDepartment", null);
exports.EmployeeController = EmployeeController = __decorate([
    (0, swagger_1.ApiTags)('직원'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('employees'),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_service_1.EmployeeService !== "undefined" && employee_service_1.EmployeeService) === "function" ? _a : Object])
], EmployeeController);


/***/ }),

/***/ "./apps/resource/src/modules/employee/infrastructure/adapters/out/persistence/employee.repository.ts":
/*!***********************************************************************************************************!*\
  !*** ./apps/resource/src/modules/employee/infrastructure/adapters/out/persistence/employee.repository.ts ***!
  \***********************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
const employee_mapper_1 = __webpack_require__(/*! @resource/modules/employee/application/mappers/employee.mapper */ "./apps/resource/src/modules/employee/application/mappers/employee.mapper.ts");
let EmployeeRepository = class EmployeeRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async save(employee, repositoryOptions) {
        const entity = employee_mapper_1.EmployeeMapper.toEntity(employee);
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Employee)
            : this.repository;
        const savedEntity = await repository.save(entity);
        return employee_mapper_1.EmployeeMapper.toDomain(savedEntity);
    }
    async findById(id, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Employee)
            : this.repository;
        const entity = await repository.findOne({ where: { employeeId: id } });
        return entity ? employee_mapper_1.EmployeeMapper.toDomain(entity) : null;
    }
    async findAll(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Employee)
            : this.repository;
        const entities = await repository.find();
        return entities.map((entity) => employee_mapper_1.EmployeeMapper.toDomain(entity));
    }
    async update(id, employee, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Employee)
            : this.repository;
        await repository.update({ employeeId: id }, employee_mapper_1.EmployeeMapper.toEntity(employee));
        const updated = await repository.findOne({ where: { employeeId: id } });
        if (!updated)
            throw new common_1.NotFoundException('Employee not found');
        return employee_mapper_1.EmployeeMapper.toDomain(updated);
    }
    async delete(id, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Employee)
            : this.repository;
        await repository.delete({ employeeId: id });
    }
    async findByEmployeeNumber(employeeNumber, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Employee)
            : this.repository;
        const entity = await repository.findOne({ where: { employeeNumber } });
        return entity ? employee_mapper_1.EmployeeMapper.toDomain(entity) : null;
    }
};
exports.EmployeeRepository = EmployeeRepository;
exports.EmployeeRepository = EmployeeRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Employee)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], EmployeeRepository);


/***/ }),

/***/ "./apps/resource/src/modules/file/application/dtos/file-response.dto.ts":
/*!******************************************************************************!*\
  !*** ./apps/resource/src/modules/file/application/dtos/file-response.dto.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class FileResponseDto {
}
exports.FileResponseDto = FileResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123e4567-e89b-12d3-a456-426614174000' }),
    __metadata("design:type", String)
], FileResponseDto.prototype, "fileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'image.jpg' }),
    __metadata("design:type", String)
], FileResponseDto.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uploads/20250226123456-image.jpg' }),
    __metadata("design:type", String)
], FileResponseDto.prototype, "filePath", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/file/application/mappers/file.mapper.ts":
/*!***************************************************************************!*\
  !*** ./apps/resource/src/modules/file/application/mappers/file.mapper.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileMapper = void 0;
const file_1 = __webpack_require__(/*! @resource/modules/file/domain/models/file */ "./apps/resource/src/modules/file/domain/models/file.ts");
class FileMapper {
    static toDomain(entity) {
        if (!entity)
            return null;
        return new file_1.File({
            fileId: entity.fileId ?? undefined,
            fileName: entity.fileName,
            filePath: entity.filePath,
        });
    }
    static toEntity(domain) {
        if (!domain)
            return null;
        const props = domain.toJSON();
        return {
            fileId: props.fileId,
            fileName: props.fileName,
            filePath: props.filePath,
        };
    }
}
exports.FileMapper = FileMapper;


/***/ }),

/***/ "./apps/resource/src/modules/file/application/services/file.service.ts":
/*!*****************************************************************************!*\
  !*** ./apps/resource/src/modules/file/application/services/file.service.ts ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const file_repository_port_1 = __webpack_require__(/*! ../../domain/ports/file.repository.port */ "./apps/resource/src/modules/file/domain/ports/file.repository.port.ts");
const file_storage_port_1 = __webpack_require__(/*! ../../domain/ports/file-storage.port */ "./apps/resource/src/modules/file/domain/ports/file-storage.port.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const file_mapper_1 = __webpack_require__(/*! ../mappers/file.mapper */ "./apps/resource/src/modules/file/application/mappers/file.mapper.ts");
let FileService = class FileService {
    constructor(fileRepository, fileStorage, configService) {
        this.fileRepository = fileRepository;
        this.fileStorage = fileStorage;
        this.configService = configService;
    }
    async findFileById(fileId) {
        const file = await this.fileRepository.findById(fileId);
        return file_mapper_1.FileMapper.toDomain(file);
    }
    async saveFile(file) {
        const savedFile = await this.fileRepository.save(file_mapper_1.FileMapper.toEntity(file));
        return file_mapper_1.FileMapper.toDomain(savedFile);
    }
    async uploadFile(file) {
        const newFile = await this.fileStorage.uploadFile(file);
        const savedFile = await this.saveFile(newFile);
        return savedFile;
    }
    async deleteFile(fileId) {
        const file = await this.findFileById(fileId);
        if (!file)
            throw new common_1.NotFoundException('File not found');
        await this.fileStorage.deleteFile(file);
        await this.fileRepository.delete(fileId);
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('FileRepositoryPort')),
    __param(1, (0, common_1.Inject)('FileStoragePort')),
    __metadata("design:paramtypes", [typeof (_a = typeof file_repository_port_1.FileRepositoryPort !== "undefined" && file_repository_port_1.FileRepositoryPort) === "function" ? _a : Object, typeof (_b = typeof file_storage_port_1.FileStoragePort !== "undefined" && file_storage_port_1.FileStoragePort) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], FileService);


/***/ }),

/***/ "./apps/resource/src/modules/file/domain/models/file.ts":
/*!**************************************************************!*\
  !*** ./apps/resource/src/modules/file/domain/models/file.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.File = void 0;
class File {
    constructor(props) {
        this.validateProps(props);
        this.props = {
            ...props,
        };
    }
    validateProps(props) {
        if (!props.fileName) {
            throw new Error('File name is required');
        }
        if (!props.filePath) {
            throw new Error('File path is required');
        }
    }
    get fileId() {
        return this.props.fileId;
    }
    get fileName() {
        return this.props.fileName;
    }
    get filePath() {
        return this.props.filePath;
    }
    toJSON() {
        return this.props;
    }
}
exports.File = File;


/***/ }),

/***/ "./apps/resource/src/modules/file/domain/ports/file-storage.port.ts":
/*!**************************************************************************!*\
  !*** ./apps/resource/src/modules/file/domain/ports/file-storage.port.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/resource/src/modules/file/domain/ports/file.repository.port.ts":
/*!*****************************************************************************!*\
  !*** ./apps/resource/src/modules/file/domain/ports/file.repository.port.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/resource/src/modules/file/file.module.ts":
/*!*******************************************************!*\
  !*** ./apps/resource/src/modules/file/file.module.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const file_service_1 = __webpack_require__(/*! ./application/services/file.service */ "./apps/resource/src/modules/file/application/services/file.service.ts");
const file_controller_1 = __webpack_require__(/*! ./infrastructure/adapters/in/web/controllers/file.controller */ "./apps/resource/src/modules/file/infrastructure/adapters/in/web/controllers/file.controller.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
const file_repository_1 = __webpack_require__(/*! ./infrastructure/adapters/out/persistence/file.repository */ "./apps/resource/src/modules/file/infrastructure/adapters/out/persistence/file.repository.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const env_config_1 = __webpack_require__(/*! @libs/configs/env.config */ "./libs/configs/env.config.ts");
const s3_stroage_adapter_1 = __webpack_require__(/*! ./infrastructure/adapters/out/storage/s3-stroage.adapter */ "./apps/resource/src/modules/file/infrastructure/adapters/out/storage/s3-stroage.adapter.ts");
let FileModule = class FileModule {
};
exports.FileModule = FileModule;
exports.FileModule = FileModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.File]), config_1.ConfigModule.forFeature(env_config_1.APP_CONFIG)],
        controllers: [file_controller_1.FileController],
        providers: [
            config_1.ConfigService,
            file_service_1.FileService,
            {
                provide: 'FileRepositoryPort',
                useClass: file_repository_1.FileRepository,
            },
            {
                provide: 'FileStoragePort',
                useClass: s3_stroage_adapter_1.S3StorageAdapter,
            },
        ],
        exports: [file_service_1.FileService],
    })
], FileModule);


/***/ }),

/***/ "./apps/resource/src/modules/file/infrastructure/adapters/in/web/controllers/file.controller.ts":
/*!******************************************************************************************************!*\
  !*** ./apps/resource/src/modules/file/infrastructure/adapters/in/web/controllers/file.controller.ts ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const file_service_1 = __webpack_require__(/*! @resource/modules/file/application/services/file.service */ "./apps/resource/src/modules/file/application/services/file.service.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const public_decorator_1 = __webpack_require__(/*! @libs/decorators/public.decorator */ "./libs/decorators/public.decorator.ts");
const api_responses_decorator_1 = __webpack_require__(/*! @libs/decorators/api-responses.decorator */ "./libs/decorators/api-responses.decorator.ts");
const file_response_dto_1 = __webpack_require__(/*! @resource/modules/file/application/dtos/file-response.dto */ "./apps/resource/src/modules/file/application/dtos/file-response.dto.ts");
let FileController = class FileController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async uploadFile(file) {
        return this.fileService.uploadFile(file);
    }
    async deleteFile(fileId) {
        await this.fileService.deleteFile(fileId);
    }
};
exports.FileController = FileController;
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Post)('upload'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: '파일 업로드' }),
    (0, api_responses_decorator_1.ApiDataResponse)({ status: 200, description: '파일 업로드 성공', type: file_response_dto_1.FileResponseDto }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof Express !== "undefined" && (_b = Express.Multer) !== void 0 && _b.File) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadFile", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Delete)(':fileId'),
    (0, swagger_1.ApiOperation)({ summary: '파일 삭제' }),
    (0, api_responses_decorator_1.ApiDataResponse)({ status: 200, description: '파일 삭제 성공' }),
    __param(0, (0, common_1.Param)('fileId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "deleteFile", null);
exports.FileController = FileController = __decorate([
    (0, swagger_1.ApiTags)('파일'),
    (0, common_1.Controller)('files'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, public_decorator_1.Public)(),
    __metadata("design:paramtypes", [typeof (_a = typeof file_service_1.FileService !== "undefined" && file_service_1.FileService) === "function" ? _a : Object])
], FileController);


/***/ }),

/***/ "./apps/resource/src/modules/file/infrastructure/adapters/out/persistence/file.repository.ts":
/*!***************************************************************************************************!*\
  !*** ./apps/resource/src/modules/file/infrastructure/adapters/out/persistence/file.repository.ts ***!
  \***************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
let FileRepository = class FileRepository {
    constructor(fileRepository) {
        this.fileRepository = fileRepository;
    }
    async save(file) {
        const savedFile = await this.fileRepository.save(file);
        return savedFile;
    }
    async findById(fileId) {
        const fileEntity = await this.fileRepository.findOne({ where: { fileId } });
        return fileEntity;
    }
    async findByFilePath(filePath) {
        const fileEntity = await this.fileRepository.findOne({ where: { filePath } });
        return fileEntity;
    }
    async delete(fileId) {
        await this.fileRepository.delete({ fileId });
    }
};
exports.FileRepository = FileRepository;
exports.FileRepository = FileRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.File)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], FileRepository);


/***/ }),

/***/ "./apps/resource/src/modules/file/infrastructure/adapters/out/storage/s3-stroage.adapter.ts":
/*!**************************************************************************************************!*\
  !*** ./apps/resource/src/modules/file/infrastructure/adapters/out/storage/s3-stroage.adapter.ts ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.S3StorageAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const client_s3_1 = __webpack_require__(/*! @aws-sdk/client-s3 */ "@aws-sdk/client-s3");
const date_util_1 = __webpack_require__(/*! @libs/utils/date.util */ "./libs/utils/date.util.ts");
const file_1 = __webpack_require__(/*! @resource/modules/file/domain/models/file */ "./apps/resource/src/modules/file/domain/models/file.ts");
let S3StorageAdapter = class S3StorageAdapter {
    constructor(configService) {
        this.configService = configService;
        this.bucketName = this.configService.get('S3_BUCKET_NAME');
        this.s3Client = new client_s3_1.S3Client({
            region: this.configService.get('S3_REGION'),
            endpoint: this.configService.get('S3_ENDPOINT'),
            credentials: {
                accessKeyId: this.configService.get('S3_ACCESS_KEY'),
                secretAccessKey: this.configService.get('S3_SECRET_KEY'),
            },
            forcePathStyle: true,
        });
    }
    async uploadFile(file, options) {
        const fileExtension = file.originalname.split('.').pop();
        const fileName = `${date_util_1.DateUtil.now().format('YYYYMMDDHHmmss')}.${fileExtension}`;
        try {
            await this.s3Client.send(new client_s3_1.PutObjectCommand({
                Bucket: this.bucketName,
                Key: fileName,
                Body: file.buffer,
                ContentType: file.mimetype,
            }));
            const newFile = new file_1.File({
                fileName: fileName,
                filePath: this.getFileUrl(fileName),
            });
            return newFile;
        }
        catch (error) {
            throw new Error(`Failed to upload file to S3: ${error.message}`);
        }
    }
    async deleteFile(file) {
        try {
            await this.s3Client.send(new client_s3_1.DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: file.fileName,
            }));
        }
        catch (error) {
            throw new Error(`Failed to delete file from S3: ${error.message}`);
        }
    }
    getFileUrl(fileKey) {
        return `${this.configService.get('S3_ENDPOINT').replace('s3', 'object/public')}/${this.bucketName}/${fileKey}`;
    }
};
exports.S3StorageAdapter = S3StorageAdapter;
exports.S3StorageAdapter = S3StorageAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], S3StorageAdapter);


/***/ }),

/***/ "./apps/resource/src/modules/notification/application/services/adapter.service.ts":
/*!****************************************************************************************!*\
  !*** ./apps/resource/src/modules/notification/application/services/adapter.service.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdapterService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const notification_repository_port_1 = __webpack_require__(/*! @resource/modules/notification/domain/ports/notification.repository.port */ "./apps/resource/src/modules/notification/domain/ports/notification.repository.port.ts");
let AdapterService = class AdapterService {
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    async subscribe(userId, subscription) {
    }
    async unsubscribe(userId, subscription) {
    }
    async send(notification) {
    }
    async resend(id) {
    }
};
exports.AdapterService = AdapterService;
exports.AdapterService = AdapterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('NotificationRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof notification_repository_port_1.NotificationRepositoryPort !== "undefined" && notification_repository_port_1.NotificationRepositoryPort) === "function" ? _a : Object])
], AdapterService);


/***/ }),

/***/ "./apps/resource/src/modules/notification/application/services/notification.service.ts":
/*!*********************************************************************************************!*\
  !*** ./apps/resource/src/modules/notification/application/services/notification.service.ts ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const notification_repository_port_1 = __webpack_require__(/*! @resource/modules/notification/domain/ports/notification.repository.port */ "./apps/resource/src/modules/notification/domain/ports/notification.repository.port.ts");
const notification_entity_1 = __webpack_require__(/*! @libs/entities/notification.entity */ "./libs/entities/notification.entity.ts");
let NotificationService = class NotificationService {
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    async findAllByEmployeeId(employeeId) {
        return [];
    }
    async findById(id) {
        return new notification_entity_1.Notification();
    }
    async markAsRead(id) {
    }
    async markAsUnread(id) {
    }
    async markAllAsRead() {
    }
    async delete(id) {
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('NotificationRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof notification_repository_port_1.NotificationRepositoryPort !== "undefined" && notification_repository_port_1.NotificationRepositoryPort) === "function" ? _a : Object])
], NotificationService);


/***/ }),

/***/ "./apps/resource/src/modules/notification/domain/ports/notification.repository.port.ts":
/*!*********************************************************************************************!*\
  !*** ./apps/resource/src/modules/notification/domain/ports/notification.repository.port.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/resource/src/modules/notification/infrastructure/adapters/in/web/controllers/notification.controller.ts":
/*!**********************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/notification/infrastructure/adapters/in/web/controllers/notification.controller.ts ***!
  \**********************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationController = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const notification_service_1 = __webpack_require__(/*! @resource/modules/notification/application/services/notification.service */ "./apps/resource/src/modules/notification/application/services/notification.service.ts");
const user_decorator_1 = __webpack_require__(/*! @libs/decorators/user.decorator */ "./libs/decorators/user.decorator.ts");
const adapter_service_1 = __webpack_require__(/*! @resource/modules/notification/application/services/adapter.service */ "./apps/resource/src/modules/notification/application/services/adapter.service.ts");
let NotificationController = class NotificationController {
    constructor(notificationService, adapterService) {
        this.notificationService = notificationService;
        this.adapterService = adapterService;
    }
    async subscribe(subscription) {
    }
    async unsubscribe(subscription) {
    }
    async send(notification) {
    }
    async resend(notificationId) {
    }
    async findAllByEmployeeId(employeeId) {
    }
    async findById(notificationId) {
    }
    async markAsRead(notificationId) {
    }
    async markAsUnread(notificationId) {
    }
    async markAllAsRead(employeeId) {
    }
    async delete(notificationId) {
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, common_1.Post)('subscribe'),
    (0, swagger_1.ApiOperation)({ summary: '웹 푸시 구독' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof PushSubscription !== "undefined" && PushSubscription) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "subscribe", null);
__decorate([
    (0, common_1.Post)('unsubscribe'),
    (0, swagger_1.ApiOperation)({ summary: '웹 푸시 구독 취소' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof PushSubscription !== "undefined" && PushSubscription) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "unsubscribe", null);
__decorate([
    (0, common_1.Post)('send'),
    (0, swagger_1.ApiOperation)({ summary: '웹 푸시 알림 전송' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof Notification !== "undefined" && Notification) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "send", null);
__decorate([
    (0, common_1.Post)('resend/:notificationId'),
    (0, swagger_1.ApiOperation)({ summary: '알람 재전송' }),
    __param(0, (0, common_1.Param)('notificationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "resend", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '알람 목록 조회' }),
    __param(0, (0, user_decorator_1.User)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "findAllByEmployeeId", null);
__decorate([
    (0, common_1.Get)(':notificationId'),
    (0, swagger_1.ApiOperation)({ summary: '알람 상세 조회' }),
    __param(0, (0, common_1.Param)('notificationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':notificationId/read'),
    (0, swagger_1.ApiOperation)({ summary: '알람 읽음 처리' }),
    __param(0, (0, common_1.Param)('notificationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Patch)(':notificationId/unread'),
    (0, swagger_1.ApiOperation)({ summary: '알람 읽지 않음 처리' }),
    __param(0, (0, common_1.Param)('notificationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "markAsUnread", null);
__decorate([
    (0, common_1.Patch)(':employeeId/readAll'),
    (0, swagger_1.ApiOperation)({ summary: '모든 알람 읽음 처리' }),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "markAllAsRead", null);
__decorate([
    (0, common_1.Delete)(':notificationId'),
    (0, swagger_1.ApiOperation)({ summary: '알람 삭제' }),
    __param(0, (0, common_1.Param)('notificationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "delete", null);
exports.NotificationController = NotificationController = __decorate([
    (0, swagger_1.ApiTags)('알림'),
    (0, common_1.Controller)('notifications'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [typeof (_a = typeof notification_service_1.NotificationService !== "undefined" && notification_service_1.NotificationService) === "function" ? _a : Object, typeof (_b = typeof adapter_service_1.AdapterService !== "undefined" && adapter_service_1.AdapterService) === "function" ? _b : Object])
], NotificationController);


/***/ }),

/***/ "./apps/resource/src/modules/notification/infrastructure/adapters/out/device/fcm-push.adapter.ts":
/*!*******************************************************************************************************!*\
  !*** ./apps/resource/src/modules/notification/infrastructure/adapters/out/device/fcm-push.adapter.ts ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FCMAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const adapter_service_1 = __webpack_require__(/*! @resource/modules/notification/application/services/adapter.service */ "./apps/resource/src/modules/notification/application/services/adapter.service.ts");
class FCMSubscription {
}
class FCMPayload {
}
class FCMSendResult {
}
let FCMAdapter = class FCMAdapter {
    constructor(configService, adapterService) {
        this.configService = configService;
        this.adapterService = adapterService;
    }
    async initialize() {
    }
    async sendNotification(subscriptions, payload) {
        return new FCMSendResult();
    }
    validateSubscription(subscription) {
        return true;
    }
};
exports.FCMAdapter = FCMAdapter;
exports.FCMAdapter = FCMAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof adapter_service_1.AdapterService !== "undefined" && adapter_service_1.AdapterService) === "function" ? _b : Object])
], FCMAdapter);


/***/ }),

/***/ "./apps/resource/src/modules/notification/infrastructure/adapters/out/persistence/notification.repository.ts":
/*!*******************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/notification/infrastructure/adapters/out/persistence/notification.repository.ts ***!
  \*******************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationRepository = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const notification_entity_1 = __webpack_require__(/*! @libs/entities/notification.entity */ "./libs/entities/notification.entity.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_2 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
let NotificationRepository = class NotificationRepository {
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    async save(notification, options) {
        const repository = options
            ? options.queryRunner.manager.getRepository(notification_entity_1.Notification)
            : this.notificationRepository;
        return repository.save(notification);
    }
    async findById(notificationId, options) {
        const repository = options
            ? options.queryRunner.manager.getRepository(notification_entity_1.Notification)
            : this.notificationRepository;
        return repository.findOne({
            where: { notificationId },
        });
    }
    async findByEmployeeId(employeeId, options) {
        const repository = options
            ? options.queryRunner.manager.getRepository(notification_entity_1.Notification)
            : this.notificationRepository;
        return repository.find({
            where: { employees: { employeeId } },
        });
    }
    async update(notification, options) {
        const repository = options
            ? options.queryRunner.manager.getRepository(notification_entity_1.Notification)
            : this.notificationRepository;
        return repository.save(notification);
    }
    async delete(notificationId, options) {
        const repository = options
            ? options.queryRunner.manager.getRepository(notification_entity_1.Notification)
            : this.notificationRepository;
        await repository.delete(notificationId);
    }
    async markAsRead(notificationId, options) {
        const repository = options
            ? options.queryRunner.manager.getRepository(notification_entity_1.Notification)
            : this.notificationRepository;
        await repository.update(notificationId, { isRead: true });
    }
    async markAllAsRead(employeeId, options) {
        const repository = options
            ? options.queryRunner.manager.getRepository(notification_entity_1.Notification)
            : this.notificationRepository;
        await repository.update({ employees: { employeeId } }, { isRead: true });
    }
};
exports.NotificationRepository = NotificationRepository;
exports.NotificationRepository = NotificationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(notification_entity_1.Notification)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object])
], NotificationRepository);


/***/ }),

/***/ "./apps/resource/src/modules/notification/notification.module.ts":
/*!***********************************************************************!*\
  !*** ./apps/resource/src/modules/notification/notification.module.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const notification_entity_1 = __webpack_require__(/*! @libs/entities/notification.entity */ "./libs/entities/notification.entity.ts");
const notification_repository_1 = __webpack_require__(/*! ./infrastructure/adapters/out/persistence/notification.repository */ "./apps/resource/src/modules/notification/infrastructure/adapters/out/persistence/notification.repository.ts");
const notification_controller_1 = __webpack_require__(/*! ./infrastructure/adapters/in/web/controllers/notification.controller */ "./apps/resource/src/modules/notification/infrastructure/adapters/in/web/controllers/notification.controller.ts");
const notification_service_1 = __webpack_require__(/*! ./application/services/notification.service */ "./apps/resource/src/modules/notification/application/services/notification.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const env_config_1 = __webpack_require__(/*! @libs/configs/env.config */ "./libs/configs/env.config.ts");
const adapter_service_1 = __webpack_require__(/*! ./application/services/adapter.service */ "./apps/resource/src/modules/notification/application/services/adapter.service.ts");
const fcm_push_adapter_1 = __webpack_require__(/*! ./infrastructure/adapters/out/device/fcm-push.adapter */ "./apps/resource/src/modules/notification/infrastructure/adapters/out/device/fcm-push.adapter.ts");
let NotificationModule = class NotificationModule {
};
exports.NotificationModule = NotificationModule;
exports.NotificationModule = NotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([notification_entity_1.Notification]),
            config_1.ConfigModule.forFeature(env_config_1.WEB_PUSH_CONFIG),
        ],
        providers: [
            config_1.ConfigService,
            notification_service_1.NotificationService,
            adapter_service_1.AdapterService,
            {
                provide: 'NotificationRepositoryPort',
                useClass: notification_repository_1.NotificationRepository,
            },
            {
                provide: 'PushNotificationServicePort',
                useClass: fcm_push_adapter_1.FCMAdapter,
            },
        ],
        controllers: [notification_controller_1.NotificationController],
        exports: [
            notification_service_1.NotificationService,
            adapter_service_1.AdapterService,
            {
                provide: 'NotificationRepositoryPort',
                useClass: notification_repository_1.NotificationRepository,
            },
            {
                provide: 'PushNotificationServicePort',
                useClass: fcm_push_adapter_1.FCMAdapter,
            },
        ],
    })
], NotificationModule);


/***/ }),

/***/ "./apps/resource/src/modules/reservation/application/dtos/create-reservation.dto.ts":
/*!******************************************************************************************!*\
  !*** ./apps/resource/src/modules/reservation/application/dtos/create-reservation.dto.ts ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateReservationDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const resource_type_enum_1 = __webpack_require__(/*! @libs/enums/resource-type.enum */ "./libs/enums/resource-type.enum.ts");
class CreateReservationDto {
}
exports.CreateReservationDto = CreateReservationDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: resource_type_enum_1.ResourceType }),
    (0, class_validator_1.IsEnum)(resource_type_enum_1.ResourceType),
    __metadata("design:type", typeof (_a = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _a : Object)
], CreateReservationDto.prototype, "resourceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-01-01 00:00:00' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-01-01 00:00:00' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateReservationDto.prototype, "isAllDay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateReservationDto.prototype, "notifyBeforeStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [Number], example: [10, 20] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateReservationDto.prototype, "notifyMinutesBeforeStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateReservationDto.prototype, "reserverIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateReservationDto.prototype, "participantIds", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/reservation/application/dtos/reservation-response.dto.ts":
/*!********************************************************************************************!*\
  !*** ./apps/resource/src/modules/reservation/application/dtos/reservation-response.dto.ts ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateReservationResponseDto = exports.ReservationWithRelationsResponseDto = exports.ReservationWithResourceResponseDto = exports.ReservationParticipantResponseDto = exports.ReservationResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const reservation_type_enum_1 = __webpack_require__(/*! @libs/enums/reservation-type.enum */ "./libs/enums/reservation-type.enum.ts");
const reservation_type_enum_2 = __webpack_require__(/*! @libs/enums/reservation-type.enum */ "./libs/enums/reservation-type.enum.ts");
const dtos_index_1 = __webpack_require__(/*! @resource/dtos.index */ "./apps/resource/src/dtos.index.ts");
class ReservationResponseDto {
    constructor(reservation) {
        console.log(reservation);
        this.reservationId = reservation.reservationId;
        this.resourceId = reservation.resourceId;
        this.title = reservation.title;
        this.description = reservation.description;
        this.startDate = reservation.startDate;
        this.endDate = reservation.endDate;
        this.status = reservation.status;
        this.isAllDay = reservation.isAllDay;
        this.notifyBeforeStart = reservation.notifyBeforeStart;
        this.notifyMinutesBeforeStart = reservation.notifyMinutesBeforeStart;
    }
}
exports.ReservationResponseDto = ReservationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReservationResponseDto.prototype, "reservationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ReservationResponseDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ReservationResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ReservationResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ReservationResponseDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ReservationResponseDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: reservation_type_enum_1.ReservationStatus, required: false }),
    __metadata("design:type", typeof (_a = typeof reservation_type_enum_1.ReservationStatus !== "undefined" && reservation_type_enum_1.ReservationStatus) === "function" ? _a : Object)
], ReservationResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], ReservationResponseDto.prototype, "isAllDay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], ReservationResponseDto.prototype, "notifyBeforeStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [Number] }),
    __metadata("design:type", Array)
], ReservationResponseDto.prototype, "notifyMinutesBeforeStart", void 0);
class ReservationParticipantResponseDto {
}
exports.ReservationParticipantResponseDto = ReservationParticipantResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReservationParticipantResponseDto.prototype, "participantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReservationParticipantResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReservationParticipantResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => dtos_index_1.EmployeeResponseDto, required: false }),
    __metadata("design:type", typeof (_b = typeof dtos_index_1.EmployeeResponseDto !== "undefined" && dtos_index_1.EmployeeResponseDto) === "function" ? _b : Object)
], ReservationParticipantResponseDto.prototype, "employee", void 0);
class ReservationWithResourceResponseDto extends ReservationResponseDto {
    constructor(reservation) {
        super(reservation);
        this.resource = reservation.resource;
    }
}
exports.ReservationWithResourceResponseDto = ReservationWithResourceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => dtos_index_1.ResourceResponseDto, required: false }),
    __metadata("design:type", typeof (_c = typeof dtos_index_1.ResourceResponseDto !== "undefined" && dtos_index_1.ResourceResponseDto) === "function" ? _c : Object)
], ReservationWithResourceResponseDto.prototype, "resource", void 0);
class ReservationWithRelationsResponseDto extends ReservationResponseDto {
    constructor(reservation) {
        super(reservation);
        this.resource = reservation.resource;
        this.reservers = reservation.participants?.filter((participant) => participant.type === reservation_type_enum_2.ParticipantsType.RESERVER);
        this.participants = reservation.participants?.filter((participant) => participant.type === reservation_type_enum_2.ParticipantsType.PARTICIPANT);
    }
}
exports.ReservationWithRelationsResponseDto = ReservationWithRelationsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => dtos_index_1.ResourceResponseDto, required: false }),
    __metadata("design:type", typeof (_d = typeof dtos_index_1.ResourceResponseDto !== "undefined" && dtos_index_1.ResourceResponseDto) === "function" ? _d : Object)
], ReservationWithRelationsResponseDto.prototype, "resource", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ReservationParticipantResponseDto], required: false }),
    __metadata("design:type", Array)
], ReservationWithRelationsResponseDto.prototype, "reservers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ReservationParticipantResponseDto], required: false }),
    __metadata("design:type", Array)
], ReservationWithRelationsResponseDto.prototype, "participants", void 0);
class CreateReservationResponseDto {
}
exports.CreateReservationResponseDto = CreateReservationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123e4567-e89b-12d3-a456-426614174000' }),
    __metadata("design:type", String)
], CreateReservationResponseDto.prototype, "reservationId", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/reservation/application/dtos/update-reservation.dto.ts":
/*!******************************************************************************************!*\
  !*** ./apps/resource/src/modules/reservation/application/dtos/update-reservation.dto.ts ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateReservationCcReceipientDto = exports.UpdateReservationParticipantsDto = exports.UpdateReservationStatusDto = exports.UpdateReservationTimeDto = exports.UpdateReservationTitleDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const reservation_type_enum_1 = __webpack_require__(/*! @libs/enums/reservation-type.enum */ "./libs/enums/reservation-type.enum.ts");
class UpdateReservationTitleDto {
}
exports.UpdateReservationTitleDto = UpdateReservationTitleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReservationTitleDto.prototype, "title", void 0);
class UpdateReservationTimeDto {
}
exports.UpdateReservationTimeDto = UpdateReservationTimeDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateReservationTimeDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateReservationTimeDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateReservationTimeDto.prototype, "isAllDay", void 0);
class UpdateReservationStatusDto {
}
exports.UpdateReservationStatusDto = UpdateReservationStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: reservation_type_enum_1.ReservationStatus }),
    (0, class_validator_1.IsEnum)(reservation_type_enum_1.ReservationStatus),
    __metadata("design:type", typeof (_a = typeof reservation_type_enum_1.ReservationStatus !== "undefined" && reservation_type_enum_1.ReservationStatus) === "function" ? _a : Object)
], UpdateReservationStatusDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReservationStatusDto.prototype, "rejectReason", void 0);
class UpdateReservationParticipantsDto {
}
exports.UpdateReservationParticipantsDto = UpdateReservationParticipantsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateReservationParticipantsDto.prototype, "participantIds", void 0);
class UpdateReservationCcReceipientDto {
}
exports.UpdateReservationCcReceipientDto = UpdateReservationCcReceipientDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateReservationCcReceipientDto.prototype, "ccReceipientIds", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/reservation/application/services/participant.service.ts":
/*!*******************************************************************************************!*\
  !*** ./apps/resource/src/modules/reservation/application/services/participant.service.ts ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ParticipantService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const reservation_participant_repository_port_1 = __webpack_require__(/*! ../../domain/ports/reservation-participant.repository.port */ "./apps/resource/src/modules/reservation/domain/ports/reservation-participant.repository.port.ts");
let ParticipantService = class ParticipantService {
    constructor(participantRepository) {
        this.participantRepository = participantRepository;
    }
    async save(participant, repositoryOptions) {
        return this.participantRepository.save(participant, repositoryOptions);
    }
    async findAll(repositoryOptions) {
        return this.participantRepository.findAll(repositoryOptions);
    }
    async findOne(repositoryOptions) {
        return this.participantRepository.findOne(repositoryOptions);
    }
    async update(id, participant, repositoryOptions) {
        return this.participantRepository.update(id, participant, repositoryOptions);
    }
    async delete(id, repositoryOptions) {
        return this.participantRepository.delete(id, repositoryOptions);
    }
};
exports.ParticipantService = ParticipantService;
exports.ParticipantService = ParticipantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ReservationParticipantRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof reservation_participant_repository_port_1.ReservationParticipantRepositoryPort !== "undefined" && reservation_participant_repository_port_1.ReservationParticipantRepositoryPort) === "function" ? _a : Object])
], ParticipantService);


/***/ }),

/***/ "./apps/resource/src/modules/reservation/application/services/reservation.service.ts":
/*!*******************************************************************************************!*\
  !*** ./apps/resource/src/modules/reservation/application/services/reservation.service.ts ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReservationService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const reservation_repository_port_1 = __webpack_require__(/*! ../../domain/ports/reservation.repository.port */ "./apps/resource/src/modules/reservation/domain/ports/reservation.repository.port.ts");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let ReservationService = class ReservationService {
    constructor(reservationRepository) {
        this.reservationRepository = reservationRepository;
    }
    create(createDto) {
        const reservation = this.reservationRepository.create(createDto);
        return reservation;
    }
    async save(reservation, repositoryOptions) {
        const savedReservation = await this.reservationRepository.save(reservation, repositoryOptions);
        return savedReservation;
    }
    async findAll(repositoryOptions) {
        const reservations = await this.reservationRepository.findAll(repositoryOptions);
        return reservations;
    }
    async findOne(repositoryOptions) {
        const reservation = await this.reservationRepository.findOne(repositoryOptions);
        return reservation;
    }
    async update(reservationId, reservation, repositoryOptions) {
        const updatedReservation = await this.reservationRepository.update(reservationId, reservation, repositoryOptions);
        return updatedReservation;
    }
    async findConflictingReservations(resourceId, startDate, endDate) {
        return this.findAll({
            where: {
                resourceId,
                startDate: (0, typeorm_1.MoreThanOrEqual)(startDate),
                endDate: (0, typeorm_1.LessThanOrEqual)(endDate),
            },
        });
    }
};
exports.ReservationService = ReservationService;
exports.ReservationService = ReservationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ReservationRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof reservation_repository_port_1.ReservationRepositoryPort !== "undefined" && reservation_repository_port_1.ReservationRepositoryPort) === "function" ? _a : Object])
], ReservationService);


/***/ }),

/***/ "./apps/resource/src/modules/reservation/application/usecases/reservation.usecase.ts":
/*!*******************************************************************************************!*\
  !*** ./apps/resource/src/modules/reservation/application/usecases/reservation.usecase.ts ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReservationUsecase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const reservation_response_dto_1 = __webpack_require__(/*! ../dtos/reservation-response.dto */ "./apps/resource/src/modules/reservation/application/dtos/reservation-response.dto.ts");
const reservation_type_enum_1 = __webpack_require__(/*! @libs/enums/reservation-type.enum */ "./libs/enums/reservation-type.enum.ts");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const date_util_1 = __webpack_require__(/*! @libs/utils/date.util */ "./libs/utils/date.util.ts");
const reservation_service_1 = __webpack_require__(/*! ../services/reservation.service */ "./apps/resource/src/modules/reservation/application/services/reservation.service.ts");
const participant_service_1 = __webpack_require__(/*! ../services/participant.service */ "./apps/resource/src/modules/reservation/application/services/participant.service.ts");
let ReservationUsecase = class ReservationUsecase {
    constructor(reservationService, participantService, dataSource) {
        this.reservationService = reservationService;
        this.participantService = participantService;
        this.dataSource = dataSource;
    }
    async makeReservation(createDto) {
        const conflicts = await this.reservationService.findConflictingReservations(createDto.resourceId, date_util_1.DateUtil.parse(createDto.startDate).format(), date_util_1.DateUtil.parse(createDto.endDate).format());
        if (conflicts.length > 0) {
            throw new common_1.BadRequestException('Reservation time conflict');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const reservation = this.reservationService.create(createDto);
            const savedReservation = await this.reservationService.save(reservation, { queryRunner });
            await Promise.all([
                ...createDto.reserverIds.map((employeeId) => this.participantService.save({
                    reservationId: savedReservation.reservationId,
                    employeeId,
                    type: reservation_type_enum_1.ParticipantsType.RESERVER,
                }, { queryRunner })),
                ...createDto.participantIds.map((employeeId) => this.participantService.save({
                    reservationId: savedReservation.reservationId,
                    employeeId,
                    type: reservation_type_enum_1.ParticipantsType.PARTICIPANT,
                }, { queryRunner })),
            ]);
            await queryRunner.commitTransaction();
            return {
                reservationId: savedReservation.reservationId,
            };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async findReservationDetail(reservationId) {
        const reservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: [
                'resource',
                'resource.vehicleInfo',
                'resource.meetingRoomInfo',
                'resource.accommodationInfo',
                'participants',
                'participants.employee',
            ],
        });
        const reservationResponseDto = new reservation_response_dto_1.ReservationWithRelationsResponseDto(reservation);
        return reservationResponseDto;
    }
    async findMyReservationList(employeeId, startDate, resourceType) {
        const where = { participants: { employeeId, type: reservation_type_enum_1.ParticipantsType.RESERVER } };
        if (startDate) {
            where.startDate = (0, typeorm_1.Between)(startDate + ' 00:00:00', startDate + ' 23:59:59');
        }
        if (resourceType) {
            where.resource = {
                type: resourceType,
            };
        }
        const reservations = await this.reservationService.findAll({
            where,
        });
        const reservationWithParticipants = await this.reservationService.findAll({
            where: {
                reservationId: (0, typeorm_1.In)(reservations.map((r) => r.reservationId)),
            },
            relations: ['resource', 'participants', 'participants.employee'],
        });
        return reservationWithParticipants.map((reservation) => new reservation_response_dto_1.ReservationWithRelationsResponseDto(reservation));
    }
    async findReservationList(startDate, endDate, resourceType, resourceId, status) {
        if (startDate && endDate && startDate > endDate) {
            throw new common_1.BadRequestException('Start date must be before end date');
        }
        if (status && status.filter((s) => reservation_type_enum_1.ReservationStatus[s]).length === 0) {
            throw new common_1.BadRequestException('Invalid status');
        }
        const regex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
        let where = {};
        if (status && status.length > 0) {
            where.status = (0, typeorm_1.In)(status);
        }
        if (resourceType) {
            where.resource = {
                type: resourceType,
            };
        }
        if (resourceId) {
            where.resource = {
                resourceId,
            };
        }
        if (startDate && endDate) {
            where = {
                ...where,
                startDate: (0, typeorm_1.LessThan)(regex.test(endDate) ? endDate : endDate + ' 23:59:59'),
                endDate: (0, typeorm_1.MoreThan)(regex.test(startDate) ? startDate : startDate + ' 00:00:00'),
            };
        }
        if (!startDate && !endDate) {
            const thisMonth = date_util_1.DateUtil.format(new Date(), 'YYYY-MM');
            const startDate = `${thisMonth}-01 00:00:00`;
            const endDate = `${thisMonth}-31 23:59:59`;
            where = {
                ...where,
                startDate: (0, typeorm_1.MoreThan)(startDate),
                endDate: (0, typeorm_1.LessThan)(endDate),
            };
        }
        const reservations = await this.reservationService.findAll({ where, relations: ['resource'] });
        const reservationResponseDtos = reservations.map((reservation) => new reservation_response_dto_1.ReservationWithResourceResponseDto(reservation));
        return reservationResponseDtos;
    }
    async updateTitle(reservationId, updateDto, repositoryOptions) {
        const reservation = await this.reservationService.findOne({ where: { reservationId } });
        if (!reservation) {
            throw new common_1.NotFoundException('Reservation not found');
        }
        const updatedReservation = await this.reservationService.update(reservationId, updateDto, repositoryOptions);
        return new reservation_response_dto_1.ReservationResponseDto(updatedReservation);
    }
    async updateTime(reservationId, updateDto) {
        const reservation = await this.reservationService.findOne({ where: { reservationId } });
        if (!reservation) {
            throw new common_1.NotFoundException('Reservation not found');
        }
        const updatedReservation = await this.reservationService.update(reservationId, updateDto);
        return new reservation_response_dto_1.ReservationResponseDto(updatedReservation);
    }
    async updateStatus(reservationId, updateDto, employeeId, isAdmin) {
        const reservation = await this.reservationService.findOne({ where: { reservationId } });
        if (!reservation) {
            throw new common_1.NotFoundException('Reservation not found');
        }
        const reserver = await this.participantService.findOne({
            where: { reservationId, type: reservation_type_enum_1.ParticipantsType.RESERVER },
        });
        const isMyReservation = reserver?.employeeId === employeeId;
        if (isMyReservation || isAdmin) {
            const updatedReservation = await this.reservationService.update(reservationId, updateDto);
            return new reservation_response_dto_1.ReservationResponseDto(updatedReservation);
        }
        throw new common_1.ForbiddenException('You are not authorized to update this reservation');
    }
    async updateParticipants(reservationId, updateDto) {
        const participants = await this.participantService.findAll({ where: { reservationId } });
        await Promise.all(participants.map((participant) => this.participantService.delete(participant.participantId)));
        await Promise.all(updateDto.participantIds.map((employeeId) => this.participantService.save({
            reservationId,
            employeeId,
            type: reservation_type_enum_1.ParticipantsType.PARTICIPANT,
        })));
        const updatedReservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: ['participants'],
        });
        return new reservation_response_dto_1.ReservationResponseDto(updatedReservation);
    }
    async updateCcReceipient(reservationId, updateDto) {
        const ccReceipients = await this.participantService.findAll({ where: { reservationId } });
        await Promise.all(ccReceipients.map((ccReceipient) => this.participantService.delete(ccReceipient.participantId)));
        await Promise.all(updateDto.ccReceipientIds.map((employeeId) => this.participantService.save({
            reservationId,
            employeeId,
            type: reservation_type_enum_1.ParticipantsType.CC_RECEIPIENT,
        })));
        const updatedReservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: ['participants'],
        });
        return new reservation_response_dto_1.ReservationResponseDto(updatedReservation);
    }
};
exports.ReservationUsecase = ReservationUsecase;
exports.ReservationUsecase = ReservationUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof reservation_service_1.ReservationService !== "undefined" && reservation_service_1.ReservationService) === "function" ? _a : Object, typeof (_b = typeof participant_service_1.ParticipantService !== "undefined" && participant_service_1.ParticipantService) === "function" ? _b : Object, typeof (_c = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _c : Object])
], ReservationUsecase);


/***/ }),

/***/ "./apps/resource/src/modules/reservation/domain/ports/reservation-participant.repository.port.ts":
/*!*******************************************************************************************************!*\
  !*** ./apps/resource/src/modules/reservation/domain/ports/reservation-participant.repository.port.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/resource/src/modules/reservation/domain/ports/reservation.repository.port.ts":
/*!*******************************************************************************************!*\
  !*** ./apps/resource/src/modules/reservation/domain/ports/reservation.repository.port.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/resource/src/modules/reservation/infrastructure/adapters/in/web/controllers/reservation.controller.ts":
/*!********************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/reservation/infrastructure/adapters/in/web/controllers/reservation.controller.ts ***!
  \********************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReservationController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const role_decorator_1 = __webpack_require__(/*! @libs/decorators/role.decorator */ "./libs/decorators/role.decorator.ts");
const role_type_enum_1 = __webpack_require__(/*! @libs/enums/role-type.enum */ "./libs/enums/role-type.enum.ts");
const create_reservation_dto_1 = __webpack_require__(/*! ../../../../../application/dtos/create-reservation.dto */ "./apps/resource/src/modules/reservation/application/dtos/create-reservation.dto.ts");
const api_responses_decorator_1 = __webpack_require__(/*! @libs/decorators/api-responses.decorator */ "./libs/decorators/api-responses.decorator.ts");
const dtos_index_1 = __webpack_require__(/*! @resource/dtos.index */ "./apps/resource/src/dtos.index.ts");
const reservation_usecase_1 = __webpack_require__(/*! ../../../../../application/usecases/reservation.usecase */ "./apps/resource/src/modules/reservation/application/usecases/reservation.usecase.ts");
const user_decorator_1 = __webpack_require__(/*! @libs/decorators/user.decorator */ "./libs/decorators/user.decorator.ts");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
const resource_type_enum_1 = __webpack_require__(/*! @libs/enums/resource-type.enum */ "./libs/enums/resource-type.enum.ts");
const reservation_type_enum_1 = __webpack_require__(/*! @libs/enums/reservation-type.enum */ "./libs/enums/reservation-type.enum.ts");
const reservation_response_dto_1 = __webpack_require__(/*! @resource/modules/reservation/application/dtos/reservation-response.dto */ "./apps/resource/src/modules/reservation/application/dtos/reservation-response.dto.ts");
let ReservationController = class ReservationController {
    constructor(reservationUsecase) {
        this.reservationUsecase = reservationUsecase;
    }
    async create(createDto) {
        return this.reservationUsecase.makeReservation(createDto);
    }
    async findMyReservationList(user, startDate, resourceType) {
        return this.reservationUsecase.findMyReservationList(user.employeeId, startDate, resourceType);
    }
    async findOne(reservationId) {
        return this.reservationUsecase.findReservationDetail(reservationId);
    }
    async findReservationList(startDate, endDate, resourceType, resourceId, status) {
        return this.reservationUsecase.findReservationList(startDate, endDate, resourceType, resourceId, status);
    }
    async updateTitle(reservationId, updateDto) {
        return this.reservationUsecase.updateTitle(reservationId, updateDto);
    }
    async update(reservationId, updateDto) {
        return this.reservationUsecase.updateTime(reservationId, updateDto);
    }
    async updateStatus(user, reservationId, updateDto) {
        return this.reservationUsecase.updateStatus(reservationId, updateDto, user.employeeId, user.roles.includes(role_type_enum_1.Role.RESOURCE_ADMIN));
    }
    async updateParticipants(reservationId, updateDto) {
        return this.reservationUsecase.updateParticipants(reservationId, updateDto);
    }
    async updateCcReceipient(reservationId, updateDto) {
        return this.reservationUsecase.updateCcReceipient(reservationId, updateDto);
    }
};
exports.ReservationController = ReservationController;
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '예약 생성' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 생성 성공',
        type: dtos_index_1.CreateReservationResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_reservation_dto_1.CreateReservationDto !== "undefined" && create_reservation_dto_1.CreateReservationDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ReservationController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({ summary: '내 예약 리스트 조회 #사용자/홈 ' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '내 예약 리스트 조회 성공',
        type: [reservation_response_dto_1.ReservationWithRelationsResponseDto],
    }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', type: String, required: false, example: '2025-01-01' }),
    (0, swagger_1.ApiQuery)({ name: 'resourceType', enum: resource_type_enum_1.ResourceType, required: false, example: resource_type_enum_1.ResourceType.MEETING_ROOM }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('resourceType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _d : Object, String, typeof (_e = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ReservationController.prototype, "findMyReservationList", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Get)(':reservationId'),
    (0, swagger_1.ApiOperation)({ summary: '예약 조회 #사용자/예약상세페이지' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 조회 성공',
        type: reservation_response_dto_1.ReservationWithRelationsResponseDto,
    }),
    __param(0, (0, common_1.Param)('reservationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ReservationController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1', 'sprint0.3'),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '예약 리스트 조회 #사용자/자원캘린더 #사용자/자원예약/예약가능시간확인 #관리자/홈 #관리자/예약관리',
    }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 리스트 조회 성공',
        type: [reservation_response_dto_1.ReservationWithResourceResponseDto],
    }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', type: String, required: false, example: '2025-01-01' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', type: String, required: false, example: '2025-01-01' }),
    (0, swagger_1.ApiQuery)({ name: 'resourceType', enum: resource_type_enum_1.ResourceType, required: false, example: resource_type_enum_1.ResourceType.MEETING_ROOM }),
    (0, swagger_1.ApiQuery)({ name: 'resourceId', type: String, required: false, example: '1241234-1234-1234-1234-123412341234' }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        enum: reservation_type_enum_1.ReservationStatus,
        isArray: true,
        required: false,
        example: [reservation_type_enum_1.ReservationStatus.CONFIRMED],
    }),
    (0, swagger_1.ApiQuery)({
        name: 'ReservationStatus',
        enum: reservation_type_enum_1.ReservationStatus,
        required: false,
        example: [reservation_type_enum_1.ReservationStatus.CONFIRMED],
    }),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __param(2, (0, common_1.Query)('resourceType')),
    __param(3, (0, common_1.Query)('resourceId')),
    __param(4, (0, common_1.Query)('status', new common_1.ParseArrayPipe({ optional: true, separator: ',' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, typeof (_h = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _h : Object, String, Array]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], ReservationController.prototype, "findReservationList", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Patch)(':reservationId/title'),
    (0, swagger_1.ApiOperation)({ summary: '예약 제목 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 제목 수정 성공',
        type: dtos_index_1.ReservationResponseDto,
    }),
    __param(0, (0, common_1.Param)('reservationId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_k = typeof dtos_index_1.UpdateReservationTitleDto !== "undefined" && dtos_index_1.UpdateReservationTitleDto) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], ReservationController.prototype, "updateTitle", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Patch)(':reservationId/time'),
    (0, swagger_1.ApiOperation)({ summary: '예약 시간 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 시간 수정 성공',
        type: dtos_index_1.ReservationResponseDto,
    }),
    __param(0, (0, common_1.Param)('reservationId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_m = typeof dtos_index_1.UpdateReservationTimeDto !== "undefined" && dtos_index_1.UpdateReservationTimeDto) === "function" ? _m : Object]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], ReservationController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1', 'sprint0.3'),
    (0, common_1.Patch)(':reservationId/status'),
    (0, swagger_1.ApiOperation)({ summary: '예약 상태 수정 #사용자/예약상세페이지 #관리자/예약관리/예약상세' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 상태 수정 성공',
        type: dtos_index_1.ReservationResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('reservationId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_p = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _p : Object, String, typeof (_q = typeof dtos_index_1.UpdateReservationStatusDto !== "undefined" && dtos_index_1.UpdateReservationStatusDto) === "function" ? _q : Object]),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], ReservationController.prototype, "updateStatus", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Patch)(':reservationId/participants'),
    (0, swagger_1.ApiOperation)({ summary: '예약 참가자 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 참가자 수정 성공',
        type: dtos_index_1.ReservationResponseDto,
    }),
    __param(0, (0, common_1.Param)('reservationId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_s = typeof dtos_index_1.UpdateReservationParticipantsDto !== "undefined" && dtos_index_1.UpdateReservationParticipantsDto) === "function" ? _s : Object]),
    __metadata("design:returntype", typeof (_t = typeof Promise !== "undefined" && Promise) === "function" ? _t : Object)
], ReservationController.prototype, "updateParticipants", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Patch)(':reservationId/cc-receipient'),
    (0, swagger_1.ApiOperation)({ summary: '예약 수신참조자 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 수신참조자 수정 성공',
        type: dtos_index_1.ReservationResponseDto,
    }),
    __param(0, (0, common_1.Param)('reservationId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_u = typeof dtos_index_1.UpdateReservationCcReceipientDto !== "undefined" && dtos_index_1.UpdateReservationCcReceipientDto) === "function" ? _u : Object]),
    __metadata("design:returntype", typeof (_v = typeof Promise !== "undefined" && Promise) === "function" ? _v : Object)
], ReservationController.prototype, "updateCcReceipient", null);
exports.ReservationController = ReservationController = __decorate([
    (0, swagger_1.ApiTags)('예약'),
    (0, common_1.Controller)('reservations'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.USER),
    __metadata("design:paramtypes", [typeof (_a = typeof reservation_usecase_1.ReservationUsecase !== "undefined" && reservation_usecase_1.ReservationUsecase) === "function" ? _a : Object])
], ReservationController);


/***/ }),

/***/ "./apps/resource/src/modules/reservation/infrastructure/adapters/out/persistence/reservation-participant.repository.ts":
/*!*****************************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/reservation/infrastructure/adapters/out/persistence/reservation-participant.repository.ts ***!
  \*****************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReservationParticipantRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
let ReservationParticipantRepository = class ReservationParticipantRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async save(participant, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.ReservationParticipant)
            : this.repository;
        const entity = repository.create(participant);
        const saved = await repository.save(entity);
        return saved;
    }
    async findAll(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.ReservationParticipant)
            : this.repository;
        return repository.find({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            order: repositoryOptions?.order,
            skip: repositoryOptions?.skip,
            take: repositoryOptions?.take,
        });
    }
    async findOne(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.ReservationParticipant)
            : this.repository;
        return repository.findOne({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
        });
    }
    async update(id, participant, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.ReservationParticipant)
            : this.repository;
        await repository.update(id, participant);
        const updated = await repository.findOne({
            where: { participantId: id },
        });
        return updated;
    }
    async delete(id, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.ReservationParticipant)
            : this.repository;
        await repository.delete(id);
    }
};
exports.ReservationParticipantRepository = ReservationParticipantRepository;
exports.ReservationParticipantRepository = ReservationParticipantRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.ReservationParticipant)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ReservationParticipantRepository);


/***/ }),

/***/ "./apps/resource/src/modules/reservation/infrastructure/adapters/out/persistence/reservation.repository.ts":
/*!*****************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/reservation/infrastructure/adapters/out/persistence/reservation.repository.ts ***!
  \*****************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReservationRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
const reservation_type_enum_1 = __webpack_require__(/*! @libs/enums/reservation-type.enum */ "./libs/enums/reservation-type.enum.ts");
const resource_type_enum_1 = __webpack_require__(/*! @libs/enums/resource-type.enum */ "./libs/enums/resource-type.enum.ts");
let ReservationRepository = class ReservationRepository {
    constructor(repository) {
        this.repository = repository;
    }
    create(createDto) {
        const reservation = new entities_1.Reservation();
        reservation.resourceId = createDto.resourceId;
        reservation.title = createDto.title;
        reservation.description = createDto.description;
        reservation.startDate = createDto.startDate;
        reservation.endDate = createDto.endDate;
        reservation.isAllDay = createDto.isAllDay;
        reservation.notifyBeforeStart = createDto.notifyBeforeStart;
        reservation.notifyMinutesBeforeStart = createDto.notifyMinutesBeforeStart;
        reservation.status =
            createDto.resourceType === resource_type_enum_1.ResourceType.ACCOMMODATION
                ? reservation_type_enum_1.ReservationStatus.PENDING
                : reservation_type_enum_1.ReservationStatus.CONFIRMED;
        return reservation;
    }
    async save(reservation, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Reservation)
            : this.repository;
        const saved = await repository.save(reservation);
        return saved;
    }
    async findOne(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Reservation)
            : this.repository;
        const entity = await repository.findOne({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
        });
        return entity ? entity : null;
    }
    async findAll(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Reservation)
            : this.repository;
        const entities = await repository.find({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            order: repositoryOptions?.order,
            skip: repositoryOptions?.skip,
            take: repositoryOptions?.take,
        });
        return entities;
    }
    async update(id, reservation, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Reservation)
            : this.repository;
        await repository.update(id, reservation);
        const updated = await repository.findOne({ where: { reservationId: id } });
        return updated;
    }
    async delete(id, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Reservation)
            : this.repository;
        await repository.delete(id);
    }
};
exports.ReservationRepository = ReservationRepository;
exports.ReservationRepository = ReservationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Reservation)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ReservationRepository);


/***/ }),

/***/ "./apps/resource/src/modules/reservation/reservation.module.ts":
/*!*********************************************************************!*\
  !*** ./apps/resource/src/modules/reservation/reservation.module.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReservationModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
const reservation_service_1 = __webpack_require__(/*! ./application/services/reservation.service */ "./apps/resource/src/modules/reservation/application/services/reservation.service.ts");
const reservation_controller_1 = __webpack_require__(/*! ./infrastructure/adapters/in/web/controllers/reservation.controller */ "./apps/resource/src/modules/reservation/infrastructure/adapters/in/web/controllers/reservation.controller.ts");
const reservation_repository_1 = __webpack_require__(/*! ./infrastructure/adapters/out/persistence/reservation.repository */ "./apps/resource/src/modules/reservation/infrastructure/adapters/out/persistence/reservation.repository.ts");
const reservation_participant_repository_1 = __webpack_require__(/*! ./infrastructure/adapters/out/persistence/reservation-participant.repository */ "./apps/resource/src/modules/reservation/infrastructure/adapters/out/persistence/reservation-participant.repository.ts");
const participant_service_1 = __webpack_require__(/*! ./application/services/participant.service */ "./apps/resource/src/modules/reservation/application/services/participant.service.ts");
const reservation_usecase_1 = __webpack_require__(/*! ./application/usecases/reservation.usecase */ "./apps/resource/src/modules/reservation/application/usecases/reservation.usecase.ts");
let ReservationModule = class ReservationModule {
};
exports.ReservationModule = ReservationModule;
exports.ReservationModule = ReservationModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Reservation, entities_1.ReservationParticipant, entities_1.Schedule])],
        providers: [
            reservation_service_1.ReservationService,
            participant_service_1.ParticipantService,
            {
                provide: 'ReservationRepositoryPort',
                useClass: reservation_repository_1.ReservationRepository,
            },
            {
                provide: 'ReservationParticipantRepositoryPort',
                useClass: reservation_participant_repository_1.ReservationParticipantRepository,
            },
            reservation_usecase_1.ReservationUsecase,
        ],
        controllers: [reservation_controller_1.ReservationController],
        exports: [reservation_service_1.ReservationService],
    })
], ReservationModule);


/***/ }),

/***/ "./apps/resource/src/modules/resource/accommodation/accommodation-resource.module.ts":
/*!*******************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/accommodation/accommodation-resource.module.ts ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccommodationResourceModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
const accommodation_info_service_1 = __webpack_require__(/*! ./application/services/accommodation-info.service */ "./apps/resource/src/modules/resource/accommodation/application/services/accommodation-info.service.ts");
const accommodation_info_controller_1 = __webpack_require__(/*! ./infrastructure/adapters/in/web/controllers/accommodation-info.controller */ "./apps/resource/src/modules/resource/accommodation/infrastructure/adapters/in/web/controllers/accommodation-info.controller.ts");
const accommodation_info_repository_1 = __webpack_require__(/*! ./infrastructure/adapters/out/persistence/accommodation-info.repository */ "./apps/resource/src/modules/resource/accommodation/infrastructure/adapters/out/persistence/accommodation-info.repository.ts");
const accommodation_resource_handler_1 = __webpack_require__(/*! ./application/handlers/accommodation-resource.handler */ "./apps/resource/src/modules/resource/accommodation/application/handlers/accommodation-resource.handler.ts");
let AccommodationResourceModule = class AccommodationResourceModule {
};
exports.AccommodationResourceModule = AccommodationResourceModule;
exports.AccommodationResourceModule = AccommodationResourceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.AccommodationInfo]),
        ],
        providers: [
            accommodation_info_service_1.AccommodationInfoService,
            accommodation_resource_handler_1.AccommodationResourceHandler,
            {
                provide: 'AccommodationInfoRepositoryPort',
                useClass: accommodation_info_repository_1.AccommodationInfoRepository,
            },
        ],
        controllers: [accommodation_info_controller_1.AccommodationInfoController],
        exports: [accommodation_resource_handler_1.AccommodationResourceHandler],
    })
], AccommodationResourceModule);


/***/ }),

/***/ "./apps/resource/src/modules/resource/accommodation/application/dtos/accommodation-info-response.dto.ts":
/*!**************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/accommodation/application/dtos/accommodation-info-response.dto.ts ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccommodationInfoResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class AccommodationInfoResponseDto {
}
exports.AccommodationInfoResponseDto = AccommodationInfoResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AccommodationInfoResponseDto.prototype, "accommodationInfoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AccommodationInfoResponseDto.prototype, "resourceId", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/resource/accommodation/application/dtos/create-accommodation-info.dto.ts":
/*!************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/accommodation/application/dtos/create-accommodation-info.dto.ts ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAccommodationInfoDto = void 0;
class CreateAccommodationInfoDto {
}
exports.CreateAccommodationInfoDto = CreateAccommodationInfoDto;


/***/ }),

/***/ "./apps/resource/src/modules/resource/accommodation/application/dtos/update-accommodation-info.dto.ts":
/*!************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/accommodation/application/dtos/update-accommodation-info.dto.ts ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAccommodationInfoDto = void 0;
class UpdateAccommodationInfoDto {
}
exports.UpdateAccommodationInfoDto = UpdateAccommodationInfoDto;


/***/ }),

/***/ "./apps/resource/src/modules/resource/accommodation/application/handlers/accommodation-resource.handler.ts":
/*!*****************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/accommodation/application/handlers/accommodation-resource.handler.ts ***!
  \*****************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccommodationResourceHandler = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const accommodation_info_repository_port_1 = __webpack_require__(/*! ../../domain/ports/accommodation-info.repository.port */ "./apps/resource/src/modules/resource/accommodation/domain/ports/accommodation-info.repository.port.ts");
const accommodation_info_1 = __webpack_require__(/*! ../../domain/models/accommodation-info */ "./apps/resource/src/modules/resource/accommodation/domain/models/accommodation-info.ts");
let AccommodationResourceHandler = class AccommodationResourceHandler {
    constructor(accommodationInfoRepository) {
        this.accommodationInfoRepository = accommodationInfoRepository;
    }
    async createTypeInfo(resource, typeInfo, repositoryOptions) {
        const accommodationInfo = new accommodation_info_1.AccommodationInfo({
            ...typeInfo,
            resourceId: resource.resourceId,
        });
        await this.accommodationInfoRepository.save(accommodationInfo, repositoryOptions);
    }
    async getTypeInfo(resourceId, repositoryOptions) {
        return this.accommodationInfoRepository.findByResourceId(resourceId, repositoryOptions);
    }
    async updateTypeInfo(resource, typeInfo, repositoryOptions) {
        await this.accommodationInfoRepository.update(resource.resourceId, typeInfo, repositoryOptions);
    }
    async deleteTypeInfo(resourceId, repositoryOptions) {
        await this.accommodationInfoRepository.delete(resourceId, repositoryOptions);
    }
    async validateTypeData(typeInfo, repositoryOptions) {
        return true;
    }
};
exports.AccommodationResourceHandler = AccommodationResourceHandler;
exports.AccommodationResourceHandler = AccommodationResourceHandler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AccommodationInfoRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof accommodation_info_repository_port_1.AccommodationInfoRepositoryPort !== "undefined" && accommodation_info_repository_port_1.AccommodationInfoRepositoryPort) === "function" ? _a : Object])
], AccommodationResourceHandler);


/***/ }),

/***/ "./apps/resource/src/modules/resource/accommodation/application/services/accommodation-info.service.ts":
/*!*************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/accommodation/application/services/accommodation-info.service.ts ***!
  \*************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccommodationInfoService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const accommodation_info_repository_port_1 = __webpack_require__(/*! @resource/modules/resource/accommodation/domain/ports/accommodation-info.repository.port */ "./apps/resource/src/modules/resource/accommodation/domain/ports/accommodation-info.repository.port.ts");
const accommodation_info_1 = __webpack_require__(/*! @resource/modules/resource/accommodation/domain/models/accommodation-info */ "./apps/resource/src/modules/resource/accommodation/domain/models/accommodation-info.ts");
let AccommodationInfoService = class AccommodationInfoService {
    constructor(accommodationInfoRepository) {
        this.accommodationInfoRepository = accommodationInfoRepository;
    }
    async create(createDto, repositoryOptions) {
        const accommodationInfo = new accommodation_info_1.AccommodationInfo({
            resourceId: createDto.resourceId,
        });
        return this.accommodationInfoRepository.save(accommodationInfo, repositoryOptions);
    }
    async findByResourceId(resourceId, repositoryOptions) {
        const info = await this.accommodationInfoRepository.findByResourceId(resourceId, repositoryOptions);
        if (!info) {
            throw new common_1.NotFoundException('Accommodation info not found');
        }
        return info;
    }
    async update(resourceId, updateData, repositoryOptions) {
        const info = await this.findByResourceId(resourceId, repositoryOptions);
        return this.accommodationInfoRepository.update(resourceId, {
            ...info,
            ...updateData,
        }, repositoryOptions);
    }
    async remove(resourceId, repositoryOptions) {
        await this.accommodationInfoRepository.delete(resourceId, repositoryOptions);
    }
};
exports.AccommodationInfoService = AccommodationInfoService;
exports.AccommodationInfoService = AccommodationInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AccommodationInfoRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof accommodation_info_repository_port_1.AccommodationInfoRepositoryPort !== "undefined" && accommodation_info_repository_port_1.AccommodationInfoRepositoryPort) === "function" ? _a : Object])
], AccommodationInfoService);


/***/ }),

/***/ "./apps/resource/src/modules/resource/accommodation/domain/models/accommodation-info.ts":
/*!**********************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/accommodation/domain/models/accommodation-info.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccommodationInfo = void 0;
class AccommodationInfo {
    constructor(props) {
        this.validateProps(props);
        this.props = props;
    }
    validateProps(props) {
        if (!props.resourceId) {
            throw new Error('Resource ID is required');
        }
    }
    get accommodationInfoId() {
        return this.props.accommodationInfoId;
    }
    get resourceId() {
        return this.props.resourceId;
    }
    toJSON() {
        return { ...this.props };
    }
}
exports.AccommodationInfo = AccommodationInfo;


/***/ }),

/***/ "./apps/resource/src/modules/resource/accommodation/domain/ports/accommodation-info.repository.port.ts":
/*!*************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/accommodation/domain/ports/accommodation-info.repository.port.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/resource/src/modules/resource/accommodation/infrastructure/adapters/in/web/controllers/accommodation-info.controller.ts":
/*!**************************************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/accommodation/infrastructure/adapters/in/web/controllers/accommodation-info.controller.ts ***!
  \**************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccommodationInfoController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const accommodation_info_service_1 = __webpack_require__(/*! @resource/modules/resource/accommodation/application/services/accommodation-info.service */ "./apps/resource/src/modules/resource/accommodation/application/services/accommodation-info.service.ts");
let AccommodationInfoController = class AccommodationInfoController {
    constructor(accommodationInfoService) {
        this.accommodationInfoService = accommodationInfoService;
    }
};
exports.AccommodationInfoController = AccommodationInfoController;
exports.AccommodationInfoController = AccommodationInfoController = __decorate([
    (0, swagger_1.ApiTags)('accommodation-info'),
    (0, common_1.Controller)('resources/:resourceId/accommodation-info'),
    __metadata("design:paramtypes", [typeof (_a = typeof accommodation_info_service_1.AccommodationInfoService !== "undefined" && accommodation_info_service_1.AccommodationInfoService) === "function" ? _a : Object])
], AccommodationInfoController);


/***/ }),

/***/ "./apps/resource/src/modules/resource/accommodation/infrastructure/adapters/out/persistence/accommodation-info.repository.ts":
/*!***********************************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/accommodation/infrastructure/adapters/out/persistence/accommodation-info.repository.ts ***!
  \***********************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccommodationInfoRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
const accommodation_info_1 = __webpack_require__(/*! @resource/modules/resource/accommodation/domain/models/accommodation-info */ "./apps/resource/src/modules/resource/accommodation/domain/models/accommodation-info.ts");
let AccommodationInfoRepository = class AccommodationInfoRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async save(accommodationInfo, repositoryOptions) {
        const entity = this.toEntity(accommodationInfo);
        const repository = repositoryOptions?.queryRunner ? repositoryOptions.queryRunner.manager.getRepository(entities_1.AccommodationInfo) : this.repository;
        const savedEntity = await repository.save(entity);
        return this.toDomain(savedEntity);
    }
    async findByResourceId(resourceId, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner ? repositoryOptions.queryRunner.manager.getRepository(entities_1.AccommodationInfo) : this.repository;
        const entity = await repository.findOne({ where: { resourceId } });
        return entity ? this.toDomain(entity) : null;
    }
    async update(resourceId, accommodationInfo, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner ? repositoryOptions.queryRunner.manager.getRepository(entities_1.AccommodationInfo) : this.repository;
        await repository.update({ resourceId }, this.toEntity(accommodationInfo));
        const updated = await repository.findOne({ where: { resourceId } });
        if (!updated)
            throw new common_1.NotFoundException('Accommodation info not found');
        return this.toDomain(updated);
    }
    async delete(resourceId, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner ? repositoryOptions.queryRunner.manager.getRepository(entities_1.AccommodationInfo) : this.repository;
        await repository.delete({ resourceId });
    }
    toDomain(entity) {
        return new accommodation_info_1.AccommodationInfo({
            accommodationInfoId: entity.accommodationInfoId,
            resourceId: entity.resourceId,
        });
    }
    toEntity(domain) {
        const props = domain instanceof accommodation_info_1.AccommodationInfo ? domain.toJSON() : domain;
        return {
            accommodationInfoId: props.accommodationInfoId,
            resourceId: props.resourceId,
        };
    }
};
exports.AccommodationInfoRepository = AccommodationInfoRepository;
exports.AccommodationInfoRepository = AccommodationInfoRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.AccommodationInfo)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], AccommodationInfoRepository);


/***/ }),

/***/ "./apps/resource/src/modules/resource/common/application/dtos/create-resource.dto.ts":
/*!*******************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/common/application/dtos/create-resource.dto.ts ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateResourceInfoDto = exports.CreateResourceDto = exports.ResourceLocation = exports.CreateResourceManagerDto = exports.CreateResourceGroupDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const resource_type_enum_1 = __webpack_require__(/*! @libs/enums/resource-type.enum */ "./libs/enums/resource-type.enum.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const create_vehicle_info_dto_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/application/dtos/create-vehicle-info.dto */ "./apps/resource/src/modules/resource/vehicle/application/dtos/create-vehicle-info.dto.ts");
const create_meeting_room_info_dto_1 = __webpack_require__(/*! @resource/modules/resource/meeting-room/application/dtos/create-meeting-room-info.dto */ "./apps/resource/src/modules/resource/meeting-room/application/dtos/create-meeting-room-info.dto.ts");
const create_accommodation_info_dto_1 = __webpack_require__(/*! @resource/modules/resource/accommodation/application/dtos/create-accommodation-info.dto */ "./apps/resource/src/modules/resource/accommodation/application/dtos/create-accommodation-info.dto.ts");
class CreateResourceGroupDto {
}
exports.CreateResourceGroupDto = CreateResourceGroupDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResourceGroupDto.prototype, "parentResourceGroupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: resource_type_enum_1.ResourceType }),
    (0, class_validator_1.IsEnum)(resource_type_enum_1.ResourceType),
    __metadata("design:type", typeof (_a = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _a : Object)
], CreateResourceGroupDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResourceGroupDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateResourceGroupDto.prototype, "description", void 0);
class CreateResourceManagerDto {
}
exports.CreateResourceManagerDto = CreateResourceManagerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResourceManagerDto.prototype, "employeeId", void 0);
class ResourceLocation {
}
exports.ResourceLocation = ResourceLocation;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResourceLocation.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResourceLocation.prototype, "detailAddress", void 0);
class CreateResourceDto {
}
exports.CreateResourceDto = CreateResourceDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResourceDto.prototype, "resourceGroupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResourceDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateResourceDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ResourceLocation }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ResourceLocation)
], CreateResourceDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateResourceDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateResourceDto.prototype, "notifyParticipantChange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateResourceDto.prototype, "notifyReservationChange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: resource_type_enum_1.ResourceType }),
    (0, class_validator_1.IsEnum)(resource_type_enum_1.ResourceType),
    __metadata("design:type", typeof (_b = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _b : Object)
], CreateResourceDto.prototype, "type", void 0);
class CreateResourceInfoDto {
}
exports.CreateResourceInfoDto = CreateResourceInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: CreateResourceDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateResourceDto),
    __metadata("design:type", CreateResourceDto)
], CreateResourceInfoDto.prototype, "resource", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        oneOf: [
            { $ref: (0, swagger_1.getSchemaPath)(create_vehicle_info_dto_1.CreateVehicleInfoDto) },
            { $ref: (0, swagger_1.getSchemaPath)(create_meeting_room_info_dto_1.CreateMeetingRoomInfoDto) },
            { $ref: (0, swagger_1.getSchemaPath)(create_accommodation_info_dto_1.CreateAccommodationInfoDto) },
        ],
    }),
    __metadata("design:type", Object)
], CreateResourceInfoDto.prototype, "typeInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CreateResourceManagerDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateResourceManagerDto),
    __metadata("design:type", Array)
], CreateResourceInfoDto.prototype, "managers", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/resource/common/application/dtos/resource-response.dto.ts":
/*!*********************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/common/application/dtos/resource-response.dto.ts ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceGroupWithResourcesAndReservationsResponseDto = exports.ResourceGroupWithResourcesResponseDto = exports.ChildResourceGroupResponseDto = exports.ResourceGroupResponseDto = exports.ResourceWithReservationsResponseDto = exports.ResourceSelectResponseDto = exports.ResourceResponseDto = exports.ResourceManagerResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const vehicle_info_response_dto_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/application/dtos/vehicle-info-response.dto */ "./apps/resource/src/modules/resource/vehicle/application/dtos/vehicle-info-response.dto.ts");
const meeting_room_info_response_dto_1 = __webpack_require__(/*! @resource/modules/resource/meeting-room/application/dtos/meeting-room-info-response.dto */ "./apps/resource/src/modules/resource/meeting-room/application/dtos/meeting-room-info-response.dto.ts");
const accommodation_info_response_dto_1 = __webpack_require__(/*! @resource/modules/resource/accommodation/application/dtos/accommodation-info-response.dto */ "./apps/resource/src/modules/resource/accommodation/application/dtos/accommodation-info-response.dto.ts");
const resource_type_enum_1 = __webpack_require__(/*! @libs/enums/resource-type.enum */ "./libs/enums/resource-type.enum.ts");
const create_resource_dto_1 = __webpack_require__(/*! ./create-resource.dto */ "./apps/resource/src/modules/resource/common/application/dtos/create-resource.dto.ts");
const reservation_response_dto_1 = __webpack_require__(/*! @resource/modules/reservation/application/dtos/reservation-response.dto */ "./apps/resource/src/modules/reservation/application/dtos/reservation-response.dto.ts");
const employee_response_dto_1 = __webpack_require__(/*! @resource/modules/employee/application/dtos/employee-response.dto */ "./apps/resource/src/modules/employee/application/dtos/employee-response.dto.ts");
class ResourceManagerResponseDto {
}
exports.ResourceManagerResponseDto = ResourceManagerResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResourceManagerResponseDto.prototype, "resourceManagerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResourceManagerResponseDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResourceManagerResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_a = typeof employee_response_dto_1.EmployeeResponseDto !== "undefined" && employee_response_dto_1.EmployeeResponseDto) === "function" ? _a : Object)
], ResourceManagerResponseDto.prototype, "employee", void 0);
class ResourceResponseDto {
    constructor(resource) {
        this.resourceId = resource.resourceId;
        this.resourceGroupId = resource.resourceGroupId;
        this.name = resource.name;
        this.description = resource.description;
        this.location = resource.location;
        this.images = resource.images;
        this.type = resource.type;
        this.isAvailable = resource.isAvailable;
        this.unavailableReason = resource.unavailableReason;
        this.notifyParticipantChange = resource.notifyParticipantChange;
        this.notifyReservationChange = resource.notifyReservationChange;
        this.managers = resource.resourceManagers;
        if (resource.vehicleInfo) {
            this.typeInfo = resource.vehicleInfo;
        }
        else if (resource.meetingRoomInfo) {
            this.typeInfo = resource.meetingRoomInfo;
        }
        else if (resource.accommodationInfo) {
            this.typeInfo = resource.accommodationInfo;
        }
    }
}
exports.ResourceResponseDto = ResourceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ResourceResponseDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ResourceResponseDto.prototype, "resourceGroupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResourceResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ResourceResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: create_resource_dto_1.ResourceLocation }),
    __metadata("design:type", typeof (_b = typeof create_resource_dto_1.ResourceLocation !== "undefined" && create_resource_dto_1.ResourceLocation) === "function" ? _b : Object)
], ResourceResponseDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [String] }),
    __metadata("design:type", Array)
], ResourceResponseDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: resource_type_enum_1.ResourceType }),
    __metadata("design:type", typeof (_c = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _c : Object)
], ResourceResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ResourceResponseDto.prototype, "isAvailable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ResourceResponseDto.prototype, "unavailableReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ResourceResponseDto.prototype, "notifyParticipantChange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ResourceResponseDto.prototype, "notifyReservationChange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        oneOf: [
            { $ref: (0, swagger_1.getSchemaPath)(vehicle_info_response_dto_1.VehicleInfoResponseDto) },
            { $ref: (0, swagger_1.getSchemaPath)(meeting_room_info_response_dto_1.MeetingRoomInfoResponseDto) },
            { $ref: (0, swagger_1.getSchemaPath)(accommodation_info_response_dto_1.AccommodationInfoResponseDto) },
        ],
    }),
    __metadata("design:type", Object)
], ResourceResponseDto.prototype, "typeInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [ResourceManagerResponseDto] }),
    __metadata("design:type", Array)
], ResourceResponseDto.prototype, "managers", void 0);
class ResourceSelectResponseDto {
}
exports.ResourceSelectResponseDto = ResourceSelectResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResourceSelectResponseDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResourceSelectResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ResourceSelectResponseDto.prototype, "isAvailable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ResourceSelectResponseDto.prototype, "unavailableReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResourceSelectResponseDto.prototype, "resourceGroupId", void 0);
class ResourceWithReservationsResponseDto extends ResourceResponseDto {
}
exports.ResourceWithReservationsResponseDto = ResourceWithReservationsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [reservation_response_dto_1.ReservationResponseDto] }),
    __metadata("design:type", Array)
], ResourceWithReservationsResponseDto.prototype, "reservations", void 0);
class ResourceGroupResponseDto {
}
exports.ResourceGroupResponseDto = ResourceGroupResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResourceGroupResponseDto.prototype, "resourceGroupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResourceGroupResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ResourceGroupResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: resource_type_enum_1.ResourceType }),
    __metadata("design:type", typeof (_f = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _f : Object)
], ResourceGroupResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ResourceGroupResponseDto.prototype, "parentResourceGroupId", void 0);
class ChildResourceGroupResponseDto extends ResourceGroupResponseDto {
}
exports.ChildResourceGroupResponseDto = ChildResourceGroupResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => ResourceSelectResponseDto, required: false }),
    __metadata("design:type", Array)
], ChildResourceGroupResponseDto.prototype, "resources", void 0);
class ResourceGroupWithResourcesResponseDto extends ResourceGroupResponseDto {
}
exports.ResourceGroupWithResourcesResponseDto = ResourceGroupWithResourcesResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [ChildResourceGroupResponseDto],
        required: false,
    }),
    __metadata("design:type", Array)
], ResourceGroupWithResourcesResponseDto.prototype, "children", void 0);
class ResourceGroupWithResourcesAndReservationsResponseDto extends ResourceGroupResponseDto {
}
exports.ResourceGroupWithResourcesAndReservationsResponseDto = ResourceGroupWithResourcesAndReservationsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [ResourceWithReservationsResponseDto],
        required: false,
    }),
    __metadata("design:type", Array)
], ResourceGroupWithResourcesAndReservationsResponseDto.prototype, "resources", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/resource/common/application/dtos/update-resource.dto.ts":
/*!*******************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/common/application/dtos/update-resource.dto.ts ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReturnVehicleDto = exports.UpdateResourceInfoDto = exports.UpdateResourceDto = exports.UpdateResourceGroupDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const create_resource_dto_1 = __webpack_require__(/*! ./create-resource.dto */ "./apps/resource/src/modules/resource/common/application/dtos/create-resource.dto.ts");
const resource_type_enum_1 = __webpack_require__(/*! @libs/enums/resource-type.enum */ "./libs/enums/resource-type.enum.ts");
class UpdateResourceGroupDto {
}
exports.UpdateResourceGroupDto = UpdateResourceGroupDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateResourceGroupDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateResourceGroupDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: resource_type_enum_1.ResourceType }),
    (0, class_validator_1.IsEnum)(resource_type_enum_1.ResourceType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _a : Object)
], UpdateResourceGroupDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateResourceGroupDto.prototype, "parentResourceGroupId", void 0);
class UpdateResourceDto {
}
exports.UpdateResourceDto = UpdateResourceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateResourceDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateResourceDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: 'object' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof create_resource_dto_1.ResourceLocation !== "undefined" && create_resource_dto_1.ResourceLocation) === "function" ? _b : Object)
], UpdateResourceDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateResourceDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateResourceDto.prototype, "notifyParticipantChange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateResourceDto.prototype, "notifyReservationChange", void 0);
class UpdateResourceInfoDto {
}
exports.UpdateResourceInfoDto = UpdateResourceInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: UpdateResourceDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => UpdateResourceDto),
    __metadata("design:type", UpdateResourceDto)
], UpdateResourceInfoDto.prototype, "resource", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [create_resource_dto_1.CreateResourceManagerDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_resource_dto_1.CreateResourceManagerDto),
    __metadata("design:type", Array)
], UpdateResourceInfoDto.prototype, "managers", void 0);
class ReturnVehicleDto {
}
exports.ReturnVehicleDto = ReturnVehicleDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_c = typeof create_resource_dto_1.ResourceLocation !== "undefined" && create_resource_dto_1.ResourceLocation) === "function" ? _c : Object)
], ReturnVehicleDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReturnVehicleDto.prototype, "leftMileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReturnVehicleDto.prototype, "totalMileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ReturnVehicleDto.prototype, "parkingLocationImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ReturnVehicleDto.prototype, "odometerImages", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/resource/common/application/services/resource-group.service.ts":
/*!**************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/common/application/services/resource-group.service.ts ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceGroupService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const resource_group_repository_port_1 = __webpack_require__(/*! @resource/modules/resource/common/domain/ports/resource-group.repository.port */ "./apps/resource/src/modules/resource/common/domain/ports/resource-group.repository.port.ts");
let ResourceGroupService = class ResourceGroupService {
    constructor(resourceGroupRepository) {
        this.resourceGroupRepository = resourceGroupRepository;
    }
    async findAll(repositoryOptions) {
        const resourceGroups = await this.resourceGroupRepository.find(repositoryOptions);
        return resourceGroups;
    }
    async findOne(resourceGroupId) {
        const resourceGroup = await this.resourceGroupRepository.findOne({
            where: {
                resourceGroupId,
            },
        });
        return resourceGroup;
    }
};
exports.ResourceGroupService = ResourceGroupService;
exports.ResourceGroupService = ResourceGroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ResourceGroupRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_group_repository_port_1.ResourceGroupRepositoryPort !== "undefined" && resource_group_repository_port_1.ResourceGroupRepositoryPort) === "function" ? _a : Object])
], ResourceGroupService);


/***/ }),

/***/ "./apps/resource/src/modules/resource/common/application/services/resource-manager.service.ts":
/*!****************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/common/application/services/resource-manager.service.ts ***!
  \****************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceManagerService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const resource_manager_repository_port_1 = __webpack_require__(/*! @resource/modules/resource/common/domain/ports/resource-manager.repository.port */ "./apps/resource/src/modules/resource/common/domain/ports/resource-manager.repository.port.ts");
let ResourceManagerService = class ResourceManagerService {
    constructor(resourceManagerRepository) {
        this.resourceManagerRepository = resourceManagerRepository;
    }
    async save(resourceManager, repositoryOptions) {
        return this.resourceManagerRepository.save(resourceManager, repositoryOptions);
    }
    async findOne(repositoryOptions) {
        return this.resourceManagerRepository.findOne(repositoryOptions);
    }
};
exports.ResourceManagerService = ResourceManagerService;
exports.ResourceManagerService = ResourceManagerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ResourceManagerRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_manager_repository_port_1.ResourceManagerRepositoryPort !== "undefined" && resource_manager_repository_port_1.ResourceManagerRepositoryPort) === "function" ? _a : Object])
], ResourceManagerService);


/***/ }),

/***/ "./apps/resource/src/modules/resource/common/application/services/resource.service.ts":
/*!********************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/common/application/services/resource.service.ts ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const resource_repository_port_1 = __webpack_require__(/*! @resource/modules/resource/common/domain/ports/resource.repository.port */ "./apps/resource/src/modules/resource/common/domain/ports/resource.repository.port.ts");
let ResourceService = class ResourceService {
    constructor(resourceRepository) {
        this.resourceRepository = resourceRepository;
    }
    async save(resource, repositoryOptions) {
        const savedResource = await this.resourceRepository.save(resource, repositoryOptions);
        return savedResource;
    }
    async findOne(repositoryOptions) {
        const resource = await this.resourceRepository.findOne(repositoryOptions);
        return resource;
    }
    async findAll() {
        const resources = await this.resourceRepository.find();
        return resources;
    }
    async findOneByResourceId(resourceId) {
        const resource = await this.resourceRepository.findOne({
            where: {
                resourceId: resourceId,
            },
        });
        return resource;
    }
    async findByResourceGroupId(resourceGroupId) {
        const resources = await this.resourceRepository.find({
            where: {
                resourceGroupId: resourceGroupId,
            },
        });
        return resources;
    }
    async update(resourceId, resource, repositoryOptions) {
        const updatedResource = await this.resourceRepository.update(resourceId, resource, repositoryOptions);
        return updatedResource;
    }
};
exports.ResourceService = ResourceService;
exports.ResourceService = ResourceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ResourceRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_repository_port_1.ResourceRepositoryPort !== "undefined" && resource_repository_port_1.ResourceRepositoryPort) === "function" ? _a : Object])
], ResourceService);


/***/ }),

/***/ "./apps/resource/src/modules/resource/common/application/usecases/resource-group.usecase.ts":
/*!**************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/common/application/usecases/resource-group.usecase.ts ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceGroupUsecase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const resource_service_1 = __webpack_require__(/*! ../services/resource.service */ "./apps/resource/src/modules/resource/common/application/services/resource.service.ts");
const resource_group_service_1 = __webpack_require__(/*! ../services/resource-group.service */ "./apps/resource/src/modules/resource/common/application/services/resource-group.service.ts");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const reservation_service_1 = __webpack_require__(/*! @resource/modules/reservation/application/services/reservation.service */ "./apps/resource/src/modules/reservation/application/services/reservation.service.ts");
let ResourceGroupUsecase = class ResourceGroupUsecase {
    constructor(resourceService, resourceGroupService, reservationService) {
        this.resourceService = resourceService;
        this.resourceGroupService = resourceGroupService;
        this.reservationService = reservationService;
    }
    async findParentResourceGroups() {
        const resourceGroups = await this.resourceGroupService.findAll({
            where: {
                parentResourceGroupId: (0, typeorm_1.IsNull)(),
            },
        });
        return resourceGroups;
    }
    async findResourceGroupsWithResourceData() {
        const resourceGroups = await this.resourceGroupService.findAll({
            where: {
                parentResourceGroupId: (0, typeorm_1.IsNull)(),
            },
            relations: ['children'],
        });
        const resourceGroupsResponse = await Promise.all(resourceGroups.map(async (resourceGroup) => ({
            resourceGroupId: resourceGroup.resourceGroupId,
            ...resourceGroup,
            children: await Promise.all(resourceGroup.children.map(async (child) => ({
                resourceGroupId: child.resourceGroupId,
                ...child,
                resources: (await this.resourceService.findByResourceGroupId(child.resourceGroupId)).map((resource) => ({
                    resourceId: resource.resourceId,
                    name: resource.name,
                    isAvailable: resource.isAvailable,
                    unavailableReason: resource.unavailableReason,
                    resourceGroupId: child.resourceGroupId,
                })),
            }))),
        })));
        return resourceGroupsResponse;
    }
};
exports.ResourceGroupUsecase = ResourceGroupUsecase;
exports.ResourceGroupUsecase = ResourceGroupUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_service_1.ResourceService !== "undefined" && resource_service_1.ResourceService) === "function" ? _a : Object, typeof (_b = typeof resource_group_service_1.ResourceGroupService !== "undefined" && resource_group_service_1.ResourceGroupService) === "function" ? _b : Object, typeof (_c = typeof reservation_service_1.ReservationService !== "undefined" && reservation_service_1.ReservationService) === "function" ? _c : Object])
], ResourceGroupUsecase);


/***/ }),

/***/ "./apps/resource/src/modules/resource/common/application/usecases/resource.usecase.ts":
/*!********************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/common/application/usecases/resource.usecase.ts ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceUsecase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const resource_response_dto_1 = __webpack_require__(/*! ../dtos/resource-response.dto */ "./apps/resource/src/modules/resource/common/application/dtos/resource-response.dto.ts");
const resource_service_1 = __webpack_require__(/*! ../services/resource.service */ "./apps/resource/src/modules/resource/common/application/services/resource.service.ts");
const resource_group_service_1 = __webpack_require__(/*! ../services/resource-group.service */ "./apps/resource/src/modules/resource/common/application/services/resource-group.service.ts");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const reservation_service_1 = __webpack_require__(/*! @resource/modules/reservation/application/services/reservation.service */ "./apps/resource/src/modules/reservation/application/services/reservation.service.ts");
const vehicle_info_service_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/application/services/vehicle-info.service */ "./apps/resource/src/modules/resource/vehicle/application/services/vehicle-info.service.ts");
const resource_manager_service_1 = __webpack_require__(/*! ../services/resource-manager.service */ "./apps/resource/src/modules/resource/common/application/services/resource-manager.service.ts");
const role_type_enum_1 = __webpack_require__(/*! @libs/enums/role-type.enum */ "./libs/enums/role-type.enum.ts");
const user_service_1 = __webpack_require__(/*! @resource/modules/auth/application/services/user.service */ "./apps/resource/src/modules/auth/application/services/user.service.ts");
let ResourceUsecase = class ResourceUsecase {
    constructor(resourceService, resourceManagerService, resourceGroupService, reservationService, vehicleInfoService, userService, dataSource, typeHandlers) {
        this.resourceService = resourceService;
        this.resourceManagerService = resourceManagerService;
        this.resourceGroupService = resourceGroupService;
        this.reservationService = reservationService;
        this.vehicleInfoService = vehicleInfoService;
        this.userService = userService;
        this.dataSource = dataSource;
        this.typeHandlers = typeHandlers;
    }
    async findResourcesByTypeAndDateWithReservations(type, startDate, endDate) {
        if (startDate && endDate && startDate > endDate) {
            throw new common_1.BadRequestException('Start date must be before end date');
        }
        const regex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
        const resourceGroups = await this.resourceGroupService.findAll({
            where: {
                type: type,
                parentResourceGroupId: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()),
            },
        });
        const resourceGroupsWithResources = await Promise.all(resourceGroups.map(async (resourceGroup) => {
            const resources = await this.resourceService.findByResourceGroupId(resourceGroup.resourceGroupId);
            const resourcesWithReservations = await Promise.all(resources.map(async (resource) => {
                return {
                    ...resource,
                    resourceId: resource.resourceId,
                    reservations: await this.reservationService.findAll({
                        where: {
                            resourceId: resource.resourceId,
                            startDate: (0, typeorm_1.LessThan)(regex.test(endDate) ? endDate : endDate + ' 23:59:59'),
                            endDate: (0, typeorm_1.MoreThan)(regex.test(startDate) ? startDate : startDate + ' 00:00:00'),
                        },
                    }),
                };
            }));
            return {
                ...resourceGroup,
                resources: resourcesWithReservations,
            };
        }));
        return resourceGroupsWithResources;
    }
    async findResourceDetail(resourceId) {
        const resource = await this.resourceService.findOne({
            where: { resourceId: resourceId },
            relations: [
                'resourceGroup',
                'vehicleInfo',
                'meetingRoomInfo',
                'accommodationInfo',
                'resourceManagers',
                'resourceManagers.employee',
            ],
        });
        return new resource_response_dto_1.ResourceResponseDto(resource);
    }
    async returnVehicle(resourceId, updateDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const resource = await this.resourceService.findOne({
                where: { resourceId: resourceId },
                relations: ['vehicleInfo'],
            });
            if (!resource) {
                throw new common_1.NotFoundException('Resource not found');
            }
            await this.resourceService.update(resourceId, { location: updateDto.location }, { queryRunner });
            const vehicleInfo = await this.vehicleInfoService.findOne({
                where: { vehicleInfoId: resource.vehicleInfo.vehicleInfoId },
            });
            if (!vehicleInfo) {
                throw new common_1.NotFoundException('Vehicle info not found');
            }
            await this.vehicleInfoService.update(vehicleInfo.vehicleInfoId, {
                leftMileage: updateDto.leftMileage,
                totalMileage: updateDto.totalMileage,
                parkingLocationImages: updateDto.parkingLocationImages,
                odometerImages: updateDto.odometerImages,
            }, { queryRunner });
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw new common_1.InternalServerErrorException('Failed to return vehicle');
        }
        finally {
            await queryRunner.release();
        }
    }
    async createResourceWithInfos(createResourceInfo) {
        const { resource, typeInfo, managers } = createResourceInfo;
        if (!resource.resourceGroupId) {
            throw new common_1.BadRequestException('Resource group ID is required');
        }
        if (!managers || managers.length === 0) {
            throw new common_1.BadRequestException('Managers are required');
        }
        const group = await this.resourceGroupService.findOne(resource.resourceGroupId);
        if (!group) {
            throw new common_1.NotFoundException('Resource group not found');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const savedResource = await this.resourceService.save(resource, { queryRunner });
            const handler = this.typeHandlers.get(group.type);
            if (!handler) {
                throw new common_1.BadRequestException(`Unsupported resource type: ${group.type}`);
            }
            await handler.createTypeInfo(savedResource, typeInfo, { queryRunner });
            await Promise.all([
                ...managers.map((manager) => {
                    return this.resourceManagerService.save({
                        resourceId: savedResource.resourceId,
                        employeeId: manager.employeeId,
                    }, { queryRunner });
                }),
                ...managers.map((manager) => this.userService.addRole(manager.employeeId, role_type_enum_1.Role.RESOURCE_ADMIN, { queryRunner })),
            ]);
            await queryRunner.commitTransaction();
            return true;
        }
        catch (err) {
            console.error(err);
            await queryRunner.rollbackTransaction();
            throw new common_1.InternalServerErrorException('Failed to create resource');
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.ResourceUsecase = ResourceUsecase;
exports.ResourceUsecase = ResourceUsecase = __decorate([
    (0, common_1.Injectable)(),
    __param(7, (0, common_1.Inject)('ResourceTypeHandlers')),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_service_1.ResourceService !== "undefined" && resource_service_1.ResourceService) === "function" ? _a : Object, typeof (_b = typeof resource_manager_service_1.ResourceManagerService !== "undefined" && resource_manager_service_1.ResourceManagerService) === "function" ? _b : Object, typeof (_c = typeof resource_group_service_1.ResourceGroupService !== "undefined" && resource_group_service_1.ResourceGroupService) === "function" ? _c : Object, typeof (_d = typeof reservation_service_1.ReservationService !== "undefined" && reservation_service_1.ReservationService) === "function" ? _d : Object, typeof (_e = typeof vehicle_info_service_1.VehicleInfoService !== "undefined" && vehicle_info_service_1.VehicleInfoService) === "function" ? _e : Object, typeof (_f = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _f : Object, typeof (_g = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _g : Object, typeof (_h = typeof Map !== "undefined" && Map) === "function" ? _h : Object])
], ResourceUsecase);


/***/ }),

/***/ "./apps/resource/src/modules/resource/common/domain/ports/resource-group.repository.port.ts":
/*!**************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/common/domain/ports/resource-group.repository.port.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/resource/src/modules/resource/common/domain/ports/resource-manager.repository.port.ts":
/*!****************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/common/domain/ports/resource-manager.repository.port.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/resource/src/modules/resource/common/domain/ports/resource.repository.port.ts":
/*!********************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/common/domain/ports/resource.repository.port.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/resource/src/modules/resource/common/infrastructure/adapters/in/web/controllers/resource-group.controller.ts":
/*!***************************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/common/infrastructure/adapters/in/web/controllers/resource-group.controller.ts ***!
  \***************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceGroupController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const api_responses_decorator_1 = __webpack_require__(/*! @libs/decorators/api-responses.decorator */ "./libs/decorators/api-responses.decorator.ts");
const create_resource_dto_1 = __webpack_require__(/*! @resource/modules/resource/common/application/dtos/create-resource.dto */ "./apps/resource/src/modules/resource/common/application/dtos/create-resource.dto.ts");
const resource_response_dto_1 = __webpack_require__(/*! @resource/modules/resource/common/application/dtos/resource-response.dto */ "./apps/resource/src/modules/resource/common/application/dtos/resource-response.dto.ts");
const update_resource_dto_1 = __webpack_require__(/*! @resource/modules/resource/common/application/dtos/update-resource.dto */ "./apps/resource/src/modules/resource/common/application/dtos/update-resource.dto.ts");
const role_decorator_1 = __webpack_require__(/*! @libs/decorators/role.decorator */ "./libs/decorators/role.decorator.ts");
const role_type_enum_1 = __webpack_require__(/*! @libs/enums/role-type.enum */ "./libs/enums/role-type.enum.ts");
const resource_group_usecase_1 = __webpack_require__(/*! @resource/modules/resource/common/application/usecases/resource-group.usecase */ "./apps/resource/src/modules/resource/common/application/usecases/resource-group.usecase.ts");
let ResourceGroupController = class ResourceGroupController {
    constructor(resourceGroupUsecase) {
        this.resourceGroupUsecase = resourceGroupUsecase;
    }
    async findParentResourceGroups() {
        return this.resourceGroupUsecase.findParentResourceGroups();
    }
    async findAll() {
        return this.resourceGroupUsecase.findResourceGroupsWithResourceData();
    }
    async create(createResourceGroupDto) {
        return;
    }
    async update(resourceGroupId, updateResourceGroupDto) {
        return;
    }
    async remove(resourceGroupId) {
    }
};
exports.ResourceGroupController = ResourceGroupController;
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Get)('parents'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: '상위그룹 목록 조회 #사용자/자원구분/모달' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '상위 자원 그룹 목록을 조회했습니다.',
        type: [resource_response_dto_1.ResourceGroupResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ResourceGroupController.prototype, "findParentResourceGroups", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Get)('resources'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: '상위그룹-하위그룹-자원 목록 조회 #사용자/자원선택/모달' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '자원 그룹들과 각 그룹에 속한 자원 목록을 조회했습니다.',
        type: [resource_response_dto_1.ResourceGroupWithResourcesResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ResourceGroupController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3-'),
    (0, common_1.Post)(),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: '자원 그룹 생성' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 201,
        description: '자원 그룹이 생성되었습니다.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof create_resource_dto_1.CreateResourceGroupDto !== "undefined" && create_resource_dto_1.CreateResourceGroupDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], ResourceGroupController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3-'),
    (0, common_1.Patch)(':resourceGroupId'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: '자원 그룹 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '자원 그룹이 수정되었습니다.',
    }),
    __param(0, (0, common_1.Param)('resourceGroupId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof update_resource_dto_1.UpdateResourceGroupDto !== "undefined" && update_resource_dto_1.UpdateResourceGroupDto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], ResourceGroupController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3-'),
    (0, common_1.Delete)(':resourceGroupId'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: '자원 그룹 삭제' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '자원 그룹이 삭제되었습니다.',
    }),
    __param(0, (0, common_1.Param)('resourceGroupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ResourceGroupController.prototype, "remove", null);
exports.ResourceGroupController = ResourceGroupController = __decorate([
    (0, swagger_1.ApiTags)('자원 그룹'),
    (0, common_1.Controller)('resource-groups'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_group_usecase_1.ResourceGroupUsecase !== "undefined" && resource_group_usecase_1.ResourceGroupUsecase) === "function" ? _a : Object])
], ResourceGroupController);


/***/ }),

/***/ "./apps/resource/src/modules/resource/common/infrastructure/adapters/in/web/controllers/resource-manager.controller.ts":
/*!*****************************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/common/infrastructure/adapters/in/web/controllers/resource-manager.controller.ts ***!
  \*****************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceManagerController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const resource_manager_service_1 = __webpack_require__(/*! @resource/modules/resource/common/application/services/resource-manager.service */ "./apps/resource/src/modules/resource/common/application/services/resource-manager.service.ts");
let ResourceManagerController = class ResourceManagerController {
    constructor(resourceManagerService) {
        this.resourceManagerService = resourceManagerService;
    }
};
exports.ResourceManagerController = ResourceManagerController;
exports.ResourceManagerController = ResourceManagerController = __decorate([
    (0, swagger_1.ApiTags)('resource-managers'),
    (0, common_1.Controller)('resources/:resourceId/managers'),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_manager_service_1.ResourceManagerService !== "undefined" && resource_manager_service_1.ResourceManagerService) === "function" ? _a : Object])
], ResourceManagerController);


/***/ }),

/***/ "./apps/resource/src/modules/resource/common/infrastructure/adapters/in/web/controllers/resource.controller.ts":
/*!*********************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/common/infrastructure/adapters/in/web/controllers/resource.controller.ts ***!
  \*********************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const api_responses_decorator_1 = __webpack_require__(/*! @libs/decorators/api-responses.decorator */ "./libs/decorators/api-responses.decorator.ts");
const dtos_index_1 = __webpack_require__(/*! @resource/dtos.index */ "./apps/resource/src/dtos.index.ts");
const role_type_enum_1 = __webpack_require__(/*! @libs/enums/role-type.enum */ "./libs/enums/role-type.enum.ts");
const role_decorator_1 = __webpack_require__(/*! @libs/decorators/role.decorator */ "./libs/decorators/role.decorator.ts");
const resource_type_enum_1 = __webpack_require__(/*! @libs/enums/resource-type.enum */ "./libs/enums/resource-type.enum.ts");
const resource_usecase_1 = __webpack_require__(/*! @resource/modules/resource/common/application/usecases/resource.usecase */ "./apps/resource/src/modules/resource/common/application/usecases/resource.usecase.ts");
const resource_response_dto_1 = __webpack_require__(/*! @resource/modules/resource/common/application/dtos/resource-response.dto */ "./apps/resource/src/modules/resource/common/application/dtos/resource-response.dto.ts");
const update_resource_dto_1 = __webpack_require__(/*! @resource/modules/resource/common/application/dtos/update-resource.dto */ "./apps/resource/src/modules/resource/common/application/dtos/update-resource.dto.ts");
let ResourceController = class ResourceController {
    constructor(resourceUsecase) {
        this.resourceUsecase = resourceUsecase;
    }
    async findResourcesByTypeAndDateWithReservations(type, startDate, endDate) {
        return this.resourceUsecase.findResourcesByTypeAndDateWithReservations(type, startDate, endDate);
    }
    async returnVehicle(resourceId, returnDto) {
        return this.resourceUsecase.returnVehicle(resourceId, returnDto);
    }
    async createWithInfos(createResourceInfo) {
        return this.resourceUsecase.createResourceWithInfos(createResourceInfo);
    }
    async findOne(resourceId) {
        return this.resourceUsecase.findResourceDetail(resourceId);
    }
    async findByResourceGroupId(resourceGroupId) {
        return [];
    }
    async update(resourceId, updateResourceInfoDto) {
        return;
    }
    async remove(resourceId) {
        return;
    }
};
exports.ResourceController = ResourceController;
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Get)(),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: '자원 별 예약 목록 조회 #사용자/자원예약/리스트 #사용자/세부예약내역' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '자원 목록을 성공적으로 조회했습니다.',
        type: [resource_response_dto_1.ResourceGroupWithResourcesAndReservationsResponseDto],
    }),
    (0, swagger_1.ApiQuery)({ name: 'type', enum: resource_type_enum_1.ResourceType }),
    (0, swagger_1.ApiQuery)({ name: 'startDate' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate' }),
    __param(0, (0, common_1.Query)('type')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _b : Object, String, String]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ResourceController.prototype, "findResourcesByTypeAndDateWithReservations", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Patch)(':resourceId/return-vehicle'),
    (0, swagger_1.ApiOperation)({ summary: '차량 반납 #사용자/자원예약/차량반납' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '차량 반납 성공',
    }),
    __param(0, (0, common_1.Param)('resourceId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof update_resource_dto_1.ReturnVehicleDto !== "undefined" && update_resource_dto_1.ReturnVehicleDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ResourceController.prototype, "returnVehicle", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Post)(),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: '자원 생성 #관리자/자원관리/생성' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 201,
        description: '자원이 성공적으로 생성되었습니다.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof dtos_index_1.CreateResourceInfoDto !== "undefined" && dtos_index_1.CreateResourceInfoDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ResourceController.prototype, "createWithInfos", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Get)(':resourceId'),
    (0, swagger_1.ApiOperation)({ summary: '자원 상세 조회 #관리자/자원관리/상세' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '자원을 성공적으로 조회했습니다.',
        type: dtos_index_1.ResourceResponseDto,
    }),
    __param(0, (0, common_1.Param)('resourceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ResourceController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3-'),
    (0, common_1.Get)('group/:resourceGroupId'),
    (0, swagger_1.ApiOperation)({ summary: '그룹 별 자원 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '그룹 별 자원을 성공적으로 조회했습니다.',
        type: dtos_index_1.ResourceResponseDto,
    }),
    __param(0, (0, common_1.Param)('resourceGroupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], ResourceController.prototype, "findByResourceGroupId", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3-'),
    (0, common_1.Patch)(':resourceId'),
    (0, swagger_1.ApiOperation)({ summary: '자원 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '자원이 성공적으로 수정되었습니다.',
        type: dtos_index_1.ResourceResponseDto,
    }),
    __param(0, (0, common_1.Param)('resourceId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_k = typeof dtos_index_1.UpdateResourceInfoDto !== "undefined" && dtos_index_1.UpdateResourceInfoDto) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], ResourceController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3-'),
    (0, common_1.Delete)(':resourceId'),
    (0, swagger_1.ApiOperation)({ summary: '자원 삭제' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '자원이 성공적으로 삭제되었습니다.',
    }),
    __param(0, (0, common_1.Param)('resourceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], ResourceController.prototype, "remove", null);
exports.ResourceController = ResourceController = __decorate([
    (0, swagger_1.ApiTags)('자원'),
    (0, common_1.Controller)('resources'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_usecase_1.ResourceUsecase !== "undefined" && resource_usecase_1.ResourceUsecase) === "function" ? _a : Object])
], ResourceController);


/***/ }),

/***/ "./apps/resource/src/modules/resource/common/infrastructure/adapters/out/persistence/resource-group.repository.ts":
/*!************************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/common/infrastructure/adapters/out/persistence/resource-group.repository.ts ***!
  \************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceGroupRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
let ResourceGroupRepository = class ResourceGroupRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async save(resourceGroup, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.ResourceGroup)
            : this.repository;
        return repository.save(resourceGroup);
    }
    async findOne(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.ResourceGroup)
            : this.repository;
        return repository.findOne({ where: repositoryOptions?.where });
    }
    async find(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.ResourceGroup)
            : this.repository;
        return repository.find({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            order: repositoryOptions?.order,
            skip: repositoryOptions?.skip,
            take: repositoryOptions?.take,
        });
    }
    async update(id, resourceGroup, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.ResourceGroup)
            : this.repository;
        await repository.update({ resourceGroupId: id }, resourceGroup);
        const updated = await repository.findOne({ where: { resourceGroupId: id } });
        if (!updated)
            throw new common_1.NotFoundException('Resource group not found');
        return updated;
    }
    async delete(id, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.ResourceGroup)
            : this.repository;
        await repository.delete({ resourceGroupId: id });
    }
};
exports.ResourceGroupRepository = ResourceGroupRepository;
exports.ResourceGroupRepository = ResourceGroupRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.ResourceGroup)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ResourceGroupRepository);


/***/ }),

/***/ "./apps/resource/src/modules/resource/common/infrastructure/adapters/out/persistence/resource-manager.repository.ts":
/*!**************************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/common/infrastructure/adapters/out/persistence/resource-manager.repository.ts ***!
  \**************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceManagerRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
let ResourceManagerRepository = class ResourceManagerRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async save(resourceManager, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.ResourceManager)
            : this.repository;
        return repository.save(resourceManager);
    }
    async findOne(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.ResourceManager)
            : this.repository;
        return repository.findOne({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            order: repositoryOptions?.order,
        });
    }
    async find(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.ResourceManager)
            : this.repository;
        return repository.find({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            order: repositoryOptions?.order,
            skip: repositoryOptions?.skip,
            take: repositoryOptions?.take,
        });
    }
    async update(id, resourceManager, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.ResourceManager)
            : this.repository;
        await repository.update({ resourceManagerId: id }, resourceManager);
        const updated = await repository.findOne({ where: { resourceManagerId: id } });
        if (!updated)
            throw new common_1.NotFoundException('Resource manager not found');
        return updated;
    }
    async delete(id, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.ResourceManager)
            : this.repository;
        await repository.delete({ resourceManagerId: id });
    }
};
exports.ResourceManagerRepository = ResourceManagerRepository;
exports.ResourceManagerRepository = ResourceManagerRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.ResourceManager)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ResourceManagerRepository);


/***/ }),

/***/ "./apps/resource/src/modules/resource/common/infrastructure/adapters/out/persistence/resource.repository.ts":
/*!******************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/common/infrastructure/adapters/out/persistence/resource.repository.ts ***!
  \******************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
let ResourceRepository = class ResourceRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async save(resource, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Resource)
            : this.repository;
        const savedEntity = await repository.save(resource);
        return await repository.findOne({
            where: { resourceId: savedEntity.resourceId },
            relations: ['resourceGroup'],
        });
    }
    async findOne(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Resource)
            : this.repository;
        return repository.findOne({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            order: repositoryOptions?.order,
        });
    }
    async find(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Resource)
            : this.repository;
        return await repository.find({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            order: repositoryOptions?.order,
            skip: repositoryOptions?.skip,
            take: repositoryOptions?.take,
        });
    }
    async update(id, resource, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Resource)
            : this.repository;
        await repository.update({ resourceId: id }, resource);
        const updated = await repository.findOne({
            where: { resourceId: id },
            relations: ['resourceGroup'],
        });
        if (!updated)
            throw new common_1.NotFoundException('Resource not found');
        return updated;
    }
    async delete(id, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Resource)
            : this.repository;
        await repository.delete({ resourceId: id });
    }
};
exports.ResourceRepository = ResourceRepository;
exports.ResourceRepository = ResourceRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Resource)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ResourceRepository);


/***/ }),

/***/ "./apps/resource/src/modules/resource/meeting-room/application/dtos/create-meeting-room-info.dto.ts":
/*!**********************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/meeting-room/application/dtos/create-meeting-room-info.dto.ts ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateMeetingRoomInfoDto = void 0;
class CreateMeetingRoomInfoDto {
}
exports.CreateMeetingRoomInfoDto = CreateMeetingRoomInfoDto;


/***/ }),

/***/ "./apps/resource/src/modules/resource/meeting-room/application/dtos/meeting-room-info-response.dto.ts":
/*!************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/meeting-room/application/dtos/meeting-room-info-response.dto.ts ***!
  \************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeetingRoomInfoResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class MeetingRoomInfoResponseDto {
}
exports.MeetingRoomInfoResponseDto = MeetingRoomInfoResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MeetingRoomInfoResponseDto.prototype, "meetingRoomInfoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MeetingRoomInfoResponseDto.prototype, "resourceId", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/resource/meeting-room/application/dtos/update-meeting-room-info.dto.ts":
/*!**********************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/meeting-room/application/dtos/update-meeting-room-info.dto.ts ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateMeetingRoomInfoDto = void 0;
class UpdateMeetingRoomInfoDto {
}
exports.UpdateMeetingRoomInfoDto = UpdateMeetingRoomInfoDto;


/***/ }),

/***/ "./apps/resource/src/modules/resource/meeting-room/application/handlers/meeting-room-resource.handler.ts":
/*!***************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/meeting-room/application/handlers/meeting-room-resource.handler.ts ***!
  \***************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeetingRoomResourceHandler = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const meeting_room_info_repository_port_1 = __webpack_require__(/*! ../../domain/ports/meeting-room-info.repository.port */ "./apps/resource/src/modules/resource/meeting-room/domain/ports/meeting-room-info.repository.port.ts");
const meeting_room_info_1 = __webpack_require__(/*! ../../domain/models/meeting-room-info */ "./apps/resource/src/modules/resource/meeting-room/domain/models/meeting-room-info.ts");
let MeetingRoomResourceHandler = class MeetingRoomResourceHandler {
    constructor(meetingRoomInfoRepository) {
        this.meetingRoomInfoRepository = meetingRoomInfoRepository;
    }
    async createTypeInfo(resource, typeInfo, repositoryOptions) {
        const meetingRoomInfo = new meeting_room_info_1.MeetingRoomInfo({
            ...typeInfo,
            resourceId: resource.resourceId,
        });
        await this.meetingRoomInfoRepository.save(meetingRoomInfo, repositoryOptions);
    }
    async getTypeInfo(resourceId, repositoryOptions) {
        return this.meetingRoomInfoRepository.findByResourceId(resourceId, repositoryOptions);
    }
    async updateTypeInfo(resource, typeInfo, repositoryOptions) {
        await this.meetingRoomInfoRepository.update(resource.resourceId, typeInfo, repositoryOptions);
    }
    async deleteTypeInfo(resourceId, repositoryOptions) {
        await this.meetingRoomInfoRepository.delete(resourceId, repositoryOptions);
    }
    async validateTypeData(typeInfo, repositoryOptions) {
        return true;
    }
};
exports.MeetingRoomResourceHandler = MeetingRoomResourceHandler;
exports.MeetingRoomResourceHandler = MeetingRoomResourceHandler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MeetingRoomInfoRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof meeting_room_info_repository_port_1.MeetingRoomInfoRepositoryPort !== "undefined" && meeting_room_info_repository_port_1.MeetingRoomInfoRepositoryPort) === "function" ? _a : Object])
], MeetingRoomResourceHandler);


/***/ }),

/***/ "./apps/resource/src/modules/resource/meeting-room/application/services/meeting-room-info.service.ts":
/*!***********************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/meeting-room/application/services/meeting-room-info.service.ts ***!
  \***********************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeetingRoomInfoService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const meeting_room_info_repository_port_1 = __webpack_require__(/*! @resource/modules/resource/meeting-room/domain/ports/meeting-room-info.repository.port */ "./apps/resource/src/modules/resource/meeting-room/domain/ports/meeting-room-info.repository.port.ts");
const meeting_room_info_1 = __webpack_require__(/*! @resource/modules/resource/meeting-room/domain/models/meeting-room-info */ "./apps/resource/src/modules/resource/meeting-room/domain/models/meeting-room-info.ts");
let MeetingRoomInfoService = class MeetingRoomInfoService {
    constructor(meetingRoomInfoRepository) {
        this.meetingRoomInfoRepository = meetingRoomInfoRepository;
    }
    async create(createDto) {
        const meetingRoomInfo = new meeting_room_info_1.MeetingRoomInfo({
            resourceId: createDto.resourceId,
        });
        return this.meetingRoomInfoRepository.save(meetingRoomInfo);
    }
    async findByResourceId(resourceId) {
        const info = await this.meetingRoomInfoRepository.findByResourceId(resourceId);
        if (!info) {
            throw new common_1.NotFoundException('Meeting room info not found');
        }
        return info;
    }
    async update(resourceId, updateData) {
        const info = await this.findByResourceId(resourceId);
        return this.meetingRoomInfoRepository.update(resourceId, {
            ...info,
            ...updateData,
        });
    }
    async remove(resourceId) {
        await this.meetingRoomInfoRepository.delete(resourceId);
    }
};
exports.MeetingRoomInfoService = MeetingRoomInfoService;
exports.MeetingRoomInfoService = MeetingRoomInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MeetingRoomInfoRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof meeting_room_info_repository_port_1.MeetingRoomInfoRepositoryPort !== "undefined" && meeting_room_info_repository_port_1.MeetingRoomInfoRepositoryPort) === "function" ? _a : Object])
], MeetingRoomInfoService);


/***/ }),

/***/ "./apps/resource/src/modules/resource/meeting-room/domain/models/meeting-room-info.ts":
/*!********************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/meeting-room/domain/models/meeting-room-info.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeetingRoomInfo = void 0;
class MeetingRoomInfo {
    constructor(props) {
        this.validateProps(props);
        this.props = props;
    }
    validateProps(props) {
        if (!props.resourceId) {
            throw new Error('Resource ID is required');
        }
    }
    get meetingRoomInfoId() {
        return this.props.meetingRoomInfoId;
    }
    get resourceId() {
        return this.props.resourceId;
    }
    toJSON() {
        return { ...this.props };
    }
}
exports.MeetingRoomInfo = MeetingRoomInfo;


/***/ }),

/***/ "./apps/resource/src/modules/resource/meeting-room/domain/ports/meeting-room-info.repository.port.ts":
/*!***********************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/meeting-room/domain/ports/meeting-room-info.repository.port.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/resource/src/modules/resource/meeting-room/infrastructure/adapters/in/web/controllers/meeting-room-info.controller.ts":
/*!************************************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/meeting-room/infrastructure/adapters/in/web/controllers/meeting-room-info.controller.ts ***!
  \************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeetingRoomInfoController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const meeting_room_info_service_1 = __webpack_require__(/*! @resource/modules/resource/meeting-room/application/services/meeting-room-info.service */ "./apps/resource/src/modules/resource/meeting-room/application/services/meeting-room-info.service.ts");
let MeetingRoomInfoController = class MeetingRoomInfoController {
    constructor(meetingRoomInfoService) {
        this.meetingRoomInfoService = meetingRoomInfoService;
    }
};
exports.MeetingRoomInfoController = MeetingRoomInfoController;
exports.MeetingRoomInfoController = MeetingRoomInfoController = __decorate([
    (0, swagger_1.ApiTags)('meeting-room-info'),
    (0, common_1.Controller)('resources/:resourceId/meeting-room-info'),
    __metadata("design:paramtypes", [typeof (_a = typeof meeting_room_info_service_1.MeetingRoomInfoService !== "undefined" && meeting_room_info_service_1.MeetingRoomInfoService) === "function" ? _a : Object])
], MeetingRoomInfoController);


/***/ }),

/***/ "./apps/resource/src/modules/resource/meeting-room/infrastructure/adapters/out/persistence/meeting-room-info.repository.ts":
/*!*********************************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/meeting-room/infrastructure/adapters/out/persistence/meeting-room-info.repository.ts ***!
  \*********************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeetingRoomInfoRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
const meeting_room_info_1 = __webpack_require__(/*! @resource/modules/resource/meeting-room/domain/models/meeting-room-info */ "./apps/resource/src/modules/resource/meeting-room/domain/models/meeting-room-info.ts");
let MeetingRoomInfoRepository = class MeetingRoomInfoRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async save(meetingRoomInfo, repositoryOptions) {
        const entity = this.toEntity(meetingRoomInfo);
        const repository = repositoryOptions?.queryRunner ? repositoryOptions.queryRunner.manager.getRepository(entities_1.MeetingRoomInfo) : this.repository;
        const savedEntity = await repository.save(entity);
        return this.toDomain(savedEntity);
    }
    async findByResourceId(resourceId, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner ? repositoryOptions.queryRunner.manager.getRepository(entities_1.MeetingRoomInfo) : this.repository;
        const entity = await repository.findOne({ where: { resourceId } });
        return entity ? this.toDomain(entity) : null;
    }
    async update(resourceId, meetingRoomInfo, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner ? repositoryOptions.queryRunner.manager.getRepository(entities_1.MeetingRoomInfo) : this.repository;
        await repository.update({ resourceId }, this.toEntity(meetingRoomInfo));
        const updated = await this.findByResourceId(resourceId, repositoryOptions);
        if (!updated)
            throw new common_1.NotFoundException('Meeting room info not found');
        return updated;
    }
    async delete(resourceId, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner ? repositoryOptions.queryRunner.manager.getRepository(entities_1.MeetingRoomInfo) : this.repository;
        await repository.delete({ resourceId });
    }
    toDomain(entity) {
        return new meeting_room_info_1.MeetingRoomInfo({
            meetingRoomInfoId: entity.meetingRoomInfoId,
            resourceId: entity.resourceId,
        });
    }
    toEntity(domain) {
        const props = domain instanceof meeting_room_info_1.MeetingRoomInfo ? domain.toJSON() : domain;
        return {
            meetingRoomInfoId: props.meetingRoomInfoId,
            resourceId: props.resourceId,
        };
    }
};
exports.MeetingRoomInfoRepository = MeetingRoomInfoRepository;
exports.MeetingRoomInfoRepository = MeetingRoomInfoRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.MeetingRoomInfo)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], MeetingRoomInfoRepository);


/***/ }),

/***/ "./apps/resource/src/modules/resource/meeting-room/meeting-room-resource.module.ts":
/*!*****************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/meeting-room/meeting-room-resource.module.ts ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeetingRoomResourceModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
const meeting_room_resource_handler_1 = __webpack_require__(/*! ./application/handlers/meeting-room-resource.handler */ "./apps/resource/src/modules/resource/meeting-room/application/handlers/meeting-room-resource.handler.ts");
const meeting_room_info_service_1 = __webpack_require__(/*! ./application/services/meeting-room-info.service */ "./apps/resource/src/modules/resource/meeting-room/application/services/meeting-room-info.service.ts");
const meeting_room_info_repository_1 = __webpack_require__(/*! ./infrastructure/adapters/out/persistence/meeting-room-info.repository */ "./apps/resource/src/modules/resource/meeting-room/infrastructure/adapters/out/persistence/meeting-room-info.repository.ts");
const meeting_room_info_controller_1 = __webpack_require__(/*! ./infrastructure/adapters/in/web/controllers/meeting-room-info.controller */ "./apps/resource/src/modules/resource/meeting-room/infrastructure/adapters/in/web/controllers/meeting-room-info.controller.ts");
let MeetingRoomResourceModule = class MeetingRoomResourceModule {
};
exports.MeetingRoomResourceModule = MeetingRoomResourceModule;
exports.MeetingRoomResourceModule = MeetingRoomResourceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.MeetingRoomInfo]),
        ],
        providers: [
            meeting_room_resource_handler_1.MeetingRoomResourceHandler,
            meeting_room_info_service_1.MeetingRoomInfoService,
            meeting_room_info_repository_1.MeetingRoomInfoRepository,
            {
                provide: 'MeetingRoomInfoRepositoryPort',
                useExisting: meeting_room_info_repository_1.MeetingRoomInfoRepository,
            },
        ],
        controllers: [
            meeting_room_info_controller_1.MeetingRoomInfoController,
        ],
        exports: [
            meeting_room_resource_handler_1.MeetingRoomResourceHandler,
            meeting_room_info_service_1.MeetingRoomInfoService,
        ],
    })
], MeetingRoomResourceModule);


/***/ }),

/***/ "./apps/resource/src/modules/resource/resource.module.ts":
/*!***************************************************************!*\
  !*** ./apps/resource/src/modules/resource/resource.module.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
const resource_service_1 = __webpack_require__(/*! ./common/application/services/resource.service */ "./apps/resource/src/modules/resource/common/application/services/resource.service.ts");
const resource_group_service_1 = __webpack_require__(/*! ./common/application/services/resource-group.service */ "./apps/resource/src/modules/resource/common/application/services/resource-group.service.ts");
const resource_manager_service_1 = __webpack_require__(/*! ./common/application/services/resource-manager.service */ "./apps/resource/src/modules/resource/common/application/services/resource-manager.service.ts");
const resource_controller_1 = __webpack_require__(/*! ./common/infrastructure/adapters/in/web/controllers/resource.controller */ "./apps/resource/src/modules/resource/common/infrastructure/adapters/in/web/controllers/resource.controller.ts");
const resource_group_controller_1 = __webpack_require__(/*! ./common/infrastructure/adapters/in/web/controllers/resource-group.controller */ "./apps/resource/src/modules/resource/common/infrastructure/adapters/in/web/controllers/resource-group.controller.ts");
const resource_manager_controller_1 = __webpack_require__(/*! ./common/infrastructure/adapters/in/web/controllers/resource-manager.controller */ "./apps/resource/src/modules/resource/common/infrastructure/adapters/in/web/controllers/resource-manager.controller.ts");
const resource_repository_1 = __webpack_require__(/*! ./common/infrastructure/adapters/out/persistence/resource.repository */ "./apps/resource/src/modules/resource/common/infrastructure/adapters/out/persistence/resource.repository.ts");
const resource_group_repository_1 = __webpack_require__(/*! ./common/infrastructure/adapters/out/persistence/resource-group.repository */ "./apps/resource/src/modules/resource/common/infrastructure/adapters/out/persistence/resource-group.repository.ts");
const resource_manager_repository_1 = __webpack_require__(/*! ./common/infrastructure/adapters/out/persistence/resource-manager.repository */ "./apps/resource/src/modules/resource/common/infrastructure/adapters/out/persistence/resource-manager.repository.ts");
const vehicle_resource_module_1 = __webpack_require__(/*! ./vehicle/vehicle-resource.module */ "./apps/resource/src/modules/resource/vehicle/vehicle-resource.module.ts");
const meeting_room_resource_module_1 = __webpack_require__(/*! ./meeting-room/meeting-room-resource.module */ "./apps/resource/src/modules/resource/meeting-room/meeting-room-resource.module.ts");
const resource_type_enum_1 = __webpack_require__(/*! @libs/enums/resource-type.enum */ "./libs/enums/resource-type.enum.ts");
const vehicle_resource_handler_1 = __webpack_require__(/*! ./vehicle/application/handlers/vehicle-resource.handler */ "./apps/resource/src/modules/resource/vehicle/application/handlers/vehicle-resource.handler.ts");
const meeting_room_resource_handler_1 = __webpack_require__(/*! ./meeting-room/application/handlers/meeting-room-resource.handler */ "./apps/resource/src/modules/resource/meeting-room/application/handlers/meeting-room-resource.handler.ts");
const accommodation_resource_module_1 = __webpack_require__(/*! ./accommodation/accommodation-resource.module */ "./apps/resource/src/modules/resource/accommodation/accommodation-resource.module.ts");
const accommodation_resource_handler_1 = __webpack_require__(/*! ./accommodation/application/handlers/accommodation-resource.handler */ "./apps/resource/src/modules/resource/accommodation/application/handlers/accommodation-resource.handler.ts");
const auth_module_1 = __webpack_require__(/*! @resource/modules/auth/auth.module */ "./apps/resource/src/modules/auth/auth.module.ts");
const resource_group_usecase_1 = __webpack_require__(/*! ./common/application/usecases/resource-group.usecase */ "./apps/resource/src/modules/resource/common/application/usecases/resource-group.usecase.ts");
const reservation_module_1 = __webpack_require__(/*! ../reservation/reservation.module */ "./apps/resource/src/modules/reservation/reservation.module.ts");
const resource_usecase_1 = __webpack_require__(/*! ./common/application/usecases/resource.usecase */ "./apps/resource/src/modules/resource/common/application/usecases/resource.usecase.ts");
let ResourceModule = class ResourceModule {
};
exports.ResourceModule = ResourceModule;
exports.ResourceModule = ResourceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.Resource, entities_1.ResourceGroup, entities_1.ResourceManager, entities_1.User, entities_1.Employee]),
            vehicle_resource_module_1.VehicleResourceModule,
            meeting_room_resource_module_1.MeetingRoomResourceModule,
            accommodation_resource_module_1.AccommodationResourceModule,
            auth_module_1.AuthModule,
            reservation_module_1.ReservationModule,
        ],
        providers: [
            resource_service_1.ResourceService,
            resource_group_service_1.ResourceGroupService,
            resource_manager_service_1.ResourceManagerService,
            resource_repository_1.ResourceRepository,
            {
                provide: 'ResourceRepositoryPort',
                useClass: resource_repository_1.ResourceRepository,
            },
            resource_group_repository_1.ResourceGroupRepository,
            {
                provide: 'ResourceGroupRepositoryPort',
                useExisting: resource_group_repository_1.ResourceGroupRepository,
            },
            resource_manager_repository_1.ResourceManagerRepository,
            {
                provide: 'ResourceManagerRepositoryPort',
                useExisting: resource_manager_repository_1.ResourceManagerRepository,
            },
            {
                provide: 'ResourceTypeHandlers',
                useFactory: (vehicleHandler, meetingRoomHandler, accommodationHandler) => {
                    const handlers = new Map();
                    handlers.set(resource_type_enum_1.ResourceType.VEHICLE, vehicleHandler);
                    handlers.set(resource_type_enum_1.ResourceType.MEETING_ROOM, meetingRoomHandler);
                    handlers.set(resource_type_enum_1.ResourceType.ACCOMMODATION, accommodationHandler);
                    return handlers;
                },
                inject: [vehicle_resource_handler_1.VehicleResourceHandler, meeting_room_resource_handler_1.MeetingRoomResourceHandler, accommodation_resource_handler_1.AccommodationResourceHandler],
            },
            resource_usecase_1.ResourceUsecase,
            resource_group_usecase_1.ResourceGroupUsecase,
        ],
        controllers: [resource_controller_1.ResourceController, resource_group_controller_1.ResourceGroupController, resource_manager_controller_1.ResourceManagerController],
        exports: [resource_service_1.ResourceService, resource_group_service_1.ResourceGroupService, resource_manager_service_1.ResourceManagerService],
    })
], ResourceModule);


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/application/dtos/consumable-response.dto.ts":
/*!************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/application/dtos/consumable-response.dto.ts ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConsumableResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class ConsumableResponseDto {
}
exports.ConsumableResponseDto = ConsumableResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ConsumableResponseDto.prototype, "consumableId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ConsumableResponseDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ConsumableResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ConsumableResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ConsumableResponseDto.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ConsumableResponseDto.prototype, "replacementDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ConsumableResponseDto.prototype, "mileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ConsumableResponseDto.prototype, "nextReplacementDate", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/application/dtos/create-consumable.dto.ts":
/*!**********************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/application/dtos/create-consumable.dto.ts ***!
  \**********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateConsumableDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateConsumableDto {
}
exports.CreateConsumableDto = CreateConsumableDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConsumableDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConsumableDto.prototype, "replaceCycle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateConsumableDto.prototype, "notifyReplacementCycle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '차량 ID',
        example: 'vehicle-123'
    }),
    __metadata("design:type", String)
], CreateConsumableDto.prototype, "vehicleId", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/application/dtos/create-maintenance.dto.ts":
/*!***********************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/application/dtos/create-maintenance.dto.ts ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateMaintenanceDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateMaintenanceDto {
}
exports.CreateMaintenanceDto = CreateMaintenanceDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMaintenanceDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMaintenanceDto.prototype, "mileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMaintenanceDto.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateMaintenanceDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '소모품 ID',
        example: 'consumable-123'
    }),
    __metadata("design:type", String)
], CreateMaintenanceDto.prototype, "consumableId", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/application/dtos/create-vehicle-info.dto.ts":
/*!************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/application/dtos/create-vehicle-info.dto.ts ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateVehicleInfoDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateVehicleInfoDto {
}
exports.CreateVehicleInfoDto = CreateVehicleInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVehicleInfoDto.prototype, "leftMileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVehicleInfoDto.prototype, "totalMileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVehicleInfoDto.prototype, "insuranceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVehicleInfoDto.prototype, "insuranceNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [String], description: '주차위치 이미지 배열' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateVehicleInfoDto.prototype, "parkingLocationImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [String], description: '계기판 이미지 배열' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateVehicleInfoDto.prototype, "odometerImages", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/application/dtos/maintenance-response.dto.ts":
/*!*************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/application/dtos/maintenance-response.dto.ts ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MaintenanceResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class MaintenanceResponseDto {
}
exports.MaintenanceResponseDto = MaintenanceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MaintenanceResponseDto.prototype, "maintenanceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MaintenanceResponseDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MaintenanceResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], MaintenanceResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MaintenanceResponseDto.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], MaintenanceResponseDto.prototype, "maintenanceDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], MaintenanceResponseDto.prototype, "maintenanceShop", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MaintenanceResponseDto.prototype, "mileage", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/application/dtos/update-consumable.dto.ts":
/*!**********************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/application/dtos/update-consumable.dto.ts ***!
  \**********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateConsumableDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class UpdateConsumableDto {
}
exports.UpdateConsumableDto = UpdateConsumableDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateConsumableDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateConsumableDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateConsumableDto.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UpdateConsumableDto.prototype, "replacementDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateConsumableDto.prototype, "mileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UpdateConsumableDto.prototype, "nextReplacementDate", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/application/dtos/update-maintenance.dto.ts":
/*!***********************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/application/dtos/update-maintenance.dto.ts ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateMaintenanceDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class UpdateMaintenanceDto {
}
exports.UpdateMaintenanceDto = UpdateMaintenanceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMaintenanceDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMaintenanceDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMaintenanceDto.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UpdateMaintenanceDto.prototype, "maintenanceDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMaintenanceDto.prototype, "maintenanceShop", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMaintenanceDto.prototype, "mileage", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/application/dtos/update-vehicle-info.dto.ts":
/*!************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/application/dtos/update-vehicle-info.dto.ts ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateVehicleInfoDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateVehicleInfoDto {
}
exports.UpdateVehicleInfoDto = UpdateVehicleInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVehicleInfoDto.prototype, "insuranceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVehicleInfoDto.prototype, "insuranceNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVehicleInfoDto.prototype, "totalMileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVehicleInfoDto.prototype, "leftMileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateVehicleInfoDto.prototype, "parkingLocationImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateVehicleInfoDto.prototype, "odometerImages", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/application/dtos/vehicle-info-response.dto.ts":
/*!**************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/application/dtos/vehicle-info-response.dto.ts ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VehicleInfoResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class VehicleInfoResponseDto {
}
exports.VehicleInfoResponseDto = VehicleInfoResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VehicleInfoResponseDto.prototype, "vehicleInfoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VehicleInfoResponseDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VehicleInfoResponseDto.prototype, "insuranceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VehicleInfoResponseDto.prototype, "insuranceNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], VehicleInfoResponseDto.prototype, "totalMileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], VehicleInfoResponseDto.prototype, "leftMileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], VehicleInfoResponseDto.prototype, "parkingLocationImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], VehicleInfoResponseDto.prototype, "odometerImages", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/application/handlers/vehicle-resource.handler.ts":
/*!*****************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/application/handlers/vehicle-resource.handler.ts ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VehicleResourceHandler = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const vehicle_info_repository_port_1 = __webpack_require__(/*! ../../domain/ports/vehicle-info.repository.port */ "./apps/resource/src/modules/resource/vehicle/domain/ports/vehicle-info.repository.port.ts");
let VehicleResourceHandler = class VehicleResourceHandler {
    constructor(vehicleInfoRepository) {
        this.vehicleInfoRepository = vehicleInfoRepository;
    }
    async createTypeInfo(resource, typeInfo, repositoryOptions) {
    }
    async getTypeInfo(resourceId, repositoryOptions) {
    }
    async updateTypeInfo(resource, typeInfo, repositoryOptions) {
    }
    async deleteTypeInfo(resourceId, repositoryOptions) {
    }
    async validateTypeData(typeInfo, repositoryOptions) {
        return true;
    }
};
exports.VehicleResourceHandler = VehicleResourceHandler;
exports.VehicleResourceHandler = VehicleResourceHandler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('VehicleInfoRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof vehicle_info_repository_port_1.VehicleInfoRepositoryPort !== "undefined" && vehicle_info_repository_port_1.VehicleInfoRepositoryPort) === "function" ? _a : Object])
], VehicleResourceHandler);


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/application/services/consumable.service.ts":
/*!***********************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/application/services/consumable.service.ts ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConsumableService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const consumable_repository_port_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/domain/ports/consumable.repository.port */ "./apps/resource/src/modules/resource/vehicle/domain/ports/consumable.repository.port.ts");
let ConsumableService = class ConsumableService {
    constructor(consumableRepository) {
        this.consumableRepository = consumableRepository;
    }
};
exports.ConsumableService = ConsumableService;
exports.ConsumableService = ConsumableService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ConsumableRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof consumable_repository_port_1.ConsumableRepositoryPort !== "undefined" && consumable_repository_port_1.ConsumableRepositoryPort) === "function" ? _a : Object])
], ConsumableService);


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/application/services/maintenance.service.ts":
/*!************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/application/services/maintenance.service.ts ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MaintenanceService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const maintenance_repository_port_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/domain/ports/maintenance.repository.port */ "./apps/resource/src/modules/resource/vehicle/domain/ports/maintenance.repository.port.ts");
let MaintenanceService = class MaintenanceService {
    constructor(maintenanceRepository) {
        this.maintenanceRepository = maintenanceRepository;
    }
};
exports.MaintenanceService = MaintenanceService;
exports.MaintenanceService = MaintenanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MaintenanceRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof maintenance_repository_port_1.MaintenanceRepositoryPort !== "undefined" && maintenance_repository_port_1.MaintenanceRepositoryPort) === "function" ? _a : Object])
], MaintenanceService);


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/application/services/vehicle-info.service.ts":
/*!*************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/application/services/vehicle-info.service.ts ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VehicleInfoService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const vehicle_info_repository_port_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/domain/ports/vehicle-info.repository.port */ "./apps/resource/src/modules/resource/vehicle/domain/ports/vehicle-info.repository.port.ts");
let VehicleInfoService = class VehicleInfoService {
    constructor(vehicleInfoRepository) {
        this.vehicleInfoRepository = vehicleInfoRepository;
    }
    async save(vehicleInfo, repositoryOptions) {
        return this.vehicleInfoRepository.save(vehicleInfo, repositoryOptions);
    }
    async findOne(repositoryOptions) {
        return this.vehicleInfoRepository.findOne(repositoryOptions);
    }
    async update(vehicleId, updateData, repositoryOptions) {
        return this.vehicleInfoRepository.update(vehicleId, updateData, repositoryOptions);
    }
};
exports.VehicleInfoService = VehicleInfoService;
exports.VehicleInfoService = VehicleInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('VehicleInfoRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof vehicle_info_repository_port_1.VehicleInfoRepositoryPort !== "undefined" && vehicle_info_repository_port_1.VehicleInfoRepositoryPort) === "function" ? _a : Object])
], VehicleInfoService);


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/domain/ports/consumable.repository.port.ts":
/*!***********************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/domain/ports/consumable.repository.port.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/domain/ports/maintenance.repository.port.ts":
/*!************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/domain/ports/maintenance.repository.port.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/domain/ports/vehicle-info.repository.port.ts":
/*!*************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/domain/ports/vehicle-info.repository.port.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/infrastructure/adapters/in/web/controllers/consumable.controller.ts":
/*!************************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/infrastructure/adapters/in/web/controllers/consumable.controller.ts ***!
  \************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConsumableController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const consumable_service_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/application/services/consumable.service */ "./apps/resource/src/modules/resource/vehicle/application/services/consumable.service.ts");
let ConsumableController = class ConsumableController {
    constructor(consumableService) {
        this.consumableService = consumableService;
    }
};
exports.ConsumableController = ConsumableController;
exports.ConsumableController = ConsumableController = __decorate([
    (0, swagger_1.ApiTags)('차량 소모품'),
    (0, common_1.Controller)('resources/:resourceId/consumables'),
    __metadata("design:paramtypes", [typeof (_a = typeof consumable_service_1.ConsumableService !== "undefined" && consumable_service_1.ConsumableService) === "function" ? _a : Object])
], ConsumableController);


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/infrastructure/adapters/in/web/controllers/maintenance.controller.ts":
/*!*************************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/infrastructure/adapters/in/web/controllers/maintenance.controller.ts ***!
  \*************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MaintenanceController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const maintenance_service_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/application/services/maintenance.service */ "./apps/resource/src/modules/resource/vehicle/application/services/maintenance.service.ts");
let MaintenanceController = class MaintenanceController {
    constructor(maintenanceService) {
        this.maintenanceService = maintenanceService;
    }
};
exports.MaintenanceController = MaintenanceController;
exports.MaintenanceController = MaintenanceController = __decorate([
    (0, swagger_1.ApiTags)('정비 이력'),
    (0, common_1.Controller)('maintenances'),
    __metadata("design:paramtypes", [typeof (_a = typeof maintenance_service_1.MaintenanceService !== "undefined" && maintenance_service_1.MaintenanceService) === "function" ? _a : Object])
], MaintenanceController);


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/infrastructure/adapters/in/web/controllers/vehicle-info.controller.ts":
/*!**************************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/infrastructure/adapters/in/web/controllers/vehicle-info.controller.ts ***!
  \**************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VehicleInfoController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const api_responses_decorator_1 = __webpack_require__(/*! @libs/decorators/api-responses.decorator */ "./libs/decorators/api-responses.decorator.ts");
const vehicle_info_service_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/application/services/vehicle-info.service */ "./apps/resource/src/modules/resource/vehicle/application/services/vehicle-info.service.ts");
const update_vehicle_info_dto_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/application/dtos/update-vehicle-info.dto */ "./apps/resource/src/modules/resource/vehicle/application/dtos/update-vehicle-info.dto.ts");
const vehicle_info_response_dto_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/application/dtos/vehicle-info-response.dto */ "./apps/resource/src/modules/resource/vehicle/application/dtos/vehicle-info-response.dto.ts");
let VehicleInfoController = class VehicleInfoController {
    constructor(vehicleInfoService) {
        this.vehicleInfoService = vehicleInfoService;
    }
    async findByResourceId(resourceId) {
        return;
    }
    async update(resourceId, updateVehicleInfoDto) {
        const vehicleInfo = await this.vehicleInfoService.update(resourceId, updateVehicleInfoDto);
        return;
    }
};
exports.VehicleInfoController = VehicleInfoController;
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3-'),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '차량 정보 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '차량 정보를 성공적으로 조회했습니다.',
        type: vehicle_info_response_dto_1.VehicleInfoResponseDto,
    }),
    __param(0, (0, common_1.Param)('resourceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], VehicleInfoController.prototype, "findByResourceId", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3-'),
    (0, common_1.Patch)(),
    (0, swagger_1.ApiOperation)({ summary: '차량 정보 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '차량 정보가 성공적으로 수정되었습니다.',
        type: vehicle_info_response_dto_1.VehicleInfoResponseDto,
    }),
    __param(0, (0, common_1.Param)('resourceId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_vehicle_info_dto_1.UpdateVehicleInfoDto !== "undefined" && update_vehicle_info_dto_1.UpdateVehicleInfoDto) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], VehicleInfoController.prototype, "update", null);
exports.VehicleInfoController = VehicleInfoController = __decorate([
    (0, swagger_1.ApiTags)('차량 정보'),
    (0, common_1.Controller)('resources/:resourceId/vehicle-info'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [typeof (_a = typeof vehicle_info_service_1.VehicleInfoService !== "undefined" && vehicle_info_service_1.VehicleInfoService) === "function" ? _a : Object])
], VehicleInfoController);


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/infrastructure/adapters/out/persistence/consumable.repository.ts":
/*!*********************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/infrastructure/adapters/out/persistence/consumable.repository.ts ***!
  \*********************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConsumableRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
let ConsumableRepository = class ConsumableRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async save(consumable, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Consumable)
            : this.repository;
        const savedEntity = await repository.save(consumable);
        return savedEntity;
    }
    async findById(id, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Consumable)
            : this.repository;
        const entity = await repository.findOne({ where: { consumableId: id } });
        return entity ? entity : null;
    }
    async findByVehicleId(vehicleId, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Consumable)
            : this.repository;
        const entities = await repository.find({ where: { vehicleId } });
        return entities;
    }
    async update(id, consumable, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Consumable)
            : this.repository;
        await repository.update({ consumableId: id }, consumable);
        const updated = await this.findById(id, repositoryOptions);
        if (!updated)
            throw new common_1.NotFoundException('Consumable not found');
        return updated;
    }
    async delete(id, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Consumable)
            : this.repository;
        await repository.delete({ consumableId: id });
    }
};
exports.ConsumableRepository = ConsumableRepository;
exports.ConsumableRepository = ConsumableRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Consumable)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ConsumableRepository);


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/infrastructure/adapters/out/persistence/maintenance.repository.ts":
/*!**********************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/infrastructure/adapters/out/persistence/maintenance.repository.ts ***!
  \**********************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MaintenanceRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
let MaintenanceRepository = class MaintenanceRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async save(maintenance, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Maintenance)
            : this.repository;
        const savedEntity = await repository.save(maintenance);
        return savedEntity;
    }
    async findById(id, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Maintenance)
            : this.repository;
        const entity = await repository.findOne({ where: { maintenanceId: id } });
        return entity ? entity : null;
    }
    async findByConsumableId(consumableId, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Maintenance)
            : this.repository;
        const entities = await repository.find({ where: { consumableId } });
        return entities;
    }
    async update(id, maintenance, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Maintenance)
            : this.repository;
        await repository.update({ maintenanceId: id }, maintenance);
        const updated = await this.findById(id, repositoryOptions);
        if (!updated)
            throw new common_1.NotFoundException('Maintenance not found');
        return updated;
    }
    async delete(id, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Maintenance)
            : this.repository;
        await repository.delete({ maintenanceId: id });
    }
};
exports.MaintenanceRepository = MaintenanceRepository;
exports.MaintenanceRepository = MaintenanceRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Maintenance)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], MaintenanceRepository);


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/infrastructure/adapters/out/persistence/vehicle-info.repository.ts":
/*!***********************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/infrastructure/adapters/out/persistence/vehicle-info.repository.ts ***!
  \***********************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VehicleInfoRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
let VehicleInfoRepository = class VehicleInfoRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async save(vehicleInfo, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.VehicleInfo)
            : this.repository;
        const savedEntity = await repository.save(vehicleInfo);
        return savedEntity;
    }
    async findOne(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.VehicleInfo)
            : this.repository;
        const entity = await repository.findOne({ where: repositoryOptions?.where });
        return entity ? entity : null;
    }
    async update(id, vehicleInfo, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.VehicleInfo)
            : this.repository;
        await repository.update({ vehicleInfoId: id }, vehicleInfo);
        const updated = await this.findOne({ where: { vehicleInfoId: id } });
        if (!updated)
            throw new common_1.NotFoundException('Vehicle info not found');
        return updated;
    }
};
exports.VehicleInfoRepository = VehicleInfoRepository;
exports.VehicleInfoRepository = VehicleInfoRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.VehicleInfo)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], VehicleInfoRepository);


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/vehicle-resource.module.ts":
/*!*******************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/vehicle-resource.module.ts ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VehicleResourceModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
const vehicle_resource_handler_1 = __webpack_require__(/*! ./application/handlers/vehicle-resource.handler */ "./apps/resource/src/modules/resource/vehicle/application/handlers/vehicle-resource.handler.ts");
const vehicle_info_service_1 = __webpack_require__(/*! ./application/services/vehicle-info.service */ "./apps/resource/src/modules/resource/vehicle/application/services/vehicle-info.service.ts");
const consumable_service_1 = __webpack_require__(/*! ./application/services/consumable.service */ "./apps/resource/src/modules/resource/vehicle/application/services/consumable.service.ts");
const maintenance_service_1 = __webpack_require__(/*! ./application/services/maintenance.service */ "./apps/resource/src/modules/resource/vehicle/application/services/maintenance.service.ts");
const consumable_controller_1 = __webpack_require__(/*! ./infrastructure/adapters/in/web/controllers/consumable.controller */ "./apps/resource/src/modules/resource/vehicle/infrastructure/adapters/in/web/controllers/consumable.controller.ts");
const maintenance_controller_1 = __webpack_require__(/*! ./infrastructure/adapters/in/web/controllers/maintenance.controller */ "./apps/resource/src/modules/resource/vehicle/infrastructure/adapters/in/web/controllers/maintenance.controller.ts");
const vehicle_info_repository_1 = __webpack_require__(/*! ./infrastructure/adapters/out/persistence/vehicle-info.repository */ "./apps/resource/src/modules/resource/vehicle/infrastructure/adapters/out/persistence/vehicle-info.repository.ts");
const consumable_repository_1 = __webpack_require__(/*! ./infrastructure/adapters/out/persistence/consumable.repository */ "./apps/resource/src/modules/resource/vehicle/infrastructure/adapters/out/persistence/consumable.repository.ts");
const maintenance_repository_1 = __webpack_require__(/*! ./infrastructure/adapters/out/persistence/maintenance.repository */ "./apps/resource/src/modules/resource/vehicle/infrastructure/adapters/out/persistence/maintenance.repository.ts");
const vehicle_info_controller_1 = __webpack_require__(/*! ./infrastructure/adapters/in/web/controllers/vehicle-info.controller */ "./apps/resource/src/modules/resource/vehicle/infrastructure/adapters/in/web/controllers/vehicle-info.controller.ts");
let VehicleResourceModule = class VehicleResourceModule {
};
exports.VehicleResourceModule = VehicleResourceModule;
exports.VehicleResourceModule = VehicleResourceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.VehicleInfo, entities_1.Consumable, entities_1.Maintenance]),
        ],
        providers: [
            vehicle_resource_handler_1.VehicleResourceHandler,
            vehicle_info_service_1.VehicleInfoService,
            consumable_service_1.ConsumableService,
            maintenance_service_1.MaintenanceService,
            vehicle_info_repository_1.VehicleInfoRepository,
            {
                provide: 'VehicleInfoRepositoryPort',
                useExisting: vehicle_info_repository_1.VehicleInfoRepository,
            },
            consumable_repository_1.ConsumableRepository,
            {
                provide: 'ConsumableRepositoryPort',
                useExisting: consumable_repository_1.ConsumableRepository,
            },
            maintenance_repository_1.MaintenanceRepository,
            {
                provide: 'MaintenanceRepositoryPort',
                useExisting: maintenance_repository_1.MaintenanceRepository,
            },
        ],
        controllers: [
            vehicle_info_controller_1.VehicleInfoController,
            consumable_controller_1.ConsumableController,
            maintenance_controller_1.MaintenanceController,
        ],
        exports: [
            vehicle_resource_handler_1.VehicleResourceHandler,
            vehicle_info_service_1.VehicleInfoService,
            consumable_service_1.ConsumableService,
            maintenance_service_1.MaintenanceService,
        ],
    })
], VehicleResourceModule);


/***/ }),

/***/ "./libs/configs/env.config.ts":
/*!************************************!*\
  !*** ./libs/configs/env.config.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.APP_CONFIG = exports.WEB_PUSH_CONFIG = exports.JWT_CONFIG = exports.ENV = void 0;
const dotenv_1 = __webpack_require__(/*! dotenv */ "dotenv");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
(0, dotenv_1.config)();
exports.ENV = process.env;
exports["default"] = (0, config_1.registerAs)('database', () => {
    return {
        host: process.env.POSTGRES_HOST || 'localhost',
        port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
        username: process.env.POSTGRES_USER || 'admin',
        password: process.env.POSTGRES_PASSWORD || 'tech7admin!',
        database: process.env.POSTGRES_DB || 'resource-server',
    };
});
exports.JWT_CONFIG = (0, config_1.registerAs)('jwt', () => {
    return {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    };
});
exports.WEB_PUSH_CONFIG = (0, config_1.registerAs)('webPush', () => {
    return {
        publicKey: process.env.WEB_PUSH_PUBLIC_KEY,
        privateKey: process.env.WEB_PUSH_PRIVATE_KEY,
    };
});
exports.APP_CONFIG = (0, config_1.registerAs)('app', () => {
    return {
        url: process.env.NODE_ENV === 'production' ? 'http://localhost:5001' : 'http://localhost:3000',
        port: process.env.NODE_ENV === 'production' ? 5001 : 3000,
    };
});


/***/ }),

/***/ "./libs/configs/jwt.config.ts":
/*!************************************!*\
  !*** ./libs/configs/jwt.config.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jwtConfig = void 0;
const jwtConfig = (configService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: {
        expiresIn: configService.get('JWT_EXPIRES_IN'),
    },
});
exports.jwtConfig = jwtConfig;


/***/ }),

/***/ "./libs/configs/typeorm.config.ts":
/*!****************************************!*\
  !*** ./libs/configs/typeorm.config.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.typeOrmConfig = void 0;
const entities_1 = __webpack_require__(/*! ../entities */ "./libs/entities/index.ts");
const typeOrmConfig = (configService) => ({
    type: 'postgres',
    host: configService.get('database.host'),
    port: configService.get('database.port'),
    username: configService.get('database.username'),
    password: configService.get('database.password'),
    database: configService.get('database.database'),
    entities: entities_1.Entities,
    synchronize: configService.get('NODE_ENV') !== 'production',
    logging: configService.get('NODE_ENV') !== 'production',
});
exports.typeOrmConfig = typeOrmConfig;


/***/ }),

/***/ "./libs/decorators/api-responses.decorator.ts":
/*!****************************************************!*\
  !*** ./libs/decorators/api-responses.decorator.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiDataResponse = exports.ErrorResponseDto = exports.PaginatedResponseDto = exports.BaseResponseDto = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const api_response_interface_1 = __webpack_require__(/*! ../interfaces/api-response.interface */ "./libs/interfaces/api-response.interface.ts");
class BaseResponseDto {
}
exports.BaseResponseDto = BaseResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], BaseResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], BaseResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: '성공적으로 처리되었습니다.' }),
    __metadata("design:type", String)
], BaseResponseDto.prototype, "message", void 0);
class PaginatedResponseDto extends BaseResponseDto {
}
exports.PaginatedResponseDto = PaginatedResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_a = typeof api_response_interface_1.PaginationMeta !== "undefined" && api_response_interface_1.PaginationMeta) === "function" ? _a : Object)
], PaginatedResponseDto.prototype, "meta", void 0);
class ErrorResponseDto {
}
exports.ErrorResponseDto = ErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], ErrorResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 400 }),
    __metadata("design:type", Number)
], ErrorResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '잘못된 요청입니다.' }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "message", void 0);
const ApiCommonErrors = () => (0, common_1.applyDecorators)((0, swagger_1.ApiBadRequestResponse)({ description: '잘못된 요청입니다.', type: ErrorResponseDto }), (0, swagger_1.ApiUnauthorizedResponse)({ description: '인증되지 않은 요청입니다.' }), (0, swagger_1.ApiForbiddenResponse)({ description: '권한이 없습니다.' }), (0, swagger_1.ApiNotFoundResponse)({ description: '리소스를 찾을 수 없습니다.' }), (0, swagger_1.ApiConflictResponse)({ description: '중복된 리소스입니다.' }), (0, swagger_1.ApiInternalServerErrorResponse)({ description: '서버 에러가 발생했습니다.' }));
const ApiDataResponse = (options) => {
    const schema = options.type
        ? {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(options.isPaginated ? PaginatedResponseDto : BaseResponseDto) },
                {
                    properties: {
                        data: options.isPaginated || Array.isArray(options.type)
                            ? {
                                type: 'array',
                                items: {
                                    $ref: (0, swagger_1.getSchemaPath)(Array.isArray(options.type) ? options.type[0] : options.type),
                                },
                            }
                            : {
                                $ref: (0, swagger_1.getSchemaPath)(options.type),
                            },
                    },
                },
            ],
        }
        : {
            properties: {
                success: { type: 'boolean', example: true },
                message: { type: 'string', example: options.description },
            },
        };
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOkResponse)({
        status: options.status || 200,
        description: options.description || '성공적으로 처리되었습니다.',
        schema,
    }), ApiCommonErrors());
};
exports.ApiDataResponse = ApiDataResponse;


/***/ }),

/***/ "./libs/decorators/public.decorator.ts":
/*!*********************************************!*\
  !*** ./libs/decorators/public.decorator.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;


/***/ }),

/***/ "./libs/decorators/role.decorator.ts":
/*!*******************************************!*\
  !*** ./libs/decorators/role.decorator.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),

/***/ "./libs/decorators/user.decorator.ts":
/*!*******************************************!*\
  !*** ./libs/decorators/user.decorator.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.User = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
});


/***/ }),

/***/ "./libs/entities/accommodation-info.entity.ts":
/*!****************************************************!*\
  !*** ./libs/entities/accommodation-info.entity.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccommodationInfo = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const resource_entity_1 = __webpack_require__(/*! ./resource.entity */ "./libs/entities/resource.entity.ts");
let AccommodationInfo = class AccommodationInfo {
};
exports.AccommodationInfo = AccommodationInfo;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], AccommodationInfo.prototype, "accommodationInfoId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AccommodationInfo.prototype, "resourceId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => resource_entity_1.Resource, resource => resource.accommodationInfo),
    (0, typeorm_1.JoinColumn)({ name: 'resourceId' }),
    __metadata("design:type", typeof (_a = typeof resource_entity_1.Resource !== "undefined" && resource_entity_1.Resource) === "function" ? _a : Object)
], AccommodationInfo.prototype, "resource", void 0);
exports.AccommodationInfo = AccommodationInfo = __decorate([
    (0, typeorm_1.Entity)('accommodation_infos')
], AccommodationInfo);


/***/ }),

/***/ "./libs/entities/consumable.entity.ts":
/*!********************************************!*\
  !*** ./libs/entities/consumable.entity.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Consumable = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const vehicle_info_entity_1 = __webpack_require__(/*! ./vehicle-info.entity */ "./libs/entities/vehicle-info.entity.ts");
const maintenance_entity_1 = __webpack_require__(/*! ./maintenance.entity */ "./libs/entities/maintenance.entity.ts");
let Consumable = class Consumable {
};
exports.Consumable = Consumable;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], Consumable.prototype, "consumableId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Consumable.prototype, "vehicleId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Consumable.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Consumable.prototype, "replaceCycle", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Consumable.prototype, "notifyReplacementCycle", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vehicle_info_entity_1.VehicleInfo),
    (0, typeorm_1.JoinColumn)({ name: 'vehicleId', referencedColumnName: 'vehicleInfoId' }),
    __metadata("design:type", typeof (_a = typeof vehicle_info_entity_1.VehicleInfo !== "undefined" && vehicle_info_entity_1.VehicleInfo) === "function" ? _a : Object)
], Consumable.prototype, "vehicleInfo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => maintenance_entity_1.Maintenance, maintenance => maintenance.consumable),
    __metadata("design:type", Array)
], Consumable.prototype, "maintenances", void 0);
exports.Consumable = Consumable = __decorate([
    (0, typeorm_1.Entity)('consumables')
], Consumable);


/***/ }),

/***/ "./libs/entities/employee-notification.entity.ts":
/*!*******************************************************!*\
  !*** ./libs/entities/employee-notification.entity.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeNotification = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const employee_entity_1 = __webpack_require__(/*! ./employee.entity */ "./libs/entities/employee.entity.ts");
const notification_entity_1 = __webpack_require__(/*! ./notification.entity */ "./libs/entities/notification.entity.ts");
let EmployeeNotification = class EmployeeNotification {
};
exports.EmployeeNotification = EmployeeNotification;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], EmployeeNotification.prototype, "employeeNotificationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmployeeNotification.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmployeeNotification.prototype, "notificationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => notification_entity_1.Notification),
    (0, typeorm_1.JoinColumn)({ name: 'notificationId' }),
    __metadata("design:type", typeof (_a = typeof notification_entity_1.Notification !== "undefined" && notification_entity_1.Notification) === "function" ? _a : Object)
], EmployeeNotification.prototype, "notification", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId' }),
    __metadata("design:type", typeof (_b = typeof employee_entity_1.Employee !== "undefined" && employee_entity_1.Employee) === "function" ? _b : Object)
], EmployeeNotification.prototype, "employee", void 0);
exports.EmployeeNotification = EmployeeNotification = __decorate([
    (0, typeorm_1.Entity)('employee_notifications')
], EmployeeNotification);


/***/ }),

/***/ "./libs/entities/employee.entity.ts":
/*!******************************************!*\
  !*** ./libs/entities/employee.entity.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Employee = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const employee_notification_entity_1 = __webpack_require__(/*! ./employee-notification.entity */ "./libs/entities/employee-notification.entity.ts");
const reservation_participant_entity_1 = __webpack_require__(/*! ./reservation-participant.entity */ "./libs/entities/reservation-participant.entity.ts");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./libs/entities/user.entity.ts");
const resource_manager_entity_1 = __webpack_require__(/*! ./resource-manager.entity */ "./libs/entities/resource-manager.entity.ts");
let Employee = class Employee {
};
exports.Employee = Employee;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], Employee.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "employeeNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], Employee.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservation_participant_entity_1.ReservationParticipant, (participant) => participant.employee),
    __metadata("design:type", Array)
], Employee.prototype, "participants", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_notification_entity_1.EmployeeNotification, (notification) => notification.employee),
    __metadata("design:type", Array)
], Employee.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => resource_manager_entity_1.ResourceManager, (resourceManager) => resourceManager.employee),
    __metadata("design:type", Array)
], Employee.prototype, "resourceManagers", void 0);
exports.Employee = Employee = __decorate([
    (0, typeorm_1.Entity)('employees')
], Employee);


/***/ }),

/***/ "./libs/entities/file.entity.ts":
/*!**************************************!*\
  !*** ./libs/entities/file.entity.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.File = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let File = class File {
};
exports.File = File;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], File.prototype, "fileId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], File.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], File.prototype, "filePath", void 0);
exports.File = File = __decorate([
    (0, typeorm_1.Entity)('files')
], File);


/***/ }),

/***/ "./libs/entities/index.ts":
/*!********************************!*\
  !*** ./libs/entities/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.File = exports.EmployeeNotification = exports.Notification = exports.Maintenance = exports.Consumable = exports.ResourceManager = exports.Schedule = exports.ReservationParticipant = exports.Reservation = exports.AccommodationInfo = exports.MeetingRoomInfo = exports.VehicleInfo = exports.ResourceGroup = exports.Resource = exports.User = exports.Employee = exports.EntitiesMap = exports.Entities = void 0;
const employee_entity_1 = __webpack_require__(/*! ./employee.entity */ "./libs/entities/employee.entity.ts");
Object.defineProperty(exports, "Employee", ({ enumerable: true, get: function () { return employee_entity_1.Employee; } }));
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./libs/entities/user.entity.ts");
Object.defineProperty(exports, "User", ({ enumerable: true, get: function () { return user_entity_1.User; } }));
const resource_entity_1 = __webpack_require__(/*! ./resource.entity */ "./libs/entities/resource.entity.ts");
Object.defineProperty(exports, "Resource", ({ enumerable: true, get: function () { return resource_entity_1.Resource; } }));
const resource_group_entity_1 = __webpack_require__(/*! ./resource-group.entity */ "./libs/entities/resource-group.entity.ts");
Object.defineProperty(exports, "ResourceGroup", ({ enumerable: true, get: function () { return resource_group_entity_1.ResourceGroup; } }));
const vehicle_info_entity_1 = __webpack_require__(/*! ./vehicle-info.entity */ "./libs/entities/vehicle-info.entity.ts");
Object.defineProperty(exports, "VehicleInfo", ({ enumerable: true, get: function () { return vehicle_info_entity_1.VehicleInfo; } }));
const meeting_room_info_entity_1 = __webpack_require__(/*! ./meeting-room-info.entity */ "./libs/entities/meeting-room-info.entity.ts");
Object.defineProperty(exports, "MeetingRoomInfo", ({ enumerable: true, get: function () { return meeting_room_info_entity_1.MeetingRoomInfo; } }));
const accommodation_info_entity_1 = __webpack_require__(/*! ./accommodation-info.entity */ "./libs/entities/accommodation-info.entity.ts");
Object.defineProperty(exports, "AccommodationInfo", ({ enumerable: true, get: function () { return accommodation_info_entity_1.AccommodationInfo; } }));
const reservation_entity_1 = __webpack_require__(/*! ./reservation.entity */ "./libs/entities/reservation.entity.ts");
Object.defineProperty(exports, "Reservation", ({ enumerable: true, get: function () { return reservation_entity_1.Reservation; } }));
const reservation_participant_entity_1 = __webpack_require__(/*! ./reservation-participant.entity */ "./libs/entities/reservation-participant.entity.ts");
Object.defineProperty(exports, "ReservationParticipant", ({ enumerable: true, get: function () { return reservation_participant_entity_1.ReservationParticipant; } }));
const schedule_entity_1 = __webpack_require__(/*! ./schedule.entity */ "./libs/entities/schedule.entity.ts");
Object.defineProperty(exports, "Schedule", ({ enumerable: true, get: function () { return schedule_entity_1.Schedule; } }));
const resource_manager_entity_1 = __webpack_require__(/*! ./resource-manager.entity */ "./libs/entities/resource-manager.entity.ts");
Object.defineProperty(exports, "ResourceManager", ({ enumerable: true, get: function () { return resource_manager_entity_1.ResourceManager; } }));
const consumable_entity_1 = __webpack_require__(/*! ./consumable.entity */ "./libs/entities/consumable.entity.ts");
Object.defineProperty(exports, "Consumable", ({ enumerable: true, get: function () { return consumable_entity_1.Consumable; } }));
const maintenance_entity_1 = __webpack_require__(/*! ./maintenance.entity */ "./libs/entities/maintenance.entity.ts");
Object.defineProperty(exports, "Maintenance", ({ enumerable: true, get: function () { return maintenance_entity_1.Maintenance; } }));
const notification_entity_1 = __webpack_require__(/*! ./notification.entity */ "./libs/entities/notification.entity.ts");
Object.defineProperty(exports, "Notification", ({ enumerable: true, get: function () { return notification_entity_1.Notification; } }));
const employee_notification_entity_1 = __webpack_require__(/*! ./employee-notification.entity */ "./libs/entities/employee-notification.entity.ts");
Object.defineProperty(exports, "EmployeeNotification", ({ enumerable: true, get: function () { return employee_notification_entity_1.EmployeeNotification; } }));
const file_entity_1 = __webpack_require__(/*! ./file.entity */ "./libs/entities/file.entity.ts");
Object.defineProperty(exports, "File", ({ enumerable: true, get: function () { return file_entity_1.File; } }));
exports.Entities = [
    employee_entity_1.Employee,
    user_entity_1.User,
    resource_entity_1.Resource,
    resource_group_entity_1.ResourceGroup,
    vehicle_info_entity_1.VehicleInfo,
    meeting_room_info_entity_1.MeetingRoomInfo,
    accommodation_info_entity_1.AccommodationInfo,
    reservation_entity_1.Reservation,
    reservation_participant_entity_1.ReservationParticipant,
    schedule_entity_1.Schedule,
    resource_manager_entity_1.ResourceManager,
    consumable_entity_1.Consumable,
    maintenance_entity_1.Maintenance,
    notification_entity_1.Notification,
    employee_notification_entity_1.EmployeeNotification,
    file_entity_1.File,
];
exports.EntitiesMap = {
    Employee: employee_entity_1.Employee,
    User: user_entity_1.User,
    Resource: resource_entity_1.Resource,
    ResourceGroup: resource_group_entity_1.ResourceGroup,
    VehicleInfo: vehicle_info_entity_1.VehicleInfo,
    MeetingRoomInfo: meeting_room_info_entity_1.MeetingRoomInfo,
    AccommodationInfo: accommodation_info_entity_1.AccommodationInfo,
    Reservation: reservation_entity_1.Reservation,
    ReservationParticipant: reservation_participant_entity_1.ReservationParticipant,
    Schedule: schedule_entity_1.Schedule,
    ResourceManager: resource_manager_entity_1.ResourceManager,
    Consumable: consumable_entity_1.Consumable,
    Maintenance: maintenance_entity_1.Maintenance,
    Notification: notification_entity_1.Notification,
    EmployeeNotification: employee_notification_entity_1.EmployeeNotification,
    File: file_entity_1.File,
};


/***/ }),

/***/ "./libs/entities/maintenance.entity.ts":
/*!*********************************************!*\
  !*** ./libs/entities/maintenance.entity.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Maintenance = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const consumable_entity_1 = __webpack_require__(/*! ./consumable.entity */ "./libs/entities/consumable.entity.ts");
let Maintenance = class Maintenance {
};
exports.Maintenance = Maintenance;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], Maintenance.prototype, "maintenanceId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Maintenance.prototype, "consumableId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Maintenance.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Maintenance.prototype, "mileage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Maintenance.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true, comment: '정비사진 배열' }),
    __metadata("design:type", Array)
], Maintenance.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => consumable_entity_1.Consumable),
    (0, typeorm_1.JoinColumn)({ name: 'consumableId' }),
    __metadata("design:type", typeof (_a = typeof consumable_entity_1.Consumable !== "undefined" && consumable_entity_1.Consumable) === "function" ? _a : Object)
], Maintenance.prototype, "consumable", void 0);
exports.Maintenance = Maintenance = __decorate([
    (0, typeorm_1.Entity)('maintenances')
], Maintenance);


/***/ }),

/***/ "./libs/entities/meeting-room-info.entity.ts":
/*!***************************************************!*\
  !*** ./libs/entities/meeting-room-info.entity.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeetingRoomInfo = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const resource_entity_1 = __webpack_require__(/*! ./resource.entity */ "./libs/entities/resource.entity.ts");
let MeetingRoomInfo = class MeetingRoomInfo {
};
exports.MeetingRoomInfo = MeetingRoomInfo;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], MeetingRoomInfo.prototype, "meetingRoomInfoId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MeetingRoomInfo.prototype, "resourceId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => resource_entity_1.Resource, resource => resource.meetingRoomInfo),
    (0, typeorm_1.JoinColumn)({ name: 'resourceId' }),
    __metadata("design:type", typeof (_a = typeof resource_entity_1.Resource !== "undefined" && resource_entity_1.Resource) === "function" ? _a : Object)
], MeetingRoomInfo.prototype, "resource", void 0);
exports.MeetingRoomInfo = MeetingRoomInfo = __decorate([
    (0, typeorm_1.Entity)('meeting_room_infos')
], MeetingRoomInfo);


/***/ }),

/***/ "./libs/entities/notification.entity.ts":
/*!**********************************************!*\
  !*** ./libs/entities/notification.entity.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Notification = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const employee_notification_entity_1 = __webpack_require__(/*! ./employee-notification.entity */ "./libs/entities/employee-notification.entity.ts");
const notification_type_enum_1 = __webpack_require__(/*! @libs/enums/notification-type.enum */ "./libs/enums/notification-type.enum.ts");
const resource_type_enum_1 = __webpack_require__(/*! @libs/enums/resource-type.enum */ "./libs/enums/resource-type.enum.ts");
let Notification = class Notification {
};
exports.Notification = Notification;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], Notification.prototype, "notificationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notification.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notification.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: notification_type_enum_1.NotificationType
    }),
    __metadata("design:type", typeof (_a = typeof notification_type_enum_1.NotificationType !== "undefined" && notification_type_enum_1.NotificationType) === "function" ? _a : Object)
], Notification.prototype, "notificationType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: resource_type_enum_1.ResourceType
    }),
    __metadata("design:type", typeof (_b = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _b : Object)
], Notification.prototype, "resourceType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Notification.prototype, "isRead", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Notification.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_notification_entity_1.EmployeeNotification, notification => notification.notification),
    __metadata("design:type", Array)
], Notification.prototype, "employees", void 0);
exports.Notification = Notification = __decorate([
    (0, typeorm_1.Entity)('notifications')
], Notification);


/***/ }),

/***/ "./libs/entities/reservation-participant.entity.ts":
/*!*********************************************************!*\
  !*** ./libs/entities/reservation-participant.entity.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReservationParticipant = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const reservation_entity_1 = __webpack_require__(/*! ./reservation.entity */ "./libs/entities/reservation.entity.ts");
const employee_entity_1 = __webpack_require__(/*! ./employee.entity */ "./libs/entities/employee.entity.ts");
const reservation_type_enum_1 = __webpack_require__(/*! @libs/enums/reservation-type.enum */ "./libs/enums/reservation-type.enum.ts");
let ReservationParticipant = class ReservationParticipant {
};
exports.ReservationParticipant = ReservationParticipant;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], ReservationParticipant.prototype, "participantId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReservationParticipant.prototype, "reservationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReservationParticipant.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: reservation_type_enum_1.ParticipantsType,
    }),
    __metadata("design:type", typeof (_a = typeof reservation_type_enum_1.ParticipantsType !== "undefined" && reservation_type_enum_1.ParticipantsType) === "function" ? _a : Object)
], ReservationParticipant.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => reservation_entity_1.Reservation),
    (0, typeorm_1.JoinColumn)({ name: 'reservationId' }),
    __metadata("design:type", typeof (_b = typeof reservation_entity_1.Reservation !== "undefined" && reservation_entity_1.Reservation) === "function" ? _b : Object)
], ReservationParticipant.prototype, "reservation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId' }),
    __metadata("design:type", typeof (_c = typeof employee_entity_1.Employee !== "undefined" && employee_entity_1.Employee) === "function" ? _c : Object)
], ReservationParticipant.prototype, "employee", void 0);
exports.ReservationParticipant = ReservationParticipant = __decorate([
    (0, typeorm_1.Entity)('reservation_participants')
], ReservationParticipant);


/***/ }),

/***/ "./libs/entities/reservation.entity.ts":
/*!*********************************************!*\
  !*** ./libs/entities/reservation.entity.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Reservation = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const resource_entity_1 = __webpack_require__(/*! ./resource.entity */ "./libs/entities/resource.entity.ts");
const reservation_participant_entity_1 = __webpack_require__(/*! ./reservation-participant.entity */ "./libs/entities/reservation-participant.entity.ts");
const schedule_entity_1 = __webpack_require__(/*! ./schedule.entity */ "./libs/entities/schedule.entity.ts");
const reservation_type_enum_1 = __webpack_require__(/*! @libs/enums/reservation-type.enum */ "./libs/enums/reservation-type.enum.ts");
let Reservation = class Reservation {
};
exports.Reservation = Reservation;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], Reservation.prototype, "reservationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reservation.prototype, "resourceId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reservation.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Reservation.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reservation.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reservation.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: reservation_type_enum_1.ReservationStatus,
    }),
    __metadata("design:type", typeof (_a = typeof reservation_type_enum_1.ReservationStatus !== "undefined" && reservation_type_enum_1.ReservationStatus) === "function" ? _a : Object)
], Reservation.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Reservation.prototype, "rejectReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Reservation.prototype, "isAllDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Reservation.prototype, "notifyBeforeStart", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], Reservation.prototype, "notifyMinutesBeforeStart", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => resource_entity_1.Resource),
    (0, typeorm_1.JoinColumn)({ name: 'resourceId' }),
    __metadata("design:type", typeof (_b = typeof resource_entity_1.Resource !== "undefined" && resource_entity_1.Resource) === "function" ? _b : Object)
], Reservation.prototype, "resource", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservation_participant_entity_1.ReservationParticipant, (participant) => participant.reservation),
    __metadata("design:type", Array)
], Reservation.prototype, "participants", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => schedule_entity_1.Schedule, (schedule) => schedule.reservation),
    __metadata("design:type", Array)
], Reservation.prototype, "schedules", void 0);
exports.Reservation = Reservation = __decorate([
    (0, typeorm_1.Entity)('reservations')
], Reservation);


/***/ }),

/***/ "./libs/entities/resource-group.entity.ts":
/*!************************************************!*\
  !*** ./libs/entities/resource-group.entity.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceGroup = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const resource_entity_1 = __webpack_require__(/*! ./resource.entity */ "./libs/entities/resource.entity.ts");
const resource_type_enum_1 = __webpack_require__(/*! ../enums/resource-type.enum */ "./libs/enums/resource-type.enum.ts");
let ResourceGroup = class ResourceGroup {
};
exports.ResourceGroup = ResourceGroup;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], ResourceGroup.prototype, "resourceGroupId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ResourceGroup.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ResourceGroup.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ResourceGroup.prototype, "parentResourceGroupId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: resource_type_enum_1.ResourceType
    }),
    __metadata("design:type", typeof (_a = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _a : Object)
], ResourceGroup.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => resource_entity_1.Resource, resource => resource.resourceGroup),
    __metadata("design:type", Array)
], ResourceGroup.prototype, "resources", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ResourceGroup, resourceGroup => resourceGroup.children),
    (0, typeorm_1.JoinColumn)({ name: 'parentResourceGroupId' }),
    __metadata("design:type", ResourceGroup)
], ResourceGroup.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ResourceGroup, resourceGroup => resourceGroup.parent),
    __metadata("design:type", Array)
], ResourceGroup.prototype, "children", void 0);
exports.ResourceGroup = ResourceGroup = __decorate([
    (0, typeorm_1.Entity)('resource_groups')
], ResourceGroup);


/***/ }),

/***/ "./libs/entities/resource-manager.entity.ts":
/*!**************************************************!*\
  !*** ./libs/entities/resource-manager.entity.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceManager = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const employee_entity_1 = __webpack_require__(/*! ./employee.entity */ "./libs/entities/employee.entity.ts");
const resource_entity_1 = __webpack_require__(/*! ./resource.entity */ "./libs/entities/resource.entity.ts");
let ResourceManager = class ResourceManager {
};
exports.ResourceManager = ResourceManager;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], ResourceManager.prototype, "resourceManagerId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ResourceManager.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ResourceManager.prototype, "resourceId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId' }),
    __metadata("design:type", typeof (_a = typeof employee_entity_1.Employee !== "undefined" && employee_entity_1.Employee) === "function" ? _a : Object)
], ResourceManager.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => resource_entity_1.Resource),
    (0, typeorm_1.JoinColumn)({ name: 'resourceId' }),
    __metadata("design:type", typeof (_b = typeof resource_entity_1.Resource !== "undefined" && resource_entity_1.Resource) === "function" ? _b : Object)
], ResourceManager.prototype, "resource", void 0);
exports.ResourceManager = ResourceManager = __decorate([
    (0, typeorm_1.Entity)('resource_managers')
], ResourceManager);


/***/ }),

/***/ "./libs/entities/resource.entity.ts":
/*!******************************************!*\
  !*** ./libs/entities/resource.entity.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Resource = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const resource_group_entity_1 = __webpack_require__(/*! ./resource-group.entity */ "./libs/entities/resource-group.entity.ts");
const vehicle_info_entity_1 = __webpack_require__(/*! ./vehicle-info.entity */ "./libs/entities/vehicle-info.entity.ts");
const meeting_room_info_entity_1 = __webpack_require__(/*! ./meeting-room-info.entity */ "./libs/entities/meeting-room-info.entity.ts");
const accommodation_info_entity_1 = __webpack_require__(/*! ./accommodation-info.entity */ "./libs/entities/accommodation-info.entity.ts");
const reservation_entity_1 = __webpack_require__(/*! ./reservation.entity */ "./libs/entities/reservation.entity.ts");
const resource_type_enum_1 = __webpack_require__(/*! @libs/enums/resource-type.enum */ "./libs/enums/resource-type.enum.ts");
const resource_manager_entity_1 = __webpack_require__(/*! ./resource-manager.entity */ "./libs/entities/resource-manager.entity.ts");
let Resource = class Resource {
};
exports.Resource = Resource;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], Resource.prototype, "resourceId", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], Resource.prototype, "resourceGroupId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Resource.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Resource.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Resource.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Resource.prototype, "isAvailable", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Resource.prototype, "unavailableReason", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", Array)
], Resource.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Resource.prototype, "notifyParticipantChange", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Resource.prototype, "notifyReservationChange", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: resource_type_enum_1.ResourceType }),
    __metadata("design:type", typeof (_a = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _a : Object)
], Resource.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => resource_group_entity_1.ResourceGroup),
    (0, typeorm_1.JoinColumn)({ name: 'resourceGroupId' }),
    __metadata("design:type", typeof (_b = typeof resource_group_entity_1.ResourceGroup !== "undefined" && resource_group_entity_1.ResourceGroup) === "function" ? _b : Object)
], Resource.prototype, "resourceGroup", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => vehicle_info_entity_1.VehicleInfo, (vehicleInfo) => vehicleInfo.resource),
    __metadata("design:type", typeof (_c = typeof vehicle_info_entity_1.VehicleInfo !== "undefined" && vehicle_info_entity_1.VehicleInfo) === "function" ? _c : Object)
], Resource.prototype, "vehicleInfo", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => meeting_room_info_entity_1.MeetingRoomInfo, (meetingRoomInfo) => meetingRoomInfo.resource),
    __metadata("design:type", typeof (_d = typeof meeting_room_info_entity_1.MeetingRoomInfo !== "undefined" && meeting_room_info_entity_1.MeetingRoomInfo) === "function" ? _d : Object)
], Resource.prototype, "meetingRoomInfo", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => accommodation_info_entity_1.AccommodationInfo, (accommodationInfo) => accommodationInfo.resource),
    __metadata("design:type", typeof (_e = typeof accommodation_info_entity_1.AccommodationInfo !== "undefined" && accommodation_info_entity_1.AccommodationInfo) === "function" ? _e : Object)
], Resource.prototype, "accommodationInfo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservation_entity_1.Reservation, (reservation) => reservation.resource),
    __metadata("design:type", Array)
], Resource.prototype, "reservations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => resource_manager_entity_1.ResourceManager, (resourceManager) => resourceManager.resource),
    __metadata("design:type", Array)
], Resource.prototype, "resourceManagers", void 0);
exports.Resource = Resource = __decorate([
    (0, typeorm_1.Entity)('resources')
], Resource);


/***/ }),

/***/ "./libs/entities/schedule.entity.ts":
/*!******************************************!*\
  !*** ./libs/entities/schedule.entity.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Schedule = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const reservation_entity_1 = __webpack_require__(/*! ./reservation.entity */ "./libs/entities/reservation.entity.ts");
let Schedule = class Schedule {
};
exports.Schedule = Schedule;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], Schedule.prototype, "scheduleId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Schedule.prototype, "reservationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Schedule.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Schedule.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Schedule.prototype, "day", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '0 ~ 1439 분으로 표시' }),
    __metadata("design:type", String)
], Schedule.prototype, "startDateTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '0 ~ 1439 분으로 표시' }),
    __metadata("design:type", String)
], Schedule.prototype, "endDateTime", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => reservation_entity_1.Reservation),
    (0, typeorm_1.JoinColumn)({ name: 'reservationId' }),
    __metadata("design:type", typeof (_a = typeof reservation_entity_1.Reservation !== "undefined" && reservation_entity_1.Reservation) === "function" ? _a : Object)
], Schedule.prototype, "reservation", void 0);
exports.Schedule = Schedule = __decorate([
    (0, typeorm_1.Entity)('schedules')
], Schedule);


/***/ }),

/***/ "./libs/entities/user.entity.ts":
/*!**************************************!*\
  !*** ./libs/entities/user.entity.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const employee_entity_1 = __webpack_require__(/*! ./employee.entity */ "./libs/entities/employee.entity.ts");
const role_type_enum_1 = __webpack_require__(/*! @libs/enums/role-type.enum */ "./libs/enums/role-type.enum.ts");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], User.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "mobile", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "accessToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "expiredAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '웹푸시 알림 관련 구독 정보' }),
    __metadata("design:type", String)
], User.prototype, "subscription", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: role_type_enum_1.Role, array: true, default: [role_type_enum_1.Role.USER], comment: '사용자 역할' }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId' }),
    __metadata("design:type", typeof (_a = typeof employee_entity_1.Employee !== "undefined" && employee_entity_1.Employee) === "function" ? _a : Object)
], User.prototype, "employee", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);


/***/ }),

/***/ "./libs/entities/vehicle-info.entity.ts":
/*!**********************************************!*\
  !*** ./libs/entities/vehicle-info.entity.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VehicleInfo = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const resource_entity_1 = __webpack_require__(/*! ./resource.entity */ "./libs/entities/resource.entity.ts");
const consumable_entity_1 = __webpack_require__(/*! ./consumable.entity */ "./libs/entities/consumable.entity.ts");
let VehicleInfo = class VehicleInfo {
};
exports.VehicleInfo = VehicleInfo;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], VehicleInfo.prototype, "vehicleInfoId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VehicleInfo.prototype, "resourceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VehicleInfo.prototype, "leftMileage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VehicleInfo.prototype, "totalMileage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VehicleInfo.prototype, "insuranceName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VehicleInfo.prototype, "insuranceNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true, comment: '주차위치 이미지 배열' }),
    __metadata("design:type", Array)
], VehicleInfo.prototype, "parkingLocationImages", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true, comment: '계기판 이미지 배열' }),
    __metadata("design:type", Array)
], VehicleInfo.prototype, "odometerImages", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => resource_entity_1.Resource, resource => resource.vehicleInfo),
    (0, typeorm_1.JoinColumn)({ name: `resourceId` }),
    __metadata("design:type", typeof (_a = typeof resource_entity_1.Resource !== "undefined" && resource_entity_1.Resource) === "function" ? _a : Object)
], VehicleInfo.prototype, "resource", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => consumable_entity_1.Consumable, consumable => consumable.vehicleInfo),
    __metadata("design:type", Array)
], VehicleInfo.prototype, "consumables", void 0);
exports.VehicleInfo = VehicleInfo = __decorate([
    (0, typeorm_1.Entity)('vehicle_infos')
], VehicleInfo);


/***/ }),

/***/ "./libs/enums/notification-type.enum.ts":
/*!**********************************************!*\
  !*** ./libs/enums/notification-type.enum.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationType = void 0;
var NotificationType;
(function (NotificationType) {
    NotificationType["RESERVATION_CREATED"] = "RESERVATION_CREATED";
    NotificationType["RESERVATION_UPDATED"] = "RESERVATION_UPDATED";
    NotificationType["RESERVATION_CANCELLED"] = "RESERVATION_CANCELLED";
    NotificationType["RESERVATION_REMINDER"] = "RESERVATION_REMINDER";
})(NotificationType || (exports.NotificationType = NotificationType = {}));


/***/ }),

/***/ "./libs/enums/reservation-type.enum.ts":
/*!*********************************************!*\
  !*** ./libs/enums/reservation-type.enum.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ParticipantsType = exports.ReservationStatus = void 0;
var ReservationStatus;
(function (ReservationStatus) {
    ReservationStatus["PENDING"] = "PENDING";
    ReservationStatus["CONFIRMED"] = "CONFIRMED";
    ReservationStatus["CANCELLED"] = "CANCELLED";
    ReservationStatus["REJECTED"] = "REJECTED";
})(ReservationStatus || (exports.ReservationStatus = ReservationStatus = {}));
var ParticipantsType;
(function (ParticipantsType) {
    ParticipantsType["RESERVER"] = "RESERVER";
    ParticipantsType["PARTICIPANT"] = "PARTICIPANT";
    ParticipantsType["CC_RECEIPIENT"] = "CC_RECEIPIENT";
})(ParticipantsType || (exports.ParticipantsType = ParticipantsType = {}));


/***/ }),

/***/ "./libs/enums/resource-type.enum.ts":
/*!******************************************!*\
  !*** ./libs/enums/resource-type.enum.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceType = void 0;
var ResourceType;
(function (ResourceType) {
    ResourceType["MEETING_ROOM"] = "MEETING_ROOM";
    ResourceType["VEHICLE"] = "VEHICLE";
    ResourceType["ACCOMMODATION"] = "ACCOMMODATION";
})(ResourceType || (exports.ResourceType = ResourceType = {}));


/***/ }),

/***/ "./libs/enums/role-type.enum.ts":
/*!**************************************!*\
  !*** ./libs/enums/role-type.enum.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["RESOURCE_ADMIN"] = "RESOURCE_ADMIN";
    Role["SYSTEM_ADMIN"] = "SYSTEM_ADMIN";
})(Role || (exports.Role = Role = {}));


/***/ }),

/***/ "./libs/guards/jwt-auth.guard.ts":
/*!***************************************!*\
  !*** ./libs/guards/jwt-auth.guard.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const public_decorator_1 = __webpack_require__(/*! @libs/decorators/public.decorator */ "./libs/decorators/public.decorator.ts");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], JwtAuthGuard);


/***/ }),

/***/ "./libs/guards/role.guard.ts":
/*!***********************************!*\
  !*** ./libs/guards/role.guard.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const role_decorator_1 = __webpack_require__(/*! @libs/decorators/role.decorator */ "./libs/decorators/role.decorator.ts");
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(role_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => user.roles?.includes(role));
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ }),

/***/ "./libs/interceptors/error.interceptor.ts":
/*!************************************************!*\
  !*** ./libs/interceptors/error.interceptor.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorInterceptor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
let ErrorInterceptor = class ErrorInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.catchError)(error => {
            if (error instanceof common_1.HttpException) {
                return (0, rxjs_1.throwError)(() => ({
                    success: false,
                    message: error.message,
                    statusCode: error.getStatus(),
                }));
            }
            console.error('Unexpected error:', error);
            return (0, rxjs_1.throwError)(() => new common_1.InternalServerErrorException({
                success: false,
                message: '서버 내부 오류가 발생했습니다.',
                statusCode: 500,
            }));
        }));
    }
};
exports.ErrorInterceptor = ErrorInterceptor;
exports.ErrorInterceptor = ErrorInterceptor = __decorate([
    (0, common_1.Injectable)()
], ErrorInterceptor);


/***/ }),

/***/ "./libs/interceptors/response.interceptor.ts":
/*!***************************************************!*\
  !*** ./libs/interceptors/response.interceptor.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResponseInterceptor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
let ResponseInterceptor = class ResponseInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => {
            console.log(data);
            if (this.isFilterResult(data)) {
                return {
                    success: true,
                    data: data.items,
                    meta: {
                        total: data.total,
                        page: data.page,
                        limit: data.limit,
                        hasNext: data.hasNext,
                    },
                };
            }
            return {
                success: true,
                data: data,
                message: '요청이 성공적으로 처리되었습니다.',
            };
        }));
    }
    isFilterResult(data) {
        return data && Array.isArray(data.items) && typeof data.total === 'number';
    }
};
exports.ResponseInterceptor = ResponseInterceptor;
exports.ResponseInterceptor = ResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseInterceptor);


/***/ }),

/***/ "./libs/interfaces/api-response.interface.ts":
/*!***************************************************!*\
  !*** ./libs/interfaces/api-response.interface.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/swagger/swagger.ts":
/*!*********************************!*\
  !*** ./libs/swagger/swagger.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setupSwagger = setupSwagger;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const api_responses_decorator_1 = __webpack_require__(/*! @libs/decorators/api-responses.decorator */ "./libs/decorators/api-responses.decorator.ts");
function setupSwagger(app, dtos) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Resource Management API')
        .setDescription('Resource Management API Description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        extraModels: [api_responses_decorator_1.BaseResponseDto, api_responses_decorator_1.PaginatedResponseDto, ...dtos],
    });
    swagger_1.SwaggerModule.setup('api-docs', app, document, {
        jsonDocumentUrl: '/api-docs-json',
        swaggerOptions: {
            tagsSorter: (a, b) => {
                const isAEnglish = /^[A-Za-z]/.test(a);
                const isBEnglish = /^[A-Za-z]/.test(b);
                if (isAEnglish && !isBEnglish)
                    return -1;
                if (!isAEnglish && isBEnglish)
                    return 1;
                return a.localeCompare(b, 'en');
            },
            docExpansion: 'none',
            persistAuthorization: true,
            customSiteTitle: 'RMS API Docs',
            customfavIcon: '/favicon.ico',
            customJs: [
                'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
            ],
            customCssUrl: [
                'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
            ],
        },
    });
}


/***/ }),

/***/ "./libs/utils/date.util.ts":
/*!*********************************!*\
  !*** ./libs/utils/date.util.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DateUtil = void 0;
const dayjs = __webpack_require__(/*! dayjs */ "dayjs");
const utc = __webpack_require__(/*! dayjs/plugin/utc */ "dayjs/plugin/utc");
const timezone = __webpack_require__(/*! dayjs/plugin/timezone */ "dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');
class DateUtilWrapper {
    constructor(date) {
        this.date = date;
    }
    format(format = 'YYYY-MM-DD HH:mm:ss') {
        return this.date.format(format);
    }
    addDays(days) {
        return new DateUtilWrapper(this.date.add(days, 'day'));
    }
    addMinutes(minutes) {
        return new DateUtilWrapper(this.date.add(minutes, 'minute'));
    }
    toISOString() {
        return this.date.toISOString();
    }
    toMinutes() {
        return this.date.hour() * 60 + this.date.minute();
    }
}
class DateUtil {
    static now() {
        return new DateUtilWrapper(dayjs().tz());
    }
    static format(date, format = 'YYYY-MM-DD HH:mm:ss') {
        return dayjs(date).tz().format(format);
    }
    static parse(dateString) {
        return new DateUtilWrapper(dayjs(dateString).tz());
    }
    static addDays(date, days) {
        return dayjs(date).tz().add(days, 'day');
    }
    static addMinutes(date, minutes) {
        return dayjs(date).tz().add(minutes, 'minute');
    }
    static toISOString(date) {
        return dayjs(date).tz().toISOString();
    }
    static toMinutes(date) {
        const d = dayjs(date).tz();
        return d.hour() * 60 + d.minute();
    }
    static fromMinutes(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return new DateUtilWrapper(dayjs().tz().hour(hours).minute(mins).second(0));
    }
}
exports.DateUtil = DateUtil;


/***/ }),

/***/ "@aws-sdk/client-s3":
/*!*************************************!*\
  !*** external "@aws-sdk/client-s3" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("@aws-sdk/client-s3");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/platform-express":
/*!*******************************************!*\
  !*** external "@nestjs/platform-express" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "dayjs":
/*!************************!*\
  !*** external "dayjs" ***!
  \************************/
/***/ ((module) => {

module.exports = require("dayjs");

/***/ }),

/***/ "dayjs/plugin/timezone":
/*!****************************************!*\
  !*** external "dayjs/plugin/timezone" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("dayjs/plugin/timezone");

/***/ }),

/***/ "dayjs/plugin/utc":
/*!***********************************!*\
  !*** external "dayjs/plugin/utc" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("dayjs/plugin/utc");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "rxjs/operators":
/*!*********************************!*\
  !*** external "rxjs/operators" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!***********************************!*\
  !*** ./apps/resource/src/main.ts ***!
  \***********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! @resource/app.module */ "./apps/resource/src/app.module.ts");
const swagger_1 = __webpack_require__(/*! @libs/swagger/swagger */ "./libs/swagger/swagger.ts");
const env_config_1 = __webpack_require__(/*! @libs/configs/env.config */ "./libs/configs/env.config.ts");
const dtos = __webpack_require__(/*! @resource/dtos.index */ "./apps/resource/src/dtos.index.ts");
const response_interceptor_1 = __webpack_require__(/*! @libs/interceptors/response.interceptor */ "./libs/interceptors/response.interceptor.ts");
const error_interceptor_1 = __webpack_require__(/*! @libs/interceptors/error.interceptor */ "./libs/interceptors/error.interceptor.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! @libs/guards/jwt-auth.guard */ "./libs/guards/jwt-auth.guard.ts");
const core_2 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const path_1 = __webpack_require__(/*! path */ "path");
const role_guard_1 = __webpack_require__(/*! @libs/guards/role.guard */ "./libs/guards/role.guard.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.setGlobalPrefix('api');
    app.useGlobalGuards(new jwt_auth_guard_1.JwtAuthGuard(app.get(core_2.Reflector)), new role_guard_1.RolesGuard(app.get(core_2.Reflector)));
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor(), new error_interceptor_1.ErrorInterceptor());
    const uploadPath = (0, path_1.join)(process.cwd(), 'uploads');
    app.useStaticAssets(uploadPath, {
        prefix: '/uploads',
        index: false,
        fallthrough: false,
    });
    (0, swagger_1.setupSwagger)(app, Object.values(dtos));
    await app.listen(env_config_1.ENV.APP_PORT || 3000);
}
bootstrap();

})();

/******/ })()
;