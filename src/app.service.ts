import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Nest.js API 服务 - 文件上传与静态文件服务 测试修改发布';
  }
}
