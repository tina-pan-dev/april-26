# Katkin Technical Test - Personalised Messaging

## Overview

This project implements a simple backend API and frontend UI for generating personalised customer delivery messages.

- Backend: NestJS API
- Frontend: React (Vite)

---

## Backend

Endpoint:
GET /comms/your-next-delivery/:userId

Returns:

- title
- message
- totalPrice
- freeGift

Key logic:

- Only active cats are included
- Cat names are formatted grammatically:
  - A
  - A and B
  - A, B and C
- Pricing is based on pouch size:
  A: 55.50, B: 59.50, C: 62.75, D: 66.00, E: 69.00, F: 71.25
- freeGift is true when totalPrice > 120

Structure:

- Controller handles routing
- Service contains business logic
- Data is read from local data.json

---

## Frontend

Route:
/welcome/:userId

Behaviour:

- Fetches data from backend
- Displays title, message, total price, and free gift indicator
- Includes a simple responsive layout inspired by the provided design

---

## Running the Project

Backend:
cd backend
yarn install
yarn start

Runs on:
http://localhost:8080

Frontend:
cd frontend
npm install
npm run dev

Runs on:
http://localhost:3000

Example:
http://localhost:3000/welcome/ff535484-6880-4653-b06e-89983ecf4ed5

---

## Assumptions

- Users with no active cats return a valid response (not an error)
- Currency is always GBP
- No database/auth added per instructions

---

## Tradeoffs

- Limited tests due to time constraints
- UI prioritises clarity over pixel perfection

---

## Improvements

- Add integration tests

---

## Feedback

The task is well-scoped for a timebox and covers practical backend and frontend integration.
One improvement could be adding more interactivity to the frontend portion to better showcase state and prop handling.
