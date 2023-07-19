import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  PassportModule,
  JwtModule.register({
    secret: 'your_secret_key', 
    signOptions: { expiresIn: '1h' },
  }),],
  controllers: [UsersController,AuthController],
  providers: [UsersService, AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class UsersModule {}
