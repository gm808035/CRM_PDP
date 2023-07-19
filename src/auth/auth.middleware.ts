import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async use(req: any, res: any, next: () => void) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userService.findByName(payload.username);
      if (!user) {
        throw new UnauthorizedException('User is not found');
      }

      req.user = { ...user, password: undefined };
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
