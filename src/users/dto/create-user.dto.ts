import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {

  @ApiProperty({ example: 'seller', description: 'user role' })
  role: UserRole.Seller;

  @ApiProperty({ example: 'Altynai', description: 'name' })
  username: string;

  @ApiProperty({ example: 'djfhbvdf3832b', description: 'pwd' })
  password: string;

  @ApiProperty({ example: 'admin@mail.ru', description: 'email' })
  email: string;

  @ApiProperty({ example: '+996787838722', description: 'phone number' })
  phone: string;
}
