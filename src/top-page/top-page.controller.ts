import { Body, Controller, HttpCode, Param, Post, Get, Delete, Patch } from '@nestjs/common';
import { FindTopPageDto } from './top-page.model/find-top-page-dto';
import { ConfigService } from '@nestjs/config';
import { TopPageModel } from './top-page.model/top-page.model';

@Controller('top-page')
export class TopPageController {
	constructor(private readonly configService: ConfigService) {}
	@Post('create')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async create(@Body() dto: Omit<TopPageModel, '_id'>) {}

	@Get('get/:alias')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async get(@Param('alias') alias: string) {
		this.configService.get('TEST');
	}

	@Patch(':id')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async patch(@Param('id') id: string, @Body() dto: TopPageModel) {}

	@Delete(':id')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async delete(@Param('id') id: string) {}

	@HttpCode(200)
	@Post()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async find(@Body() dto: FindTopPageDto) {}
}
