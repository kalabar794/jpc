"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, Play, Pause } from 'lucide-react';
import Button from '@/components/ui/Button';
import { GalleryImage } from '@/lib/content';

interface PhotoGalleryProps {
  images: GalleryImage[];
  title?: string;
  subtitle?: string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  images = [],
  title = "Photography Gallery",
  subtitle = "Discover stunning moments captured through the lens"
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (isPlaying && images.length > 0) {
      // Open modal with first image if not already open
      if (!selectedPhoto) {
        setSelectedPhoto(images[currentIndex]);
      }
      
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = (prev + 1) % images.length;
          setSelectedPhoto(images[nextIndex]);
          return nextIndex;
        });
      }, 3000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, images.length, currentIndex, selectedPhoto]);

  const openModal = (photo: GalleryImage, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setIsPlaying(false);
  };

  const nextPhoto = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedPhoto(images[nextIndex]);
  };

  const prevPhoto = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setSelectedPhoto(images[prevIndex]);
  };

  const toggleSlideshow = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.div 
        ref={containerRef}
        className="relative py-20 px-4 text-center"
        style={{ y, opacity }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-foreground/80 to-foreground bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {title}
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        </div>
      </motion.div>

      {/* Gallery Grid */}
      <div className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Slideshow Button */}
          <div className="flex justify-center mb-8">
            <Button
              variant="outline"
              size="lg"
              onClick={toggleSlideshow}
              className="group relative overflow-hidden border-2 hover:border-primary transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Pause Slideshow
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Slideshow
                  </>
                )}
              </span>
              <span className="absolute inset-0 bg-primary/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                className="group relative overflow-hidden cursor-pointer"
                variants={{
                  hidden: { opacity: 0, y: 50, scale: 0.9 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }
                  }
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => openModal(image, index)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.imageUrl}
                    alt={image.alt}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    initial={false}
                    animate={hoveredIndex === index ? { y: 0 } : { y: "100%" }}
                  >
                    <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                    {image.description && (
                      <p className="text-sm text-white/80 mb-2">{image.description}</p>
                    )}
                    <div className="flex justify-between items-center text-xs text-white/60">
                      <span>{image.category}</span>
                      {image.tool && <span>by {image.tool}</span>}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-7xl max-h-[90vh] mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.alt}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                />
                
                {/* Navigation Buttons */}
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                  onClick={prevPhoto}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                  onClick={nextPhoto}
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>

                {/* Control Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-background/80 backdrop-blur-sm"
                    onClick={toggleSlideshow}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-background/80 backdrop-blur-sm"
                    onClick={closeModal}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Photo Info */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedPhoto.title}</h3>
                  {selectedPhoto.description && (
                    <p className="text-white/80 mb-2">{selectedPhoto.description}</p>
                  )}
                  <div className="flex justify-between items-center text-sm text-white/60">
                    <span>{selectedPhoto.category}</span>
                    {selectedPhoto.tool && <span>Created with {selectedPhoto.tool}</span>}
                    <span>{currentIndex + 1} of {images.length}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGallery;