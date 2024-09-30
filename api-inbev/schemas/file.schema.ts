import { Post } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileDocument = File & Document;

@Schema({ timestamps: true })
export class FileInfo {

  @Prop()
  filename: string;

  @Prop()
  size: number;

  @Prop()
  mimetype: string;

  @Prop()
  brand: string;

}

export const FileSchema = SchemaFactory.createForClass(FileInfo);
