import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity'
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @ManyToOne(() => User, (user) => user.customer)
  customer: User;

  @ManyToOne(() => Product, (product) => product.order )
  product: Product;

  @Column()
  quantity: number;

  @Column()
  order_date: Date;

  @Column()
  status: string;

  @Column()
  delivery_address: string;
}