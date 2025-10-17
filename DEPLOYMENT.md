# OpenWeed MVP - Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
- GitHub repository with your OpenWeed code
- Vercel account (free tier available)
- Required service accounts (see below)

### 1. Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository: `bohselecta/openweed`
4. Vercel will automatically detect Next.js and configure build settings

### 2. Configure Environment Variables

In your Vercel project dashboard, go to **Settings → Environment Variables** and add:

```env
# Database (Required)
DATABASE_URL=postgresql://username:password@host:port/database

# Authentication (Required)
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-secret-key-here

# Email Configuration (Required)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@openweed.co

# File Upload (Required)
UPLOADTHING_SECRET=your-uploadthing-secret
UPLOADTHING_APP_ID=your-uploadthing-app-id

# Environment
NODE_ENV=production
```

### 3. Set Up Required Services

#### Database (Neon PostgreSQL)
1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Copy the connection string to `DATABASE_URL`
4. Run database migrations:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

#### Email Service (Gmail SMTP)
1. Enable 2-factor authentication on your Gmail account
2. Generate an "App Password" for OpenWeed
3. Use your Gmail credentials in the email variables

#### File Upload (UploadThing)
1. Go to [uploadthing.com](https://uploadthing.com) and create an account
2. Create a new app
3. Copy the secret and app ID to your environment variables

### 4. Optional Services (Vercel Marketplace)

#### Mapbox Integration
1. In Vercel dashboard, go to **Integrations**
2. Search for "Mapbox" and connect
3. Follow the setup wizard
4. Variables will be automatically injected

#### Supabase Integration
1. In Vercel dashboard, go to **Integrations**
2. Search for "Supabase" and connect
3. Create a new Supabase project or connect existing
4. Variables will be automatically injected

### 5. Deploy

1. Click **Deploy** in your Vercel project
2. Wait for the build to complete
3. Your app will be available at `https://your-app.vercel.app`

### 6. Post-Deployment Setup

#### Database Setup
```bash
# Connect to your deployed app and run:
npx prisma db push
npx prisma db seed
```

#### Domain Configuration
1. In Vercel dashboard, go to **Domains**
2. Add your custom domain (optional)
3. Update `NEXTAUTH_URL` to match your domain

## 🔧 Vercel Configuration

The project includes a `vercel.json` file with optimized settings:

- **Build Command**: `pnpm build`
- **Framework**: Next.js (auto-detected)
- **Regions**: `iad1` (US East)
- **Function Timeout**: 30 seconds for API routes
- **CORS Headers**: Configured for API routes
- **Image Optimization**: Automatic with Next.js

## 📊 Monitoring & Analytics

### Vercel Analytics
- Automatically enabled on Vercel Pro plans
- View performance metrics in dashboard

### Error Tracking
- Built-in error tracking in Vercel dashboard
- Optional: Connect Sentry integration

## 🔒 Security Features

- **Environment Variables**: Encrypted and secure
- **HTTPS**: Automatic SSL certificates
- **CORS**: Properly configured for API routes
- **Authentication**: NextAuth.js with secure sessions

## 🚀 Performance Optimizations

- **Edge Functions**: API routes run on Vercel Edge
- **Image Optimization**: Next.js Image component
- **Static Generation**: Pre-rendered pages where possible
- **CDN**: Global content delivery

## 📱 Mobile Optimization

- **Responsive Design**: Mobile-first approach
- **PWA Ready**: Can be configured as Progressive Web App
- **Touch Optimized**: Mobile-friendly interactions

## 🔄 Continuous Deployment

- **Auto-Deploy**: Pushes to main branch trigger deployments
- **Preview Deployments**: Pull requests get preview URLs
- **Rollback**: Easy rollback to previous deployments

## 🛠️ Troubleshooting

### Common Issues

1. **Build Failures**
   - Check environment variables are set
   - Verify all required services are connected
   - Check build logs in Vercel dashboard

2. **Database Connection Issues**
   - Verify `DATABASE_URL` is correct
   - Check Neon connection limits
   - Run `npx prisma db push` after deployment

3. **Authentication Issues**
   - Verify `NEXTAUTH_URL` matches your domain
   - Check email configuration
   - Test magic link flow

4. **File Upload Issues**
   - Verify UploadThing credentials
   - Check file size limits
   - Verify CORS settings

### Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)

## 🎉 Success!

Once deployed, your OpenWeed MVP will be live and ready for:
- Driver onboarding
- Product management
- Order processing
- Real-time chat
- Admin dashboard

Visit your deployed URL and start testing the platform!
