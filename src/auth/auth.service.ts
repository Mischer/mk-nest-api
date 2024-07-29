import { Injectable } from '@nestjs/common';
import { UserModel } from './auth.model/user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDto } from './dto/auth.dto';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class AuthService {
	constructor(@InjectModel(UserModel.name) private userModel: Model<UserModel>) {}

	async createUser(authDto: AuthDto): Promise<UserModel> {
		const createdUser = new this.userModel({
			email: authDto.email,
			passwordHash: hashSync(authDto.password, genSaltSync(10)),
		});
		return createdUser.save();
	}

	async findUser(email: string): Promise<UserModel> {
		return this.userModel.findOne({ email }).exec();
	}
}
