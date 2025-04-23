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
const date_util_1 = __webpack_require__(/*! @libs/utils/date.util */ "./libs/utils/date.util.ts");
const public_decorator_1 = __webpack_require__(/*! @libs/decorators/public.decorator */ "./libs/decorators/public.decorator.ts");
let AppController = class AppController {
    getVersion() {
        return {
            version: '1.0.0',
            date: date_util_1.DateUtil.now().format(),
        };
    }
};
exports.AppController = AppController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('version'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getVersion", null);
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
const event_emitter_1 = __webpack_require__(/*! @nestjs/event-emitter */ "@nestjs/event-emitter");
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
const api_doc_service_1 = __webpack_require__(/*! @libs/utils/api-doc.service */ "./libs/utils/api-doc.service.ts");
const db_doc_service_1 = __webpack_require__(/*! @libs/utils/db-doc.service */ "./libs/utils/db-doc.service.ts");
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
            event_emitter_1.EventEmitterModule.forRoot(),
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
        providers: [app_service_1.AppService, api_doc_service_1.ApiDocService, db_doc_service_1.DbDocService],
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
        await this.resourceRepository.delete({});
        await this.resourceGroupRepository.delete({
            parentResourceGroupId: (0, typeorm_1.Not)((0, typeorm_3.IsNull)()),
        });
        await this.resourceGroupRepository.delete({
            parentResourceGroupId: (0, typeorm_3.IsNull)(),
        });
        await this.userRepository.update({}, { employeeId: null });
        await this.employeeRepository.update({}, { userId: null });
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
exports.ReservationResponseDto = exports.CreateReservationResponseDto = exports.UpdateReservationCcReceipientDto = exports.UpdateReservationParticipantsDto = exports.UpdateReservationStatusDto = exports.UpdateReservationTimeDto = exports.UpdateReservationTitleDto = exports.CreateReservationDto = exports.EmplyeesByDepartmentResponseDto = exports.EmployeeResponseDto = exports.UpdateEmployeeDto = exports.CreateEmployeeDto = exports.AccommodationInfoResponseDto = exports.UpdateAccommodationInfoDto = exports.CreateAccommodationInfoDto = exports.MeetingRoomInfoResponseDto = exports.UpdateMeetingRoomInfoDto = exports.CreateMeetingRoomInfoDto = exports.MaintenanceResponseDto = exports.ConsumableResponseDto = exports.VehicleInfoResponseDto = exports.UpdateMaintenanceDto = exports.UpdateConsumableDto = exports.UpdateVehicleInfoDto = exports.CreateMaintenanceDto = exports.CreateConsumableDto = exports.CreateVehicleInfoDto = exports.ResourceManagerResponseDto = exports.ResourceGroupWithResourcesAndReservationsResponseDto = exports.ResourceGroupWithResourcesResponseDto = exports.ChildResourceGroupResponseDto = exports.ResourceGroupResponseDto = exports.ResourceWithReservationsResponseDto = exports.ResourceSelectResponseDto = exports.ResourceResponseDto = exports.ReturnVehicleDto = exports.NewOrderResourceGroupDto = exports.NewOrderResourceDto = exports.UpdateResourceOrdersDto = exports.UpdateResourceGroupOrdersDto = exports.UpdateResourceInfoDto = exports.UpdateResourceGroupDto = exports.UpdateResourceDto = exports.CreateResourceInfoDto = exports.CreateResourceManagerDto = exports.CreateResourceGroupDto = exports.CreateResourceDto = exports.UserResponseDto = exports.LoginResponseDto = exports.LoginDto = void 0;
exports.NotificationDataDto = exports.ResponseNotificationDto = exports.PushSubscriptionDto = exports.SendNotificationDto = exports.CreateNotificationDto = exports.FileResponseDto = exports.ReservationWithRelationsResponseDto = exports.ReservationWithResourceResponseDto = void 0;
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
Object.defineProperty(exports, "UpdateResourceGroupOrdersDto", ({ enumerable: true, get: function () { return update_resource_dto_1.UpdateResourceGroupOrdersDto; } }));
Object.defineProperty(exports, "UpdateResourceOrdersDto", ({ enumerable: true, get: function () { return update_resource_dto_1.UpdateResourceOrdersDto; } }));
Object.defineProperty(exports, "NewOrderResourceDto", ({ enumerable: true, get: function () { return update_resource_dto_1.NewOrderResourceDto; } }));
Object.defineProperty(exports, "NewOrderResourceGroupDto", ({ enumerable: true, get: function () { return update_resource_dto_1.NewOrderResourceGroupDto; } }));
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
Object.defineProperty(exports, "CreateConsumableDto", ({ enumerable: true, get: function () { return create_vehicle_info_dto_1.CreateConsumableDto; } }));
Object.defineProperty(exports, "CreateMaintenanceDto", ({ enumerable: true, get: function () { return create_vehicle_info_dto_1.CreateMaintenanceDto; } }));
var update_vehicle_info_dto_1 = __webpack_require__(/*! ./modules/resource/vehicle/application/dtos/update-vehicle-info.dto */ "./apps/resource/src/modules/resource/vehicle/application/dtos/update-vehicle-info.dto.ts");
Object.defineProperty(exports, "UpdateVehicleInfoDto", ({ enumerable: true, get: function () { return update_vehicle_info_dto_1.UpdateVehicleInfoDto; } }));
Object.defineProperty(exports, "UpdateConsumableDto", ({ enumerable: true, get: function () { return update_vehicle_info_dto_1.UpdateConsumableDto; } }));
Object.defineProperty(exports, "UpdateMaintenanceDto", ({ enumerable: true, get: function () { return update_vehicle_info_dto_1.UpdateMaintenanceDto; } }));
var vehicle_response_dto_1 = __webpack_require__(/*! ./modules/resource/vehicle/application/dtos/vehicle-response.dto */ "./apps/resource/src/modules/resource/vehicle/application/dtos/vehicle-response.dto.ts");
Object.defineProperty(exports, "VehicleInfoResponseDto", ({ enumerable: true, get: function () { return vehicle_response_dto_1.VehicleInfoResponseDto; } }));
Object.defineProperty(exports, "ConsumableResponseDto", ({ enumerable: true, get: function () { return vehicle_response_dto_1.ConsumableResponseDto; } }));
Object.defineProperty(exports, "MaintenanceResponseDto", ({ enumerable: true, get: function () { return vehicle_response_dto_1.MaintenanceResponseDto; } }));
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
var create_notification_dto_1 = __webpack_require__(/*! ./modules/notification/application/dto/create-notification.dto */ "./apps/resource/src/modules/notification/application/dto/create-notification.dto.ts");
Object.defineProperty(exports, "CreateNotificationDto", ({ enumerable: true, get: function () { return create_notification_dto_1.CreateNotificationDto; } }));
Object.defineProperty(exports, "SendNotificationDto", ({ enumerable: true, get: function () { return create_notification_dto_1.SendNotificationDto; } }));
var push_subscription_dto_1 = __webpack_require__(/*! ./modules/notification/application/dto/push-subscription.dto */ "./apps/resource/src/modules/notification/application/dto/push-subscription.dto.ts");
Object.defineProperty(exports, "PushSubscriptionDto", ({ enumerable: true, get: function () { return push_subscription_dto_1.PushSubscriptionDto; } }));
var response_notification_dto_1 = __webpack_require__(/*! ./modules/notification/application/dto/response-notification.dto */ "./apps/resource/src/modules/notification/application/dto/response-notification.dto.ts");
Object.defineProperty(exports, "ResponseNotificationDto", ({ enumerable: true, get: function () { return response_notification_dto_1.ResponseNotificationDto; } }));
var response_notification_dto_2 = __webpack_require__(/*! ./modules/notification/application/dto/response-notification.dto */ "./apps/resource/src/modules/notification/application/dto/response-notification.dto.ts");
Object.defineProperty(exports, "NotificationDataDto", ({ enumerable: true, get: function () { return response_notification_dto_2.NotificationDataDto; } }));


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
        name: '김종식',
        employeeNumber: '23027',
        position: '선임연구원',
        department: 'Web파트',
        email: 'kim.jongsik@lumir.space',
        password: '1234',
        roles: [role_type_enum_1.Role.USER],
    },
    {
        name: '우창욱',
        employeeNumber: '23047',
        position: '연구원',
        department: 'Web파트',
        email: 'woo.changuk@lumir.space',
        password: '1234',
        roles: [role_type_enum_1.Role.USER],
    },
    {
        name: '김민수',
        employeeNumber: '24008',
        position: '연구원',
        department: 'Web파트',
        email: 'kim.minsu@lumir.space',
        password: '1234',
        roles: [role_type_enum_1.Role.USER],
    },
    {
        name: '김규현',
        employeeNumber: '24016',
        position: '연구원',
        department: 'Web파트',
        email: 'kim.kyuhyun@lumir.space',
        password: '1234',
        roles: [role_type_enum_1.Role.USER],
    },
    {
        name: '김성훈',
        employeeNumber: '24017',
        position: '연구원',
        department: 'Web파트',
        email: 'kim.seonghun@lumir.space',
        password: '1234',
        roles: [role_type_enum_1.Role.USER],
    },
    {
        name: '조민경',
        employeeNumber: '24019',
        position: '연구원',
        department: 'Web파트',
        email: 'jo.minkyeong@lumir.space',
        password: '1234',
        roles: [role_type_enum_1.Role.USER],
    },
    {
        name: '이화영',
        employeeNumber: '24024',
        position: '연구원',
        department: 'Web파트',
        email: 'lee.hwayoung@lumir.space',
        password: '1234',
        roles: [role_type_enum_1.Role.USER],
    },
    {
        name: '황성빈',
        employeeNumber: '24048',
        position: '연구원',
        department: 'Web파트',
        email: 'hwang.sungbin@lumir.space',
        password: '1234',
        roles: [role_type_enum_1.Role.USER],
    },
    {
        name: '박태연',
        employeeNumber: '22008',
        position: '책임매니저',
        department: '경영지원실',
        email: 'park.taeyeon@lumir.space',
        password: '1234',
        roles: [role_type_enum_1.Role.USER, role_type_enum_1.Role.RESOURCE_ADMIN, role_type_enum_1.Role.SYSTEM_ADMIN],
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
        title: '법인 차량',
        description: '법인 차량',
        type: resource_type_enum_1.ResourceType.VEHICLE,
        order: 0,
    },
];
exports.resourcesSeedData = [
    {
        name: '카니발 (12도 3456)',
        description: '법인 차량',
        type: resource_type_enum_1.ResourceType.VEHICLE,
        images: ['https://lumir-notification.storage.googleapis.com/rms/resource/1234567890.jpg'],
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

/***/ "./apps/resource/src/modules/auth/application/handler/user-event.handler.ts":
/*!**********************************************************************************!*\
  !*** ./apps/resource/src/modules/auth/application/handler/user-event.handler.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserEventHandler = void 0;
const event_emitter_1 = __webpack_require__(/*! @nestjs/event-emitter */ "@nestjs/event-emitter");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_service_1 = __webpack_require__(/*! ../services/user.service */ "./apps/resource/src/modules/auth/application/services/user.service.ts");
let UserEventHandler = class UserEventHandler {
    constructor(userService) {
        this.userService = userService;
    }
    async handleUserRoleAddedEvent(payload) {
        console.log(`Role ${payload.role} added to user ${payload.employeeId}`);
        await this.userService.addRole(payload.employeeId, payload.role, payload.repositoryOptions);
    }
    async handleUserRoleRemovedEvent(payload) {
        console.log(`Role ${payload.role} removed from user ${payload.employeeId}`);
        await this.userService.removeRole(payload.employeeId, payload.role, payload.repositoryOptions);
    }
    async handleUserSubscriptionUpdateEvent(payload) {
        console.log(`Subscription updated for user ${payload.userId} ${payload.subscription}`);
        const user = await this.userService.findByUserId(payload.userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.subscription = payload.subscription;
        await this.userService.update(user);
    }
    async handleUserGetEvent(payload) {
        console.log(`User found for employeeId ${payload.employeeId} or userId ${payload.userId}`);
        if (payload.employeeId) {
            return await this.userService.findByEmployeeId(payload.employeeId);
        }
        if (payload.userId) {
            return await this.userService.findByUserId(payload.userId);
        }
        return null;
    }
    async handleUserSubscriptionGetEvent(payload) {
        console.log(`Find subscription for user ${payload.employeeId}`);
        const user = await this.userService.findByEmployeeId(payload.employeeId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user.subscription;
    }
};
exports.UserEventHandler = UserEventHandler;
__decorate([
    (0, event_emitter_1.OnEvent)('add.user.role'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserEventHandler.prototype, "handleUserRoleAddedEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)('remove.user.role'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserEventHandler.prototype, "handleUserRoleRemovedEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)('update.user.subscription'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserEventHandler.prototype, "handleUserSubscriptionUpdateEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)('find.user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserEventHandler.prototype, "handleUserGetEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)('find.user.subscription'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserEventHandler.prototype, "handleUserSubscriptionGetEvent", null);
exports.UserEventHandler = UserEventHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], UserEventHandler);


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
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findAll(repositoryOptions) {
        const users = await this.userRepository.find(repositoryOptions);
        return users;
    }
    async findByEmployeeId(employeeId) {
        const user = await this.userRepository.findOne({ where: { employeeId }, relations: ['employee'] });
        return user;
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({ where: { email }, relations: ['employee'] });
        return user;
    }
    async findByUserId(userId) {
        const user = await this.userRepository.findOne({ where: { userId }, relations: ['employee'] });
        return user;
    }
    async save(user, repositoryOptions) {
        const savedUser = await this.userRepository.save(user, repositoryOptions);
        return savedUser;
    }
    async update(user, repositoryOptions) {
        const updatedUser = await this.userRepository.update(user.userId, user, repositoryOptions);
        return updatedUser;
    }
    async addRole(employeeId, role, repositoryOptions) {
        const user = await this.userRepository.findOne({ where: { employeeId }, relations: ['employee'] });
        if (!user) {
            throw new common_1.NotFoundException('사용자를 찾을 수 없습니다.');
        }
        if (!user.roles.includes(role)) {
            user.roles.push(role);
            await this.userRepository.update(user.userId, user, repositoryOptions);
        }
    }
    async removeRole(employeeId, role, repositoryOptions) {
        const user = await this.userRepository.findOne({ where: { employeeId }, relations: ['employee'] });
        if (!user) {
            throw new common_1.NotFoundException('사용자를 찾을 수 없습니다.');
        }
        user.roles = user.roles.filter((r) => r !== role);
        await this.userRepository.update(user.userId, user, repositoryOptions);
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
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
let JwtAuthUsecase = class JwtAuthUsecase {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async validateUser(email, password) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('존재하지 않는 사용자입니다.');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('비밀번호가 일치하지 않습니다.');
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
        user.accessToken = accessToken;
        user.expiredAt = expiredAt;
        await this.userService.update(user);
        return {
            accessToken,
            email: user.email,
            name: user.employee?.name,
            department: user.employee?.department,
            position: user.employee?.position,
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SsoAuthUsecase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
const axios_1 = __webpack_require__(/*! axios */ "axios");
const user_service_1 = __webpack_require__(/*! ../services/user.service */ "./apps/resource/src/modules/auth/application/services/user.service.ts");
const date_util_1 = __webpack_require__(/*! @libs/utils/date.util */ "./libs/utils/date.util.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
const event_emitter_1 = __webpack_require__(/*! @nestjs/event-emitter */ "@nestjs/event-emitter");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let SsoAuthUsecase = class SsoAuthUsecase {
    constructor(userService, jwtService, eventEmitter, dataSource) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.eventEmitter = eventEmitter;
        this.dataSource = dataSource;
    }
    async validateUser(email, password) {
        let user = await this.userService.findByEmail(email);
        if (!user) {
            const client_id = process.env.SSO_CLIENT_ID;
            const ssoApiUrl = process.env.SSO_API_URL;
            const response = await axios_1.default.post(`${ssoApiUrl}/api/auth/login`, {
                client_id,
                email: email,
                password: password,
            });
            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            try {
                const data = response.data.data;
                const newUser = new entities_1.User();
                newUser.email = data.email;
                newUser.password = data.password;
                newUser.mobile = data.phoneNumber;
                user = await this.userService.save(newUser, { queryRunner });
                const [result] = await this.eventEmitter.emitAsync('find.employee', {
                    employeeNumber: data.employeeNumber,
                    queryRunner,
                });
                if (result) {
                    user.employee = result;
                    await this.userService.update(user, { queryRunner });
                }
                else {
                    throw new common_1.UnauthorizedException('SSO 로그인 실패');
                }
                await queryRunner.commitTransaction();
            }
            catch (error) {
                console.log(error);
                await queryRunner.rollbackTransaction();
                throw new common_1.UnauthorizedException('SSO 로그인 실패');
            }
            finally {
                await queryRunner.release();
            }
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('비밀번호가 일치하지 않습니다.');
        }
        return user;
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user.employee.userId) {
            await this.eventEmitter.emitAsync('update.employee', {
                employee: {
                    employeeId: user.employee.employeeId,
                    user: user,
                },
            });
        }
        const result = {
            accessToken: null,
            email: user.email,
            name: user.employee?.name,
            department: user.employee?.department,
            position: user.employee?.position,
            roles: user.roles,
        };
        if (user.accessToken && user.expiredAt && date_util_1.DateUtil.now().format() < user.expiredAt) {
            result.accessToken = user.accessToken;
        }
        else {
            const payload = {
                userId: user.userId,
                employeeId: user.employeeId,
                roles: user.roles,
            };
            const accessToken = this.jwtService.sign(payload);
            const expiredAt = date_util_1.DateUtil.now().addDays(1).format();
            user.accessToken = accessToken;
            user.expiredAt = expiredAt;
            await this.userService.update(user);
            result.accessToken = accessToken;
        }
        return result;
    }
};
exports.SsoAuthUsecase = SsoAuthUsecase;
exports.SsoAuthUsecase = SsoAuthUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof event_emitter_1.EventEmitter2 !== "undefined" && event_emitter_1.EventEmitter2) === "function" ? _c : Object, typeof (_d = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _d : Object])
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
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
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
            name: user.employee?.name,
            department: user.employee?.department,
            position: user.employee?.position,
            roles: user.roles,
        };
    }
    async checkPassword(userId, password) {
        const user = await this.userService.findByUserId(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return bcrypt.compare(password, user.password);
    }
    async changePassword(userId, password) {
        const user = await this.userService.findByUserId(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.password = await bcrypt.hash(password, 10);
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
const user_event_handler_1 = __webpack_require__(/*! ./application/handler/user-event.handler */ "./apps/resource/src/modules/auth/application/handler/user-event.handler.ts");
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
            user_event_handler_1.UserEventHandler,
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

/***/ "./apps/resource/src/modules/employee/application/dtos/mms-employee-response.dto.ts":
/*!******************************************************************************************!*\
  !*** ./apps/resource/src/modules/employee/application/dtos/mms-employee-response.dto.ts ***!
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MMSEmployeeResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class MMSEmployeeResponseDto {
    constructor(employee) {
        this._id = employee._id;
        this.employee_number = employee.employee_number;
        this.name = employee.name;
        this.email = employee.email;
        this.phone_number = employee.phone_number;
        this.date_of_birth = employee.date_of_birth;
        this.gender = employee.gender;
        this.hire_date = employee.hire_date;
        this.status = employee.status;
        this.department = employee.department?.department_name;
        this.position = employee.position?.position_title;
        this.rank = employee.rank?.rank_name;
    }
}
exports.MMSEmployeeResponseDto = MMSEmployeeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 ID', example: '67d116b591e5366c327915d2' }),
    __metadata("design:type", String)
], MMSEmployeeResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사번', example: '24020' }),
    __metadata("design:type", String)
], MMSEmployeeResponseDto.prototype, "employee_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이름', example: '구석현' }),
    __metadata("design:type", String)
], MMSEmployeeResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이메일', example: 'koo.sukhyun@lumir.space' }),
    __metadata("design:type", String)
], MMSEmployeeResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '전화번호', example: '010-1234-5678' }),
    __metadata("design:type", String)
], MMSEmployeeResponseDto.prototype, "phone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생년월일', example: '1980-07-04T00:00:00.000Z' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], MMSEmployeeResponseDto.prototype, "date_of_birth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성별', example: 'MALE' }),
    __metadata("design:type", String)
], MMSEmployeeResponseDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '입사일', example: '2024-05-21T00:00:00.000Z' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], MMSEmployeeResponseDto.prototype, "hire_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '재직 상태', example: '재직중' }),
    __metadata("design:type", String)
], MMSEmployeeResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서', example: '대표이사' }),
    __metadata("design:type", String)
], MMSEmployeeResponseDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직위', example: '대표이사' }),
    __metadata("design:type", String)
], MMSEmployeeResponseDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급', example: '대표이사' }),
    __metadata("design:type", String)
], MMSEmployeeResponseDto.prototype, "rank", void 0);


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

/***/ "./apps/resource/src/modules/employee/application/handler/employee-event.handler.ts":
/*!******************************************************************************************!*\
  !*** ./apps/resource/src/modules/employee/application/handler/employee-event.handler.ts ***!
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeEventHandler = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const event_emitter_1 = __webpack_require__(/*! @nestjs/event-emitter */ "@nestjs/event-emitter");
const employee_usecase_1 = __webpack_require__(/*! ../usecases/employee.usecase */ "./apps/resource/src/modules/employee/application/usecases/employee.usecase.ts");
let EmployeeEventHandler = class EmployeeEventHandler {
    constructor(employeeUseCase) {
        this.employeeUseCase = employeeUseCase;
    }
    async handleFindEmployee(payload) {
        console.log('payload', payload);
        return await this.employeeUseCase.findEmployee(payload.employeeNumber, { queryRunner: payload.queryRunner });
    }
    async handleUpdateEmployee(payload) {
        return await this.employeeUseCase.updateEmployee(payload.employee, { queryRunner: payload.queryRunner });
    }
};
exports.EmployeeEventHandler = EmployeeEventHandler;
__decorate([
    (0, event_emitter_1.OnEvent)('find.employee'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], EmployeeEventHandler.prototype, "handleFindEmployee", null);
__decorate([
    (0, event_emitter_1.OnEvent)('update.employee'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], EmployeeEventHandler.prototype, "handleUpdateEmployee", null);
exports.EmployeeEventHandler = EmployeeEventHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_usecase_1.EmployeeUseCase !== "undefined" && employee_usecase_1.EmployeeUseCase) === "function" ? _a : Object])
], EmployeeEventHandler);


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
const employee_repository_port_1 = __webpack_require__(/*! @resource/modules/employee/domain/ports/employee.repository.port */ "./apps/resource/src/modules/employee/domain/ports/employee.repository.port.ts");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
let EmployeeService = class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    create(employee) {
        const employeeEntity = new entities_1.Employee();
        employeeEntity.name = employee.name;
        employeeEntity.employeeNumber = employee.employee_number;
        employeeEntity.department = employee.department;
        employeeEntity.position = employee.rank;
        return employeeEntity;
    }
    async save(employee, repositoryOptions) {
        return this.employeeRepository.save(employee, repositoryOptions);
    }
    async findAll() {
        return this.employeeRepository.findAll();
    }
    async findByEmployeeNumber(employeeNumber) {
        return this.employeeRepository.findByEmployeeNumber(employeeNumber);
    }
    async update(employee, repositoryOptions) {
        return this.employeeRepository.update(employee.employeeId, employee, repositoryOptions);
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('EmployeeRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_repository_port_1.EmployeeRepositoryPort !== "undefined" && employee_repository_port_1.EmployeeRepositoryPort) === "function" ? _a : Object])
], EmployeeService);


/***/ }),

/***/ "./apps/resource/src/modules/employee/application/usecases/employee.usecase.ts":
/*!*************************************************************************************!*\
  !*** ./apps/resource/src/modules/employee/application/usecases/employee.usecase.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const employee_service_1 = __webpack_require__(/*! ../services/employee.service */ "./apps/resource/src/modules/employee/application/services/employee.service.ts");
