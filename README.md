<div align="center">

# GreenCode - Personal Carbon Footprint Tracker

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.1.7-black?style=for-the-badge&logo=nextdotjs" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" />
</p>

**Log daily activities across travel, food, and energy categories and visualize your household's environmental impact through an interactive dashboard.**

[Live Demo](https://green-code-pi.vercel.app/) | [Features](#features) | [Getting Started](#getting-started) | [Tech Stack](#tech-stack)

</div>

<br/>

## About

GreenCode is a comprehensive personal and family carbon footprint tracker. By allowing users to log daily activities across multiple categories—such as travel, food consumption, and energy usage—it provides a clear visualization of your household's environmental impact through an interactive, live-updating dashboard.

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

## API Endpoints

The Java backend exposes the following REST API:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/family` | Fetch family data with members and emissions |
| POST | `/api/family` | Log a new activity for a member |
| POST | `/api/members` | Add a new family member |
| GET | `/api/insights` | Get aggregated emission insights |

---

## Getting Started

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
