import { Model } from 'mongoose';
import { FileInfo } from 'schemas/file.schema';
export declare class AppService {
    private readonly userModel;
    constructor(userModel: Model<File>);
    create(doc: FileInfo): Promise<any>;
    getHello(): string;
}
