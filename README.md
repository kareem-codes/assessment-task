# Permits Management System

A full-stack application for managing construction permits, built with NestJS backend and Nuxt.js frontend.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Configuration](#configuration)
- [Features](#features)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **pnpm** (package manager)
- **Docker** and **Docker Compose** (for database) - [Download](https://www.docker.com/)
- **Git** (for cloning the repository)

## Project Structure

```
assessment-task/
├── nestjs-backend/     # NestJS REST API backend
├── nuxt-frontend/      # Nuxt.js frontend application
├── docker-compose.yml  # PostgreSQL database configuration
└── README.md          # This file
```

## Quick Start

For a rapid setup, follow these steps:

```bash
# 1. Clone the repository
git clone https://github.com/kareem-codes/assessment-task
cd assessment-task

# 2. Start the database
docker-compose up -d

# 3. Setup and start backend
cd nestjs-backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate deploy
npm run start:dev

# 4. In a new terminal, setup and start frontend
cd nuxt-frontend
cp .env.example .env
npm install
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## Detailed Setup

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd nestjs-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   The `.env` file should contain:
   ```env
   PORT=3001
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/permits_db?schema=public"
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=permits_db
   ```

4. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

5. **Run database migrations:**
   ```bash
   npx prisma migrate deploy
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd nuxt-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   The `.env` file should contain:
   ```env
   BACKEND_URL=http://localhost:3001
   ```

### Database Setup

The application uses PostgreSQL running in a Docker container.

1. **Start the PostgreSQL database:**
   ```bash
   # From the root directory
   docker-compose up -d
   ```

2. **Verify the database is running:**
   ```bash
   docker ps
   ```
   You should see a container named `postgres` running.

3. **View database logs (if needed):**
   ```bash
   docker-compose logs -f postgres
   ```

4. **Stop the database:**
   ```bash
   docker-compose down
   ```

5. **Stop and remove all data:**
   ```bash
   docker-compose down -v
   ```

## Running the Application

### Development Mode

1. **Start the database (if not already running):**
   ```bash
   docker-compose up -d
   ```

2. **Start the backend server:**
   ```bash
   cd nestjs-backend
   npm run start:dev
   ```
   The backend will be available at http://localhost:3001

3. **In a new terminal, start the frontend:**
   ```bash
   cd nuxt-frontend
   npm run dev
   ```
   The frontend will be available at http://localhost:3000

### Production Mode

1. **Build the backend:**
   ```bash
   cd nestjs-backend
   npm run build
   npm run start:prod
   ```

2. **Build the frontend:**
   ```bash
   cd nuxt-frontend
   npm run build
   npm run preview
   ```

## Configuration

### Backend Configuration

- **Port**: Default is `3001` (configured in `.env`)
- **Database**: PostgreSQL connection string (configured in `.env`)
- **API Endpoints**: Available at `http://localhost:3001/permits`

### Frontend Configuration

- **Port**: Default is `3000` (Nuxt default)
- **Backend API URL**: `http://localhost:3001` (configured in `.env`)
- **Internationalization**: Supports Arabic (default) and English
- **Styling**: Custom NDS (Neom Design System) components

### Environment Variables

#### Backend (`nestjs-backend/.env`)
```env
PORT=3001
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/permits_db?schema=public"
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=permits_db
```

#### Frontend (`nuxt-frontend/.env`)
```env
BACKEND_URL=http://localhost:3001
```

## Features

### Backend Features
- RESTful API for permit management
- Prisma ORM with PostgreSQL
- CRUD operations for permits
- Filtering and pagination support
- Data validation with class-validator
- TypeScript support

### Frontend Features
- Modern Nuxt.js 4 application
- Bilingual support (Arabic RTL & English LTR)
- Custom NDS component library
- Permit listing with filtering and pagination
- Permit creation and viewing
- Responsive design
- Type-safe with TypeScript

## Troubleshooting

### Common Issues

**1. Port already in use:**
```bash
# For backend (port 3001)
lsof -ti:3001 | xargs kill -9

# For frontend (port 3000)
lsof -ti:3000 | xargs kill -9

# For PostgreSQL (port 5432)
lsof -ti:5432 | xargs kill -9
```

**2. Database connection errors:**
- Ensure Docker is running: `docker ps`
- Check PostgreSQL logs: `docker-compose logs postgres`
- Verify DATABASE_URL in `.env` matches docker-compose configuration

**3. Prisma client issues:**
```bash
cd nestjs-backend
npx prisma generate
npx prisma migrate deploy
```

**4. Module not found errors:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**5. Frontend cannot connect to backend:**
- Verify backend is running on port 3001
- Check `BACKEND_URL` in `nuxt-frontend/.env`
- Ensure CORS is properly configured in backend

**6. Docker issues:**
```bash
# Reset Docker environment
docker-compose down -v
docker-compose up -d

# Rebuild containers
docker-compose up -d --build
```

### Development Tips

- **Hot Reload**: Both frontend and backend support hot reloading in dev mode
- **API Testing**: Use tools like Postman or curl to test the API at `http://localhost:3001/permits`
- **Database Inspection**: Use Prisma Studio to inspect the database:
  ```bash
  cd nestjs-backend
  npx prisma studio
  ```

### Getting Help

If you encounter issues not covered here:
1. Check the terminal output for error messages
2. Review the logs: `docker-compose logs`
3. Ensure all prerequisites are properly installed
4. Verify all environment variables are correctly set

## Additional Commands

### Backend Commands
```bash
# Run tests
npm run test

# Run e2e tests
npm run test:e2e

# Format code
npm run format

# Lint code
npm run lint

# Create a new migration
npx prisma migrate dev --name migration_name
```

### Frontend Commands
```bash
# Build for production
npm run build

# Generate static site
npm run generate

# Preview production build
npm run preview
```

### Docker Commands
```bash
# View running containers
docker ps

# View all containers
docker ps -a

# View logs
docker-compose logs -f

# Restart containers
docker-compose restart

# Remove containers and volumes
docker-compose down -v
```

---

**Version**: 1.0.0  
**Last Updated**: December 25, 2025