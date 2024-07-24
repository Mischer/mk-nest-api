import { Injectable } from '@nestjs/common';
import { AuthModel } from './auth.model/auth.model';
import { Model } from 'mongoose';
import { User } from '../users/models/user.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthModel.name) private authModel: Model<AuthModel>,
  ) {}

  /*  async createUser(authDto: AuthDto): Promise<User> {
    const createdUser = new this.authModel(authDto);
    return createdUser.save();
  }*/
}
