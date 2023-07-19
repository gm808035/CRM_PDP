import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async seedCategories(): Promise<void> {
    const categoriesData = [
      {
        name: 'Electronics',
        description: 'Electronic devices and accessories',
      },
      { name: 'Clothing', description: 'Apparel and fashion accessories' },
      {
        name: 'Home and Kitchen',
        description: 'Household items and kitchenware',
      },
      { name: 'Books', description: 'Books and literature' },
      {
        name: 'Sports and Fitness',
        description: 'Sports equipment and fitness accessories',
      },
    ];

    const categories = categoriesData.map((categoryData) =>
      this.categoryRepository.create(categoryData),
    );

    await this.categoryRepository.save(categories);
  }
  async getCategoryName(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    return category.name
  }

  async onModuleInit(): Promise<void> {
    await this.seedCategories();
  }
}
