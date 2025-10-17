'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Upload, CheckCircle } from 'lucide-react'
import OnboardStepper from '@/components/onboard/OnboardStepper'
import UploadLicense from '@/components/onboard/UploadLicense'

const steps = [
  { id: 'welcome', title: 'Welcome', description: 'Get started' },
  { id: 'register', title: 'Register', description: 'Create account' },
  { id: 'license', title: 'License', description: 'Upload ID' },
  { id: 'region', title: 'Region', description: 'Service area' },
  { id: 'customize', title: 'Customize', description: 'Your brand' },
  { id: 'complete', title: 'Complete', description: 'Go live!' },
]

export default function LicensePage() {
  const router = useRouter()
  const [currentStep] = useState(3)
  const [isUploaded, setIsUploaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpload = async (file: File) => {
    setIsLoading(true)
    
    try {
      // In a real app, this would upload to UploadThing and save to database
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsUploaded(true)
      
      // Auto-advance after successful upload
      setTimeout(() => {
        router.push('/onboard/region')
      }, 2000)
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSkip = () => {
    router.push('/onboard/region')
  }

  return (
    <div className="min-h-screen bg-brand-paper">
      {/* Header */}
      <div className="bg-white border-b border-brand-ink/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/onboard/register" className="flex items-center space-x-2 text-brand-ink hover:text-brand-green transition-colors">
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
        <div className="max-w-2xl mx-auto">
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
                License Verification
              </h1>
              <p className="text-brand-ink/70">
                Upload a photo of your driver's license for verification. This helps us ensure all drivers are properly licensed.
              </p>
            </div>

            {isUploaded ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-brand-ink mb-4">
                  License Uploaded Successfully!
                </h2>
                <p className="text-brand-ink/70 mb-6">
                  Your license has been uploaded and will be reviewed within 24-48 hours.
                </p>
                <div className="animate-pulse">
                  <p className="text-sm text-brand-green">
                    Redirecting to next step...
                  </p>
                </div>
              </motion.div>
            ) : (
              <UploadLicense 
                onUpload={handleUpload}
                onSkip={handleSkip}
              />
            )}
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 bg-brand-amber/10 rounded-xl p-6"
          >
            <h3 className="font-semibold text-brand-ink mb-3">Need Help?</h3>
            <div className="text-sm text-brand-ink/70 space-y-2">
              <p>• Make sure your license is clearly visible and well-lit</p>
              <p>• Accepted formats: JPEG, PNG, WebP, PDF</p>
              <p>• File size must be less than 5MB</p>
              <p>• You can skip this step and upload later if needed</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
