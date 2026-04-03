# 🥭 Premium Mango Hero Image Setup Guide

## 📋 Quick Overview

Your hero image needs to be:
- **Dimensions**: 1920x1080 (16:9 aspect ratio)
- **File Format**: WebP (best) or PNG (fallback)
- **File Size**: <500KB (optimized)
- **Resolution**: 4K quality (sharp and crisp)

---

## 🚀 Step 1: Generate Image with Midjourney

### Optimized Prompt:
```
Ultra photorealistic Karthakolomban mango, fresh ripe golden-yellow, 
floating centered in frame, isolated on dark gradient background (black to deep green), 
soft golden spotlight glow around fruit, subtle warm highlights showing freshness, 
natural skin texture with realistic imperfections, luxury e-commerce product photography style, 
cinematic lighting with soft halo behind, smooth depth shadow below, 
minimal composition with plenty of empty space, sharp focus, 8K resolution, 
professional product shot for website hero image, premium luxury aesthetic.

--ar 16:9 --v 6 --style raw --q 2
```

**Settings**:
- `--ar 16:9` = Correct aspect ratio for hero section
- `--v 6` = Latest Midjourney model (best quality)
- `--style raw` = Photorealistic look
- `--q 2` = Maximum quality

### After Generation:
1. Download the highest resolution available
2. Upscale if option available
3. Export as PNG

---

## 🖼️ Step 2: Optimize Image for Web

