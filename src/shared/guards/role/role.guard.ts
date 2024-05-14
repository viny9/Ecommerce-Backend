import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_ADMIN_KEY } from 'src/shared/decorators/is-admin.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflactor: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const IsAdminDecoratorValue = this.reflactor.getAllAndOverride(
      IS_ADMIN_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!IsAdminDecoratorValue) return true;

    const user = context.switchToHttp().getRequest().user;
    if (!user.isAdmin)
      throw new UnauthorizedException('You dont have permission');

    return true;
  }
}
