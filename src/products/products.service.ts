import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create({
      ...createProductDto,
      category: createProductDto.category as unknown as string,
      quantity: createProductDto.quantity ?? 0,
    });
    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find({ relations: ['category', 'seller'] });
  }

  findOne(id: number) {
    return this.productRepository.findOne({
      where: { product_id: id },
      relations: ['category'],
    });
  }
  myProducts(user_id: number) {
    return this.productRepository.find({ where: { seller: { user_id } } });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, {
      ...updateProductDto,
      category: String(updateProductDto.category),
    });
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
}
