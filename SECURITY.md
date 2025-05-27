# Security Policy

## Environment Variables

All sensitive data must be stored in environment variables:

### Required Variables
- `CLOUDINARY_API_KEY` - Cloudinary API key (server-side only)
- `CLOUDINARY_API_SECRET` - Cloudinary API secret (server-side only)
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name (public)

### Optional Variables
- `NEXT_PUBLIC_ANALYTICS_ID` - Analytics tracking ID (public)

## Security Best Practices

1. **Never commit `.env` files** - All environment files are gitignored
2. **Use server-side API routes** - Keep API keys on the server
3. **Validate all inputs** - Especially in contact forms and file uploads
4. **Regular dependency updates** - Run `npm audit` regularly
5. **Content Security Policy** - Configured in `next.config.mjs`

## File Upload Security

- File uploads are handled through `/api/upload`
- Only image files are accepted
- Files are validated before upload to Cloudinary
- Maximum file size limits are enforced

## Authentication

- Admin panel uses GitHub OAuth via Netlify
- No user data is stored locally
- All CMS changes require GitHub authentication

## Reporting Security Issues

Please report security vulnerabilities to: [your-email@example.com]