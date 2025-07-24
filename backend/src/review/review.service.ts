import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Review } from './review.entity';
import { Product } from 'src/product/product.entity';
import { CreateReviewDto } from './create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(productId: number, dto: CreateReviewDto) {
    const product = await this.productRepo.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    const review = this.reviewRepo.create({
      ...dto,
      product,
    });

    return this.reviewRepo.save(review);
  }

  async getAverageRating(productId: number): Promise<{ average: number }> {
    const result = await this.reviewRepo
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'average')
      .where('review.productId = :productId', { productId })
      .getRawOne();

    return { average: parseFloat(result.average) || 0 };
  }
}
