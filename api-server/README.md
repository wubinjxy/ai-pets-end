# Nest.js 文件上传与AI集成服务

本项目是一个基于 Nest.js 的综合应用示例，包含文件上传、静态文件服务和AI大模型集成。

## 功能

- 图片文件上传
- 静态文件访问
- OpenAI和阿里云百炼大模型集成
- 简单的 Web 前端测试页面

## 安装

```bash
# 安装依赖
npm install
```

## 配置

在项目根目录创建 `.env` 文件，并添加以下配置：

```
# OpenAI配置
OPENAI_API_KEY=your_openai_api_key
OPENAI_API_BASE_URL=https://api.openai.com/v1

# 阿里云百炼配置（OpenAI兼容模式）
# 请在阿里云控制台 - AccessKey管理中获取
ALIYUN_ACCESS_KEY_ID=your_aliyun_access_key_id
ALIYUN_ACCESS_KEY_SECRET=your_aliyun_access_key_secret
```

## 运行

```bash
# 开发模式
npm run start:dev

# 生产模式
npm run build
npm run start:prod
```

## 使用方法

### 文件上传测试

1. 启动服务后，访问：http://localhost:3000/upload
2. 使用测试页面上传图片文件
3. 上传成功后可以通过返回的 URL 访问文件

### AI大模型测试

1. 启动服务后，访问：http://localhost:3000/ai
2. 可以选择使用OpenAI或阿里云百炼进行测试
3. 支持文本生成和对话两种模式

## API 接口

### 文件上传

- **URL**: `/file/upload`
- **方法**: `POST`
- **请求体**: `multipart/form-data`
- **参数**: 
  - `file`: 要上传的文件

### 获取文件

- **URL**: `/uploads/{filename}`
- **方法**: `GET`

### 文本生成

- **URL**: `/ai/completion`
- **方法**: `POST`
- **请求体**: `application/json`
- **参数**: 
  ```json
  {
    "prompt": "你好，请写一首诗",
    "model": "gpt-3.5-turbo",
    "maxTokens": 500,
    "temperature": 0.7,
    "topP": 1,
    "provider": "openai"
  }
  ```

### 对话生成

- **URL**: `/ai/chat`
- **方法**: `POST`
- **请求体**: `application/json`
- **参数**: 
  ```json
  {
    "messages": [
      {"role": "system", "content": "你是一个有用的助手"},
      {"role": "user", "content": "你好，请介绍一下自己"}
    ],
    "model": "gpt-3.5-turbo",
    "maxTokens": 500,
    "temperature": 0.7,
    "topP": 1,
    "provider": "openai"
  }
  ```

## 目录结构

```
api-server/
├── src/
│   ├── ai/                 # AI模块
│   │   ├── dto/            # 数据传输对象
│   │   ├── interfaces/     # 接口定义
│   │   ├── providers/      # AI服务提供者
│   │   ├── ai.controller.ts
│   │   ├── ai.module.ts
│   │   └── ai.service.ts
│   ├── file/               # 文件处理模块
│   │   ├── file.controller.ts
│   │   ├── file.module.ts
│   │   └── file.service.ts
│   ├── app.controller.ts   # 主控制器
│   ├── app.module.ts       # 主模块
│   ├── app.service.ts      # 主服务
│   └── main.ts             # 应用入口
├── public/                 # 公共资源
│   ├── upload-test.html    # 上传测试页面
│   └── ai-test.html        # AI测试页面
└── uploads/                # 上传文件存储目录
```

## 支持的AI模型

### OpenAI
- gpt-3.5-turbo (默认)
- gpt-4
- 等其他OpenAI支持的模型

### 阿里云百炼
- qwen-max (默认)
- qwen-plus
- qwen-turbo
- 等其他百炼平台支持的模型

## 阿里云百炼集成说明

本项目使用阿里云百炼的 OpenAI 兼容模式进行接入，这意味着：

1. 使用与 OpenAI 完全相同的调用方式和代码结构
2. 无需额外的阿里云 SDK，直接使用 OpenAI 官方客户端库
3. API 密钥格式为 `AccessKeyId:AccessKeySecret`
4. 访问地址为 `https://dashscope.aliyuncs.com/compatible-mode/v1`

百炼平台支持的模型包括：
- `qwen-max`（默认）
- `qwen-plus`
- `qwen-turbo`
- 其他阿里云支持的模型

详细信息请参考[阿里云百炼官方文档](https://help.aliyun.com/document_detail/2712576.html)。

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
