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
- Upload images and add cover images to articles

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
  main_image: "https://example.com/cover-image.jpg",
  published: true
});
// Returns: { id, url, title, slug }
```

#### updateDevToArticle(articleId, article)
```typescript
import { updateDevToArticle } from 'devto-skill';

await updateDevToArticle(12345, {
  title: "Updated Title",
  body_markdown: "Updated content",
  main_image: "https://example.com/new-cover.jpg"
});
```

#### uploadImage(imageUrl)
Upload an image to dev.to and get a URL for use in articles:
```typescript
import { uploadImage } from 'devto-skill';

// Upload from any URL (AI-generated or web search)
const image = await uploadImage("https://example.com/ai-generated-image.png");
// Returns: { url: "https://dev-to-uploads...", id: 123 }

// Use in post
await postToDevTo({
  title: "My Post",
  body_markdown: "# Content",
  main_image: image.url
});
```

#### parsePostCommand(text)
```typescript
import { parsePostCommand } from 'devto-skill';

// User says: "post My Blog | Hello world | description | https://image.jpg"
const parsed = parsePostCommand(text);
// Returns: { title: "My Blog", body: "Hello world", description: "description", image: "https://image.jpg" }
```

## Cover Image Tips

When publishing blogs, always add a cover image:
1. **AI-generated**: Use DALL-E, Midjourney, Stable Diffusion, etc.
2. **Web search**: Find relevant images from Unsplash, Pexels, etc.

The `main_image` field accepts any publicly accessible URL.

## License

MIT
