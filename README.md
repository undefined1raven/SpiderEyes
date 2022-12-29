# SpiderEyes

[Go to the app](https://spider-eyes-nuxt.vercel.app/)

Dream tracking app using nuxt for the frontend and Vercel serverless functions for the backend. Mongo DB is used for persistent user data(account, the dream objects) storage while the Firebase Realtime Database is used for session management. 

## Current Features
- Saving new dreams that contain details such as:
  - Feelings and sensations and their intensities
  - A detailed description
  - Sleep duration
  - Quality indicators such as continuity, realism and others
  - The type timeline of the dream (active(lucid) vs natural)
  - References in the dream that might be recurring
 
## Future Features 
- Analytics showing patterns over time
- Adding visual feedback to the auth process so the user would know the backend is checking the credentials provided (this is required because it takes a while for vercel to spin up a serverless instance) 

## How to run

There is already a live deployment available at https://spider-eyes-nuxt.vercel.app/.
Running the app locally requires accounts for the following (free) services:
- Vercel
- Firebase
- Mongo DB

A local Node env is also required. 

## Running the frontend  
1. Follow the instructions [here](https://nuxtjs.org/docs/get-started/installation/) to install Nuxt.
2. Copy the contents of the folders in the "frontend" folder to the corresponding folders in the newly created Nuxt project in step 1.
3. Run ```npm i && npm run build && npm run dev``` to make sure npm pkgs are installed correctly, to build and to run the code.
4. Use the link in the console after step 3 is done to access the frontend

## Running the backend
1. Install the Vercel CLI as shown [here](https://vercel.com/docs/cli)
2. Run ```npm i && vercel dev``` to install npm pkgs and run the backend locally
3. Make sure the frontend components (Main.vue, login.vue, signup.vue) that call the API are pointing at the local backend 

## Deploying the app
1. Make a github repo with the frontend
2. Make a github repo with the backend
3. Make sure to replace the placeholders credentials with your actual credentials such as the Mongo DB connect link and Firebase keys 
4. Log into your Vercel account and create new apps for both the F/E and B/E repos. This requires selecting the right repo for each app

## Repo structure:
api/<br />
├─ auth.js        (Handles auth requests and session)<br />
├─ dbop.js        (Handles all Mongo DB CRUD Ops)<br />
frontend/<br />
├─ components/    (App components)<br />
├─ composables/   (Common functions used by the app)<br />
├─ pages/         (Autorouting)<br />
├─ static/        (Static assets)<br />


##### Commit history for the development of this project is not available in order to prevent API keys from being public. This repo reflects the code in the private repos used to run the app.

