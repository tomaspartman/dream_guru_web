# Dream Guru Web

This project is a simple web app that interprets dreams using an OpenAI-powered Netlify function. The site presents a single page where users can submit a dream, which is then sent to a serverless function in `netlify/functions/interpret.js`. The function calls the OpenAI API and returns a poetic interpretation of the dream.

## Analytics

The page includes a Google Analytics snippet in `index.html`. Replace the
placeholder measurement ID (`G-XXXXXXXXXX`) with your own to enable tracking.
