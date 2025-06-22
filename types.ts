
export enum Sender {
  User = 'user',
  Bot = 'bot',
}

export interface GroundingChunkWeb {
  uri?: string; // Changed from 'uri: string' to 'uri?: string'
  title?: string;
}

export interface GroundingChunk {
  web?: GroundingChunkWeb;
  // Other types of chunks could be added here if needed in the future
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
  isStreaming?: boolean;
  error?: boolean;
  groundingChunks?: GroundingChunk[];
}