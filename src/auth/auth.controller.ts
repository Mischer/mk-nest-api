import { Controller, Post, Body, HttpCode, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { USER_ALREADY_EXIST_ERROR } from './auth.constants';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthDto) {
		const existingUser = await this.authService.findUser(dto.email);
		if (existingUser) {
			throw new BadRequestException(USER_ALREADY_EXIST_ERROR);
		}
		return this.authService.createUser(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() { email, password }: AuthDto) {
		const user = await this.authService.validateUser(email, password);
		return this.authService.login(user.email);
	}
}
