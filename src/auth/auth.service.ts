import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserRepository } from 'src/database/repositorys/user.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findByEmail(email);

    if (!user)
      throw new NotFoundException('Unable to find user with this email');

    if (password != user.password)
      throw new UnauthorizedException('Email or password incorrect');

    const payload = {
      sub: user.id,
      userName: user.name,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
