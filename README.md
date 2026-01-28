# Next.js App Template

A modern Next.js template repository built with TypeScript and shadcn/ui components.

## Features

### Core Functionality

- **App Router**: Next.js 16 App Router for modern React Server Components
- **TypeScript**: Full type safety throughout the application
- **UI Components**: shadcn/ui component library with Radix Vega styling
- **Theme Management**: Dark/light mode support with `next-themes`
- **Responsive Design**: Tailwind CSS v4 for modern, responsive styling
- **Icon Library**: Phosphor icons for consistent iconography

### Technical Features

- **Code Quality**: ESLint, Prettier, Husky, and Commitlint for consistent code standards
- **Import Organization**: Automatic import sorting with Prettier plugin
- **Path Aliases**: Clean import paths with TypeScript path mapping
- **Font Optimization**: Next.js font optimization with Geist and Barlow fonts
- **Component Variants**: Class Variance Authority for flexible component styling
- **Git Hooks**: Pre-commit hooks for code formatting and linting

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 16.1.4
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix Vega style)
- **Icons**: [Phosphor Icons](https://phosphoricons.com/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Utilities**: [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge), [class-variance-authority](https://github.com/joe-bell/cva)
- **Code Quality**: ESLint, Prettier, Husky, Commitlint

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (or yarn, pnpm, bun)
- [Git](https://git-scm.com/)

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Production
npm run build        # Build the application for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint and fix issues
npm run format       # Format code with Prettier
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   │   └── button.tsx    # Button component
│   └── index.ts          # Component exports
├── providers/            # React context providers
│   ├── theme-provider.tsx # Theme management provider
│   └── index.ts          # Provider exports
├── styles/               # Global styles
│   └── globals.css       # Tailwind CSS and global styles
└── utils/                # Utility functions
    ├── cn.ts             # className utility (clsx + tailwind-merge)
    └── index.ts          # Utility exports
```
