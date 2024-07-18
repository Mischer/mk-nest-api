import {
  Body,
  Controller,
  HttpCode,
  Param,
  Get,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductModel } from './product.model/product.model';
import { FindProductDto } from './dto/find-product-dto';

@Controller('product')
export class ProductController {
  @Post('create')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(@Body() dto: Omit<ProductModel, '_id'>) {}

  @Get(':id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(@Param('id') id: string) {}

  @Patch(':id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async patch(@Param('id') id: string, @Body() dto: ProductModel) {}

  @Delete(':id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async delete(@Param('id') id: string) {}

  @HttpCode(200)
  @Post()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(@Body() dto: FindProductDto) {}
}
