# Steel Sync Pro

Version: 25.03.08.1

A modern web application for steel manufacturing management, built with React, TypeScript, and Material UI.

## Version History

### 25.03.08.1 (Current)
- Removed i18n/translations system
- Updated documentation and version numbers
- Code cleanup and optimization
- Performance improvements

### 25.03.07.3
- Added theme customization with 10 unique styles
- Implemented dark/light mode toggle
- Added timezone support
- Improved UI/UX with glassmorphism design
- Enhanced responsive layout
- Performance optimizations

### 25.03.07.2
- Enhanced user profile management
- Added favorites feature
- Improved authentication system with mock data
- Updated dashboard layout and navigation
- Bug fixes and performance improvements

### 25.03.07.1
- Initial release
- Core features implemented:
  - Dashboard with manufacturing metrics
  - Project management
  - Production scheduling
  - Inventory tracking
  - Modern, responsive UI
- Authentication system with demo mode
- Comprehensive documentation

## Features

### Core Features
- Dashboard with real-time manufacturing metrics
- Project management and scheduling
- Inventory tracking and alerts
- Production monitoring
- Modern, responsive UI

### UI/UX
- 10 unique theme styles
- Dark/light mode support
- Glassmorphism design
- Responsive layout for all devices
- Real-time timezone support

### Authentication
- Demo mode with pre-filled credentials
- Profile management
- Security settings
- Session management

## Tech Stack

Current implementation includes:

- **Frontend Framework**: React 18.3.1
- **UI Components**: Material UI 5.15.11
- **Type Safety**: TypeScript
- **State Management**: React Context API with Mock Data
- **Routing**: React Router 6.22.1
- **Development**: 
  - Vite 5.4.2
  - ESLint
  - TypeScript ESLint

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

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Demo Access

You can access the demo using these credentials:
- Email: demo@steelsyncpro.com
- Password: Demo123!

## Project Structure

```
steel-sync-pro/
├── public/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── auth/       # Authentication components
│   │   ├── profile/    # Profile management components
│   │   └── theme/      # Theme customization components
│   ├── contexts/       # React Context providers
│   ├── lib/            # Utility functions and constants
│   ├── pages/          # Application pages
│   ├── providers/      # Provider composition
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
└── package.json
```

## Features in Detail

### Theme Customization
- 10 unique theme styles:
  - Industrial
  - Forge
  - Steel
  - Carbon
  - Titanium
  - Copper
  - Chrome
  - Alloy
  - Iron
  - Platinum
- Dark/light mode toggle
- Persistent theme preferences
- Glassmorphism design elements

### Dashboard
- Real-time production metrics
- Inventory status
- Recent activities
- Favorites management
- Performance indicators

### Profile Management
- User profile customization
- Security settings
- Recent activity tracking
- Connected devices management

### Security Features
- Session management
- Device tracking
- Activity monitoring
- Secure authentication

## License

[MIT](LICENSE)