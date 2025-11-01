# Articles Folder

This folder contains all the blog articles in Markdown format.

## How to Add a New Article

### Step 1: Create your Markdown file

Create a new `.md` file in this folder with your article content. For example: `my-new-article.md`

**Markdown Example:**

```markdown
# Your Article Title

This is your introduction paragraph.

## Section Heading

Here's some content with **bold text** and *italic text*.

### Subsection

- Bullet point 1
- Bullet point 2

You can add code blocks:

\`\`\`javascript
const hello = "world";
console.log(hello);
\`\`\`

And inline code: `const x = 5;`

> This is a blockquote
```

### Step 2: Add article metadata

Open `scripts/articles-data.js` and add your article's metadata to the `articlesData` array:

```javascript
{
    id: "my-new-article",           // Unique ID (use kebab-case)
    title: "My New Article",        // Article title
    excerpt: "A brief summary",     // Short description (1-2 sentences)
    date: "2025-11-15",            // Publication date (YYYY-MM-DD)
    readTime: 5,                   // Estimated read time in minutes
    filename: "my-new-article.md"  // The markdown file name
}
```

### Step 3: Test

Open `articles.html` in your browser to see your new article listed. Click on it to view the full content.

## Markdown Tips

- Use `#` for headings (# = h1, ## = h2, ### = h3, etc.)
- Use `**text**` for bold and `*text*` for italic
- Use `` `code` `` for inline code
- Use triple backticks for code blocks with language:
  ```language
  code here
  ```
- Use `> text` for blockquotes
- Use `-` or `*` for bullet lists
- Use `1.` for numbered lists

## File Naming Convention

- Use lowercase letters
- Use hyphens instead of spaces: `my-article.md` not `My Article.md`
- Keep filenames short but descriptive
- Match the filename to the `id` in articles-data.js

## Example Articles

Check `welcome.md` for a complete example with various markdown elements.
