import {
	Body,
	Controller,
	HttpCode,
	Param,
	Get,
	Post,
	Patch,
	Delete,
	NotFoundException,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { FindProductDto } from './dto/find-product-dto';
import { CreateProductDto } from './dto/create-product-dto';
import { PRODUCT_NOT_FOUND } from './product.constants';
import { ProductService } from './product.service';
import { IdValidationPipe } from '../pipes/id-validation.pipe';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post('create')
	async create(@Body() dto: CreateProductDto) {
		return this.productService.create(dto);
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const product = await this.productService.findById(id);
		if (!product) {
			throw new NotFoundException(PRODUCT_NOT_FOUND);
		}

		return product;
	}

	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateProductDto) {
		const productUpdated = await this.productService.updateById(id, dto);
		if (!productUpdated) {
			throw new NotFoundException(PRODUCT_NOT_FOUND);
		}

		return productUpdated;
	}

	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const productDeleted = await this.productService.deleteById(id);
		if (!productDeleted) {
			throw new NotFoundException(PRODUCT_NOT_FOUND);
		}
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindProductDto) {
		return this.productService.findWithReviews(dto);
	}
}
