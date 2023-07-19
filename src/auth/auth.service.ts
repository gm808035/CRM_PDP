import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.userService.create({ ...dto, password: hashedPassword });
  }

  async login(username: string, password: string): Promise<any> {
    const user = await this.userService.findByName(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.user_id };
    const accessToken = this.jwtService.sign(payload);

    return { access_token: accessToken };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByName(username);

    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }

    return null;
  }
}
