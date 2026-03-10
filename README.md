# devto-skill

Post and manage articles on dev.to from any AI agent.

## For AI Agents

### Quick Install
```bash
npm install devto-skill
```

### What This Skill Does
- Post new articles to dev.to
- Update existing articles
- Parse `post` commands from users

### API Key Setup

Set your dev.to API key as an environment variable:

```bash
export DEVTO_API_KEY="your_api_key_here"
```

Get your key from: https://dev.to/settings/extensions

You can also add this to your `.bashrc` or `.zshrc` for persistence.

### Functions Available

#### postToDevTo(article)
```typescript
import { postToDevTo } from 'devto-skill';

const result = await postToDevTo({
  title: "My Blog Post",
  body_markdown: "# Hello\n\nThis is my post content",
  description: "A short description for SEO",
  tags: ["javascript", "tutorial"],
  published: true
});
// Returns: { id, url, title, slug }
```

#### updateDevToArticle(articleId, article)
```typescript
import { updateDevToArticle } from 'devto-skill';

await updateDevToArticle(12345, {
  title: "Updated Title",
  body_markdown: "Updated content"
});
```

#### parsePostCommand(text)
```typescript
import { parsePostCommand } from 'devto-skill';

// User says: "post My Blog | Hello world | description"
const parsed = parsePostCommand(text);
// Returns: { title: "My Blog", body: "Hello world", description: "description" }
```

## License

MIT
