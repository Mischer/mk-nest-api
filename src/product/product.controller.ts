import { Controller } from '@nestjs/common';
import { ProductModel } from "./product.model/product.model";

@Controller('product')
export class ProductController {
  @Post('create')
  async create(@Body dto: Omit<ProductModel, '_id'>) {};

	@Get(':id')
	async get(@Param('id') id: string) {};

	@Patch(':id')
	async patch(@param('id') id: string,@Body dto: ProductModel) {};

}
