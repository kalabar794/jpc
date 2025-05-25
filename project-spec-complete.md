# PROJECT_SPEC.md - Portfolio Website Technical Specification

## Project Overview
Professional portfolio website showcasing AI and marketing expertise with focus on visual beauty, smooth interactions, and simple content management.

## Technical Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + Tailwind UI
- **CMS:** TinaCMS (Git-based, visual editing)
- **Hosting:** Vercel
- **Image CDN:** Cloudinary
- **Animations:** Framer Motion
- **Components:** Aceternity UI / Magic UI
- **Development:** Claude Code + Windsurf IDE

## Design Inspiration Analysis

### From Coinsetters:
- Smooth parallax scrolling
- Card hover effects with 3D transforms
- Gradient overlays on images
- Number count-up animations
- Sticky navigation with backdrop blur

### From Home Guide:
- Clean grid layouts
- Professional typography hierarchy
- Subtle fade-in animations
- Image reveal effects on scroll
- Organized content sections

### From Saatify:
- Bold hero sections
- Smooth page transitions
- Interactive cursor effects
- Premium feeling micro-animations
- Dark mode with vibrant accents

## Core Features

### 1. Portfolio Projects (5-10 items)
- **Fields:** Title, description, hero image, gallery, tech stack, results, CTA
- **Display:** Masonry grid with hover effects
- **Detail Pages:** Full case study layout
- **Update Frequency:** Monthly

### 2. AI Image Gallery (50 images)
- **Organization:** Single gallery, filterable by tool
- **Metadata:** Tool used, creation date
- **Display:** Responsive grid with lightbox
- **Loading:** Lazy loading with blur-up effect

### 3. Photography Gallery
- **Categories:** Landscape, Macro, Travel, Architecture
- **Display:** Category tabs with smooth transitions
- **Features:** Full-screen viewer, keyboard navigation

### 4. Blog Platform
- **Editor:** TinaCMS visual editor
- **Features:** Tags, SEO optimization, read time
- **Frequency:** Bi-weekly posts
- **Design:** Medium-inspired reading experience

### 5. About Section
- **Content:** Bio, expertise, services
- **Design:** Timeline or story format
- **Animations:** Reveal on scroll

### 6. Contact
- **Simple:** Email link, social media icons
- **No forms:** Direct mailto: link

## Technical Architecture

### File Structure
```
portfolio-site/
├── app/
│   ├── (routes)/
│   │   ├── page.tsx              # Home
│   │   ├── projects/
│   │   │   ├── page.tsx          # Portfolio grid
│   │   │   └── [slug]/page.tsx   # Project details
│   │   ├── gallery/
│   │   │   ├── ai/page.tsx       # AI images
│   │   │   └── photography/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx          # Blog listing
│   │   │   └── [slug]/page.tsx   # Blog post
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                       # Reusable components
│   ├── sections/                 # Page sections
│   └── animations/               # Animation wrappers
├── content/                      # TinaCMS content
│   ├── projects/
│   ├── posts/
│   └── pages/
├── lib/
│   ├── animations.ts             # Framer Motion variants
│   └── utils.ts
├── public/
└── tina/
    ├── config.ts                 # CMS configuration
    └── templates/                # Content templates
```

### Performance Requirements
- **Lighthouse Score:** 90+ on all metrics
- **Loading:** < 3s on 3G
- **Images:** WebP with fallbacks
- **Fonts:** Variable fonts, self-hosted

### SEO Implementation
- **Meta Tags:** Dynamic per page
- **Open Graph:** Auto-generated
- **Sitemap:** Automatic
- **Schema.org:** Portfolio/Blog markup

### Animation System
```javascript
// Standardized animation variants
const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  },
  scaleIn: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 }
  },
  slideIn: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 }
  }
}
```

### Color System
```css
/* Inspired by reference sites */
:root {
  /* Light mode */
  --primary: #0066FF;
  --secondary: #7C3AED;
  --accent: #10B981;
  --background: #FFFFFF;
  --surface: #F9FAFB;
  --text: #111827;
  
  /* Dark mode */
  --dark-background: #0F172A;
  --dark-surface: #1E293B;
  --dark-text: #F1F5F9;
}
```

## Content Management

### TinaCMS Configuration
- **Visual Editing:** On-page editing
- **Media:** Cloudinary integration
- **Preview:** Real-time updates
- **Git Backend:** Automatic commits

### Content Types
1. **Projects Schema**
   - title (string)
   - slug (string, auto-generated)
   - date (datetime)
   - hero (image)
   - gallery (image list)
   - description (rich text)
   - tech (tags)
   - results (rich text)

2. **Blog Schema**
   - title (string)
   - slug (string, auto-generated)
   - date (datetime)
   - tags (list)
   - excerpt (text)
   - content (rich text)
   - seo (object)

3. **Gallery Schema**
   - images (list)
     - url (cloudinary)
     - tool (select)
     - date (datetime)

## Development Phases

### Phase 1: Foundation (Days 1-3)
- Next.js setup with TypeScript
- Tailwind configuration
- Basic routing structure
- Component architecture
- Vercel deployment

### Phase 2: CMS Integration (Days 4-5)
- TinaCMS setup
- Content schemas
- Visual editing config
- Cloudinary integration

### Phase 3: Core Pages (Days 6-10)
- Homepage with hero
- Portfolio grid + details
- About page
- Basic animations

### Phase 4: Galleries (Days 11-13)
- AI gallery implementation
- Photography categories
- Lightbox functionality
- Image optimization

### Phase 5: Blog (Days 14-16)
- Blog listing page
- Post template
- Tag system
- SEO optimization

### Phase 6: Polish (Days 17-20)
- Advanced animations
- Dark mode
- Performance optimization
- Final design touches

## Success Metrics
- Page load < 3 seconds
- No database complexity
- Visual editing working
- All content types manageable
- Animations smooth on mobile
- SEO fundamentals in place