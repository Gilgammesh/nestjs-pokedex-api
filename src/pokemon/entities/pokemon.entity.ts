import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false
})
export class Pokemon extends Document {
  @Prop({
    unique: true,
    index: true,
    required: true
  })
  no: number;

  @Prop({
    unique: true,
    index: true,
    required: true
  })
  name: string;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
