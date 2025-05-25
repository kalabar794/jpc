# TinaCMS Setup Guide

## Overview
This portfolio website is configured with TinaCMS for visual content management. The setup includes schemas for projects, blog posts, gallery images, and site settings.

## Current Status ✅

### ✅ Completed
- **TinaCMS Installation**: All necessary packages installed
- **Content Schemas**: Complete schemas for all content types
- **Sample Content**: Example projects and blog posts created
- **Content Layer**: Fallback system for local development
- **Admin Interface**: Basic admin page at `/admin`

### 🔄 In Progress
- **Cloud Configuration**: Requires TinaCMS Cloud setup
- **Visual Editing**: Needs cloud credentials for full functionality

## Content Structure

### Projects (`content/projects/`)
- **Fields**: title, slug, date, featured, status, heroImage, excerpt, content, techStack, metrics, category
- **Sample Files**: 
  - `ai-marketing-generator.md`
  - `social-media-analyzer.md`

### Blog Posts (`content/posts/`)
- **Fields**: title, slug, date, status, featured, heroImage, excerpt, content, tags, category, readTime
- **Sample Files**:
  - `future-of-ai-marketing.md`

### Gallery Images (`content/gallery/`)
- **Fields**: title, image, alt, description, category, tool, date, tags, featured

### Site Settings (`content/settings/`)
- **Fields**: site info, social media, SEO defaults
- **File**: `site.md`

## TinaCMS Configuration

### Local Development
Currently configured for local file-based editing:
```bash
npm run dev        # Standard Next.js development
npm run dev:tina   # With TinaCMS (requires cloud setup)
```

### Cloud Setup (Required for Visual Editing)

1. **Create TinaCMS Cloud Account**
   - Visit [tina.io](https://tina.io)
   - Create account and new project
   - Get Client ID and Token

2. **Environment Variables**
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id
   TINA_TOKEN=your_token
   NEXT_PUBLIC_TINA_BRANCH=main
   ```

3. **Generate TinaCMS Files**
   ```bash
   npm run tina:build
   ```

4. **Start with Visual Editing**
   ```bash
   npm run dev:tina
   ```

## Content Management

### Current System
- **File-based**: Content stored in markdown files
- **Git-backed**: All changes tracked in version control
- **Type-safe**: Full TypeScript interfaces for all content

### Adding New Content

#### New Project
1. Create file in `content/projects/project-name.md`
2. Follow the schema in existing examples
3. Set `featured: true` to show on homepage

#### New Blog Post
1. Create file in `content/posts/post-name.md`
2. Include SEO metadata in frontmatter
3. Use rich-text content field for body

#### Gallery Images
1. Create file in `content/gallery/image-name.md`
2. Specify category and tool used
3. Add descriptive tags

## Content API

The site includes helper functions for accessing content:

```typescript
// Get all projects
const projects = await getProjects()

// Get featured projects only
const featured = await getFeaturedProjects()

// Get single project by slug
const project = await getProject('ai-marketing-generator')

// Similar functions for posts and gallery
```

## Visual Editing Features (When Configured)

- **Inline Editing**: Edit content directly on the website
- **Media Management**: Upload and organize images
- **Live Preview**: See changes instantly
- **Content Validation**: Ensure required fields are filled
- **Git Integration**: Automatic commits on save

## File Structure
```
content/
├── projects/           # Portfolio projects
├── posts/             # Blog articles
├── gallery/           # Image collections
└── settings/          # Site configuration

tina/
├── config.ts          # TinaCMS schema definition
└── __generated__/     # Auto-generated types (after build)

src/lib/
├── content.ts         # File-based content layer
└── tina.ts           # TinaCMS client (when configured)
```

## Quick Setup (Recommended)

Run the automated setup script:
```bash
npm run setup:cms
```

This will guide you through:
1. TinaCMS Cloud configuration
2. Cloudinary setup (optional)
3. Environment variable updates
4. TinaCMS build process

## Manual Setup

If you prefer manual setup, follow the original steps below.

## Next Steps

1. **Run setup script**: `npm run setup:cms` (easiest option)
2. **Set up TinaCMS Cloud** for visual editing
3. **Configure Cloudinary** for image optimization
4. **Add more content** to populate the site
5. **Customize schemas** as needed for specific use cases

## Troubleshooting

### Build Issues
- Remove `tina/__generated__` if build fails
- Ensure environment variables are set correctly
- Use `npm run build` instead of `npm run build:tina` for deployment

### Content Not Showing
- Check file paths match schema configuration
- Verify frontmatter format matches schema
- Ensure `status: 'published'` for public content

### TinaCMS Errors
- Verify cloud configuration and credentials
- Check network connectivity to TinaCMS services
- Review browser console for specific error messages

This setup provides a solid foundation for content management while maintaining the flexibility to enhance with visual editing capabilities later.