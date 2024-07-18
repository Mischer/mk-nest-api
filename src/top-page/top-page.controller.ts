import { Body, Controller, HttpCode, Param } from '@nestjs/common';
import { ProductModel } from '../product/product.model/product.model';
import { FindProductDto } from '../product/dto/FindProductDto';

@Controller('top-page')
export class TopPageController {
	@Post('create')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async create(@Body dto: Omit<ProductModel, '_id'>) {}

	@Get(':id')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async get(@Param('id') id: string) {}

	@Patch(':id')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async patch(@Param('id') id: string, @Body dto: ProductModel) {}

	@Delete(':id')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async delete(@Param('id') id: string) {}

	@HttpCode(200)
	@Post()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async find(@Body dto: FindProductDto) {}
}
