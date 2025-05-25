# PROMPT_PLAN.md - AI-Assisted Implementation Roadmap

## Overview
Step-by-step prompts for building your portfolio with AI assistance. Copy these prompts directly into Claude Code or Windsurf.

## Phase 1: Project Setup (Day 1)

### Prompt 1.1 - Initial Setup
```
Create a new Next.js 14 project with TypeScript and Tailwind CSS. Use the app router and set up the following:
1. Clean project structure
2. Tailwind config with custom colors inspired by modern portfolio sites
3. Basic layout.tsx with smooth font loading
4. A beautiful homepage placeholder
Include all necessary config files and explain each step.
```

### Prompt 1.2 - Component Library Setup
```
Set up Framer Motion and create a component library structure:
1. Install framer-motion
2. Create /components/ui folder with basic animated components
3. Create /components/animations folder with reusable animation variants
4. Make a sample AnimatedCard component that scales on hover
Show me the complete file structure and code.
```

### Prompt 1.3 - Navigation Component
```
Create a sticky navigation bar with:
1. Logo/name on the left
2. Menu items: Projects, AI Gallery, Photography, Blog, About, Contact
3. Backdrop blur effect when scrolling
4. Smooth transitions between states
5. Mobile hamburger menu with slide-out drawer
6. Dark mode toggle button
Use Framer Motion for all animations.
```

## Phase 2: Homepage (Day 2-3)

### Prompt 2.1 - Hero Section
```
Create a stunning hero section inspired by high-end portfolio sites:
1. Full viewport height
2. Gradient background with subtle animation
3. Large typography with typewriter effect for taglines
4. Smooth parallax scroll effect
5. Floating geometric shapes in background
6. CTA buttons with hover effects
Make it look premium and modern.
```

### Prompt 2.2 - Featured Projects Section
```
Build a featured projects showcase section:
1. Asymmetric grid layout (like Saatify template)
2. Project cards with image, title, and description
3. Smooth hover effects with image zoom
4. Stagger animation on scroll into view
5. "View All Projects" link with arrow animation
Use placeholder data for 3 projects.
```

### Prompt 2.3 - Services/Expertise Section
```
Create an expertise section highlighting AI and Marketing:
1. Two-column layout on desktop, stacked on mobile
2. Icon animations on hover
3. Brief descriptions with key points
4. Gradient borders or backgrounds
5. Number counters for stats (projects completed, etc.)
Make it visually interesting with micro-interactions.
```

## Phase 3: TinaCMS Integration (Day 4-5)

### Prompt 3.1 - TinaCMS Setup
```
Set up TinaCMS for visual content editing:
1. Install and configure TinaCMS
2. Create content schemas for projects, blog posts, and galleries
3. Set up local development with visual editing
4. Configure Cloudinary for image uploads
5. Create .env.example file with required variables
Provide complete setup instructions and code.
```

### Prompt 3.2 - Content Models
```
Create TinaCMS schemas for:

1. Projects:
   - title, slug, date, heroImage, gallery[], description, techStack[], results, featured

2. Blog Posts:
   - title, slug, date, tags[], excerpt, content (MDX), seoTitle, seoDescription

3. Gallery Images:
   - url, alt, tool, category, date

Include UI customizations for better editing experience.
```

### Prompt 3.3 - Dynamic Pages
```
Connect TinaCMS to Next.js pages:
1. Create dynamic project pages at /projects/[slug]
2. Create dynamic blog pages at /blog/[slug]
3. Add visual editing capabilities
4. Include proper TypeScript types
5. Handle loading and error states
Show complete implementation with data fetching.
```

## Phase 4: Portfolio Section (Day 6-8)

### Prompt 4.1 - Projects Grid
```
Create a beautiful projects grid page:
1. Masonry layout with varying card heights
2. Filter animations (All, Featured, AI, Marketing)
3. Smooth hover effects revealing project details
4. Load more functionality with animation
5. Integration with TinaCMS data
Style it like modern portfolio sites with depth and shadows.
```

### Prompt 4.2 - Project Detail Template
```
Build a stunning project detail page template:
1. Hero section with parallax image
2. Project overview with key stats
3. Image gallery with lightbox
4. Problem/Solution/Results sections
5. Next/Previous project navigation
6. Smooth scroll animations throughout
Make it magazine-quality beautiful.
```

## Phase 5: Gallery Sections (Day 9-11)

