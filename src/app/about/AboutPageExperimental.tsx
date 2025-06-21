"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion'
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Calendar, 
  Code, 
  Palette, 
  Zap, 
  Users, 
  Award, 
  BookOpen,
  ChevronDown,
  ExternalLink
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Separator from '@/components/ui/Separator'
import Image from 'next/image'

interface Skill {
  name: string
  level: number
  category: string
}

interface Experience {
  title: string
  company: string
  period: string
  description: string
  technologies: string[]
}

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  link: string
}

const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!isInView) return
    
    if (shouldReduceMotion) {
      setCount(value)
      return
    }

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * value))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [isInView, value, duration, shouldReduceMotion])

  return <span ref={ref}>{count}</span>
}

const SkillBar = ({ skill }: { skill: Skill }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{skill.name}</span>
        <span className="text-xs text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill.name} proficiency`}>
        <motion.div
          initial={{ width: shouldReduceMotion ? `${skill.level}%` : 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: shouldReduceMotion ? 0 : 1, delay: shouldReduceMotion ? 0 : 0.2 }}
          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full will-change-[width]"
        />
      </div>
    </motion.div>
  )
}

const TimelineItem = ({ experience, index, isLast }: { experience: Experience; index: number; isLast: boolean }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : index * 0.1 }}
      className="relative flex items-start group"
    >
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-6 top-12 w-0.5 h-full bg-gradient-to-b from-primary-500 to-secondary-500 opacity-30" />
      )}
      
      {/* Timeline Dot */}
      <motion.div
        initial={{ scale: shouldReduceMotion ? 1 : 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : index * 0.1 + 0.2 }}
        className="relative z-10 flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 will-change-transform"
      >
        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full" />
        </div>
      </motion.div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : index * 0.1 + 0.3 }}
        className="ml-6 flex-1"
      >
        <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-l-transparent hover:border-l-primary-500 group-hover:bg-gradient-to-r group-hover:from-primary-50/50 group-hover:to-secondary-50/50 dark:group-hover:from-primary-950/20 dark:group-hover:to-secondary-950/20">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">{experience.period}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary-600 transition-colors">
                {experience.title}
              </h3>
              <p className="text-lg font-semibold text-primary-600">{experience.company}</p>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">{experience.description}</p>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {experience.technologies.map((tech) => (
                <Badge 
                  key={tech} 
                  variant="secondary"
                  size="sm"
                  className="hover:bg-primary-100 hover:text-primary-700 transition-colors cursor-default"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : index * 0.1 }}
      className="group h-full"
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 h-full flex flex-col">
        <div className="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-800">
          {project.image ? (
            <Image
              src={project.image} 
              alt={`${project.title} project preview`}
              width={800}
              height={600}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <Code className="w-12 h-12 text-white/50" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6 space-y-4 flex-1 flex flex-col">
          <div className="flex-1 space-y-3">
            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary-600 transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
          </div>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge 
                  key={tech} 
                  variant="outline"
                  size="sm"
                >
                  {tech}
                </Badge>
              ))}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full group-hover:bg-primary-50 dark:group-hover:bg-primary-950/50"
              aria-label={`View ${project.title} project details`}
            >
              View Project <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

