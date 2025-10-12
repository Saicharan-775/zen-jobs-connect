import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoginPage from '@/components/auth/LoginPage';
import SignupPage from '@/components/auth/SignupPage';

interface LocationState {
  mode?: 'login' | 'signup';
}

export default function AuthPage() {
  const location = useLocation();
  const state = location.state as LocationState;
  const [mode, setMode] = useState<'login' | 'signup'>(() => {
    // Check pathname for mode
    if (location.pathname === '/signup') return 'signup';
    if (location.pathname === '/login') return 'login';
    return state?.mode === 'signup' ? 'signup' : 'login';
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Toggle Buttons */}
      <div className="flex justify-center pt-8">
        <div className="bg-card rounded-lg p-1 shadow-lg">
          <button
            onClick={() => setMode('login')}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
              mode === 'login'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
              mode === 'signup'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Auth Form */}
      <motion.div
        key={mode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="mt-4"
      >
        {mode === 'login' ? <LoginPage /> : <SignupPage />}
      </motion.div>
    </div>
  );
}
