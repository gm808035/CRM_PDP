import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';

import { UsersController } from './users/users.controller';
import { ProductsController } from './products/products.controller';
import { OrdersController } from './orders/orders.controller';
import { AuthController } from './auth/auth.controller';

import { UsersService } from './users/users.service';
import { ProductsService } from './products/products.service';
import { OrdersService } from './orders/orders.service';
import { AuthService } from './auth/auth.service';
import { CategoriesService } from './category/category.service';

import { User } from './users/entities/user.entity';
import { Product } from './products/entities/product.entity';
import { Order } from './orders/entities/order.entity';
import { Category } from './category/category.entity';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../typeorm.config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { JwtStrategy } from './auth/jwt.strategy';

import { AuthMiddleware } from './auth/auth.middleware';
// import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './roles/roles.guards';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    TypeOrmModule.forFeature([User, Order, Product, Category]),
    PassportModule,
    JwtModule.register({
      secret: 'your_secret_key',
    }),
    
    UsersModule,
    ProductsModule,
    OrdersModule,
    AuthModule,
  ],
  controllers: [
    AppController,
    UsersController,
    ProductsController,
    OrdersController,
    AuthController,
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    AppService,
    UsersService,
    ProductsService,
    OrdersService,
    LocalStrategy,
    JwtStrategy,
    AuthService,
    CategoriesService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/register', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
