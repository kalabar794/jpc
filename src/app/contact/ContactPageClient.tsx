'use client'

import { AnimatedBackground } from '@/components/ui'
import GlassmorphicContactForm from '@/components/forms/GlassmorphicContactForm'

export default function ContactPage() {
  return (
    <AnimatedBackground variant="page" className="min-h-screen">
      <main className="relative z-10 pt-24 pb-12">
        <GlassmorphicContactForm />
      </main>
    </AnimatedBackground>
  )
}