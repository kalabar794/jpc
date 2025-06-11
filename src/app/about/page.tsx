import { Metadata } from 'next'
import { getAboutContentSync } from '@/lib/content'
import AboutPageClient from './AboutPageClient'
import { generateMetadata, generateEnhancedPersonStructuredData } from '@/lib/metadata'

export const metadata: Metadata = generateMetadata(
  'About Jonathon | AI Marketing Consultant & Automation Expert',
  'Learn about Jonathon, an experienced AI marketing consultant specializing in automation, ChatGPT strategies, and data-driven campaigns. Transform your marketing with proven expertise.',
  '/about',
  {
    keywords: [
      'AI marketing consultant about',
      'marketing automation expert bio',
      'AI marketing specialist background',
      'ChatGPT marketing expert',
      'AI consultant experience',
      'marketing technology expertise'
    ]
  }
)

export default function AboutPage() {
  // Load about content on server side
  let aboutData = null
  try {
    aboutData = getAboutContentSync()
  } catch (error) {
    console.error('Failed to load about content:', error)
  }

  return (
    <>
      <AboutPageClient aboutData={aboutData} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateEnhancedPersonStructuredData('https://jpc-kappa.vercel.app/about'))
        }}
      />
    </>
  )
}