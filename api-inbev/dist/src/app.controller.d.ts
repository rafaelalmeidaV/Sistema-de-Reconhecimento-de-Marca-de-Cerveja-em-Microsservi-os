import type { Multer } from 'multer';
import { AppService } from './app.service';
export declare class UploadController {
    private service;
    constructor(service: AppService);
    uploadFile(file: Multer.File): Promise<{
        message: string;
        filename: any;
        size: any;
        brand: any;
    }>;
}