const mms_employee_response_dto_1 = __webpack_require__(/*! ../dtos/mms-employee-response.dto */ "./apps/resource/src/modules/employee/application/dtos/mms-employee-response.dto.ts");
const axios_1 = __webpack_require__(/*! axios */ "axios");
let EmployeeUseCase = class EmployeeUseCase {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async findEmployee(employeeNumber, repositoryOptions) {
        let employee = await this.employeeService.findByEmployeeNumber(employeeNumber);
        if (!employee) {
            await this.syncEmployee(employeeNumber);
            employee = await this.employeeService.findByEmployeeNumber(employeeNumber);
            if (!employee) {
                throw new common_1.NotFoundException('존재하지 않는 사용자입니다.');
            }
        }
        return employee;
    }
    async findAllEmplyeesByDepartment() {
        const employees = await this.employeeService.findAll();
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
    async updateEmployee(employee, repositoryOptions) {
        return await this.employeeService.update(employee, repositoryOptions);
    }
    async getEmployee(employeeNumber) {
        const employee = await axios_1.default.get(`${process.env.METADATA_MANAGER_URL}/api/employees?employeeNumber=${employeeNumber}&detailed=true`);
        return new mms_employee_response_dto_1.MMSEmployeeResponseDto(employee.data);
    }
    async getEmployees() {
        const employees = await axios_1.default.get(`${process.env.METADATA_MANAGER_URL}/api/employees?detailed=true`);
        const result = [];
        employees.data.forEach((employee) => {
            result.push(new mms_employee_response_dto_1.MMSEmployeeResponseDto(employee));
        });
        return result;
    }
    async syncEmployee(employeeNumber) {
        const employee = await this.getEmployee(employeeNumber);
        const user = await this.employeeService.findByEmployeeNumber(employee.employee_number);
        try {
            if (user) {
                user.name = employee.name;
                user.employeeNumber = employee.employee_number;
                user.department = employee.department;
                user.position = employee.rank;
                await this.employeeService.save(user);
            }
            else {
                await this.employeeService.save(this.employeeService.create(employee));
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async syncEmployees() {
        const employees = await this.getEmployees();
        for (const employee of employees) {
            const user = await this.employeeService.findByEmployeeNumber(employee.employee_number);
            try {
                if (user) {
                    user.name = employee.name;
                    user.employeeNumber = employee.employee_number;
                    user.department = employee.department;
                    user.position = employee.rank;
                    await this.employeeService.save(user);
                }
                else {
                    await this.employeeService.save(this.employeeService.create(employee));
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }
};
exports.EmployeeUseCase = EmployeeUseCase;
exports.EmployeeUseCase = EmployeeUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_service_1.EmployeeService !== "undefined" && employee_service_1.EmployeeService) === "function" ? _a : Object])
], EmployeeUseCase);


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
const employee_usecase_1 = __webpack_require__(/*! ./application/usecases/employee.usecase */ "./apps/resource/src/modules/employee/application/usecases/employee.usecase.ts");
const employee_event_handler_1 = __webpack_require__(/*! ./application/handler/employee-event.handler */ "./apps/resource/src/modules/employee/application/handler/employee-event.handler.ts");
let EmployeeModule = class EmployeeModule {
};
exports.EmployeeModule = EmployeeModule;
exports.EmployeeModule = EmployeeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Employee])],
        providers: [
            employee_service_1.EmployeeService,
            {
                provide: 'EmployeeRepositoryPort',
                useClass: employee_repository_1.EmployeeRepository,
            },
            employee_usecase_1.EmployeeUseCase,
            employee_event_handler_1.EmployeeEventHandler,
        ],
        controllers: [employee_controller_1.EmployeeController],
        exports: [employee_service_1.EmployeeService, employee_usecase_1.EmployeeUseCase],
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const api_responses_decorator_1 = __webpack_require__(/*! @libs/decorators/api-responses.decorator */ "./libs/decorators/api-responses.decorator.ts");
const role_type_enum_1 = __webpack_require__(/*! @libs/enums/role-type.enum */ "./libs/enums/role-type.enum.ts");
const role_decorator_1 = __webpack_require__(/*! @libs/decorators/role.decorator */ "./libs/decorators/role.decorator.ts");
const employees_by_department_response_dto_1 = __webpack_require__(/*! @resource/modules/employee/application/dtos/employees-by-department-response.dto */ "./apps/resource/src/modules/employee/application/dtos/employees-by-department-response.dto.ts");
const employee_usecase_1 = __webpack_require__(/*! @resource/modules/employee/application/usecases/employee.usecase */ "./apps/resource/src/modules/employee/application/usecases/employee.usecase.ts");
let EmployeeController = class EmployeeController {
    constructor(employeeUseCase) {
        this.employeeUseCase = employeeUseCase;
    }
    async findAllEmplyeesByDepartment() {
        return this.employeeUseCase.findAllEmplyeesByDepartment();
    }
    async syncEmployees() {
        return await this.employeeUseCase.syncEmployees();
    }
    async webhookCreate(body) {
        console.log('created employee', body);
        await this.employeeUseCase.syncEmployees();
    }
    async webhookUpdate(body) {
        console.log('updated employee', body);
        await this.employeeUseCase.syncEmployees();
    }
    async webhookPositionChanged(body) {
        console.log('position changed', body);
        await this.employeeUseCase.syncEmployees();
    }
    async webhookDepartmentChanged(body) {
        console.log('department changed', body);
        await this.employeeUseCase.syncEmployees();
    }
    async webhookDelete(body) {
        console.log('deleted employee', body);
        await this.employeeUseCase.syncEmployees();
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
__decorate([
    (0, common_1.Get)('sync'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "syncEmployees", null);
__decorate([
    (0, common_1.Post)('webhook/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "webhookCreate", null);
__decorate([
    (0, common_1.Post)('webhook/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "webhookUpdate", null);
__decorate([
    (0, common_1.Post)('webhook/position_changed'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "webhookPositionChanged", null);
__decorate([
    (0, common_1.Post)('webhook/department_changed'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "webhookDepartmentChanged", null);
__decorate([
    (0, common_1.Post)('webhook/delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "webhookDelete", null);
exports.EmployeeController = EmployeeController = __decorate([
    (0, swagger_1.ApiTags)('직원'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('employees'),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_usecase_1.EmployeeUseCase !== "undefined" && employee_usecase_1.EmployeeUseCase) === "function" ? _a : Object])
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
let EmployeeRepository = class EmployeeRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async save(employee, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Employee)
            : this.repository;
        const savedEntity = await repository.save(employee);
        return savedEntity;
    }
    async findById(id, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Employee)
            : this.repository;
        const entity = await repository.findOne({ where: { employeeId: id } });
        return entity ? entity : null;
    }
    async findAll(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Employee)
            : this.repository;
        const entities = await repository.find();
        return entities;
    }
    async update(id, employee, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Employee)
            : this.repository;
        await repository.update({ employeeId: id }, employee);
        const updated = await repository.findOne({ where: { employeeId: id } });
        if (!updated)
            throw new common_1.NotFoundException('Employee not found');
        return updated;
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
        console.log(employeeNumber);
        const entity = await repository.findOne({ where: { employeeNumber } });
        console.log('entity', entity);
        return entity ? entity : null;
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
let FileService = class FileService {
    constructor(fileRepository, fileStorage, configService) {
        this.fileRepository = fileRepository;
        this.fileStorage = fileStorage;
        this.configService = configService;
    }
    async findFileById(fileId) {
        const file = await this.fileRepository.findById(fileId);
        return file;
    }
    async findFileByFilePath(filePath) {
        const file = await this.fileRepository.findByFilePath(filePath);
        return file;
    }
    async findAllFilesByFilePath(filePath) {
        const files = await this.fileRepository.findAllByFilePath(filePath);
        return files;
    }
    async saveFile(file) {
        const savedFile = await this.fileRepository.save(file);
        return savedFile;
    }
    async uploadFile(file) {
        const newFile = await this.fileStorage.uploadFile(file);
        const savedFile = await this.saveFile(newFile);
        return savedFile;
    }
    async deleteFile({ fileId, filePath }) {
        let file;
        if (fileId) {
            file = await this.findFileById(fileId);
            if (!file)
                throw new common_1.NotFoundException('File not found');
        }
        else if (filePath) {
            file = await this.findFileByFilePath(filePath);
            if (!file)
                throw new common_1.NotFoundException('File not found');
        }
        else {
            throw new common_1.BadRequestException('fileId or filePath is required');
        }
        await this.fileStorage.deleteFile(file);
        await this.fileRepository.delete(file.fileId);
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
        await this.fileService.deleteFile({ fileId });
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
    async findAllByFilePath(filePath) {
        const fileEntities = await this.fileRepository.find({ where: { filePath: (0, typeorm_2.In)(filePath) } });
        return fileEntities;
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
            const newFile = {
                fileName: fileName,
                filePath: this.getFileUrl(fileName),
            };
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

/***/ "./apps/resource/src/modules/notification/application/dto/create-notification.dto.ts":
/*!*******************************************************************************************!*\
  !*** ./apps/resource/src/modules/notification/application/dto/create-notification.dto.ts ***!
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
exports.SendNotificationDto = exports.CreateEmployeeNotificationDto = exports.CreateNotificationDto = exports.CreateNotificationDatatDto = void 0;
const notification_type_enum_1 = __webpack_require__(/*! @libs/enums/notification-type.enum */ "./libs/enums/notification-type.enum.ts");
const resource_type_enum_1 = __webpack_require__(/*! @libs/enums/resource-type.enum */ "./libs/enums/resource-type.enum.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class CreateNotificationDatatDto {
}
exports.CreateNotificationDatatDto = CreateNotificationDatatDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '예약 ID, 예약 알림 시 필수' }),
    __metadata("design:type", String)
], CreateNotificationDatatDto.prototype, "reservationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '예약 제목, 예약 알림 시 필수' }),
    __metadata("design:type", String)
], CreateNotificationDatatDto.prototype, "reservationTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '예약 날짜, 예약 알림 시 필수' }),
    __metadata("design:type", String)
], CreateNotificationDatatDto.prototype, "reservationDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '예약 시작 전 분 수, 예약 시간 알림 시 필수' }),
    __metadata("design:type", Number)
], CreateNotificationDatatDto.prototype, "beforeMinutes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '자원 ID, 자원 알림 시 필수' }),
    __metadata("design:type", String)
], CreateNotificationDatatDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, description: '자원 이름' }),
    __metadata("design:type", String)
], CreateNotificationDatatDto.prototype, "resourceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: resource_type_enum_1.ResourceType, required: true, description: '자원 타입' }),
    __metadata("design:type", typeof (_a = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _a : Object)
], CreateNotificationDatatDto.prototype, "resourceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '소모품 이름, 소모품 알림 시 필수' }),
    __metadata("design:type", String)
], CreateNotificationDatatDto.prototype, "consumableName", void 0);
class CreateNotificationDto {
}
exports.CreateNotificationDto = CreateNotificationDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", CreateNotificationDatatDto)
], CreateNotificationDto.prototype, "notificationData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CreateNotificationDto.prototype, "isSent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: notification_type_enum_1.NotificationType }),
    __metadata("design:type", typeof (_b = typeof notification_type_enum_1.NotificationType !== "undefined" && notification_type_enum_1.NotificationType) === "function" ? _b : Object)
], CreateNotificationDto.prototype, "notificationType", void 0);
class CreateEmployeeNotificationDto {
}
exports.CreateEmployeeNotificationDto = CreateEmployeeNotificationDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateEmployeeNotificationDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateEmployeeNotificationDto.prototype, "notificationId", void 0);
class SendNotificationDto {
}
exports.SendNotificationDto = SendNotificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: notification_type_enum_1.NotificationType }),
    __metadata("design:type", typeof (_c = typeof notification_type_enum_1.NotificationType !== "undefined" && notification_type_enum_1.NotificationType) === "function" ? _c : Object)
], SendNotificationDto.prototype, "notificationType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", CreateNotificationDatatDto)
], SendNotificationDto.prototype, "notificationData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['1256124-ef14-4124-9124-124124124124'],
        description: '알림 수신자 목록 (employeeId)',
    }),
    __metadata("design:type", Array)
], SendNotificationDto.prototype, "notificationTarget", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/notification/application/dto/push-subscription.dto.ts":
/*!*****************************************************************************************!*\
  !*** ./apps/resource/src/modules/notification/application/dto/push-subscription.dto.ts ***!
  \*****************************************************************************************/
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
exports.PushSubscriptionDto = exports.WebPushDto = exports.FCMDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class FCMDto {
}
exports.FCMDto = FCMDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FCMDto.prototype, "token", void 0);
class WebPushDto {
}
exports.WebPushDto = WebPushDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], WebPushDto.prototype, "endpoint", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            auth: { type: 'string' },
            p256dh: { type: 'string' },
        },
    }),
    __metadata("design:type", Object)
], WebPushDto.prototype, "keys", void 0);
class PushSubscriptionDto {
}
exports.PushSubscriptionDto = PushSubscriptionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: FCMDto }),
    __metadata("design:type", FCMDto)
], PushSubscriptionDto.prototype, "fcm", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: WebPushDto }),
    __metadata("design:type", WebPushDto)
], PushSubscriptionDto.prototype, "webPush", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/notification/application/dto/response-notification.dto.ts":
/*!*********************************************************************************************!*\
  !*** ./apps/resource/src/modules/notification/application/dto/response-notification.dto.ts ***!
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResponseNotificationDto = exports.NotificationDataDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const notification_type_enum_1 = __webpack_require__(/*! @libs/enums/notification-type.enum */ "./libs/enums/notification-type.enum.ts");
const resource_type_enum_1 = __webpack_require__(/*! @libs/enums/resource-type.enum */ "./libs/enums/resource-type.enum.ts");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class NotificationDataDto {
}
exports.NotificationDataDto = NotificationDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationDataDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationDataDto.prototype, "resourceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: resource_type_enum_1.ResourceType, required: false }),
    (0, class_validator_1.IsEnum)(resource_type_enum_1.ResourceType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _a : Object)
], NotificationDataDto.prototype, "resourceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationDataDto.prototype, "consumableName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationDataDto.prototype, "reservationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationDataDto.prototype, "reservationTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationDataDto.prototype, "reservationDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], NotificationDataDto.prototype, "beforeMinutes", void 0);
class ResponseNotificationDto {
}
exports.ResponseNotificationDto = ResponseNotificationDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResponseNotificationDto.prototype, "notificationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResponseNotificationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResponseNotificationDto.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: NotificationDataDto }),
    __metadata("design:type", NotificationDataDto)
], ResponseNotificationDto.prototype, "notificationData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResponseNotificationDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: notification_type_enum_1.NotificationType }),
    __metadata("design:type", typeof (_b = typeof notification_type_enum_1.NotificationType !== "undefined" && notification_type_enum_1.NotificationType) === "function" ? _b : Object)
], ResponseNotificationDto.prototype, "notificationType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ResponseNotificationDto.prototype, "isRead", void 0);


/***/ }),

/***/ "./apps/resource/src/modules/notification/application/handler/notification-event.handler.ts":
/*!**************************************************************************************************!*\
  !*** ./apps/resource/src/modules/notification/application/handler/notification-event.handler.ts ***!
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
exports.NotificationEventHandler = void 0;
const event_emitter_1 = __webpack_require__(/*! @nestjs/event-emitter */ "@nestjs/event-emitter");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const notification_usecase_1 = __webpack_require__(/*! ../usecases/notification.usecase */ "./apps/resource/src/modules/notification/application/usecases/notification.usecase.ts");
let NotificationEventHandler = class NotificationEventHandler {
    constructor(notificationUsecase) {
        this.notificationUsecase = notificationUsecase;
    }
    async handleCreateNotificationEvent(payload) {
        await this.notificationUsecase.createNotification(payload.notificationType, payload.notificationData, payload.notiTarget, payload.repositoryOptions);
    }
};
exports.NotificationEventHandler = NotificationEventHandler;
__decorate([
    (0, event_emitter_1.OnEvent)('create.notification'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationEventHandler.prototype, "handleCreateNotificationEvent", null);
exports.NotificationEventHandler = NotificationEventHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof notification_usecase_1.NotificationUsecase !== "undefined" && notification_usecase_1.NotificationUsecase) === "function" ? _a : Object])
], NotificationEventHandler);


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdapterService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const push_notification_port_1 = __webpack_require__(/*! @resource/modules/notification/domain/ports/push-notification.port */ "./apps/resource/src/modules/notification/domain/ports/push-notification.port.ts");
const event_emitter_1 = __webpack_require__(/*! @nestjs/event-emitter */ "@nestjs/event-emitter");
let AdapterService = class AdapterService {
    constructor(pushNotificationService, eventEmitter) {
        this.pushNotificationService = pushNotificationService;
        this.eventEmitter = eventEmitter;
    }
    async send(employeeId, notification) {
        const [subscription] = await this.eventEmitter.emitAsync('find.user.subscription', {
            employeeId,
        });
        await this.pushNotificationService.sendNotification(subscription, {
            title: notification.title,
            body: notification.body,
        });
    }
    async sendTestNotification(user, payload) {
        const [subscription] = await this.eventEmitter.emitAsync('find.user.subscription', {
            employeeId: user.employeeId,
        });
        await this.pushNotificationService.sendTestNotification(subscription, payload);
    }
};
exports.AdapterService = AdapterService;
exports.AdapterService = AdapterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PushNotificationServicePort')),
    __metadata("design:paramtypes", [typeof (_a = typeof push_notification_port_1.PushNotificationPort !== "undefined" && push_notification_port_1.PushNotificationPort) === "function" ? _a : Object, typeof (_b = typeof event_emitter_1.EventEmitter2 !== "undefined" && event_emitter_1.EventEmitter2) === "function" ? _b : Object])
], AdapterService);


/***/ }),

/***/ "./apps/resource/src/modules/notification/application/services/employee-notification.service.ts":
/*!******************************************************************************************************!*\
  !*** ./apps/resource/src/modules/notification/application/services/employee-notification.service.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeNotificationService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const employee_notification_repository_port_1 = __webpack_require__(/*! ../../domain/ports/employee-notification.repository.port */ "./apps/resource/src/modules/notification/domain/ports/employee-notification.repository.port.ts");
let EmployeeNotificationService = class EmployeeNotificationService {
    constructor(employeeNotificationRepository) {
        this.employeeNotificationRepository = employeeNotificationRepository;
    }
    async save(createEmployeeNotificationDto, repositoryOptions) {
        return await this.employeeNotificationRepository.save(createEmployeeNotificationDto, repositoryOptions);
    }
    async findOne(repositoryOptions) {
        return await this.employeeNotificationRepository.findOne(repositoryOptions);
    }
    async findAll(repositoryOptions) {
        return await this.employeeNotificationRepository.findAll(repositoryOptions);
    }
    async update(employeeNotificationId, updateEmployeeNotificationDto, repositoryOptions) {
        return await this.employeeNotificationRepository.update(employeeNotificationId, updateEmployeeNotificationDto, repositoryOptions);
    }
};
exports.EmployeeNotificationService = EmployeeNotificationService;
exports.EmployeeNotificationService = EmployeeNotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('EmployeeNotificationRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_notification_repository_port_1.EmployeeNotificationRepositoryPort !== "undefined" && employee_notification_repository_port_1.EmployeeNotificationRepositoryPort) === "function" ? _a : Object])
], EmployeeNotificationService);


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
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
let NotificationService = class NotificationService {
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    async save(createNotificationDto, repositoryOptions) {
        return await this.notificationRepository.save(createNotificationDto, repositoryOptions);
    }
    async findAll(options) {
        return await this.notificationRepository.findAll(options);
    }
    async update(notificationId, updateNotificationDto) {
        return await this.notificationRepository.update(notificationId, updateNotificationDto);
    }
    async findAllByEmployeeId(employeeId) {
        return [];
    }
    async findById(id) {
        return new entities_1.Notification();
    }
    async markAsRead(id) {
    }
    async markAsUnread(id) {
    }
    async markAllAsRead() {
    }
    async delete(id) {
    }
    async count(options) {
        return await this.notificationRepository.count(options);
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('NotificationRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof notification_repository_port_1.NotificationRepositoryPort !== "undefined" && notification_repository_port_1.NotificationRepositoryPort) === "function" ? _a : Object])
], NotificationService);


/***/ }),

/***/ "./apps/resource/src/modules/notification/application/usecases/notification.usecase.ts":
/*!*********************************************************************************************!*\
  !*** ./apps/resource/src/modules/notification/application/usecases/notification.usecase.ts ***!
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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationUsecase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const adapter_service_1 = __webpack_require__(/*! ../services/adapter.service */ "./apps/resource/src/modules/notification/application/services/adapter.service.ts");
const notification_service_1 = __webpack_require__(/*! ../services/notification.service */ "./apps/resource/src/modules/notification/application/services/notification.service.ts");
const schedule_1 = __webpack_require__(/*! @nestjs/schedule */ "@nestjs/schedule");
const notification_type_enum_1 = __webpack_require__(/*! @libs/enums/notification-type.enum */ "./libs/enums/notification-type.enum.ts");
const date_util_1 = __webpack_require__(/*! @libs/utils/date.util */ "./libs/utils/date.util.ts");
const employee_notification_service_1 = __webpack_require__(/*! ../services/employee-notification.service */ "./apps/resource/src/modules/notification/application/services/employee-notification.service.ts");
const cron_1 = __webpack_require__(/*! cron */ "cron");
const event_emitter_1 = __webpack_require__(/*! @nestjs/event-emitter */ "@nestjs/event-emitter");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let NotificationUsecase = class NotificationUsecase {
    constructor(adapterService, notificationService, employeeNotificationService, schedulerRegistry, eventEmitter) {
        this.adapterService = adapterService;
        this.notificationService = notificationService;
        this.employeeNotificationService = employeeNotificationService;
        this.schedulerRegistry = schedulerRegistry;
        this.eventEmitter = eventEmitter;
    }
    async onModuleInit() {
        console.log('before module init', Array.from(this.schedulerRegistry.getCronJobs().keys()));
        const upcomingNotifications = await this.notificationService.findAll({
            where: { isSent: false },
            relations: ['employees'],
        });
        for (const notification of upcomingNotifications) {
            const notiTarget = notification.employees.map((employee) => employee.employeeId);
            await this.createReservationUpcomingNotification(notification, notiTarget);
        }
        const sentNotifications = await this.notificationService.findAll({
            where: { createdAt: (0, typeorm_1.MoreThanOrEqual)(date_util_1.DateUtil.now().addDays(-3)) },
        });
        for (const notification of sentNotifications) {
            await this.markAsReadAfter3Days(notification);
        }
        console.log('after module init', Array.from(this.schedulerRegistry.getCronJobs().keys()));
    }
    async subscribe(user, subscription) {
        this.eventEmitter.emit('update.user.subscription', {
            userId: user.userId,
            subscription: subscription,
        });
    }
    async unsubscribe(user) {
        this.eventEmitter.emit('update.user.subscription', {
            userId: user.userId,
            subscription: null,
        });
    }
    async markAsRead(employeeId, notificationId) {
        const employeeNotification = await this.employeeNotificationService.findOne({
            where: {
                employeeId,
                notificationId,
            },
        });
        if (!employeeNotification) {
            throw new common_1.BadRequestException('There is no data');
        }
        await this.employeeNotificationService.update(employeeNotification.employeeNotificationId, {
            isRead: true,
        });
    }
    async findMyNotifications(employeeId, query) {
        const options = {
            where: {
                employees: { employeeId },
                isSent: true,
            },
        };
        if (query) {
            options.skip = query.getOffset();
            options.take = query.limit;
        }
        const notifications = await this.notificationService.findAll({
            ...options,
            relations: ['employees'],
        });
        const total = await this.notificationService.count({
            where: options.where,
        });
        return {
            items: notifications.map((notification) => {
                return {
                    notificationId: notification.notificationId,
                    title: notification.title,
                    body: notification.body,
                    notificationData: notification.notificationData,
                    notificationType: notification.notificationType,
                    createdAt: notification.createdAt,
                    isRead: notification.employees.find((employee) => employee.employeeId === employeeId).isRead,
                };
            }),
            meta: {
                total,
                page: query.page,
                limit: query.limit,
                hasNext: query.page * query.limit < total,
            },
        };
    }
    async createNotification(notificationType, createNotificationDatatDto, notiTarget, repositoryOptions) {
        const createNotificationDto = {
            title: '',
            body: '',
            notificationType: notificationType,
            notificationData: createNotificationDatatDto,
            createdAt: date_util_1.DateUtil.now().format('YYYY-MM-DD HH:mm'),
            isSent: true,
        };
        switch (notificationType) {
            case notification_type_enum_1.NotificationType.RESERVATION_DATE_UPCOMING:
                createNotificationDto.title = `예약 시간이 ${createNotificationDatatDto.beforeMinutes}분 남았습니다.`;
                createNotificationDto.body = `${createNotificationDatatDto.resourceName}`;
                createNotificationDto.createdAt = date_util_1.DateUtil.parse(createNotificationDatatDto.reservationDate)
                    .addMinutes(-createNotificationDatatDto.beforeMinutes)
                    .format('YYYY-MM-DD HH:mm');
                createNotificationDto.isSent = false;
                break;
            case notification_type_enum_1.NotificationType.RESERVATION_STATUS_CONFIRMED:
                createNotificationDto.title = `[예약 확정] ${createNotificationDatatDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDatatDto.reservationDate}`;
                break;
            case notification_type_enum_1.NotificationType.RESERVATION_STATUS_CANCELLED:
                createNotificationDto.title = `[예약 취소] ${createNotificationDatatDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDatatDto.reservationDate}`;
                break;
            case notification_type_enum_1.NotificationType.RESERVATION_STATUS_REJECTED:
                createNotificationDto.title = `[예약 취소 (관리자)] ${createNotificationDatatDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDatatDto.reservationDate}`;
                break;
            case notification_type_enum_1.NotificationType.RESERVATION_PARTICIPANT_CHANGED:
                createNotificationDto.title = `[참가자 변경] ${createNotificationDatatDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDatatDto.reservationDate}`;
                break;
            case notification_type_enum_1.NotificationType.RESOURCE_CONSUMABLE_REPLACING:
                createNotificationDto.title = `[교체 주기 알림] ${createNotificationDatatDto.consumableName}`;
                createNotificationDto.body = `${createNotificationDatatDto.resourceName}`;
                break;
            case notification_type_enum_1.NotificationType.RESOURCE_VEHICLE_RETURNED:
                createNotificationDto.title = `[차량 반납] 차량이 반납되었습니다.`;
                createNotificationDto.body = `${createNotificationDatatDto.resourceName}`;
                break;
        }
        const notification = await this.notificationProcess(createNotificationDto, notiTarget, repositoryOptions);
        switch (notificationType) {
            case notification_type_enum_1.NotificationType.RESERVATION_DATE_UPCOMING:
                this.createReservationUpcomingNotification(notification, notiTarget);
                break;
            default:
                for (const employeeId of notiTarget) {
                    try {
                        await this.adapterService.send(employeeId, notification);
                    }
                    catch (error) {
                        console.error(`Failed to send notification to employee ${employeeId}: ${error}`);
                    }
                }
                break;
        }
        await this.markAsReadAfter3Days(notification);
    }
    async notificationProcess(createNotificationDto, notiTarget, repositoryOptions) {
        const notification = await this.notificationService.save(createNotificationDto, repositoryOptions);
        for (const employeeId of notiTarget) {
            const employeeNotification = await this.employeeNotificationService.save({
                employeeId: employeeId,
                notificationId: notification.notificationId,
            }, repositoryOptions);
        }
        return notification;
    }
    async createReservationUpcomingNotification(notification, notiTarget) {
        const jobName = `upcoming-${notification.notificationId}-${date_util_1.DateUtil.now().format('YYYYMMDDHHmmssSSS')}`;
        const notificationDate = new Date(notification.createdAt);
        if (notificationDate.getTime() <= Date.now()) {
            console.log(`Notification time ${notificationDate} is in the past, skipping cron job creation`);
            return;
        }
        const job = new cron_1.CronJob(notificationDate, async () => {
            for (const employeeId of notiTarget) {
                try {
                    await this.adapterService.send(employeeId, notification);
                }
                catch (error) {
                    console.error(`Failed to send notification to employee ${employeeId}: ${error}`);
                }
                finally {
                    await this.notificationService.update(notification.notificationId, { isSent: true });
                }
            }
        });
        this.schedulerRegistry.addCronJob(jobName, job);
        console.log(Array.from(this.schedulerRegistry.getCronJobs().keys()));
        job.start();
    }
    async markAsReadAfter3Days(notification) {
        const parsedDate = date_util_1.DateUtil.parse(notification.createdAt).addDays(3).toDate();
        const notificationDate = new Date(parsedDate);
        const jobName = `mark-as-read-${notification.notificationId}-${date_util_1.DateUtil.now().format('YYYYMMDDHHmmssSSS')}`;
        const job = new cron_1.CronJob(notificationDate, async () => {
            const employeeNotifications = await this.employeeNotificationService.findAll({
                where: { notificationId: notification.notificationId },
            });
            for (const employeeNotification of employeeNotifications) {
                await this.employeeNotificationService.update(employeeNotification.employeeNotificationId, {
                    isRead: true,
                });
            }
        });
        this.schedulerRegistry.addCronJob(jobName, job);
        job.start();
    }
    async sendTestNotification(user, payload) {
        await this.adapterService.sendTestNotification(user, payload);
    }
};
exports.NotificationUsecase = NotificationUsecase;
exports.NotificationUsecase = NotificationUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof adapter_service_1.AdapterService !== "undefined" && adapter_service_1.AdapterService) === "function" ? _a : Object, typeof (_b = typeof notification_service_1.NotificationService !== "undefined" && notification_service_1.NotificationService) === "function" ? _b : Object, typeof (_c = typeof employee_notification_service_1.EmployeeNotificationService !== "undefined" && employee_notification_service_1.EmployeeNotificationService) === "function" ? _c : Object, typeof (_d = typeof schedule_1.SchedulerRegistry !== "undefined" && schedule_1.SchedulerRegistry) === "function" ? _d : Object, typeof (_e = typeof event_emitter_1.EventEmitter2 !== "undefined" && event_emitter_1.EventEmitter2) === "function" ? _e : Object])
], NotificationUsecase);


