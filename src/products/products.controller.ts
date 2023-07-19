import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RolesGuard } from 'src/roles/roles.guards';
import { Roles } from 'src/roles/roles.decorator';
import { throwError } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { log } from 'console';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles('seller')
  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Req() request) {
    return this.productsService.create({
      ...createProductDto,
      seller: request.user,
    });
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Roles('seller')
  @Get('/my-products/:user_id')
  getMyProducts(@Param('user_id') user_id: number) {
    return this.productsService.myProducts(user_id);
  }

  @Roles('seller')
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req,
  ) {
    const isOwner = await this.productsService.myProducts(req.user_id);
    const isProductOwner = isOwner.some((el) => el.product_id == id);

    console.log(isProductOwner, isOwner);

    if (isProductOwner) {
      await this.productsService.update(id, {
        ...updateProductDto,
      });

      return await this.productsService.findOne(id);
    }
    if (!isProductOwner) {
      throw new ForbiddenException(
        'You do not have permission to update this product',
      );
    }
  }

  @Roles('seller')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productsService.remove(+id);
    return {message: "Deleted successfully"}
  }
}
