import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import supabase from '@/supabaseClient';
import { playSound } from '@/utils/sound';

export default function EmailVerificationPending() {
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth state changes to detect when email is verified
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session?.user?.email_confirmed_at) {
          playSound('success');
          navigate('/dashboard');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleResendEmail = async () => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: '', // Will use the current user's email
      });

      if (error) throw error;

      playSound('success');
      // Show success message
    } catch (error) {
      console.error('Error resending email:', error);
      // Show error message
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              <Mail className="h-10 w-10 text-primary" />
              <span className="text-2xl font-bold text-foreground">JobLinker</span>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-foreground">
            Check your email
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We've sent you a verification link
          </p>
        </div>

        <Card className="card-elevated">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Verification email sent!
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              We have sent a link to verify your email. Please check your email and click the link to verify your account.
            </p>
            <p className="text-xs text-muted-foreground mb-6">
              Didn't receive the email? Check your spam folder or click below to resend.
            </p>
            <Button
              onClick={handleResendEmail}
              variant="outline"
              className="w-full"
            >
              Resend verification email
            </Button>
          </CardContent>
        </Card>

        <div className="text-center">
          <button
            onClick={() => navigate('/auth')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to sign in
          </button>
        </div>
      </div>
    </div>
  );
}
