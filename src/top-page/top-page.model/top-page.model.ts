import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum TopLevelCategory {
	Cources,
	Services,
	Books,
	Products,
}

@Schema()
export class HH {
	@Prop({ required: true })
	count: number;

	@Prop({ required: true })
	juniorSalary: number;

	@Prop({ required: true })
	middleSalary: number;

	@Prop({ required: true })
	seniorSalary: number;
}

export const HHSchema = SchemaFactory.createForClass(HH);

@Schema()
export class Advantage {
	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	description: string;
}

export const AdvantageSchema = SchemaFactory.createForClass(Advantage);

@Schema()
export class TopPageModel extends Document {
	@Prop({ required: true })
	firstCategory: TopLevelCategory;

	@Prop({ required: true })
	secondCategory: TopLevelCategory;

	@Prop({ required: true, unique: true })
	alias: string;

	@Prop({ required: true, text: true })
	title: string;

	@Prop({ required: true })
	metaTitle: string;

	@Prop({ required: true })
	metaDescription: string;

	@Prop({ required: true })
	category: string;

	@Prop({ type: HHSchema })
	hh?: HH;

	@Prop({ type: [AdvantageSchema], required: true })
	advantages: Advantage[];

	@Prop()
	seoText: string;

	@Prop({ required: true })
	tagsTitle: string;

	@Prop({ type: [String], required: true })
	tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);

TopPageSchema.index({ title: 'text', seoText: 'text' });
