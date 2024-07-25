import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageModel, TopPageSchema } from './top-page.model/top-page.model';

@Module({
	imports: [
		ConfigModule,
		MongooseModule.forFeature([{ name: TopPageModel.name, schema: TopPageSchema }]),
	],
	controllers: [TopPageController],
})
export class TopPageModule {}
