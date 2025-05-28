import { motion } from 'framer-motion'
import { getAboutContentSync } from '@/lib/content'
import AboutPageClient from './AboutPageClient'

export default function AboutPage() {
  // Load about content on server side
  let aboutData = null
  try {
    aboutData = getAboutContentSync()
  } catch (error) {
    console.error('Failed to load about content:', error)
  }

  return <AboutPageClient aboutData={aboutData} />
}