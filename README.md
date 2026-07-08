# Personal Portfolio Website

A clean, modern, responsive full-stack portfolio website built with the MERN stack. Designed as a production-inspired submission for internship applications, this project demonstrates frontend development, backend API design, database integration, responsive UI, and deployment readiness.

**Owner:** Hemanth Kumar
**Role:** Full Stack Developer
**Tagline:** Full Stack Developer | MERN Stack | Building Clean, Scalable Web Applications

---

## Features

- **Responsive Design** — Mobile-first layout with breakpoints at 480px, 768px, and 1024px
- **6 Pages** — Home, About, Skills, Projects, Contact, 404
- **Dynamic Projects** — Loaded from MongoDB via REST API with loading, error, and empty states
- **Working Contact Form** — Client-side and server-side validation, rate-limited (5 req / 15 min per IP)
- **Progressive Cold-Start UX** — Spinner → "Backend is waking up..." → Retry button after 30s timeout
- **SEO Ready** — Per-page meta tags and Open Graph tags via `react-helmet-async`
- **Accessible** — Semantic HTML5, ARIA labels, visible focus states, keyboard navigation, WCAG AA color contrast
- **Subtle Animations** — Fade-in sections, hover effects, smooth scrolling — CSS-only, no animation libraries
- **Security** — Helmet headers, CORS restricted to deployed origin, rate limiting
- **Deployment Ready** — Vercel (frontend), Render (backend), MongoDB Atlas (database) — no code changes required

---

## Folder Structure

```
portfolio/
├── README.md
├── .gitignore
│
├── server/
│   ├── package.json
│   ├── .env.example
│   ├── server.js                  # Entry point
│   ├── app.js                     # Express app setup
│   ├── config/
│   │   └── db.js                  # Mongoose connection
│   ├── models/
│   │   ├── Project.js
│   │   └── Contact.js
│   ├── controllers/
│   │   ├── projectController.js
│   │   └── contactController.js
│   ├── routes/
│   │   ├── projectRoutes.js
│   │   └── contactRoutes.js
│   ├── middleware/
│   │   ├── asyncHandler.js        # Async wrapper for controllers
│   │   ├── errorHandler.js        # Centralized error handler
│   │   └── notFound.js            # 404 for unknown routes
│   └── utils/
│       └── seed.js                # Seeds database with sample projects
│
└── client/
    ├── package.json
    ├── .env.example
    ├── index.html
    ├── vercel.json                # SPA rewrites for client-side routing
    ├── public/
    │   ├── favicon.svg
    │   └── resume.pdf             # Replace with your resume
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── api/
        │   ├── axios.js           # Axios instance with base URL
        │   ├── projects.js        # Project API functions
        │   └── contact.js         # Contact API functions
        ├── hooks/
        │   └── useFetch.js        # Generic fetch hook (loading, error, data, cold-start)
        ├── components/
        │   ├── Navbar.jsx + Navbar.module.css
        │   ├── Footer.jsx + Footer.module.css
        │   ├── ProjectCard.jsx + ProjectCard.module.css
        │   ├── ContactForm.jsx + ContactForm.module.css
        │   ├── LoadingSpinner.jsx + LoadingSpinner.module.css
        │   └── SectionHeading.jsx + SectionHeading.module.css
        ├── pages/
        │   ├── Home.jsx + Home.module.css
        │   ├── About.jsx + About.module.css
        │   ├── Skills.jsx + Skills.module.css
        │   ├── Projects.jsx + Projects.module.css
        │   ├── Contact.jsx + Contact.module.css
        │   └── NotFound.jsx + NotFound.module.css
        └── styles/
            └── global.css         # CSS reset, variables, utilities
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, React Router 6, Axios, react-helmet-async, PropTypes |
| Styling | Plain CSS (CSS Modules) |
| Backend | Node.js, Express 4 |
| Validation | express-validator |
| Security | helmet, cors, express-rate-limit |
| Database | MongoDB Atlas, Mongoose 8 |
| Deployment | Vercel (frontend), Render (backend) |

---

## Installation

### Prerequisites

- Node.js >= 20
- npm >= 9
- A MongoDB Atlas account (free tier)

### 1. Clone the repository

```bash
git clone <repository-url>
cd portfolio
```

### 2. Backend setup

```bash
cd server
cp .env.example .env
```

Edit `server/.env` with your MongoDB URI and desired port:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

Install dependencies and seed the database:

```bash
npm install
npm run seed
```

Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

### 3. Frontend setup

Open a new terminal:

```bash
cd client
cp .env.example .env
```

Edit `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Install dependencies and start:

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Environment Variables

