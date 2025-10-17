# OpenWeed MVP - Docker Development Setup

## Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed
- Git (to clone the repository)

### 1. Clone and Setup
```bash
git clone <repository-url>
cd openweed-mvp
```

### 2. Start with Docker Compose
```bash
# Start all services (PostgreSQL + App)
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

### 3. Access the Application
- **Main Site**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin/dashboard
- **Demo Driver Site**: http://localhost:3000/deliveries/atxweedog
- **Driver Onboarding**: http://localhost:3000/onboard/driver

### 4. Database Access
- **Host**: localhost:5432
- **Database**: openweed
- **Username**: openweed
- **Password**: openweed123

## Development Commands

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app
docker-compose logs -f postgres
```

### Database Operations
```bash
# Access database shell
docker-compose exec postgres psql -U openweed -d openweed

# Reset database
docker-compose exec app pnpm db:push
docker-compose exec app pnpm db:seed

# Open Prisma Studio
docker-compose exec app pnpm db:studio
```

### Application Commands
```bash
# Install new dependencies
docker-compose exec app pnpm add <package-name>

# Run tests
docker-compose exec app pnpm test

# Build for production
docker-compose exec app pnpm build
```

## Environment Variables

The Docker setup uses these default values for development:

```env
DATABASE_URL=postgresql://openweed:openweed123@postgres:5432/openweed
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-development-secret-key-change-in-production
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@openweed.local
```

## Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart PostgreSQL
docker-compose restart postgres

# Check database logs
docker-compose logs postgres
```

### Application Issues
```bash
# Rebuild application
docker-compose up --build app

# Check application logs
docker-compose logs app

# Access application shell
docker-compose exec app sh
```

### Port Conflicts
If ports 3000 or 5432 are already in use:

```bash
# Stop conflicting services
sudo lsof -ti:3000 | xargs kill -9
sudo lsof -ti:5432 | xargs kill -9

# Or change ports in docker-compose.yml
```

## Production Deployment

For production deployment, use the production Dockerfile:

```bash
# Build production image
docker build -f Dockerfile.prod -t openweed:latest .

# Run production container
docker run -p 3000:3000 \
  -e DATABASE_URL="your-production-db-url" \
  -e NEXTAUTH_SECRET="your-production-secret" \
  openweed:latest
```

## Cleanup

```bash
# Stop all services
docker-compose down

# Remove volumes (WARNING: This deletes all data)
docker-compose down -v

# Remove images
docker-compose down --rmi all
```
