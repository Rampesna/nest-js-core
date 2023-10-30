import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'jwtTokens',
  timestamps: true,
})
export class JwtTokenModel extends Document {
  @Prop()
  tokenableType: string;

  @Prop()
  tokenableId: string;

  @Prop()
  token: string;

  @Prop()
  expiresAt: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export type JwtTokenDocument = JwtTokenModel & Document;
export const JwtTokenSchema = SchemaFactory.createForClass(JwtTokenModel);
