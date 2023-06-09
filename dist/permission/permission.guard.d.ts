import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
export declare class PermissionGuard implements CanActivate {
    private relfector;
    private authService;
    private userService;
    private roleService;
    constructor(relfector: Reflector, authService: AuthService, userService: UserService, roleService: RoleService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
