/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(5);
const jwt_1 = __webpack_require__(6);
const typeorm_config_1 = __webpack_require__(7);
const env_config_1 = __webpack_require__(31);
const jwt_config_1 = __webpack_require__(33);
const entities_1 = __webpack_require__(8);
const auth_module_1 = __webpack_require__(34);
const resource_module_1 = __webpack_require__(65);
const employee_module_1 = __webpack_require__(161);
const reservation_module_1 = __webpack_require__(154);
const app_service_1 = __webpack_require__(166);
const notification_module_1 = __webpack_require__(133);
const file_module_1 = __webpack_require__(168);
const app_controller_1 = __webpack_require__(177);
const api_doc_service_1 = __webpack_require__(178);
const db_doc_service_1 = __webpack_require__(182);
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
        providers: [app_service_1.AppService, api_doc_service_1.ApiDocService, db_doc_service_1.DbDocService],
    })
], AppModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.typeOrmConfig = void 0;
const entities_1 = __webpack_require__(8);
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
        synchronize: configService.get('NODE_ENV') === 'local',
        logging: configService.get('NODE_ENV') === 'local',
        migrationsRun: configService.get('database.port') === 6543,
        ssl: configService.get('database.port') === 6543,
        extra: {
            ssl: configService.get('database.port') === 6543 ? { rejectUnauthorized: false } : null,
        },
    };
};
exports.typeOrmConfig = typeOrmConfig;


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.File = exports.EmployeeNotification = exports.Notification = exports.Maintenance = exports.Consumable = exports.ResourceManager = exports.Schedule = exports.ReservationParticipant = exports.Reservation = exports.AccommodationInfo = exports.MeetingRoomInfo = exports.VehicleInfo = exports.ResourceGroup = exports.Resource = exports.User = exports.Employee = exports.EntitiesMap = exports.Entities = void 0;
const employee_entity_1 = __webpack_require__(9);
Object.defineProperty(exports, "Employee", ({ enumerable: true, get: function () { return employee_entity_1.Employee; } }));
const user_entity_1 = __webpack_require__(27);
Object.defineProperty(exports, "User", ({ enumerable: true, get: function () { return user_entity_1.User; } }));
const resource_entity_1 = __webpack_require__(16);
Object.defineProperty(exports, "Resource", ({ enumerable: true, get: function () { return resource_entity_1.Resource; } }));
const resource_group_entity_1 = __webpack_require__(17);
Object.defineProperty(exports, "ResourceGroup", ({ enumerable: true, get: function () { return resource_group_entity_1.ResourceGroup; } }));
const vehicle_info_entity_1 = __webpack_require__(19);
Object.defineProperty(exports, "VehicleInfo", ({ enumerable: true, get: function () { return vehicle_info_entity_1.VehicleInfo; } }));
const meeting_room_info_entity_1 = __webpack_require__(22);
Object.defineProperty(exports, "MeetingRoomInfo", ({ enumerable: true, get: function () { return meeting_room_info_entity_1.MeetingRoomInfo; } }));
const accommodation_info_entity_1 = __webpack_require__(23);
Object.defineProperty(exports, "AccommodationInfo", ({ enumerable: true, get: function () { return accommodation_info_entity_1.AccommodationInfo; } }));
const reservation_entity_1 = __webpack_require__(15);
Object.defineProperty(exports, "Reservation", ({ enumerable: true, get: function () { return reservation_entity_1.Reservation; } }));
const reservation_participant_entity_1 = __webpack_require__(14);
Object.defineProperty(exports, "ReservationParticipant", ({ enumerable: true, get: function () { return reservation_participant_entity_1.ReservationParticipant; } }));
const schedule_entity_1 = __webpack_require__(25);
Object.defineProperty(exports, "Schedule", ({ enumerable: true, get: function () { return schedule_entity_1.Schedule; } }));
const resource_manager_entity_1 = __webpack_require__(24);
Object.defineProperty(exports, "ResourceManager", ({ enumerable: true, get: function () { return resource_manager_entity_1.ResourceManager; } }));
const consumable_entity_1 = __webpack_require__(20);
Object.defineProperty(exports, "Consumable", ({ enumerable: true, get: function () { return consumable_entity_1.Consumable; } }));
const maintenance_entity_1 = __webpack_require__(21);
Object.defineProperty(exports, "Maintenance", ({ enumerable: true, get: function () { return maintenance_entity_1.Maintenance; } }));
const notification_entity_1 = __webpack_require__(12);
Object.defineProperty(exports, "Notification", ({ enumerable: true, get: function () { return notification_entity_1.Notification; } }));
const employee_notification_entity_1 = __webpack_require__(11);
Object.defineProperty(exports, "EmployeeNotification", ({ enumerable: true, get: function () { return employee_notification_entity_1.EmployeeNotification; } }));
const file_entity_1 = __webpack_require__(30);
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
/* 9 */
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
const typeorm_1 = __webpack_require__(10);
const employee_notification_entity_1 = __webpack_require__(11);
const reservation_participant_entity_1 = __webpack_require__(14);
const user_entity_1 = __webpack_require__(27);
const resource_manager_entity_1 = __webpack_require__(24);
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
/* 10 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 11 */
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
const typeorm_1 = __webpack_require__(10);
const employee_entity_1 = __webpack_require__(9);
const notification_entity_1 = __webpack_require__(12);
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
/* 12 */
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
const typeorm_1 = __webpack_require__(10);
const employee_notification_entity_1 = __webpack_require__(11);
const notification_type_enum_1 = __webpack_require__(13);
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
/* 13 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationType = void 0;
var NotificationType;
(function (NotificationType) {
    NotificationType["RESERVATION_STATUS_CONFIRMED"] = "RESERVATION_STATUS_CONFIRMED";
    NotificationType["RESERVATION_STATUS_CANCELLED"] = "RESERVATION_STATUS_CANCELLED";
    NotificationType["RESERVATION_DATE_UPCOMING"] = "RESERVATION_DATE_UPCOMING";
    NotificationType["RESERVATION_PARTICIPANT_CHANGED"] = "RESERVATION_PARTICIPANT_CHANGED";
    NotificationType["RESOURCE_CONSUMABLE_REPLACING"] = "RESOURCE_CONSUMABLE_REPLACING";
})(NotificationType || (exports.NotificationType = NotificationType = {}));


/***/ }),
/* 14 */
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
const typeorm_1 = __webpack_require__(10);
const reservation_entity_1 = __webpack_require__(15);
const employee_entity_1 = __webpack_require__(9);
const reservation_type_enum_1 = __webpack_require__(26);
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
/* 15 */
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
const typeorm_1 = __webpack_require__(10);
const resource_entity_1 = __webpack_require__(16);
const reservation_participant_entity_1 = __webpack_require__(14);
const schedule_entity_1 = __webpack_require__(25);
const reservation_type_enum_1 = __webpack_require__(26);
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
/* 16 */
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
const typeorm_1 = __webpack_require__(10);
const resource_group_entity_1 = __webpack_require__(17);
const vehicle_info_entity_1 = __webpack_require__(19);
const meeting_room_info_entity_1 = __webpack_require__(22);
const accommodation_info_entity_1 = __webpack_require__(23);
const reservation_entity_1 = __webpack_require__(15);
const resource_type_enum_1 = __webpack_require__(18);
const resource_manager_entity_1 = __webpack_require__(24);
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
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Resource.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
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
/* 17 */
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
const typeorm_1 = __webpack_require__(10);
const resource_entity_1 = __webpack_require__(16);
const resource_type_enum_1 = __webpack_require__(18);
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
/* 18 */
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
/* 19 */
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
const typeorm_1 = __webpack_require__(10);
const resource_entity_1 = __webpack_require__(16);
const consumable_entity_1 = __webpack_require__(20);
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
/* 20 */
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
const typeorm_1 = __webpack_require__(10);
const vehicle_info_entity_1 = __webpack_require__(19);
const maintenance_entity_1 = __webpack_require__(21);
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
/* 21 */
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
const typeorm_1 = __webpack_require__(10);
const consumable_entity_1 = __webpack_require__(20);
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
/* 22 */
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
const typeorm_1 = __webpack_require__(10);
const resource_entity_1 = __webpack_require__(16);
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
/* 23 */
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
const typeorm_1 = __webpack_require__(10);
const resource_entity_1 = __webpack_require__(16);
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
/* 24 */
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
const typeorm_1 = __webpack_require__(10);
const employee_entity_1 = __webpack_require__(9);
const resource_entity_1 = __webpack_require__(16);
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
/* 25 */
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
const typeorm_1 = __webpack_require__(10);
const reservation_entity_1 = __webpack_require__(15);
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
/* 26 */
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
/* 27 */
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
const typeorm_1 = __webpack_require__(10);
const employee_entity_1 = __webpack_require__(9);
const role_type_enum_1 = __webpack_require__(28);
const push_notification_port_1 = __webpack_require__(29);
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
/* 28 */
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
/* 29 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 30 */
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
const typeorm_1 = __webpack_require__(10);
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
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FIREBASE_CONFIG = exports.APP_CONFIG = exports.WEB_PUSH_CONFIG = exports.JWT_CONFIG = exports.ENV = void 0;
const dotenv_1 = __webpack_require__(32);
const config_1 = __webpack_require__(4);
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
/* 32 */
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),
/* 33 */
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
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(3);
const passport_1 = __webpack_require__(35);
const typeorm_1 = __webpack_require__(5);
const jwt_auth_usecase_1 = __webpack_require__(36);
const sso_auth_usecase_1 = __webpack_require__(46);
const auth_controller_1 = __webpack_require__(47);
const user_repository_1 = __webpack_require__(56);
const jwt_strategy_1 = __webpack_require__(57);
const entities_1 = __webpack_require__(8);
const user_service_1 = __webpack_require__(41);
const user_controller_1 = __webpack_require__(59);
const user_usecase_1 = __webpack_require__(61);
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
/* 35 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 36 */
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
const common_1 = __webpack_require__(3);
const jwt_1 = __webpack_require__(6);
const date_util_1 = __webpack_require__(37);
const user_service_1 = __webpack_require__(41);
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
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DateUtil = void 0;
const dayjs = __webpack_require__(38);
const utc = __webpack_require__(39);
const timezone = __webpack_require__(40);
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
/* 38 */
/***/ ((module) => {

module.exports = require("dayjs");

/***/ }),
/* 39 */
/***/ ((module) => {

module.exports = require("dayjs/plugin/utc");

/***/ }),
/* 40 */
/***/ ((module) => {

module.exports = require("dayjs/plugin/timezone");

/***/ }),
/* 41 */
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
const common_1 = __webpack_require__(3);
const user_repository_port_1 = __webpack_require__(42);
const user_mapper_1 = __webpack_require__(43);
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
/* 42 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserMapper = void 0;
const user_1 = __webpack_require__(44);
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
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const bcrypt = __webpack_require__(45);
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
    updateSubscription(subscription) {
        this.props.subscription = subscription;
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
/* 45 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 46 */
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
exports.SsoAuthUsecase = void 0;
const common_1 = __webpack_require__(3);
const user_service_1 = __webpack_require__(41);
let SsoAuthUsecase = class SsoAuthUsecase {
    constructor(userService) {
        this.userService = userService;
    }
    async validateUser(email, password) {
        return null;
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        return null;
    }
};
exports.SsoAuthUsecase = SsoAuthUsecase;
exports.SsoAuthUsecase = SsoAuthUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], SsoAuthUsecase);


