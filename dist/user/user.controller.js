"use strict";
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const get_user_decorator_1 = require("./../auth/get-user.decorator");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_entity_1 = require("./entity/user.entity");
const bcrypt = require("bcryptjs");
const user_create_dto_1 = require("./dto/user-create.dto");
const user_update_dto_1 = require("./dto/user-update.dto");
const auth_service_1 = require("../auth/auth.service");
const has_permission_decorator_1 = require("../permission/has-permission.decorator");
const passport_1 = require("@nestjs/passport");
let UserController = class UserController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async all(page = 1, user) {
        console.log('user: ', user);
        return this.userService.paginate(page, ['role']);
    }
    async create(body) {
        const password = await bcrypt.hash('1234', 12);
        const { role_id } = body, data = __rest(body, ["role_id"]);
        return this.userService.create(Object.assign(Object.assign({}, data), { password, role: { id: role_id } }));
    }
    async get(id) {
        return this.userService.findOne({ id }, ['role']);
    }
    async updateInfo(request, body) {
        const id = await this.authService.userId(request);
        await this.userService.update(id, body);
        return this.userService.findOne({ id });
    }
    async updatePassword(request, password, password_confirm) {
        if (password !== password_confirm) {
            throw new common_1.BadRequestException('Passwords do not match!');
        }
        const id = await this.authService.userId(request);
        const hashed = await bcrypt.hash(password, 12);
        await this.userService.update(id, {
            password: hashed,
        });
        return this.userService.findOne({ id });
    }
    async update(id, body) {
        const { role_id } = body, data = __rest(body, ["role_id"]);
        await this.userService.update(id, Object.assign(Object.assign({}, data), { role: { id: role_id } }));
        return this.userService.findOne({ id });
    }
    async delete(id) {
        return this.userService.delete(id);
    }
};
__decorate([
    common_1.Get(),
    has_permission_decorator_1.HasPermission('users'),
    __param(0, common_1.Query('page')), __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "all", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_create_dto_1.UserCreateDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "get", null);
__decorate([
    common_1.Put('info'),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_update_dto_1.UserUpdateDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateInfo", null);
__decorate([
    common_1.Put('password'),
    __param(0, common_1.Req()),
    __param(1, common_1.Body('password')),
    __param(2, common_1.Body('password_confirm')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
__decorate([
    common_1.Put(':id'),
    has_permission_decorator_1.HasPermission('users'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_update_dto_1.UserUpdateDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    has_permission_decorator_1.HasPermission('users'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
UserController = __decorate([
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.Controller('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map