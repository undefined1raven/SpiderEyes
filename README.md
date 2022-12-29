# SpiderEyes

Dream tracking app[^1] using nuxt for the frontend and Vercel serverless functions for the backend. Mongo DB is used for persistent user data(account, the dream objects) storage while the Firebase Realtime Database is used for session management. 

[^1]: Commit history for the development of this project is not available in order to prevent API keys from being public. This repo reflects the code in the private repos used to run the app.

## How to run

There is already a live deployment available at https://spider-eyes-nuxt.vercel.app/.
Running the app locally requires accounts for the following (free) services:
- Vercel
- Firebase
- Mongo DB

## Repo structure:
api/<br />
├─ auth.js        (Handles auth requests and session)<br />
├─ dbop.js        (Handles all Mongo DB CRUD Ops)<br />
frontend/<br />
├─ .vercel/       (Required for Vercel integration)<br />
├─ components/    (App components)<br />
├─ composables/   (Common functions used by the app)<br />
├─ pages/         (Autorouting)<br />
├─ static/        (Static assets)<br />

