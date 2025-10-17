# OpenWeed MVP - Cursor Agent Configuration

This document provides context for Cursor AI agents working on the OpenWeed MVP project.

## Project Overview

OpenWeed is a federated cannabis delivery platform built with Next.js 15, TypeScript, Prisma, and Tailwind CSS. The platform enables local drivers to create their own branded delivery sites while providing a centralized discovery and management system.

## Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS + Framer Motion
- **Maps**: Leaflet + OpenStreetMap
- **File Upload**: UploadThing
- **Deployment**: Vercel

### Project Structure
```
app/
├── (public)/          # Public site routes
├── (onboard)/         # Driver onboarding flow  
├── (admin)/          # Admin dashboard
└── api/              # API routes

components/
├── layout/           # Layout components
├── ui/               # UI components
├── onboard/          # Onboarding components
└── admin/            # Admin components

lib/                  # Utility libraries
prisma/               # Database schema
```

## Key Features

### 1. Driver Mini-Sites
- Each driver gets a unique URL: `/deliveries/[handle]`
- Customizable branding and theme
- Product catalog management
- Live chat integration
- Order management

### 2. Public Discovery
- Map-based driver search
- ZIP code to region mapping
- Driver profiles and ratings
- Product browsing

### 3. Smokers Lounge
- Regional chat rooms
- Real-time messaging (polling-based)
- Community features

### 4. Admin Dashboard
- Driver approval and management
- Order tracking and analytics
- Inventory management
- Platform analytics

### 5. Driver Onboarding
- Multi-step wizard
- License verification
- Region selection
- Profile customization

## Database Schema

### Core Models
- **User**: Authentication and roles (BUYER, DRIVER, ADMIN)
- **DriverProfile**: Driver-specific information
- **Product**: Cannabis products with inventory
- **Order**: Order management with status tracking
- **ChatMessage**: Real-time chat messages
- **Review**: Customer feedback
- **Zone**: Geographic service areas

## Authentication & Authorization

### Roles
- **BUYER**: Can place orders, use chat
- **DRIVER**: Can manage mini-site, orders
- **ADMIN**: Full platform access

### Middleware Protection
- Admin routes: `/admin/*` (ADMIN only)
- Driver routes: `/driver-dashboard/*` (DRIVER only)
- API routes: Role-based access control

## Branding & Design

### Color Palette
- Green: `#39D98A` (primary)
- Violet: `#B874F4` (secondary)
- Amber: `#FBBF24` (accent)
- Ink: `#141414` (text)
- Paper: `#F8F8F6` (background)

### Design Language
- Psychedelic-futurist aesthetic
- Iridescent, crystalline elements
- Fluid, organic shapes
- High-end, premium feel

## Development Guidelines

### Code Style
- TypeScript strict mode
- Tailwind CSS for styling
- ESLint + Prettier
- Component-based architecture

### File Naming
- Components: PascalCase (`DriverCard.tsx`)
- Pages: lowercase (`page.tsx`)
- Utilities: camelCase (`formatCurrency.ts`)

### API Patterns
- RESTful API routes
- Consistent error handling
- Type-safe responses
- Role-based access control

## Common Tasks

### Adding New Features
1. Define database schema in `prisma/schema.prisma`
2. Create API routes in `app/api/`
3. Build UI components in `components/`
4. Add pages in `app/`
5. Update middleware if needed

### Database Changes
1. Modify `prisma/schema.prisma`
2. Run `pnpm db:push`
3. Update seed data if needed
4. Test with `pnpm db:studio`

### Styling Guidelines
- Use Tailwind utility classes
- Follow brand color tokens
- Maintain responsive design
- Use Framer Motion for animations

## Testing Strategy

### Unit Tests
- Component testing with React Testing Library
- Utility function testing
- API route testing

### Integration Tests
- Database operations
- Authentication flows
- Order processing

### E2E Tests
- User journeys
- Driver onboarding
- Admin workflows

## Deployment

### Environment Setup
1. Database: Neon PostgreSQL
2. Authentication: NextAuth.js
3. File Upload: UploadThing
4. Hosting: Vercel

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection
- `NEXTAUTH_SECRET`: Authentication secret
- `EMAIL_*`: SMTP configuration
- `UPLOADTHING_*`: File upload keys

## Common Issues & Solutions

### Database Connection
- Ensure `DATABASE_URL` is correct
- Run `pnpm db:push` after schema changes
- Check Neon connection limits

### Authentication
- Verify `NEXTAUTH_SECRET` is set
- Check email server configuration
- Test magic link flow

### File Uploads
- Configure UploadThing properly
- Check file size limits
- Verify CORS settings

## Future Enhancements

### Phase 2
- Stripe Connect integration
- Mobile app development
- Advanced analytics
- Multi-region support

### Phase 3
- Decentralized hosting
- Open source release
- Third-party integrations
- Advanced driver tools

## Resources

### Documentation
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [NextAuth.js Docs](https://next-auth.js.org)

### External Services
- [Neon Database](https://neon.tech)
- [UploadThing](https://uploadthing.com)
- [Vercel Deployment](https://vercel.com)

---

**Last Updated**: January 2024
**Version**: MVP v1.0
