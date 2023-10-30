import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'customerRepresentations',
  timestamps: true,
})
export class CustomerRepresentationModel extends Document {
  @Prop()
  name: string;

  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  password: string;
}

export type CustomerRepresentationDocument = CustomerRepresentationModel &
  Document;
export const CustomerRepresentationSchema = SchemaFactory.createForClass(
  CustomerRepresentationModel,
);
