import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Product } from 'src/product/product.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Product])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
