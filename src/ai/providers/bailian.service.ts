import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import {
  AiProvider,
  ChatOptions,
  ChatResponse,
  CompletionOptions,
  CompletionResponse,
} from '../interfaces/ai-provider.interface';

@Injectable()
export class BailianService implements AiProvider {
  private readonly client: OpenAI;
  private readonly logger = new Logger(BailianService.name);
  private readonly defaultModel = 'qwen-max'; // 通义千问模型

  constructor(private configService: ConfigService) {
    // 使用OpenAI兼容的客户端配置百炼API
    // 注意：阿里云百炼OpenAI兼容模式只需要在apiKey中提供AccessKeySecret值
    this.client = new OpenAI({
      apiKey: this.configService.get<string>('ALIYUN_ACCESS_KEY_SECRET'),
      baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    });
    this.logger.log('阿里云百炼服务已初始化（OpenAI兼容模式）');
  }

  async generateCompletion(options: CompletionOptions): Promise<CompletionResponse> {
    try {
      const { prompt, maxTokens = 500, temperature = 0.7, topP = 1, model = this.defaultModel } = options;

      // 使用OpenAI兼容接口调用
      const response = await this.client.completions.create({
        model: model,
        prompt: prompt,
        max_tokens: maxTokens,
        temperature: temperature,
        top_p: topP,
      });

      return {
        text: response.choices[0]?.text || '',
        usage: {
          promptTokens: response.usage?.prompt_tokens,
          completionTokens: response.usage?.completion_tokens,
          totalTokens: response.usage?.total_tokens,
        },
        model: model,
        provider: 'bailian',
      };
    } catch (error) {
      this.logger.error(`阿里云百炼API错误 (OpenAI兼容模式): ${error.message}`, error.stack);
      throw error;
    }
  }

  async generateChatCompletion(options: ChatOptions): Promise<ChatResponse> {
    try {
      const { messages, maxTokens = 500, temperature = 0.7, topP = 1, model = this.defaultModel } = options;

      // 使用OpenAI兼容接口调用
      const response = await this.client.chat.completions.create({
        model: model,
        messages: messages,
        max_tokens: maxTokens,
        temperature: temperature,
        top_p: topP,
      });

      return {
        message: {
          role: response.choices[0]?.message?.role || 'assistant',
          content: response.choices[0]?.message?.content || '',
        },
        usage: {
          promptTokens: response.usage?.prompt_tokens,
          completionTokens: response.usage?.completion_tokens,
          totalTokens: response.usage?.total_tokens,
        },
        model: model,
        provider: 'bailian',
      };
    } catch (error) {
      this.logger.error(`阿里云百炼API错误 (OpenAI兼容模式): ${error.message}`, error.stack);
      throw error;
    }
  }
} 