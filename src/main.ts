import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { RoleGuard } from './shared/guards/role/role.guard';
import { JwtGuard } from './shared/guards/jwt/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new JwtGuard());
  app.useGlobalGuards(new RoleGuard(reflector));
  await app.listen(3000);
}
bootstrap();
