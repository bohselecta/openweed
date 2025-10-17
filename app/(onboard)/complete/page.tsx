'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, ExternalLink, Clock, Mail, Users } from 'lucide-react'
import OnboardStepper from '@/components/onboard/OnboardStepper'

const steps = [
  { id: 'welcome', title: 'Welcome', description: 'Get started' },
  { id: 'register', title: 'Register', description: 'Create account' },
  { id: 'license', title: 'License', description: 'Upload ID' },
  { id: 'region', title: 'Region', description: 'Service area' },
  { id: 'customize', title: 'Customize', description: 'Your brand' },
  { id: 'complete', title: 'Complete', description: 'Go live!' },
]

export default function CompletePage() {
  const [currentStep] = useState(6)
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-brand-paper">
      {/* Header */}
      <div className="bg-white border-b border-brand-ink/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="text-xl font-bold text-brand-ink">OpenWeed</span>
            </Link>
            
            <div className="text-sm text-brand-ink/70">
              Driver Onboarding Complete
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

          {/* Success Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-24 h-24 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>

            <h1 className="text-4xl font-bold text-brand-ink mb-6">
              Welcome to OpenWeed!
            </h1>
            
            <p className="text-lg text-brand-ink/70 mb-8">
              Your driver profile has been created successfully. 
              We're reviewing your application and will notify you once you're approved.
            </p>
          </motion.div>

          {/* Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl border border-brand-ink/10 p-8 mb-8"
          >
            <h2 className="text-xl font-semibold text-brand-ink mb-6">Application Status</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-brand-green/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-brand-green" />
                  <span className="font-medium text-brand-ink">Profile Created</span>
                </div>
                <span className="text-sm text-brand-green">Complete</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-brand-amber/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-brand-amber" />
                  <span className="font-medium text-brand-ink">License Verification</span>
                </div>
                <span className="text-sm text-brand-amber">Pending Review</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-brand-ink/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-brand-ink/50" />
                  <span className="font-medium text-brand-ink/70">Admin Approval</span>
                </div>
                <span className="text-sm text-brand-ink/50">Waiting</span>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-brand-violet/10 rounded-xl p-8 mb-8"
          >
            <h3 className="text-lg font-semibold text-brand-ink mb-4">What Happens Next?</h3>
            <div className="space-y-3 text-sm text-brand-ink/70">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-brand-violet rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                <p>Our team will review your license and profile within 24-48 hours</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-brand-violet rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                <p>You'll receive an email notification when you're approved</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-brand-violet rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                <p>Start adding products to your catalog and set your availability</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-brand-violet rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                <p>Begin accepting orders and building your customer base!</p>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/deliveries/atxweedog"
              className="flex items-center justify-center space-x-2 bg-brand-green text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-green/90 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              <span>View Demo Site</span>
            </Link>
            
            <Link
              href="/driver-dashboard"
              className="flex items-center justify-center space-x-2 border-2 border-brand-green text-brand-green px-8 py-4 rounded-xl font-semibold hover:bg-brand-green hover:text-white transition-colors"
            >
              <span>Go to Dashboard</span>
            </Link>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 text-center"
          >
            <div className="flex items-center justify-center space-x-2 text-sm text-brand-ink/70 mb-2">
              <Mail className="w-4 h-4" />
              <span>Questions? Contact us at drivers@openweed.co</span>
            </div>
            <p className="text-xs text-brand-ink/50">
              We're here to help you succeed as an OpenWeed driver
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