/***/ }),
/* 47 */
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
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(48);
const login_dto_1 = __webpack_require__(49);
const auth_service_port_1 = __webpack_require__(51);
const public_decorator_1 = __webpack_require__(52);
const api_responses_decorator_1 = __webpack_require__(53);
const login_response_dto_1 = __webpack_require__(55);
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
/* 48 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 49 */
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
const class_validator_1 = __webpack_require__(50);
const swagger_1 = __webpack_require__(48);
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
/* 50 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = __webpack_require__(3);
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;


/***/ }),
/* 53 */
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
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(48);
const api_response_interface_1 = __webpack_require__(54);
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
/* 54 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 55 */
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
const swagger_1 = __webpack_require__(48);
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
/* 56 */
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
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(10);
const entities_1 = __webpack_require__(8);
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
/* 57 */
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
const common_1 = __webpack_require__(3);
const passport_1 = __webpack_require__(35);
const passport_jwt_1 = __webpack_require__(58);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(10);
const entities_1 = __webpack_require__(8);
const config_1 = __webpack_require__(4);
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
/* 58 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 59 */
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
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(48);
const api_responses_decorator_1 = __webpack_require__(53);
const user_decorator_1 = __webpack_require__(60);
const entities_1 = __webpack_require__(8);
const user_usecase_1 = __webpack_require__(61);
const user_response_dto_1 = __webpack_require__(62);
const check_password_dto_1 = __webpack_require__(63);
const change_password_dto_1 = __webpack_require__(64);
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
/* 60 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const common_1 = __webpack_require__(3);
exports.User = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
});


/***/ }),
/* 61 */
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
const common_1 = __webpack_require__(3);
const user_service_1 = __webpack_require__(41);
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
/* 62 */
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
const swagger_1 = __webpack_require__(48);
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
/* 63 */
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
const swagger_1 = __webpack_require__(48);
const class_validator_1 = __webpack_require__(50);
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
/* 64 */
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
const swagger_1 = __webpack_require__(48);
const class_validator_1 = __webpack_require__(50);
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
/* 65 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceModule = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(5);
const entities_1 = __webpack_require__(8);
const resource_service_1 = __webpack_require__(66);
const resource_group_service_1 = __webpack_require__(68);
const resource_manager_service_1 = __webpack_require__(70);
const resource_controller_1 = __webpack_require__(72);
const resource_group_controller_1 = __webpack_require__(115);
const resource_manager_controller_1 = __webpack_require__(117);
const resource_repository_1 = __webpack_require__(118);
const resource_group_repository_1 = __webpack_require__(119);
const resource_manager_repository_1 = __webpack_require__(120);
const vehicle_resource_module_1 = __webpack_require__(121);
const meeting_room_resource_module_1 = __webpack_require__(140);
const resource_type_enum_1 = __webpack_require__(18);
const vehicle_resource_handler_1 = __webpack_require__(122);
const meeting_room_resource_handler_1 = __webpack_require__(141);
const accommodation_resource_module_1 = __webpack_require__(147);
const accommodation_resource_handler_1 = __webpack_require__(153);
const auth_module_1 = __webpack_require__(34);
const resource_group_usecase_1 = __webpack_require__(116);
const reservation_module_1 = __webpack_require__(154);
const resource_usecase_1 = __webpack_require__(99);
let ResourceModule = class ResourceModule {
};
exports.ResourceModule = ResourceModule;
exports.ResourceModule = ResourceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.Resource, entities_1.ResourceGroup, entities_1.ResourceManager, entities_1.Employee, entities_1.User]),
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
/* 66 */
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
const common_1 = __webpack_require__(3);
const resource_repository_port_1 = __webpack_require__(67);
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
/* 67 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 68 */
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
const common_1 = __webpack_require__(3);
const resource_group_repository_port_1 = __webpack_require__(69);
const typeorm_1 = __webpack_require__(10);
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
/* 69 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 70 */
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
const common_1 = __webpack_require__(3);
const resource_manager_repository_port_1 = __webpack_require__(71);
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
};
exports.ResourceManagerService = ResourceManagerService;
exports.ResourceManagerService = ResourceManagerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ResourceManagerRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_manager_repository_port_1.ResourceManagerRepositoryPort !== "undefined" && resource_manager_repository_port_1.ResourceManagerRepositoryPort) === "function" ? _a : Object])
], ResourceManagerService);


