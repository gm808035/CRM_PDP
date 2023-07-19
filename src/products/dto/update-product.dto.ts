import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/category/category.entity';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  seller?: User;
  product_name?: string;
  price?: number;
  description?: string;
  category?: Category;
  quantity?: number
}
