import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Characteristic {
	@Prop({ required: true })
	key: string;

	@Prop({ required: true })
	value: string;
}

export const CharacteristicSchema = SchemaFactory.createForClass(Characteristic);

@Schema({ timestamps: true })
export class ProductModel extends Document {
	@Prop()
	image: string;
	@Prop()
	title: string;
	@Prop()
	price: number;
	@Prop()
	oldPrice: number;
	@Prop()
	credit: number;
	@Prop()
	calculatedRating: number;
	@Prop()
	description: string;
	@Prop()
	advantages: string;
	@Prop()
	disAdvantages: string;
	@Prop({ type: [String], default: [] })
	categories: string[];
	@Prop({ type: [String], default: [] })
	tags: string[];

	@Prop({ type: [CharacteristicSchema], default: [] })
	characteristics: Characteristic[];
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
