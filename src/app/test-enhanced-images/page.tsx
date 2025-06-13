import { Metadata } from 'next'
import EnhancedImage, { EnhancedGalleryImage, EnhancedHeroImage } from '@/components/ui/EnhancedImage'
import OptimizedImage from '@/components/ui/OptimizedImage'

export const metadata: Metadata = {
  title: 'Enhanced Images Test',
  robots: 'noindex, nofollow' // Don't index test page
}

export default function TestEnhancedImagesPage() {
  // Test with an actual image from your gallery
  const testImage = 'https://res.cloudinary.com/dqltlwqi2/image/upload/v1749692475/0DD039AB-926D-40A9-9077-3C40D0A897DF_l5znb8.jpg'
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8">Enhanced Images Test Page</h1>
        
        <div className="space-y-12">
          {/* Test 1: Side by side comparison */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Original vs Enhanced (Side by Side)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-2">Original OptimizedImage</h3>
                <OptimizedImage
                  src={testImage}
                  alt="Test image original"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Enhanced with Features</h3>
                <EnhancedImage
                  src={testImage}
                  alt="Test image enhanced"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                  useEnhanced={true}
                  responsive={true}
                  improveAccessibility={true}
                />
              </div>
            </div>
          </section>

          {/* Test 2: Responsive breakpoints */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Responsive Breakpoints Test</h2>
            <p className="text-sm text-gray-600 mb-4">Resize browser to see different image sizes load</p>
            <EnhancedImage
              src={testImage}
              alt="Responsive test image"
              width={1920}
              height={1080}
              layout="full"
              useEnhanced={true}
              responsive={true}
              className="rounded-lg shadow-lg"
            />
          </section>

          {/* Test 3: Gallery layout */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Gallery Layout Test</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <EnhancedGalleryImage
                  key={i}
                  src={testImage}
                  alt={`Gallery image ${i}`}
                  useEnhanced={true}
                />
              ))}
            </div>
          </section>

          {/* Test 4: Hero image */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Hero Image Test</h2>
            <EnhancedHeroImage
              src={testImage}
              alt="Hero image test"
              title="Enhanced Hero Image with SEO"
              useEnhanced={true}
              className="rounded-lg shadow-xl"
            />
          </section>

          {/* Test 5: Feature flags */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Feature Flags Test</h2>
            <p className="text-sm text-gray-600 mb-4">Testing backwards compatibility</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-2">useEnhanced=false (Safe fallback)</p>
                <EnhancedImage
                  src={testImage}
                  alt="Fallback test"
                  width={400}
                  height={300}
                  useEnhanced={false}
                  className="rounded-lg"
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">useEnhanced=true (New features)</p>
                <EnhancedImage
                  src={testImage}
                  alt="Enhanced test"
                  width={400}
                  height={300}
                  useEnhanced={true}
                  responsive={true}
                  className="rounded-lg"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Debug info */}
        <div className="mt-12 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="font-semibold mb-2">Debug Info:</h3>
          <pre className="text-xs overflow-auto">
{`Cloudinary Cloud: ${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'Not configured'}
Test Image: ${testImage}
Features: Responsive srcset, SEO metadata, Accessibility enhancements`}
          </pre>
        </div>
      </div>
    </div>
  )
}