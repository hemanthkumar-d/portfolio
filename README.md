# 💻 MERN Stack Developer Portfolio

A clean, modern, and highly responsive full-stack developer portfolio website. Designed as a production-ready showcase, this project demonstrates professional-grade frontend development, backend API design, database integration, robust security practices, and deployment readiness.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

---

## 🔗 Live Demo & Deployments
* **Frontend Web App (Vercel):** [https://hemanth-portfolio.vercel.app](https://hemanth-portfolio.vercel.app)
* **Backend REST API (Render):** [https://portfolio-backend-render.onrender.com](https://portfolio-backend-render.onrender.com) *(Insert your actual Render URL here)*

---

## ✨ Features

### 🎨 Frontend & UX
* **Mobile-First Responsive Layout:** Fluid navigation and grid layouts designed for mobile, tablet, and desktop viewports (breakpoints at `480px`, `768px`, and `1024px`).
* **Interactive 6-Page Navigation:** Seamless, single-page application (SPA) routing across Home, About, Skills, Projects, Contact, and a custom 404 page.
* **Progressive Cold-Start Handling:** Custom loading states displaying active UX hints (e.g. *"Backend is waking up..."*) with a automatic 30-second timeout and manual retry button to manage free-tier hosting cold starts.
* **Aesthetic CSS Modules:** Premium, scoped styling using Vanilla CSS Modules to prevent global class collisions and maintain clean CSS practices.
* **Zero Bloat Animations:** Elegant scroll-reveal transitions, link micro-animations, and card hover effects achieved entirely via native CSS.

### ⚙️ Backend & API Design
* **Dynamic Projects API:** Automatically queries MongoDB with support for query filters (e.g., `?featured=true`) to dynamically populate the portfolio.
* **Robust Form Handling:** Secure contact form submission with data persistence in MongoDB.
* **Input Validation:** Server-side request parsing and validation via `express-validator` to guarantee sanitization of contact messages.
* **API Rate Limiting:** Built-in protection against spam on the `/api/contact` route, allowing a maximum of **5 form submissions per 15 minutes** per IP.
* **Global Error Middleware:** Centralized Express error handler to process exceptions safely without leaking internal stack traces.

---

## 🛠️ Tech Stack

| Layer | Technologies | Key Packages |
|---|---|---|
| **Frontend** | React 18, Vite | React Router 6, Axios, React Helmet Async, PropTypes |
| **Styling** | Vanilla CSS | CSS Modules, Flexbox, CSS Grid |
| **Backend** | Node.js, Express 4 | express-validator, cors, helmet, express-rate-limit |
| **Database** | MongoDB Atlas | Mongoose 8 (ODM) |
| **Deployment** | Vercel (Client), Render (API) | Git-integrated CI/CD |

---

## 📁 Repository Structure

```text
portfolio/
├── README.md                  # Comprehensive project documentation
├── .gitignore                 # Root level git ignore (node_modules, local .env)
│
├── server/                    # Express Backend
│   ├── server.js              # Server execution and environment configuration
│   ├── app.js                 # Express middleware and routing setups
│   ├── config/
│   │   └── db.js              # MongoDB/Mongoose connection setup
│   ├── controllers/
│   │   ├── projectController.js # Projects API controller
│   │   └── contactController.js # Contact form API controller
│   ├── middleware/
│   │   ├── asyncHandler.js    # Express async/await controller wrapper
│   │   ├── errorHandler.js    # Global error response handler
│   │   └── notFound.js        # Catch-all unknown API route middleware
│   ├── models/
│   │   ├── Project.js         # Mongoose Schema for Portfolio Projects
│   │   └── Contact.js         # Mongoose Schema for Form Submissions
│   ├── routes/
│   │   ├── projectRoutes.js   # Project endpoint routers
│   │   └── contactRoutes.js   # Contact form endpoint routers
│   └── utils/
│       └── seed.js            # Automated seed script for sample database records
│
└── client/                    # Vite React Frontend
    ├── index.html             # Application entry point markup
    ├── vercel.json            # Vercel configuration for SPA route rewrites
    ├── public/
    │   ├── favicon.svg        # Portfolio site icon
    │   └── resume.pdf         # CV/Resume file for download
    └── src/
        ├── main.jsx           # React app mount file
        ├── App.jsx            # Main app container and React Router tree
        ├── api/
        │   ├── axios.js       # Configured Axios client with base endpoint settings
        │   ├── projects.js    # API service calls for Projects
        │   └── contact.js     # API service calls for Contact Form
        ├── hooks/
        │   └── useFetch.js    # Generic fetch hook managing loading/error states
        ├── pages/             # Layout components for page views
        │   ├── Home.jsx       # Landing section
        │   ├── About.jsx      # Developer background, education, and resume download
        │   ├── Skills.jsx     # Frontend, backend, database skills matrix
        │   ├── Projects.jsx   # Project gallery
        │   ├── Contact.jsx    # Validation-locked contact form
        │   └── NotFound.jsx   # Interactive 404 handler
        └── styles/
            └── global.css     # Global CSS design tokens, resets, variables
```

---

## 🚀 Installation & Local Development

### Prerequisites
* **Node.js** (v20 or higher)
* **npm** (v9 or higher)
* **MongoDB** (Atlas Account or Local Instance)

---

### Step 1: Clone the Repo
```bash
git clone https://github.com/hemanthkumar-d/portfolio.git
cd portfolio
```

---

### Step 2: Environment Variables Setup
1. **Backend Env Setup**: Copy `server/.env.example` to `server/.env` and update the variables:
   ```bash
   cp server/.env.example server/.env
   ```
   Variables inside `server/.env`:
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=5000
   CLIENT_ORIGIN=http://localhost:5173
   ```
2. **Frontend Env Setup**: Copy `client/.env.example` to `client/.env` and update the base API URL:
   ```bash
   cp client/.env.example client/.env
   ```
   Variables inside `client/.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

---

### Step 3: Run the Application

You can use the root convenience commands or run the directories individually.

#### Option A: Root-Level Convenience Commands (Recommended)
1. Install all dependencies for both client and server:
   ```bash
   npm run install:all
   ```
2. Seed the database with mock portfolio data:
   ```bash
   npm run seed
   ```
3. Start both the client and server concurrently:
   ```bash
   npm run dev
   ```
   * The client will run at **`http://localhost:5173`**.
   * The backend API will run at **`http://localhost:5000`**.

#### Option B: Manual Setup (Individual Folders)
1. **Backend**:
   ```bash
   cd server
   npm install
   npm run seed
   npm run dev
   ```
2. **Frontend**:
   ```bash
   cd client
   npm install
   npm run dev
   ```

---

## 📡 REST API Reference

All requests and responses communicate via JSON. Output envelopes maintain a consistent structure:
* **Success Envelope:** `{ "success": true, "data": <Array|Object> }`
* **Error Envelope:** `{ "success": false, "message": <String>, "errors": <Array> }`

### Endpoints

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| **`GET`** | `/api/health` | Service status check / health monitor | `200 OK` |
| **`GET`** | `/api/projects` | Fetch all project records (use `?featured=true` for highlighted list) | `200 OK` |
| **`GET`** | `/api/projects/:id` | Fetch a single project by database ID | `200 OK` / `404 Not Found` |
| **`POST`** | `/api/projects` | Insert a new project entry into the database | `201 Created` / `400 Bad Request` |
| **`POST`** | `/api/contact` | Submit user message to database (validated & rate-limited) | `201 Created` / `400 Bad Request` / `429 Too Many Requests` |

---

## 🌐 Production Deployment Guide

### 1. MongoDB Atlas Setup
1. Deploy a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Go to **Network Access** and add IP `0.0.0.0/0` (required to resolve Render's dynamic free-tier IP addresses).
3. Under **Database Access**, create a user with database read/write access.
4. Click **Connect** -> **Drivers** -> Copy the connection URI string. Update the placeholders (`<username>`, `<password>`) with your credentials.

### 2. Backend Hosting (Render)
1. Go to [Render](https://render.com) and set up a new **Web Service**.
2. Select and connect this repository.
3. Configure the settings:
   * **Root Directory:** `server`
   * **Build Command:** `npm install`
   * **Start Command:** `npm start`
4. Add the **Environment Variables**:
   * `MONGODB_URI` = *Your MongoDB Atlas connection URI*
   * `PORT` = `10000` *(Render default port)*
   * `CLIENT_ORIGIN` = *Your production Vercel URL (e.g. `https://hemanth-portfolio.vercel.app`)*
5. Under Advanced settings, set the **Health Check Path** to `/api/health`.

### 3. Frontend Hosting (Vercel)
1. Go to [Vercel](https://vercel.com) and create a new project.
2. Select and import this repository.
3. Configure the settings:
   * **Root Directory:** `client`
   * **Framework Preset:** `Vite`
4. Add the **Environment Variables**:
   * `VITE_API_BASE_URL` = *Your production Render API URL (e.g. `https://portfolio-backend-render.onrender.com`)*
5. Click **Deploy**. Vercel will automatically configure rewrite rules using the [client/vercel.json](file:///c:/Users/Noorul_Ahamed/Downloads/Hemanth/client/vercel.json) file to route SPA links correctly on browser refreshes.

---

## 👩‍💻 About the Developer
* **Name:** Hemanth Kumar
* **Education:** Bachelor of Engineering (Electrical, Electronic & Communications), Prince Shri Venkateshwara Padmavathy Engineering College (2025–2029)
* **Location:** Chennai, Tamil Nadu, India
* **Skills:** HTML5, CSS3, JavaScript (ES6+), React.js, Node.js, Express.js, MongoDB, RESTful APIs, Git, Vercel, Render

---

## 📄 License
This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).
