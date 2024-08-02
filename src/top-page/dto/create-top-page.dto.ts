import { Prop } from '@nestjs/mongoose';
import { Advantage, AdvantageSchema, HH, HHSchema, TopLevelCategory } from '../top-page.model/top-page.model';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductCharacteristicDto } from '../../product/dto/create-product-dto';

export class TopPageHhDto {
	@IsNumber()
	count: number;
	@IsNumber()
	juniorSalary: number;
	@IsNumber()
	middleSalary: number;
	@IsNumber()
	seniorSalary: number;
}

export class TopPageAdvantageDto {
	@IsString()
	title: string;
	@IsString()
	description: string;
}
export class CreateTopPageDto {
	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory;

	@IsEnum(TopLevelCategory)
	secondCategory: TopLevelCategory;

	@IsString()
	alias: string;

	@IsString()
	title: string;

	@IsString()
	metaTitle: string;

	@IsString()
	metaDescription: string;

	@IsString()
	category: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => TopPageHhDto)
	hh?: TopPageHhDto;

	@IsArray()
	@ValidateNested()
	@Type(() => TopPageAdvantageDto)
	advantages: TopPageAdvantageDto[];

	@IsString()
	seoText: string;
	@IsString()
	tagsTitle: string;

	@IsArray()
	@IsString({ each: true })
	tags: string[];
}