/***/ }),

/***/ "./apps/resource/src/modules/notification/domain/ports/employee-notification.repository.port.ts":
/*!******************************************************************************************************!*\
  !*** ./apps/resource/src/modules/notification/domain/ports/employee-notification.repository.port.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/resource/src/modules/notification/domain/ports/notification.repository.port.ts":
/*!*********************************************************************************************!*\
  !*** ./apps/resource/src/modules/notification/domain/ports/notification.repository.port.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/resource/src/modules/notification/domain/ports/push-notification.port.ts":
/*!***************************************************************************************!*\
  !*** ./apps/resource/src/modules/notification/domain/ports/push-notification.port.ts ***!
  \***************************************************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationController = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_decorator_1 = __webpack_require__(/*! @libs/decorators/user.decorator */ "./libs/decorators/user.decorator.ts");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
const notification_usecase_1 = __webpack_require__(/*! @resource/modules/notification/application/usecases/notification.usecase */ "./apps/resource/src/modules/notification/application/usecases/notification.usecase.ts");
const api_responses_decorator_1 = __webpack_require__(/*! @libs/decorators/api-responses.decorator */ "./libs/decorators/api-responses.decorator.ts");
const push_subscription_dto_1 = __webpack_require__(/*! @resource/modules/notification/application/dto/push-subscription.dto */ "./apps/resource/src/modules/notification/application/dto/push-subscription.dto.ts");
const response_notification_dto_1 = __webpack_require__(/*! @resource/modules/notification/application/dto/response-notification.dto */ "./apps/resource/src/modules/notification/application/dto/response-notification.dto.ts");
const create_notification_dto_1 = __webpack_require__(/*! @resource/modules/notification/application/dto/create-notification.dto */ "./apps/resource/src/modules/notification/application/dto/create-notification.dto.ts");
const paginate_query_dto_1 = __webpack_require__(/*! @libs/dtos/paginate-query.dto */ "./libs/dtos/paginate-query.dto.ts");
let NotificationController = class NotificationController {
    constructor(notificationUsecase) {
        this.notificationUsecase = notificationUsecase;
    }
    async subscribe(user, subscription) {
        await this.notificationUsecase.subscribe(user, subscription);
    }
    async unsubscribe(user) {
        await this.notificationUsecase.unsubscribe(user);
    }
    async send(sendNotificationDto) {
        await this.notificationUsecase.createNotification(sendNotificationDto.notificationType, sendNotificationDto.notificationData, sendNotificationDto.notificationTarget);
    }
    async findAllByEmployeeId(employeeId, query) {
        return await this.notificationUsecase.findMyNotifications(employeeId, query);
    }
    async markAsRead(user, notificationId) {
        await this.notificationUsecase.markAsRead(user.employeeId, notificationId);
    }
    async sendTest(user, sendNotificationDto) {
        await this.notificationUsecase.sendTestNotification(user, sendNotificationDto);
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Post)('subscribe'),
    (0, swagger_1.ApiOperation)({ summary: '웹 푸시 구독' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '웹 푸시 구독 성공',
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _b : Object, typeof (_c = typeof push_subscription_dto_1.PushSubscriptionDto !== "undefined" && push_subscription_dto_1.PushSubscriptionDto) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], NotificationController.prototype, "subscribe", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Post)('unsubscribe'),
    (0, swagger_1.ApiOperation)({ summary: '웹 푸시 구독 취소' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '웹 푸시 구독 취소 성공',
    }),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "unsubscribe", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Post)('send'),
    (0, swagger_1.ApiOperation)({ summary: '웹 푸시 알림 전송' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '웹 푸시 알림 전송 성공',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof create_notification_dto_1.SendNotificationDto !== "undefined" && create_notification_dto_1.SendNotificationDto) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "send", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '알람 목록 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '알람 목록 조회 성공',
        type: [response_notification_dto_1.ResponseNotificationDto],
        isPaginated: true,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        type: Number,
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        type: Number,
        required: false,
    }),
    __param(0, (0, user_decorator_1.User)('employeeId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_g = typeof paginate_query_dto_1.PaginationQueryDto !== "undefined" && paginate_query_dto_1.PaginationQueryDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], NotificationController.prototype, "findAllByEmployeeId", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Patch)(':notificationId/read'),
    (0, swagger_1.ApiOperation)({ summary: '알람 읽음 처리' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('notificationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _j : Object, String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "markAsRead", null);
__decorate([
    (0, swagger_1.ApiTags)('a.test'),
    (0, common_1.Post)('send/test'),
    (0, swagger_1.ApiOperation)({ summary: '알람 테스트 전송' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '알람 테스트 전송 성공',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                notification: { type: 'object', properties: { title: { type: 'string' }, body: { type: 'string' } } },
                data: { type: 'object', properties: { title: { type: 'string' }, body: { type: 'string' } } },
            },
        },
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _k : Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "sendTest", null);
exports.NotificationController = NotificationController = __decorate([
    (0, swagger_1.ApiTags)('알림'),
    (0, common_1.Controller)('notifications'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [typeof (_a = typeof notification_usecase_1.NotificationUsecase !== "undefined" && notification_usecase_1.NotificationUsecase) === "function" ? _a : Object])
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FCMAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const app_1 = __webpack_require__(/*! firebase-admin/app */ "firebase-admin/app");
const messaging_1 = __webpack_require__(/*! firebase-admin/messaging */ "firebase-admin/messaging");
let FCMAdapter = class FCMAdapter {
    constructor(configService) {
        this.configService = configService;
        try {
            (0, app_1.initializeApp)({
                credential: (0, app_1.cert)({
                    clientEmail: this.configService.get('firebase.clientEmail'),
                    privateKey: this.configService.get('firebase.privateKey').replace(/\\n/g, '\n'),
                    projectId: this.configService.get('firebase.projectId'),
                }),
            });
            console.log('Firebase Admin initialized successfully');
        }
        catch (error) {
            console.error('Firebase initialization error:', error);
            throw error;
        }
    }
    async sendNotification(subscription, payload) {
        try {
            if (!subscription || !subscription.fcm || !subscription.fcm.token) {
                throw new common_1.BadRequestException('FCM token is missing');
            }
            const message = {
                token: subscription.fcm.token,
                notification: {
                    title: payload.title,
                    body: payload.body,
                },
                data: {
                    title: payload.title,
                    body: payload.body,
                },
            };
            const response = await (0, messaging_1.getMessaging)()
                .send(message)
                .then((response) => {
                console.log('FCM send successful. Message ID:', response);
                return { success: true, message: response, error: null };
            })
                .catch((error) => {
                console.error('FCM send error:', {
                    code: error.code,
                    message: error.message,
                    details: error.details,
                    stack: error.stack,
                });
                return { success: false, message: 'failed', error: error.message };
            });
            return response;
        }
        catch (error) {
            console.error('FCM send error:', {
                code: error.code,
                message: error.message,
                details: error.details,
                stack: error.stack,
            });
            return { success: false, message: 'failed', error: error.message };
        }
    }
    async sendTestNotification(subscription, payload) {
        try {
            const message = {
                token: subscription.fcm.token,
                ...payload,
            };
            const response = await (0, messaging_1.getMessaging)()
                .send(message)
                .then((response) => {
                console.log('FCM send successful. Message ID:', response);
                return { success: true, message: response, error: null };
            })
                .catch((error) => {
                console.error('FCM send error:', {
                    code: error.code,
                    message: error.message,
                    details: error.details,
                    stack: error.stack,
                });
                return { success: false, message: 'failed', error: error.message };
            });
            return response;
        }
        catch (error) {
            console.error('FCM send error:', {
                code: error.code,
                message: error.message,
                details: error.details,
                stack: error.stack,
            });
            return { success: false, message: 'failed', error: error.message };
        }
    }
};
exports.FCMAdapter = FCMAdapter;
exports.FCMAdapter = FCMAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], FCMAdapter);


/***/ }),

/***/ "./apps/resource/src/modules/notification/infrastructure/adapters/out/persistence/employee-notification.repository.ts":
/*!****************************************************************************************************************************!*\
  !*** ./apps/resource/src/modules/notification/infrastructure/adapters/out/persistence/employee-notification.repository.ts ***!
  \****************************************************************************************************************************/
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
exports.EmployeeNotificationRepository = void 0;
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
let EmployeeNotificationRepository = class EmployeeNotificationRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async save(createEmployeeNotificationDto, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.EmployeeNotification)
            : this.repository;
        return await repository.save(createEmployeeNotificationDto);
    }
    async findOne(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.EmployeeNotification)
            : this.repository;
        return await repository.findOne({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
        });
    }
    async findAll(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.EmployeeNotification)
            : this.repository;
        return await repository.find({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            order: repositoryOptions?.order,
            skip: repositoryOptions?.skip,
            take: repositoryOptions?.take,
        });
    }
    async update(employeeNotificationId, updateEmployeeNotificationDto, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.EmployeeNotification)
            : this.repository;
        const result = await repository.update(employeeNotificationId, updateEmployeeNotificationDto);
        return await repository.findOne({ where: { employeeNotificationId } });
    }
};
exports.EmployeeNotificationRepository = EmployeeNotificationRepository;
exports.EmployeeNotificationRepository = EmployeeNotificationRepository = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.EmployeeNotification)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], EmployeeNotificationRepository);


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
    async save(createNotificationDto, options) {
        const repository = options?.queryRunner
            ? options.queryRunner.manager.getRepository(notification_entity_1.Notification)
            : this.notificationRepository;
        return repository.save(createNotificationDto);
    }
    async findAll(options) {
        const repository = options?.queryRunner
            ? options.queryRunner.manager.getRepository(notification_entity_1.Notification)
            : this.notificationRepository;
        return repository.find({
            where: options?.where,
            relations: options?.relations,
            order: options?.order,
            skip: options?.skip,
            take: options?.take,
        });
    }
    async findOne(options) {
        const repository = options?.queryRunner
            ? options.queryRunner.manager.getRepository(notification_entity_1.Notification)
            : this.notificationRepository;
        return repository.findOne({
            where: options?.where,
            relations: options?.relations,
        });
    }
    async update(notificationId, updateNotificationDto, options) {
        const repository = options?.queryRunner
            ? options.queryRunner.manager.getRepository(notification_entity_1.Notification)
            : this.notificationRepository;
        await repository.update(notificationId, updateNotificationDto);
        return await this.findOne({ where: { notificationId } });
    }
    async delete(notificationId, options) {
        const repository = options?.queryRunner
            ? options.queryRunner.manager.getRepository(notification_entity_1.Notification)
            : this.notificationRepository;
        await repository.delete(notificationId);
    }
    async count(options) {
        const repository = options?.queryRunner
            ? options.queryRunner.manager.getRepository(notification_entity_1.Notification)
            : this.notificationRepository;
        return await repository.count({
            where: options?.where,
        });
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
const auth_module_1 = __webpack_require__(/*! @resource/modules/auth/auth.module */ "./apps/resource/src/modules/auth/auth.module.ts");
const notification_usecase_1 = __webpack_require__(/*! ./application/usecases/notification.usecase */ "./apps/resource/src/modules/notification/application/usecases/notification.usecase.ts");
const fcm_push_adapter_1 = __webpack_require__(/*! ./infrastructure/adapters/out/device/fcm-push.adapter */ "./apps/resource/src/modules/notification/infrastructure/adapters/out/device/fcm-push.adapter.ts");
const schedule_1 = __webpack_require__(/*! @nestjs/schedule */ "@nestjs/schedule");
const employee_notification_service_1 = __webpack_require__(/*! ./application/services/employee-notification.service */ "./apps/resource/src/modules/notification/application/services/employee-notification.service.ts");
const employee_notification_repository_1 = __webpack_require__(/*! ./infrastructure/adapters/out/persistence/employee-notification.repository */ "./apps/resource/src/modules/notification/infrastructure/adapters/out/persistence/employee-notification.repository.ts");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
const notification_event_handler_1 = __webpack_require__(/*! ./application/handler/notification-event.handler */ "./apps/resource/src/modules/notification/application/handler/notification-event.handler.ts");
let NotificationModule = class NotificationModule {
};
exports.NotificationModule = NotificationModule;
exports.NotificationModule = NotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([notification_entity_1.Notification, entities_1.EmployeeNotification]),
            config_1.ConfigModule.forFeature(env_config_1.WEB_PUSH_CONFIG),
            config_1.ConfigModule.forFeature(env_config_1.FIREBASE_CONFIG),
            schedule_1.ScheduleModule.forRoot(),
            auth_module_1.AuthModule,
        ],
        providers: [
            config_1.ConfigService,
            notification_service_1.NotificationService,
            adapter_service_1.AdapterService,
            employee_notification_service_1.EmployeeNotificationService,
            notification_usecase_1.NotificationUsecase,
            {
                provide: 'NotificationRepositoryPort',
                useClass: notification_repository_1.NotificationRepository,
            },
            {
                provide: 'EmployeeNotificationRepositoryPort',
                useClass: employee_notification_repository_1.EmployeeNotificationRepository,
            },
            {
                provide: 'PushNotificationServicePort',
                useClass: fcm_push_adapter_1.FCMAdapter,
            },
            notification_event_handler_1.NotificationEventHandler,
        ],
        controllers: [notification_controller_1.NotificationController],
        exports: [
            notification_service_1.NotificationService,
            adapter_service_1.AdapterService,
            employee_notification_service_1.EmployeeNotificationService,
            notification_usecase_1.NotificationUsecase,
            {
                provide: 'NotificationRepositoryPort',
                useClass: notification_repository_1.NotificationRepository,
            },
            {
                provide: 'EmployeeNotificationRepositoryPort',
                useClass: employee_notification_repository_1.EmployeeNotificationRepository,
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
    (0, class_validator_1.Length)(0, 100),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 100),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-01-01 00:00:00',
        description: '예약 시작 시간 (YYYY-MM-DD HH:mm:ss 형식)',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.Matches)(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: '날짜 형식이 올바르지 않습니다. YYYY-MM-DD HH:mm:ss 형식이어야 합니다.',
    }),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-01-01 00:00:00',
        description: '예약 종료 시간 (YYYY-MM-DD HH:mm:ss 형식)',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.Matches)(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: '날짜 형식이 올바르지 않습니다. YYYY-MM-DD HH:mm:ss 형식이어야 합니다.',
    }),
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
const date_util_1 = __webpack_require__(/*! @libs/utils/date.util */ "./libs/utils/date.util.ts");
class ReservationResponseDto {
    constructor(reservation) {
        this.reservationId = reservation?.reservationId;
        this.resourceId = reservation?.resourceId;
        this.title = reservation?.title;
        this.description = reservation?.description;
        this.rejectReason = reservation?.rejectReason;
        this.startDate = date_util_1.DateUtil.format(reservation?.startDate);
        this.endDate = date_util_1.DateUtil.format(reservation?.endDate);
        this.status = reservation?.status;
        this.isAllDay = reservation?.isAllDay;
        this.notifyBeforeStart = reservation?.notifyBeforeStart;
        this.notifyMinutesBeforeStart = reservation?.notifyMinutesBeforeStart;
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
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ReservationResponseDto.prototype, "rejectReason", void 0);
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
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], ReservationResponseDto.prototype, "isMine", void 0);
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
        this.resource = reservation?.resource;
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
        this.resource = reservation?.resource;
        this.reservers = reservation?.participants?.filter((participant) => participant.type === reservation_type_enum_2.ParticipantsType.RESERVER);
        this.participants = reservation?.participants?.filter((participant) => participant.type === reservation_type_enum_2.ParticipantsType.PARTICIPANT);
    }
    getPropertiesAndTypes() {
        return {
            reservationId: {
                type: String,
                required: true,
            },
            resourceId: {
                type: String,
                required: false,
            },
            title: {
                type: String,
                required: false,
            },
            description: {
                type: String,
                required: false,
            },
            startDate: {
                type: String,
                required: false,
            },
            endDate: {
                type: String,
                required: false,
            },
            status: {
                type: String,
                required: false,
            },
            isAllDay: {
                type: Boolean,
                required: false,
            },
            notifyBeforeStart: {
                type: Boolean,
                required: false,
            },
            notifyMinutesBeforeStart: {
                type: [Number],
                required: false,
            },
            isMine: {
                type: Boolean,
                required: false,
            },
            resource: {
                type: dtos_index_1.ResourceResponseDto,
                required: false,
            },
            reservers: {
                type: [ReservationParticipantResponseDto],
                required: false,
            },
            participants: {
                type: [ReservationParticipantResponseDto],
                required: false,
            },
        };
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
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], ReservationWithRelationsResponseDto.prototype, "isMine", void 0);
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
const date_util_1 = __webpack_require__(/*! @libs/utils/date.util */ "./libs/utils/date.util.ts");
class UpdateReservationTitleDto {
}
exports.UpdateReservationTitleDto = UpdateReservationTitleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 100),
    __metadata("design:type", String)
], UpdateReservationTitleDto.prototype, "title", void 0);
class UpdateReservationTimeDto {
    constructor(reservation) {
        this.startDate = date_util_1.DateUtil.format(reservation?.startDate);
        this.endDate = date_util_1.DateUtil.format(reservation?.endDate);
        this.isAllDay = reservation?.isAllDay;
    }
    getPropertiesAndTypes() {
        return Object.getOwnPropertyNames(this).map((property) => ({
            property,
            type: Reflect.getMetadata('design:type', this, property),
        }));
    }
}
exports.UpdateReservationTimeDto = UpdateReservationTimeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-01-01 00:00:00',
        description: '예약 시작 시간 (YYYY-MM-DD HH:mm:ss 형식)',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.Matches)(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: '날짜 형식이 올바르지 않습니다. YYYY-MM-DD HH:mm:ss 형식이어야 합니다.',
    }),
    __metadata("design:type", String)
], UpdateReservationTimeDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-01-01 00:00:00',
        description: '예약 종료 시간 (YYYY-MM-DD HH:mm:ss 형식)',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.Matches)(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: '날짜 형식이 올바르지 않습니다. YYYY-MM-DD HH:mm:ss 형식이어야 합니다.',
    }),
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
    (0, class_validator_1.Length)(0, 100),
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

/***/ "./apps/resource/src/modules/reservation/application/handler/reservation-event.handler.ts":
/*!************************************************************************************************!*\
  !*** ./apps/resource/src/modules/reservation/application/handler/reservation-event.handler.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReservationEventHandler = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const event_emitter_1 = __webpack_require__(/*! @nestjs/event-emitter */ "@nestjs/event-emitter");
