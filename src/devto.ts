import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export interface DevToArticle {
  title: string;
  body_markdown: string;
  tags?: string[];
  published?: boolean;
  series?: string;
  canonical_url?: string;
  description?: string;
}

export interface DevToResponse {
  id: number;
  url: string;
  title: string;
  slug: string;
  [key: string]: unknown;
}

function getApiKey(): string {
  const memoryPath = '/root/.clawless/MEMORY.md';
  if (!fs.existsSync(memoryPath)) {
    throw new Error('Memory file not found. Please set up dev.to API key first.');
  }

  const content = fs.readFileSync(memoryPath, 'utf-8');
  const match = content.match(/dev\.to API key:\s*(\S+)/);

  if (!match) {
    throw new Error('dev.to API key not found in memory. Please save your API key first.');
  }

  return match[1];
}

export async function postToDevTo(article: DevToArticle): Promise<DevToResponse> {
  const apiKey = getApiKey();

  const response = await fetch('https://dev.to/api/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({ article }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || 'Failed to post to dev.to');
  }

  return data as DevToResponse;
}

export async function updateDevToArticle(articleId: number, article: DevToArticle): Promise<DevToResponse> {
  const apiKey = getApiKey();

  const response = await fetch(`https://dev.to/api/articles/${articleId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({ article }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || 'Failed to update dev.to article');
  }

  return data as DevToResponse;
}

export function parsePostCommand(text: string): { title: string; body: string; description?: string } | null {
  const match = text.match(/^post\s+(.+)$/i) || text.match(/^\/post\s+(.+)$/i);
  if (!match || !match[1]) return null;

  const parts = match[1].split('|');
  return {
    title: parts[0].trim(),
    body: parts[1]?.trim() || parts[0].trim(),
    description: parts[2]?.trim(),
  };
}
