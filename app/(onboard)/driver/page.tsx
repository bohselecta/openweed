'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Users, DollarSign, Clock } from 'lucide-react'
import OnboardStepper from '@/components/onboard/OnboardStepper'

const steps = [
  { id: 'welcome', title: 'Welcome', description: 'Get started' },
  { id: 'register', title: 'Register', description: 'Create account' },
  { id: 'license', title: 'License', description: 'Upload ID' },
  { id: 'region', title: 'Region', description: 'Service area' },
  { id: 'customize', title: 'Customize', description: 'Your brand' },
  { id: 'complete', title: 'Complete', description: 'Go live!' },
]

const benefits = [
  {
    icon: DollarSign,
    title: 'Keep More of What You Earn',
    description: 'No high fees like other platforms. Keep 90%+ of your revenue.',
  },
  {
    icon: Users,
    title: 'Build Your Brand',
    description: 'Create your own mini-site and build a loyal customer base.',
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Work when you want, set your own hours and availability.',
  },
]

export default function OnboardDriver() {
  const [currentStep] = useState(1)

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-brand-ink mb-6">
                Start Your Own Cannabis Delivery Business
              </h1>
              
              <p className="text-lg text-brand-ink/70 mb-8">
                Join OpenWeed as a driver and build your own cannabis delivery brand. 
                Set your own hours, choose your products, and keep more of what you earn.
              </p>

              <div className="space-y-6 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-brand-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-ink mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-brand-ink/70">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/onboard/register"
                  className="flex items-center justify-center space-x-2 bg-brand-green text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-brand-green/90 transition-colors"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                
                <Link
                  href="/driver-info"
                  className="flex items-center justify-center space-x-2 border-2 border-brand-green text-brand-green px-8 py-4 rounded-xl font-semibold text-lg hover:bg-brand-green hover:text-white transition-colors"
                >
                  <span>Learn More</span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl border border-brand-ink/10 p-8"
            >
              <h2 className="text-2xl font-bold text-brand-ink mb-6">
                What You'll Get
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-brand-green" />
                  <span className="text-brand-ink">Your own branded mini-site</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-brand-green" />
                  <span className="text-brand-ink">Live chat with customers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-brand-green" />
                  <span className="text-brand-ink">Order management system</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-brand-green" />
                  <span className="text-brand-ink">Customer reviews & ratings</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-brand-green" />
                  <span className="text-brand-ink">Analytics dashboard</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-brand-green" />
                  <span className="text-brand-ink">Community support</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-brand-green/10 rounded-lg">
                <h3 className="font-semibold text-brand-ink mb-2">
                  Requirements
                </h3>
                <ul className="text-sm text-brand-ink/70 space-y-1">
                  <li>• Valid driver's license</li>
                  <li>• Clean driving record</li>
                  <li>• 21+ years old</li>
                  <li>• Reliable vehicle</li>
                  <li>• Smartphone with GPS</li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-green mb-2">500+</div>
              <div className="text-brand-ink/70">Active Drivers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-violet mb-2">$2.5M+</div>
              <div className="text-brand-ink/70">Driver Earnings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-amber mb-2">4.8★</div>
              <div className="text-brand-ink/70">Average Rating</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