const reservation_service_1 = __webpack_require__(/*! ../services/reservation.service */ "./apps/resource/src/modules/reservation/application/services/reservation.service.ts");
let ReservationEventHandler = class ReservationEventHandler {
    constructor(reservationService) {
        this.reservationService = reservationService;
    }
    async handleFindReservation(payload) {
        return await this.reservationService.findAll(payload.repositoryOptions);
    }
};
exports.ReservationEventHandler = ReservationEventHandler;
__decorate([
    (0, event_emitter_1.OnEvent)('find.reservation'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReservationEventHandler.prototype, "handleFindReservation", null);
exports.ReservationEventHandler = ReservationEventHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof reservation_service_1.ReservationService !== "undefined" && reservation_service_1.ReservationService) === "function" ? _a : Object])
], ReservationEventHandler);


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
const reservation_type_enum_1 = __webpack_require__(/*! @libs/enums/reservation-type.enum */ "./libs/enums/reservation-type.enum.ts");
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
    async count(repositoryOptions) {
        const count = await this.reservationRepository.count(repositoryOptions);
        return count;
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
        return await this.findAll({
            where: {
                resourceId,
                startDate: (0, typeorm_1.LessThan)(endDate),
                endDate: (0, typeorm_1.MoreThanOrEqual)(startDate),
                status: reservation_type_enum_1.ReservationStatus.CONFIRMED,
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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReservationUsecase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const reservation_response_dto_1 = __webpack_require__(/*! ../dtos/reservation-response.dto */ "./apps/resource/src/modules/reservation/application/dtos/reservation-response.dto.ts");
const reservation_type_enum_1 = __webpack_require__(/*! @libs/enums/reservation-type.enum */ "./libs/enums/reservation-type.enum.ts");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const date_util_1 = __webpack_require__(/*! @libs/utils/date.util */ "./libs/utils/date.util.ts");
const reservation_service_1 = __webpack_require__(/*! ../services/reservation.service */ "./apps/resource/src/modules/reservation/application/services/reservation.service.ts");
const participant_service_1 = __webpack_require__(/*! ../services/participant.service */ "./apps/resource/src/modules/reservation/application/services/participant.service.ts");
const resource_type_enum_1 = __webpack_require__(/*! @libs/enums/resource-type.enum */ "./libs/enums/resource-type.enum.ts");
const notification_type_enum_1 = __webpack_require__(/*! @libs/enums/notification-type.enum */ "./libs/enums/notification-type.enum.ts");
const role_type_enum_1 = __webpack_require__(/*! @libs/enums/role-type.enum */ "./libs/enums/role-type.enum.ts");
const dist_1 = __webpack_require__(/*! cron/dist */ "cron/dist");
const schedule_1 = __webpack_require__(/*! @nestjs/schedule */ "@nestjs/schedule");
const event_emitter_1 = __webpack_require__(/*! @nestjs/event-emitter */ "@nestjs/event-emitter");
let ReservationUsecase = class ReservationUsecase {
    constructor(reservationService, participantService, dataSource, eventEmitter, schedulerRegistry) {
        this.reservationService = reservationService;
        this.participantService = participantService;
        this.dataSource = dataSource;
        this.eventEmitter = eventEmitter;
        this.schedulerRegistry = schedulerRegistry;
    }
    async onModuleInit() {
        const now = date_util_1.DateUtil.now().format();
        const notClosedReservations = await this.reservationService.findAll({
            where: {
                status: reservation_type_enum_1.ReservationStatus.CONFIRMED,
                endDate: (0, typeorm_1.LessThanOrEqual)(date_util_1.DateUtil.date(now).toDate()),
            },
        });
        for (const reservation of notClosedReservations) {
            await this.reservationService.update(reservation.reservationId, { status: reservation_type_enum_1.ReservationStatus.CLOSED });
        }
        const reservations = await this.reservationService.findAll({
            where: {
                status: reservation_type_enum_1.ReservationStatus.CONFIRMED,
                endDate: (0, typeorm_1.MoreThan)(date_util_1.DateUtil.date(now).toDate()),
            },
        });
        for (const reservation of reservations) {
            this.createReservationClosingJob(reservation);
        }
    }
    async handleCron() {
        const now = date_util_1.DateUtil.now().format();
        const notClosedReservations = await this.reservationService.findAll({
            where: {
                status: reservation_type_enum_1.ReservationStatus.CONFIRMED,
                endDate: (0, typeorm_1.LessThanOrEqual)(date_util_1.DateUtil.date(now).toDate()),
            },
        });
        for (const reservation of notClosedReservations) {
            await this.reservationService.update(reservation.reservationId, { status: reservation_type_enum_1.ReservationStatus.CLOSED });
        }
    }
    async makeReservation(user, createDto) {
        const conflicts = await this.reservationService.findConflictingReservations(createDto.resourceId, date_util_1.DateUtil.date(createDto.startDate).toDate(), date_util_1.DateUtil.date(createDto.endDate).toDate());
        if (conflicts.length > 0) {
            throw new common_1.BadRequestException('Reservation time conflict - check in logic');
        }
        if (createDto.startDate > createDto.endDate) {
            throw new common_1.BadRequestException('Start date must be before end date');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const reservation = this.reservationService.create(createDto);
            const savedReservation = await this.reservationService.save(reservation, { queryRunner });
            await Promise.all([
                this.participantService.save({
                    reservationId: savedReservation.reservationId,
                    employeeId: user.employeeId,
                    type: reservation_type_enum_1.ParticipantsType.RESERVER,
                }, { queryRunner }),
                ...createDto.participantIds.map((employeeId) => this.participantService.save({
                    reservationId: savedReservation.reservationId,
                    employeeId,
                    type: reservation_type_enum_1.ParticipantsType.PARTICIPANT,
                }, { queryRunner })),
            ]);
            await queryRunner.commitTransaction();
            try {
                const reservationWithResource = await this.reservationService.findOne({
                    where: { reservationId: savedReservation.reservationId },
                    relations: ['resource'],
                    withDeleted: true,
                });
                if (reservationWithResource.status === reservation_type_enum_1.ReservationStatus.CONFIRMED) {
                    this.createReservationClosingJob(reservationWithResource);
                    const notiTarget = [...createDto.participantIds, user.employeeId];
                    this.eventEmitter.emit('create.notification', {
                        notificationType: notification_type_enum_1.NotificationType.RESERVATION_STATUS_CONFIRMED,
                        notificationData: {
                            reservationId: reservationWithResource.reservationId,
                            reservationTitle: reservationWithResource.title,
                            reservationDate: date_util_1.DateUtil.format(reservationWithResource.startDate),
                            resourceId: reservationWithResource.resource.resourceId,
                            resourceName: reservationWithResource.resource.name,
                            resourceType: reservationWithResource.resource.type,
                        },
                        notiTarget,
                    });
                    for (const beforeMinutes of reservationWithResource.notifyMinutesBeforeStart) {
                        this.eventEmitter.emit('create.notification', {
                            notificationType: notification_type_enum_1.NotificationType.RESERVATION_DATE_UPCOMING,
                            notificationData: {
                                reservationId: reservationWithResource.reservationId,
                                reservationTitle: reservationWithResource.title,
                                resourceId: reservationWithResource.resource.resourceId,
                                resourceName: reservationWithResource.resource.name,
                                resourceType: reservationWithResource.resource.type,
                                beforeMinutes: beforeMinutes,
                            },
                            notiTarget,
                        });
                    }
                }
            }
            catch (error) {
                console.log(error);
                console.log('Notification creation failed');
            }
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
    async findReservationDetail(user, reservationId) {
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
            withDeleted: true,
        });
        if (!reservation) {
            throw new common_1.NotFoundException('Reservation not found');
        }
        const reservationResponseDto = new reservation_response_dto_1.ReservationWithRelationsResponseDto(reservation);
        reservationResponseDto.isMine = reservationResponseDto.reservers.some((reserver) => reserver.employeeId === user.employeeId);
        return reservationResponseDto;
    }
    async findMyReservationList(employeeId, startDate, resourceType, page, limit) {
        const where = { participants: { employeeId, type: reservation_type_enum_1.ParticipantsType.RESERVER } };
        if (startDate) {
            where.startDate = (0, typeorm_1.Between)(date_util_1.DateUtil.date(startDate + ' 00:00:00').toDate(), date_util_1.DateUtil.date(startDate + ' 23:59:59').toDate());
        }
        if (resourceType) {
            where.resource = {
                type: resourceType,
            };
        }
        const options = {
            where,
        };
        if (page && limit) {
            options.skip = (page - 1) * limit;
            options.take = limit;
        }
        const reservations = await this.reservationService.findAll(options);
        const reservationWithParticipants = await this.reservationService.findAll({
            where: {
                reservationId: (0, typeorm_1.In)(reservations.map((r) => r.reservationId)),
            },
            relations: ['resource', 'participants', 'participants.employee'],
            withDeleted: true,
        });
        const count = await this.reservationService.count({
            where: {
                reservationId: (0, typeorm_1.In)(reservations.map((r) => r.reservationId)),
            },
        });
        return {
            items: reservationWithParticipants.map((reservation) => new reservation_response_dto_1.ReservationWithRelationsResponseDto(reservation)),
            meta: {
                total: count,
                page,
                limit,
                hasNext: page * limit < count,
            },
        };
    }
    async findMyCurrentReservation(employeeId, resourceType) {
        const now = date_util_1.DateUtil.now().format();
        const where = {
            participants: { employeeId, type: reservation_type_enum_1.ParticipantsType.RESERVER },
            status: reservation_type_enum_1.ReservationStatus.CONFIRMED,
            resource: { type: resourceType },
            startDate: (0, typeorm_1.LessThan)(date_util_1.DateUtil.date(now).toDate()),
            endDate: (0, typeorm_1.MoreThan)(date_util_1.DateUtil.date(now).toDate()),
        };
        const reservation = await this.reservationService.findOne({
            where,
            relations: ['resource'],
            withDeleted: true,
        });
        return reservation ? new reservation_response_dto_1.ReservationWithRelationsResponseDto(reservation) : null;
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
        console.log(startDate, endDate, resourceType, resourceId, status);
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
                startDate: (0, typeorm_1.LessThan)(date_util_1.DateUtil.date(regex.test(endDate) ? endDate : endDate + ' 23:59:59').toDate()),
                endDate: (0, typeorm_1.MoreThan)(date_util_1.DateUtil.date(regex.test(startDate) ? startDate : startDate + ' 00:00:00').toDate()),
            };
        }
        if (!startDate && !endDate) {
            const thisMonth = date_util_1.DateUtil.format(new Date(), 'YYYY-MM');
            const startDate = `${thisMonth}-01 00:00:00`;
            const endDate = `${thisMonth}-31 23:59:59`;
            where = {
                ...where,
                startDate: (0, typeorm_1.MoreThan)(date_util_1.DateUtil.date(startDate).toDate()),
                endDate: (0, typeorm_1.LessThan)(date_util_1.DateUtil.date(endDate).toDate()),
            };
        }
        const reservations = await this.reservationService.findAll({
            where,
            relations: ['resource', 'participants', 'participants.employee'],
            withDeleted: true,
        });
        const reservationResponseDtos = reservations.map((reservation) => new reservation_response_dto_1.ReservationWithRelationsResponseDto(reservation));
        return reservationResponseDtos;
    }
    async checkReservationAccess(reservationId, employeeId) {
        const reservation = await this.reservationService.findOne({
            where: { reservationId, participants: { employeeId, type: reservation_type_enum_1.ParticipantsType.RESERVER } },
            relations: ['participants'],
        });
        if (!reservation) {
            throw new common_1.UnauthorizedException('No Access to Reservation');
        }
        return true;
    }
    async updateTitle(reservationId, updateDto, repositoryOptions) {
        const reservation = await this.reservationService.findOne({ where: { reservationId } });
        if (!reservation) {
            throw new common_1.NotFoundException('Reservation not found');
        }
        if (reservation.status !== reservation_type_enum_1.ReservationStatus.PENDING) {
            throw new common_1.BadRequestException(`Cannot update title of reservation in ${reservation.status} status`);
        }
        const updatedReservation = await this.reservationService.update(reservationId, updateDto, repositoryOptions);
        return new reservation_response_dto_1.ReservationResponseDto(updatedReservation);
    }
    async updateTime(reservationId, updateDto) {
        const reservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: ['resource'],
            withDeleted: true,
        });
        if (!reservation) {
            throw new common_1.NotFoundException('Reservation not found');
        }
        if (reservation.status === reservation_type_enum_1.ReservationStatus.CLOSED ||
            reservation.status === reservation_type_enum_1.ReservationStatus.CANCELLED ||
            reservation.status === reservation_type_enum_1.ReservationStatus.REJECTED) {
            throw new common_1.BadRequestException(`Cannot update time of reservation in ${reservation.status} status`);
        }
        if (reservation.status === reservation_type_enum_1.ReservationStatus.CONFIRMED &&
            reservation.resource.type === resource_type_enum_1.ResourceType.ACCOMMODATION) {
            throw new common_1.BadRequestException('Cannot update time of confirmed accommodation reservation');
        }
        this.deleteReservationClosingJob(reservationId);
        const updatedReservation = await this.reservationService.update(reservationId, {
            ...updateDto,
            startDate: date_util_1.DateUtil.date(updateDto.startDate).toDate(),
            endDate: date_util_1.DateUtil.date(updateDto.endDate).toDate(),
        });
        if (updatedReservation.status === reservation_type_enum_1.ReservationStatus.CONFIRMED) {
            this.createReservationClosingJob(updatedReservation);
        }
        return new reservation_response_dto_1.ReservationResponseDto(updatedReservation);
    }
    async updateStatus(reservationId, updateDto, user) {
        const reservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: ['resource'],
            withDeleted: true,
        });
        if (!reservation) {
            throw new common_1.NotFoundException('Reservation not found');
        }
        const allowed = user.roles.includes(role_type_enum_1.Role.SYSTEM_ADMIN) ||
            (await this.checkReservationAccess(reservationId, user.employeeId));
        if (allowed) {
            if (updateDto.status === reservation_type_enum_1.ReservationStatus.CANCELLED || updateDto.status === reservation_type_enum_1.ReservationStatus.REJECTED) {
                this.deleteReservationClosingJob(reservationId);
            }
            const updatedReservation = await this.reservationService.update(reservationId, updateDto);
            if (updateDto.status === reservation_type_enum_1.ReservationStatus.CONFIRMED) {
                this.createReservationClosingJob(updatedReservation);
            }
            if (reservation.resource.notifyReservationChange) {
                try {
                    const reservers = await this.participantService.findAll({
                        where: { reservationId },
                    });
                    const notiTarget = reservers.map((reserver) => reserver.employeeId);
                    let notificationType;
                    switch (updateDto.status) {
                        case reservation_type_enum_1.ReservationStatus.CONFIRMED:
                            notificationType = notification_type_enum_1.NotificationType.RESERVATION_STATUS_CONFIRMED;
                            break;
                        case reservation_type_enum_1.ReservationStatus.CANCELLED:
                            notificationType = notification_type_enum_1.NotificationType.RESERVATION_STATUS_CANCELLED;
                            break;
                        case reservation_type_enum_1.ReservationStatus.REJECTED:
                            notificationType = notification_type_enum_1.NotificationType.RESERVATION_STATUS_REJECTED;
                            break;
                    }
                    this.eventEmitter.emit('create.notification', {
                        notificationType,
                        notificationData: {
                            reservationId: reservation.reservationId,
                            reservationTitle: reservation.title,
                            reservationDate: date_util_1.DateUtil.format(reservation.startDate),
                            resourceId: reservation.resource.resourceId,
                            resourceName: reservation.resource.name,
                            resourceType: reservation.resource.type,
                        },
                        notiTarget,
                    });
                }
                catch (error) {
                    console.log(error);
                    console.log('Notification creation failed in updateStatus');
                }
            }
            return new reservation_response_dto_1.ReservationResponseDto(updatedReservation);
        }
        throw new common_1.UnauthorizedException('You are not authorized to update this reservation');
    }
    async updateParticipants(reservationId, updateDto) {
        const reservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: ['resource'],
            withDeleted: true,
        });
        if (!reservation) {
            throw new common_1.NotFoundException('Reservation not found');
        }
        if (reservation.status === reservation_type_enum_1.ReservationStatus.CLOSED ||
            reservation.status === reservation_type_enum_1.ReservationStatus.CANCELLED ||
            reservation.status === reservation_type_enum_1.ReservationStatus.REJECTED) {
            throw new common_1.BadRequestException(`Cannot update participants of reservation in ${reservation.status} status`);
        }
        const participants = await this.participantService.findAll({
            where: { reservationId, type: reservation_type_enum_1.ParticipantsType.PARTICIPANT },
        });
        await Promise.all(participants.map((participant) => this.participantService.delete(participant.participantId)));
        await Promise.all(updateDto.participantIds.map((employeeId) => this.participantService.save({
            reservationId,
            employeeId,
            type: reservation_type_enum_1.ParticipantsType.PARTICIPANT,
        })));
        const updatedReservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: ['participants', 'resource'],
            withDeleted: true,
        });
        if (updatedReservation.resource.notifyParticipantChange) {
            try {
                const notiTarget = updatedReservation.participants.map((participant) => participant.employeeId);
                this.eventEmitter.emit('create.notification', {
                    notificationType: notification_type_enum_1.NotificationType.RESERVATION_PARTICIPANT_CHANGED,
                    notificationData: {
                        reservationId: updatedReservation.reservationId,
                        reservationTitle: updatedReservation.title,
                        reservationDate: date_util_1.DateUtil.format(updatedReservation.startDate),
                        resourceId: updatedReservation.resource.resourceId,
                        resourceName: updatedReservation.resource.name,
                        resourceType: updatedReservation.resource.type,
                    },
                    notiTarget,
                });
            }
            catch (error) {
                console.log(error);
                console.log('Notification creation failed in updateParticipants');
            }
        }
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
    deleteReservationClosingJob(reservationId) {
        const jobName = `closing-${reservationId}`;
        try {
            if (this.schedulerRegistry.doesExist('cron', jobName)) {
                this.schedulerRegistry.deleteCronJob(jobName);
                console.log(`Job ${jobName} deleted successfully`);
            }
        }
        catch (error) {
            console.log(`Failed to delete job ${jobName}: ${error.message}`);
        }
    }
    async createReservationClosingJob(reservation) {
        const jobName = `closing-${reservation.reservationId}`;
        console.log('createReservationClosingJob', jobName);
        const executeTime = date_util_1.DateUtil.date(reservation.endDate).toDate();
        if (executeTime.getTime() <= Date.now()) {
            console.log(`ExecuteTime time ${executeTime} is in the past, skipping cron job creation`);
            await this.reservationService.update(reservation.reservationId, { status: reservation_type_enum_1.ReservationStatus.CLOSED });
            return;
        }
        this.deleteReservationClosingJob(reservation.reservationId);
        const job = new dist_1.CronJob(executeTime, async () => {
            await this.reservationService.update(reservation.reservationId, { status: reservation_type_enum_1.ReservationStatus.CLOSED });
        });
        this.schedulerRegistry.addCronJob(jobName, job);
        job.start();
    }
};
exports.ReservationUsecase = ReservationUsecase;
exports.ReservationUsecase = ReservationUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof reservation_service_1.ReservationService !== "undefined" && reservation_service_1.ReservationService) === "function" ? _a : Object, typeof (_b = typeof participant_service_1.ParticipantService !== "undefined" && participant_service_1.ParticipantService) === "function" ? _b : Object, typeof (_c = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _c : Object, typeof (_d = typeof event_emitter_1.EventEmitter2 !== "undefined" && event_emitter_1.EventEmitter2) === "function" ? _d : Object, typeof (_e = typeof schedule_1.SchedulerRegistry !== "undefined" && schedule_1.SchedulerRegistry) === "function" ? _e : Object])
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
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
const date_util_1 = __webpack_require__(/*! @libs/utils/date.util */ "./libs/utils/date.util.ts");
const paginate_query_dto_1 = __webpack_require__(/*! @libs/dtos/paginate-query.dto */ "./libs/dtos/paginate-query.dto.ts");
const public_decorator_1 = __webpack_require__(/*! @libs/decorators/public.decorator */ "./libs/decorators/public.decorator.ts");
let ReservationController = class ReservationController {
    constructor(reservationUsecase) {
        this.reservationUsecase = reservationUsecase;
    }
    async create(user, createDto) {
        return this.reservationUsecase.makeReservation(user, createDto);
    }
    async findMyReservationList(user, startDate, resourceType, query) {
        const { page, limit } = query;
        return this.reservationUsecase.findMyReservationList(user.employeeId, startDate, resourceType, page, limit);
    }
    async findMyCurrentReservation(user, resourceType) {
        return this.reservationUsecase.findMyCurrentReservation(user.employeeId, resourceType);
    }
    async findOne(user, reservationId) {
        return this.reservationUsecase.findReservationDetail(user, reservationId);
    }
    async findReservationList(startDate, endDate, resourceType, resourceId, status) {
        return this.reservationUsecase.findReservationList(startDate, endDate, resourceType, resourceId, status);
    }
    async updateTitle(user, reservationId, updateDto) {
        await this.reservationUsecase.checkReservationAccess(reservationId, user.employeeId);
        return this.reservationUsecase.updateTitle(reservationId, updateDto);
    }
    async update(user, reservationId, updateDto) {
        await this.reservationUsecase.checkReservationAccess(reservationId, user.employeeId);
        return this.reservationUsecase.updateTime(reservationId, updateDto);
    }
    async updateStatus(user, reservationId, updateDto) {
        return this.reservationUsecase.updateStatus(reservationId, updateDto, user);
    }
    async updateParticipants(user, reservationId, updateDto) {
        await this.reservationUsecase.checkReservationAccess(reservationId, user.employeeId);
        return this.reservationUsecase.updateParticipants(reservationId, updateDto);
    }
    async updateCcReceipient(user, reservationId, updateDto) {
        await this.reservationUsecase.checkReservationAccess(reservationId, user.employeeId);
        return this.reservationUsecase.updateCcReceipient(reservationId, updateDto);
    }
    async closeReservation() {
        return this.reservationUsecase.handleCron();
    }
};
exports.ReservationController = ReservationController;
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Post)(),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: '예약 생성' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 생성 성공',
        type: dtos_index_1.CreateReservationResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _b : Object, typeof (_c = typeof create_reservation_dto_1.CreateReservationDto !== "undefined" && create_reservation_dto_1.CreateReservationDto) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ReservationController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Get)('me'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: '내 예약 리스트 조회 #사용자/홈 ' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '내 예약 리스트 조회 성공',
        type: [reservation_response_dto_1.ReservationWithRelationsResponseDto],
    }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', type: String, required: false, example: '2025-01-01' }),
    (0, swagger_1.ApiQuery)({ name: 'resourceType', enum: resource_type_enum_1.ResourceType, required: false, example: resource_type_enum_1.ResourceType.MEETING_ROOM }),
    (0, swagger_1.ApiQuery)({ name: 'page', type: Number, required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: Number, required: false, example: 10 }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('resourceType')),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _e : Object, String, typeof (_f = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _f : Object, typeof (_g = typeof paginate_query_dto_1.PaginationQueryDto !== "undefined" && paginate_query_dto_1.PaginationQueryDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ReservationController.prototype, "findMyReservationList", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Get)('me/current'),
    (0, swagger_1.ApiOperation)({ summary: '내 예약 현재 예약 조회 #사용자/자원예약/이용중 ' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '내 예약 현재 예약 조회 성공',
        type: reservation_response_dto_1.ReservationWithRelationsResponseDto,
    }),
    (0, swagger_1.ApiQuery)({ name: 'resourceType', enum: resource_type_enum_1.ResourceType, example: resource_type_enum_1.ResourceType.MEETING_ROOM }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)('resourceType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _j : Object, typeof (_k = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], ReservationController.prototype, "findMyCurrentReservation", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Get)(':reservationId'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: '예약 조회 #사용자/예약상세페이지' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 조회 성공',
        type: reservation_response_dto_1.ReservationWithRelationsResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('reservationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _m : Object, String]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], ReservationController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1', 'sprint0.3'),
    (0, common_1.Get)(),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.USER),
    (0, swagger_1.ApiOperation)({
        summary: '예약 리스트 조회 #사용자/자원캘린더 #사용자/자원예약/예약가능시간확인 #관리자/홈 #관리자/예약관리',
    }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 리스트 조회 성공',
        type: [reservation_response_dto_1.ReservationWithResourceResponseDto],
    }),
    (0, swagger_1.ApiQuery)({
        name: 'startDate',
        type: String,
        required: false,
        example: date_util_1.DateUtil.now().addDays(-20).format('YYYY-MM-DD'),
    }),
    (0, swagger_1.ApiQuery)({
        name: 'endDate',
        type: String,
        required: false,
        example: date_util_1.DateUtil.now().addDays(30).format('YYYY-MM-DD'),
    }),
    (0, swagger_1.ApiQuery)({ name: 'resourceType', enum: resource_type_enum_1.ResourceType, required: false, example: resource_type_enum_1.ResourceType.MEETING_ROOM }),
    (0, swagger_1.ApiQuery)({ name: 'resourceId', type: String, required: false, example: '78117aaf-a203-43a3-bb38-51ec91ca935a' }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        enum: reservation_type_enum_1.ReservationStatus,
        description: `Available values : ${Object.values(reservation_type_enum_1.ReservationStatus).join(', ')}`,
        isArray: true,
        required: false,
        example: [reservation_type_enum_1.ReservationStatus.CONFIRMED],
    }),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __param(2, (0, common_1.Query)('resourceType')),
    __param(3, (0, common_1.Query)('resourceId')),
    __param(4, (0, common_1.Query)('status', new common_1.ParseArrayPipe({ optional: true, separator: ',' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, typeof (_p = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _p : Object, String, Array]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], ReservationController.prototype, "findReservationList", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Patch)(':reservationId/title'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: '예약 제목 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 제목 수정 성공',
        type: dtos_index_1.ReservationResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('reservationId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_r = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _r : Object, String, typeof (_s = typeof dtos_index_1.UpdateReservationTitleDto !== "undefined" && dtos_index_1.UpdateReservationTitleDto) === "function" ? _s : Object]),
    __metadata("design:returntype", typeof (_t = typeof Promise !== "undefined" && Promise) === "function" ? _t : Object)
], ReservationController.prototype, "updateTitle", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Patch)(':reservationId/time'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: '예약 시간 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 시간 수정 성공',
        type: dtos_index_1.ReservationResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('reservationId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_u = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _u : Object, String, typeof (_v = typeof dtos_index_1.UpdateReservationTimeDto !== "undefined" && dtos_index_1.UpdateReservationTimeDto) === "function" ? _v : Object]),
    __metadata("design:returntype", typeof (_w = typeof Promise !== "undefined" && Promise) === "function" ? _w : Object)
], ReservationController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1', 'sprint0.3'),
    (0, common_1.Patch)(':reservationId/status'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: '예약 상태 수정 #사용자/예약상세페이지 #관리자/예약관리/예약상세' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 상태 수정 성공',
        type: dtos_index_1.ReservationResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('reservationId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_x = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _x : Object, String, typeof (_y = typeof dtos_index_1.UpdateReservationStatusDto !== "undefined" && dtos_index_1.UpdateReservationStatusDto) === "function" ? _y : Object]),
    __metadata("design:returntype", typeof (_z = typeof Promise !== "undefined" && Promise) === "function" ? _z : Object)
], ReservationController.prototype, "updateStatus", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Patch)(':reservationId/participants'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: '예약 참가자 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 참가자 수정 성공',
        type: dtos_index_1.ReservationResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('reservationId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_0 = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _0 : Object, String, typeof (_1 = typeof dtos_index_1.UpdateReservationParticipantsDto !== "undefined" && dtos_index_1.UpdateReservationParticipantsDto) === "function" ? _1 : Object]),
    __metadata("design:returntype", typeof (_2 = typeof Promise !== "undefined" && Promise) === "function" ? _2 : Object)
], ReservationController.prototype, "updateParticipants", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Patch)(':reservationId/cc-receipient'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: '예약 수신참조자 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 수신참조자 수정 성공',
        type: dtos_index_1.ReservationResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('reservationId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_3 = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _3 : Object, String, typeof (_4 = typeof dtos_index_1.UpdateReservationCcReceipientDto !== "undefined" && dtos_index_1.UpdateReservationCcReceipientDto) === "function" ? _4 : Object]),
    __metadata("design:returntype", typeof (_5 = typeof Promise !== "undefined" && Promise) === "function" ? _5 : Object)
], ReservationController.prototype, "updateCcReceipient", null);
__decorate([
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('cron-job/close'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "closeReservation", null);
exports.ReservationController = ReservationController = __decorate([
    (0, swagger_1.ApiTags)('예약'),
    (0, common_1.Controller)('reservations'),
    (0, swagger_1.ApiBearerAuth)(),
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
const date_util_1 = __webpack_require__(/*! @libs/utils/date.util */ "./libs/utils/date.util.ts");
let ReservationRepository = class ReservationRepository {
    constructor(repository) {
        this.repository = repository;
    }
    create(createDto) {
        const reservation = new entities_1.Reservation();
        reservation.resourceId = createDto.resourceId;
        reservation.title = createDto.title;
        reservation.description = createDto.description;
        reservation.startDate = date_util_1.DateUtil.date(createDto.startDate).toDate();
        reservation.endDate = date_util_1.DateUtil.date(createDto.endDate).toDate();
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
        try {
            const saved = await repository.save(reservation);
            return saved;
        }
        catch (error) {
            if (error.constraint === 'no_time_overlap') {
                console.warn(date_util_1.DateUtil.now().toISOString(), reservation.startDate, reservation.endDate);
                throw new common_1.BadRequestException('Reservation time conflict - check in database');
            }
            throw error;
        }
    }
    async findOne(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Reservation)
            : this.repository;
        const entity = await repository.findOne({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            withDeleted: repositoryOptions?.withDeleted,
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
            withDeleted: repositoryOptions?.withDeleted,
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
    async count(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Reservation)
            : this.repository;
        const count = await repository.count({
            where: repositoryOptions?.where,
        });
        return count;
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
const reservation_event_handler_1 = __webpack_require__(/*! ./application/handler/reservation-event.handler */ "./apps/resource/src/modules/reservation/application/handler/reservation-event.handler.ts");
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
            reservation_event_handler_1.ReservationEventHandler,
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
    (0, class_validator_1.Length)(0, 100),
    __metadata("design:type", String)
], CreateResourceGroupDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 100),
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
    (0, class_validator_1.Length)(0, 100),
    __metadata("design:type", String)
], ResourceLocation.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 100),
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
    (0, class_validator_1.Length)(0, 100),
    __metadata("design:type", String)
], CreateResourceDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 100),
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
const vehicle_response_dto_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/application/dtos/vehicle-response.dto */ "./apps/resource/src/modules/resource/vehicle/application/dtos/vehicle-response.dto.ts");
const meeting_room_info_response_dto_1 = __webpack_require__(/*! @resource/modules/resource/meeting-room/application/dtos/meeting-room-info-response.dto */ "./apps/resource/src/modules/resource/meeting-room/application/dtos/meeting-room-info-response.dto.ts");
const accommodation_info_response_dto_1 = __webpack_require__(/*! @resource/modules/resource/accommodation/application/dtos/accommodation-info-response.dto */ "./apps/resource/src/modules/resource/accommodation/application/dtos/accommodation-info-response.dto.ts");
const resource_type_enum_1 = __webpack_require__(/*! @libs/enums/resource-type.enum */ "./libs/enums/resource-type.enum.ts");
const create_resource_dto_1 = __webpack_require__(/*! ./create-resource.dto */ "./apps/resource/src/modules/resource/common/application/dtos/create-resource.dto.ts");
const reservation_response_dto_1 = __webpack_require__(/*! @resource/modules/reservation/application/dtos/reservation-response.dto */ "./apps/resource/src/modules/reservation/application/dtos/reservation-response.dto.ts");
const employee_response_dto_1 = __webpack_require__(/*! @resource/modules/employee/application/dtos/employee-response.dto */ "./apps/resource/src/modules/employee/application/dtos/employee-response.dto.ts");
const file_response_dto_1 = __webpack_require__(/*! @resource/modules/file/application/dtos/file-response.dto */ "./apps/resource/src/modules/file/application/dtos/file-response.dto.ts");
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
        this.resourceId = resource?.resourceId;
        this.resourceGroupId = resource?.resourceGroupId;
        this.name = resource?.name;
        this.description = resource?.description;
        this.location = resource?.location;
        this.images = resource?.images;
        this.type = resource?.type;
        this.isAvailable = resource?.isAvailable;
        this.unavailableReason = resource?.unavailableReason;
        this.notifyParticipantChange = resource?.notifyParticipantChange;
        this.notifyReservationChange = resource?.notifyReservationChange;
        this.order = resource?.order;
        this.managers = resource?.resourceManagers;
        if (resource?.vehicleInfo) {
            this.typeInfo = resource.vehicleInfo;
        }
        else if (resource?.meetingRoomInfo) {
            this.typeInfo = resource.meetingRoomInfo;
        }
        else if (resource?.accommodationInfo) {
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
    (0, swagger_1.ApiProperty)({ required: false, type: [file_response_dto_1.FileResponseDto] }),
    __metadata("design:type", Array)
], ResourceResponseDto.prototype, "imageFiles", void 0);
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
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ResourceResponseDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        oneOf: [
            { $ref: (0, swagger_1.getSchemaPath)(vehicle_response_dto_1.VehicleInfoResponseDto) },
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
    (0, swagger_1.ApiProperty)({ required: false, type: [String] }),
    __metadata("design:type", Array)
], ResourceSelectResponseDto.prototype, "images", void 0);
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
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ResourceSelectResponseDto.prototype, "order", void 0);
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
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ResourceGroupResponseDto.prototype, "order", void 0);
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateResourceGroupOrdersDto = exports.NewOrderResourceGroupDto = exports.UpdateResourceOrdersDto = exports.NewOrderResourceDto = exports.ReturnVehicleDto = exports.UpdateResourceInfoDto = exports.UpdateResourceDto = exports.UpdateResourceGroupDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const create_resource_dto_1 = __webpack_require__(/*! ./create-resource.dto */ "./apps/resource/src/modules/resource/common/application/dtos/create-resource.dto.ts");
class UpdateResourceGroupDto {
}
exports.UpdateResourceGroupDto = UpdateResourceGroupDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 100),
    __metadata("design:type", String)
], UpdateResourceGroupDto.prototype, "title", void 0);
class UpdateResourceDto {
}
exports.UpdateResourceDto = UpdateResourceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateResourceDto.prototype, "resourceGroupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 100),
    __metadata("design:type", String)
], UpdateResourceDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 100),
    __metadata("design:type", String)
], UpdateResourceDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: 'object' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof create_resource_dto_1.ResourceLocation !== "undefined" && create_resource_dto_1.ResourceLocation) === "function" ? _a : Object)
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
], UpdateResourceDto.prototype, "isAvailable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 100),
    __metadata("design:type", String)
], UpdateResourceDto.prototype, "unavailableReason", void 0);
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
    __metadata("design:type", typeof (_b = typeof create_resource_dto_1.ResourceLocation !== "undefined" && create_resource_dto_1.ResourceLocation) === "function" ? _b : Object)
], ReturnVehicleDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minimum: 0, maximum: 999999999 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(999999999),
    __metadata("design:type", Number)
], ReturnVehicleDto.prototype, "leftMileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minimum: 0, maximum: 999999999 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(999999999),
    __metadata("design:type", Number)
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
class NewOrderResourceDto {
}
exports.NewOrderResourceDto = NewOrderResourceDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewOrderResourceDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], NewOrderResourceDto.prototype, "newOrder", void 0);
class UpdateResourceOrdersDto {
}
exports.UpdateResourceOrdersDto = UpdateResourceOrdersDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [NewOrderResourceDto] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateResourceOrdersDto.prototype, "orders", void 0);
class NewOrderResourceGroupDto {
}
exports.NewOrderResourceGroupDto = NewOrderResourceGroupDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewOrderResourceGroupDto.prototype, "resourceGroupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], NewOrderResourceGroupDto.prototype, "newOrder", void 0);
class UpdateResourceGroupOrdersDto {
}
exports.UpdateResourceGroupOrdersDto = UpdateResourceGroupOrdersDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [NewOrderResourceGroupDto] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateResourceGroupOrdersDto.prototype, "orders", void 0);


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceGroupService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const resource_group_repository_port_1 = __webpack_require__(/*! @resource/modules/resource/common/domain/ports/resource-group.repository.port */ "./apps/resource/src/modules/resource/common/domain/ports/resource-group.repository.port.ts");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let ResourceGroupService = class ResourceGroupService {
    constructor(resourceGroupRepository, dataSource) {
        this.resourceGroupRepository = resourceGroupRepository;
        this.dataSource = dataSource;
    }
    async save(resourceGroup, repositoryOptions) {
        return this.resourceGroupRepository.save(resourceGroup, repositoryOptions);
    }
    async findAll(repositoryOptions) {
        const resourceGroups = await this.resourceGroupRepository.find(repositoryOptions);
        return resourceGroups;
    }
    async findOne(repositoryOptions) {
        const resourceGroup = await this.resourceGroupRepository.findOne(repositoryOptions);
        return resourceGroup;
    }
    async update(resourceGroupId, resourceGroup, repositoryOptions) {
        return this.resourceGroupRepository.update(resourceGroupId, resourceGroup, repositoryOptions);
    }
    async delete(resourceGroupId, repositoryOptions) {
        return this.resourceGroupRepository.delete(resourceGroupId, repositoryOptions);
    }
};
exports.ResourceGroupService = ResourceGroupService;
exports.ResourceGroupService = ResourceGroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ResourceGroupRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_group_repository_port_1.ResourceGroupRepositoryPort !== "undefined" && resource_group_repository_port_1.ResourceGroupRepositoryPort) === "function" ? _a : Object, typeof (_b = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _b : Object])
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
    async findAll(repositoryOptions) {
        return this.resourceManagerRepository.find(repositoryOptions);
    }
    async updateManagers(resourceId, newManagerIds, repositoryOptions) {
        const currentManagers = await this.findAll({
            where: {
                resourceId: resourceId,
            },
        });
        const currentManagerIds = currentManagers.map((m) => m.employeeId);
        const managersToRemove = currentManagers.filter((manager) => !newManagerIds.includes(manager.employeeId));
        await Promise.all(managersToRemove.map((manager) => this.resourceManagerRepository.delete(manager.resourceManagerId, repositoryOptions)));
        const managersToAdd = newManagerIds.filter((employeeId) => !currentManagerIds.includes(employeeId));
        await Promise.all(managersToAdd.map((employeeId) => this.save({ resourceId, employeeId }, repositoryOptions)));
    }
    async remove(resourceManagerId, repositoryOptions) {
        await this.resourceManagerRepository.delete(resourceManagerId, repositoryOptions);
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
    async findAll(repositoryOptions) {
        const resources = await this.resourceRepository.find(repositoryOptions);
        return resources;
    }
    async update(resourceId, resource, repositoryOptions) {
        const updatedResource = await this.resourceRepository.update(resourceId, resource, repositoryOptions);
        return updatedResource;
    }
    async delete(resourceId) {
        await this.resourceRepository.delete(resourceId);
    }
    async softDelete(resourceId, repositoryOptions) {
        await this.resourceRepository.softDelete(resourceId, repositoryOptions);
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
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
let ResourceGroupUsecase = class ResourceGroupUsecase {
    constructor(resourceService, resourceGroupService, dataSource) {
        this.resourceService = resourceService;
        this.resourceGroupService = resourceGroupService;
        this.dataSource = dataSource;
    }
    async findParentResourceGroups() {
        const resourceGroups = await this.resourceGroupService.findAll({
            where: {
                parentResourceGroupId: (0, typeorm_1.IsNull)(),
            },
            order: {
                order: 'ASC',
            },
        });
        return resourceGroups;
    }
    async findResourceGroupsWithResourceData(type) {
        const resourceGroups = await this.resourceGroupService.findAll({
            where: {
                parentResourceGroupId: (0, typeorm_1.IsNull)(),
                ...(type && { type }),
            },
            relations: ['children'],
            order: {
                order: 'ASC',
            },
        });
        const resourceGroupsResponse = await Promise.all(resourceGroups.map(async (resourceGroup) => ({
            resourceGroupId: resourceGroup.resourceGroupId,
            ...resourceGroup,
            children: await Promise.all(resourceGroup.children.map(async (child) => ({
                resourceGroupId: child.resourceGroupId,
                ...child,
                resources: (await this.resourceService.findAll({
                    where: {
                        resourceGroupId: child.resourceGroupId,
                    },
                    order: {
                        order: 'ASC',
                    },
                })).map((resource) => ({
                    resourceId: resource.resourceId,
                    name: resource.name,
                    images: resource.images,
                    isAvailable: resource.isAvailable,
                    unavailableReason: resource.unavailableReason,
                    resourceGroupId: child.resourceGroupId,
                    order: resource.order,
                })),
            }))),
        })));
        return resourceGroupsResponse;
    }
    async createResourceGroup(createResourceGroupDto) {
        const resourceGroups = await this.resourceGroupService.findAll({
            where: {
                parentResourceGroupId: createResourceGroupDto.parentResourceGroupId,
            },
        });
        const resourceGroupOrder = resourceGroups.length;
        const resourceGroup = await this.resourceGroupService.save({
            ...createResourceGroupDto,
            order: resourceGroupOrder,
        });
        return resourceGroup;
    }
    async updateResourceGroup(resourceGroupId, updateResourceGroupDto) {
        const resourceGroup = await this.resourceGroupService.update(resourceGroupId, updateResourceGroupDto);
        return resourceGroup;
    }
    async reorderResourceGroups(updateResourceGroupOrdersDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await Promise.all(updateResourceGroupOrdersDto.orders.map(async (order) => {
                await this.resourceGroupService.update(order.resourceGroupId, { order: order.newOrder }, { queryRunner });
            }));
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async deleteResourceGroup(resourceGroupId) {
        const resourceGroup = await this.resourceGroupService.findOne({
            where: {
                resourceGroupId: resourceGroupId,
            },
            relations: ['resources'],
        });
        if (!resourceGroup) {
            throw new common_1.NotFoundException('Resource group not found');
        }
        if (resourceGroup.resources.length > 0) {
            throw new common_1.BadRequestException('Resource group has resources');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.resourceGroupService.delete(resourceGroupId, { queryRunner });
            const siblings = await this.resourceGroupService.findAll({
                where: {
                    resourceGroupId: (0, typeorm_1.Not)(resourceGroupId),
                    parentResourceGroupId: resourceGroup.parentResourceGroupId,
                },
                order: {
                    order: 'ASC',
                },
            });
            for (let i = 0; i < siblings.length; i++) {
                await this.resourceGroupService.update(siblings[i].resourceGroupId, { order: i }, { queryRunner });
            }
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.ResourceGroupUsecase = ResourceGroupUsecase;
exports.ResourceGroupUsecase = ResourceGroupUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_service_1.ResourceService !== "undefined" && resource_service_1.ResourceService) === "function" ? _a : Object, typeof (_b = typeof resource_group_service_1.ResourceGroupService !== "undefined" && resource_group_service_1.ResourceGroupService) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _c : Object])
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceUsecase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const resource_response_dto_1 = __webpack_require__(/*! ../dtos/resource-response.dto */ "./apps/resource/src/modules/resource/common/application/dtos/resource-response.dto.ts");
const resource_service_1 = __webpack_require__(/*! ../services/resource.service */ "./apps/resource/src/modules/resource/common/application/services/resource.service.ts");
const resource_group_service_1 = __webpack_require__(/*! ../services/resource-group.service */ "./apps/resource/src/modules/resource/common/application/services/resource-group.service.ts");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const resource_type_enum_1 = __webpack_require__(/*! @libs/enums/resource-type.enum */ "./libs/enums/resource-type.enum.ts");
const vehicle_info_service_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/application/services/vehicle-info.service */ "./apps/resource/src/modules/resource/vehicle/application/services/vehicle-info.service.ts");
const resource_manager_service_1 = __webpack_require__(/*! ../services/resource-manager.service */ "./apps/resource/src/modules/resource/common/application/services/resource-manager.service.ts");
const role_type_enum_1 = __webpack_require__(/*! @libs/enums/role-type.enum */ "./libs/enums/role-type.enum.ts");
const vehicle_info_usecase_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/application/usecases/vehicle-info.usecase */ "./apps/resource/src/modules/resource/vehicle/application/usecases/vehicle-info.usecase.ts");
const reservation_type_enum_1 = __webpack_require__(/*! @libs/enums/reservation-type.enum */ "./libs/enums/reservation-type.enum.ts");
const file_service_1 = __webpack_require__(/*! @resource/modules/file/application/services/file.service */ "./apps/resource/src/modules/file/application/services/file.service.ts");
const event_emitter_1 = __webpack_require__(/*! @nestjs/event-emitter */ "@nestjs/event-emitter");
const date_util_1 = __webpack_require__(/*! @libs/utils/date.util */ "./libs/utils/date.util.ts");
const notification_type_enum_1 = __webpack_require__(/*! @libs/enums/notification-type.enum */ "./libs/enums/notification-type.enum.ts");
const maintenance_service_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/application/services/maintenance.service */ "./apps/resource/src/modules/resource/vehicle/application/services/maintenance.service.ts");
let ResourceUsecase = class ResourceUsecase {
    constructor(resourceService, resourceManagerService, resourceGroupService, vehicleInfoService, vehicleInfoUsecase, maintenanceService, dataSource, fileService, typeHandlers, eventEmitter) {
        this.resourceService = resourceService;
        this.resourceManagerService = resourceManagerService;
        this.resourceGroupService = resourceGroupService;
        this.vehicleInfoService = vehicleInfoService;
        this.vehicleInfoUsecase = vehicleInfoUsecase;
        this.maintenanceService = maintenanceService;
        this.dataSource = dataSource;
        this.fileService = fileService;
        this.typeHandlers = typeHandlers;
        this.eventEmitter = eventEmitter;
    }
    async findResources(type) {
        let relations = [];
        if (type === resource_type_enum_1.ResourceType.VEHICLE) {
            relations = ['vehicleInfo', 'vehicleInfo.consumables'];
        }
        else if (type === resource_type_enum_1.ResourceType.MEETING_ROOM) {
            relations = ['meetingRoomInfo'];
        }
        else if (type === resource_type_enum_1.ResourceType.ACCOMMODATION) {
            relations = ['accommodationInfo'];
        }
        const resources = await this.resourceService.findAll({
            where: {
                type: type,
            },
            relations: relations,
        });
        return resources.map((resource) => new resource_response_dto_1.ResourceResponseDto(resource));
    }
    async findResourcesByTypeAndDateWithReservations(type, startDate, endDate, user) {
        if (!!startDate && !!endDate && startDate > endDate) {
            throw new common_1.BadRequestException('Start date must be before end date');
        }
        const regex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
        const startDateObj = regex.test(startDate)
            ? date_util_1.DateUtil.date(startDate).toDate()
            : date_util_1.DateUtil.date(startDate + ' 00:00:00').toDate();
        const endDateObj = regex.test(endDate)
            ? date_util_1.DateUtil.date(endDate).toDate()
            : date_util_1.DateUtil.date(endDate + ' 23:59:59').toDate();
        const resourceGroups = await this.resourceGroupService.findAll({
            where: {
                type: type,
                parentResourceGroupId: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()),
            },
            order: {
                order: 'ASC',
            },
        });
        const resourceGroupsWithResources = await Promise.all(resourceGroups.map(async (resourceGroup) => {
            const resources = await this.resourceService.findAll({
                where: {
                    resourceGroupId: resourceGroup.resourceGroupId,
                },
                order: {
                    order: 'ASC',
                },
            });
            const resourcesWithReservations = await Promise.all(resources.map(async (resource) => {
                const where = {
                    resourceId: resource.resourceId,
                    status: (0, typeorm_1.In)([reservation_type_enum_1.ReservationStatus.CONFIRMED, reservation_type_enum_1.ReservationStatus.CLOSED]),
                };
                const whereArray = [
                    {
                        ...where,
                        startDate: (0, typeorm_1.MoreThanOrEqual)(startDateObj),
                        endDate: (0, typeorm_1.LessThanOrEqual)(endDateObj),
                    },
                    {
                        ...where,
                        startDate: (0, typeorm_1.Between)(startDateObj, endDateObj),
                    },
                    {
                        ...where,
                        endDate: (0, typeorm_1.Between)(startDateObj, endDateObj),
                    },
                ];
                const [reservations] = await this.eventEmitter.emitAsync('find.reservation', {
                    repositoryOptions: {
                        where: whereArray,
                        relations: ['participants'],
                        order: {
                            startDate: 'ASC',
                        },
                    },
                });
                const reservationResponseDtos = reservations.map((reservation) => {
                    const isMine = reservation.participants.some((participant) => participant.employeeId === user.employeeId);
                    delete reservation.participants;
                    return {
                        ...reservation,
                        startDate: date_util_1.DateUtil.date(reservation.startDate).format(),
                        endDate: date_util_1.DateUtil.date(reservation.endDate).format(),
                        isMine: isMine,
                    };
                });
                return {
                    ...resource,
                    resourceId: resource.resourceId,
                    reservations: reservationResponseDtos,
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
                'vehicleInfo.consumables',
                'meetingRoomInfo',
                'accommodationInfo',
                'resourceManagers',
                'resourceManagers.employee',
            ],
        });
        if (!resource) {
            throw new common_1.NotFoundException('Resource not found');
        }
        resource['imageFiles'] = await this.fileService.findAllFilesByFilePath(resource.images);
        if (resource.vehicleInfo) {
            if (resource.vehicleInfo.consumables) {
                const mileage = Number(resource.vehicleInfo.totalMileage);
                for (const consumable of resource.vehicleInfo.consumables) {
                    const replaceCycle = Number(consumable.replaceCycle);
                    const latestMaintenance = await this.maintenanceService.findOne({
                        where: { consumableId: consumable.consumableId },
                        order: { date: 'DESC' },
                    });
                    consumable.maintenances = [latestMaintenance].map((maintenance) => {
                        return {
                            ...maintenance,
                            mileageFromLastMaintenance: mileage - Number(maintenance.mileage),
                            maintanceRequired: mileage - Number(maintenance.mileage) > replaceCycle,
                        };
                    });
                }
                resource.vehicleInfo.consumables.sort((a, b) => {
                    return (a.maintenances[0]['mileageFromLastMaintenance'] -
                        b.maintenances[0]['mileageFromLastMaintenance']);
                });
            }
            resource.vehicleInfo['parkingLocationFiles'] = await this.fileService.findAllFilesByFilePath(resource.vehicleInfo.parkingLocationImages);
            resource.vehicleInfo['odometerFiles'] = await this.fileService.findAllFilesByFilePath(resource.vehicleInfo.odometerImages);
        }
        return resource;
    }
    async returnVehicle(user, resourceId, updateDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const resource = await this.resourceService.findOne({
            where: { resourceId: resourceId },
            relations: ['vehicleInfo', 'resourceManagers'],
        });
        if (!resource) {
            throw new common_1.NotFoundException('Resource not found');
        }
        const vehicleInfo = await this.vehicleInfoService.findOne({
            where: { vehicleInfoId: resource.vehicleInfo.vehicleInfoId },
        });
        if (!vehicleInfo) {
            throw new common_1.NotFoundException('Vehicle info not found');
        }
        try {
            await this.resourceService.update(resourceId, { location: updateDto.location }, { queryRunner });
            await this.vehicleInfoUsecase.updateVehicleInfo(vehicleInfo.vehicleInfoId, {
                leftMileage: updateDto.leftMileage,
                totalMileage: updateDto.totalMileage,
                parkingLocationImages: updateDto.parkingLocationImages,
                odometerImages: updateDto.odometerImages,
            }, { queryRunner });
            const notiTarget = [...resource.resourceManagers.map((manager) => manager.employeeId), user.employeeId];
            this.eventEmitter.emit('create.notification', {
                notificationType: notification_type_enum_1.NotificationType.RESOURCE_VEHICLE_RETURNED,
                notificationData: {
                    resourceId: resource.resourceId,
                    resourceName: resource.name,
                    resourceType: resource.type,
                },
                notiTarget,
            });
            await queryRunner.commitTransaction();
            return true;
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
        const group = await this.resourceGroupService.findOne({
            where: { resourceGroupId: resource.resourceGroupId },
        });
        if (!group) {
            throw new common_1.NotFoundException('Resource group not found');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const resources = await this.resourceService.findAll({
                where: {
                    resourceGroupId: group.resourceGroupId,
                },
            });
            const resourceOrder = resources.length;
            const savedResource = await this.resourceService.save({ ...resource, order: resourceOrder }, {
                queryRunner,
            });
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
                ...managers.map((manager) => this.eventEmitter.emit('add.user.role', {
                    employeeId: manager.employeeId,
                    role: role_type_enum_1.Role.RESOURCE_ADMIN,
                    repositoryOptions: { queryRunner },
                })),
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
    async updateResource(resourceId, updateRequest) {
        const resource = await this.resourceService.findOne({
            where: {
                resourceId: resourceId,
            },
            relations: ['resourceGroup'],
        });
        if (!resource) {
            throw new common_1.NotFoundException('Resource not found');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if (updateRequest.resource) {
                await this.resourceService.update(resourceId, updateRequest.resource, { queryRunner });
            }
            if (updateRequest.managers) {
                const currentManagers = await this.resourceManagerService.findAll({
                    where: {
                        resourceId: resourceId,
                    },
                });
                const currentManagerIds = currentManagers.map((m) => m.employeeId);
                const newManagerIds = updateRequest.managers.map((m) => m.employeeId);
                const removedManagerIds = currentManagerIds.filter((id) => !newManagerIds.includes(id));
                await Promise.all(removedManagerIds.map(async (employeeId) => {
                    const otherResources = await this.resourceManagerService.findAll({
                        where: {
                            employeeId: employeeId,
                        },
                    });
                    if (otherResources.length === 1) {
                        await this.eventEmitter.emit('remove.user.role', {
                            employeeId: employeeId,
                            role: role_type_enum_1.Role.RESOURCE_ADMIN,
                            repositoryOptions: { queryRunner },
                        });
                    }
                }));
                const addedManagerIds = newManagerIds.filter((id) => !currentManagerIds.includes(id));
                await Promise.all(addedManagerIds.map((employeeId) => this.eventEmitter.emit('add.user.role', {
                    employeeId: employeeId,
                    role: role_type_enum_1.Role.RESOURCE_ADMIN,
                    repositoryOptions: { queryRunner },
                })));
                await this.resourceManagerService.updateManagers(resourceId, newManagerIds, { queryRunner });
            }
            await queryRunner.commitTransaction();
            return this.findResourceDetail(resourceId);
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw new common_1.InternalServerErrorException('Failed to update resource');
        }
        finally {
            await queryRunner.release();
        }
    }
    async reorderResources(updateResourceOrdersDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await Promise.all(updateResourceOrdersDto.orders.map(async (order) => {
                await this.resourceService.update(order.resourceId, { order: order.newOrder }, { queryRunner });
            }));
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw new common_1.InternalServerErrorException('Failed to reorder resources');
        }
        finally {
            await queryRunner.release();
        }
    }
    async deleteResource(resourceId) {
        const resource = await this.resourceService.findOne({
            where: {
                resourceId: resourceId,
            },
            relations: ['resourceGroup', 'resourceManagers'],
        });
        if (!resource) {
            throw new common_1.NotFoundException('Resource not found');
        }
        if (resource.isAvailable) {
            throw new common_1.BadRequestException('Resource is available');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.resourceService.update(resourceId, { resourceGroupId: null }, { queryRunner });
            for (const manager of resource.resourceManagers) {
                await this.resourceManagerService.remove(manager.resourceManagerId, { queryRunner });
            }
            await this.resourceService.softDelete(resourceId, { queryRunner });
            const resources = await this.resourceService.findAll({
                where: {
                    resourceId: (0, typeorm_1.Not)(resourceId),
                    resourceGroupId: resource.resourceGroupId,
                    deletedAt: (0, typeorm_1.IsNull)(),
                },
                order: {
                    order: 'ASC',
                },
            });
            for (let i = 0; i < resources.length; i++) {
                await this.resourceService.update(resources[i].resourceId, { order: i }, { queryRunner });
            }
            await queryRunner.commitTransaction();
        }
        catch (err) {
            console.error(err);
            await queryRunner.rollbackTransaction();
            throw new common_1.InternalServerErrorException('Failed to delete resource');
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.ResourceUsecase = ResourceUsecase;
exports.ResourceUsecase = ResourceUsecase = __decorate([
    (0, common_1.Injectable)(),
    __param(8, (0, common_1.Inject)('ResourceTypeHandlers')),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_service_1.ResourceService !== "undefined" && resource_service_1.ResourceService) === "function" ? _a : Object, typeof (_b = typeof resource_manager_service_1.ResourceManagerService !== "undefined" && resource_manager_service_1.ResourceManagerService) === "function" ? _b : Object, typeof (_c = typeof resource_group_service_1.ResourceGroupService !== "undefined" && resource_group_service_1.ResourceGroupService) === "function" ? _c : Object, typeof (_d = typeof vehicle_info_service_1.VehicleInfoService !== "undefined" && vehicle_info_service_1.VehicleInfoService) === "function" ? _d : Object, typeof (_e = typeof vehicle_info_usecase_1.VehicleInfoUsecase !== "undefined" && vehicle_info_usecase_1.VehicleInfoUsecase) === "function" ? _e : Object, typeof (_f = typeof maintenance_service_1.MaintenanceService !== "undefined" && maintenance_service_1.MaintenanceService) === "function" ? _f : Object, typeof (_g = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _g : Object, typeof (_h = typeof file_service_1.FileService !== "undefined" && file_service_1.FileService) === "function" ? _h : Object, typeof (_j = typeof Map !== "undefined" && Map) === "function" ? _j : Object, typeof (_k = typeof event_emitter_1.EventEmitter2 !== "undefined" && event_emitter_1.EventEmitter2) === "function" ? _k : Object])
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
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
const resource_type_enum_1 = __webpack_require__(/*! @libs/enums/resource-type.enum */ "./libs/enums/resource-type.enum.ts");
const update_resource_dto_2 = __webpack_require__(/*! @resource/modules/resource/common/application/dtos/update-resource.dto */ "./apps/resource/src/modules/resource/common/application/dtos/update-resource.dto.ts");
let ResourceGroupController = class ResourceGroupController {
    constructor(resourceGroupUsecase) {
        this.resourceGroupUsecase = resourceGroupUsecase;
    }
    async findParentResourceGroups() {
        return this.resourceGroupUsecase.findParentResourceGroups();
    }
    async findAll(type) {
        return this.resourceGroupUsecase.findResourceGroupsWithResourceData(type);
    }
    async create(createResourceGroupDto) {
        return this.resourceGroupUsecase.createResourceGroup(createResourceGroupDto);
    }
    async updateOrder(updateResourceGroupOrdersDto) {
        return this.resourceGroupUsecase.reorderResourceGroups(updateResourceGroupOrdersDto);
    }
    async update(resourceGroupId, updateResourceGroupDto) {
        return this.resourceGroupUsecase.updateResourceGroup(resourceGroupId, updateResourceGroupDto);
    }
    async remove(resourceGroupId) {
        return this.resourceGroupUsecase.deleteResourceGroup(resourceGroupId);
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
    (0, swagger_1.ApiTags)('sprint0.1', 'sprint0.3'),
    (0, common_1.Get)('resources'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: '상위그룹-하위그룹-자원 목록 조회 #사용자/자원선택/모달 #관리자/자원관리/자원목록' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '자원 그룹들과 각 그룹에 속한 자원 목록을 조회했습니다.',
        type: [resource_response_dto_1.ResourceGroupWithResourcesResponseDto],
    }),
    (0, swagger_1.ApiQuery)({ name: 'type', enum: resource_type_enum_1.ResourceType, required: false }),
    __param(0, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ResourceGroupController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Post)(),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: '자원 그룹 생성' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 201,
        description: '자원 그룹이 생성되었습니다.',
        type: resource_response_dto_1.ResourceGroupResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof create_resource_dto_1.CreateResourceGroupDto !== "undefined" && create_resource_dto_1.CreateResourceGroupDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ResourceGroupController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Patch)('order'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: '자원 그룹 순서 변경' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '자원 그룹 순서가 성공적으로 변경되었습니다.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof update_resource_dto_2.UpdateResourceGroupOrdersDto !== "undefined" && update_resource_dto_2.UpdateResourceGroupOrdersDto) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], ResourceGroupController.prototype, "updateOrder", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Patch)(':resourceGroupId'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: '자원 그룹 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '자원 그룹이 수정되었습니다.',
        type: resource_response_dto_1.ResourceGroupResponseDto,
    }),
    __param(0, (0, common_1.Param)('resourceGroupId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_h = typeof update_resource_dto_1.UpdateResourceGroupDto !== "undefined" && update_resource_dto_1.UpdateResourceGroupDto) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], ResourceGroupController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Delete)(':resourceGroupId'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: '자원 그룹 삭제' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '자원 그룹이 삭제되었습니다.',
    }),
    __param(0, (0, common_1.Param)('resourceGroupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
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
const user_decorator_1 = __webpack_require__(/*! @libs/decorators/user.decorator */ "./libs/decorators/user.decorator.ts");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
let ResourceController = class ResourceController {
    constructor(resourceUsecase) {
        this.resourceUsecase = resourceUsecase;
    }
    async findAll(type) {
        return this.resourceUsecase.findResources(type);
    }
    async findResourcesByTypeAndDateWithReservations(user, type, startDate, endDate) {
        return this.resourceUsecase.findResourcesByTypeAndDateWithReservations(type, startDate, endDate, user);
    }
    async returnVehicle(user, resourceId, returnDto) {
        return this.resourceUsecase.returnVehicle(user, resourceId, returnDto);
    }
    async createWithInfos(createResourceInfo) {
        return this.resourceUsecase.createResourceWithInfos(createResourceInfo);
    }
    async findOne(resourceId) {
        return this.resourceUsecase.findResourceDetail(resourceId);
    }
    async reorder(updateResourceOrdersDto) {
        return this.resourceUsecase.reorderResources(updateResourceOrdersDto);
    }
    async update(resourceId, updateResourceInfoDto) {
        return this.resourceUsecase.updateResource(resourceId, updateResourceInfoDto);
    }
    async remove(resourceId) {
        return this.resourceUsecase.deleteResource(resourceId);
    }
};
exports.ResourceController = ResourceController;
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '자원 목록 조회 #관리자/자원관리/자원리스트' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '자원 목록을 성공적으로 조회했습니다.',
        type: [dtos_index_1.ResourceResponseDto],
    }),
    (0, swagger_1.ApiQuery)({ name: 'type', enum: resource_type_enum_1.ResourceType }),
    __param(0, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ResourceController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Get)('reservations'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: '자원 별 예약 목록 조회 #사용자/자원예약/리스트 #사용자/세부예약내역' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '자원 목록을 성공적으로 조회했습니다.',
        type: [resource_response_dto_1.ResourceGroupWithResourcesAndReservationsResponseDto],
    }),
    (0, swagger_1.ApiQuery)({ name: 'type', enum: resource_type_enum_1.ResourceType }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', example: '2025-01-01 or 2025-01-01 00:00:00' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', example: '2025-01-01 or 2025-01-01 00:00:00' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('startDate')),
    __param(3, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _d : Object, typeof (_e = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _e : Object, String, String]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ResourceController.prototype, "findResourcesByTypeAndDateWithReservations", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Patch)(':resourceId/return-vehicle'),
    (0, swagger_1.ApiOperation)({ summary: '차량 반납 #사용자/자원예약/차량반납' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '차량 반납 성공',
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('resourceId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _g : Object, String, typeof (_h = typeof update_resource_dto_1.ReturnVehicleDto !== "undefined" && update_resource_dto_1.ReturnVehicleDto) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
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
    __metadata("design:paramtypes", [typeof (_k = typeof dtos_index_1.CreateResourceInfoDto !== "undefined" && dtos_index_1.CreateResourceInfoDto) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
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
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], ResourceController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Patch)('order'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: '자원 순서 변경' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '자원 순서가 성공적으로 변경되었습니다.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof update_resource_dto_1.UpdateResourceOrdersDto !== "undefined" && update_resource_dto_1.UpdateResourceOrdersDto) === "function" ? _o : Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], ResourceController.prototype, "reorder", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Patch)(':resourceId'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: '자원 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '자원이 성공적으로 수정되었습니다.',
        type: dtos_index_1.ResourceResponseDto,
    }),
    __param(0, (0, common_1.Param)('resourceId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_q = typeof dtos_index_1.UpdateResourceInfoDto !== "undefined" && dtos_index_1.UpdateResourceInfoDto) === "function" ? _q : Object]),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], ResourceController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Delete)(':resourceId'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: '자원 삭제' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '자원이 성공적으로 삭제되었습니다.',
    }),
    __param(0, (0, common_1.Param)('resourceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
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
        return repository.findOne({ where: repositoryOptions?.where, relations: repositoryOptions?.relations });
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
    async softDelete(id, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Resource)
            : this.repository;
        await repository.softDelete({ resourceId: id });
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
const resource_group_usecase_1 = __webpack_require__(/*! ./common/application/usecases/resource-group.usecase */ "./apps/resource/src/modules/resource/common/application/usecases/resource-group.usecase.ts");
const resource_usecase_1 = __webpack_require__(/*! ./common/application/usecases/resource.usecase */ "./apps/resource/src/modules/resource/common/application/usecases/resource.usecase.ts");
const file_module_1 = __webpack_require__(/*! ../file/file.module */ "./apps/resource/src/modules/file/file.module.ts");
let ResourceModule = class ResourceModule {
};
exports.ResourceModule = ResourceModule;
exports.ResourceModule = ResourceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.Resource, entities_1.ResourceGroup, entities_1.ResourceManager]),
            vehicle_resource_module_1.VehicleResourceModule,
            meeting_room_resource_module_1.MeetingRoomResourceModule,
            accommodation_resource_module_1.AccommodationResourceModule,
            file_module_1.FileModule,
        ],
        providers: [
            resource_service_1.ResourceService,
            resource_group_service_1.ResourceGroupService,
            resource_manager_service_1.ResourceManagerService,
            {
                provide: 'ResourceRepositoryPort',
                useClass: resource_repository_1.ResourceRepository,
            },
            {
                provide: 'ResourceGroupRepositoryPort',
                useClass: resource_group_repository_1.ResourceGroupRepository,
            },
            {
                provide: 'ResourceManagerRepositoryPort',
                useClass: resource_manager_repository_1.ResourceManagerRepository,
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
exports.CreateMaintenanceDto = exports.CreateConsumableDto = exports.CreateVehicleInfoDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateVehicleInfoDto {
}
exports.CreateVehicleInfoDto = CreateVehicleInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 100),
    __metadata("design:type", String)
], CreateVehicleInfoDto.prototype, "vehicleNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(999999999),
    __metadata("design:type", Number)
], CreateVehicleInfoDto.prototype, "leftMileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(999999999),
    __metadata("design:type", Number)
], CreateVehicleInfoDto.prototype, "totalMileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 100),
    __metadata("design:type", String)
], CreateVehicleInfoDto.prototype, "insuranceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 100),
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
class CreateConsumableDto {
}
exports.CreateConsumableDto = CreateConsumableDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소모품 이름' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 100),
    __metadata("design:type", String)
], CreateConsumableDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소모품 교체 주기' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(999999999),
    __metadata("design:type", Number)
], CreateConsumableDto.prototype, "replaceCycle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: true, description: '소모품 교체 알림 주기' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateConsumableDto.prototype, "notifyReplacementCycle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '차량 ID',
        example: 'vehicle-123',
    }),
    __metadata("design:type", String)
], CreateConsumableDto.prototype, "vehicleInfoId", void 0);
class CreateMaintenanceDto {
}
exports.CreateMaintenanceDto = CreateMaintenanceDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.Matches)(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, {
        message: '날짜 형식이 올바르지 않습니다. YYYY-MM-DD 형식이어야 합니다.',
    }),
    __metadata("design:type", String)
], CreateMaintenanceDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(999999999),
    __metadata("design:type", Number)
], CreateMaintenanceDto.prototype, "mileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(999999999),
    __metadata("design:type", Number)
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
        example: 'consumable-123',
    }),
    __metadata("design:type", String)
], CreateMaintenanceDto.prototype, "consumableId", void 0);


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
exports.UpdateVehicleInfoDto = exports.UpdateConsumableDto = exports.UpdateMaintenanceDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateMaintenanceDto {
}
exports.UpdateMaintenanceDto = UpdateMaintenanceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.Matches)(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, {
        message: '날짜 형식이 올바르지 않습니다. YYYY-MM-DD 형식이어야 합니다.',
    }),
    __metadata("design:type", String)
], UpdateMaintenanceDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(999999999),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateMaintenanceDto.prototype, "mileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(999999999),
    __metadata("design:type", Number)
], UpdateMaintenanceDto.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateMaintenanceDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '소모품 ID',
        example: 'consumable-123',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMaintenanceDto.prototype, "consumableId", void 0);