/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 72 */
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
exports.ResourceController = void 0;
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(48);
const api_responses_decorator_1 = __webpack_require__(53);
const dtos_index_1 = __webpack_require__(73);
const role_type_enum_1 = __webpack_require__(28);
const role_decorator_1 = __webpack_require__(98);
const resource_type_enum_1 = __webpack_require__(18);
const resource_usecase_1 = __webpack_require__(99);
const resource_response_dto_1 = __webpack_require__(80);
const update_resource_dto_1 = __webpack_require__(79);
const user_decorator_1 = __webpack_require__(60);
const entities_1 = __webpack_require__(8);
let ResourceController = class ResourceController {
    constructor(resourceUsecase) {
        this.resourceUsecase = resourceUsecase;
    }
    async findResourcesByTypeAndDateWithReservations(user, type, startDate, endDate) {
        return this.resourceUsecase.findResourcesByTypeAndDateWithReservations(type, startDate, endDate, user);
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
    (0, swagger_1.ApiQuery)({ name: 'startDate', example: '2025-01-01 or 2025-01-01 00:00:00' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', example: '2025-01-01 or 2025-01-01 00:00:00' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('startDate')),
    __param(3, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _b : Object, typeof (_c = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _c : Object, String, String]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ResourceController.prototype, "findResourcesByTypeAndDateWithReservations", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Patch)(':resourceId/return-vehicle'),
    (0, swagger_1.ApiOperation)({ summary: '차량 반납 #사용자/자원예약/차량반납' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '차량 반납 성공',
    }),
    __param(0, (0, common_1.Param)('resourceId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof update_resource_dto_1.ReturnVehicleDto !== "undefined" && update_resource_dto_1.ReturnVehicleDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
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
    __metadata("design:paramtypes", [typeof (_g = typeof dtos_index_1.CreateResourceInfoDto !== "undefined" && dtos_index_1.CreateResourceInfoDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
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
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
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
    __metadata("design:paramtypes", [typeof (_k = typeof update_resource_dto_1.UpdateResourceOrdersDto !== "undefined" && update_resource_dto_1.UpdateResourceOrdersDto) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
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
    __metadata("design:paramtypes", [String, typeof (_m = typeof dtos_index_1.UpdateResourceInfoDto !== "undefined" && dtos_index_1.UpdateResourceInfoDto) === "function" ? _m : Object]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
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
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], ResourceController.prototype, "remove", null);
exports.ResourceController = ResourceController = __decorate([
    (0, swagger_1.ApiTags)('자원'),
    (0, common_1.Controller)('resources'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_usecase_1.ResourceUsecase !== "undefined" && resource_usecase_1.ResourceUsecase) === "function" ? _a : Object])
], ResourceController);


/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReservationResponseDto = exports.CreateReservationResponseDto = exports.UpdateReservationCcReceipientDto = exports.UpdateReservationParticipantsDto = exports.UpdateReservationStatusDto = exports.UpdateReservationTimeDto = exports.UpdateReservationTitleDto = exports.CreateReservationDto = exports.EmplyeesByDepartmentResponseDto = exports.EmployeeResponseDto = exports.UpdateEmployeeDto = exports.CreateEmployeeDto = exports.AccommodationInfoResponseDto = exports.UpdateAccommodationInfoDto = exports.CreateAccommodationInfoDto = exports.MeetingRoomInfoResponseDto = exports.UpdateMeetingRoomInfoDto = exports.CreateMeetingRoomInfoDto = exports.MaintenanceResponseDto = exports.ConsumableResponseDto = exports.VehicleInfoResponseDto = exports.UpdateMaintenanceDto = exports.UpdateConsumableDto = exports.UpdateVehicleInfoDto = exports.CreateMaintenanceDto = exports.CreateConsumableDto = exports.CreateVehicleInfoDto = exports.ResourceManagerResponseDto = exports.ResourceGroupWithResourcesAndReservationsResponseDto = exports.ResourceGroupWithResourcesResponseDto = exports.ChildResourceGroupResponseDto = exports.ResourceGroupResponseDto = exports.ResourceWithReservationsResponseDto = exports.ResourceSelectResponseDto = exports.ResourceResponseDto = exports.ReturnVehicleDto = exports.NewOrderResourceGroupDto = exports.NewOrderResourceDto = exports.UpdateResourceOrdersDto = exports.UpdateResourceGroupOrdersDto = exports.UpdateResourceInfoDto = exports.UpdateResourceGroupDto = exports.UpdateResourceDto = exports.CreateResourceInfoDto = exports.CreateResourceManagerDto = exports.CreateResourceGroupDto = exports.CreateResourceDto = exports.UserResponseDto = exports.LoginResponseDto = exports.LoginDto = void 0;
exports.ResponseNotificationDto = exports.PushSubscriptionDto = exports.SendNotificationDto = exports.CreateNotificationDto = exports.FileResponseDto = exports.ReservationWithRelationsResponseDto = exports.ReservationWithResourceResponseDto = void 0;
var login_dto_1 = __webpack_require__(49);
Object.defineProperty(exports, "LoginDto", ({ enumerable: true, get: function () { return login_dto_1.LoginDto; } }));
var login_response_dto_1 = __webpack_require__(55);
Object.defineProperty(exports, "LoginResponseDto", ({ enumerable: true, get: function () { return login_response_dto_1.LoginResponseDto; } }));
var user_response_dto_1 = __webpack_require__(62);
Object.defineProperty(exports, "UserResponseDto", ({ enumerable: true, get: function () { return user_response_dto_1.UserResponseDto; } }));
var create_resource_dto_1 = __webpack_require__(74);
Object.defineProperty(exports, "CreateResourceDto", ({ enumerable: true, get: function () { return create_resource_dto_1.CreateResourceDto; } }));
Object.defineProperty(exports, "CreateResourceGroupDto", ({ enumerable: true, get: function () { return create_resource_dto_1.CreateResourceGroupDto; } }));
Object.defineProperty(exports, "CreateResourceManagerDto", ({ enumerable: true, get: function () { return create_resource_dto_1.CreateResourceManagerDto; } }));
Object.defineProperty(exports, "CreateResourceInfoDto", ({ enumerable: true, get: function () { return create_resource_dto_1.CreateResourceInfoDto; } }));
var update_resource_dto_1 = __webpack_require__(79);
Object.defineProperty(exports, "UpdateResourceDto", ({ enumerable: true, get: function () { return update_resource_dto_1.UpdateResourceDto; } }));
Object.defineProperty(exports, "UpdateResourceGroupDto", ({ enumerable: true, get: function () { return update_resource_dto_1.UpdateResourceGroupDto; } }));
Object.defineProperty(exports, "UpdateResourceInfoDto", ({ enumerable: true, get: function () { return update_resource_dto_1.UpdateResourceInfoDto; } }));
Object.defineProperty(exports, "UpdateResourceGroupOrdersDto", ({ enumerable: true, get: function () { return update_resource_dto_1.UpdateResourceGroupOrdersDto; } }));
Object.defineProperty(exports, "UpdateResourceOrdersDto", ({ enumerable: true, get: function () { return update_resource_dto_1.UpdateResourceOrdersDto; } }));
Object.defineProperty(exports, "NewOrderResourceDto", ({ enumerable: true, get: function () { return update_resource_dto_1.NewOrderResourceDto; } }));
Object.defineProperty(exports, "NewOrderResourceGroupDto", ({ enumerable: true, get: function () { return update_resource_dto_1.NewOrderResourceGroupDto; } }));
Object.defineProperty(exports, "ReturnVehicleDto", ({ enumerable: true, get: function () { return update_resource_dto_1.ReturnVehicleDto; } }));
var resource_response_dto_1 = __webpack_require__(80);
Object.defineProperty(exports, "ResourceResponseDto", ({ enumerable: true, get: function () { return resource_response_dto_1.ResourceResponseDto; } }));
Object.defineProperty(exports, "ResourceSelectResponseDto", ({ enumerable: true, get: function () { return resource_response_dto_1.ResourceSelectResponseDto; } }));
Object.defineProperty(exports, "ResourceWithReservationsResponseDto", ({ enumerable: true, get: function () { return resource_response_dto_1.ResourceWithReservationsResponseDto; } }));
Object.defineProperty(exports, "ResourceGroupResponseDto", ({ enumerable: true, get: function () { return resource_response_dto_1.ResourceGroupResponseDto; } }));
Object.defineProperty(exports, "ChildResourceGroupResponseDto", ({ enumerable: true, get: function () { return resource_response_dto_1.ChildResourceGroupResponseDto; } }));
Object.defineProperty(exports, "ResourceGroupWithResourcesResponseDto", ({ enumerable: true, get: function () { return resource_response_dto_1.ResourceGroupWithResourcesResponseDto; } }));
Object.defineProperty(exports, "ResourceGroupWithResourcesAndReservationsResponseDto", ({ enumerable: true, get: function () { return resource_response_dto_1.ResourceGroupWithResourcesAndReservationsResponseDto; } }));
Object.defineProperty(exports, "ResourceManagerResponseDto", ({ enumerable: true, get: function () { return resource_response_dto_1.ResourceManagerResponseDto; } }));
var create_vehicle_info_dto_1 = __webpack_require__(76);
Object.defineProperty(exports, "CreateVehicleInfoDto", ({ enumerable: true, get: function () { return create_vehicle_info_dto_1.CreateVehicleInfoDto; } }));
Object.defineProperty(exports, "CreateConsumableDto", ({ enumerable: true, get: function () { return create_vehicle_info_dto_1.CreateConsumableDto; } }));
Object.defineProperty(exports, "CreateMaintenanceDto", ({ enumerable: true, get: function () { return create_vehicle_info_dto_1.CreateMaintenanceDto; } }));
var update_vehicle_info_dto_1 = __webpack_require__(86);
Object.defineProperty(exports, "UpdateVehicleInfoDto", ({ enumerable: true, get: function () { return update_vehicle_info_dto_1.UpdateVehicleInfoDto; } }));
Object.defineProperty(exports, "UpdateConsumableDto", ({ enumerable: true, get: function () { return update_vehicle_info_dto_1.UpdateConsumableDto; } }));
Object.defineProperty(exports, "UpdateMaintenanceDto", ({ enumerable: true, get: function () { return update_vehicle_info_dto_1.UpdateMaintenanceDto; } }));
var vehicle_response_dto_1 = __webpack_require__(81);
Object.defineProperty(exports, "VehicleInfoResponseDto", ({ enumerable: true, get: function () { return vehicle_response_dto_1.VehicleInfoResponseDto; } }));
Object.defineProperty(exports, "ConsumableResponseDto", ({ enumerable: true, get: function () { return vehicle_response_dto_1.ConsumableResponseDto; } }));
Object.defineProperty(exports, "MaintenanceResponseDto", ({ enumerable: true, get: function () { return vehicle_response_dto_1.MaintenanceResponseDto; } }));
var create_meeting_room_info_dto_1 = __webpack_require__(77);
Object.defineProperty(exports, "CreateMeetingRoomInfoDto", ({ enumerable: true, get: function () { return create_meeting_room_info_dto_1.CreateMeetingRoomInfoDto; } }));
var update_meeting_room_info_dto_1 = __webpack_require__(87);
Object.defineProperty(exports, "UpdateMeetingRoomInfoDto", ({ enumerable: true, get: function () { return update_meeting_room_info_dto_1.UpdateMeetingRoomInfoDto; } }));
var meeting_room_info_response_dto_1 = __webpack_require__(82);
Object.defineProperty(exports, "MeetingRoomInfoResponseDto", ({ enumerable: true, get: function () { return meeting_room_info_response_dto_1.MeetingRoomInfoResponseDto; } }));
var create_accommodation_info_dto_1 = __webpack_require__(78);
Object.defineProperty(exports, "CreateAccommodationInfoDto", ({ enumerable: true, get: function () { return create_accommodation_info_dto_1.CreateAccommodationInfoDto; } }));
var update_accommodation_info_dto_1 = __webpack_require__(88);
Object.defineProperty(exports, "UpdateAccommodationInfoDto", ({ enumerable: true, get: function () { return update_accommodation_info_dto_1.UpdateAccommodationInfoDto; } }));
var accommodation_info_response_dto_1 = __webpack_require__(83);
Object.defineProperty(exports, "AccommodationInfoResponseDto", ({ enumerable: true, get: function () { return accommodation_info_response_dto_1.AccommodationInfoResponseDto; } }));
var create_employee_dto_1 = __webpack_require__(89);
Object.defineProperty(exports, "CreateEmployeeDto", ({ enumerable: true, get: function () { return create_employee_dto_1.CreateEmployeeDto; } }));
var update_employee_dto_1 = __webpack_require__(90);
Object.defineProperty(exports, "UpdateEmployeeDto", ({ enumerable: true, get: function () { return update_employee_dto_1.UpdateEmployeeDto; } }));
var employee_response_dto_1 = __webpack_require__(85);
Object.defineProperty(exports, "EmployeeResponseDto", ({ enumerable: true, get: function () { return employee_response_dto_1.EmployeeResponseDto; } }));
var employees_by_department_response_dto_1 = __webpack_require__(91);
Object.defineProperty(exports, "EmplyeesByDepartmentResponseDto", ({ enumerable: true, get: function () { return employees_by_department_response_dto_1.EmplyeesByDepartmentResponseDto; } }));
var create_reservation_dto_1 = __webpack_require__(92);
Object.defineProperty(exports, "CreateReservationDto", ({ enumerable: true, get: function () { return create_reservation_dto_1.CreateReservationDto; } }));
var update_reservation_dto_1 = __webpack_require__(93);
Object.defineProperty(exports, "UpdateReservationTitleDto", ({ enumerable: true, get: function () { return update_reservation_dto_1.UpdateReservationTitleDto; } }));
Object.defineProperty(exports, "UpdateReservationTimeDto", ({ enumerable: true, get: function () { return update_reservation_dto_1.UpdateReservationTimeDto; } }));
Object.defineProperty(exports, "UpdateReservationStatusDto", ({ enumerable: true, get: function () { return update_reservation_dto_1.UpdateReservationStatusDto; } }));
Object.defineProperty(exports, "UpdateReservationParticipantsDto", ({ enumerable: true, get: function () { return update_reservation_dto_1.UpdateReservationParticipantsDto; } }));
Object.defineProperty(exports, "UpdateReservationCcReceipientDto", ({ enumerable: true, get: function () { return update_reservation_dto_1.UpdateReservationCcReceipientDto; } }));
var reservation_response_dto_1 = __webpack_require__(84);
Object.defineProperty(exports, "CreateReservationResponseDto", ({ enumerable: true, get: function () { return reservation_response_dto_1.CreateReservationResponseDto; } }));
Object.defineProperty(exports, "ReservationResponseDto", ({ enumerable: true, get: function () { return reservation_response_dto_1.ReservationResponseDto; } }));
Object.defineProperty(exports, "ReservationWithResourceResponseDto", ({ enumerable: true, get: function () { return reservation_response_dto_1.ReservationWithResourceResponseDto; } }));
Object.defineProperty(exports, "ReservationWithRelationsResponseDto", ({ enumerable: true, get: function () { return reservation_response_dto_1.ReservationWithRelationsResponseDto; } }));
var file_response_dto_1 = __webpack_require__(94);
Object.defineProperty(exports, "FileResponseDto", ({ enumerable: true, get: function () { return file_response_dto_1.FileResponseDto; } }));
var create_notification_dto_1 = __webpack_require__(95);
Object.defineProperty(exports, "CreateNotificationDto", ({ enumerable: true, get: function () { return create_notification_dto_1.CreateNotificationDto; } }));
Object.defineProperty(exports, "SendNotificationDto", ({ enumerable: true, get: function () { return create_notification_dto_1.SendNotificationDto; } }));
var push_subscription_dto_1 = __webpack_require__(96);
Object.defineProperty(exports, "PushSubscriptionDto", ({ enumerable: true, get: function () { return push_subscription_dto_1.PushSubscriptionDto; } }));
var response_notification_dto_1 = __webpack_require__(97);
Object.defineProperty(exports, "ResponseNotificationDto", ({ enumerable: true, get: function () { return response_notification_dto_1.ResponseNotificationDto; } }));


/***/ }),
/* 74 */
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
const class_validator_1 = __webpack_require__(50);
const resource_type_enum_1 = __webpack_require__(18);
const swagger_1 = __webpack_require__(48);
const class_transformer_1 = __webpack_require__(75);
const create_vehicle_info_dto_1 = __webpack_require__(76);
const create_meeting_room_info_dto_1 = __webpack_require__(77);
const create_accommodation_info_dto_1 = __webpack_require__(78);
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
/* 75 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 76 */
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
const swagger_1 = __webpack_require__(48);
const class_validator_1 = __webpack_require__(50);
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
class CreateConsumableDto {
}
exports.CreateConsumableDto = CreateConsumableDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소모품 이름' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConsumableDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소모품 교체 주기' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
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
], CreateConsumableDto.prototype, "vehicleId", void 0);
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
        example: 'consumable-123',
    }),
    __metadata("design:type", String)
], CreateMaintenanceDto.prototype, "consumableId", void 0);


/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateMeetingRoomInfoDto = void 0;
class CreateMeetingRoomInfoDto {
}
exports.CreateMeetingRoomInfoDto = CreateMeetingRoomInfoDto;


/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAccommodationInfoDto = void 0;
class CreateAccommodationInfoDto {
}
exports.CreateAccommodationInfoDto = CreateAccommodationInfoDto;


