# GreenCode Frontend

GreenCode is a family carbon-footprint tracker with a Next.js dashboard connected to a Java backend.

## Tech Stack

- Next.js 16.1.7 (App Router)
- React 19.2.3
- TypeScript 5
- Tailwind CSS 4

## Pages

- Landing page: `/`
- Dashboard page: `/dashboard`

The landing page includes hero and impact sections. The previous global network section has been removed.

## Dashboard Features

- Log activities by category:
	- Travel
	- Food
	- Energy
- Add family members
- View per-member and family totals
- View category insights from backend aggregation

### Supported Activity Inputs

- Travel modes:
	- Car
	- Bus
	- Air (flight)
	- Bike
	- Metro
	- Auto/Cab
- Food meal types:
	- Vegan
	- Vegetarian
	- Omnivore
- Energy appliance logging:
	- Fan, AC, Fridge, Lights, TV, Washing Machine, Heater, PC, Microwave

Note: Food logs are sent with quantity `1` by default so they always contribute to emissions.

## API Integration

This frontend expects backend APIs at `http://localhost:8080`:

- `GET /api/family`
- `POST /api/family`
- `POST /api/members`
- `GET /api/insights`

## Local Development

### 1) Start Backend (from repository root)

```powershell
cd backend
./run.ps1
```

Backend runs on `http://localhost:8080`.

### 2) Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`.

## NPM Scripts

- `npm run dev` - start development server
- `npm run build` - production build
- `npm run start` - run production build
- `npm run lint` - run ESLint

## Notes

- Family/activity data is persisted by backend in `../data/sample_family.json`.
