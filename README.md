# The Library App

## Task
[Project Task Document](https://drive.google.com/file/d/1RBRcuH-_oAvtjem5Xs0c4NXZ8I38aYyH/view)

## How to run the app
This project uses **Vite**. Follow these steps to run the application:

1. **Install dependencies:**
   ```bash
   npm install
2. **Run in development mode:**
   ```bash
   npm run dev
3. **Build for production:**
   ```bash
    npm run build
    
*The optimized files will be generated in the dist folder.*

## Project Structure

The project is organized to separate business logic, UI components, and assets.

* assets/

    * SVG icons used throughout the interface

* src/

    * components/ — Reusable UI components: BookCard.js, Search.js, ThemeToggle.js, UI.js

    * services/ — Data logic: api.js (API), storage.js (localStorage), theme.js

    * state/ — Application state management (theme persistence)

    * utils/ — Utility functions: debounce.js (search optimization)

    * main.js — Entry point of the application

    * style.css — Global styles

    * index.html — Root HTML file used by Vite