/***/ }),
/* 79 */
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
const class_validator_1 = __webpack_require__(50);
const swagger_1 = __webpack_require__(48);
const class_transformer_1 = __webpack_require__(75);
const create_resource_dto_1 = __webpack_require__(74);
class UpdateResourceGroupDto {
}
exports.UpdateResourceGroupDto = UpdateResourceGroupDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
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
/* 80 */
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
const swagger_1 = __webpack_require__(48);
const vehicle_response_dto_1 = __webpack_require__(81);
const meeting_room_info_response_dto_1 = __webpack_require__(82);
const accommodation_info_response_dto_1 = __webpack_require__(83);
const resource_type_enum_1 = __webpack_require__(18);
const create_resource_dto_1 = __webpack_require__(74);
const reservation_response_dto_1 = __webpack_require__(84);
const employee_response_dto_1 = __webpack_require__(85);
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
/* 81 */
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
const swagger_1 = __webpack_require__(48);
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
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MaintenanceResponseDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MaintenanceResponseDto.prototype, "mileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MaintenanceResponseDto.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], MaintenanceResponseDto.prototype, "images", void 0);
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
    (0, swagger_1.ApiProperty)({ description: '소모품 이름' }),
    __metadata("design:type", String)
], ConsumableResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소모품 교체 주기' }),
    __metadata("design:type", String)
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
    (0, swagger_1.ApiProperty)({ type: [ConsumableResponseDto], required: false }),
    __metadata("design:type", Array)
], VehicleInfoResponseDto.prototype, "consumables", void 0);


/***/ }),
/* 82 */
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
const swagger_1 = __webpack_require__(48);
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
/* 83 */
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
const swagger_1 = __webpack_require__(48);
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
/* 84 */
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
const swagger_1 = __webpack_require__(48);
const reservation_type_enum_1 = __webpack_require__(26);
const reservation_type_enum_2 = __webpack_require__(26);
const dtos_index_1 = __webpack_require__(73);
class ReservationResponseDto {
    constructor(reservation) {
        this.reservationId = reservation?.reservationId;
        this.resourceId = reservation?.resourceId;
        this.title = reservation?.title;
        this.description = reservation?.description;
        this.startDate = reservation?.startDate;
        this.endDate = reservation?.endDate;
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
/* 85 */
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
const swagger_1 = __webpack_require__(48);
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
/* 86 */
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
exports.UpdateVehicleInfoDto = exports.UpdateConsumableDto = exports.UpdateMaintenanceDto = void 0;
const swagger_1 = __webpack_require__(48);
const class_validator_1 = __webpack_require__(50);
const class_transformer_1 = __webpack_require__(75);
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
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
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
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], UpdateConsumableDto.prototype, "nextReplacementDate", void 0);
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
/* 87 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateMeetingRoomInfoDto = void 0;
class UpdateMeetingRoomInfoDto {
}
exports.UpdateMeetingRoomInfoDto = UpdateMeetingRoomInfoDto;


/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAccommodationInfoDto = void 0;
class UpdateAccommodationInfoDto {
}
exports.UpdateAccommodationInfoDto = UpdateAccommodationInfoDto;


/***/ }),
/* 89 */
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
const swagger_1 = __webpack_require__(48);
const class_validator_1 = __webpack_require__(50);
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
/* 90 */
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
const swagger_1 = __webpack_require__(48);
const class_validator_1 = __webpack_require__(50);
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
/* 91 */
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
const swagger_1 = __webpack_require__(48);
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
/* 92 */
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
const swagger_1 = __webpack_require__(48);
const class_validator_1 = __webpack_require__(50);
const resource_type_enum_1 = __webpack_require__(18);
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
/* 93 */
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
const swagger_1 = __webpack_require__(48);
const class_validator_1 = __webpack_require__(50);
const reservation_type_enum_1 = __webpack_require__(26);
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
    constructor(reservation) {
        this.startDate = reservation?.startDate;
        this.endDate = reservation?.endDate;
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
/* 94 */
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
const swagger_1 = __webpack_require__(48);
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
/* 95 */
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
const notification_type_enum_1 = __webpack_require__(13);
const resource_type_enum_1 = __webpack_require__(18);
const swagger_1 = __webpack_require__(48);
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
/* 96 */
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
const swagger_1 = __webpack_require__(48);
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
/* 97 */
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
exports.ResponseNotificationDto = void 0;
const swagger_1 = __webpack_require__(48);
const notification_type_enum_1 = __webpack_require__(13);
const notification_entity_1 = __webpack_require__(12);
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
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_a = typeof notification_entity_1.NotificationData !== "undefined" && notification_entity_1.NotificationData) === "function" ? _a : Object)
], ResponseNotificationDto.prototype, "notificationData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResponseNotificationDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_b = typeof notification_type_enum_1.NotificationType !== "undefined" && notification_type_enum_1.NotificationType) === "function" ? _b : Object)
], ResponseNotificationDto.prototype, "notificationType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ResponseNotificationDto.prototype, "isRead", void 0);


/***/ }),
/* 98 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(3);
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),
/* 99 */
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceUsecase = void 0;
const common_1 = __webpack_require__(3);
const resource_response_dto_1 = __webpack_require__(80);
const resource_service_1 = __webpack_require__(66);
const resource_group_service_1 = __webpack_require__(68);
const typeorm_1 = __webpack_require__(10);
const reservation_service_1 = __webpack_require__(100);
const vehicle_info_service_1 = __webpack_require__(102);
const resource_manager_service_1 = __webpack_require__(70);
const role_type_enum_1 = __webpack_require__(28);
const user_service_1 = __webpack_require__(41);
const vehicle_info_usecase_1 = __webpack_require__(104);
const reservation_type_enum_1 = __webpack_require__(26);
let ResourceUsecase = class ResourceUsecase {
    constructor(resourceService, resourceManagerService, resourceGroupService, reservationService, vehicleInfoService, vehicleInfoUsecase, userService, dataSource, typeHandlers) {
        this.resourceService = resourceService;
        this.resourceManagerService = resourceManagerService;
        this.resourceGroupService = resourceGroupService;
        this.reservationService = reservationService;
        this.vehicleInfoService = vehicleInfoService;
        this.vehicleInfoUsecase = vehicleInfoUsecase;
        this.userService = userService;
        this.dataSource = dataSource;
        this.typeHandlers = typeHandlers;
    }
    async findResourcesByTypeAndDateWithReservations(type, startDate, endDate, user) {
        if (startDate && endDate && startDate > endDate) {
            throw new common_1.BadRequestException('Start date must be before end date');
        }
        const regex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
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
                const reservations = await this.reservationService.findAll({
                    where: {
                        resourceId: resource.resourceId,
                        startDate: (0, typeorm_1.LessThan)(regex.test(endDate) ? endDate : endDate + ' 23:59:59'),
                        endDate: (0, typeorm_1.MoreThan)(regex.test(startDate) ? startDate : startDate + ' 00:00:00'),
                        status: reservation_type_enum_1.ReservationStatus.CONFIRMED,
                    },
                    relations: ['participants'],
                    order: {
                        startDate: 'ASC',
                    },
                });
                const reservationResponseDtos = reservations.map((reservation) => {
                    const isMine = reservation.participants.some((participant) => participant.employeeId === user.employeeId);
                    delete reservation.participants;
                    return {
                        ...reservation,
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
                'vehicleInfo.consumables.maintenances',
                'meetingRoomInfo',
                'accommodationInfo',
                'resourceManagers',
                'resourceManagers.employee',
            ],
        });
        if (!resource) {
            throw new common_1.NotFoundException('Resource not found');
        }
        return new resource_response_dto_1.ResourceResponseDto(resource);
    }
    async returnVehicle(resourceId, updateDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const resource = await this.resourceService.findOne({
            where: { resourceId: resourceId },
            relations: ['vehicleInfo'],
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
                        await this.userService.removeRole(employeeId, role_type_enum_1.Role.RESOURCE_ADMIN, { queryRunner });
                    }
                }));
                const addedManagerIds = newManagerIds.filter((id) => !currentManagerIds.includes(id));
                await Promise.all(addedManagerIds.map((employeeId) => this.userService.addRole(employeeId, role_type_enum_1.Role.RESOURCE_ADMIN, { queryRunner })));
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
            relations: ['resourceGroup'],
        });
        if (!resource) {
            throw new common_1.NotFoundException('Resource not found');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
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
    __metadata("design:paramtypes", [typeof (_a = typeof resource_service_1.ResourceService !== "undefined" && resource_service_1.ResourceService) === "function" ? _a : Object, typeof (_b = typeof resource_manager_service_1.ResourceManagerService !== "undefined" && resource_manager_service_1.ResourceManagerService) === "function" ? _b : Object, typeof (_c = typeof resource_group_service_1.ResourceGroupService !== "undefined" && resource_group_service_1.ResourceGroupService) === "function" ? _c : Object, typeof (_d = typeof reservation_service_1.ReservationService !== "undefined" && reservation_service_1.ReservationService) === "function" ? _d : Object, typeof (_e = typeof vehicle_info_service_1.VehicleInfoService !== "undefined" && vehicle_info_service_1.VehicleInfoService) === "function" ? _e : Object, typeof (_f = typeof vehicle_info_usecase_1.VehicleInfoUsecase !== "undefined" && vehicle_info_usecase_1.VehicleInfoUsecase) === "function" ? _f : Object, typeof (_g = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _g : Object, typeof (_h = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _h : Object, typeof (_j = typeof Map !== "undefined" && Map) === "function" ? _j : Object])
], ResourceUsecase);


/***/ }),
/* 100 */
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
const common_1 = __webpack_require__(3);
const reservation_repository_port_1 = __webpack_require__(101);
const typeorm_1 = __webpack_require__(10);
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
                startDate: (0, typeorm_1.LessThanOrEqual)(endDate),
                endDate: (0, typeorm_1.MoreThanOrEqual)(startDate),
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
/* 101 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 102 */
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
const common_1 = __webpack_require__(3);
const vehicle_info_repository_port_1 = __webpack_require__(103);
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
};
exports.VehicleInfoService = VehicleInfoService;
exports.VehicleInfoService = VehicleInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('VehicleInfoRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof vehicle_info_repository_port_1.VehicleInfoRepositoryPort !== "undefined" && vehicle_info_repository_port_1.VehicleInfoRepositoryPort) === "function" ? _a : Object])
], VehicleInfoService);


/***/ }),
/* 103 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 104 */
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
exports.VehicleInfoUsecase = void 0;
const vehicle_info_service_1 = __webpack_require__(102);
const common_1 = __webpack_require__(3);
const common_2 = __webpack_require__(3);
const consumable_service_1 = __webpack_require__(105);
const notification_type_enum_1 = __webpack_require__(13);
const notification_usecase_1 = __webpack_require__(107);
let VehicleInfoUsecase = class VehicleInfoUsecase {
    constructor(vehicleInfoService, consumableService, notificationUsecase) {
        this.vehicleInfoService = vehicleInfoService;
        this.consumableService = consumableService;
        this.notificationUsecase = notificationUsecase;
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
                    await this.notificationUsecase.createNotification(notification_type_enum_1.NotificationType.RESOURCE_CONSUMABLE_REPLACING, {
                        resourceId: afterVehicleInfo.resource.resourceId,
                        resourceName: afterVehicleInfo.resource.name,
                        resourceType: afterVehicleInfo.resource.type,
                        consumableName: consumable.name,
                    }, notiTarget, repositoryOptions);
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
    __metadata("design:paramtypes", [typeof (_a = typeof vehicle_info_service_1.VehicleInfoService !== "undefined" && vehicle_info_service_1.VehicleInfoService) === "function" ? _a : Object, typeof (_b = typeof consumable_service_1.ConsumableService !== "undefined" && consumable_service_1.ConsumableService) === "function" ? _b : Object, typeof (_c = typeof notification_usecase_1.NotificationUsecase !== "undefined" && notification_usecase_1.NotificationUsecase) === "function" ? _c : Object])
], VehicleInfoUsecase);


