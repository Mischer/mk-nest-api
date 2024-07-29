import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJwtConfig = async (configService: ConfigService): Promise<JwtModuleOptions> => {
	// implement refresh token in future
	return {
		secret: configService.get('JWT_SECRET'),
	};
};
