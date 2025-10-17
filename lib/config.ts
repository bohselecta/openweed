// Type-safe environment configuration
// This provides a centralized way to access environment variables with validation

interface Config {
  DATABASE_URL: string
  NEXTAUTH_URL: string
  NEXTAUTH_SECRET: string
  EMAIL_SERVER_HOST: string
  EMAIL_SERVER_PORT: number
  EMAIL_SERVER_USER: string
  EMAIL_SERVER_PASSWORD: string
  EMAIL_FROM: string
  UPLOADTHING_SECRET: string
  UPLOADTHING_APP_ID: string
  MAPBOX_PUBLIC_TOKEN?: string
  NEXT_PUBLIC_SUPABASE_URL?: string
  NEXT_PUBLIC_SUPABASE_ANON_KEY?: string
  NODE_ENV: 'development' | 'production' | 'test'
}

// Validate required environment variables
function validateEnv(): Config {
  const required = [
    'DATABASE_URL',
    'NEXTAUTH_URL', 
    'NEXTAUTH_SECRET',
    'EMAIL_SERVER_HOST',
    'EMAIL_SERVER_USER',
    'EMAIL_SERVER_PASSWORD',
    'EMAIL_FROM',
    'UPLOADTHING_SECRET',
    'UPLOADTHING_APP_ID'
  ]

  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }

  return {
    DATABASE_URL: process.env.DATABASE_URL!,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
    EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST!,
    EMAIL_SERVER_PORT: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER!,
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD!,
    EMAIL_FROM: process.env.EMAIL_FROM!,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET!,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID!,
    MAPBOX_PUBLIC_TOKEN: process.env.MAPBOX_PUBLIC_TOKEN,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NODE_ENV: (process.env.NODE_ENV as Config['NODE_ENV']) || 'development',
  }
}

// Export validated configuration
export const config = validateEnv()

// Export individual configs for convenience
export const {
  DATABASE_URL,
  NEXTAUTH_URL,
  NEXTAUTH_SECRET,
  EMAIL_SERVER_HOST,
  EMAIL_SERVER_PORT,
  EMAIL_SERVER_USER,
  EMAIL_SERVER_PASSWORD,
  EMAIL_FROM,
  UPLOADTHING_SECRET,
  UPLOADTHING_APP_ID,
  MAPBOX_PUBLIC_TOKEN,
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NODE_ENV,
} = config

// Environment helpers
export const isProduction = NODE_ENV === 'production'
export const isDevelopment = NODE_ENV === 'development'
export const isTest = NODE_ENV === 'test'

// Service configurations
export const emailConfig = {
  host: EMAIL_SERVER_HOST,
  port: EMAIL_SERVER_PORT,
  user: EMAIL_SERVER_USER,
  password: EMAIL_SERVER_PASSWORD,
  from: EMAIL_FROM,
}

export const uploadConfig = {
  secret: UPLOADTHING_SECRET,
  appId: UPLOADTHING_APP_ID,
}

export const authConfig = {
  url: NEXTAUTH_URL,
  secret: NEXTAUTH_SECRET,
}

// Database configuration
export const databaseConfig = {
  url: DATABASE_URL,
}

// Optional service configurations
export const mapboxConfig = MAPBOX_PUBLIC_TOKEN ? {
  token: MAPBOX_PUBLIC_TOKEN,
} : null

export const supabaseConfig = NEXT_PUBLIC_SUPABASE_URL && NEXT_PUBLIC_SUPABASE_ANON_KEY ? {
  url: NEXT_PUBLIC_SUPABASE_URL,
  anonKey: NEXT_PUBLIC_SUPABASE_ANON_KEY,
} : null
