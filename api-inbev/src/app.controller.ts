import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import fetch from 'node-fetch'; // Utilize node-fetch
import * as FormData from 'form-data'; // Utilize o form-data do Node.js
import type { Multer } from 'multer';
import { create } from 'domain';
import { AppService } from './app.service';
import { FileInfo } from 'schemas/file.schema';


@Controller('upload')
export class UploadController {
  constructor(private service: AppService) {
  }
  @Get('view-data')
  async viewData() {
    try {
      const data = await this.service.find();
      return { status: 'success', data };
    } catch (error) {
      console.error('Error retrieving data:', error);
      return { status: 'error', message: error.message };
    }
  }
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(new BadRequestException('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )

  async uploadFile(@UploadedFile() file: Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const formData = new FormData();
    formData.append('file', file.buffer, file.originalname);

    try {
      const response = await fetch('http://ocr-service:3001/process-image', {
        method: 'POST',
        body: formData,
        headers: formData.getHeaders(),
      });

      const brand = await response.json();
      console.log(brand);

      const fileinfo: FileInfo = {
        filename: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        brand: brand.brand,
      };

      await this.service.create(fileinfo);

      return {
        message: 'File received and processed successfully',
        filename: file.originalname,
        size: file.size,
        brand,
      };


    } catch (error) {
      console.error('Error processing image:', error);
      throw new BadRequestException('Error processing image');
    }
  }


}
