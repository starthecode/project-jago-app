import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';
//  import { supabase } from "@/integrations/supabase/client";
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
// import * as z from 'zod';
import { AuthForm } from './AuthForm';

// const signUpSchema = z.object({
//   fullName: z
//     .string()
//     .trim()
//     .min(2, 'Name must be at least 2 characters')
//     .max(100),
//   email: z.string().trim().email('Invalid email address').max(255),
//   password: z
//     .string()
//     .min(8, 'Password must be at least 8 characters')
//     .max(100),
// });

// const signInSchema = z.object({
//   email: z.string().trim().email('Invalid email address').max(255),
//   password: z.string().min(1, 'Password is required'),
// });

const Auth = () => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     if (session) {
  //       navigate('/dashboard');
  //     }
  //   });

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((event, session) => {
  //     if (session && event === 'SIGNED_IN') {
  //       navigate('/dashboard');
  //     }
  //   });

  //   return () => subscription.unsubscribe();
  // }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Heart className="h-10 w-10 text-primary fill-primary" />
            <span className="text-3xl font-bold text-foreground">
              Jaago India Jaago
            </span>
          </Link>
          <p className="text-muted-foreground">
            Your wellness journey starts here
          </p>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              {activeTab === 'signin' ? 'Welcome Back' : 'Welcome'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {activeTab === 'signin'
                ? 'Sign in to your account'
                : 'Create Your Account'}
            </p>
          </div>
          <div className="p-6 pt-0">
            <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-full mb-4">
              <button
                onClick={() => setActiveTab('signin')}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all w-full ${
                  activeTab === 'signin'
                    ? 'bg-background text-foreground shadow-sm'
                    : ''
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all w-full ${
                  activeTab === 'signup'
                    ? 'bg-background text-foreground shadow-sm'
                    : ''
                }`}
              >
                Sign Up
              </button>
            </div>

            <AuthForm activeTab={activeTab} />

            {/* {activeTab === 'signup' && (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="signup-name"
                    className="text-sm font-medium leading-none"
                  >
                    Full Name
                  </label>
                  <input
                    id="signup-name"
                    type="text"
                    placeholder="Your Name"
                    value={signUpData.fullName}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, fullName: e.target.value })
                    }
                    required
                    disabled={loading}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="signup-email"
                    className="text-sm font-medium leading-none"
                  >
                    Email
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signUpData.email}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, email: e.target.value })
                    }
                    required
                    disabled={loading}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="signup-password"
                    className="text-sm font-medium leading-none"
                  >
                    Password
                  </label>
                  <input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signUpData.password}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, password: e.target.value })
                    }
                    required
                    disabled={loading}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 8 characters
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                >
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
              </form>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
