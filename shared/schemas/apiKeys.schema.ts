import { z } from 'zod';

/**
 * API Key Configuration Schema
 * Validates API keys and credentials for external services
 */

export const VercelAPIKeySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'API Key name is required').max(100),
  key: z.string().min(10, 'Invalid API key format'),
  baseUrl: z.string().url('Invalid Vercel API URL'),
  isActive: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const AWSAPIKeySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'API Key name is required').max(100),
  accessKeyId: z.string().min(10, 'Invalid AWS Access Key'),
  secretAccessKey: z.string().min(10, 'Invalid AWS Secret Key'),
  region: z.enum(['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1']),
  baseUrl: z.string().url('Invalid AWS API Gateway URL'),
  isActive: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const BedrockAPIKeySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'API Key name is required').max(100),
  accessKeyId: z.string().min(10, 'Invalid Bedrock Access Key'),
  secretAccessKey: z.string().min(10, 'Invalid Bedrock Secret Key'),
  region: z.enum(['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1']),
  modelId: z.string().min(1, 'Model ID is required'),
  isActive: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const ChatMessageSchema = z.object({
  id: z.string().optional(),
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(1, 'Message content is required'),
  timestamp: z.date().optional(),
  modelUsed: z.string().optional(),
  tokens: z.object({
    input: z.number().optional(),
    output: z.number().optional(),
  }).optional(),
});

export const ChatSessionSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  title: z.string().min(1, 'Session title is required').max(200),
  messages: z.array(ChatMessageSchema).default([]),
  apiKeyId: z.string().min(1, 'API Key is required'),
  provider: z.enum(['vercel', 'aws', 'bedrock']),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isArchived: z.boolean().default(false),
});

export const CreateChatMessageSchema = ChatMessageSchema.omit({ id: true, timestamp: true });
export const CreateChatSessionSchema = ChatSessionSchema.omit({ id: true, createdAt: true, updatedAt: true });

export const ChatRequestSchema = z.object({
  sessionId: z.string(),
  message: z.string().min(1, 'Message is required').max(4000),
  apiKeyId: z.string(),
  provider: z.enum(['vercel', 'aws', 'bedrock']),
});

export const APIKeysListSchema = z.object({
  vercelKeys: z.array(VercelAPIKeySchema).default([]),
  awsKeys: z.array(AWSAPIKeySchema).default([]),
  bedrockKeys: z.array(BedrockAPIKeySchema).default([]),
});

export const UserAPIKeysSchema = z.object({
  userId: z.string(),
  vercelKeys: z.array(VercelAPIKeySchema).default([]),
  awsKeys: z.array(AWSAPIKeySchema).default([]),
  bedrockKeys: z.array(BedrockAPIKeySchema).default([]),
  defaultProvider: z.enum(['vercel', 'aws', 'bedrock']).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Type exports
export type VercelAPIKey = z.infer<typeof VercelAPIKeySchema>;
export type AWSAPIKey = z.infer<typeof AWSAPIKeySchema>;
export type BedrockAPIKey = z.infer<typeof BedrockAPIKeySchema>;
export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export type ChatSession = z.infer<typeof ChatSessionSchema>;
export type ChatRequest = z.infer<typeof ChatRequestSchema>;
export type APIKeysList = z.infer<typeof APIKeysListSchema>;
export type UserAPIKeys = z.infer<typeof UserAPIKeysSchema>;