### Server (`server/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | (required) |
| `PORT` | Backend server port | `5000` |
| `CLIENT_ORIGIN` | Allowed CORS origin (your frontend URL) | `http://localhost:5173` |

### Client (`client/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5000` |

---

## API Documentation

All responses follow a consistent JSON envelope:

```json
// Success
{ "success": true, "data": {} }

// Error
{ "success": false, "message": "", "errors": [] }
```

| Method | Route | Purpose | Status Codes |
|--------|-------|---------|-------------|
| `GET` | `/api/health` | Liveness check | `200` |
| `GET` | `/api/projects` | Get all projects (supports `?featured=true`) | `200` |
| `GET` | `/api/projects/:id` | Get a single project | `200`, `404` |
| `POST` | `/api/projects` | Create a project | `201`, `400` |
| `PUT` | `/api/projects/:id` | Update a project | `200`, `404` |
| `DELETE` | `/api/projects/:id` | Delete a project | `200`, `404` |
| `POST` | `/api/contact` | Submit contact form (rate-limited) | `201`, `400`, `429` |

### Contact form validation rules

| Field | Rules |
|-------|-------|
| `name` | Required, max 100 characters |
| `email` | Required, valid email format |
| `subject` | Required, max 150 characters |
| `message` | Required, max 2000 characters |

### Rate limiting

The contact endpoint allows a maximum of **5 requests per 15 minutes** per IP address.

---

## Deployment Guide

### 1. MongoDB Atlas

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Under **Network Access**, add IP `0.0.0.0/0` (allows connections from any IP — required for Render's dynamic free-tier IPs)
3. Under **Database Access**, create a database user with a strong password
4. Click **Connect** → **Connect your application** → copy the connection string
5. Replace `<username>`, `<password>`, and `portfolio` (database name) in the string

> **Security note:** Allowing `0.0.0.0/0` is an accepted tradeoff for Render's free tier. This is paired with a strong, unique database user password to maintain security.

### 2. Backend — Render

1. Create a free account at [Render](https://render.com)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variables:
   - `MONGODB_URI` — your Atlas connection string
   - `PORT` — `10000` (Render's default)
   - `CLIENT_ORIGIN` — your Vercel frontend URL (e.g., `https://your-app.vercel.app`)
6. Under **Advanced**, set **Health Check Path** to `/api/health`
7. Deploy

After deployment, copy your Render URL (e.g., `https://your-app.onrender.com`).

### 3. Frontend — Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and click **Add New** → **Project**
3. Import your GitHub repository
4. Configure:
   - **Root Directory:** `client`
   - **Framework Preset:** Vite
5. Add environment variable:
   - `VITE_API_BASE_URL` — your Render backend URL (e.g., `https://your-app.onrender.com`)
6. Deploy

The `vercel.json` file in the `client` directory already includes the SPA rewrite rule so that all routes work on direct load/refresh.

### Post-deployment checklist

- [ ] Visit every page and confirm they load
- [ ] Test the contact form (submit a message)
- [ ] Verify the 404 page renders for unknown routes
- [ ] Test on mobile viewport (Chrome DevTools device toolbar)
- [ ] Confirm Open Graph preview works (paste your URL into Twitter/LinkedIn debugger)

---

## Screenshots

> Add screenshots here after deployment.

### Home Page

![Home Page](./screenshots/home.png)

### Projects Page

![Projects Page](./screenshots/projects.png)

### Contact Form

![Contact Form](./screenshots/contact.png)

### Mobile View

![Mobile View](./screenshots/mobile.png)

---

## Architecture & Reusability

This project is designed as a **reusable architectural foundation** for future projects:

| Component | Transfers To |
|-----------|-------------|
| `server/` structure (config, controllers, models, routes, middleware) | Task Manager, E-Commerce, Blog |
| API response envelope (`{ success, data }`) | All future projects |
| Axios instance + API service pattern | All future projects |
| `useFetch` hook | All future projects |
| Vercel + Render deployment config | All future projects |
| CSS Modules pattern | All future projects |

The write endpoints on `/api/projects` are intentionally left without authentication — this is an accepted tradeoff for a portfolio showcase. The code structure allows adding an auth middleware layer without refactoring the controllers.

---

## License

MIT