const AboutPage = () => {
  const { scrollYProgress } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true })
  const shouldReduceMotion = useReducedMotion()

  const skills: Skill[] = [
    { name: "Digital Marketing Strategy", level: 95, category: "Marketing" },
    { name: "SEO/SEM & Analytics", level: 90, category: "Marketing" },
    { name: "AI & Marketing Automation", level: 90, category: "Technology" },
    { name: "Content Marketing", level: 85, category: "Marketing" },
    { name: "Brand Management", level: 85, category: "Marketing" },
    { name: "Team Leadership", level: 90, category: "Management" }
  ]

  const experiences: Experience[] = [
    {
      title: "Senior Marketing Manager",
      company: "WEO Media - Dental Marketing",
      period: "Aug 2023 - Present",
      description: "Leading marketing initiatives for dental practices, leveraging Generative AI, HubSpot, and multi-channel strategies to drive growth and patient acquisition.",
      technologies: ["Generative AI", "HubSpot", "Multi-channel Marketing", "Dental Industry"]
    },
    {
      title: "Marketing Director",
      company: "SoundSplore Inc.",
      period: "Jun 2021 - Aug 2023",
      description: "Directed marketing strategy for early-stage startup, implementing AI-driven customer acquisition and remote team management to scale the business.",
      technologies: ["AI-driven Marketing", "Customer Acquisition", "Remote Team Management", "Startup Strategy"]
    },
    {
      title: "Marketing Manager",
      company: "LA Photo Party",
      period: "Jan 2019 - Mar 2021",
      description: "Managed integrated marketing campaigns, influencer partnerships, and product strategy to enhance brand visibility and drive customer engagement.",
      technologies: ["Integrated Campaigns", "Influencer Marketing", "Product Strategy", "Brand Management"]
    },
    {
      title: "Senior Marketing Manager",
      company: "OldSchoolLabs.com",
      period: "Jul 2016 - Apr 2018",
      description: "Led marketing initiatives for fitness supplement brand with focus on influencer marketing and brand positioning in the competitive fitness industry.",
      technologies: ["Influencer Marketing", "Fitness Industry", "Brand Positioning", "Supplement Marketing"]
    },
    {
      title: "Senior Online Marketing & eCommerce Consultant",
      company: "ApexPeak",
      period: "Jul 2011 - Jul 2016",
      description: "5 years consulting for FinTech startup across Los Angeles & Singapore markets, developing comprehensive digital marketing strategies for international expansion.",
      technologies: ["FinTech", "International Markets", "eCommerce Strategy", "Digital Consulting"]
    },
    {
      title: "Vice President, eCommerce Marketing (Mortgage)",
      company: "Bank of America",
      period: "Apr 2007 - Jul 2011",
      description: "Led digital marketing strategy for mortgage division, managing mobile and web initiatives to drive loan origination and customer acquisition.",
      technologies: ["Digital Strategy", "Mobile Marketing", "Mortgage Industry", "Enterprise Marketing"]
    }
  ]

  const projects: Project[] = [
    {
      title: "CompetitorScope",
      description: "AI-powered competitor analysis platform that provides real-time insights and strategic recommendations for businesses.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
      technologies: ["Next.js", "AI/ML", "Python", "PostgreSQL"],
      link: "/projects/competitorscope"
    },
    {
      title: "AI Landing Page Generator",
      description: "Automated landing page creation tool using AI to generate high-converting pages with optimized copy and design.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop&crop=center",
      technologies: ["React", "OpenAI API", "Node.js", "MongoDB"],
      link: "/projects/ai-landing-generator"
    },
    {
      title: "SEO PowerPack Pro",
      description: "Comprehensive SEO toolkit offering keyword research, content optimization, and performance tracking for marketing teams.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
      technologies: ["Next.js", "Python", "Redis", "PostgreSQL"],
      link: "/projects/seo-powerpack-pro"
    }
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 z-50 will-change-transform"
        style={{ scaleX: shouldReduceMotion ? 1 : scrollYProgress, transformOrigin: "0%" }}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-[400px] md:min-h-[500px] py-12 md:py-16 flex items-center justify-center relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
          <div className={`absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-purple-600/30 to-pink-600/30 ${shouldReduceMotion ? '' : 'animate-gradient-shift'}`} />
          <div className={`absolute inset-0 bg-gradient-to-bl from-purple-600/20 via-blue-600/20 to-indigo-600/20 ${shouldReduceMotion ? '' : 'animate-gradient-shift-reverse'}`} />
        </div>
        
        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl ${shouldReduceMotion ? '' : 'animate-float'} will-change-transform`} />
          <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl ${shouldReduceMotion ? '' : 'animate-float-delayed'} will-change-transform`} />
          <div className={`absolute top-3/4 left-3/4 w-64 h-64 bg-pink-500/20 rounded-full blur-2xl ${shouldReduceMotion ? '' : 'animate-float-slow'} will-change-transform`} />
        </div>
        
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.3)_100%)]" />
        
        {/* Animated particles */}
        <div className="absolute inset-0" aria-hidden="true">
          {[...Array(shouldReduceMotion ? 5 : 15)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-white/20 rounded-full ${shouldReduceMotion ? '' : 'animate-pulse'}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={heroInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
              className="relative w-32 h-32 md:w-40 md:h-40 mx-auto"
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 blur-xl opacity-50 ${shouldReduceMotion ? '' : 'animate-pulse'}`} />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 blur-md opacity-70" />
              
              {/* Headshot image */}
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
                <Image
                  src="/jonathon-headshot.jpg" 
                  alt="Jonathon Carter - AI Marketing Professional"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover object-center"
                  priority
                />
              </div>
            </motion.div>
            
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl md:text-6xl font-bold text-white"
              >
                Jonathon Carter
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
              >
                AI Marketing Professional with 20+ years of experience driving growth through innovative digital strategies
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex items-center justify-center gap-2 text-gray-400"
              >
                <MapPin className="w-5 h-5" />
                <span>Remote / Global</span>
              </motion.div>
            </div>


            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="pt-4"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection('about')}
                className={`${shouldReduceMotion ? '' : 'animate-bounce'} text-white hover:text-gray-300`}
                aria-label="Scroll to about section"
              >
                <ChevronDown className="w-6 h-6" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Me</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              With over 20 years of diverse industry experience, I&apos;ve evolved from traditional marketing into a leader in AI-powered marketing strategies. I combine deep technical knowledge with creative vision to drive measurable business growth across multiple industries.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">My Journey</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Started in enterprise marketing at Bank of America, I&apos;ve navigated through FinTech, e-commerce, wellness, and now dental healthcare. My journey has been marked by embracing new technologies and driving innovation at every turn.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, I leverage cutting-edge AI technologies and marketing automation to help businesses scale efficiently. My focus is on creating data-driven strategies that deliver real, measurable results.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">
                    <AnimatedCounter value={20} />+
                  </div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary-600">
                    <AnimatedCounter value={9} />+
                  </div>
                  <div className="text-sm text-muted-foreground">Industries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-600">
                    <AnimatedCounter value={100} />+
                  </div>
                  <div className="text-sm text-muted-foreground">Campaigns</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-foreground">Skills & Expertise</h3>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <SkillBar key={skill.name} skill={skill} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Experience</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A journey through my marketing career, from enterprise leadership to innovative startups
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {experiences.map((experience, index) => (
                <TimelineItem 
                  key={index} 
                  experience={experience} 
                  index={index} 
                  isLast={index === experiences.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Innovative AI-powered marketing tools and platforms I&apos;ve created
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Let&apos;s Work Together</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to transform your marketing with AI? Let&apos;s discuss how I can help drive your business growth.
            </p>
            
            <div className="flex justify-center gap-4 pt-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8"
                aria-label="Send email to get in touch"
              >
                <Mail className="w-5 h-5 mr-2" aria-hidden="true" />
                Get In Touch
              </Button>
            </div>

            <div className="flex justify-center gap-6 pt-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                aria-label="Visit GitHub profile"
              >
                <Github className="w-6 h-6" aria-hidden="true" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                aria-label="Visit LinkedIn profile"
              >
                <Linkedin className="w-6 h-6" aria-hidden="true" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage