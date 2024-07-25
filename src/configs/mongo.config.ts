import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';

export const getMongoConfig = async (
	configService: ConfigService,
): Promise<MongooseModuleOptions> => {
	console.log('MONGO URL: ' + getMongoUrl(configService));
	return {
		uri: getMongoUrl(configService),
		...getMongoOptions(),
	};
};

const getMongoUrl = (configService: ConfigService): string =>
	'mongodb://' +
	configService.get('MONGO_LOGIN') +
	':' +
	configService.get('MONGO_PASSWORD') +
	'@' +
	configService.get('MONGO_HOST') +
	':' +
	configService.get('MONGO_PORT') +
	'/' +
	configService.get('MONGO_AUTH_DATABASE');

const getMongoOptions = () => ({
	retryAttempts: 3,
});
