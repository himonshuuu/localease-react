import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>

          <h1 className="text-2xl font-bold text-foreground">Authentication Error</h1>
          <p className="mt-3 text-muted-foreground">
            Something went wrong during authentication. This could be due to an
            expired link, invalid credentials, or a server error.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Try Again
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
