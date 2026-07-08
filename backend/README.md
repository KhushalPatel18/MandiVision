# MandiVision Backend

Production-ready backend for the **MandiVision** — Farmers Crop Price Prediction Platform.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **Validation**: Zod
- **Logger**: Winston
- **Task Scheduling**: node-cron
- **Containerization**: Docker & Docker Compose

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL (or Docker)

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run database migrations (requires running PostgreSQL)
npx prisma migrate dev --name init

# Start development server
npm run dev
```

### Using Docker

```bash
# Start PostgreSQL + Backend
docker-compose up -d

# Or just PostgreSQL for local development
docker-compose up -d postgres
```

### Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

| Variable | Description | Default |
|---|---|---|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `DATABASE_URL` | PostgreSQL connection string | — |
| `JWT_SECRET` | JWT signing secret | — |
| `JWT_EXPIRES_IN` | JWT expiration | `7d` |
| `PYTHON_API_URL` | ML model API URL | `http://localhost:8000` |
| `DATA_GOV_API_KEY` | data.gov.in API key | — |

## API Endpoints

| Endpoint | Description |
|---|---|
| `GET /health` | Health check |
| `/api/auth` | Authentication |
| `/api/users` | User management |
| `/api/crops` | Crop data |
| `/api/markets` | Market data |
| `/api/prices` | Price history |
| `/api/predictions` | Price predictions |
| `/api/analytics` | Analytics & trends |

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with nodemon |
| `npm run build` | Compile TypeScript |
| `npm start` | Run production build |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:studio` | Open Prisma Studio |

## Project Structure

```
backend/
├── prisma/           # Database schema & migrations
├── src/
│   ├── config/       # Environment, DB, Logger configs
│   ├── middleware/    # Auth, error, validation, rate limit
│   ├── modules/      # Feature modules (auth, users, crops, etc.)
│   ├── jobs/         # Background cron jobs
│   ├── services/     # Shared services (Prisma, JWT, bcrypt, API)
│   ├── routes/       # Central route registration
│   ├── types/        # TypeScript type declarations
│   ├── utils/        # Utilities (ApiError, ApiResponse, etc.)
│   ├── app.ts        # Express app configuration
│   └── server.ts     # Server entry point
├── Dockerfile
├── docker-compose.yml
└── package.json
```
