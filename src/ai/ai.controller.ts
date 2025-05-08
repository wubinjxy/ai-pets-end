import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AiService } from './ai.service';
import { CompletionDto } from './dto/completion.dto';
import { ChatDto } from './dto/chat.dto';
import { ChatResponse, CompletionResponse } from './interfaces/ai-provider.interface';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('completion')
  // @UsePipes(new ValidationPipe({ transform: true }))
  async generateCompletion(@Body() completionDto: CompletionDto): Promise<CompletionResponse> {
    console.log(completionDto,'completionDto');
    return this.aiService.generateCompletion(completionDto);
  }

  @Post('chat')
  @UsePipes(new ValidationPipe({ transform: true }))
  async generateChatCompletion(@Body() chatDto: ChatDto): Promise<ChatResponse> {
    return this.aiService.generateChatCompletion(chatDto);
  }
} 