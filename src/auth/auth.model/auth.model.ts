import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/*export interface AuthModel extends Document {
  name: string;
  email: string;
  createdAt: Date;
  // updatedAt: Date;
}*/
@Schema({ timestamps: true })
export class AuthModel extends Document {
  @Prop()
  email: string;
  @Prop()
  passwordHash: string;
  @Prop({ default: Date.now })
  createdAt: Date;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
