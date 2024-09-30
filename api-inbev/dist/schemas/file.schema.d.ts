import { Document } from 'mongoose';
export type FileDocument = File & Document;
export declare class FileInfo {
    filename: string;
    size: number;
    mimetype: string;
    brand: string;
}
export declare const FileSchema: import("mongoose").Schema<FileInfo, import("mongoose").Model<FileInfo, any, any, any, Document<unknown, any, FileInfo> & FileInfo & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FileInfo, Document<unknown, {}, import("mongoose").FlatRecord<FileInfo>> & import("mongoose").FlatRecord<FileInfo> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}>;
