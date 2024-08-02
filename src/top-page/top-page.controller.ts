import {
	Body,
	Controller,
	HttpCode,
	Param,
	Post,
	Get,
	Delete,
	Patch,
	NotFoundException,
	UsePipes,
	ValidationPipe,
	UseGuards,
} from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page-dto';
import { ConfigService } from '@nestjs/config';
import { TopPageModel } from './top-page.model/top-page.model';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopPageService } from './top-page.service';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { TOP_PAGE_NOT_FOUND_ERROR } from './top-page.constants';
import { JwtAuthGuard } from '../guards/jwt.guard';

@Controller('top-page')
export class TopPageController {
	constructor(
		private readonly configService: ConfigService,
		private readonly topPageService: TopPageService,
	) {}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateTopPageDto) {
		return this.topPageService.create(dto);
	}

	@Get('byAlias/:alias')
	async findByAlias(@Param('alias') alias: string) {
		const existingTopPage = await this.topPageService.findByAlias(alias);
		if (!existingTopPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
		}

		return existingTopPage;
	}

	@UseGuards(JwtAuthGuard)
	@Get('/:id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const existingTopPage = await this.topPageService.findById(id);
		if (!existingTopPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
		}

		return existingTopPage;
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: TopPageModel) {
		return this.topPageService.updateById(id, dto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const existingTopPage = await this.topPageService.deleteById(id);
		if (!existingTopPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
		}
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindTopPageDto) {
		return this.topPageService.findByCategory(dto.firstCategory);
	}

	@Get('textSearch/:text')
	async textSearch(@Param('text') text: string) {
		return this.topPageService.findByText(text);
	}
}
