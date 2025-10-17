'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowLeft, 
  DollarSign, 
  Users, 
  Clock, 
  Shield, 
  MapPin, 
  Star,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react'

const features = [
  {
    icon: DollarSign,
    title: 'Keep More of What You Earn',
    description: 'Unlike other platforms that take 20-30% of your earnings, OpenWeed lets you keep 90%+ of your revenue.',
    benefit: 'Higher profit margins'
  },
  {
    icon: Users,
    title: 'Build Your Own Brand',
    description: 'Create a unique mini-site with your own branding, colors, and personality. Build a loyal customer base.',
    benefit: 'Brand recognition'
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Work when you want. Set your own hours, availability, and delivery zones. No mandatory shifts.',
    benefit: 'Work-life balance'
  },
  {
    icon: Shield,
    title: 'Verified & Trusted',
    description: 'All drivers are background checked and verified. Customers trust our platform for safe deliveries.',
    benefit: 'Customer confidence'
  }
]

const requirements = [
  { text: 'Valid driver\'s license', required: true },
  { text: 'Clean driving record (no DUIs)', required: true },
  { text: '21+ years old', required: true },
  { text: 'Reliable vehicle', required: true },
  { text: 'Smartphone with GPS', required: true },
  { text: 'Background check passed', required: true },
  { text: 'Insurance coverage', required: true },
  { text: 'Local area knowledge', required: false }
]

const faqs = [
  {
    question: 'How much can I earn?',
    answer: 'Drivers typically earn $20-40 per hour, with top performers making $50+ per hour. You keep 90%+ of all earnings.'
  },
  {
    question: 'What are the fees?',
    answer: 'OpenWeed charges a small platform fee (under 10%) compared to other platforms that take 20-30%.'
  },
  {
    question: 'How do I get paid?',
    answer: 'You get paid daily via direct deposit. No waiting for weekly payouts like other platforms.'
  },
  {
    question: 'Can I work part-time?',
    answer: 'Absolutely! Many drivers work evenings and weekends. Set your own schedule and availability.'
  },
  {
    question: 'What support do you provide?',
    answer: '24/7 driver support, marketing materials, customer service backup, and community forums.'
  }
]

export default function DriverInfoPage() {
  return (
    <div className="min-h-screen bg-brand-paper">
      {/* Header */}
      <div className="bg-white border-b border-brand-ink/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/onboard/driver" className="flex items-center space-x-2 text-brand-ink hover:text-brand-green transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Onboarding</span>
            </Link>
            
            <div className="text-sm text-brand-ink/70">
              Driver Information
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-brand-ink mb-6">
              Everything You Need to Know About Driving for OpenWeed
            </h1>
            <p className="text-xl text-brand-ink/70 mb-8 max-w-3xl mx-auto">
              Join thousands of drivers who have found success with OpenWeed. 
              Learn about our platform, requirements, and how to maximize your earnings.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/onboard/register"
                className="px-8 py-4 bg-brand-green text-white rounded-xl font-semibold text-lg hover:bg-brand-green/90 transition-colors"
              >
                Start Driving Today
              </Link>
              <Link
                href="/onboard/driver"
                className="px-8 py-4 border-2 border-brand-green text-brand-green rounded-xl font-semibold text-lg hover:bg-brand-green hover:text-white transition-colors"
              >
                Begin Onboarding
              </Link>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl border border-brand-ink/10 p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-brand-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-brand-ink mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-brand-ink/70 mb-3">
                      {feature.description}
                    </p>
                    <div className="inline-flex items-center px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-sm font-medium">
                      {feature.benefit}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Requirements Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl border border-brand-ink/10 p-8 mb-16"
          >
            <h2 className="text-2xl font-bold text-brand-ink mb-6">Requirements</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {req.required ? (
                    <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0" />
                  ) : (
                    <Info className="w-5 h-5 text-brand-amber flex-shrink-0" />
                  )}
                  <span className={`${req.required ? 'text-brand-ink' : 'text-brand-ink/70'}`}>
                    {req.text}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-brand-green/10 rounded-lg">
              <p className="text-sm text-brand-ink/80">
                <strong>Note:</strong> All requirements are verified during the onboarding process. 
                We'll guide you through each step and help you get everything in order.
              </p>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-xl border border-brand-ink/10 p-8 mb-16"
          >
            <h2 className="text-2xl font-bold text-brand-ink mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="border-b border-brand-ink/10 pb-4 last:border-b-0"
                >
                  <h3 className="text-lg font-semibold text-brand-ink mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-brand-ink/70">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16"
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
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-green mb-2">24/7</div>
              <div className="text-brand-ink/70">Support</div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center bg-gradient-to-r from-brand-green/10 to-brand-violet/10 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-brand-ink mb-4">
              Ready to Start Your Cannabis Delivery Business?
            </h2>
            <p className="text-brand-ink/70 mb-6 max-w-2xl mx-auto">
              Join OpenWeed today and start building your own cannabis delivery brand. 
              The onboarding process takes just 15 minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/onboard/register"
                className="px-8 py-4 bg-brand-green text-white rounded-xl font-semibold text-lg hover:bg-brand-green/90 transition-colors"
              >
                Get Started Now
              </Link>
              <Link
                href="/onboard/driver"
                className="px-8 py-4 border-2 border-brand-green text-brand-green rounded-xl font-semibold text-lg hover:bg-brand-green hover:text-white transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
