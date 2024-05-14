import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserRepository } from 'src/database/repositorys/user.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto/login-response.dto';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UserEntity } from 'src/modules/user/entitys/user.entity';
import { compare, hash } from 'bcrypt';

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

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch)
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

  async newUser(createUserDto: CreateUserDto) {
    const exists = await this.userRepository.checkIfExists(
      'email',
      createUserDto.email,
    );

    if (exists)
      throw new BadRequestException('User alredy exists with this email.');

    const user = UserEntity.toEntity(createUserDto);
    user.password = await hash(user.password, 10);

    const res = await this.userRepository.save(user);

    return UserEntity.toDto(res);
  }
}
