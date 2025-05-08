import { Injectable, Logger } from '@nestjs/common';
import { OpenAIService } from './providers/openai.service';
import { BailianService } from './providers/bailian.service';
import { ProviderType } from './dto/completion.dto';
import { CompletionDto } from './dto/completion.dto';
import { ChatDto } from './dto/chat.dto';
import { 
  ChatOptions, 
  ChatResponse, 
  CompletionOptions, 
  CompletionResponse 
} from './interfaces/ai-provider.interface';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private readonly openaiService: OpenAIService,
    private readonly bailianService: BailianService,
  ) {}

  async generateCompletion(dto: CompletionDto): Promise<CompletionResponse> {
    
    const options: CompletionOptions = dto
    return this.openaiService.generateCompletion(options);
  }

  async generateChatCompletion(dto: ChatDto): Promise<ChatResponse> {
    this.logger.log(`Generating chat completion with provider: ${dto.provider}`);
    
    const options: ChatOptions = {
      messages: dto.messages,
      model: dto.model,
      maxTokens: dto.maxTokens,
      temperature: dto.temperature,
      topP: dto.topP,
    };

    switch (dto.provider) {
      case ProviderType.BAILIAN:
        return this.bailianService.generateChatCompletion(options);
      case ProviderType.OPENAI:
      default:
        return this.openaiService.generateChatCompletion(options);
    }
  }
} 