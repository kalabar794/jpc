# Simple Blog Guide

## How to Create a Blog Post (2 minutes)

1. Create a new file in `content/posts/` folder
2. Name it: `your-post-title.md`
3. Add this at the top:

```markdown
---
title: Your Blog Title
slug: your-blog-title
date: 2025-05-26
status: published
heroImage: https://your-image-url.jpg
excerpt: Brief description of your post
category: tutorials
tags:
  - tag1
  - tag2
---

Your blog content goes here in markdown...
```

4. Save, commit, push:
```bash
git add .
git commit -m "Add new blog post"
git push
```

5. Done! Vercel deploys automatically.

## That's it. No CMS needed.

Want a visual editor? Use:
- VS Code with Markdown Preview
- Typora ($15 one-time)
- Obsidian (free)
- Any markdown editor

## Image Hosting
- Use the `/upload` page we built
- Or use Imgur, Cloudinary, or any image host
- Paste the URL in the heroImage field

## Why This is Better
- ✅ No database setup
- ✅ No API errors  
- ✅ Version control built-in
- ✅ Works offline
- ✅ No deployment limits
- ✅ Actually simple