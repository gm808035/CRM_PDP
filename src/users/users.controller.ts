import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @ApiOperation({ summary: 'Register User' })
  // @ApiBody({ type: CreateUserDto })
  // @ApiResponse({ status: 201, type: User })
  // @Post()
  // register(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.register(createUserDto);
  // }

  // @ApiOperation({ summary: 'User login' })
  // @ApiBody({ type: CreateUserDto })
  // @ApiResponse({ status: 201, type: User })
  // @Post('login')
  // async login(@Body() username: string, @Body() password: string) {
  //   return this.usersService.authenticate(username, password);
  // }

}