### Prompt 5.1 - AI Gallery
```
Create an AI image gallery:
1. Responsive grid with optimal image loading
2. Hover effect showing tool used
3. Lightbox with keyboard navigation
4. Lazy loading with blur-up effect
5. Filter by AI tool (Midjourney, DALL-E, etc.)
6. Integration with Cloudinary
Make it feel smooth and professional.
```

### Prompt 5.2 - Photography Gallery
```
Build a photography portfolio with categories:
1. Tab navigation for categories (Landscape, Macro, Travel, Architecture)
2. Smooth transitions between categories
3. Different grid layouts per category
4. Full-screen viewer with EXIF data
5. Infinite scroll or pagination
6. Mobile swipe gestures
Focus on showcasing images beautifully.
```

## Phase 6: Blog (Day 12-14)

### Prompt 6.1 - Blog Listing
```
Create a modern blog listing page:
1. Card-based layout with featured images
2. Tag filtering with smooth animations
3. Read time calculation
4. Excerpt with "Read more" link
5. Pagination or infinite scroll
6. Search functionality (optional)
Style like Medium or high-end blogs.
```

### Prompt 6.2 - Blog Post Template
```
Design a beautiful blog post template:
1. Large hero image with title overlay
2. Floating table of contents
3. Typography optimized for reading
4. Code syntax highlighting
5. Social share buttons
6. Related posts section
7. Smooth scroll progress indicator
Make reading experience premium.
```

## Phase 7: Additional Pages (Day 15-16)

### Prompt 7.1 - About Page
```
Create an engaging about page:
1. Hero section with professional photo
2. Timeline or story format for background
3. Skills/expertise visualization
4. Call-to-action for contact
5. Reveal animations on scroll
6. Personal but professional tone
Make it memorable and unique.
```

### Prompt 7.2 - Contact Page
```
Build a simple but beautiful contact page:
1. Clean layout with contact information
2. Social media links with hover effects
3. Optional: Interactive background
4. Email link with copy-to-clipboard
5. Professional availability status
Keep it minimal but striking.
```

## Phase 8: Polish & Optimization (Day 17-20)

### Prompt 8.1 - Dark Mode
```
Implement a beautiful dark mode:
1. Smooth transition between modes
2. Persist user preference
3. Adjust all colors for readability
4. Special attention to images/galleries
5. Subtle animations for toggle
Ensure both modes look equally polished.
```

### Prompt 8.2 - Performance Optimization
```
Optimize site performance:
1. Implement proper image optimization
2. Add loading states for all dynamic content
3. Optimize fonts loading
4. Minimize JavaScript bundles
5. Add proper meta tags for SEO
6. Generate sitemap
Maintain 90+ Lighthouse scores.
```

### Prompt 8.3 - Mobile Experience
```
Perfect the mobile experience:
1. Test all interactions on touch devices
2. Optimize navigation for thumb reach
3. Ensure smooth scrolling performance
4. Adjust animations for mobile
5. Fix any layout issues
6. Add proper viewport handling
Make mobile experience feel native.
```

### Prompt 8.4 - Final Polish
```
Add final touches:
1. Custom 404 page with animation
2. Loading animation between pages
3. Micro-interactions on buttons/links
4. Easter eggs or delightful surprises
5. Accessibility improvements
6. Cross-browser testing fixes
Make it feel complete and polished.
```

## Deployment

### Prompt 9.1 - Vercel Setup
```
Prepare for Vercel deployment:
1. Environment variables configuration
2. Build optimization settings
3. Domain setup instructions
4. Analytics integration
5. Performance monitoring
6. Automatic deployments from Git
Provide step-by-step deployment guide.
```

## Troubleshooting Prompts

### If something breaks:
```
I'm getting this error: [paste error]
In this component: [paste code]
Please fix it and explain what went wrong.
```

### For styling issues:
```
This component doesn't look right: [description/screenshot]
Make it look like [reference site] with smooth animations.
Here's my current code: [paste code]
```

### For performance issues:
```
My [page/component] is loading slowly.
Please optimize it for better performance while maintaining all functionality.
Current code: [paste code]
```

## Tips for Success

1. **Test frequently** - Run the dev server after each major change
2. **Use version control** - Commit working code before major changes
3. **Keep it simple** - Don't add complexity unless needed
4. **Visual first** - Focus on how it looks and feels
5. **Ask for help** - If stuck, provide context and error messages

Remember: You're building something beautiful. Take time to perfect the details!