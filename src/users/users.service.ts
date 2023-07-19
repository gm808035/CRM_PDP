import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (!Object.values(UserRole).includes(createUserDto.role)) {
      throw new Error('Invalid role');
    }

    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findById(userId: number): Promise<User> {
    return await this.userRepository.findOne({ where: { user_id: userId } });
  }

  async findByName(name: string): Promise<User> {
    return await this.userRepository.findOneBy({ username: name });
  }
}
