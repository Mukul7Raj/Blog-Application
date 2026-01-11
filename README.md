# Next.js Portfolio & Blog App

A modern, dual-purpose application featuring a personal portfolio and a protected blog dashboard, built with Next.js 16 (App Router), Redux Toolkit, and Redux Saga.

## Features

### 🎨 Portfolio (Public)
-   **Premium Design**: Dark mode aesthetic with Tailwind CSS animations.
-   **Sections**: Hero, About, Projects, Contact.
-   **Responsive**: Fully optimized for mobile and desktop.

### 📝 Blog Dashboard (Protected)
-   **Authentication**: Login system using [DummyJSON Auth](https://dummyjson.com/docs/auth).
    -   *Credentials*: `emilys` / `emilyspass`
-   **Route Protection**: Middleware redirects unauthenticated users to `/login`.
-   **Redux State Management**:
    -   `authSlice`: Manages user session.
    -   `postsSlice`: Fetches and stores blog posts.
    -   `commentsSlice`: Fetches comments for specific posts.
-   **Side Effects**: Redux Saga handles all API calls asynchronously.
-   **Offline Cache**: Blog posts are cached in LocalStorage for offline viewing.

## Tech Stack
-   **Framework**: Next.js 16 (App Router)
-   **State**: Redux Toolkit + Redux Saga
-   **Styling**: Tailwind CSS v4
-   **Language**: TypeScript

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **View Application**
    -   **Portfolio**: [http://localhost:3000](http://localhost:3000)
    -   **Login**: [http://localhost:3000/login](http://localhost:3000/login)
    -   **Dashboard**: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

## Folder Structure

```
src/
├── app/
│   ├── dashboard/       # Protected Blog routes
│   ├── login/           # Authentication page
│   └── page.tsx         # Portfolio Landing Page
├── components/          # Reusable UI (Hero, Comments, etc.)
├── lib/
│   └── redux/           # State Management
│       ├── slices/      # Redux Toolkit Slices
│       ├── sagas/       # Redux Sagas
│       ├── store.ts     # Store Configuration
│       └── rootReducer.ts
└── middleware.ts        # Route protection logic
```