### Option A: Online Tools (Easiest)
1. Go to [Squoosh.app](https://squoosh.app)
2. Upload your PNG
3. Convert to **WebP** format
4. Reduce file to ~500KB (quality 80-85)
5. Download

### Option B: Command Line (Best Quality)
```bash
# Install ImageMagick if needed
# Then optimize:
convert mango-hero.png -resize 1920x1080 -quality 85 mango-hero-optimized.webp
convert mango-hero.png -resize 1920x1080 -quality 85 mango-hero-optimized.jpg
```

### Option C: Online Batch
Use [TinyPNG](https://tinypng.com) for PNG/JPG optimization

---

## 📁 Step 3: Host the Image

### Option 1: GitHub (Recommended for your setup)
```bash
# Create folder in your repo
mkdir -p frontend/public/images/hero

# Copy your optimized image
cp mango-hero-optimized.webp frontend/public/images/hero/
cp mango-hero-optimized.jpg frontend/public/images/hero/  # Fallback

# Commit and push
git add frontend/public/images/hero/
git commit -m "feat: Add premium mango hero image"
git push origin main
```

### Option 2: Cloudinary (Free CDN with Optimization)
1. Sign up at [Cloudinary](https://cloudinary.com)
2. Upload image (auto-optimized)
3. Copy the CDN URL
4. Use in `HeroSection.jsx`

### Option 3: AWS S3 or Azure Blob (For Scaling)
Good for future scaling but overkill for now.

---

## 🔧 Step 4: Update Your Hero Component

Edit `frontend/src/components/HeroSection.jsx`:

Replace this line:
```jsx
<img src="https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&h=800&fit=crop" alt="Premium Ceylon Mango" className="w-72 h-72 md:w-[420px] md:h-[420px] object-cover rounded-full mango-glow" style={{
  filter: 'drop-shadow(0 0 40px rgba(239,184,6,0.4))'
}} />
```

With:
```jsx
<picture>
  <source srcSet="/images/hero/mango-hero-optimized.webp" type="image/webp" />
  <source srcSet="/images/hero/mango-hero-optimized.jpg" type="image/jpeg" />
  <img 
    src="/images/hero/mango-hero-optimized.jpg" 
    alt="Premium Sri Lankan Karthakolomban Mango" 
    className="w-72 h-72 md:w-[420px] md:h-[420px] object-cover rounded-full mango-glow" 
    style={{
      filter: 'drop-shadow(0 0 40px rgba(239,184,6,0.4))'
    }}
    loading="eager"
  />
</picture>
```

**Benefits**:
- WebP for modern browsers (smaller file)
- JPG fallback for older browsers
- `loading="eager"` for immediate load
- `<picture>` for responsive images

---

## 📊 Performance Tips

### 1. Use Image CDN with On-the-fly Optimization
```jsx
// Using Cloudinary example
const imageUrl = `https://res.cloudinary.com/YOUR_CLOUD_NAME/image/fetch/w_1920,h_1080,q_auto,f_auto/https://your-hosted-image-url`;
```

### 2. Add Lazy Loading for Below-Fold Images
```jsx
loading="lazy" // Already done for hero
```

### 3. Preload Hero Image in HTML Head
Add to `frontend/index.html`:
```html
<link rel="preload" as="image" href="/images/hero/mango-hero-optimized.webp" />
```

### 4. Cache Optimization
Add headers in your web server config:
```
Cache-Control: public, max-age=31536000, immutable
```

---

## 🎨 Step 5: Visual Tweaks (if needed)

### Enhanced Glow Effect
If you want stronger glow, update `HeroSection.jsx`:
```jsx
<div className="absolute inset-0 flex items-center justify-center">
  <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#EFB806]/30 blur-3xl" /> {/* Increased from /20 to /30 */}
</div>
```

### Add Spotlight Animation
```jsx
animate={{
  boxShadow: [
    '0 0 60px rgba(239,184,6,0.3)',
    '0 0 80px rgba(239,184,6,0.5)',
    '0 0 60px rgba(239,184,6,0.3)',
  ]
}}
transition={{
  duration: 4,
  repeat: Infinity,
  ease: 'easeInOut'
}}
```

---

## ✅ Quality Checklist

- [ ] Image dimensions: 1920x1080 (16:9)
- [ ] File format: WebP + JPG fallback
- [ ] File size: <500KB compressed
- [ ] Resolution: 4K (sharp, clear)
- [ ] Mango: Centered, floating
- [ ] Glow: Soft golden halo
- [ ] Background: Dark gradient (black to green)
- [ ] Details: Natural texture visible
- [ ] No text in image
- [ ] No extra objects
- [ ] Premium/luxury aesthetic

---

## 🚀 Deployment

After making changes:

```bash
# Commit changes
git add frontend/src/components/HeroSection.jsx
git add frontend/public/images/hero/
git commit -m "feat: Integrate premium Karthakolomban mango hero image"

# Push to GitHub
git push origin main

# Your changes deploy automatically to frontend
```

---

## 📸 Alternative: Stock Images (Temporary)

If you want to use premium stock images while creating the custom one:

**Recommended Stock Sites**:
- [Unsplash Premium](https://unsplash.com) - Free, high quality
- [Pexels Premium](https://www.pexels.com) - Free
- [Shutterstock](https://www.shutterstock.com) - Paid, best selection
- [Getty Images](https://www.gettyimages.com) - Premium

**Search terms for mango**:
- "Fresh ripe mango"
- "Golden mango floating"
- "Premium mango product"
- "Sri Lanka mango"

---

## 💡 Pro Tips

1. **A/B Test**: Create 2-3 variations and test which converts best
2. **Responsive**: Use srcset for different screen sizes
3. **Alt Text**: Always include descriptive alt text for SEO
4. **Compression**: Compress every image 2-3 times for web
5. **Progressive Load**: Use blur placeholder while loading

---

## 📞 Support

If image doesn't display:
1. Check image path: `/images/hero/mango-hero-optimized.webp`
2. Verify file exists in folder
3. Check browser console for 404 errors
4. Clear browser cache (Ctrl+Shift+Delete)
5. Try fallback JPG format

---

**Next Steps**:
1. Generate image with Midjourney
2. Optimize with Squoosh
3. Upload to `/frontend/public/images/hero/`
4. Update `HeroSection.jsx`
5. Commit and push
6. Deploy! 🚀

