# Contentful Setup (5 minutes)

## 1. Create Contentful Account
1. Go to https://www.contentful.com/
2. Sign up (free)
3. Create new space (name it "Portfolio" or whatever)

## 2. Create Content Model
In Contentful dashboard:

1. Go to "Content model" → "Add content type"
2. Name: "Blog Post" (ID: blogPost)
3. Add these fields:

| Field | Type | Required |
|-------|------|----------|
| title | Short text | Yes |
| slug | Short text | Yes |
| excerpt | Long text | Yes |
| content | Rich text | Yes |
| heroImage | Media | No |
| publishedDate | Date & time | Yes |
| category | Short text | Yes |
| tags | Short text, List | No |
| featured | Boolean | No |
| seoTitle | Short text | No |
| seoDescription | Long text | No |
| seoKeywords | Short text, List | No |

## 3. Get API Keys
1. Settings → API keys
2. Add API key
3. Copy:
   - Space ID
   - Content Delivery API - access token

## 4. Add to Vercel
In Vercel dashboard → Settings → Environment Variables:

```
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
```

## 5. That's it!
- Create content in Contentful's nice UI
- It appears on your site instantly
- No Git commits needed
- Images handled by Contentful