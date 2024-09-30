import { Module } from '@nestjs/common';
import { UploadController } from './app.controller';
import { AppService } from './app.service';
import { FileSchema } from '../schemas/file.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env', 
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI), 
    MongooseModule.forFeature([{ name: 'FileInfo', schema: FileSchema }]),
  ],
  controllers: [UploadController],
  providers: [AppService],
})
export class AppModule {}