/***/ }),
/* 105 */
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
const common_1 = __webpack_require__(3);
const consumable_repository_port_1 = __webpack_require__(106);
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
};
exports.ConsumableService = ConsumableService;
exports.ConsumableService = ConsumableService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ConsumableRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof consumable_repository_port_1.ConsumableRepositoryPort !== "undefined" && consumable_repository_port_1.ConsumableRepositoryPort) === "function" ? _a : Object])
], ConsumableService);


/***/ }),
/* 106 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 107 */
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
const common_1 = __webpack_require__(3);
const adapter_service_1 = __webpack_require__(108);
const notification_service_1 = __webpack_require__(110);
const user_service_1 = __webpack_require__(41);
const schedule_1 = __webpack_require__(111);
const notification_type_enum_1 = __webpack_require__(13);
const date_util_1 = __webpack_require__(37);
const employee_notification_service_1 = __webpack_require__(112);
const cron_1 = __webpack_require__(114);
let NotificationUsecase = class NotificationUsecase {
    constructor(adapterService, notificationService, userService, employeeNotificationService, schedulerRegistry) {
        this.adapterService = adapterService;
        this.notificationService = notificationService;
        this.userService = userService;
        this.employeeNotificationService = employeeNotificationService;
        this.schedulerRegistry = schedulerRegistry;
    }
    async onModuleInit() {
        console.log('before module init', Array.from(this.schedulerRegistry.getCronJobs().keys()));
        const notifications = await this.notificationService.findAll({
            where: { isSent: false },
            relations: ['employees'],
        });
        for (const notification of notifications) {
            const notiTarget = notification.employees.map((employee) => employee.employeeId);
            await this.createReservationUpcomingNotification(notification, notiTarget);
        }
        console.log('after module init', Array.from(this.schedulerRegistry.getCronJobs().keys()));
    }
    async subscribe(user, subscription) {
        const userDomain = await this.userService.findByUserId(user.userId);
        userDomain.updateSubscription(subscription);
        await this.userService.update(userDomain);
    }
    async unsubscribe(user) {
        const userDomain = await this.userService.findByUserId(user.userId);
        userDomain.updateSubscription(null);
        await this.userService.update(userDomain);
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
    async findMyNotifications(employeeId) {
        const notifications = await this.notificationService.findAll({
            where: {
                employees: { employeeId },
                isSent: true,
            },
            relations: ['employees'],
        });
        return notifications.map((notification) => {
            return {
                notificationId: notification.notificationId,
                title: notification.title,
                body: notification.body,
                notificationData: notification.notificationData,
                notificationType: notification.notificationType,
                createdAt: notification.createdAt,
                isRead: notification.employees.find((employee) => employee.employeeId === employeeId).isRead,
            };
        });
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
            case notification_type_enum_1.NotificationType.RESERVATION_PARTICIPANT_CHANGED:
                createNotificationDto.title = `[참가자 변경] ${createNotificationDatatDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDatatDto.reservationDate}`;
                break;
            case notification_type_enum_1.NotificationType.RESOURCE_CONSUMABLE_REPLACING:
                createNotificationDto.title = `[교체 주기 알림] ${createNotificationDatatDto.consumableName}`;
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
    async sendTestNotification(user, payload) {
        await this.adapterService.sendTestNotification(user, payload);
    }
};
exports.NotificationUsecase = NotificationUsecase;
exports.NotificationUsecase = NotificationUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof adapter_service_1.AdapterService !== "undefined" && adapter_service_1.AdapterService) === "function" ? _a : Object, typeof (_b = typeof notification_service_1.NotificationService !== "undefined" && notification_service_1.NotificationService) === "function" ? _b : Object, typeof (_c = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _c : Object, typeof (_d = typeof employee_notification_service_1.EmployeeNotificationService !== "undefined" && employee_notification_service_1.EmployeeNotificationService) === "function" ? _d : Object, typeof (_e = typeof schedule_1.SchedulerRegistry !== "undefined" && schedule_1.SchedulerRegistry) === "function" ? _e : Object])
], NotificationUsecase);


/***/ }),
/* 108 */
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
exports.AdapterService = void 0;
const common_1 = __webpack_require__(3);
const notification_repository_port_1 = __webpack_require__(109);
const push_notification_port_1 = __webpack_require__(29);
const user_service_1 = __webpack_require__(41);
let AdapterService = class AdapterService {
    constructor(notificationRepository, pushNotificationService, userService) {
        this.notificationRepository = notificationRepository;
        this.pushNotificationService = pushNotificationService;
        this.userService = userService;
    }
    async send(employeeId, notification) {
        const user = await this.userService.findByEmployeeId(employeeId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.pushNotificationService.sendNotification(user.subscription, {
            title: notification.title,
            body: notification.body,
        });
    }
    async sendTestNotification(user, payload) {
        console.log(user, payload);
        const subscription = await this.userService.findByEmployeeId(user.employeeId);
        await this.pushNotificationService.sendTestNotification(subscription.subscription, payload);
    }
};
exports.AdapterService = AdapterService;
exports.AdapterService = AdapterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('NotificationRepositoryPort')),
    __param(1, (0, common_1.Inject)('PushNotificationServicePort')),
    __metadata("design:paramtypes", [typeof (_a = typeof notification_repository_port_1.NotificationRepositoryPort !== "undefined" && notification_repository_port_1.NotificationRepositoryPort) === "function" ? _a : Object, typeof (_b = typeof push_notification_port_1.PushNotificationPort !== "undefined" && push_notification_port_1.PushNotificationPort) === "function" ? _b : Object, typeof (_c = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _c : Object])
], AdapterService);


/***/ }),
/* 109 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 110 */
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
const common_1 = __webpack_require__(3);
const notification_repository_port_1 = __webpack_require__(109);
const entities_1 = __webpack_require__(8);
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
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('NotificationRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof notification_repository_port_1.NotificationRepositoryPort !== "undefined" && notification_repository_port_1.NotificationRepositoryPort) === "function" ? _a : Object])
], NotificationService);


/***/ }),
/* 111 */
/***/ ((module) => {

module.exports = require("@nestjs/schedule");

/***/ }),
/* 112 */
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
const common_1 = __webpack_require__(3);
const employee_notification_repository_port_1 = __webpack_require__(113);
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
/* 113 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 114 */
/***/ ((module) => {

module.exports = require("cron");

/***/ }),
/* 115 */
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
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(48);
const api_responses_decorator_1 = __webpack_require__(53);
const create_resource_dto_1 = __webpack_require__(74);
const resource_response_dto_1 = __webpack_require__(80);
const update_resource_dto_1 = __webpack_require__(79);
const role_decorator_1 = __webpack_require__(98);
const role_type_enum_1 = __webpack_require__(28);
const resource_group_usecase_1 = __webpack_require__(116);
const resource_type_enum_1 = __webpack_require__(18);
const update_resource_dto_2 = __webpack_require__(79);
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
/* 116 */
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
const common_1 = __webpack_require__(3);
const resource_service_1 = __webpack_require__(66);
const resource_group_service_1 = __webpack_require__(68);
const typeorm_1 = __webpack_require__(10);
const typeorm_2 = __webpack_require__(10);
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
/* 117 */
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
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(48);
const resource_manager_service_1 = __webpack_require__(70);
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
/* 118 */
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
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(10);
const entities_1 = __webpack_require__(8);
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
/* 119 */
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
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(10);
const entities_1 = __webpack_require__(8);
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
/* 120 */
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
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(10);
const entities_1 = __webpack_require__(8);
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
/* 121 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VehicleResourceModule = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(5);
const entities_1 = __webpack_require__(8);
const vehicle_resource_handler_1 = __webpack_require__(122);
const vehicle_info_service_1 = __webpack_require__(102);
const consumable_service_1 = __webpack_require__(105);
const maintenance_service_1 = __webpack_require__(123);
const consumable_controller_1 = __webpack_require__(125);
const maintenance_controller_1 = __webpack_require__(127);
const vehicle_info_repository_1 = __webpack_require__(129);
const consumable_repository_1 = __webpack_require__(130);
const maintenance_repository_1 = __webpack_require__(131);
const vehicle_info_controller_1 = __webpack_require__(132);
const vehicle_info_usecase_1 = __webpack_require__(104);
const notification_module_1 = __webpack_require__(133);
const consumable_usecase_1 = __webpack_require__(126);
const maintenance_usecase_1 = __webpack_require__(128);
let VehicleResourceModule = class VehicleResourceModule {
};
exports.VehicleResourceModule = VehicleResourceModule;
exports.VehicleResourceModule = VehicleResourceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.VehicleInfo, entities_1.Consumable, entities_1.Maintenance]), notification_module_1.NotificationModule],
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
/* 122 */
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
const common_1 = __webpack_require__(3);
const vehicle_info_repository_port_1 = __webpack_require__(103);
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
/* 123 */
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
const common_1 = __webpack_require__(3);
const maintenance_repository_port_1 = __webpack_require__(124);
let MaintenanceService = class MaintenanceService {
    constructor(maintenanceRepository) {
        this.maintenanceRepository = maintenanceRepository;
    }
    async save(createMaintenanceDto, repositoryOptions) {
        return this.maintenanceRepository.save(createMaintenanceDto, repositoryOptions);
    }
    async findAll(repositoryOptions) {
        return this.maintenanceRepository.findAll(repositoryOptions);
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
};
exports.MaintenanceService = MaintenanceService;
exports.MaintenanceService = MaintenanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MaintenanceRepositoryPort')),
    __metadata("design:paramtypes", [typeof (_a = typeof maintenance_repository_port_1.MaintenanceRepositoryPort !== "undefined" && maintenance_repository_port_1.MaintenanceRepositoryPort) === "function" ? _a : Object])
], MaintenanceService);


