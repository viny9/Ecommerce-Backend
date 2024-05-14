import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const routePath = context.switchToHttp().getRequest().route.path;
    if (routePath === '/login') return true;

    const canActivate = await super.canActivate(context);

    if (typeof canActivate !== 'boolean') return;

    return canActivate;
  }
}
