import { IsString } from 'class-validator';

export class AuthDto {
	@IsString({ required: true })
	email: string;
	@IsString({ required: true })
	password: string;
}
