Blood Bank Management System – Modular

A modular, production-ready React app for managing donors, inventory, and blood requests with full CRUD support.

Features

CRUD Operations: Add, view, edit, delete donors, requests, and inventory.

Modular Components: Separate files for forms, cards, and pages.

Dashboard: Real-time stats, inventory alerts, recent requests.

Professional UI: Responsive design, animations, color-coded alerts.

Search & Filter: Easily find donors, requests, or blood types.

Confirmation Dialogs: Prevent accidental deletions.

Project Structure
bloodbank-modular/
├── src/
│   ├── components/  # Forms, cards, modals, header, navigation
│   ├── pages/       # Dashboard, Donors, Inventory, Requests
│   ├── styles/      # main.css
│   ├── App.js       # Main state management
│   └── index.js
├── public/
└── package.json

Quick Start
cd bloodbank-modular
npm install
npm start
# Opens at http://localhost:3000

Usage
Dashboard

View stats, monitor inventory, track critical stock, and recent requests.

Donors

Add/Edit/Delete donors

Search & filter by name or blood type

Inventory

View blood stock with visual indicators

Update units and monitor alerts

Status: 🟢 Good, 🟡 Low, 🔴 Critical

Requests

Add/Edit/Delete requests

Approve (deduct inventory) or Reject

Data Structures

Donor

{id, name, email, phone, bloodType, age, address, lastDonation, status}


Inventory

{bloodType, units, lastUpdated}


Request

{id, patient, bloodType, units, urgency, hospital, date, status}

State Management

donors, inventory, requests in App.js

Actions: add, update, delete

Props flow to child components

Customization

Colors → src/styles/main.css

Header → Header.jsx

Add fields → update state & forms

Validation → edit forms

API Integration
import axios from 'axios';
const API = axios.create({ baseURL: 'http://your-api-url/api' });
API.get('/donors'); API.post('/donors', data); API.put(`/donors/${id}`, data); API.delete(`/donors/${id}`);