import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private repo: Repository<Product>,
  ) {}

  async create(data: CreateProductDto) {
    const product = this.repo.create(data);
    return await this.repo.save(product);
  }

  findAll() {
    return this.repo.find({ relations: ['reviews'] });
  }

  async findOne(id: number) {
    return await this.repo.findOne({
      where: { id },
      relations: ['reviews'],
    });
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }

  async getAverageRating(productId: number) {
    const product = await this.repo.findOne({
      where: { id: productId },
      relations: ['reviews'],
    });
    const ratings = product.reviews.map((r) => r.rating);
    const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length || 0;
    return avg.toFixed(2);
  }
}
