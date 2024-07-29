import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/*export interface AuthModel extends Document {
  name: string;
  email: string;
  createdAt: Date;
  // updatedAt: Date;
}*/
@Schema({ timestamps: true })
export class UserModel extends Document {
	@Prop({ unique: true })
	email: string;
	@Prop()
	passwordHash: string;
	@Prop({ default: Date.now })
	createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
