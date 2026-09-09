# FinanceTrack — Frontend

React-based frontend for FinanceTrack, a personal finance management application. Handles user authentication (login/registration) and displays user-scoped financial data (expenses, income, accounts, categories, budgets, transactions) consumed from the FinanceTrack API.

## Tech Stack

- React
- TypeScript
- Vite
- Fetch API for HTTP requests
- JWT-based authentication (token stored in `localStorage`)

## Prerequisites

- Node.js (LTS recommended)
- npm (or yarn/pnpm — match whichever this project uses)
- FinanceTrack API running locally or accessible remotely

## Getting Started

1. Clone the repository
```bash
git clone <repo-url>
cd financetrack-frontend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables

Create a `.env` file at the project root:
```
VITE_API_URL=http://localhost:5000/api
```

4. Run the development server
```bash
npm run dev
```

App will be available at `http://localhost:5173` (default Vite port).

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npx prettier --write .` | Format all files |

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/             # Route-level pages (Login, Dashboard, etc.)
├── services/          # API calls (authService, apiClient, etc.)
├── hooks/             # Custom React hooks
├── types/             # TypeScript interfaces/types
└── App.tsx
```

## Authentication Flow

- Single form toggles between **Login** and **Register** modes.
- On successful login/registration, the API returns a JWT token and basic user info.
- Token is stored in `localStorage` and attached as a `Bearer` header on every subsequent API request.
- Protected routes redirect to `/login` if no valid token is present.
- On first login with no existing data, the dashboard shows an empty state with example data.

## Code Formatting

This project uses Prettier. Format on save is recommended — see `.vscode/settings.json`.

```bash
npx prettier --write .
```

## Environment Notes

- Each user only sees their own data — enforced server-side via JWT claims and API-level filtering.
- Do not commit `.env` files (see `.gitignore`).

## License

Internal project — license terms as applicable.
