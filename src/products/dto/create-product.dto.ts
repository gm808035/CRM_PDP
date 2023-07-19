import { User } from '../../users/entities/user.entity';
import { Category } from 'src/category/category.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  seller: User;
  
  @ApiProperty({ example: 'some product', description: '' })
  product_name: string;

  @ApiProperty({ example: '100', description: '' })
  price: number;

  @ApiProperty({ example: 'product description', description: '' })
  description: string;

  @ApiProperty({ example: '1', description: '' })
  category: Category;
  
  @ApiProperty({ example: '1', description: '' })
  quantity: number
}