# CLAUDE.md - AI Assistant Development Guidelines

## Overview
This document provides instructions for AI assistants (Claude Code, Windsurf) helping build a portfolio website. The developer is NOT a professional programmer but loves creating with AI assistance.

## Key Context
- **Developer Style:** "Vibe coding" - relies heavily on AI assistance
- **Technical Level:** Enthusiast, not professional developer
- **Preferences:** Visual beauty, smooth animations, simple solutions
- **Avoids:** Complex databases, backend logic, authentication

## Development Environment
- **Planning:** Claude Desktop/Opus
- **Coding:** Claude Code (Claude 4 Sonnet) + Windsurf (Claude 3.7 Sonnet)
- **Stack:** Next.js 14+, Tailwind CSS, TinaCMS, Vercel

## Communication Guidelines

### Always:
- Write complete, working code blocks
- Include all imports and dependencies
- Explain what the code does in simple terms
- Provide copy-paste ready solutions
- Test for common edge cases

### Never:
- Assume prior programming knowledge
- Use complex programming terminology without explanation
- Suggest database solutions
- Recommend authentication systems
- Create overly complex architectures

## Code Style Preferences

### Component Structure
```typescript
// GOOD - Simple, readable, complete
import { motion } from 'framer-motion'

export default function ProjectCard({ title, image, description }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="rounded-lg overflow-hidden shadow-lg"
    >
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  )
}
```

### Animation Patterns
```typescript
// Reusable animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

// Apply to components
<motion.div {...fadeInUp}>
  Content here
</motion.div>
```

## Common Tasks & Solutions

### Task: "Add smooth scroll animations"
```typescript
// Install: npm install framer-motion
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxSection({ children }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -200])
  
  return (
    <motion.div style={{ y }} className="relative">
      {children}
    </motion.div>
  )
}
```

### Task: "Create a masonry grid for projects"
```typescript
// Using CSS Grid for simplicity
export default function ProjectGrid({ projects }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={index % 3 === 0 ? 'md:row-span-2' : ''}
        >
          <ProjectCard {...project} />
        </motion.div>
      ))}
    </div>
  )
}
```

### Task: "Add dark mode"
```typescript
// Simple dark mode with Tailwind
// 1. Add to tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ... rest of config
}

// 2. Create hook
import { useEffect, useState } from 'react'

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false)
  
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])
  
  return [isDark, setIsDark]
}

// 3. Use in component
<button onClick={() => setIsDark(!isDark)}>
  {isDark ? '☀️' : '🌙'}
</button>
```

## TinaCMS Integration

### Setting Up Visual Editing
```javascript
// tina/config.js
export default defineConfig({
  branch: 'main',
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  
  schema: {
    collections: [
      {
        name: 'project',
        label: 'Projects',
        path: 'content/projects',
        ui: {
          allowedActions: {
            create: true,
            delete: true,
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            required: true,
          },
          {
            type: 'image',
            name: 'heroImage',
            label: 'Hero Image',
          },
          {
            type: 'rich-text',
            name: 'content',
            label: 'Content',
            isBody: true,
          },
        ],
      },
    ],
  },
})
```

### Using in Pages
```typescript
// Simple TinaCMS usage
import { useTina } from 'tinacms/dist/react'

export default function ProjectPage({ data, query, variables }) {
  const { data: tinaData } = useTina({ query, variables, data })
  
  return (
    <article>
      <h1>{tinaData.project.title}</h1>
      <img src={tinaData.project.heroImage} />
      <TinaMarkdown content={tinaData.project.content} />
    </article>
  )
}
```

## Common Gotchas & Solutions

### Image Optimization
```typescript
// Always use Next.js Image component
import Image from 'next/image'

// Good
<Image 
  src={cloudinaryUrl} 
  width={800} 
  height={600} 
  alt="Description"
  className="rounded-lg"
/>

// Avoid
<img src={url} />
```

### Performance Tips
```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic'

const Gallery = dynamic(() => import('@/components/Gallery'), {
  loading: () => <div>Loading gallery...</div>,
  ssr: false
})
```

### Responsive Design
```typescript
// Mobile-first approach
<div className="
  p-4           // mobile
  md:p-6        // tablet
  lg:p-8        // desktop
  xl:p-10       // large screens
">
```

## Debugging Help

### Common Issues:
1. **"Module not found"** → Run `npm install [package-name]`
2. **"Hydration error"** → Check for client-only code in SSR
3. **"Image not loading"** → Add domain to next.config.js
4. **"Style not applying"** → Check Tailwind class names

### Quick Fixes:
```bash
# Clear cache
rm -rf .next
npm run dev

# Update dependencies
npm update

# Check for errors
npm run build
```

## AI Prompt Templates

### For New Features:
"Create a [component type] that [does something] with [specific style]. Use Framer Motion for animations and Tailwind for styling. Make it responsive and include dark mode support."

### For Bug Fixes:
"This [component/feature] is [problem description]. The error message is [error]. Please provide a complete working solution."

### For Styling:
"Style this component to look like [reference/description]. Use Tailwind classes and ensure it works on mobile, tablet, and desktop."

## Remember:
- The developer prefers visual, working examples over explanations
- Always provide complete, copy-paste solutions
- Test code mentally before providing
- Keep solutions simple and maintainable
- Prioritize visual beauty and smooth animations