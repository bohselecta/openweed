'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Palette, User, FileText } from 'lucide-react'
import OnboardStepper from '@/components/onboard/OnboardStepper'
import DriverForm from '@/components/onboard/DriverForm'
import MiniSitePreview from '@/components/onboard/MiniSitePreview'

const steps = [
  { id: 'welcome', title: 'Welcome', description: 'Get started' },
  { id: 'register', title: 'Register', description: 'Create account' },
  { id: 'license', title: 'License', description: 'Upload ID' },
  { id: 'region', title: 'Region', description: 'Service area' },
  { id: 'customize', title: 'Customize', description: 'Your brand' },
  { id: 'complete', title: 'Complete', description: 'Go live!' },
]

export default function CustomizePage() {
  const router = useRouter()
  const [currentStep] = useState(5)
  const [driverData, setDriverData] = useState({
    handle: '',
    region: 'Austin Central',
    bio: '',
    user: {
      name: 'Demo User',
    },
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleFormSubmit = async (formData: any) => {
    setIsLoading(true)
    
    try {
      // In a real app, this would save the driver profile to the database
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setDriverData(prev => ({
        ...prev,
        ...formData,
      }))
      
      // Auto-advance to completion
      setTimeout(() => {
        router.push('/onboard/complete')
      }, 2000)
    } catch (error) {
      console.error('Profile save error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-paper">
      {/* Header */}
      <div className="bg-white border-b border-brand-ink/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/onboard/region" className="flex items-center space-x-2 text-brand-ink hover:text-brand-green transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>
            
            <div className="text-sm text-brand-ink/70">
              Driver Onboarding
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Progress Stepper */}
          <div className="mb-12">
            <OnboardStepper currentStep={currentStep} steps={steps} />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl border border-brand-ink/10 p-8"
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-brand-ink mb-4">
                  Customize Your Profile
                </h1>
                <p className="text-brand-ink/70">
                  Set up your driver profile and brand. This is how customers will see you on OpenWeed.
                </p>
              </div>

              <DriverForm 
                onSubmit={handleFormSubmit}
                initialData={driverData}
              />

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 text-center"
                >
                  <div className="inline-flex items-center space-x-2 text-brand-green">
                    <div className="w-4 h-4 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
                    <span>Saving your profile...</span>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Preview Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <MiniSitePreview driverData={driverData} />
            </motion.div>
          </div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-brand-green/10 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <User className="w-6 h-6 text-brand-green" />
                <h3 className="font-semibold text-brand-ink">Profile Tips</h3>
              </div>
              <ul className="text-sm text-brand-ink/70 space-y-2">
                <li>• Use a friendly, professional tone</li>
                <li>• Highlight your experience and specialties</li>
                <li>• Mention any certifications or training</li>
                <li>• Keep it concise but informative</li>
              </ul>
            </div>

            <div className="bg-brand-violet/10 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Palette className="w-6 h-6 text-brand-violet" />
                <h3 className="font-semibold text-brand-ink">Branding</h3>
              </div>
              <ul className="text-sm text-brand-ink/70 space-y-2">
                <li>• Choose colors that represent your style</li>
                <li>• Your handle will be your unique URL</li>
                <li>• Make it memorable and easy to spell</li>
                <li>• You can change themes later</li>
              </ul>
            </div>

            <div className="bg-brand-amber/10 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="w-6 h-6 text-brand-amber" />
                <h3 className="font-semibold text-brand-ink">Next Steps</h3>
              </div>
              <ul className="text-sm text-brand-ink/70 space-y-2">
                <li>• Wait for admin approval (24-48 hours)</li>
                <li>• Add your product catalog</li>
                <li>• Set up payment methods</li>
                <li>• Start accepting orders!</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
