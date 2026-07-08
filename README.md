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

## 🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.
