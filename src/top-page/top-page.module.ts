import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageModel, TopPageSchema } from './top-page.model/top-page.model';
import { TopPageService } from './top-page.service';

@Module({
	imports: [ConfigModule, MongooseModule.forFeature([{ name: TopPageModel.name, schema: TopPageSchema }])],
	controllers: [TopPageController],
	providers: [TopPageService],
	exports: [TopPageService],
})
export class TopPageModule {}
