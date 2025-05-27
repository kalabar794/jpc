import { getContent } from '@/lib/content'
import { generatePageMetadata } from '@/lib/metadata'
import AboutPageClient from './AboutPageClient'

export async function generateMetadata() {
  try {
    const aboutContent = await getContent('pages', 'about')
    
    if (aboutContent?.seo) {
      return generatePageMetadata({
        title: aboutContent.seo.title || 'About',
        description: aboutContent.seo.description || 'Learn more about us',
        keywords: aboutContent.seo.keywords
      })
    }
  } catch (error) {
    console.error('Error loading about metadata:', error)
  }
  
  return generatePageMetadata({
    title: 'About',
    description: 'Learn more about us'
  })
}

export default async function AboutPage() {
  try {
    const aboutContent = await getContent('pages', 'about')
    
    if (aboutContent) {
      return <AboutPageClient content={aboutContent} />
    }
  } catch (error) {
    console.error('Error loading about content:', error)
  }
  
  // Fallback content if CMS content is not available
  const fallbackContent = {
    title: 'About Me',
    heroTitle: 'Jonathon Carter',
    heroSubtitle: 'Marketing Director • 20+ Years of Experience • Digital Marketing Strategist • Driving Business Growth & User Engagement • Master\'s in Marketing Management',
    bio: 'Jonathon is a Los Angeles-based Marketing Director with over 20 years of experience in digital marketing strategy. With a Master\'s in Marketing Management, he specializes in driving business growth and optimizing user engagement across multiple platforms and industries. His expertise spans from traditional marketing to cutting-edge AI technologies, helping businesses achieve measurable results and sustainable growth.',
    expertise: [
      { name: 'Marketing Management & Strategy', gradient: 'from-blue-500 to-purple-500' },
      { name: 'Team Leadership', gradient: 'from-green-500 to-teal-500' },
      { name: 'Social Media Management', gradient: 'from-pink-500 to-rose-500' },
      { name: 'SEO & SEM', gradient: 'from-yellow-500 to-orange-500' },
      { name: 'Email Marketing', gradient: 'from-purple-500 to-pink-500' },
      { name: 'Trade Shows/Events', gradient: 'from-indigo-500 to-blue-500' },
      { name: 'Emerging AI Technologies', gradient: 'from-cyan-500 to-blue-500' },
      { name: 'Competitive Analysis', gradient: 'from-red-500 to-pink-500' },
      { name: 'Content Marketing/Development', gradient: 'from-green-500 to-emerald-500' },
      { name: 'PR', gradient: 'from-violet-500 to-purple-500' },
      { name: 'eCommerce', gradient: 'from-orange-500 to-red-500' },
      { name: 'B2B/B2C', gradient: 'from-blue-500 to-indigo-500' },
      { name: 'Marketing Research', gradient: 'from-teal-500 to-cyan-500' },
      { name: 'Mobile Apps', gradient: 'from-pink-500 to-purple-500' },
      { name: 'Traditional Marketing', gradient: 'from-amber-500 to-orange-500' },
      { name: 'Conversion Optimization', gradient: 'from-emerald-500 to-green-500' }
    ],
    industries: [
      { name: 'Financial Services', gradient: 'from-blue-600 to-indigo-600' },
      { name: 'FinTech', gradient: 'from-purple-600 to-pink-600' },
      { name: 'Consumer Packaged Goods', gradient: 'from-green-600 to-teal-600' },
      { name: 'Internet', gradient: 'from-cyan-600 to-blue-600' },
      { name: 'Music', gradient: 'from-pink-600 to-rose-600' },
      { name: 'Computer Software', gradient: 'from-indigo-600 to-purple-600' },
      { name: 'E-Commerce', gradient: 'from-orange-600 to-red-600' },
      { name: 'Health & Wellness', gradient: 'from-emerald-600 to-green-600' },
      { name: 'Marketing Agency', gradient: 'from-violet-600 to-indigo-600' }
    ],
    experience: [
      {
        company: 'WEO Media - Dental Marketing',
        role: 'Senior Marketing Manager',
        description: 'Led digital marketing strategies for dental practices, optimizing marketing ROI through data-driven decisions',
        gradient: 'from-blue-500 to-purple-500',
        icon: '🦷'
      },
      {
        company: 'SoundSplore Inc.',
        role: 'Marketing Director',
        description: 'Directed marketing initiatives for music technology startup',
        gradient: 'from-pink-500 to-rose-500',
        icon: '🎵'
      },
      {
        company: 'LA Photo Party',
        role: 'Marketing Manager',
        description: 'Managed event marketing strategy and brand development',
        gradient: 'from-yellow-500 to-orange-500',
        icon: '📸'
      }
    ],
    education: [
      {
        degree: 'Master\'s in Marketing Management',
        institution: 'University of Leicester, UK',
        icon: '🎓',
        gradient: 'from-purple-600 to-blue-600'
      },
      {
        degree: 'Bachelor\'s (Hons.) Business Studies',
        institution: 'De Montfort University, Leicester, UK',
        icon: '📚',
        gradient: 'from-pink-600 to-orange-600'
      }
    ]
  }
  
  return <AboutPageClient content={fallbackContent} />
}