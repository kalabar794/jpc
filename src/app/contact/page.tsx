import { Metadata } from 'next'
import { generateMetadata, generateEnhancedOrganizationStructuredData } from '@/lib/metadata'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = generateMetadata(
  'Contact AI Marketing Consultant | Get Expert AI Marketing Help | Jonathon',
  'Ready to transform your marketing with AI? Contact Jonathon for expert AI marketing consulting, automation strategies, and ChatGPT implementation. Get a free consultation today.',
  '/contact',
  {
    keywords: [
      'contact AI marketing consultant',
      'hire AI marketing expert',
      'AI marketing consultation request',
      'marketing automation consultant contact',
      'ChatGPT marketing help',
      'AI marketing strategy consultation',
      'book AI marketing consultant'
    ]
  }
)

// Contact page schema with service offerings
const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  mainEntity: {
    '@type': 'Person',
    name: 'Jonathon',
    jobTitle: 'AI Marketing Consultant',
    email: 'contact@jonathon.ai',
    knowsAbout: [
      'AI Marketing Strategy',
      'Marketing Automation',
      'ChatGPT Marketing',
      'ROI Optimization'
    ]
  },
  potentialAction: {
    '@type': 'CommunicateAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://jpc-kappa.vercel.app/contact',
      actionPlatform: [
        'http://schema.org/DesktopWebPlatform',
        'http://schema.org/MobileWebPlatform'
      ]
    }
  }
}

export default function Page() {
  return (
    <>
      <ContactPageClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateEnhancedOrganizationStructuredData('https://jpc-kappa.vercel.app/contact'))
        }}
      />
    </>
  )
}