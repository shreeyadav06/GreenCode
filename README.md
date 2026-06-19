# GreenCode

A personal and family carbon footprint tracker. Log daily activities across travel, food, and energy categories and visualize your household's environmental impact through an interactive dashboard.

**Live Demo:** [green-code-pi.vercel.app](https://green-code-pi.vercel.app/)

---

## Tech Stack

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Firebase Authentication (Google + Email/Password)
- next-themes (Light/Dark mode)

### Backend
- Java 21 (Maven)
- Built-in Java HttpServer (`com.sun.net.httpserver`)
- Firebase Admin SDK 9.2.0
- Google Cloud Firestore (database)
- Jackson Databind 2.16.1 (JSON serialization)
- Deployed on Render

---

## Features

### Landing Page
- Full-screen hero with forest imagery
- Bento grid showcasing platform capabilities
- Responsive light/dark mode with refined color palette

### Authentication
- Google Sign-In (popup-based)
- Email/Password registration and login
- Guest Mode for exploring the dashboard without an account

### Dashboard
- **Activity Logging** -- Log travel, food, and energy usage per family member
  - Travel: Car, Bus, Air, Bike, Metro, Auto/Cab
  - Food: Vegan, Vegetarian, Omnivore
  - Energy: Fan, AC, Fridge, Lights, TV, Washing Machine, Heater, PC, Microwave
- **Family Management** -- Add members with name, age, and role
- **Carbon Overview** -- Circular gauge showing total family CO2e with live OOP-calculated data
- **Family Impact** -- Per-member emission breakdown with progress bars
- **Insights** -- Top emitter, family average, and category-level emission charts

---

## API Endpoints

The Java backend exposes the following REST API:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/family` | Fetch family data with members and emissions |
| POST | `/api/family` | Log a new activity for a member |
| POST | `/api/members` | Add a new family member |
| GET | `/api/insights` | Get aggregated emission insights |

---

## Project Structure

```
GreenCode/
  backend/
    src/main/java/com/tracker/   -- Java API server
    pom.xml                      -- Maven dependencies
    Dockerfile                   -- Container config for Render
    run.ps1                      -- Local dev script (Windows)
  frontend/
    app/
      page.tsx                   -- Landing page
      dashboard/page.tsx         -- Dashboard
      login/page.tsx             -- Authentication page
      globals.css                -- Design tokens and theme
    components/                  -- Navbar, Footer, ThemeToggle, ProtectedRoute
    contexts/AuthContext.tsx      -- Firebase auth + guest mode provider
    lib/firebase.ts              -- Firebase client config
```

---

## Local Development

### Prerequisites
- Java JDK 21+
- Node.js 20+
- npm 10+
- Maven 3.9+

### 1. Start the Backend

```powershell
cd backend
./run.ps1
```

The API server starts on `http://localhost:8080`.

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The app starts on `http://localhost:3000`.

### Environment Variables

Create `frontend/.env.local` with your Firebase project config:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_API_URL=http://localhost:8080
```

---

## Deployment

- **Frontend:** Vercel (auto-deploys from `main` branch)
- **Backend:** Render (Docker container from `backend/Dockerfile`)

---

## License

All rights reserved.
