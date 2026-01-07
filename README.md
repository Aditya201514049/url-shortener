# URL Shortener Service

A full-stack URL shortener that lets users register/login, create short links, track clicks, and manage links in a dashboard.

## Tech Stack

- **Frontend:** React + Vite + TailwindCSS
- **Backend:** Node.js (Express)
- **Database:** PostgreSQL (via Prisma)
- **Auth:** JWT (Bearer token)

---

## Project Structure

```
url-shortener/
  backend/
    src/
      controllers/
      middlewares/
      routes/
      services/
      utils/
      app.js
      server.js
    prisma/
      schema.prisma
    package.json

  frontend/
    src/
      components/
      contexts/
      hooks/
      pages/
      utils/
      App.jsx
      main.jsx
    package.json
```

---

## Setup Instructions

### Prerequisites

- Node.js (18+ recommended)
- PostgreSQL database

### 1) Backend Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in `backend/`:

```env
# backend/.env
PORT=5000
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB_NAME
JWT_SECRET=your_long_random_secret
CLIENT_URL=http://localhost:5173
# Used to build returned short URLs (optional)
BASE_URL=http://localhost:5000
```

3. Run Prisma migrations / generate client (depending on how you manage schema):

```bash
npx prisma generate
npx prisma migrate dev
```

4. Start backend:

```bash
npm run dev
# or
npm start
```

Backend runs at: `http://localhost:5000`

### 2) Frontend Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in `frontend/`:

```env
# frontend/.env
VITE_API_URL=http://localhost:5000
```

3. Start frontend:

```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## Functional Overview

### Authentication

- Users can register and login.
- Dashboard and URL management APIs are protected.
- Frontend verifies a stored token on refresh using `GET /api/auth/me`.

### URL Shortening

- Authenticated users can create a short URL.
- Short codes are generated using `nanoid(6)` (6 characters).
- The API returns a full short URL, e.g. `http://localhost:5000/abc123`.
- Dashboard includes copy-to-clipboard for the short URL.

### Redirection + Click Tracking

- Visiting `/:shortCode` redirects to the original URL.
- Each visit increments the click count.

### Usage Limits

- Free tier limit: **100 URLs per user**.
- When the limit is reached, the API returns an error and the UI shows a notification.

---

## API Documentation

Base URL: `http://localhost:5000`

### Auth

#### Register

`POST /api/auth/register`

Request:
```json
{
  "name": "Aditya",
  "email": "aditya@example.com",
  "password": "password123"
}
```

Response (201):
```json
{
  "token": "<jwt>",
  "user": { "id": "...", "email": "aditya@example.com", "name": "Aditya" }
}
```

#### Login

`POST /api/auth/login`

Request:
```json
{
  "email": "aditya@example.com",
  "password": "password123"
}
```

Response (200):
```json
{
  "token": "<jwt>",
  "user": { "id": "...", "email": "aditya@example.com", "name": "Aditya" }
}
```

#### Current User

`GET /api/auth/me`

Headers:
```
Authorization: Bearer <jwt>
```

Response (200):
```json
{
  "user": { "id": "...", "email": "aditya@example.com", "name": "Aditya" }
}
```

---

### URL Management (Protected)

All endpoints below require:
```
Authorization: Bearer <jwt>
```

#### Create short URL

`POST /api/urls`

Request:
```json
{
  "original": "https://example.com/some/very/long/url"
}
```

Response (200):
```json
{
  "id": "...",
  "original": "https://example.com/some/very/long/url",
  "shortCode": "abc123",
  "shortUrl": "http://localhost:5000/abc123",
  "clicks": 0,
  "createdAt": "2026-01-01T00:00:00.000Z"
}
```

Limit reached response (403):
```json
{ "message": "URL creation limit reached (free tier: 100 URLs)" }
```

#### List user URLs

`GET /api/urls`

Response (200):
```json
[
  {
    "id": "...",
    "original": "https://example.com",
    "shortCode": "abc123",
    "shortUrl": "http://localhost:5000/abc123",
    "clicks": 10,
    "createdAt": "2026-01-01T00:00:00.000Z"
  }
]
```

#### Delete URL

`DELETE /api/urls/:id`

Response (200):
```json
{ "success": true }
```

---

### Redirection

#### Redirect short URL

`GET /:shortCode`

Behavior:
- Redirects to the original URL
- Increments click count

---

## Design Decisions

- **JWT Bearer tokens:** Simple stateless auth suitable for this assignment.
- **Backend authorization middleware:** URL APIs require a valid token (`protect`).
- **Frontend route guards:** `/login` and `/register` are guest-only; `/dashboard` is auth-only.
- **Prisma + PostgreSQL:** Provides a clean DB layer and easy migrations.

---

## Known Limitations

- **JWT stored in localStorage:** Convenient but less secure than httpOnly cookies (XSS risk).
- **No refresh token/session rotation:** Token expires based on JWT expiry only.
- **Short code collision handling:** `nanoid(6)` collisions are extremely unlikely, but there is no explicit retry on collision.
- **Dashboard UI:** Uses a modular component layout; table layout can be added if required.

---

## Notes for Submission

- Make sure the app runs on a **fresh clone**:
  - `backend/.env` and `frontend/.env` must be created (see examples above).
  - Run Prisma migration and generate.
- Do not commit secrets (`JWT_SECRET`, `DATABASE_URL`).
