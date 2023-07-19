import { Order } from 'src/orders/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
export enum UserRole {
    Seller = 'seller',
    Buyer = 'buyer',
    Admin = 'admin',
  }

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Buyer })
  role: UserRole;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @ManyToOne(() => User, (user) => user.customer) 
  customer: User;

}