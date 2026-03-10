# devto-skill

A skill for posting articles to dev.to

## For AI Agents

### Installation
```bash
npm install devto-skill
```

### Functions

#### postToDevTo(article)
Post a new article to dev.to.

**Parameters:**
- `title` (string): Article title
- `body_markdown` (string): Article content in Markdown
- `description` (string, optional): SEO description
- `tags` (string[], optional): Article tags (max 4)
- `published` (boolean): Publish immediately

**Returns:** `{ id, url, title, slug }`

#### updateDevToArticle(articleId, article)
Update an existing article.

**Parameters:**
- `articleId` (number): The article ID to update
- `article` (object): Same as postToDevTo

#### parsePostCommand(text)
Parse user command in format: `post <title> | <content> | <description>`

**Parameters:**
- `text` (string): User message

**Returns:** `{ title, body, description }` or `null`

### Usage Example

```javascript
import { postToDevTo, parsePostCommand } from 'devto-skill';

// Parse command
const parsed = parsePostCommand('post My Blog | # Hello\n\nContent here | A short description');
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

### API Key Setup

Set the environment variable before using:
```bash
export DEVTO_API_KEY="your_api_key"
```

Get your key from: https://dev.to/settings/extensions
