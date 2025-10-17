'use client'

import { motion } from 'framer-motion'
import { Check, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface OnboardStepperProps {
  currentStep: number
  steps: Array<{
    id: string
    title: string
    description?: string
  }>
  className?: string
}

export default function OnboardStepper({ 
  currentStep, 
  steps, 
  className 
}: OnboardStepperProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isUpcoming = stepNumber > currentStep

          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className="flex items-center">
                {/* Connector line */}
                {index > 0 && (
                  <div className="flex-1 h-0.5 bg-brand-ink/20 mr-4">
                    <motion.div
                      className="h-full bg-brand-green"
                      initial={{ width: 0 }}
                      animate={{ 
                        width: isCompleted ? '100%' : '0%' 
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
                
                {/* Step circle */}
                <motion.div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold',
                    isCompleted && 'bg-brand-green text-white',
                    isCurrent && 'bg-brand-green text-white',
                    isUpcoming && 'bg-brand-ink/10 text-brand-ink/50'
                  )}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Circle className="w-4 h-4" />
                  )}
                </motion.div>
                
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 bg-brand-ink/20 ml-4">
                    <motion.div
                      className="h-full bg-brand-green"
                      initial={{ width: 0 }}
                      animate={{ 
                        width: isCompleted ? '100%' : '0%' 
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
              </div>
              
              {/* Step info */}
              <div className="mt-3 text-center max-w-32">
                <motion.h3
                  className={cn(
                    'text-sm font-medium',
                    isCurrent && 'text-brand-green',
                    isCompleted && 'text-brand-ink',
                    isUpcoming && 'text-brand-ink/50'
                  )}
                  animate={{
                    color: isCurrent ? '#39D98A' : isCompleted ? '#141414' : '#14141450',
                  }}
                >
                  {step.title}
                </motion.h3>
                {step.description && (
                  <p className="text-xs text-brand-ink/70 mt-1">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
