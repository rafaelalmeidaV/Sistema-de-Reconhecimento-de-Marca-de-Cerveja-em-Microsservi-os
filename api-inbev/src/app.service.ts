import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileInfo } from 'schemas/file.schema';


@Injectable()
export class AppService {
  constructor(@InjectModel('FileInfo') private readonly userModel: Model<File>,) {}

  async create(doc: FileInfo) {
    try {
      console.log('Attempting to save document:', JSON.stringify(doc));
      const newDoc = new this.userModel(doc);
      console.log('Created new document instance:', newDoc);
      const result = await newDoc.save();
      console.log('Document saved successfully:', result);
      return result.id;
    } catch (error) {
      console.error('Error saving document:', error);
      throw error;
    }
  }

  async find() {
    try {
      return this.userModel.find();
    } catch (error) {
      console.error('Error retrieving data:', error);
      throw error;
    }
  }
    
  getHello(): string {
    return 'Hello World!';
  }
}