class UpdateConsumableDto {
}
exports.UpdateConsumableDto = UpdateConsumableDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소모품 이름' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 100),
    __metadata("design:type", String)
], UpdateConsumableDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소모품 교체 주기' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(999999999),
    __metadata("design:type", Number)
], UpdateConsumableDto.prototype, "replaceCycle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: true, description: '소모품 교체 알림 주기' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateConsumableDto.prototype, "notifyReplacementCycle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '차량 ID',
        example: 'vehicle-123',
    }),
    __metadata("design:type", String)
], UpdateConsumableDto.prototype, "vehicleInfoId", void 0);
class UpdateVehicleInfoDto {
}
exports.UpdateVehicleInfoDto = UpdateVehicleInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVehicleInfoDto.prototype, "vehicleNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVehicleInfoDto.prototype, "insuranceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVehicleInfoDto.prototype, "insuranceNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(999999999),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateVehicleInfoDto.prototype, "totalMileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(999999999),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
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

/***/ "./apps/resource/src/modules/resource/vehicle/application/dtos/vehicle-response.dto.ts":
/*!*********************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/application/dtos/vehicle-response.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VehicleInfoResponseDto = exports.ConsumableResponseDto = exports.MaintenanceResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const file_response_dto_1 = __webpack_require__(/*! @resource/modules/file/application/dtos/file-response.dto */ "./apps/resource/src/modules/file/application/dtos/file-response.dto.ts");
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
], MaintenanceResponseDto.prototype, "consumableId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], MaintenanceResponseDto.prototype, "resourceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], MaintenanceResponseDto.prototype, "consumableName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MaintenanceResponseDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MaintenanceResponseDto.prototype, "mileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MaintenanceResponseDto.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], MaintenanceResponseDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], MaintenanceResponseDto.prototype, "mileageFromLastMaintenance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], MaintenanceResponseDto.prototype, "maintanceRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], MaintenanceResponseDto.prototype, "previousMileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], MaintenanceResponseDto.prototype, "isLatest", void 0);
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
], ConsumableResponseDto.prototype, "vehicleInfoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소모품 이름' }),
    __metadata("design:type", String)
], ConsumableResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소모품 교체 주기' }),
    __metadata("design:type", Number)
], ConsumableResponseDto.prototype, "replaceCycle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소모품 교체 알림 주기' }),
    __metadata("design:type", Boolean)
], ConsumableResponseDto.prototype, "notifyReplacementCycle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [MaintenanceResponseDto], required: false }),
    __metadata("design:type", Array)
], ConsumableResponseDto.prototype, "maintenances", void 0);
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
__decorate([
    (0, swagger_1.ApiProperty)({ type: [file_response_dto_1.FileResponseDto], required: false }),
    __metadata("design:type", Array)
], VehicleInfoResponseDto.prototype, "parkingLocationFiles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [file_response_dto_1.FileResponseDto], required: false }),
    __metadata("design:type", Array)
], VehicleInfoResponseDto.prototype, "odometerFiles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ConsumableResponseDto], required: false }),
    __metadata("design:type", Array)
], VehicleInfoResponseDto.prototype, "consumables", void 0);


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
        await this.vehicleInfoRepository.save({
            resourceId: resource.resourceId,
            ...typeInfo,
        }, repositoryOptions);
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
const role_type_enum_1 = __webpack_require__(/*! @libs/enums/role-type.enum */ "./libs/enums/role-type.enum.ts");
let ConsumableService = class ConsumableService {
    constructor(consumableRepository) {
        this.consumableRepository = consumableRepository;
    }
    async save(createConsumableDto, repositoryOptions) {
        return this.consumableRepository.save(createConsumableDto, repositoryOptions);
    }
    async findAll(repositoryOptions) {
        return this.consumableRepository.findAll(repositoryOptions);
    }
    async findOne(repositoryOptions) {
        return this.consumableRepository.findOne(repositoryOptions);
    }
    async update(id, updateData, repositoryOptions) {
        return this.consumableRepository.update(id, updateData, repositoryOptions);
    }
    async delete(id, repositoryOptions) {
        return this.consumableRepository.delete(id, repositoryOptions);
    }
    async checkRole(consumableId, user) {
        if (user.roles.includes(role_type_enum_1.Role.SYSTEM_ADMIN))
            return true;
        const consumable = await this.findOne({
            where: { consumableId },
            relations: ['vehicleInfo', 'vehicleInfo.resource', 'vehicleInfo.resource.resourceManagers'],
        });
        return consumable.vehicleInfo.resource.resourceManagers.some((manager) => manager.employeeId === user.employeeId);
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
const role_type_enum_1 = __webpack_require__(/*! @libs/enums/role-type.enum */ "./libs/enums/role-type.enum.ts");
let MaintenanceService = class MaintenanceService {
    constructor(maintenanceRepository) {
        this.maintenanceRepository = maintenanceRepository;
    }
    async save(createMaintenanceDto, repositoryOptions) {
        return this.maintenanceRepository.save(createMaintenanceDto, repositoryOptions);
    }
    async findAll(repositoryOptions) {
        return await this.maintenanceRepository.findAll(repositoryOptions);
    }
    async findOne(repositoryOptions) {
        return this.maintenanceRepository.findOne(repositoryOptions);
    }
    async update(id, updateMaintenanceDto, repositoryOptions) {
        return this.maintenanceRepository.update(id, updateMaintenanceDto, repositoryOptions);
    }
    async delete(id, repositoryOptions) {
        return this.maintenanceRepository.delete(id, repositoryOptions);
    }
    async count(repositoryOptions) {
        return this.maintenanceRepository.count(repositoryOptions);
    }
    async checkRole(maintenanceId, user) {
        if (user.roles.includes(role_type_enum_1.Role.SYSTEM_ADMIN))
            return true;
        const maintenance = await this.findOne({
            where: { maintenanceId },
            relations: [
                'consumable',
                'consumable.vehicleInfo',
                'consumable.vehicleInfo.resource',
                'consumable.vehicleInfo.resource.resourceManagers',
            ],
        });
        return maintenance.consumable.vehicleInfo.resource.resourceManagers.some((manager) => manager.employeeId === user.employeeId);
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
const role_type_enum_1 = __webpack_require__(/*! @libs/enums/role-type.enum */ "./libs/enums/role-type.enum.ts");
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
    async update(vehicleInfoId, updateData, repositoryOptions) {
        return this.vehicleInfoRepository.update(vehicleInfoId, updateData, repositoryOptions);
    }
    async checkRole(vehicleInfoId, user) {
        if (user.roles.includes(role_type_enum_1.Role.SYSTEM_ADMIN))
            return true;
        const vehicleInfo = await this.findOne({
            where: { vehicleInfoId },
            relations: ['resource', 'resource.resourceManagers'],
        });
        return vehicleInfo.resource.resourceManagers.some((manager) => manager.employeeId === user.employeeId);
    }
};
exports.VehicleInfoService = VehicleInfoService;
exports.VehicleInfoService = VehicleInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('VehicleInfoRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof vehicle_info_repository_port_1.VehicleInfoRepositoryPort !== "undefined" && vehicle_info_repository_port_1.VehicleInfoRepositoryPort) === "function" ? _a : Object])
], VehicleInfoService);


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/application/usecases/consumable.usecase.ts":
/*!***********************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/application/usecases/consumable.usecase.ts ***!
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
exports.ConsumableUsecase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const consumable_service_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/application/services/consumable.service */ "./apps/resource/src/modules/resource/vehicle/application/services/consumable.service.ts");
const role_type_enum_1 = __webpack_require__(/*! @libs/enums/role-type.enum */ "./libs/enums/role-type.enum.ts");
let ConsumableUsecase = class ConsumableUsecase {
    constructor(consumableService) {
        this.consumableService = consumableService;
    }
    async save(user, createConsumableDto, repositoryOptions) {
        const result = await this.checkRole(createConsumableDto.vehicleInfoId, user);
        if (!result)
            throw new common_1.ForbiddenException('권한이 없습니다.');
        return this.consumableService.save(createConsumableDto, repositoryOptions);
    }
    async findAll(user, repositoryOptions) {
        const result = await this.checkRole(repositoryOptions?.where.vehicleInfoId, user);
        if (!result)
            throw new common_1.ForbiddenException('권한이 없습니다.');
        return this.consumableService.findAll(repositoryOptions);
    }
    async findOne(user, repositoryOptions) {
        const result = await this.checkRole(repositoryOptions?.where.vehicleInfoId, user);
        if (!result)
            throw new common_1.ForbiddenException('권한이 없습니다.');
        return this.consumableService.findOne(repositoryOptions);
    }
    async update(user, id, updateData, repositoryOptions) {
        const result = await this.checkRole(repositoryOptions?.where.vehicleInfoId, user);
        if (!result)
            throw new common_1.ForbiddenException('권한이 없습니다.');
        return this.consumableService.update(id, updateData, repositoryOptions);
    }
    async delete(user, id, repositoryOptions) {
        const result = await this.checkRole(repositoryOptions?.where.vehicleInfoId, user);
        if (!result)
            throw new common_1.ForbiddenException('권한이 없습니다.');
        return await this.consumableService.delete(id, repositoryOptions);
    }
    async checkRole(vehicleInfoId, user) {
        if (user.roles.includes(role_type_enum_1.Role.SYSTEM_ADMIN))
            return true;
        const result = await this.consumableService.findOne({
            where: {
                vehicleInfoId: vehicleInfoId,
                vehicleInfo: {
                    resource: {
                        resourceManagers: {
                            employeeId: user.employeeId,
                        },
                    },
                },
            },
            relations: ['vehicleInfo', 'vehicleInfo.resource', 'vehicleInfo.resource.resourceManagers'],
        });
        return !!result;
    }
};
exports.ConsumableUsecase = ConsumableUsecase;
exports.ConsumableUsecase = ConsumableUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof consumable_service_1.ConsumableService !== "undefined" && consumable_service_1.ConsumableService) === "function" ? _a : Object])
], ConsumableUsecase);


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/application/usecases/maintenance.usecase.ts":
/*!************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/application/usecases/maintenance.usecase.ts ***!
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MaintenanceUsecase = void 0;
const vehicle_info_service_1 = __webpack_require__(/*! ../services/vehicle-info.service */ "./apps/resource/src/modules/resource/vehicle/application/services/vehicle-info.service.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const common_2 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const consumable_service_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/application/services/consumable.service */ "./apps/resource/src/modules/resource/vehicle/application/services/consumable.service.ts");
const maintenance_service_1 = __webpack_require__(/*! ../services/maintenance.service */ "./apps/resource/src/modules/resource/vehicle/application/services/maintenance.service.ts");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let MaintenanceUsecase = class MaintenanceUsecase {
    constructor(maintenanceService, consumableService, vehicleInfoService, dataSource) {
        this.maintenanceService = maintenanceService;
        this.consumableService = consumableService;
        this.vehicleInfoService = vehicleInfoService;
        this.dataSource = dataSource;
    }
    async save(user, createMaintenanceDto) {
        const result = await this.consumableService.checkRole(createMaintenanceDto.consumableId, user);
        if (!result)
            throw new common_1.ForbiddenException('권한이 없습니다.');
        const sameDateMaintenance = await this.maintenanceService.findOne({
            where: { consumableId: createMaintenanceDto.consumableId, date: createMaintenanceDto.date },
        });
        if (sameDateMaintenance) {
            throw new common_1.BadRequestException('동일한 날짜에 이미 정비 이력이 존재합니다.');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const maintenance = await this.maintenanceService.save(createMaintenanceDto, { queryRunner });
            if (createMaintenanceDto.mileage) {
                const consumable = await this.consumableService.findOne({
                    where: { consumableId: maintenance.consumableId },
                    relations: ['vehicleInfo'],
                });
                console.log(consumable);
                if (consumable.vehicleInfo.totalMileage < createMaintenanceDto.mileage) {
                    await this.vehicleInfoService.update(consumable.vehicleInfo.vehicleInfoId, {
                        totalMileage: createMaintenanceDto.mileage,
                    }, { queryRunner });
                }
            }
            await queryRunner.commitTransaction();
            return maintenance;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAllByVehicleInfoId(user, vehicleInfoId, page, limit) {
        const result = await this.vehicleInfoService.checkRole(vehicleInfoId, user);
        if (!result)
            throw new common_1.ForbiddenException('권한이 없습니다.');
        const vehicleInfo = await this.vehicleInfoService.findOne({
            where: { vehicleInfoId },
            relations: ['resource', 'consumables', 'consumables.maintenances'],
        });
        const options = {
            where: {
                maintenanceId: (0, typeorm_1.In)(vehicleInfo.consumables.flatMap((consumable) => consumable.maintenances.map((maintenance) => maintenance.maintenanceId))),
            },
        };
        const count = await this.maintenanceService.count(options);
        if (page && limit) {
            options.skip = (page - 1) * limit;
            options.take = limit;
        }
        options.relations = ['consumable'];
        options.order = { createdAt: 'DESC' };
        const maintenances = await this.maintenanceService.findAll(options);
        return {
            items: maintenances.map((maintenance, index, array) => ({
                maintenanceId: maintenance.maintenanceId,
                consumableId: maintenance.consumableId,
                date: maintenance.date,
                mileage: maintenance.mileage,
                cost: maintenance.cost,
                images: maintenance.images,
                consumableName: maintenance.consumable.name,
                resourceName: vehicleInfo.resource.name,
                previousMileage: index !== array.length - 1 ? array[index + 1].mileage : 0,
                isLatest: index === 0,
            })),
            meta: {
                total: count,
                page,
                limit,
                hasNext: page * limit < count,
            },
        };
    }
    async findAll(user, consumableId) {
        const result = await this.consumableService.checkRole(consumableId, user);
        if (!result)
            throw new common_1.ForbiddenException('권한이 없습니다.');
        return this.maintenanceService.findAll({
            where: { consumableId },
        });
    }
    async findOne(user, maintenanceId) {
        const result = await this.maintenanceService.checkRole(maintenanceId, user);
        if (!result)
            throw new common_1.ForbiddenException('권한이 없습니다.');
        const maintenance = await this.maintenanceService.findOne({
            where: { maintenanceId },
            relations: ['consumable', 'consumable.vehicleInfo', 'consumable.vehicleInfo.resource'],
        });
        const previousMaintenance = await this.maintenanceService.findOne({
            where: { consumableId: maintenance.consumableId, createdAt: (0, typeorm_1.LessThan)(maintenance.createdAt) },
            order: { createdAt: 'DESC' },
        });
        maintenance.createdAt.setTime(maintenance.createdAt.getTime() + 1);
        const nextMaintenance = await this.maintenanceService.findOne({
            where: { consumableId: maintenance.consumableId, createdAt: (0, typeorm_1.MoreThan)(maintenance.createdAt) },
            order: { createdAt: 'ASC' },
        });
        return {
            maintenanceId: maintenance.maintenanceId,
            consumableId: maintenance.consumableId,
            date: maintenance.date,
            mileage: maintenance.mileage,
            cost: maintenance.cost,
            images: maintenance.images,
            consumableName: maintenance.consumable.name,
            resourceName: maintenance.consumable.vehicleInfo.resource.name,
            previousMileage: previousMaintenance ? previousMaintenance.mileage : 0,
            isLatest: !nextMaintenance,
        };
    }
    async update(user, maintenanceId, updateMaintenanceDto, repositoryOptions) {
        const result = await this.maintenanceService.checkRole(maintenanceId, user);
        if (!result)
            throw new common_1.ForbiddenException('권한이 없습니다.');
        console.log('updateMaintenanceDto', updateMaintenanceDto);
        if (updateMaintenanceDto.date) {
            const sameDateMaintenance = await this.maintenanceService.findOne({
                where: {
                    maintenanceId: (0, typeorm_1.Not)(maintenanceId),
                    consumableId: updateMaintenanceDto.consumableId,
                    date: updateMaintenanceDto.date,
                },
            });
            if (sameDateMaintenance) {
                throw new common_1.BadRequestException('동일한 날짜에 이미 정비 이력이 존재합니다.');
            }
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const maintenance = await this.maintenanceService.update(maintenanceId, updateMaintenanceDto, {
                queryRunner,
                ...repositoryOptions,
            });
            if (updateMaintenanceDto.mileage) {
                const savedMaintenance = await this.maintenanceService.findOne({
                    where: { maintenanceId: maintenance.maintenanceId },
                    relations: ['consumable', 'consumable.vehicleInfo'],
                    order: { createdAt: 'DESC' },
                });
                if (savedMaintenance.consumable.vehicleInfo.totalMileage < updateMaintenanceDto.mileage) {
                    await this.vehicleInfoService.update(savedMaintenance.consumable.vehicleInfo.vehicleInfoId, {
                        totalMileage: updateMaintenanceDto.mileage,
                    }, { queryRunner });
                }
            }
            await queryRunner.commitTransaction();
            return await this.maintenanceService.findOne({
                where: {
                    maintenanceId: maintenanceId,
                },
            });
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async delete(user, maintenanceId, repositoryOptions) {
        const result = await this.maintenanceService.checkRole(maintenanceId, user);
        if (!result)
            throw new common_1.ForbiddenException('권한이 없습니다.');
        return await this.maintenanceService.delete(maintenanceId, repositoryOptions);
    }
};
exports.MaintenanceUsecase = MaintenanceUsecase;
exports.MaintenanceUsecase = MaintenanceUsecase = __decorate([
    (0, common_2.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof maintenance_service_1.MaintenanceService !== "undefined" && maintenance_service_1.MaintenanceService) === "function" ? _a : Object, typeof (_b = typeof consumable_service_1.ConsumableService !== "undefined" && consumable_service_1.ConsumableService) === "function" ? _b : Object, typeof (_c = typeof vehicle_info_service_1.VehicleInfoService !== "undefined" && vehicle_info_service_1.VehicleInfoService) === "function" ? _c : Object, typeof (_d = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _d : Object])
], MaintenanceUsecase);


/***/ }),

/***/ "./apps/resource/src/modules/resource/vehicle/application/usecases/vehicle-info.usecase.ts":
/*!*************************************************************************************************!*\
  !*** ./apps/resource/src/modules/resource/vehicle/application/usecases/vehicle-info.usecase.ts ***!
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VehicleInfoUsecase = void 0;
const vehicle_info_service_1 = __webpack_require__(/*! ../services/vehicle-info.service */ "./apps/resource/src/modules/resource/vehicle/application/services/vehicle-info.service.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const common_2 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const notification_type_enum_1 = __webpack_require__(/*! @libs/enums/notification-type.enum */ "./libs/enums/notification-type.enum.ts");
const event_emitter_1 = __webpack_require__(/*! @nestjs/event-emitter */ "@nestjs/event-emitter");
let VehicleInfoUsecase = class VehicleInfoUsecase {
    constructor(vehicleInfoService, eventEmitter) {
        this.vehicleInfoService = vehicleInfoService;
        this.eventEmitter = eventEmitter;
    }
    async findVehicleInfo(vehicleInfoId) {
        const vehicleInfo = await this.vehicleInfoService.findOne({
            where: {
                vehicleInfoId,
            },
        });
        if (!vehicleInfo) {
            throw new common_1.NotFoundException('Vehicle info not found');
        }
        return {
            vehicleInfoId: vehicleInfo.vehicleInfoId,
            resourceId: vehicleInfo.resourceId,
            totalMileage: Number(vehicleInfo.totalMileage),
            leftMileage: Number(vehicleInfo.leftMileage),
            insuranceName: vehicleInfo.insuranceName,
            insuranceNumber: vehicleInfo.insuranceNumber,
            parkingLocationImages: vehicleInfo.parkingLocationImages,
            odometerImages: vehicleInfo.odometerImages,
        };
    }
    async updateVehicleInfo(vehicleInfoId, updateVehicleInfoDto, repositoryOptions) {
        const previousVehicleInfo = await this.vehicleInfoService.findOne({
            where: {
                vehicleInfoId: vehicleInfoId,
            },
            relations: ['consumables'],
        });
        if (!previousVehicleInfo) {
            throw new common_1.NotFoundException('Vehicle info not found');
        }
        const previousTotalMileage = Number(previousVehicleInfo.totalMileage);
        const vehicleInfo = await this.vehicleInfoService.update(vehicleInfoId, updateVehicleInfoDto, repositoryOptions);
        const afterVehicleInfo = await this.vehicleInfoService.findOne({
            where: {
                vehicleInfoId: vehicleInfoId,
            },
            relations: ['consumables', 'resource', 'resource.resourceManagers'],
        });
        const afterTotalMileage = Number(afterVehicleInfo.totalMileage);
        const consumables = afterVehicleInfo.consumables;
        for (const consumable of consumables) {
            if (!consumable.notifyReplacementCycle)
                continue;
            const replaceCycle = Number(consumable.replaceCycle);
            const isReplace = Math.floor(afterTotalMileage / replaceCycle) > Math.floor(previousTotalMileage / replaceCycle);
            if (isReplace) {
                try {
                    const notiTarget = afterVehicleInfo.resource.resourceManagers.map((manager) => manager.employeeId);
                    await this.eventEmitter.emit('create.notification', {
                        notificationType: notification_type_enum_1.NotificationType.RESOURCE_CONSUMABLE_REPLACING,
                        notificationData: {
                            resourceId: afterVehicleInfo.resource.resourceId,
                            resourceName: afterVehicleInfo.resource.name,
                            resourceType: afterVehicleInfo.resource.type,
                            consumableName: consumable.name,
                        },
                        notiTarget,
                        repositoryOptions,
                    });
                }
                catch (error) {
                    console.log(error);
                    console.log('Notification creation failed in updateVehicleInfo');
                }
            }
        }
        return {
            vehicleInfoId: vehicleInfo.vehicleInfoId,
            resourceId: vehicleInfo.resourceId,
            totalMileage: Number(vehicleInfo.totalMileage),
            leftMileage: Number(vehicleInfo.leftMileage),
            insuranceName: vehicleInfo.insuranceName,
            insuranceNumber: vehicleInfo.insuranceNumber,
            parkingLocationImages: vehicleInfo.parkingLocationImages,
            odometerImages: vehicleInfo.odometerImages,
        };
    }
};
exports.VehicleInfoUsecase = VehicleInfoUsecase;
exports.VehicleInfoUsecase = VehicleInfoUsecase = __decorate([
    (0, common_2.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof vehicle_info_service_1.VehicleInfoService !== "undefined" && vehicle_info_service_1.VehicleInfoService) === "function" ? _a : Object, typeof (_b = typeof event_emitter_1.EventEmitter2 !== "undefined" && event_emitter_1.EventEmitter2) === "function" ? _b : Object])
], VehicleInfoUsecase);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConsumableController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const api_responses_decorator_1 = __webpack_require__(/*! @libs/decorators/api-responses.decorator */ "./libs/decorators/api-responses.decorator.ts");
const create_vehicle_info_dto_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/application/dtos/create-vehicle-info.dto */ "./apps/resource/src/modules/resource/vehicle/application/dtos/create-vehicle-info.dto.ts");
const update_vehicle_info_dto_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/application/dtos/update-vehicle-info.dto */ "./apps/resource/src/modules/resource/vehicle/application/dtos/update-vehicle-info.dto.ts");
const vehicle_response_dto_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/application/dtos/vehicle-response.dto */ "./apps/resource/src/modules/resource/vehicle/application/dtos/vehicle-response.dto.ts");
const consumable_usecase_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/application/usecases/consumable.usecase */ "./apps/resource/src/modules/resource/vehicle/application/usecases/consumable.usecase.ts");
const role_type_enum_1 = __webpack_require__(/*! @libs/enums/role-type.enum */ "./libs/enums/role-type.enum.ts");
const role_decorator_1 = __webpack_require__(/*! @libs/decorators/role.decorator */ "./libs/decorators/role.decorator.ts");
const user_decorator_1 = __webpack_require__(/*! @libs/decorators/user.decorator */ "./libs/decorators/user.decorator.ts");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
let ConsumableController = class ConsumableController {
    constructor(consumableUsecase) {
        this.consumableUsecase = consumableUsecase;
    }
    async create(user, createConsumableDto) {
        const consumable = await this.consumableUsecase.save(user, createConsumableDto);
        return consumable;
    }
    async findAll(user, vehicleInfoId) {
        const consumables = await this.consumableUsecase.findAll(user, {
            where: {
                vehicleInfoId: vehicleInfoId,
            },
        });
        return consumables.map((consumable) => ({
            consumableId: consumable.consumableId,
            vehicleInfoId: consumable.vehicleInfoId,
            name: consumable.name,
            replaceCycle: consumable.replaceCycle,
            notifyReplacementCycle: consumable.notifyReplacementCycle,
        }));
    }
    async findOne(user, consumableId) {
        const consumable = await this.consumableUsecase.findOne(user, {
            where: {
                consumableId: consumableId,
            },
            relations: ['maintenances'],
        });
        return {
            consumableId: consumable.consumableId,
            vehicleInfoId: consumable.vehicleInfoId,
            name: consumable.name,
            replaceCycle: consumable.replaceCycle,
            notifyReplacementCycle: consumable.notifyReplacementCycle,
            maintenances: consumable.maintenances.map((maintenance) => ({
                maintenanceId: maintenance.maintenanceId,
                consumableId: maintenance.consumableId,
                date: maintenance.date,
                mileage: maintenance.mileage,
                cost: maintenance.cost,
                images: maintenance.images,
            })),
        };
    }
    async update(consumableId, user, updateConsumableDto) {
        const consumable = await this.consumableUsecase.update(user, consumableId, updateConsumableDto);
        return {
            consumableId: consumable.consumableId,
            vehicleInfoId: consumable.vehicleInfoId,
            name: consumable.name,
            replaceCycle: consumable.replaceCycle,
            notifyReplacementCycle: consumable.notifyReplacementCycle,
        };
    }
    async remove(user, consumableId) {
        await this.consumableUsecase.delete(user, consumableId);
    }
};
exports.ConsumableController = ConsumableController;
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Post)(),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.RESOURCE_ADMIN, role_type_enum_1.Role.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: '소모품 등록' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 201,
        description: '소모품이 성공적으로 등록되었습니다.',
        type: vehicle_response_dto_1.ConsumableResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _b : Object, typeof (_c = typeof create_vehicle_info_dto_1.CreateConsumableDto !== "undefined" && create_vehicle_info_dto_1.CreateConsumableDto) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ConsumableController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Get)('vehicle/:vehicleInfoId'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.RESOURCE_ADMIN, role_type_enum_1.Role.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: '소모품 목록 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '소모품 목록을 성공적으로 조회했습니다.',
        type: [vehicle_response_dto_1.ConsumableResponseDto],
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('vehicleInfoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _e : Object, String]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ConsumableController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Get)(':consumableId'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.RESOURCE_ADMIN, role_type_enum_1.Role.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: '소모품 상세 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '소모품을 성공적으로 조회했습니다.',
        type: vehicle_response_dto_1.ConsumableResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('consumableId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _g : Object, String]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ConsumableController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Patch)(':consumableId'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.RESOURCE_ADMIN, role_type_enum_1.Role.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: '소모품 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '소모품이 성공적으로 수정되었습니다.',
        type: vehicle_response_dto_1.ConsumableResponseDto,
    }),
    __param(0, (0, common_1.Param)('consumableId')),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_j = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _j : Object, typeof (_k = typeof update_vehicle_info_dto_1.UpdateConsumableDto !== "undefined" && update_vehicle_info_dto_1.UpdateConsumableDto) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], ConsumableController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Delete)(':consumableId'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.RESOURCE_ADMIN, role_type_enum_1.Role.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: '소모품 삭제' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '소모품이 성공적으로 삭제되었습니다.',
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('consumableId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _m : Object, String]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], ConsumableController.prototype, "remove", null);
exports.ConsumableController = ConsumableController = __decorate([
    (0, swagger_1.ApiTags)('차량 소모품'),
    (0, common_1.Controller)('consumables'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [typeof (_a = typeof consumable_usecase_1.ConsumableUsecase !== "undefined" && consumable_usecase_1.ConsumableUsecase) === "function" ? _a : Object])
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MaintenanceController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const api_responses_decorator_1 = __webpack_require__(/*! @libs/decorators/api-responses.decorator */ "./libs/decorators/api-responses.decorator.ts");
const create_vehicle_info_dto_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/application/dtos/create-vehicle-info.dto */ "./apps/resource/src/modules/resource/vehicle/application/dtos/create-vehicle-info.dto.ts");
const update_vehicle_info_dto_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/application/dtos/update-vehicle-info.dto */ "./apps/resource/src/modules/resource/vehicle/application/dtos/update-vehicle-info.dto.ts");
const vehicle_response_dto_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/application/dtos/vehicle-response.dto */ "./apps/resource/src/modules/resource/vehicle/application/dtos/vehicle-response.dto.ts");
const maintenance_usecase_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/application/usecases/maintenance.usecase */ "./apps/resource/src/modules/resource/vehicle/application/usecases/maintenance.usecase.ts");
const user_decorator_1 = __webpack_require__(/*! @libs/decorators/user.decorator */ "./libs/decorators/user.decorator.ts");
const entities_1 = __webpack_require__(/*! @libs/entities */ "./libs/entities/index.ts");
const role_decorator_1 = __webpack_require__(/*! @libs/decorators/role.decorator */ "./libs/decorators/role.decorator.ts");
const role_type_enum_1 = __webpack_require__(/*! @libs/enums/role-type.enum */ "./libs/enums/role-type.enum.ts");
const paginate_query_dto_1 = __webpack_require__(/*! @libs/dtos/paginate-query.dto */ "./libs/dtos/paginate-query.dto.ts");
let MaintenanceController = class MaintenanceController {
    constructor(maintenanceUsecase) {
        this.maintenanceUsecase = maintenanceUsecase;
    }
    async create(user, createMaintenanceDto) {
        return this.maintenanceUsecase.save(user, createMaintenanceDto);
    }
    async findAll(user, vehicleInfoId, query) {
        const { page, limit } = query;
        return this.maintenanceUsecase.findAllByVehicleInfoId(user, vehicleInfoId, page, limit);
    }
    async findOne(user, maintenanceId) {
        return this.maintenanceUsecase.findOne(user, maintenanceId);
    }
    async update(maintenanceId, updateMaintenanceDto, user) {
        return this.maintenanceUsecase.update(user, maintenanceId, updateMaintenanceDto);
    }
    async remove(user, maintenanceId) {
        return this.maintenanceUsecase.delete(user, maintenanceId);
    }
};
exports.MaintenanceController = MaintenanceController;
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Post)(),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.RESOURCE_ADMIN, role_type_enum_1.Role.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: '정비 이력 생성' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 201,
        description: '정비 이력이 생성되었습니다.',
        type: vehicle_response_dto_1.MaintenanceResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _b : Object, typeof (_c = typeof create_vehicle_info_dto_1.CreateMaintenanceDto !== "undefined" && create_vehicle_info_dto_1.CreateMaintenanceDto) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], MaintenanceController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Get)('vehicle/:vehicleInfoId'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.RESOURCE_ADMIN, role_type_enum_1.Role.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: '정비 이력 목록 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '정비 이력 목록을 조회했습니다.',
        type: [vehicle_response_dto_1.MaintenanceResponseDto],
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', type: Number, required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: Number, required: false, example: 10 }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('vehicleInfoId')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _e : Object, String, typeof (_f = typeof paginate_query_dto_1.PaginationQueryDto !== "undefined" && paginate_query_dto_1.PaginationQueryDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], MaintenanceController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Get)(':maintenanceId'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.RESOURCE_ADMIN, role_type_enum_1.Role.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: '정비 상세 이력 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '정비 상세 이력을 조회했습니다.',
        type: vehicle_response_dto_1.MaintenanceResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('maintenanceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _h : Object, String]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], MaintenanceController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Patch)(':maintenanceId'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.RESOURCE_ADMIN, role_type_enum_1.Role.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: '정비 이력 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '정비 이력이 수정되었습니다.',
        type: vehicle_response_dto_1.MaintenanceResponseDto,
    }),
    __param(0, (0, common_1.Param)('maintenanceId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_k = typeof update_vehicle_info_dto_1.UpdateMaintenanceDto !== "undefined" && update_vehicle_info_dto_1.UpdateMaintenanceDto) === "function" ? _k : Object, typeof (_l = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _l : Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], MaintenanceController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Delete)(':maintenanceId'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.RESOURCE_ADMIN, role_type_enum_1.Role.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: '정비 이력 삭제' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '정비 이력이 삭제되었습니다.',
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('maintenanceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _o : Object, String]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], MaintenanceController.prototype, "remove", null);
exports.MaintenanceController = MaintenanceController = __decorate([
    (0, swagger_1.ApiTags)('정비 이력'),
    (0, common_1.Controller)('maintenances'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [typeof (_a = typeof maintenance_usecase_1.MaintenanceUsecase !== "undefined" && maintenance_usecase_1.MaintenanceUsecase) === "function" ? _a : Object])
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
const update_vehicle_info_dto_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/application/dtos/update-vehicle-info.dto */ "./apps/resource/src/modules/resource/vehicle/application/dtos/update-vehicle-info.dto.ts");
const vehicle_response_dto_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/application/dtos/vehicle-response.dto */ "./apps/resource/src/modules/resource/vehicle/application/dtos/vehicle-response.dto.ts");
const vehicle_info_usecase_1 = __webpack_require__(/*! @resource/modules/resource/vehicle/application/usecases/vehicle-info.usecase */ "./apps/resource/src/modules/resource/vehicle/application/usecases/vehicle-info.usecase.ts");
let VehicleInfoController = class VehicleInfoController {
    constructor(vehicleInfoUsecase) {
        this.vehicleInfoUsecase = vehicleInfoUsecase;
    }
    async findVehicleInfo(vehicleInfoId) {
        return this.vehicleInfoUsecase.findVehicleInfo(vehicleInfoId);
    }
    async update(vehicleInfoId, updateVehicleInfoDto) {
        return this.vehicleInfoUsecase.updateVehicleInfo(vehicleInfoId, updateVehicleInfoDto);
    }
};
exports.VehicleInfoController = VehicleInfoController;
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Get)(':vehicleInfoId'),
    (0, swagger_1.ApiOperation)({ summary: '차량 정보 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '차량 정보를 성공적으로 조회했습니다.',
        type: vehicle_response_dto_1.VehicleInfoResponseDto,
    }),
    __param(0, (0, common_1.Param)('vehicleInfoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], VehicleInfoController.prototype, "findVehicleInfo", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Patch)(':vehicleInfoId'),
    (0, swagger_1.ApiOperation)({ summary: '차량 정보 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '차량 정보가 성공적으로 수정되었습니다.',
        type: vehicle_response_dto_1.VehicleInfoResponseDto,
    }),
    __param(0, (0, common_1.Param)('vehicleInfoId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_vehicle_info_dto_1.UpdateVehicleInfoDto !== "undefined" && update_vehicle_info_dto_1.UpdateVehicleInfoDto) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], VehicleInfoController.prototype, "update", null);
exports.VehicleInfoController = VehicleInfoController = __decorate([
    (0, swagger_1.ApiTags)('차량 정보'),
    (0, common_1.Controller)('vehicle-info'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [typeof (_a = typeof vehicle_info_usecase_1.VehicleInfoUsecase !== "undefined" && vehicle_info_usecase_1.VehicleInfoUsecase) === "function" ? _a : Object])
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
    async save(createConsumableDto, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Consumable)
            : this.repository;
        const savedEntity = await repository.save(createConsumableDto);
        return savedEntity;
    }
    async findAll(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Consumable)
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
    async findOne(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Consumable)
            : this.repository;
        const entity = await repository.findOne({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
        });
        return entity ? entity : null;
    }
    async update(id, consumable, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Consumable)
            : this.repository;
        await repository.update({ consumableId: id }, consumable);
        const updated = await this.findOne({ where: { consumableId: id }, relations: repositoryOptions?.relations });
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
    async save(createMaintenanceDto, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Maintenance)
            : this.repository;
        const savedEntity = await repository.save(createMaintenanceDto);
        return savedEntity;
    }
    async findAll(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Maintenance)
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
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Maintenance)
            : this.repository;
        return repository.findOne({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            order: repositoryOptions?.order,
        });
    }
    async update(id, updateMaintenanceDto, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Maintenance)
            : this.repository;
        await repository.update({ maintenanceId: id }, updateMaintenanceDto);
        const updated = await this.findOne({ where: { maintenanceId: id }, relations: repositoryOptions?.relations });
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
    async count(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(entities_1.Maintenance)
            : this.repository;
        return repository.count({ where: repositoryOptions?.where });
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
        const entity = await repository.findOne({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
        });
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
const vehicle_info_usecase_1 = __webpack_require__(/*! ./application/usecases/vehicle-info.usecase */ "./apps/resource/src/modules/resource/vehicle/application/usecases/vehicle-info.usecase.ts");
const consumable_usecase_1 = __webpack_require__(/*! ./application/usecases/consumable.usecase */ "./apps/resource/src/modules/resource/vehicle/application/usecases/consumable.usecase.ts");
const maintenance_usecase_1 = __webpack_require__(/*! ./application/usecases/maintenance.usecase */ "./apps/resource/src/modules/resource/vehicle/application/usecases/maintenance.usecase.ts");
let VehicleResourceModule = class VehicleResourceModule {
};
exports.VehicleResourceModule = VehicleResourceModule;
exports.VehicleResourceModule = VehicleResourceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.VehicleInfo, entities_1.Consumable, entities_1.Maintenance])],
        providers: [
            vehicle_resource_handler_1.VehicleResourceHandler,
            vehicle_info_service_1.VehicleInfoService,
            consumable_service_1.ConsumableService,
            maintenance_service_1.MaintenanceService,
            vehicle_info_usecase_1.VehicleInfoUsecase,
            consumable_usecase_1.ConsumableUsecase,
            maintenance_usecase_1.MaintenanceUsecase,
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
        controllers: [vehicle_info_controller_1.VehicleInfoController, consumable_controller_1.ConsumableController, maintenance_controller_1.MaintenanceController],
        exports: [
            vehicle_resource_handler_1.VehicleResourceHandler,
            vehicle_info_service_1.VehicleInfoService,
            consumable_service_1.ConsumableService,
            maintenance_service_1.MaintenanceService,
            vehicle_info_usecase_1.VehicleInfoUsecase,
            consumable_usecase_1.ConsumableUsecase,
            maintenance_usecase_1.MaintenanceUsecase,
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
exports.FIREBASE_CONFIG = exports.APP_CONFIG = exports.WEB_PUSH_CONFIG = exports.JWT_CONFIG = exports.ENV = void 0;
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
        storage: {
            type: process.env.NODE_ENV,
        },
    };
});
exports.FIREBASE_CONFIG = (0, config_1.registerAs)('firebase', () => {
    return {
        type: process.env.FIREBASE_TYPE,
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        clientId: process.env.FIREBASE_CLIENT_ID,
        authUri: process.env.FIREBASE_AUTH_URI,
        tokenUri: process.env.FIREBASE_TOKEN_URI,
        authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
        universeDomain: process.env.FIREBASE_UNIVERSE_DOMAIN,
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
const typeOrmConfig = (configService) => {
    return {
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: entities_1.Entities,
        schema: 'public',
        migrationsRun: configService.get('database.port') === 6543,
        ssl: configService.get('database.port') === 6543,
        extra: {
            ssl: configService.get('database.port') === 6543 ? { rejectUnauthorized: false } : null,
        },
    };
};
exports.typeOrmConfig = typeOrmConfig;


/***/ }),

/***/ "./libs/decorators/api-responses.decorator.ts":
/*!****************************************************!*\
  !*** ./libs/decorators/api-responses.decorator.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiDataResponse = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const paginate_response_dto_1 = __webpack_require__(/*! ../dtos/paginate-response.dto */ "./libs/dtos/paginate-response.dto.ts");
