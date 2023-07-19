import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service'
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/category/category.entity';
import { CategoriesService } from 'src/category/category.service';
import { UsersModule } from 'src/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/roles/roles.guards';
import { OrdersModule } from 'src/orders/orders.module';
import { Order } from 'src/orders/entities/order.entity';
import { OrdersService } from 'src/orders/orders.service';
import { OrdersController } from 'src/orders/orders.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, User, Category, Order]),
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ProductsController, AuthController],
  providers: [
    ProductsService,
    JwtStrategy,
    AuthService,
    UsersService,
    CategoriesService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [JwtStrategy, PassportModule, ProductsModule, ProductsService],
})
export class ProductsModule {}
