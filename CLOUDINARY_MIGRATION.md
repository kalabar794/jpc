# Cloudinary Migration Guide

## Current Status
- Cloudinary is now enabled in the CMS configuration
- You have 1 image already on Cloudinary (working correctly)
- You have 2 large local images that should be migrated:
  1. `/uploads/gallery/photography/img_9148.jpg` (31.57 MB) - Chollo Cactus Garden
  2. `/uploads/gallery/ai/dsc_2088.jpg` (1.58 MB) - Thailand

## How to Migrate Images to Cloudinary

### Option 1: Through the CMS (Recommended)
1. Go to https://stalwart-smakager-b57fc1.netlify.app/admin/
2. Navigate to Galleries → Photography Gallery Images
3. For each image currently using local storage:
   - Click on the image entry
   - Click the "Choose an image" button for the Image field
   - Select "Upload" and choose the image from your computer
   - Cloudinary will automatically upload and optimize it
   - Save the entry

### Option 2: Direct Upload
1. Log into your Cloudinary account at https://cloudinary.com
2. Upload images to the `portfolio` folder
3. Copy the URL and update the markdown files

## Benefits of Using Cloudinary
- Automatic image optimization (your 31MB image will be compressed)
- CDN delivery for faster loading worldwide
- On-the-fly transformations (different sizes for different devices)
- Reduces Netlify bandwidth usage
- Professional image management

## Verification
After migration, run: `node check-cloudinary.js` to verify all images are using Cloudinary.

## Clean Up
Once migrated, you can delete the large files from:
- `public/uploads/gallery/photography/img_9148.jpg`
- `public/uploads/gallery/ai/dsc_2088.jpg`