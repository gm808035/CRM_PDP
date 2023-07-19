import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from 'src/category/category.entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @ManyToOne(() => User)
  seller: User;

  @Column()
  product_name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  description: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.product)
  order: string;
}