const response_dto_1 = __webpack_require__(/*! ../dtos/response.dto */ "./libs/dtos/response.dto.ts");
const ApiCommonErrors = () => (0, common_1.applyDecorators)((0, swagger_1.ApiBadRequestResponse)({ description: '잘못된 요청입니다.', type: response_dto_1.ErrorResponseDto }), (0, swagger_1.ApiUnauthorizedResponse)({ description: '인증되지 않은 요청입니다.' }), (0, swagger_1.ApiForbiddenResponse)({ description: '권한이 없습니다.' }), (0, swagger_1.ApiNotFoundResponse)({ description: '리소스를 찾을 수 없습니다.' }), (0, swagger_1.ApiConflictResponse)({ description: '중복된 리소스입니다.' }), (0, swagger_1.ApiInternalServerErrorResponse)({ description: '서버 에러가 발생했습니다.' }));
const ApiDataResponse = (options) => {
    const schema = options.type
        ? {
            allOf: [
                {
                    $ref: (0, swagger_1.getSchemaPath)(response_dto_1.BaseResponseDto),
                },
                {
                    properties: {
                        data: options.isPaginated || Array.isArray(options.type)
                            ? {
                                type: 'object',
                                properties: {
                                    items: {
                                        type: 'array',
                                        items: { $ref: (0, swagger_1.getSchemaPath)(options.type[0]) },
                                    },
                                    meta: {
                                        $ref: (0, swagger_1.getSchemaPath)(paginate_response_dto_1.PaginationMetaDto),
                                    },
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

/***/ "./libs/dtos/paginate-query.dto.ts":
/*!*****************************************!*\
  !*** ./libs/dtos/paginate-query.dto.ts ***!
  \*****************************************/
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
exports.PaginationQueryDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class PaginationQueryDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
    getOffset() {
        return (this.page - 1) * this.limit;
    }
}
exports.PaginationQueryDto = PaginationQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '페이지 번호 (1부터 시작)',
        type: Number,
        default: 1,
        minimum: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PaginationQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '한 페이지당 항목 수',
        type: Number,
        default: 20,
        minimum: 1,
        maximum: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PaginationQueryDto.prototype, "limit", void 0);


/***/ }),

/***/ "./libs/dtos/paginate-response.dto.ts":
/*!********************************************!*\
  !*** ./libs/dtos/paginate-response.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaginationData = exports.PaginationMetaDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class PaginationMetaDto {
}
exports.PaginationMetaDto = PaginationMetaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '전체 아이템 수',
        type: Number,
        example: 100,
    }),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '현재 페이지 번호',
        type: Number,
        example: 1,
    }),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '페이지당 아이템 수',
        type: Number,
        example: 20,
    }),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '다음 페이지 존재 여부',
        type: Boolean,
        example: true,
    }),
    __metadata("design:type", Boolean)
], PaginationMetaDto.prototype, "hasNext", void 0);
class PaginationData {
}
exports.PaginationData = PaginationData;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결과 아이템 배열',
        isArray: true,
    }),
    __metadata("design:type", Array)
], PaginationData.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '페이지네이션 메타데이터',
        type: PaginationMetaDto,
    }),
    __metadata("design:type", PaginationMetaDto)
], PaginationData.prototype, "meta", void 0);


/***/ }),

/***/ "./libs/dtos/response.dto.ts":
/*!***********************************!*\
  !*** ./libs/dtos/response.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorResponseDto = exports.BaseResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class BaseResponseDto {
}
exports.BaseResponseDto = BaseResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, type: 'except' }),
    __metadata("design:type", Boolean)
], BaseResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, description: '응답 데이터', type: 'except' }),
    __metadata("design:type", Object)
], BaseResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: '성공적으로 처리되었습니다.', description: '성공 메시지', type: 'except' }),
    __metadata("design:type", String)
], BaseResponseDto.prototype, "message", void 0);
class ErrorResponseDto {
}
exports.ErrorResponseDto = ErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, type: 'except' }),
    __metadata("design:type", Boolean)
], ErrorResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 400, type: 'except' }),
    __metadata("design:type", Number)
], ErrorResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '잘못된 요청입니다.', type: 'except' }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "message", void 0);


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
], Consumable.prototype, "vehicleInfoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Consumable.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Consumable.prototype, "replaceCycle", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Consumable.prototype, "notifyReplacementCycle", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vehicle_info_entity_1.VehicleInfo),
    (0, typeorm_1.JoinColumn)({ name: 'vehicleInfoId', referencedColumnName: 'vehicleInfoId' }),
    __metadata("design:type", typeof (_a = typeof vehicle_info_entity_1.VehicleInfo !== "undefined" && vehicle_info_entity_1.VehicleInfo) === "function" ? _a : Object)
], Consumable.prototype, "vehicleInfo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => maintenance_entity_1.Maintenance, (maintenance) => maintenance.consumable),
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
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], EmployeeNotification.prototype, "isRead", void 0);
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
var _a, _b, _c;
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
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Maintenance.prototype, "mileage", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Maintenance.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true, comment: '정비사진 배열' }),
    __metadata("design:type", Array)
], Maintenance.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Maintenance.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Maintenance.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => consumable_entity_1.Consumable),
    (0, typeorm_1.JoinColumn)({ name: 'consumableId' }),
    __metadata("design:type", typeof (_c = typeof consumable_entity_1.Consumable !== "undefined" && consumable_entity_1.Consumable) === "function" ? _c : Object)
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Notification = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const employee_notification_entity_1 = __webpack_require__(/*! ./employee-notification.entity */ "./libs/entities/employee-notification.entity.ts");
const notification_type_enum_1 = __webpack_require__(/*! @libs/enums/notification-type.enum */ "./libs/enums/notification-type.enum.ts");
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
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: notification_type_enum_1.NotificationType,
        nullable: true,
    }),
    __metadata("design:type", typeof (_a = typeof notification_type_enum_1.NotificationType !== "undefined" && notification_type_enum_1.NotificationType) === "function" ? _a : Object)
], Notification.prototype, "notificationType", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Notification.prototype, "notificationData", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Notification.prototype, "isSent", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notification.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_notification_entity_1.EmployeeNotification, (notification) => notification.notification),
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
var _a, _b, _c, _d;
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
    (0, typeorm_1.Column)({ type: 'timestamp with time zone' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Reservation.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Reservation.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: reservation_type_enum_1.ReservationStatus,
    }),
    __metadata("design:type", typeof (_c = typeof reservation_type_enum_1.ReservationStatus !== "undefined" && reservation_type_enum_1.ReservationStatus) === "function" ? _c : Object)
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
    __metadata("design:type", typeof (_d = typeof resource_entity_1.Resource !== "undefined" && resource_entity_1.Resource) === "function" ? _d : Object)
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
    (0, typeorm_1.Column)({ unique: true }),
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
        enum: resource_type_enum_1.ResourceType,
    }),
    __metadata("design:type", typeof (_a = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _a : Object)
], ResourceGroup.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ResourceGroup.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => resource_entity_1.Resource, (resource) => resource.resourceGroup),
    __metadata("design:type", Array)
], ResourceGroup.prototype, "resources", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ResourceGroup, (resourceGroup) => resourceGroup.children),
    (0, typeorm_1.JoinColumn)({ name: 'parentResourceGroupId' }),
    __metadata("design:type", ResourceGroup)
], ResourceGroup.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ResourceGroup, (resourceGroup) => resourceGroup.parent),
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
var _a, _b, _c, _d, _e, _f;
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
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], Resource.prototype, "resourceGroupId", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
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
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Resource.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Resource.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => resource_group_entity_1.ResourceGroup),
    (0, typeorm_1.JoinColumn)({ name: 'resourceGroupId' }),
    __metadata("design:type", typeof (_c = typeof resource_group_entity_1.ResourceGroup !== "undefined" && resource_group_entity_1.ResourceGroup) === "function" ? _c : Object)
], Resource.prototype, "resourceGroup", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => vehicle_info_entity_1.VehicleInfo, (vehicleInfo) => vehicleInfo.resource),
    __metadata("design:type", typeof (_d = typeof vehicle_info_entity_1.VehicleInfo !== "undefined" && vehicle_info_entity_1.VehicleInfo) === "function" ? _d : Object)
], Resource.prototype, "vehicleInfo", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => meeting_room_info_entity_1.MeetingRoomInfo, (meetingRoomInfo) => meetingRoomInfo.resource),
    __metadata("design:type", typeof (_e = typeof meeting_room_info_entity_1.MeetingRoomInfo !== "undefined" && meeting_room_info_entity_1.MeetingRoomInfo) === "function" ? _e : Object)
], Resource.prototype, "meetingRoomInfo", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => accommodation_info_entity_1.AccommodationInfo, (accommodationInfo) => accommodationInfo.resource),
    __metadata("design:type", typeof (_f = typeof accommodation_info_entity_1.AccommodationInfo !== "undefined" && accommodation_info_entity_1.AccommodationInfo) === "function" ? _f : Object)
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const employee_entity_1 = __webpack_require__(/*! ./employee.entity */ "./libs/entities/employee.entity.ts");
const role_type_enum_1 = __webpack_require__(/*! @libs/enums/role-type.enum */ "./libs/enums/role-type.enum.ts");
const push_notification_port_1 = __webpack_require__(/*! @resource/modules/notification/domain/ports/push-notification.port */ "./apps/resource/src/modules/notification/domain/ports/push-notification.port.ts");
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
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true, comment: '웹푸시 알림 관련 구독 정보' }),
    __metadata("design:type", typeof (_a = typeof push_notification_port_1.PushNotificationSubscription !== "undefined" && push_notification_port_1.PushNotificationSubscription) === "function" ? _a : Object)
], User.prototype, "subscription", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: role_type_enum_1.Role, array: true, default: [role_type_enum_1.Role.USER], comment: '사용자 역할' }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId' }),
    __metadata("design:type", typeof (_b = typeof employee_entity_1.Employee !== "undefined" && employee_entity_1.Employee) === "function" ? _b : Object)
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
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], VehicleInfo.prototype, "vehicleInfoId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VehicleInfo.prototype, "resourceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VehicleInfo.prototype, "vehicleNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], VehicleInfo.prototype, "leftMileage", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
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
    (0, typeorm_1.OneToOne)(() => resource_entity_1.Resource, (resource) => resource.vehicleInfo),
    (0, typeorm_1.JoinColumn)({ name: `resourceId` }),
    __metadata("design:type", typeof (_a = typeof resource_entity_1.Resource !== "undefined" && resource_entity_1.Resource) === "function" ? _a : Object)
], VehicleInfo.prototype, "resource", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => consumable_entity_1.Consumable, (consumable) => consumable.vehicleInfo),
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
    NotificationType["RESERVATION_STATUS_CONFIRMED"] = "RESERVATION_STATUS_CONFIRMED";
    NotificationType["RESERVATION_STATUS_CANCELLED"] = "RESERVATION_STATUS_CANCELLED";
    NotificationType["RESERVATION_STATUS_REJECTED"] = "RESERVATION_STATUS_REJECTED";
    NotificationType["RESERVATION_DATE_UPCOMING"] = "RESERVATION_DATE_UPCOMING";
    NotificationType["RESERVATION_PARTICIPANT_CHANGED"] = "RESERVATION_PARTICIPANT_CHANGED";
    NotificationType["RESOURCE_CONSUMABLE_REPLACING"] = "RESOURCE_CONSUMABLE_REPLACING";
    NotificationType["RESOURCE_VEHICLE_RETURNED"] = "RESOURCE_VEHICLE_RETURNED";
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
    ReservationStatus["CLOSED"] = "CLOSED";
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
        console.log(requiredRoles);
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
        return next.handle().pipe((0, operators_1.catchError)((error) => {
            if (error instanceof common_1.HttpException) {
                console.error('Error:', error);
                const response = error.getResponse();
                const errorMessage = typeof response === 'object'
                    ? Array.isArray(response.message)
                        ? response.message[0]
                        : response.message
                    : error.message;
                return (0, rxjs_1.throwError)(() => ({
                    success: false,
                    message: errorMessage,
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

/***/ "./libs/interceptors/request.interceptor.ts":
/*!**************************************************!*\
  !*** ./libs/interceptors/request.interceptor.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestInterceptor = void 0;
const date_util_1 = __webpack_require__(/*! @libs/utils/date.util */ "./libs/utils/date.util.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
let RequestInterceptor = class RequestInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { method, url, body, query, params } = request;
        const now = Date.now();
        console.log(`[Request] ${date_util_1.DateUtil.now().toISOString()} ${method} ${url}`);
        if (Object.keys(body).length > 0) {
            console.log('Body:', body);
        }
        if (Object.keys(query).length > 0) {
            console.log('Query:', query);
        }
        if (Object.keys(params).length > 0) {
            console.log('Params:', params);
        }
        return next.handle().pipe((0, operators_1.tap)(() => {
            console.log(`[Response Time] ${Date.now() - now}ms`);
        }));
    }
};
exports.RequestInterceptor = RequestInterceptor;
exports.RequestInterceptor = RequestInterceptor = __decorate([
    (0, common_1.Injectable)()
], RequestInterceptor);


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
            return {
                success: true,
                data: data,
                message: '요청이 성공적으로 처리되었습니다.',
            };
        }));
    }
};
exports.ResponseInterceptor = ResponseInterceptor;
exports.ResponseInterceptor = ResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseInterceptor);


