import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { UserRole } from '../entities/user.entity';
export class UpdateUserDto extends PartialType(CreateUserDto) {
  role?: UserRole.Seller;
  username?: string;
  password?: string;
  email?: string;
  phone?: string;
}
