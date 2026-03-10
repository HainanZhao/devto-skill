# clawless-devto-skill

dev.to posting skill for Clawless - post blogs directly from Telegram/Slack.

## Installation

```bash
npm install clawless-devto-skill
```

## Usage

```typescript
import { postToDevTo, parsePostCommand } from 'clawless-devto-skill';

// Parse command from user message
const parsed = parsePostCommand('post My Blog | Hello world | A short description');
if (parsed) {
  const result = await postToDevTo({
    title: parsed.title,
    body_markdown: parsed.body,
    description: parsed.description,
    published: true,
  });
  console.log(result.url);
}
```

## Clawless Integration

In your Clawless `registerTelegramHandlers.ts`:

```typescript
import { postToDevTo, parsePostCommand } from 'clawless-devto-skill';
import type { DevToArticle } from 'clawless-devto-skill';

// In your message handler:
if (isDevToPostCommand(messageContext.text)) {
  const parsed = parsePostCommand(messageContext.text);
  if (!parsed) {
    await messageContext.sendText('📝 Usage: post <title> | <content> | <description>');
    return;
  }
  
  await messageContext.sendText('📤 Posting to dev.to...');
  try {
    const article: DevToArticle = {
      title: parsed.title,
      body_markdown: parsed.body,
      description: parsed.description || parsed.body.substring(0, 150),
      published: true,
    };
    const result = await postToDevTo(article);
    await messageContext.sendText(`✅ Posted! ${result.url}`);
  } catch (error) {
    await messageContext.sendText(`❌ Failed: ${error.message}`);
  }
}
```

## API Key Setup

Save your dev.to API key to Clawless memory:

```
Save my dev.to API key: YOUR_API_KEY
```

## Commands

- `post <title> | <content>` - Post a new article
- `post <title> | <content> | <description>` - Post with custom description

## License

MIT