/***/ }),

/***/ "./libs/swagger/swagger.ts":
/*!*********************************!*\
  !*** ./libs/swagger/swagger.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setupSwagger = setupSwagger;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const response_dto_1 = __webpack_require__(/*! ../dtos/response.dto */ "./libs/dtos/response.dto.ts");
const paginate_response_dto_1 = __webpack_require__(/*! ../dtos/paginate-response.dto */ "./libs/dtos/paginate-response.dto.ts");
function setupSwagger(app, dtos) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Resource Management API')
        .setDescription('Resource Management API Description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        extraModels: [response_dto_1.BaseResponseDto, paginate_response_dto_1.PaginationData, ...dtos],
    });
    swagger_1.SwaggerModule.setup('api-docs', app, document, {
        jsonDocumentUrl: '/api-docs-json',
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
        ],
        customCssUrl: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
        ],
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
        },
    });
}


/***/ }),

/***/ "./libs/utils/api-doc.service.ts":
/*!***************************************!*\
  !*** ./libs/utils/api-doc.service.ts ***!
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
var ApiDocService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiDocService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const fs = __webpack_require__(/*! fs */ "fs");
const axios_1 = __webpack_require__(/*! axios */ "axios");
const path_1 = __webpack_require__(/*! path */ "path");
let ApiDocService = ApiDocService_1 = class ApiDocService {
    constructor() {
        this.logger = new common_1.Logger(ApiDocService_1.name);
        this.MAX_RETRIES = 3;
        this.RETRY_DELAY = 2000;
        if (process.env.NODE_ENV === 'local') {
        }
    }
    async getApiJson(retries = this.MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, this.RETRY_DELAY));
        try {
            const response = await axios_1.default.get('http://localhost:3000/api-docs-json');
            this.data = response.data;
        }
        catch (error) {
            if (retries > 0) {
                this.getApiJson(retries - 1);
            }
        }
    }
    getControllers() {
        return Object.entries(this.data.paths)
            .map(([path, routes]) => {
            const controller = path.split('/')[2];
            const apis = Object.entries(routes).map(([method, metadata]) => {
                return {
                    method,
                    path,
                    metadata,
                };
            });
            return {
                controller,
                apis,
            };
        })
            .reduce((acc, curr) => {
            if (acc[curr.controller]) {
                acc[curr.controller].push(...curr.apis);
            }
            else {
                acc[curr.controller] = [...curr.apis];
            }
            return acc;
        }, {});
    }
    getSchemaType(schema) {
        if (schema.type === 'array') {
            const itemType = schema.items ? this.getSchemaType(schema.items) : 'any';
            return `${itemType}[]`;
        }
        return schema.type || 'object';
    }
    renderSchemaJson(schema, indentLevel = 1) {
        const indent = '  '.repeat(indentLevel);
        const commentIndent = '  '.repeat(Math.max(0, indentLevel - 1));
        let content = '';
        if (schema.type === 'object' && schema.properties) {
            content += '{\n';
            const properties = Object.entries(schema.properties);
            properties.forEach(([key, prop], index) => {
                const isLast = index === properties.length - 1;
                const required = (schema.required || []).includes(key);
                const comment = [];
                if (prop.description)
                    comment.push(prop.description);
                if (required && prop.type !== 'except')
                    comment.push('✅ Required');
                if (!required && prop.type !== 'except')
                    comment.push('❌ Optional');
                if (prop.type === 'object' && prop.properties) {
                    content += `${indent}"${key}": ${this.renderSchemaJson(prop, indentLevel + 1)}${isLast ? '' : ','}`;
                }
                else if (prop.type === 'array' && prop.items) {
                    content += `${indent}"${key}": [`;
                    if (prop.items.type === 'object' && prop.items.properties) {
                        content += '\n';
                        content += `${indent}  ${this.renderSchemaJson(prop.items, indentLevel + 2).trim()}`;
                        content += `\n${indent}]${isLast ? '' : ','}`;
                    }
                    else {
                        const example = this.getExampleValue(prop.items);
                        content += `${example}]${isLast ? '' : ','}`;
                    }
                }
                else {
                    const example = this.getExampleValue(prop);
                    content += `${indent}"${key}": ${example}${isLast ? '' : ','}`;
                }
                if (comment.length > 0) {
                    content += ` // ${comment.join(', ')}`;
                }
                content += '\n';
            });
            content += `${commentIndent}}`;
        }
        return content;
    }
    getExampleValue(prop) {
        if (prop.example !== undefined) {
            return typeof prop.example === 'string' ? `"${prop.example}"` : prop.example;
        }
        switch (prop.type) {
            case 'string':
                return prop.enum ? `"${prop.enum[0]}"` : '""';
            case 'number':
                return '0';
            case 'integer':
                return '0';
            case 'boolean':
                return 'false';
            case 'array':
                return '[]';
            default:
                return 'null';
        }
    }
    resolveSchema(schema, schemas, visited = new Set()) {
        if (!schema)
            return schema;
        if (schema.$ref) {
            const refPath = schema.$ref.split('/');
            const schemaName = refPath[refPath.length - 1];
            if (visited.has(schemaName)) {
                return { type: 'object', description: `Reference to ${schemaName}` };
            }
            visited.add(schemaName);
            return this.resolveSchema(schemas[schemaName], schemas, visited);
        }
        if (schema.allOf) {
            const resolvedSchemas = schema.allOf.map((s) => this.resolveSchema(s, schemas, visited));
            return resolvedSchemas.reduce((acc, curr) => {
                return {
                    ...acc,
                    ...curr,
                    properties: {
                        ...(acc.properties || {}),
                        ...(curr.properties || {}),
                    },
                    required: [...(acc.required || []), ...(curr.required || [])],
                };
            }, {});
        }
        if (schema.properties) {
            const resolvedProperties = {};
            Object.entries(schema.properties).forEach(([key, value]) => {
                resolvedProperties[key] = this.resolveSchema(value, schemas, new Set(visited));
            });
            return { ...schema, properties: resolvedProperties };
        }
        if (schema.items) {
            return {
                ...schema,
                items: this.resolveSchema(schema.items, schemas, visited),
            };
        }
        return schema;
    }
    async generateApiDocs() {
        await this.getApiJson();
        const controllers = this.getControllers();
        const schemas = this.data.components.schemas;
        Object.keys(controllers).forEach((controller, index) => {
            let markdownContent = `# ${controller[0].toUpperCase() + controller.slice(1)}\n\n`;
            const domain = controllers[controller];
            for (const api of domain) {
                const method = api.method.toUpperCase();
                const path = api.path;
                const metadata = api.metadata;
                markdownContent += `### ${metadata.summary || path}\n\n`;
                if (metadata.description) {
                    markdownContent += `${metadata.description}\n\n`;
                }
                markdownContent += `- **Method:** \`${method}\`\n`;
                markdownContent += `- **Endpoint:** \`${path}\`\n\n`;
                if (metadata.parameters && metadata.parameters.length > 0) {
                    const pathParams = metadata.parameters.filter((p) => p.in === 'path');
                    const queryParams = metadata.parameters.filter((p) => p.in === 'query');
                    if (pathParams.length > 0) {
                        markdownContent += `#### 🔵 Path Parameters\n\n`;
                        markdownContent += '```json\n';
                        markdownContent += '{\n';
                        pathParams.forEach((param, index) => {
                            const resolvedSchema = this.resolveSchema(param.schema, schemas);
                            const isLast = index === pathParams.length - 1;
                            const example = this.getExampleValue(resolvedSchema);
                            const required = param.required ? '✅ Required' : '❌ Optional';
                            markdownContent += `  "${param.name}": ${example} // ${required} ${param.description || ''}\n`;
                            markdownContent += `${isLast ? '' : ','}\n`;
                        });
                        markdownContent += '}\n';
                        markdownContent += '```\n\n';
                    }
                    if (queryParams.length > 0) {
                        markdownContent += `#### 🟣 Query Parameters\n\n`;
                        markdownContent += '```json\n';
                        markdownContent += '{\n';
                        queryParams.forEach((param, index) => {
                            const resolvedSchema = this.resolveSchema(param.schema, schemas);
                            const isLast = index === queryParams.length - 1;
                            const example = this.getExampleValue(resolvedSchema);
                            const required = param.required ? '✅ Required' : '❌ Optional';
                            markdownContent += `  "${param.name}": ${example} // ${required} ${param.description || ''}\n`;
                            markdownContent += `${isLast ? '' : ','}\n`;
                        });
                        markdownContent += '}\n';
                        markdownContent += '```\n\n';
                    }
                }
                if (metadata.requestBody) {
                    markdownContent += `#### 🟠 Request Body\n\n`;
                    const content = metadata.requestBody.content;
                    Object.keys(content).forEach((contentType) => {
                        markdownContent += `**Content Type:** \`${contentType}\`\n\n`;
                        const resolvedSchema = this.resolveSchema(content[contentType].schema, schemas);
                        markdownContent += '```json\n';
                        markdownContent += this.renderSchemaJson(resolvedSchema);
                        markdownContent += '\n```\n\n';
                    });
                }
                markdownContent += `#### Responses\n\n`;
                Object.entries(metadata.responses).forEach(([code, response]) => {
                    const titleEmoji = code.startsWith('2') ? '🟢' : '🔴';
                    markdownContent += `##### ${titleEmoji} ${code} - ${response.description}\n\n`;
                    if (response.content) {
                        Object.keys(response.content).forEach((contentType) => {
                            markdownContent += `**Content Type:** \`${contentType}\`\n\n`;
                            const resolvedSchema = this.resolveSchema(response.content[contentType].schema, schemas);
                            markdownContent += '```json\n';
                            markdownContent += this.renderSchemaJson(resolvedSchema);
                            markdownContent += '\n```\n\n';
                        });
                    }
                });
                markdownContent += `---\n\n`;
            }
            const docsPath = (0, path_1.join)('C:/Users/USER/Desktop/projects/RMS-documents/docs/개발/03_api', `${index + 1 < 10 ? '0' : ''}${index + 1}_${controller}.md`);
            this.saveMarkdown(docsPath, markdownContent);
        });
    }
    saveMarkdown(filePath, content) {
        fs.writeFileSync(filePath, content);
        this.logger.log(`API 문서가 생성되었습니다: ${filePath}`);
    }
};
exports.ApiDocService = ApiDocService;
exports.ApiDocService = ApiDocService = ApiDocService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ApiDocService);


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
    toDate() {
        return this.date.toDate();
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
    hour(hours) {
        return new DateUtilWrapper(this.date.hour(hours));
    }
    minute(minutes) {
        return new DateUtilWrapper(this.date.minute(minutes));
    }
    second(seconds) {
        return new DateUtilWrapper(this.date.second(seconds));
    }
}
class DateUtil {
    static now() {
        return new DateUtilWrapper(dayjs().tz('Asia/Seoul'));
    }
    static date(date) {
        return new DateUtilWrapper(dayjs.tz(date, 'Asia/Seoul'));
    }
    static format(date, format = 'YYYY-MM-DD HH:mm:ss') {
        return this.date(date).format(format);
    }
    static parse(dateString) {
        return this.date(dateString);
    }
    static addDays(date, days) {
        return this.date(date).addDays(days);
    }
    static addMinutes(date, minutes) {
        return this.date(date).addMinutes(minutes);
    }
    static toISOString(date) {
        return this.date(date).toISOString();
    }
    static toMinutes(date) {
        const d = this.date(date);
        return d.toMinutes();
    }
    static fromMinutes(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return this.now().hour(hours).minute(mins).second(0);
    }
}
exports.DateUtil = DateUtil;


