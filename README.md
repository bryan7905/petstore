# Petstore

E-commerce app for selling pets.

## Tech Stack
- **Backend**: Java Spring Boot
- **Database**: PostgreSQL (managed by Flyway)
- **Frontend**: React (Vite, TypeScript, Tailwind CSS, MUI)
- **Deployment**: Render

## Prerequisites
- **Java 17+**
- **Node.js 18+**
- **PostgreSQL** (running locally on port 5432)

## Local Setup

### 1. Database
Create a database named `petstore` in your local PostgreSQL.
```sql
CREATE DATABASE petstore;
```

### 2. Backend
1. Navigate to `backend/`.
2. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend will start on `http://localhost:8080`.

### 3. Frontend
1. Navigate to `frontend/`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available on `http://localhost:5173`.

## Deployment to Render

This project is configured for one-click deployment to Render using `render.yaml`.

1. Push your code to a GitHub repository.
2. Create a new "Blueprint" in Render.
3. Select your repository.
4. Render will automatically provision:
   - A PostgreSQL database.
   - The Spring Boot backend.
   - The React frontend.

The services are linked via environment variables (`VITE_API_URL` and `APP_CORS_ALLOWED_ORIGINS`) automatically.