/***/ }),
/* 124 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 125 */
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
exports.ConsumableController = void 0;
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(48);
const api_responses_decorator_1 = __webpack_require__(53);
const create_vehicle_info_dto_1 = __webpack_require__(76);
const update_vehicle_info_dto_1 = __webpack_require__(86);
const vehicle_response_dto_1 = __webpack_require__(81);
const consumable_usecase_1 = __webpack_require__(126);
let ConsumableController = class ConsumableController {
    constructor(consumableUsecase) {
        this.consumableUsecase = consumableUsecase;
    }
    async create(resourceId, createConsumableDto) {
        const consumable = await this.consumableUsecase.save(createConsumableDto, {
            where: {
                vehicleId: resourceId,
            },
        });
        return {
            consumableId: consumable.consumableId,
            resourceId: consumable.vehicleId,
            name: consumable.name,
            replaceCycle: consumable.replaceCycle,
            notifyReplacementCycle: consumable.notifyReplacementCycle,
        };
    }
    async findAll(resourceId) {
        const consumables = await this.consumableUsecase.findAll({
            where: {
                vehicleId: resourceId,
            },
        });
        return consumables.map((consumable) => ({
            consumableId: consumable.consumableId,
            resourceId: consumable.vehicleId,
            name: consumable.name,
            replaceCycle: consumable.replaceCycle,
            notifyReplacementCycle: consumable.notifyReplacementCycle,
        }));
    }
    async findOne(consumableId) {
        const consumable = await this.consumableUsecase.findOne({
            where: {
                consumableId: consumableId,
            },
            relations: ['maintenances'],
        });
        return {
            consumableId: consumable.consumableId,
            resourceId: consumable.vehicleId,
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
    async update(consumableId, updateConsumableDto) {
        const consumable = await this.consumableUsecase.update(consumableId, updateConsumableDto);
        return {
            consumableId: consumable.consumableId,
            resourceId: consumable.vehicleId,
            name: consumable.name,
            replaceCycle: consumable.replaceCycle,
            notifyReplacementCycle: consumable.notifyReplacementCycle,
        };
    }
    async remove(consumableId) {
        await this.consumableUsecase.delete(consumableId);
    }
};
exports.ConsumableController = ConsumableController;
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '소모품 등록' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 201,
        description: '소모품이 성공적으로 등록되었습니다.',
        type: vehicle_response_dto_1.ConsumableResponseDto,
    }),
    __param(0, (0, common_1.Param)('resourceId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof create_vehicle_info_dto_1.CreateConsumableDto !== "undefined" && create_vehicle_info_dto_1.CreateConsumableDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ConsumableController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '소모품 목록 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '소모품 목록을 성공적으로 조회했습니다.',
        type: [vehicle_response_dto_1.ConsumableResponseDto],
    }),
    __param(0, (0, common_1.Param)('resourceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ConsumableController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Get)(':consumableId'),
    (0, swagger_1.ApiOperation)({ summary: '소모품 상세 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '소모품을 성공적으로 조회했습니다.',
        type: vehicle_response_dto_1.ConsumableResponseDto,
    }),
    __param(0, (0, common_1.Param)('consumableId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ConsumableController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Patch)(':consumableId'),
    (0, swagger_1.ApiOperation)({ summary: '소모품 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '소모품이 성공적으로 수정되었습니다.',
        type: vehicle_response_dto_1.ConsumableResponseDto,
    }),
    __param(0, (0, common_1.Param)('consumableId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_f = typeof update_vehicle_info_dto_1.UpdateConsumableDto !== "undefined" && update_vehicle_info_dto_1.UpdateConsumableDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ConsumableController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Delete)(':consumableId'),
    (0, swagger_1.ApiOperation)({ summary: '소모품 삭제' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '소모품이 성공적으로 삭제되었습니다.',
    }),
    __param(0, (0, common_1.Param)('consumableId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ConsumableController.prototype, "remove", null);
exports.ConsumableController = ConsumableController = __decorate([
    (0, swagger_1.ApiTags)('차량 소모품'),
    (0, common_1.Controller)('consumables'),
    __metadata("design:paramtypes", [typeof (_a = typeof consumable_usecase_1.ConsumableUsecase !== "undefined" && consumable_usecase_1.ConsumableUsecase) === "function" ? _a : Object])
], ConsumableController);


/***/ }),
/* 126 */
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
const common_1 = __webpack_require__(3);
const consumable_service_1 = __webpack_require__(105);
let ConsumableUsecase = class ConsumableUsecase {
    constructor(consumableService) {
        this.consumableService = consumableService;
    }
    async save(createConsumableDto, repositoryOptions) {
        return this.consumableService.save(createConsumableDto, repositoryOptions);
    }
    async findAll(repositoryOptions) {
        return this.consumableService.findAll(repositoryOptions);
    }
    async findOne(repositoryOptions) {
        return this.consumableService.findOne(repositoryOptions);
    }
    async update(id, updateData, repositoryOptions) {
        return this.consumableService.update(id, updateData, repositoryOptions);
    }
    async delete(id, repositoryOptions) {
        return await this.consumableService.delete(id, repositoryOptions);
    }
};
exports.ConsumableUsecase = ConsumableUsecase;
exports.ConsumableUsecase = ConsumableUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof consumable_service_1.ConsumableService !== "undefined" && consumable_service_1.ConsumableService) === "function" ? _a : Object])
], ConsumableUsecase);


/***/ }),
/* 127 */
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
exports.MaintenanceController = void 0;
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(48);
const api_responses_decorator_1 = __webpack_require__(53);
const create_vehicle_info_dto_1 = __webpack_require__(76);
const update_vehicle_info_dto_1 = __webpack_require__(86);
const vehicle_response_dto_1 = __webpack_require__(81);
const maintenance_usecase_1 = __webpack_require__(128);
let MaintenanceController = class MaintenanceController {
    constructor(maintenanceUsecase) {
        this.maintenanceUsecase = maintenanceUsecase;
    }
    async create(createMaintenanceDto) {
        return this.maintenanceUsecase.save(createMaintenanceDto);
    }
    async findAll(consumableId) {
        return this.maintenanceUsecase.findAll(consumableId);
    }
    async findOne(maintenanceId) {
        return this.maintenanceUsecase.findOne(maintenanceId);
    }
    async update(maintenanceId, updateMaintenanceDto) {
        return this.maintenanceUsecase.update(maintenanceId, updateMaintenanceDto);
    }
    async remove(maintenanceId) {
        return this.maintenanceUsecase.delete(maintenanceId);
    }
};
exports.MaintenanceController = MaintenanceController;
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '정비 이력 생성' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 201,
        description: '정비 이력이 생성되었습니다.',
        type: vehicle_response_dto_1.MaintenanceResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_vehicle_info_dto_1.CreateMaintenanceDto !== "undefined" && create_vehicle_info_dto_1.CreateMaintenanceDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], MaintenanceController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Get)(':consumableId'),
    (0, swagger_1.ApiOperation)({ summary: '정비 이력 목록 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '정비 이력 목록을 조회했습니다.',
        type: [vehicle_response_dto_1.MaintenanceResponseDto],
    }),
    __param(0, (0, common_1.Param)('consumableId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], MaintenanceController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Get)(':maintenanceId'),
    (0, swagger_1.ApiOperation)({ summary: '정비 상세 이력 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '정비 상세 이력을 조회했습니다.',
        type: vehicle_response_dto_1.MaintenanceResponseDto,
    }),
    __param(0, (0, common_1.Param)('maintenanceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], MaintenanceController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Patch)(':maintenanceId'),
    (0, swagger_1.ApiOperation)({ summary: '정비 이력 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '정비 이력이 수정되었습니다.',
        type: vehicle_response_dto_1.MaintenanceResponseDto,
    }),
    __param(0, (0, common_1.Param)('maintenanceId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_f = typeof update_vehicle_info_dto_1.UpdateMaintenanceDto !== "undefined" && update_vehicle_info_dto_1.UpdateMaintenanceDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], MaintenanceController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Delete)(':maintenanceId'),
    (0, swagger_1.ApiOperation)({ summary: '정비 이력 삭제' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '정비 이력이 삭제되었습니다.',
    }),
    __param(0, (0, common_1.Param)('maintenanceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], MaintenanceController.prototype, "remove", null);
exports.MaintenanceController = MaintenanceController = __decorate([
    (0, swagger_1.ApiTags)('정비 이력'),
    (0, common_1.Controller)('maintenances'),
    __metadata("design:paramtypes", [typeof (_a = typeof maintenance_usecase_1.MaintenanceUsecase !== "undefined" && maintenance_usecase_1.MaintenanceUsecase) === "function" ? _a : Object])
], MaintenanceController);


/***/ }),
/* 128 */
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
exports.MaintenanceUsecase = void 0;
const common_1 = __webpack_require__(3);
const maintenance_service_1 = __webpack_require__(123);
let MaintenanceUsecase = class MaintenanceUsecase {
    constructor(maintenanceService) {
        this.maintenanceService = maintenanceService;
    }
    async save(createMaintenanceDto) {
        return this.maintenanceService.save(createMaintenanceDto);
    }
    async findAll(consumableId) {
        return this.maintenanceService.findAll({ where: { consumableId } });
    }
    async findOne(maintenanceId) {
        return this.maintenanceService.findOne({ where: { maintenanceId } });
    }
    async update(maintenanceId, updateMaintenanceDto, repositoryOptions) {
        return this.maintenanceService.update(maintenanceId, updateMaintenanceDto, repositoryOptions);
    }
    async delete(maintenanceId, repositoryOptions) {
        return await this.maintenanceService.delete(maintenanceId, repositoryOptions);
    }
};
exports.MaintenanceUsecase = MaintenanceUsecase;
exports.MaintenanceUsecase = MaintenanceUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof maintenance_service_1.MaintenanceService !== "undefined" && maintenance_service_1.MaintenanceService) === "function" ? _a : Object])
], MaintenanceUsecase);
1;


/***/ }),
/* 129 */
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
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(10);
const entities_1 = __webpack_require__(8);
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
/* 130 */
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
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(10);
const entities_1 = __webpack_require__(8);
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
/* 131 */
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
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(10);
const entities_1 = __webpack_require__(8);
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
};
exports.MaintenanceRepository = MaintenanceRepository;
exports.MaintenanceRepository = MaintenanceRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Maintenance)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], MaintenanceRepository);


/***/ }),
/* 132 */
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
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(48);
const api_responses_decorator_1 = __webpack_require__(53);
const update_vehicle_info_dto_1 = __webpack_require__(86);
const vehicle_response_dto_1 = __webpack_require__(81);
const vehicle_info_usecase_1 = __webpack_require__(104);
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
/* 133 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationModule = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(5);
const notification_entity_1 = __webpack_require__(12);
const notification_repository_1 = __webpack_require__(134);
const notification_controller_1 = __webpack_require__(135);
const notification_service_1 = __webpack_require__(110);
const config_1 = __webpack_require__(4);
const env_config_1 = __webpack_require__(31);
const adapter_service_1 = __webpack_require__(108);
const auth_module_1 = __webpack_require__(34);
const notification_usecase_1 = __webpack_require__(107);
const fcm_push_adapter_1 = __webpack_require__(136);
const schedule_1 = __webpack_require__(111);
const employee_notification_service_1 = __webpack_require__(112);
const employee_notification_repository_1 = __webpack_require__(139);
const entities_1 = __webpack_require__(8);
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
/* 134 */
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
const typeorm_1 = __webpack_require__(10);
const notification_entity_1 = __webpack_require__(12);
const common_1 = __webpack_require__(3);
const typeorm_2 = __webpack_require__(5);
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
};
exports.NotificationRepository = NotificationRepository;
exports.NotificationRepository = NotificationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(notification_entity_1.Notification)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object])
], NotificationRepository);