/***/ }),

/***/ "./libs/utils/db-doc.service.ts":
/*!**************************************!*\
  !*** ./libs/utils/db-doc.service.ts ***!
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
exports.DbDocService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const fs = __webpack_require__(/*! fs */ "fs");
const path = __webpack_require__(/*! path */ "path");
let DbDocService = class DbDocService {
    constructor() {
        if (process.env.NODE_ENV === 'local') {
            const storage = (0, typeorm_1.getMetadataArgsStorage)();
            this.metadata = storage.tables.map((table) => ({
                name: table.name,
                columns: storage.columns.filter((col) => col.target === table.target),
                relations: storage.relations.filter((rel) => rel.target === table.target),
            }));
        }
    }
    async generateDbDocumentation() {
        const doc = this.generateMarkdown();
        const outputPath = path.join('C:/Users/USER/Desktop/projects/RMS-documents/docs/개발/02_database-design.md');
        const outputDir = path.dirname(outputPath);
        await fs.promises.mkdir(outputDir, { recursive: true });
        await fs.promises.writeFile(outputPath, doc, 'utf8');
    }
    generateMarkdown() {
        let markdown = '# 데이터베이스 설계 문서\n\n';
        markdown += "import { MermaidDiagram } from '@site/src/components/MermaidDiagram';\n\n";
        markdown += this.generateErdSection();
        markdown += this.generateEntityDetailsSection();
        markdown += this.generateRelationsSection();
        return markdown;
    }
    generateErdSection() {
        let section = '## ERD (Entity Relationship Diagram)\n\n';
        section += '<MermaidDiagram\n';
        section += 'title="database-erd"\n';
        section += 'chart={`\n';
        section += 'erDiagram\n';
        this.metadata.forEach((metadata) => {
            const entityName = metadata.name.replace(/[^a-zA-Z0-9]/g, '').replace(/s$/, '');
            section += `    ${entityName} {\n`;
            metadata.columns.forEach((column) => {
                let type = 'unknown';
                if (column.options?.type) {
                    if (typeof column.options.type === 'string') {
                        type = column.options.type;
                    }
                    else if (typeof column.options.type === 'function') {
                        switch (column.options.type.name) {
                            case 'String':
                                type = 'string';
                                break;
                            case 'Number':
                                type = 'number';
                                break;
                            case 'Boolean':
                                type = 'boolean';
                                break;
                            case 'Date':
                                type = 'date';
                                break;
                            default:
                                type = column.options.type.name.toLowerCase();
                        }
                    }
                }
                const isPrimary = column.options?.primary ? 'PK' : '';
                section += `        ${type} ${column.propertyName} ${isPrimary}\n`;
            });
            section += '    }\n';
        });
        this.metadata.forEach((metadata) => {
            const sourceEntity = metadata.name.replace(/[^a-zA-Z0-9]/g, '').replace(/s$/, '');
            metadata.relations.forEach((relation) => {
                const targetEntity = relation.type.toString().split('.').pop();
                if (targetEntity) {
                    const sanitizedTarget = targetEntity
                        .toLowerCase()
                        .replace(/[^a-zA-Z0-9]/g, '')
                        .replace(/s$/, '');
                    let cardinality = '||--o{';
                    if (relation.relationType === 'one-to-one') {
                        cardinality = '||--||';
                    }
                    else if (relation.relationType === 'many-to-one') {
                        cardinality = '}|--||';
                    }
                    const relationDesc = relation.relationType === 'many-to-one' ? 'belongs_to' : 'has';
                    section += `    ${sourceEntity} ${cardinality} ${sanitizedTarget} : ${relationDesc}\n`;
                }
            });
        });
        section += '`}\n';
        section += '/>\n\n';
        return section;
    }
    generateEntityDetailsSection() {
        let section = '## 엔티티 상세 정보\n\n';
        this.metadata.forEach((metadata) => {
            section += `### ${metadata.name}\n\n`;
            section += '| 컬럼명 | 타입 | 제약조건 | 설명 |\n';
            section += '|--------|------|-----------|------|\n';
            metadata.columns.forEach((column) => {
                const constraints = [];
                if (column.options.primary)
                    constraints.push('PK');
                if (!column.options.nullable)
                    constraints.push('NOT NULL');
                if (column.options.unique)
                    constraints.push('UNIQUE');
                let type = column.options.type;
                if (typeof type === 'function') {
                    type = type.name;
                }
                section += `| ${column.propertyName} | ${type} | ${constraints.join(', ')} | ${column.options?.comment || ''} |\n`;
            });
            section += '\n';
        });
        return section;
    }
    generateRelationsSection() {
        let section = '## 관계 정보\n\n';
        this.metadata.forEach((metadata) => {
            if (metadata.relations.length > 0) {
                section += `### ${metadata.name} 관계\n\n`;
                section += '| 관계 타입 | 대상 엔티티 | 설명 |\n';
                section += '|------------|-------------|------|\n';
                metadata.relations.forEach((relation) => {
                    const targetEntity = relation.type.toString();
                    const relationType = relation.relationType;
                    section += `| ${relationType} | ${targetEntity} | ${relation.options?.comment || ''} |\n`;
                });
                section += '\n';
            }
        });
        return section;
    }
};
exports.DbDocService = DbDocService;
exports.DbDocService = DbDocService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DbDocService);


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

/***/ "@nestjs/event-emitter":
/*!****************************************!*\
  !*** external "@nestjs/event-emitter" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/event-emitter");

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

/***/ "@nestjs/schedule":
/*!***********************************!*\
  !*** external "@nestjs/schedule" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/schedule");

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

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

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

/***/ "cron":
/*!***********************!*\
  !*** external "cron" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cron");

/***/ }),

/***/ "cron/dist":
/*!****************************!*\
  !*** external "cron/dist" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("cron/dist");

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

/***/ "firebase-admin/app":
/*!*************************************!*\
  !*** external "firebase-admin/app" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("firebase-admin/app");

/***/ }),

/***/ "firebase-admin/messaging":
/*!*******************************************!*\
  !*** external "firebase-admin/messaging" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("firebase-admin/messaging");

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

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const request_interceptor_1 = __webpack_require__(/*! @libs/interceptors/request.interceptor */ "./libs/interceptors/request.interceptor.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.setGlobalPrefix('api');
    app.useGlobalGuards(new jwt_auth_guard_1.JwtAuthGuard(app.get(core_2.Reflector)), new role_guard_1.RolesGuard(app.get(core_2.Reflector)));
    app.useGlobalInterceptors(new request_interceptor_1.RequestInterceptor(), new response_interceptor_1.ResponseInterceptor(), new error_interceptor_1.ErrorInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    const uploadPath = (0, path_1.join)(process.cwd(), 'public');
    app.useStaticAssets(uploadPath, {
        prefix: '/public',
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