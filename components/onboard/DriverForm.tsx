'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, MapPin, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DriverFormProps {
  onSubmit: (data: DriverFormData) => void
  initialData?: Partial<DriverFormData>
  className?: string
}

export interface DriverFormData {
  handle: string
  region: string
  bio: string
}

export default function DriverForm({ 
  onSubmit, 
  initialData = {}, 
  className 
}: DriverFormProps) {
  const [formData, setFormData] = useState<DriverFormData>({
    handle: initialData.handle || '',
    region: initialData.region || 'Austin Central',
    bio: initialData.bio || '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<DriverFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<DriverFormData> = {}

    if (!formData.handle.trim()) {
      newErrors.handle = 'Handle is required'
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.handle)) {
      newErrors.handle = 'Handle can only contain letters, numbers, hyphens, and underscores'
    } else if (formData.handle.length < 3) {
      newErrors.handle = 'Handle must be at least 3 characters'
    }

    if (!formData.region.trim()) {
      newErrors.region = 'Region is required'
    }

    if (!formData.bio.trim()) {
      newErrors.bio = 'Bio is required'
    } else if (formData.bio.length < 20) {
      newErrors.bio = 'Bio must be at least 20 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof DriverFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
      <div>
        <label htmlFor="handle" className="block text-sm font-medium text-brand-ink mb-2">
          <User className="w-4 h-4 inline mr-1" />
          Driver Handle
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-ink/50">
            @
          </span>
          <input
            type="text"
            id="handle"
            value={formData.handle}
            onChange={(e) => handleChange('handle', e.target.value)}
            className={cn(
              'w-full pl-8 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent',
              errors.handle ? 'border-red-500' : 'border-brand-ink/20'
            )}
            placeholder="your-handle"
            disabled={isSubmitting}
          />
        </div>
        {errors.handle && (
          <p className="mt-1 text-sm text-red-600">{errors.handle}</p>
        )}
        <p className="mt-1 text-sm text-brand-ink/70">
          This will be your unique URL: openweed.co/deliveries/{formData.handle || 'your-handle'}
        </p>
      </div>

      <div>
        <label htmlFor="region" className="block text-sm font-medium text-brand-ink mb-2">
          <MapPin className="w-4 h-4 inline mr-1" />
          Service Region
        </label>
        <select
          id="region"
          value={formData.region}
          onChange={(e) => handleChange('region', e.target.value)}
          className={cn(
            'w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent',
            errors.region ? 'border-red-500' : 'border-brand-ink/20'
          )}
          disabled={isSubmitting}
        >
          <option value="Austin Central">Austin Central</option>
          <option value="Austin North">Austin North</option>
          <option value="Austin South">Austin South</option>
          <option value="Austin East">Austin East</option>
          <option value="Austin West">Austin West</option>
        </select>
        {errors.region && (
          <p className="mt-1 text-sm text-red-600">{errors.region}</p>
        )}
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-brand-ink mb-2">
          <FileText className="w-4 h-4 inline mr-1" />
          Driver Bio
        </label>
        <textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => handleChange('bio', e.target.value)}
          rows={4}
          className={cn(
            'w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent resize-none',
            errors.bio ? 'border-red-500' : 'border-brand-ink/20'
          )}
          placeholder="Tell customers about yourself, your experience, and what makes your delivery service special..."
          disabled={isSubmitting}
        />
        {errors.bio && (
          <p className="mt-1 text-sm text-red-600">{errors.bio}</p>
        )}
        <p className="mt-1 text-sm text-brand-ink/70">
          {formData.bio.length}/500 characters
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-green text-white py-3 px-6 rounded-xl font-semibold hover:bg-brand-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Creating Profile...' : 'Continue'}
      </button>
    </form>
  )
}
