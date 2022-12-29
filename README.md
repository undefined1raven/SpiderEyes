# SpiderEyes

Dream tracking app using nuxt for the frontend and Vercel serverless functions for the backend. Mongo DB is used for persistent user data(account, the dream objects) storage while the Firebase Realtime Database is used for session management. 

## How to run

There is already a live deployment available at https://spider-eyes-nuxt.vercel.app/.
Running the app locally requires accounts for the following (free) services:
-Vercel
-Firebase
-Mongo DB

## Repo structure:
api/
├─ auth.js        (Handles auth requests and session)
├─ dbop.js        (Handles all Mongo DB CRUD Ops)
frontend/
├─ .vercel/       (Required for Vercel integration)
├─ components/    (App components)
├─ composables/   (Common functions used by the app)
├─ pages/         (Autorouting)
├─ static/        (Static assets)

