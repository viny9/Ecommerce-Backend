import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { RoleGuard } from './shared/guards/role/role.guard';
import { JwtGuard } from './shared/guards/jwt/jwt.guard';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const reflector = app.get(Reflector);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new JwtGuard());
  app.useGlobalGuards(new RoleGuard(reflector));
  app.useStaticAssets(path.join(process.cwd(), '/uploads'));

  await app.listen(3000);
}
bootstrap();
