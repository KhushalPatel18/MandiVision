# 📈 MandiVision

**MandiVision** is an AI-powered crop price prediction system designed to empower farmers with data-driven market insights. By analyzing historical market trends and supply-demand dynamics, MandiVision helps farmers anticipate future crop prices and make informed decisions on when and where to sell their harvest for maximum profitability.

## 🚀 Features
- **Accurate Price Forecasting**: Leverages machine learning to predict future market prices for various crops.
- **Market Insights**: Provides analysis on market trends to help farmers time their sales effectively.
- **Farmer-Centric**: Built specifically to protect farmers from market volatility and ensure they get the best value for their produce.

## 🛠️ Project Structure
*   **`backend`**: Express + TypeScript Node.js backend using Prisma ORM.
*   **`frontend`**: React + TypeScript single-page application built on Vite.

---

## 💻 Local Setup and Run

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   * Copy `.env.example` to `.env`
   * Populate variables (e.g., `DATABASE_URL` for PostgreSQL database connection, `DATA_GOV_API_KEY` from `data.gov.in`, and `JWT_SECRET`).
4. Generate Prisma client & apply database migrations:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. Run in development mode (with hot reloading):
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   * Copy `.env.example` to `.env`
   * Modify `VITE_API_URL` to point to the running backend (default `http://localhost:5000`).
4. Start the frontend developer server:
   ```bash
   npm run dev
   ```

---

## 🐳 Containerization and Deployment

Both the frontend and backend are fully containerized using **Docker**, making them deployable to any cloud platform (such as Render, Fly.io, AWS ECS, Railway, or Google Cloud Run).

### Environment Variables for Deployment

#### Backend Variables:
*   `DATABASE_URL`: PostgreSQL connection string.
*   `JWT_SECRET`: Secure string used to sign user auth sessions.
*   `DATA_GOV_API_KEY`: API key for Agmarknet/Data.gov.in.
*   `CORS_ORIGIN`: Comma-separated list of allowed frontend domains (e.g., `https://mandivision.com`).
*   `PORT`: Port to bind (handled dynamically by the host, defaulting to `5000`).
*   `ML_SERVICE_URL`: Base URL of the running Python ML prediction service.

#### Frontend Variables:
*   `VITE_API_URL`: URL of the deployed backend server API prefix.

### Deployment steps:
1. **GitHub Push**: The `.gitignore` files are pre-configured to ensure no sensitive `.env` files or credentials are ever pushed to the repository.
2. **Build Containers**:
   * Build backend: `docker build -t mandivision-backend ./backend`
   * Build frontend: `docker build -t mandivision-frontend ./frontend`
3. **Database Migration**: Ensure `npx prisma db push` or `prisma migrate deploy` is triggered during the backend build pipeline step before boot.
4. **Nginx Integration**: The frontend container uses Nginx with a customized routing index configured to prevent 404s when direct routing React Router sub-pages.

