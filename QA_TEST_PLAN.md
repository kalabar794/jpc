# QA Test Plan - Jonathon's Portfolio Website

## Overview
This document outlines the comprehensive QA test plan for the portfolio website, covering both automated and manual test scenarios.

## Test Environment
- **Production URL**: https://stalwart-smakager-b57fc1.netlify.app
- **Browsers**: Chrome, Firefox, Safari, Edge
- **Devices**: Desktop (1920x1080, 1366x768), Tablet (768x1024), Mobile (375x667)
- **Test Framework**: Playwright

## Critical User Flows

### 1. Homepage Journey
- [ ] Page loads successfully
- [ ] Hero section animation completes
- [ ] All images load properly
- [ ] CTA buttons are clickable
- [ ] Smooth scrolling works
- [ ] Services section displays correctly
- [ ] Featured projects load

### 2. Navigation
- [ ] All navigation links work
- [ ] Mobile menu opens/closes
- [ ] Active states display correctly
- [ ] Logo links to homepage
- [ ] Smooth scroll to sections

### 3. Blog Functionality
- [ ] Blog listing page loads
- [ ] Posts display with correct metadata
- [ ] Search functionality works
- [ ] Category filtering works
- [ ] Individual blog posts load
- [ ] Images in posts display
- [ ] Related posts show

### 4. Projects Portfolio
- [ ] Projects listing loads
- [ ] Filter by category works
- [ ] Project cards hover states
- [ ] Individual project pages load
- [ ] Gallery images display
- [ ] Demo/GitHub links work

### 5. Contact Form
- [ ] Form displays correctly
- [ ] Required field validation
- [ ] Email validation
- [ ] Success message on submission
- [ ] Error handling
- [ ] Form resets after submission

### 6. CMS (Admin)
- [ ] GitHub OAuth login works
- [ ] Can create new blog post
- [ ] Can edit existing post
- [ ] Can upload images
- [ ] Publishing workflow functions
- [ ] Changes reflect on live site

### 7. Theme Toggle
- [ ] Dark mode toggle works
- [ ] Theme persists on refresh
- [ ] All elements styled correctly in both themes
- [ ] No flash of wrong theme on load

### 8. Performance & SEO
- [ ] Pages load under 3 seconds
- [ ] Images are optimized
- [ ] Meta tags present on all pages
- [ ] Open Graph tags work
- [ ] Sitemap accessible
- [ ] No console errors

### 9. Responsive Design
- [ ] Mobile menu functionality
- [ ] Text readable on all devices
- [ ] Images scale properly
- [ ] Touch targets adequate size
- [ ] No horizontal scroll

### 10. Accessibility
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Alt text on images
- [ ] ARIA labels present
- [ ] Color contrast passes WCAG

## Known Issues to Check
1. Blog post status (draft vs published) sync with CMS
2. Cloudinary image uploads and display
3. Git Gateway deprecation impacts
4. Build deployment timing

## Regression Tests
Run after each deployment:
1. All navigation links
2. Blog post creation
3. Contact form submission
4. Theme toggle persistence
5. Image loading

## Test Data
- Test blog post with all fields
- Test project with gallery images
- Test contact form submissions
- Various image formats (jpg, png, webp)

## Success Criteria
- All critical paths function without errors
- No console errors in production
- Page load times under 3 seconds
- All forms validate and submit correctly
- CMS changes reflect within 5 minutes