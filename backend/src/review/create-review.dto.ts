import { IsNotEmpty, IsString, IsInt, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}
