import { IsEnum, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export enum ProviderType {
  OPENAI = 'openai',
  BAILIAN = 'bailian',
}

export class CompletionDto {
  @IsString()
  prompt: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(4000)
  maxTokens?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(2)
  temperature?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  topP?: number;

  @IsOptional()
  @IsEnum(ProviderType)
  provider?: ProviderType = ProviderType.OPENAI;
} 