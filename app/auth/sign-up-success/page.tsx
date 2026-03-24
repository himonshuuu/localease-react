import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>

          <h1 className="text-2xl font-bold text-foreground">Check Your Email</h1>
          <p className="mt-3 text-muted-foreground">
            We&apos;ve sent a confirmation link to your email address. Please click
            the link to verify your account and complete registration.
          </p>

          <div className="mt-8 rounded-lg bg-secondary/50 p-4">
            <p className="text-sm text-muted-foreground">
              Didn&apos;t receive the email? Check your spam folder or try signing
              up again with a different email address.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Go to Login
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
