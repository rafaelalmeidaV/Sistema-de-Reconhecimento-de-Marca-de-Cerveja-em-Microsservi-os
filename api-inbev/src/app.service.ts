import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileInfo } from 'schemas/file.schema';


@Injectable()
export class AppService {
  constructor(@InjectModel('FileInfo') private readonly userModel: Model<File>,) {}

  async create(doc: FileInfo) {
    const result = await new this.userModel(doc).save();
    return result.id;
  }
    
  getHello(): string {
    return 'Hello World!';
  }
}
