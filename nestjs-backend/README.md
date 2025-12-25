# NestJS Permits Backend

A NestJS REST API for managing permit applications with PostgreSQL and Prisma ORM.

## Prerequisites

- Node.js (v24 or higher)
- npm or yarn
- Docker and Docker Compose (for local PostgreSQL)
- OR Prisma Cloud account (for cloud database)

## Setup Instructions

### Option 1: Using Prisma Cloud Database

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Set Up Prisma Cloud

1. Visit [Prisma Cloud Console](https://console.prisma.io)
2. Create a new project or use an existing one
3. Create a PostgreSQL database
4. Copy the connection string

#### 3. Configure Environment Variables

Create a `.env` file:
```bash
cp .env.example .env
```

Update the `DATABASE_URL` with your Prisma Cloud connection string:
```env
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public&sslmode=require"
PORT=3001
```

#### 4. Run Database Migrations

```bash
npx prisma migrate deploy
```

#### 5. Start the Application

```bash
npm run start:dev
```

---

### Option 2: Using Docker (Recommended for Local Development)

#### 1. Clone and Navigate

```bash
cd nestjs-backend
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Configure Environment Variables

```bash
cp .env.example .env
```

The default `.env` configuration:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/permits_db?schema=public"
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=permits_db
PORT=3001
```

#### 4. Start PostgreSQL with Docker

From the project root directory:
```bash
cd ..
docker-compose up -d
```

This will start a PostgreSQL container on port 5432.

#### 5. Run Database Migrations

```bash
cd nestjs-backend
npx prisma migrate dev
```

#### 6. Start the Application

```bash
npm run start:dev
```

The API will be available at `http://localhost:3001`

---

## API Endpoints

### Create Permit Application
```http
POST /permits
Content-Type: application/json

{
  "applicant_name": "John Doe",
  "applicant_email": "john@example.com",
  "permit_type": "Building Permit"
}
```

### Get All Permits
```http
GET /permits
```

### Get Single Permit
```http
GET /permits/:id
```

### Update Permit
```http
PATCH /permits/:id
Content-Type: application/json

{
  "application_status": "Approved"
}
```

### Delete Permit
```http
DELETE /permits/:id
```

---

## Database Schema

The application uses a single `PermitApplication` model:

- `id` - Auto-incrementing integer (Primary Key)
- `applicant_name` - String (Required)
- `applicant_email` - String (Required, Unique)
- `permit_type` - String (Required)
- `application_status` - Enum: `Pending` | `Approved` | `Rejected` (Default: Pending)
- `submitted_at` - DateTime (Auto-generated)
- `updated_at` - DateTime (Auto-updated)

---

## Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in watch mode (development)
- `npm run start:prod` - Start in production mode
- `npm run build` - Build the application
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Lint and fix code

---

## Prisma Commands

### Generate Prisma Client
```bash
npx prisma generate
```

### Create New Migration
```bash
npx prisma migrate dev --name migration_name
```

### Apply Migrations (Production)
```bash
npx prisma migrate deploy
```

### Open Prisma Studio (Database GUI)
```bash
npx prisma studio
```

### Reset Database (Development Only)
```bash
npx prisma migrate reset
```

---

## Docker Commands

### Start PostgreSQL
```bash
docker-compose up -d
```

### Stop PostgreSQL
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f postgres
```

### Reset Database Volume
```bash
docker-compose down -v
docker-compose up -d
```

---

## Production Deployment

### 1. Build the Application
```bash
npm run build
```

### 2. Set Production Environment Variables
```env
NODE_ENV=production
DATABASE_URL="your_production_database_url"
PORT=3001
```

### 3. Run Migrations
```bash
npx prisma migrate deploy
```

### 4. Start the Application
```bash
npm run start:prod
```

---

## Troubleshooting

### Database Connection Issues

**Error: Can't reach database server**
- Ensure Docker container is running: `docker ps`
- Check if PostgreSQL is listening on port 5432: `netstat -an | grep 5432`
- Verify DATABASE_URL in `.env` matches your configuration

**Error: P2025 - Record not found**
- This occurs when trying to update/delete a non-existent permit
- The API will return a 404 status with a descriptive message

### Migration Issues

**Error: Migration already applied**
```bash
npx prisma migrate resolve --applied migration_name
```

**Database out of sync**
```bash
npx prisma migrate dev
```

### Port Already in Use

If port 3001 or 5432 is already in use:
- Change the PORT in `.env` for the application
- Change the port mapping in `docker-compose.yml` for PostgreSQL

---

## Development Notes

- The application uses class-validator for DTO validation
- Global ValidationPipe is configured for automatic request validation
- ParseIntPipe ensures type-safe route parameters
- Prisma handles database operations with type safety
- Error handling follows NestJS best practices with proper HTTP exceptions
