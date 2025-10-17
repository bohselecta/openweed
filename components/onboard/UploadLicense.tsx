'use client'

import { useState } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UploadLicenseProps {
  onUpload: (file: File) => void
  onSkip?: () => void
  className?: string
}

export default function UploadLicense({ 
  onUpload, 
  onSkip,
  className 
}: UploadLicenseProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    setError(null)
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a valid image (JPEG, PNG, WebP) or PDF file')
      return
    }
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }
    
    setUploadedFile(file)
    setIsUploading(true)
    
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false)
      onUpload(file)
    }, 2000)
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className={cn('space-y-6', className)}>
      <div>
        <h3 className="text-lg font-semibold text-brand-ink mb-2">
          Upload License Verification
        </h3>
        <p className="text-sm text-brand-ink/70 mb-4">
          Upload a photo of your driver's license or state ID for verification. 
          This helps us ensure all drivers are properly licensed and verified.
        </p>
      </div>

      {!uploadedFile ? (
        <div
          className={cn(
            'border-2 border-dashed rounded-xl p-8 text-center transition-colors',
            dragActive 
              ? 'border-brand-green bg-brand-green/5' 
              : 'border-brand-ink/20 hover:border-brand-green/50',
            error && 'border-red-500 bg-red-50'
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-brand-green mx-auto mb-4" />
          
          <h4 className="text-lg font-semibold text-brand-ink mb-2">
            Drop your license here
          </h4>
          
          <p className="text-sm text-brand-ink/70 mb-4">
            or click to browse files
          </p>
          
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileInput}
            className="hidden"
            id="license-upload"
          />
          
          <label
            htmlFor="license-upload"
            className="inline-block bg-brand-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-green/90 transition-colors cursor-pointer"
          >
            Choose File
          </label>
          
          <p className="text-xs text-brand-ink/50 mt-4">
            Supports JPEG, PNG, WebP, PDF • Max 5MB
          </p>
        </div>
      ) : (
        <div className="bg-brand-green/10 border border-brand-green/20 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center">
              {isUploading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <CheckCircle className="w-6 h-6 text-white" />
              )}
            </div>
            
            <div className="flex-1">
              <h4 className="font-semibold text-brand-ink">
                {uploadedFile.name}
              </h4>
              <p className="text-sm text-brand-ink/70">
                {formatFileSize(uploadedFile.size)} • {uploadedFile.type}
              </p>
              {isUploading && (
                <p className="text-sm text-brand-green mt-1">
                  Uploading...
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      )}

      <div className="bg-brand-ink/5 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <FileText className="w-5 h-5 text-brand-ink/70 mt-0.5" />
          <div>
            <h4 className="font-semibold text-brand-ink mb-1">
              Verification Process
            </h4>
            <ul className="text-sm text-brand-ink/70 space-y-1">
              <li>• We'll verify your license information</li>
              <li>• Your account will be reviewed within 24-48 hours</li>
              <li>• You'll receive an email when verification is complete</li>
              <li>• You can start adding products after approval</li>
            </ul>
          </div>
        </div>
      </div>

      {onSkip && (
        <div className="text-center">
          <button
            onClick={onSkip}
            className="text-sm text-brand-ink/70 hover:text-brand-ink transition-colors"
          >
            Skip for now (upload later)
          </button>
        </div>
      )}
    </div>
  )
}
