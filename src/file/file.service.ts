import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  async saveFile(file: Express.Multer.File) {
    const fileUrl = `/uploads/${file.filename}`;
    
    return {
      originalname: file.originalname,
      filename: file.filename,
      path: file.path,
      url: fileUrl,
      size: file.size,
      mimetype: file.mimetype
    };
  }
} 