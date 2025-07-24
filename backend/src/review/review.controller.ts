import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './create-review.dto';

@Controller('products/:productId/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(
    @Param('productId') productId: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.reviewService.create(+productId, createReviewDto);
  }

  @Get('average')
  async getAverageRating(@Param('productId') productId: string) {
    return await this.reviewService.getAverageRating(+productId);
  }
}
