import { Metadata } from 'next'
import { generateMetadata, generateEnhancedPersonStructuredData, generateFAQStructuredData } from '@/lib/metadata'
import HomePageClient from './HomePageClient'

// SEO-optimized homepage metadata
export const metadata: Metadata = generateMetadata(
  'AI Marketing Consultant | Expert AI Marketing Strategy & Automation | Jonathon',
  'Transform your business with proven AI marketing expertise. Leading consultant specializing in automation strategies, ChatGPT marketing, and ROI-driven campaigns. Get measurable results with cutting-edge AI solutions.',
  '',
  {
    isHomepage: true,
    keywords: [
      'AI marketing consultant',
      'AI marketing strategy',
      'marketing automation expert',
      'ChatGPT marketing consultant',
      'AI-powered marketing campaigns',
      'hire AI marketing consultant',
      'AI marketing ROI optimization',
      'marketing AI implementation'
    ]
  }
)

// Homepage FAQ structured data for featured snippets
const homepageFAQs = [
  {
    question: "What does an AI marketing consultant do?",
    answer: "An AI marketing consultant helps businesses leverage artificial intelligence to optimize marketing strategies, automate campaigns, improve ROI, and implement data-driven decision making. They specialize in tools like ChatGPT, predictive analytics, and marketing automation platforms."
  },
  {
    question: "How much does AI marketing consulting cost?",
    answer: "AI marketing consulting typically ranges from $150-500 per hour or $5,000-25,000 per project, depending on scope and complexity. Most consultants offer initial assessments to determine specific needs and provide custom pricing."
  },
  {
    question: "What results can I expect from AI marketing?",
    answer: "Businesses typically see 20-40% improvement in marketing ROI, 50-70% reduction in manual tasks, 30-60% increase in lead quality, and 25-45% improvement in conversion rates within 3-6 months of implementing AI marketing strategies."
  }
]

export default function Page() {
  return (
    <>
      <HomePageClient />
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateEnhancedPersonStructuredData('https://jpc-kappa.vercel.app'))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQStructuredData(homepageFAQs))
        }}
      />
    </>
  )
}