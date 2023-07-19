import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles('buyer')
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() request) {
    return this.ordersService.create({...createOrderDto, customer: request.user});
  }

  @Get() 
  findAll(@Req() request) {
    return this.ordersService.findAll(request.user.role, request.user.user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ordersService.findOne(+id);
  }

  @Roles('buyer')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
