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

Save your dev.to API key to memory:
```
Save my dev.to API key: YOUR_API_KEY
```

The skill reads from `~/.clawless/MEMORY.md` looking for `dev.to API key: <key>`