/***/ }),
/* 135 */
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationController = void 0;
const swagger_1 = __webpack_require__(48);
const common_1 = __webpack_require__(3);
const user_decorator_1 = __webpack_require__(60);
const entities_1 = __webpack_require__(8);
const notification_usecase_1 = __webpack_require__(107);
const api_responses_decorator_1 = __webpack_require__(53);
const push_subscription_dto_1 = __webpack_require__(96);
const response_notification_dto_1 = __webpack_require__(97);
const create_notification_dto_1 = __webpack_require__(95);
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
    async findAllByEmployeeId(employeeId) {
        return await this.notificationUsecase.findMyNotifications(employeeId);
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
    }),
    __param(0, (0, user_decorator_1.User)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], NotificationController.prototype, "findAllByEmployeeId", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.3'),
    (0, common_1.Patch)(':notificationId/read'),
    (0, swagger_1.ApiOperation)({ summary: '알람 읽음 처리' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('notificationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _h : Object, String]),
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
    __metadata("design:paramtypes", [typeof (_j = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _j : Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "sendTest", null);
exports.NotificationController = NotificationController = __decorate([
    (0, swagger_1.ApiTags)('알림'),
    (0, common_1.Controller)('notifications'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [typeof (_a = typeof notification_usecase_1.NotificationUsecase !== "undefined" && notification_usecase_1.NotificationUsecase) === "function" ? _a : Object])
], NotificationController);


/***/ }),
/* 136 */
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
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(4);
const app_1 = __webpack_require__(137);
const messaging_1 = __webpack_require__(138);
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
/* 137 */
/***/ ((module) => {

module.exports = require("firebase-admin/app");

/***/ }),
/* 138 */
/***/ ((module) => {

module.exports = require("firebase-admin/messaging");

/***/ }),
/* 139 */
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
const entities_1 = __webpack_require__(8);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(10);
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
/* 140 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeetingRoomResourceModule = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(5);
const entities_1 = __webpack_require__(8);
const meeting_room_resource_handler_1 = __webpack_require__(141);
const meeting_room_info_service_1 = __webpack_require__(144);
const meeting_room_info_repository_1 = __webpack_require__(145);
const meeting_room_info_controller_1 = __webpack_require__(146);
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
/* 141 */
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
const common_1 = __webpack_require__(3);
const meeting_room_info_repository_port_1 = __webpack_require__(142);
const meeting_room_info_1 = __webpack_require__(143);
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
/* 142 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 143 */
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
/* 144 */
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
const common_1 = __webpack_require__(3);
const meeting_room_info_repository_port_1 = __webpack_require__(142);
const meeting_room_info_1 = __webpack_require__(143);
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
/* 145 */
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
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(10);
const entities_1 = __webpack_require__(8);
const meeting_room_info_1 = __webpack_require__(143);
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
/* 146 */
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
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(48);
const meeting_room_info_service_1 = __webpack_require__(144);
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
/* 147 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccommodationResourceModule = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(5);
const entities_1 = __webpack_require__(8);
const accommodation_info_service_1 = __webpack_require__(148);
const accommodation_info_controller_1 = __webpack_require__(151);
const accommodation_info_repository_1 = __webpack_require__(152);
const accommodation_resource_handler_1 = __webpack_require__(153);
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
/* 148 */
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
const common_1 = __webpack_require__(3);
const accommodation_info_repository_port_1 = __webpack_require__(149);
const accommodation_info_1 = __webpack_require__(150);
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
/* 149 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 150 */
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
/* 151 */
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
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(48);
const accommodation_info_service_1 = __webpack_require__(148);
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
/* 152 */
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
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(10);
const entities_1 = __webpack_require__(8);
const accommodation_info_1 = __webpack_require__(150);
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
/* 153 */
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
const common_1 = __webpack_require__(3);
const accommodation_info_repository_port_1 = __webpack_require__(149);
const accommodation_info_1 = __webpack_require__(150);
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
/* 154 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReservationModule = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(5);
const entities_1 = __webpack_require__(8);
const reservation_service_1 = __webpack_require__(100);
const reservation_controller_1 = __webpack_require__(155);
const reservation_repository_1 = __webpack_require__(159);
const reservation_participant_repository_1 = __webpack_require__(160);
const participant_service_1 = __webpack_require__(157);
const reservation_usecase_1 = __webpack_require__(156);
const notification_module_1 = __webpack_require__(133);
let ReservationModule = class ReservationModule {
};
exports.ReservationModule = ReservationModule;
exports.ReservationModule = ReservationModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Reservation, entities_1.ReservationParticipant, entities_1.Schedule]), notification_module_1.NotificationModule],
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
/* 155 */
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReservationController = void 0;
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(48);
const role_decorator_1 = __webpack_require__(98);
const role_type_enum_1 = __webpack_require__(28);
const create_reservation_dto_1 = __webpack_require__(92);
const api_responses_decorator_1 = __webpack_require__(53);
const dtos_index_1 = __webpack_require__(73);
const reservation_usecase_1 = __webpack_require__(156);
const user_decorator_1 = __webpack_require__(60);
const entities_1 = __webpack_require__(8);
const resource_type_enum_1 = __webpack_require__(18);
const reservation_type_enum_1 = __webpack_require__(26);
const reservation_response_dto_1 = __webpack_require__(84);
let ReservationController = class ReservationController {
    constructor(reservationUsecase) {
        this.reservationUsecase = reservationUsecase;
    }
    async create(user, createDto) {
        return this.reservationUsecase.makeReservation(user, createDto);
    }
    async findMyReservationList(user, startDate, resourceType) {
        return this.reservationUsecase.findMyReservationList(user.employeeId, startDate, resourceType);
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
        await this.reservationUsecase.checkReservationAccess(reservationId, user.employeeId);
        return this.reservationUsecase.updateStatus(reservationId, updateDto, user.employeeId, user.roles.includes(role_type_enum_1.Role.RESOURCE_ADMIN));
    }
    async updateParticipants(user, reservationId, updateDto) {
        await this.reservationUsecase.checkReservationAccess(reservationId, user.employeeId);
        return this.reservationUsecase.updateParticipants(reservationId, updateDto);
    }
    async updateCcReceipient(user, reservationId, updateDto) {
        await this.reservationUsecase.checkReservationAccess(reservationId, user.employeeId);
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
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _b : Object, typeof (_c = typeof create_reservation_dto_1.CreateReservationDto !== "undefined" && create_reservation_dto_1.CreateReservationDto) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
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
    __metadata("design:paramtypes", [typeof (_e = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _e : Object, String, typeof (_f = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
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
    __metadata("design:paramtypes", [typeof (_h = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _h : Object, typeof (_j = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], ReservationController.prototype, "findMyCurrentReservation", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Get)(':reservationId'),
    (0, swagger_1.ApiOperation)({ summary: '예약 조회 #사용자/예약상세페이지' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 조회 성공',
        type: reservation_response_dto_1.ReservationWithRelationsResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('reservationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _l : Object, String]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
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
    __metadata("design:paramtypes", [String, String, typeof (_o = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _o : Object, String, Array]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], ReservationController.prototype, "findReservationList", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Patch)(':reservationId/title'),
    (0, swagger_1.ApiOperation)({ summary: '예약 제목 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 제목 수정 성공',
        type: dtos_index_1.ReservationResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('reservationId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_q = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _q : Object, String, typeof (_r = typeof dtos_index_1.UpdateReservationTitleDto !== "undefined" && dtos_index_1.UpdateReservationTitleDto) === "function" ? _r : Object]),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], ReservationController.prototype, "updateTitle", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Patch)(':reservationId/time'),
    (0, swagger_1.ApiOperation)({ summary: '예약 시간 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 시간 수정 성공',
        type: dtos_index_1.ReservationResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('reservationId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_t = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _t : Object, String, typeof (_u = typeof dtos_index_1.UpdateReservationTimeDto !== "undefined" && dtos_index_1.UpdateReservationTimeDto) === "function" ? _u : Object]),
    __metadata("design:returntype", typeof (_v = typeof Promise !== "undefined" && Promise) === "function" ? _v : Object)
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
    __metadata("design:paramtypes", [typeof (_w = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _w : Object, String, typeof (_x = typeof dtos_index_1.UpdateReservationStatusDto !== "undefined" && dtos_index_1.UpdateReservationStatusDto) === "function" ? _x : Object]),
    __metadata("design:returntype", typeof (_y = typeof Promise !== "undefined" && Promise) === "function" ? _y : Object)
], ReservationController.prototype, "updateStatus", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Patch)(':reservationId/participants'),
    (0, swagger_1.ApiOperation)({ summary: '예약 참가자 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 참가자 수정 성공',
        type: dtos_index_1.ReservationResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('reservationId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_z = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _z : Object, String, typeof (_0 = typeof dtos_index_1.UpdateReservationParticipantsDto !== "undefined" && dtos_index_1.UpdateReservationParticipantsDto) === "function" ? _0 : Object]),
    __metadata("design:returntype", typeof (_1 = typeof Promise !== "undefined" && Promise) === "function" ? _1 : Object)
], ReservationController.prototype, "updateParticipants", null);
__decorate([
    (0, swagger_1.ApiTags)('sprint0.1'),
    (0, common_1.Patch)(':reservationId/cc-receipient'),
    (0, swagger_1.ApiOperation)({ summary: '예약 수신참조자 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 수신참조자 수정 성공',
        type: dtos_index_1.ReservationResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('reservationId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_2 = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _2 : Object, String, typeof (_3 = typeof dtos_index_1.UpdateReservationCcReceipientDto !== "undefined" && dtos_index_1.UpdateReservationCcReceipientDto) === "function" ? _3 : Object]),
    __metadata("design:returntype", typeof (_4 = typeof Promise !== "undefined" && Promise) === "function" ? _4 : Object)
], ReservationController.prototype, "updateCcReceipient", null);
exports.ReservationController = ReservationController = __decorate([
    (0, swagger_1.ApiTags)('예약'),
    (0, common_1.Controller)('reservations'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.USER),
    __metadata("design:paramtypes", [typeof (_a = typeof reservation_usecase_1.ReservationUsecase !== "undefined" && reservation_usecase_1.ReservationUsecase) === "function" ? _a : Object])
], ReservationController);


/***/ }),
/* 156 */
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
exports.ReservationUsecase = void 0;
const common_1 = __webpack_require__(3);
const reservation_response_dto_1 = __webpack_require__(84);
const reservation_type_enum_1 = __webpack_require__(26);
const typeorm_1 = __webpack_require__(10);
const date_util_1 = __webpack_require__(37);
const reservation_service_1 = __webpack_require__(100);
const participant_service_1 = __webpack_require__(157);
const notification_usecase_1 = __webpack_require__(107);
const notification_type_enum_1 = __webpack_require__(13);
let ReservationUsecase = class ReservationUsecase {
    constructor(reservationService, participantService, dataSource, notificationUsecase) {
        this.reservationService = reservationService;
        this.participantService = participantService;
        this.dataSource = dataSource;
        this.notificationUsecase = notificationUsecase;
    }
    async makeReservation(user, createDto) {
        const conflicts = await this.reservationService.findConflictingReservations(createDto.resourceId, date_util_1.DateUtil.parse(createDto.startDate).format(), date_util_1.DateUtil.parse(createDto.endDate).format());
        if (conflicts.length > 0) {
            throw new common_1.BadRequestException('Reservation time conflict');
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
                });
                if (reservationWithResource.status === reservation_type_enum_1.ReservationStatus.CONFIRMED) {
                    const notiTarget = [...createDto.participantIds, user.employeeId];
                    await this.notificationUsecase.createNotification(notification_type_enum_1.NotificationType.RESERVATION_STATUS_CONFIRMED, {
                        reservationId: reservationWithResource.reservationId,
                        reservationTitle: reservationWithResource.title,
                        reservationDate: reservationWithResource.startDate,
                        resourceId: reservationWithResource.resource.resourceId,
                        resourceName: reservationWithResource.resource.name,
                        resourceType: reservationWithResource.resource.type,
                    }, notiTarget);
                    for (const beforeMinutes of reservationWithResource.notifyMinutesBeforeStart) {
                        this.notificationUsecase.createNotification(notification_type_enum_1.NotificationType.RESERVATION_DATE_UPCOMING, {
                            reservationId: reservationWithResource.reservationId,
                            reservationTitle: reservationWithResource.title,
                            resourceId: reservationWithResource.resource.resourceId,
                            resourceName: reservationWithResource.resource.name,
                            resourceType: reservationWithResource.resource.type,
                            beforeMinutes: beforeMinutes,
                        }, notiTarget);
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
        });
        if (!reservation) {
            throw new common_1.NotFoundException('Reservation not found');
        }
        const reservationResponseDto = new reservation_response_dto_1.ReservationWithRelationsResponseDto(reservation);
        reservationResponseDto.isMine = reservationResponseDto.reservers.some((reserver) => reserver.employeeId === user.employeeId);
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
    async findMyCurrentReservation(employeeId, resourceType) {
        const now = date_util_1.DateUtil.now().format();
        const where = {
            participants: { employeeId, type: reservation_type_enum_1.ParticipantsType.RESERVER },
            status: reservation_type_enum_1.ReservationStatus.CONFIRMED,
            resource: { type: resourceType },
            startDate: (0, typeorm_1.LessThan)(now),
            endDate: (0, typeorm_1.MoreThan)(now),
        };
        const reservation = await this.reservationService.findOne({ where, relations: ['resource'] });
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
        const reservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: ['resource'],
        });
        if (!reservation) {
            throw new common_1.NotFoundException('Reservation not found');
        }
        const reserver = await this.participantService.findAll({
            where: { reservationId },
        });
        const isMyReservation = reserver.some((participant) => participant.employeeId === employeeId);
        if (isMyReservation || isAdmin) {
            const updatedReservation = await this.reservationService.update(reservationId, updateDto);
            if (reservation.resource.notifyReservationChange) {
                try {
                    const notiTarget = reserver.map((participant) => participant.employeeId);
                    let notificationType;
                    switch (updateDto.status) {
                        case reservation_type_enum_1.ReservationStatus.CONFIRMED:
                            notificationType = notification_type_enum_1.NotificationType.RESERVATION_STATUS_CONFIRMED;
                            break;
                        case reservation_type_enum_1.ReservationStatus.CANCELLED:
                            notificationType = notification_type_enum_1.NotificationType.RESERVATION_STATUS_CANCELLED;
                            break;
                    }
                    await this.notificationUsecase.createNotification(notificationType, {
                        reservationId: reservation.reservationId,
                        reservationTitle: reservation.title,
                        reservationDate: reservation.startDate,
                        resourceId: reservation.resource.resourceId,
                        resourceName: reservation.resource.name,
                        resourceType: reservation.resource.type,
                    }, notiTarget);
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
        });
        if (updatedReservation.resource.notifyParticipantChange) {
            try {
                const notiTarget = updatedReservation.participants.map((participant) => participant.employeeId);
                await this.notificationUsecase.createNotification(notification_type_enum_1.NotificationType.RESERVATION_PARTICIPANT_CHANGED, {
                    reservationId: updatedReservation.reservationId,
                    reservationTitle: updatedReservation.title,
                    reservationDate: updatedReservation.startDate,
                    resourceId: updatedReservation.resource.resourceId,
                    resourceName: updatedReservation.resource.name,
                    resourceType: updatedReservation.resource.type,
                }, notiTarget);
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
};
exports.ReservationUsecase = ReservationUsecase;
exports.ReservationUsecase = ReservationUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof reservation_service_1.ReservationService !== "undefined" && reservation_service_1.ReservationService) === "function" ? _a : Object, typeof (_b = typeof participant_service_1.ParticipantService !== "undefined" && participant_service_1.ParticipantService) === "function" ? _b : Object, typeof (_c = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _c : Object, typeof (_d = typeof notification_usecase_1.NotificationUsecase !== "undefined" && notification_usecase_1.NotificationUsecase) === "function" ? _d : Object])
], ReservationUsecase);


/***/ }),
/* 157 */
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
const common_1 = __webpack_require__(3);
const reservation_participant_repository_port_1 = __webpack_require__(158);
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
/* 158 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 159 */
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
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(10);
const entities_1 = __webpack_require__(8);
const reservation_type_enum_1 = __webpack_require__(26);
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
        reservation.status = reservation_type_enum_1.ReservationStatus.CONFIRMED;
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
/* 160 */
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
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(10);
const entities_1 = __webpack_require__(8);
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
/* 161 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeModule = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(5);
const entities_1 = __webpack_require__(8);
const employee_service_1 = __webpack_require__(162);
const employee_controller_1 = __webpack_require__(164);
const employee_repository_1 = __webpack_require__(165);
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
/* 162 */
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
const common_1 = __webpack_require__(3);
const employee_repository_port_1 = __webpack_require__(163);
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
/* 163 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 164 */
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
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(48);
const api_responses_decorator_1 = __webpack_require__(53);
const employee_service_1 = __webpack_require__(162);
const role_type_enum_1 = __webpack_require__(28);
const role_decorator_1 = __webpack_require__(98);
const employees_by_department_response_dto_1 = __webpack_require__(91);
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
/* 165 */
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
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(10);
const entities_1 = __webpack_require__(8);
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
        const entity = await repository.findOne({ where: { employeeNumber } });
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
/* 166 */
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
const common_1 = __webpack_require__(3);
const mockdata_seed_1 = __webpack_require__(167);
const typeorm_1 = __webpack_require__(10);
const entities_1 = __webpack_require__(8);
const typeorm_2 = __webpack_require__(5);
const typeorm_3 = __webpack_require__(10);
const bcrypt = __webpack_require__(45);
const jwt_1 = __webpack_require__(6);
const date_util_1 = __webpack_require__(37);
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
/* 167 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resourcesSeedData = exports.subResourceGroupsSeedData = exports.resourceGroupsSeedData = exports.employeesSeedData = void 0;
const resource_type_enum_1 = __webpack_require__(18);
const role_type_enum_1 = __webpack_require__(28);
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
        title: '카니발 (12도 3456)',
        description: '법인 차량',
        type: resource_type_enum_1.ResourceType.VEHICLE,
    },
];


/***/ }),
/* 168 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileModule = void 0;
const common_1 = __webpack_require__(3);
const file_service_1 = __webpack_require__(169);
const file_controller_1 = __webpack_require__(172);
const typeorm_1 = __webpack_require__(5);
const entities_1 = __webpack_require__(8);
const file_repository_1 = __webpack_require__(174);
const config_1 = __webpack_require__(4);
const env_config_1 = __webpack_require__(31);
const s3_stroage_adapter_1 = __webpack_require__(175);
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
/* 169 */
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
const common_1 = __webpack_require__(3);
const file_repository_port_1 = __webpack_require__(170);
const file_storage_port_1 = __webpack_require__(171);
const config_1 = __webpack_require__(4);
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
    async saveFile(file) {
        const savedFile = await this.fileRepository.save(file);
        return savedFile;
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
/* 170 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 171 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 172 */
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
const common_1 = __webpack_require__(3);
const platform_express_1 = __webpack_require__(173);
const file_service_1 = __webpack_require__(169);
const swagger_1 = __webpack_require__(48);
const public_decorator_1 = __webpack_require__(52);
const api_responses_decorator_1 = __webpack_require__(53);
const file_response_dto_1 = __webpack_require__(94);
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
/* 173 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 174 */
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
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(10);
const entities_1 = __webpack_require__(8);
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
/* 175 */
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
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(4);
const client_s3_1 = __webpack_require__(176);
const date_util_1 = __webpack_require__(37);
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
/* 176 */
/***/ ((module) => {

module.exports = require("@aws-sdk/client-s3");

/***/ }),
/* 177 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(3);
let AppController = class AppController {
};
exports.AppController = AppController;
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('')
], AppController);


/***/ }),
/* 178 */
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
const common_1 = __webpack_require__(3);
const fs = __webpack_require__(179);
const axios_1 = __webpack_require__(180);
const path_1 = __webpack_require__(181);
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
/* 179 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 180 */
/***/ ((module) => {

module.exports = require("axios");

/***/ }),
/* 181 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 182 */
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
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(10);
const fs = __webpack_require__(179);
const path = __webpack_require__(181);
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
/* 183 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setupSwagger = setupSwagger;
const swagger_1 = __webpack_require__(48);
const api_responses_decorator_1 = __webpack_require__(53);
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
/* 184 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResponseInterceptor = void 0;
const common_1 = __webpack_require__(3);
const operators_1 = __webpack_require__(185);
let ResponseInterceptor = class ResponseInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => {
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
/* 185 */
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),
/* 186 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorInterceptor = void 0;
const common_1 = __webpack_require__(3);
const rxjs_1 = __webpack_require__(187);
const operators_1 = __webpack_require__(185);
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
/* 187 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 188 */
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
const common_1 = __webpack_require__(3);
const passport_1 = __webpack_require__(35);
const core_1 = __webpack_require__(1);
const public_decorator_1 = __webpack_require__(52);
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
/* 189 */
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
const common_1 = __webpack_require__(3);
const core_1 = __webpack_require__(1);
const role_decorator_1 = __webpack_require__(98);
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
/* 190 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestInterceptor = void 0;
const common_1 = __webpack_require__(3);
const operators_1 = __webpack_require__(185);
let RequestInterceptor = class RequestInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { method, url, body, query, params } = request;
        console.log(`[Request] ${method} ${url}`);
        if (Object.keys(body).length > 0) {
            console.log('Body:', body);
        }
        if (Object.keys(query).length > 0) {
            console.log('Query:', query);
        }
        if (Object.keys(params).length > 0) {
            console.log('Params:', params);
        }
        const now = Date.now();
        return next.handle().pipe((0, operators_1.tap)(() => {
            console.log(`[Response Time] ${Date.now() - now}ms`);
        }));
    }
};
exports.RequestInterceptor = RequestInterceptor;
exports.RequestInterceptor = RequestInterceptor = __decorate([
    (0, common_1.Injectable)()
], RequestInterceptor);


/***/ })
/******/ 	]);
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

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(183);
const env_config_1 = __webpack_require__(31);
const dtos = __webpack_require__(73);
const response_interceptor_1 = __webpack_require__(184);
const error_interceptor_1 = __webpack_require__(186);
const jwt_auth_guard_1 = __webpack_require__(188);
const core_2 = __webpack_require__(1);
const path_1 = __webpack_require__(181);
const role_guard_1 = __webpack_require__(189);
const common_1 = __webpack_require__(3);
const request_interceptor_1 = __webpack_require__(190);
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