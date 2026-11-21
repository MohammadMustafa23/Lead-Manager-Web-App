# Mini CRM – React + Tailwind Frontend

A two-page lead-management frontend built with React, Vite, Tailwind CSS, and React Router. It currently uses mock data stored in the browser's `localStorage`; no backend requests are made yet.

## Pages

- `/dashboard` – summary cards, lead status overview, and recent leads.
- `/leads` – lead table, search, status filter, create, edit, and delete with confirmation.

## Requirements

This source is intended to be copied into an existing Vite + React + Tailwind project.

Install the additional packages:

```bash
npm install react-router-dom lucide-react
```

## Add the frontend

1. Copy the supplied `src` folder into your Vite project (or merge its folders with your existing `src`).
2. Keep your existing Tailwind setup. The included `src/index.css` contains the Tailwind v3 directives. If your project uses Tailwind v4, keep your existing v4 CSS import instead and copy only the regular CSS rules from this file.
3. Make sure your Tailwind content/source scanning includes `./src/**/*.{js,ts,jsx,tsx}` (for Tailwind v3).
4. Start the app:

```bash
npm run dev
```

## Project structure

```text
src/
├── App.jsx
├── main.jsx
├── index.css
├── components/
│   ├── dashboard/
│   │   ├── RecentLeads.jsx
│   │   └── StatusOverview.jsx
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   └── Topbar.jsx
│   ├── leads/
│   │   ├── DeleteLeadDialog.jsx
│   │   ├── LeadFilters.jsx
│   │   ├── LeadFormModal.jsx
│   │   └── LeadsTable.jsx
│   └── ui/
│       ├── EmptyState.jsx
│       ├── PageHeading.jsx
│       ├── StatCard.jsx
│       └── StatusBadge.jsx
├── constants/
│   └── lead.js
├── context/
│   └── LeadContext.jsx
├── data/
│   └── mockLeads.js
├── hooks/
│   └── useLeads.js
├── layouts/
│   └── AppLayout.jsx
├── pages/
│   ├── DashboardPage.jsx
│   ├── LeadsPage.jsx
│   └── NotFoundPage.jsx
└── utils/
    ├── formatDate.js
    └── leadValidation.js
```

## Dummy data behaviour

- The initial leads are loaded from `src/data/mockLeads.js`.
- Add, edit, and delete actions update the shared `LeadContext` state.
- Changes are saved in `localStorage` under `mini-crm-leads-v1`, so refreshing the page does not reset the demo data.
- To restore the original sample data, remove the `mini-crm-leads-v1` entry from browser local storage and refresh.

## Current lead fields

`name`, `email`, `phone`, `company`, `source`, and `status`.

Allowed statuses are `new`, `contacted`, `qualified`, and `lost`. Sources are defined in `src/constants/lead.js`.

## Backend integration later

The UI reads and changes lead data through `src/context/LeadContext.jsx`. In the API integration stage, replace the local-storage operations in this provider with calls to the existing backend endpoints. The pages and presentational components should not need to know whether data comes from mock state or the API.
