'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, MapPin, CheckCircle } from 'lucide-react'
import OnboardStepper from '@/components/onboard/OnboardStepper'
import RegionPicker from '@/components/onboard/RegionPicker'

const steps = [
  { id: 'welcome', title: 'Welcome', description: 'Get started' },
  { id: 'register', title: 'Register', description: 'Create account' },
  { id: 'license', title: 'License', description: 'Upload ID' },
  { id: 'region', title: 'Region', description: 'Service area' },
  { id: 'customize', title: 'Customize', description: 'Your brand' },
  { id: 'complete', title: 'Complete', description: 'Go live!' },
]

export default function RegionPage() {
  const router = useRouter()
  const [currentStep] = useState(4)
  const [selectedRegion, setSelectedRegion] = useState('Austin Central')
  const [selectedCoordinates, setSelectedCoordinates] = useState({ lat: 30.2672, lng: -97.7431 })
  const [isLoading, setIsLoading] = useState(false)

  const handleRegionSelect = (region: string, coordinates: { lat: number; lng: number }) => {
    setSelectedRegion(region)
    setSelectedCoordinates(coordinates)
  }

  const handleContinue = async () => {
    setIsLoading(true)
    
    try {
      // In a real app, this would save the region selection to the database
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      router.push('/onboard/customize')
    } catch (error) {
      console.error('Region save error:', error)
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
            <Link href="/onboard/license" className="flex items-center space-x-2 text-brand-ink hover:text-brand-green transition-colors">
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
        <div className="max-w-4xl mx-auto">
          {/* Progress Stepper */}
          <div className="mb-12">
            <OnboardStepper currentStep={currentStep} steps={steps} />
          </div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl border border-brand-ink/10 p-8"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-brand-ink mb-4">
                Select Your Service Area
              </h1>
              <p className="text-brand-ink/70">
                Choose the region where you'll be providing delivery services. 
                You can update this later in your driver settings.
              </p>
            </div>

            <RegionPicker 
              onRegionSelect={handleRegionSelect}
              initialRegion={selectedRegion}
            />

            <div className="mt-8 flex justify-center">
              <button
                onClick={handleContinue}
                disabled={isLoading}
                className="flex items-center space-x-2 bg-brand-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving Region...</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-brand-green/10 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="w-6 h-6 text-brand-green" />
                <h3 className="font-semibold text-brand-ink">Service Coverage</h3>
              </div>
              <ul className="text-sm text-brand-ink/70 space-y-2">
                <li>• Each region covers approximately 10km radius</li>
                <li>• You can expand your coverage after approval</li>
                <li>• Customers will see you in search results for your region</li>
                <li>• You can set specific delivery boundaries within your region</li>
              </ul>
            </div>

            <div className="bg-brand-violet/10 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-6 h-6 text-brand-violet" />
                <h3 className="font-semibold text-brand-ink">Flexibility</h3>
              </div>
              <ul className="text-sm text-brand-ink/70 space-y-2">
                <li>• Change your service area anytime</li>
                <li>• Add multiple regions if needed</li>
                <li>• Set your own delivery radius</li>
                <li>• Update availability in real-time</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
