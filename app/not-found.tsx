import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-destructive/10 p-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
        </div>

        <h1 className="mb-2 text-4xl font-bold text-foreground">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-foreground">
          Page Not Found
        </h2>
        <p className="mb-8 text-base text-muted-foreground">
          Could not find the requested resource. It may have been removed or the
          link might be broken.
        </p>

        <div className="flex flex-col gap-3">
          <Link href="/" className="w-full">
            <Button className="w-full gap-2" size="lg">
              <Home className="h-4 w-4" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
