# OpenWeed MVP

A federated, community-driven cannabis delivery platform where local drivers can run their own branded delivery sites under the OpenWeed ecosystem.

## Latest Updates
- ✅ Fixed Next.js 15 Suspense boundary requirements
- ✅ Resolved TypeScript compilation errors  
- ✅ Improved Docker development setup
- ✅ Added Prisma client generation to build process
- ✅ Fixed confusing route structure - onboard pages now use proper `/onboard/` URLs

## 🌿 Features

- **Driver Mini-Sites**: Each driver gets their own branded delivery site
- **Map-Based Discovery**: Find drivers in your area with interactive maps
- **Smokers Lounge**: Community chat rooms for each region
- **Admin Dashboard**: Complete management interface for platform operations
- **Driver Onboarding**: Streamlined process to become a delivery driver
- **Real-time Chat**: Live communication between drivers and customers
- **Order Management**: Full order lifecycle tracking

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- PostgreSQL database (Neon recommended)
- Vercel account for deployment

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd openweed-mvp
   pnpm install
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables (see Configuration section below):
   ```env
   DATABASE_URL="postgresql://username:password@host:port/database"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   EMAIL_SERVER_HOST="smtp.gmail.com"
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER="your-email@gmail.com"
   EMAIL_SERVER_PASSWORD="your-app-password"
   EMAIL_FROM="noreply@openweed.co"
   UPLOADTHING_SECRET="your-uploadthing-secret"
   UPLOADTHING_APP_ID="your-uploadthing-app-id"
   ```

3. **Set up the database**
   ```bash
   pnpm db:push
   pnpm db:seed
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Visit the application**
   - Main site: http://localhost:3000
   - Admin dashboard: http://localhost:3000/admin/dashboard
   - Demo driver site: http://localhost:3000/deliveries/atxweedog

## 🔧 Configuration

### DMNO Type-Safe Environment Variables

OpenWeed uses [DMNO](https://dmno.dev) for type-safe environment variable management:

- **Type Safety**: All environment variables are validated at runtime
- **Auto-completion**: Full TypeScript support in your IDE
- **Validation**: Schema validation prevents configuration errors
- **Vercel Integration**: Native support for Vercel platform variables

### Required Environment Variables

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# Authentication  
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-secret-key"

# Email Configuration
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@openweed.co"

# File Upload
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"
```

### Optional Services (Vercel Marketplace)

Connect these services via Vercel Marketplace for automatic configuration:

- **Mapbox**: Enhanced mapping capabilities
- **Supabase**: Real-time features and chat
- **Additional services**: Growing marketplace integrations

## 📁 Project Structure

```
openweed/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public site routes
│   ├── (onboard)/         # Driver onboarding flow
│   ├── (admin)/           # Admin dashboard
│   └── api/               # API routes
├── components/            # React components
│   ├── layout/            # Layout components
│   ├── ui/                # UI components
│   ├── onboard/           # Onboarding components
│   └── admin/             # Admin components
├── lib/                   # Utility libraries
├── prisma/                # Database schema and migrations
├── styles/                # Global styles
└── public/                # Static assets
```

## 🗄️ Database Schema

The application uses Prisma with PostgreSQL and includes these main models:

- **User**: Buyers, drivers, and admins
- **DriverProfile**: Driver-specific information and settings
- **Product**: Cannabis products with inventory tracking
- **Order**: Order management with status tracking
- **ChatMessage**: Real-time chat messages
- **Review**: Customer reviews and ratings
- **Zone**: Geographic service areas

## 🔐 Authentication

OpenWeed uses NextAuth.js with email magic links for authentication. The system supports three user roles:

- **BUYER**: Can place orders and use chat
- **DRIVER**: Can manage their mini-site and orders
- **ADMIN**: Full platform access and management

## 🗺️ Geographic Features

- ZIP code to region mapping
- Interactive maps with Leaflet/OpenStreetMap
- Driver proximity search
- Service area management

## 💬 Real-time Features

- Polling-based chat system (5-second intervals)
- Live order status updates
- Driver availability tracking

## 🎨 Branding

The application uses a psychedelic-futurist aesthetic with:

- **Colors**: Green (#39D98A), Violet (#B874F4), Amber (#FBBF24)
- **Typography**: Inter font family
- **Logo**: Crystalline cannabis leaf mark
- **Design**: Iridescent, fluid, high-end aesthetic

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Integrations**
   - Go to Vercel project dashboard
   - Navigate to "Integrations" tab
   - Connect required services (Database, Email, File Upload)
   - Optional services will be auto-configured

2. **Environment Variables**
   - Add required variables to Vercel project
   - Vercel automatically injects integration variables

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Docker Deployment

```bash
# Build production image
docker build -f Dockerfile.prod -t openweed .

# Run with docker-compose
docker-compose up -d
```

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run E2E tests
pnpm test:e2e
```

## 📊 Analytics

The admin dashboard includes:

- Revenue tracking and growth metrics
- Driver performance analytics
- Order completion rates
- Geographic distribution data
- Product popularity insights

## 🔧 Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:push` - Push database schema changes
- `pnpm db:seed` - Seed database with demo data
- `pnpm db:studio` - Open Prisma Studio

### Code Style

- TypeScript for type safety
- Tailwind CSS for styling
- ESLint for code quality
- Prettier for code formatting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact us at support@openweed.co

## 🌟 Roadmap

### Phase 1 (MVP) ✅
- [x] Driver onboarding flow
- [x] Mini-site generation
- [x] Order management
- [x] Admin dashboard
- [x] Community chat

### Phase 2 (Coming Soon)
- [ ] Stripe Connect integration
- [ ] Mobile app
- [ ] Advanced analytics
- [ ] Multi-region support

### Phase 3 (Future)
- [ ] Decentralized hosting
- [ ] Open source release
- [ ] API for third-party integrations
- [ ] Advanced driver tools

---

**Built with ❤️ by the OpenWeed team**
