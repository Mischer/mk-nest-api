import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { getMongoConfig } from './configs/mongo.config';
import { FilesModule } from './files/files.module';
import { SitemapModule } from './sitemap/sitemap.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		/*    MongooseModule.forRoot('mongodb://localhost:27017/top-api', {
      user: 'admin',
      pass: 'admin',
      authSource: 'admin',
    }),*/
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getMongoConfig,
			inject: [ConfigService],
		}),
		AuthModule,
		TopPageModule,
		ProductModule,
		ReviewModule,
		UsersModule,
		FilesModule,
		SitemapModule,
	],
	controllers: [AppController],
	providers: [AppService],
	exports: [ConfigModule],
})
export class AppModule {}
