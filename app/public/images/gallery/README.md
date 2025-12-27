# Gallery Images

This directory contains images for the photo galleries on the website.

## Directory Structure

- `home-gallery/` - Images for the main gallery on the home page
- `secondary-gallery/` - Images for the secondary gallery on the home page

## Adding Images

1. Place your images in the appropriate directory
2. Supported formats: JPG, JPEG, PNG, WebP
3. Recommended image dimensions:
   - Width: 800-1200px
   - Height: Variable (masonry layout supports different heights)
   - Aspect ratio: Preferably 2:3, 3:4, or similar portrait/landscape ratios

## Using Images in Code

To use your gallery images, update the image arrays in `app/pages/index.vue`:

```typescript
const homeGalleryImages = [
  {
    src: '/images/gallery/home-gallery/image-01.jpg',
    alt: 'Description of image',
    title: 'Optional title shown in lightbox'
  },
  // Add more images...
]
```

## Image Optimization

Images are automatically optimized by Nuxt Image. For best performance:
- Use WebP format when possible
- Keep file sizes under 500KB
- Use descriptive file names (e.g., `norway-landscape-001.jpg`)

## Notes

- The current implementation uses Lorem Picsum for placeholder images
- Replace placeholder URLs with actual image paths from this directory
- The lightbox supports navigation between images using arrow keys
- Images are lazy-loaded for better performance
