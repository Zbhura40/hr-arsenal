# HR Arsenal

A comprehensive HR management system built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **ORM**: Prisma
- **UI Components**: Custom components with Radix UI primitives
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack Query

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp env.example .env.local
   ```
   Fill in your Supabase credentials and database URL.

3. **Set up the database**:
   ```bash
   npm run db:generate
   npm run db:push
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## Development

- **Database**: `npm run db:studio` - Open Prisma Studio
- **Linting**: `npm run lint` - Run ESLint
- **Build**: `npm run build` - Build for production

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # Reusable UI components
│   └── ui/             # Base UI components
├── lib/                # Utility functions and configurations
├── hooks/              # Custom React hooks
└── types/              # TypeScript type definitions
```

## Features

- 🔐 Authentication with Supabase
- 👥 Employee Management
- 🏢 Department Management
- 📊 Dashboard and Analytics
- 📝 Leave Management
- 📋 Performance Reviews
- 📄 Document Management
