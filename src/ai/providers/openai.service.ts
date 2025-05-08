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
export class OpenAIService implements AiProvider {
  private readonly client: OpenAI;
  private readonly logger = new Logger(OpenAIService.name);
  private readonly defaultModel = 'gpt-3.5-turbo';

  constructor(private configService: ConfigService) {
    this.client = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
      baseURL: this.configService.get<string>('OPENAI_API_BASE_URL'),
    });
    console.log(this.client, 'this.client');
  }

  async generateCompletion(
    options: CompletionOptions,
  ): Promise<CompletionResponse> {
    try {
      const {
        prompt,
        maxTokens = 500,
        temperature = 0.7,
        topP = 1,
        model = this.defaultModel,
        messages,
      } = options;
      console.log(messages, 'messages', model);
      const response = await this.client.chat.completions.create({
        model: 'qwen-vl-max',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: '这是什么？',
              },
              {
                type: 'image_url',
                image_url: {
                  url: 'http://localhost:3000/uploads/9a1fbf09-195d-4276-b7b8-d42be20855bb.jpg',
                },
              },
            ],
          },
        ],
      });
      console.log(JSON.stringify(response));

      return {
        text: response.choices[0]?.message?.content || '',
        usage: {
          promptTokens: response.usage?.prompt_tokens,
          completionTokens: response.usage?.completion_tokens,
          totalTokens: response.usage?.total_tokens,
        },
        model: response.model,
        provider: 'openai',
      };
    } catch (error) {
      this.logger.error(`OpenAI API error: ${error.message}`, error.stack);
      throw error;
    }
  }

  async generateChatCompletion(options: ChatOptions): Promise<ChatResponse> {
    try {
      const {
        messages,
        maxTokens = 500,
        temperature = 0.7,
        topP = 1,
        model = this.defaultModel,
      } = options;

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
        model: response.model,
        provider: 'openai',
      };
    } catch (error) {
      this.logger.error(`OpenAI API error: ${error.message}`, error.stack);
      throw error;
    }
  }
}
