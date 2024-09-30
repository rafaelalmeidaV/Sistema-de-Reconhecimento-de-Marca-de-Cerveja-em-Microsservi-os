import type { Multer } from 'multer';
import { AppService } from './app.service';
export declare class UploadController {
    private service;
    constructor(service: AppService);
    viewData(): Promise<{
        status: string;
        data: (import("mongoose").Document<unknown, {}, File> & File & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v?: number;
        })[];
        message?: undefined;
    } | {
        status: string;
        message: any;
        data?: undefined;
    }>;
    uploadFile(file: Multer.File): Promise<{
        message: string;
        filename: any;
        size: any;
        brand: any;
    }>;
}
