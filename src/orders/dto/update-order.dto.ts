import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { User } from "src/users/entities/user.entity";
import { Product } from "src/products/entities/product.entity";

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @ApiProperty({ example: 'Altynai', description: 'The customer of the order' })
    customer?: User;
  
    @ApiProperty({ example: { product_id: 1, product_name: 'Product A' }, description: 'The product of the order' })
    product?: Product;
  
    @ApiProperty({ example: 2, description: 'The quantity of the product' })
    quantity?: number;
  
    @ApiProperty({ example: '2023-07-17', description: 'The date of the order' })
    order_date?: Date;
  
    @ApiProperty({ example: 'Pending', description: 'The status of the order' })
    status?: string;
  
    @ApiProperty({ example: '123 Main St', description: 'The delivery address of the order' })
    delivery_address?: string;
  }