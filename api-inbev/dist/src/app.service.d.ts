import { Model } from 'mongoose';
import { FileInfo } from 'schemas/file.schema';
export declare class AppService {
    private readonly userModel;
    constructor(userModel: Model<File>);
    create(doc: FileInfo): Promise<any>;
    find(): Promise<(import("mongoose").Document<unknown, {}, File> & File & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    })[]>;
    getHello(): string;
}
