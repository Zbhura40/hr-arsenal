# Supabase Auth Setup Guide

This guide will help you set up Supabase Authentication in your HR Arsenal project.

## Prerequisites

1. A Supabase project (create one at [supabase.com](https://supabase.com))
2. Node.js and npm installed
3. Your project dependencies installed (`npm install`)

## Setup Steps

### 1. Environment Variables

Copy the `env.example` file to `.env.local` and fill in your Supabase credentials:

```bash
cp env.example .env.local
```

Update `.env.local` with your Supabase project details:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 2. Supabase Project Configuration

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** > **Settings**
3. Configure the following:

#### Site URL
- Set to `http://localhost:3000` for development
- Set to your production domain for production

#### Redirect URLs
Add these URLs to your allowed redirect URLs:
- `http://localhost:3000/auth/callback`
- `https://yourdomain.com/auth/callback` (for production)

### 3. Enable Auth Providers (Optional)

To enable social authentication:

1. Go to **Authentication** > **Providers**
2. Enable the providers you want (Google, GitHub, Discord, etc.)
3. Configure each provider with their respective credentials

### 4. Database Setup (Optional)

If you want to store additional user data:

1. Go to **Table Editor** in your Supabase dashboard
2. Create a `profiles` table:

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

## Features Included

### Authentication Methods
- ✅ Email/Password authentication
- ✅ Social authentication (Google, GitHub, Discord)
- ✅ Magic link authentication (via Supabase)
- ✅ OTP authentication (via Supabase)

### Components
- `AuthProvider` - Context provider for authentication state
- `LoginForm` - Login form component
- `SignupForm` - Signup form component
- `AuthButton` - Sign out button for authenticated users

### Pages
- `/login` - Login page
- `/signup` - Signup page
- `/dashboard` - Protected dashboard page
- `/auth/callback` - OAuth callback handler

### Route Protection
- Middleware for protecting routes
- Automatic redirects for unauthenticated users
- Redirect to dashboard for authenticated users on auth pages

## Usage

### Using the Auth Context

```tsx
import { useAuth } from '@/contexts/AuthContext'

function MyComponent() {
  const { user, loading, signIn, signOut } = useAuth()

  if (loading) return <div>Loading...</div>

  if (user) {
    return (
      <div>
        <p>Welcome, {user.email}!</p>
        <button onClick={signOut}>Sign Out</button>
      </div>
    )
  }

  return <div>Please sign in</div>
}
```

### Protecting Server Components

```tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return <div>Protected content for {user.email}</div>
}
```

## Testing

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000`
3. Try signing up with a new account
4. Check your email for the confirmation link
5. Sign in and test the protected dashboard route
6. Test social authentication (if configured)

## Troubleshooting

### Common Issues

1. **"Invalid API key" error**
   - Check your environment variables are correctly set
   - Ensure you're using the anon key, not the service role key for client-side operations

2. **OAuth redirect errors**
   - Verify your redirect URLs are correctly configured in Supabase
   - Check that the callback URL matches exactly

3. **"User not found" errors**
   - Ensure email confirmation is completed
   - Check if email confirmation is required in your Supabase settings

4. **Middleware issues**
   - Clear your browser cookies and try again
   - Check that the middleware is properly configured

### Debug Mode

To enable debug logging, add this to your environment variables:

```env
NEXT_PUBLIC_SUPABASE_DEBUG=true
```

## Next Steps

1. Customize the UI components to match your design
2. Add user profile management
3. Implement role-based access control
4. Add email templates customization
5. Set up additional auth providers as needed

## Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js with Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase Auth UI Components](https://supabase.com/docs/guides/auth/auth-ui)
