import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductsService } from 'src/products/products.service';
import { In } from 'typeorm';
import { log } from 'console';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private readonly productService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = this.orderRepository.create(createOrderDto);
    console.log(newOrder)
    return this.orderRepository.save(newOrder);
  }

  async findAll(role: string, user_id: number): Promise<Order[]> {
    console.log(44, role, user_id);

    if (role === 'seller') {
      console.log(1);

      const products = await this.productService.myProducts(user_id);
      const productIds = products.map((product) => product.product_id);

      const orders = await this.orderRepository.find({
        where: { customer: { user_id } },
        relations: ['customer', 'product'],
      });

      const myOrders = orders.filter((order) =>
        productIds.includes(order.product.product_id),
      );
      console.log(myOrders);
      return myOrders.map((order) => {
        const user = { ...order.customer, password: undefined };
        const orderWithoutCustomer = { ...order, customer: user };
        return orderWithoutCustomer;
      });
    }

    if (role == 'buyer') {
      console.log(22);
      const orders = await this.orderRepository.find({
        where: { customer: { user_id } },
        relations: ['customer', 'product'],
      });
      console.log(orders)
      return orders.map((order) => {
        const user = { ...order.customer, password: undefined };
        const orderWithoutCustomer = { ...order, customer: user };
        return orderWithoutCustomer;
      });
    }

    // const orders = await this.orderRepository.find({
    //   where: { customer: { user_id } },
    //   relations: ['customer', 'product'],
    // });

    // return orders.map((order) => {
    //   const user = { ...order.customer, password: undefined };
    //   const orderWithoutCustomer = { ...order, customer: user };
    //   return orderWithoutCustomer;
    // });
  }
  async findOne(id: number): Promise<Order> {
    console.log(this.orderRepository.findOne({ where: { order_id: id } }));
    return this.orderRepository.findOne({ where: { order_id: id } });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { order_id: id },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    const updatedOrder = { ...order, ...updateOrderDto };
    return this.orderRepository.save(updatedOrder);
  }

  async remove(id: number): Promise<void> {
    const order = await this.orderRepository.findOne({
      where: { order_id: id },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    await this.orderRepository.remove(order);
  }
}
