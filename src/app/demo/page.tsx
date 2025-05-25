'use client'

import { useState } from 'react'
import { 
  Button, 
  Card, 
  CardContent, 
  Modal, 
  ModalHeader, 
  ModalBody,
  SampleAnimatedCard,
  AnimatedWrapper,
  StaggeredWrapper,
  StaggeredItem,
  ParallaxScroll
} from '@/components/ui'

export default function DemoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-background py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <AnimatedWrapper variant="fadeInUp" className="text-center mb-16">
          <h1 className="text-5xl font-bold gradient-text mb-4">
            Component Library Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Showcasing our beautiful animated components
          </p>
        </AnimatedWrapper>

        {/* Buttons Section */}
        <section className="mb-16">
          <AnimatedWrapper variant="fadeInUp" delay={0.1}>
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              Animated Buttons
            </h2>
          </AnimatedWrapper>
          
          <StaggeredWrapper className="flex flex-wrap gap-4">
            <StaggeredItem>
              <Button variant="primary">Primary Button</Button>
            </StaggeredItem>
            <StaggeredItem>
              <Button variant="secondary">Secondary Button</Button>
            </StaggeredItem>
            <StaggeredItem>
              <Button variant="outline">Outline Button</Button>
            </StaggeredItem>
            <StaggeredItem>
              <Button variant="ghost">Ghost Button</Button>
            </StaggeredItem>
            <StaggeredItem>
              <Button 
                variant="primary" 
                onClick={() => setIsModalOpen(true)}
              >
                Open Modal
              </Button>
            </StaggeredItem>
          </StaggeredWrapper>
        </section>

        {/* Cards Section */}
        <section className="mb-16">
          <AnimatedWrapper variant="fadeInUp" delay={0.2}>
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              3D Animated Cards
            </h2>
          </AnimatedWrapper>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[0, 1, 2].map((index) => (
              <SampleAnimatedCard key={index} index={index} />
            ))}
          </div>
        </section>

        {/* Parallax Section */}
        <section className="mb-16">
          <AnimatedWrapper variant="fadeInUp" delay={0.3}>
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              Parallax Effects
            </h2>
          </AnimatedWrapper>
          
          <div className="relative h-96 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl overflow-hidden">
            <ParallaxScroll speed={0.5} className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-4xl font-bold mb-4">Parallax Content</h3>
                <p className="text-xl opacity-90">This moves at a different speed when scrolling</p>
              </div>
            </ParallaxScroll>
            
            <ParallaxScroll speed={0.8} direction="down" className="absolute top-0 right-0">
              <div className="w-32 h-32 bg-white/20 rounded-full blur-xl" />
            </ParallaxScroll>
            
            <ParallaxScroll speed={0.3} className="absolute bottom-0 left-0">
              <div className="w-24 h-24 bg-white/30 rounded-lg blur-lg" />
            </ParallaxScroll>
          </div>
        </section>

        {/* Card Variants */}
        <section className="mb-16">
          <AnimatedWrapper variant="fadeInUp" delay={0.4}>
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              Card Variants
            </h2>
          </AnimatedWrapper>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card variant="default" hoverable>
              <CardContent>
                <h3 className="font-bold mb-2">Default Card</h3>
                <p className="text-gray-600 dark:text-gray-300">Standard card with shadow</p>
              </CardContent>
            </Card>
            
            <Card variant="glass" hoverable>
              <CardContent>
                <h3 className="font-bold mb-2">Glass Card</h3>
                <p className="text-gray-600 dark:text-gray-300">Glassmorphism effect</p>
              </CardContent>
            </Card>
            
            <Card variant="elevated" hoverable>
              <CardContent>
                <h3 className="font-bold mb-2">Elevated Card</h3>
                <p className="text-gray-600 dark:text-gray-300">Enhanced shadow depth</p>
              </CardContent>
            </Card>
            
            <Card variant="bordered" hoverable>
              <CardContent>
                <h3 className="font-bold mb-2">Bordered Card</h3>
                <p className="text-gray-600 dark:text-gray-300">Colored border accent</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Animation Variants */}
        <section className="mb-16">
          <AnimatedWrapper variant="fadeInUp" delay={0.5}>
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              Animation Variants
            </h2>
          </AnimatedWrapper>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatedWrapper variant="fadeInUp">
              <Card>
                <CardContent>
                  <h3 className="font-bold mb-2">Fade In Up</h3>
                  <p className="text-gray-600 dark:text-gray-300">Classic entrance animation</p>
                </CardContent>
              </Card>
            </AnimatedWrapper>
            
            <AnimatedWrapper variant="slideInLeft">
              <Card>
                <CardContent>
                  <h3 className="font-bold mb-2">Slide In Left</h3>
                  <p className="text-gray-600 dark:text-gray-300">Slides from the left</p>
                </CardContent>
              </Card>
            </AnimatedWrapper>
            
            <AnimatedWrapper variant="scaleIn">
              <Card>
                <CardContent>
                  <h3 className="font-bold mb-2">Scale In</h3>
                  <p className="text-gray-600 dark:text-gray-300">Scales up from center</p>
                </CardContent>
              </Card>
            </AnimatedWrapper>
          </div>
        </section>
      </div>

      {/* Modal Demo */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        size="md"
      >
        <ModalHeader>
          <h2 className="text-2xl font-bold">Beautiful Modal</h2>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              This modal demonstrates smooth animations with backdrop blur and spring physics.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <h4 className="font-semibold mb-1">Smooth Animations</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Spring-based transitions
                </p>
              </div>
              <div className="p-4 bg-secondary-50 dark:bg-secondary-900/20 rounded-lg">
                <h4 className="font-semibold mb-1">Backdrop Blur</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Modern glassmorphism effect
                </p>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </main>
  )
}