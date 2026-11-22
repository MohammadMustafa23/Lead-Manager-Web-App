<div align="center">
# Lead Manager
 
**A clean, full-stack mini CRM to capture, track and manage sales leads.**
 
[**Live Demo**](https://lead-manager-web-app.vercel.app/) · [Source Code](https://github.com/MohammadMustafa23/Lead-Manager-Web-App)
 
![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)
 
</div>
> Built as a screening assignment for **Meru Technosoft Pvt. Ltd.** (Full Stack Developer).
 
---
 
## Table of Contents
 
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [Validation & Error Handling](#validation--error-handling)
- [Notes](#notes)
---
 
## Overview
 
Lead Manager lets a sales user add leads, see them in one table, move them through the pipeline by updating their status, and search or filter to find them quickly. It is a single full-stack app: a React frontend talking to a REST API backed by PostgreSQL.
 
**Live:** https://lead-manager-web-app.vercel.app/
 
---
 
## Features
 
| | Feature | Details |
|---|---|---|
| ✅ | **Add lead** | Name, email, phone, company, source (dropdown), status |
| ✅ | **List leads** | Table with clear, colour-coded status badges |
| ✅ | **Edit lead** | Update any field, including status |
| ✅ | **Delete lead** | Confirmation step before removal |
| ✅ | **Search & filter** | By name or by status |
| ✅ | **Validation** | Frontend and backend (required fields, valid email, allowed values) |
 
**Lead statuses:** `New` → `Contacted` → `Qualified` / `Lost`
 
**Lead sources:** `Website` · `Referral` · `LinkedIn` · `Cold Call` · `Event` · `Other`
 
<!-- EDIT: add any bonus features you built (auth, dashboard counts, pagination/sorting, API tests) as extra rows above -->
 
---
 
## Tech Stack
 
| Layer | Technology |
|---|---|
| Frontend | React `Vite` · `Tailwind Css` |
| Backend | Node.js · Express |
| Database | PostgreSQL |
| Deployment | Vercel (frontend) · Render(backend) + (Postgres) database  |

---
 
## Project Structure
 
```
Lead-Manager-Web-App/
├── client/
│   └── lead-managment/      # React frontend
└── server/                  # Node.js REST API
```
 
---
 
## Getting Started
 
### Prerequisites
 
- Node.js 18 or newer
- PostgreSQL 13 or newer
### 1. Clone
 
```bash
git clone https://github.com/MohammadMustafa23/Lead-Manager-Web-App.git
cd Lead-Manager-Web-App
```
 
### 2. Create the database
 
```bash
createdb lead_manager                 # EDIT: your database name
psql -d lead_manager -f schema.sql    # EDIT: or paste the SQL from the Database Schema section
```
 
### 3. Backend
 
```bash
cd server
npm install
cp .env.example .env      # fill in your values
npm run dev               # EDIT: or npm start
```
 
Runs at `http://localhost:5000` (EDIT: your port).
 
### 4. Frontend
 
```bash
cd client/lead-managment
npm install
cp .env.example .env      # point it at the API
npm run dev               # EDIT: or npm start
```
 
Runs at `http://localhost:5173` (EDIT: your port).
 
### Environment Variables
 
`server/.env`
 
```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/lead_manager
ORIGIN_ALLOW=http://localhost:5173
```
 
`client/lead-managment/.env`
 
```env
VITE_API_URL=http://localhost:3000/api
```
 
> Secrets are never committed. Copy `.env.example` and fill in your own values.
 
---
 
## Database Schema
 
PostgreSQL, single `leads` table. Constraints live in the database itself, so invalid data is rejected even if the API is bypassed.
 
```sql
CREATE TABLE IF NOT EXISTS leads (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  phone       VARCHAR(20)  NOT NULL,
  company     VARCHAR(150) NOT NULL,
  source      VARCHAR(50)  NOT NULL CHECK (source IN ('Website','Referral','LinkedIn','Cold Call','Event','Other')),
  status      VARCHAR(20)  NOT NULL DEFAULT 'New' CHECK (status IN ('New','Contacted','Qualified','Lost')),
  created_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);
 
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_name   ON leads(name);
```
 
| Column | Type | Rules |
|---|---|---|
| `id` | `SERIAL` | Primary key |
| `name` | `VARCHAR(100)` | Required |
| `email` | `VARCHAR(255)` | Required, format validated in the API |
| `phone` | `VARCHAR(20)` | Required |
| `company` | `VARCHAR(150)` | Required |
| `source` | `VARCHAR(50)` | Required, one of `Website`, `Referral`, `LinkedIn`, `Cold Call`, `Event`, `Other` |
| `status` | `VARCHAR(20)` | Required, one of `New`, `Contacted`, `Qualified`, `Lost`. Defaults to `New` |
| `created_at` | `TIMESTAMP` | Defaults to `NOW()` |
| `updated_at` | `TIMESTAMP` | Defaults to `NOW()`, refreshed on every update |
 
**Indexes:** `idx_leads_status` speeds up status filtering and `idx_leads_name` speeds up name search, the two ways the leads table is queried.
 
---
 
## API Reference
 
Base URL: `/api` &nbsp;`EDIT: confirm your routes`
 
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/leads` | List leads. Supports `?search=` (name) and `?status=` |
| `GET` | `/leads/:id` | Get one lead |
| `POST` | `/leads` | Create a lead |
| `PUT` | `/leads/:id` | Update a lead (including status) |
| `DELETE` | `/leads/:id` | Delete a lead |
 
### Request body (`POST` / `PUT`)
 
| Field | Type | Required | Rules |
|---|---|---|---|
| `name` | string | Yes | Max 100 characters |
| `email` | string | Yes | Valid email, max 255 characters |
| `phone` | string | Yes | Max 20 characters |
| `company` | string | Yes | Max 150 characters |
| `source` | string | Yes | `Website`, `Referral`, `LinkedIn`, `Cold Call`, `Event` or `Other` |
| `status` | string | No | `New`, `Contacted`, `Qualified` or `Lost`. Defaults to `New` |
 
<details>
<summary><b>Example request</b></summary>
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "company": "Acme Pvt. Ltd.",
  "source": "Website",
  "status": "New"
}
```
 
</details>
<details>
<summary><b>Example response</b></summary>
```json
{
  "id": 1,
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "company": "Acme Pvt. Ltd.",
  "source": "Website",
  "status": "New",
  "created_at": "2026-11-22T10:30:00.000Z",
  "updated_at": "2026-11-22T10:30:00.000Z"
}
```
 
</details>
<details>
<summary><b>Example error response</b></summary>
```json
{
  "success": false,
  "message": "A valid email is required"
}
```
 
</details>
---
 
## Validation & Error Handling
 
- **Frontend:** inline field errors, and a friendly message if the API is unreachable.
- **Backend:** every request is validated again server-side, so bad data cannot get in by calling the API directly.
- **Database:** `NOT NULL`, length limits and `CHECK` constraints are a final safety net.
- **Status codes:** `400` invalid input, `404` not found, `500` server error, always with a JSON message.
---

## Notes
 
**Proud of / found tricky:** The Tricky Part is Api's test and Fixing But The work is Assowme.
 
---
 
<div align="center">
**Mohammad Mustafa** · [GitHub](https://github.com/MohammadMustafa23)
</div>
