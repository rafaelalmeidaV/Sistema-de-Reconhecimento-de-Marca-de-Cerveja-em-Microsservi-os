"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const node_fetch_1 = require("node-fetch");
const FormData = require("form-data");
const app_service_1 = require("./app.service");
let UploadController = class UploadController {
    constructor(service) {
        this.service = service;
    }
    async viewData() {
        try {
            const data = await this.service.find();
            return { status: 'success', data };
        }
        catch (error) {
            console.error('Error retrieving data:', error);
            return { status: 'error', message: error.message };
        }
    }
    async uploadFile(file) {
        if (!file) {
            throw new common_1.BadRequestException('File is required');
        }
        const formData = new FormData();
        formData.append('file', file.buffer, file.originalname);
        try {
            const response = await (0, node_fetch_1.default)('http://ocr-service:3001/process-image', {
                method: 'POST',
                body: formData,
                headers: formData.getHeaders(),
            });
            const brand = await response.json();
            console.log(brand);
            const fileinfo = {
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
        }
        catch (error) {
            console.error('Error processing image:', error);
            throw new common_1.BadRequestException('Error processing image');
        }
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Get)('view-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "viewData", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
                return cb(new common_1.BadRequestException('Only image files are allowed!'), false);
            }
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadFile", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], UploadController);
//# sourceMappingURL=app.controller.js.map