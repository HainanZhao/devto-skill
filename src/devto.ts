export interface DevToArticle {
  title: string;
  body_markdown: string;
  tags?: string[];
  published?: boolean;
  series?: string;
  canonical_url?: string;
  description?: string;
  main_image?: string;
}

export interface DevToResponse {
  id: number;
  url: string;
  title: string;
  slug: string;
  [key: string]: unknown;
}

function getApiKey(): string {
  const apiKey = process.env.DEVTO_API_KEY;

  if (!apiKey) {
    throw new Error('DEVTO_API_KEY not set. Set it in your environment: export DEVTO_API_KEY="your_key"');
  }

  return apiKey;
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

export function parsePostCommand(
  text: string,
): { title: string; body: string; description?: string; image?: string } | null {
  const match = text.match(/^post\s+(.+)$/i) || text.match(/^\/post\s+(.+)$/i);
  if (!match || !match[1]) return null;

  const parts = match[1].split('|');
  return {
    title: parts[0].trim(),
    body: parts[1]?.trim() || parts[0].trim(),
    description: parts[2]?.trim(),
    image: parts[3]?.trim(),
  };
}

export interface UploadedImage {
  url: string;
  id: number;
}

export async function uploadImage(imageUrl: string): Promise<UploadedImage> {
  const apiKey = getApiKey();

  const response = await fetch('https://dev.to/api/images', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({ image: imageUrl }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || 'Failed to upload image');
  }

  return data as UploadedImage;
}
