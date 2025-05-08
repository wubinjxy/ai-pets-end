export interface CompletionOptions {
  model?: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  messages?: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
}

export interface CompletionResponse {
  text: string;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
  model?: string;
  provider: string;
}

export interface ChatOptions {
  model?: string;
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
}

export interface ChatResponse {
  message: {
    role: string;
    content: string;
  };
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
  model?: string;
  provider: string;
}

export interface AiProvider {
  generateCompletion(options: CompletionOptions): Promise<CompletionResponse>;
  generateChatCompletion(options: ChatOptions): Promise<ChatResponse>;
} 