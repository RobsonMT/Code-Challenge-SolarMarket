import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateProductDto } from './create-product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(+id);
    if (!product) throw new NotFoundException('Produto não encontrado');
    return product;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.productService.remove(+id);
    if (!result.affected) throw new NotFoundException('Produto não encontrado');
    return { message: 'Produto deletado com sucesso' };
  }

  @Get(':id/average-rating')
  getAverageRating(@Param('id') id: string) {
    return this.productService.getAverageRating(+id);
  }
}
