# Das Duas Uma Wine Shop

A modern landing page with a minimal e-commerce platform for the portuguese wine Das Duas Uma.

## Features

- Responsive wine catalog with detailed product information
- Shopping cart functionality with real-time updates
- Streamlined checkout process
- Elegant UI designed specifically for wine enthusiasts with the aim to provide a special experience that links the wine experience with web experience

## Technologies

- **Frontend**: React 19, TypeScript, Vite
- **Routing**: React Router v7
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **UI Components**: Shadcn UI
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository

    ```bash
    git clone https://github.com/yourusername/dasduasuma.git
    cd dasduasuma
    ```

2. Install dependencies

    ```bash
    npm install
    # or
    yarn
    # or
    pnpm install
    ```

3. Start the development server

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── assets/        # Static assets like images
├── components/    # Reusable React components
│   ├── shared/    # Shared components (ProductCard, etc.)
│   ├── ui/        # Shadcn UI components
│   └── features/  # Feature-specific components
├── config/        # Configuration files
├── hooks/         # Custom React hooks
├── layouts/       # Layout components
├── lib/           # Utility functions and types
├── pages/         # Route components
├── services/      # API service definitions
├── store/         # Zustand stores
└── styles/        # Global styles
```
