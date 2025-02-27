# Steel Sync Pro

A modern web application for steel manufacturing management, built with React, TypeScript, Material UI, and Supabase.

## Features

- User authentication (login, register, logout)
- Dashboard with manufacturing metrics
- Project management
- Production scheduling
- Inventory tracking
- Modern, responsive UI

## Tech Stack

- **Frontend**: React, TypeScript, Material UI
- **Backend**: Supabase (PostgreSQL, Auth)
- **Styling**: Material UI, Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/steel-sync-pro.git
   cd steel-sync-pro
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   VITE_APP_NAME=Steel Sync Pro
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Project Structure

```
steel-sync-pro/
├── public/
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # React context providers
│   ├── lib/              # Utility functions and libraries
│   ├── pages/            # Application pages
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── supabase/
│   └── migrations/       # Database migrations
└── package.json
```

## Database Schema

The application uses the following database tables:

- `profiles`: User profile information
- `projects`: Manufacturing projects

## Deployment

This application can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

## License

[MIT](LICENSE)