import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const decodedToken = this.jwtService.verify(token);
      const userRole = decodedToken.role;

      if (!requiredRoles.includes(userRole)) {
        throw new UnauthorizedException('Insufficient permissions');
      }
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token ...');
    }
  }
}
