# Bulk Upload Guide for Cloudinary

## Option 1: Cloudinary Dashboard (Easiest)
1. Go to https://cloudinary.com/console
2. Click on "Media Library"
3. Create a folder called "portfolio" if it doesn't exist
4. Drag and drop multiple images at once
5. Images will be automatically optimized
6. They'll appear in your CMS when you click "Choose an image"

## Option 2: Bulk Upload Tool (Local)
I've created a bulk upload page for you:

1. **Access it at**: https://stalwart-smakager-b57fc1.netlify.app/bulk-upload.html
2. Click "Upload Multiple Images"
3. Select multiple files (up to 20 at once)
4. Images are automatically:
   - Optimized for web (auto quality)
   - Converted to WebP where supported
   - Limited to 2000x2000px max
   - Stored in your portfolio folder

## Option 3: Cloudinary CLI (For Developers)
```bash
# Install Cloudinary CLI
npm install -g cloudinary-cli

# Configure with your credentials
export CLOUDINARY_URL=cloudinary://194453126296877:YOUR_API_SECRET@dqltlwqi2

# Bulk upload a folder
cld uploader upload "photos/*.jpg" folder=portfolio
```

## After Uploading
1. Go to your CMS admin panel
2. Edit the Photography Gallery
3. Add new image entries
4. Click "Choose an image" 
5. Your bulk uploaded images will appear in the Cloudinary picker
6. Select and save

## Benefits of Cloudinary Bulk Upload
- Automatic optimization (your 31MB image → ~2-3MB)
- Multiple format support (WebP, AVIF)
- Responsive image delivery
- Global CDN distribution
- No impact on Netlify bandwidth

## Tips
- Upload high-quality originals - Cloudinary will optimize
- Use descriptive filenames before uploading
- Organize into folders for easier management
- The bulk upload tool shows URLs if you need them