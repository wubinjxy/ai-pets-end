import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { OpenAIService } from './providers/openai.service';
import { BailianService } from './providers/bailian.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AiController],
  providers: [AiService, OpenAIService, BailianService],
  exports: [AiService],
})
export class AiModule {} 