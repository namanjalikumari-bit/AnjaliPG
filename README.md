# Anjali PG — Management System & Website

A complete **MERN** stack PG (paying-guest) management system: a premium public website
plus an **admin panel** and a **student portal**. White + purple SaaS theme, fully responsive,
Framer Motion animations, JWT auth, MongoDB, Cloudinary, Nodemailer, and **optional** AI
complaint categorization.

```
anjali-pg/
├── server/        Express + MongoDB API
└── client/        React (Vite) + Tailwind frontend
```

---

## ✨ Features

**Public website** — Home, About, Rooms, Facilities, Meals, Gallery, Reviews, Contact.
Booking requests and contact messages are saved to MongoDB and emailed to the admin.

**Admin panel** (`/admin`) — Dashboard with live stat cards + revenue/occupancy charts,
Students, Rooms & Beds, Fees (collect payments + email reminders), Complaints, Booking
Requests (approve → auto-creates a student account + emails a temp password), Contact
Inquiries, Reviews moderation, Gallery, Amenities, Mess Menu, Notices.

**Student portal** (`/student`) — Dashboard, My Profile, My Room, My Fees, My Complaints
(raise & track), Notices, Reviews, Mess Menu. Students only ever see their own data.

---

## 🧰 Tech Stack

- **Frontend:** React 18 (Vite), Tailwind CSS, Framer Motion, React Router v6, Axios, React Icons, Recharts
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas + Mongoose
- **Auth:** JWT + bcrypt
- **Storage:** Cloudinary (optional)
- **Email:** Nodemailer (optional)
- **AI:** Anthropic API for complaint categorization (optional — system works fully without it)

---

## 🚀 Local Setup

> Prerequisites: Node.js 18+, a MongoDB connection string (MongoDB Atlas free tier is fine).

### 1. Backend

```bash
cd server
npm install
cp .env.example .env       # then fill in the values (see below)
npm run seed               # seeds demo data (rooms, students, fees, reviews…)
npm run dev                # starts API on http://localhost:5000
```

Minimum required values in `server/.env`:

```env
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/anjalipg
JWT_SECRET=any_long_random_string
```

Everything else (Cloudinary, SMTP, AI) is **optional** — leave blank and those features
gracefully no-op. With `AI_API_KEY` blank, complaints just default to a sensible category.

### 2. Frontend

```bash
cd client
npm install
npm run dev                # starts the app on http://localhost:3002
```

The Vite dev server proxies `/api` → `http://localhost:5000`, so no frontend env is needed
locally. Open **http://localhost:3002**.

### 3. Add the images

Drop your 20 PG images into `client/public/images/` using the exact filenames listed in
`client/public/images/README.md`. Until then, the UI shows graceful placeholders (never breaks).

---

## 🔑 Demo Logins (after `npm run seed`)

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@anjalipg.com` | `admin123` |
| Student | `salu@example.com` | `student123` |

(Other seeded students use the same password, `student123`.)

---

## 📡 API Overview

Base URL: `/api`

| Resource | Notable routes |
|----------|----------------|
| `auth` | `POST /auth/login`, `GET /auth/me` |
| `dashboard` | `GET /dashboard/stats` (admin) |
| `students` | CRUD (admin) · `GET /students/me/profile` |
| `rooms` / `beds` | public room list · admin management |
| `fees` | admin list · `GET /fees/me` · `POST /fees/:id/remind` |
| `complaints` | `POST /complaints` (AI categorize) · `GET /complaints/me` · admin status update |
| `bookings` | public `POST` · admin `PUT /:id/approve` `/reject` |
| `contact` | public `POST` · admin list |
| `reviews` | public approved · admin `/all` + moderate |
| `gallery` / `amenities` / `mess` / `notices` | content management |

All non-public routes require a `Bearer <jwt>` header (handled automatically by the client).

---

## ☁️ Deployment

### Database — MongoDB Atlas
1. Create a free cluster, a database user, and allow network access (`0.0.0.0/0` for simplicity).
2. Copy the connection string into `MONGO_URI`.

### Backend — Render
1. New **Web Service** → connect the repo → root directory `server`.
2. Build command `npm install`, start command `npm start`.
3. Add the env vars from `server/.env.example` (set `CLIENT_URL` to your Vercel URL).
4. Deploy, then run the seed once locally against the Atlas URI (or temporarily add a seed step).

### Frontend — Vercel
1. New **Project** → root directory `client`.
2. Framework preset **Vite**. Build `npm run build`, output `dist`.
3. Add env var `VITE_API_URL=https://<your-render-app>.onrender.com/api`.
4. Deploy.

---

## 🔐 Environment Variables (server)

| Var | Required | Purpose |
|-----|----------|---------|
| `PORT` | no (default 5000) | API port |
| `MONGO_URI` | **yes** | MongoDB connection |
| `JWT_SECRET` | **yes** | Token signing |
| `JWT_EXPIRE` | no | Token lifetime (default `30d`) |
| `CLIENT_URL` | prod | CORS allow-list for the frontend |
| `CLOUDINARY_*` | no | Image uploads |
| `SMTP_*`, `ADMIN_EMAIL` | no | Email notifications |
| `AI_API_KEY`, `AI_MODEL` | no | Complaint AI categorization |
| `ADMIN_LOGIN_EMAIL`, `ADMIN_LOGIN_PASSWORD` | no | Seeded admin credentials |

---

## 📝 Notes
- The UI follows the provided purple/white reference design.
- Optional integrations (Cloudinary, SMTP, AI) degrade gracefully when unconfigured — the
  core system always works.
- Re-run `npm run seed` anytime to reset demo data, or `npm run seed:destroy` to clear it.
