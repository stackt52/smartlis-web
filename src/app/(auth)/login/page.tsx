"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CubeIcon, GlobeIcon } from "@radix-ui/react-icons";

export default function LoginPage() {
  const router = useRouter();

  const handleSignIn = () => {
    // This is where you would handle authentication.
    // For now, we'll just redirect to the dashboard.
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="grid w-full max-w-4xl grid-cols-1 md:grid-cols-2 overflow-hidden rounded-lg shadow-2xl bg-card">
        <div className="p-8">
          <div className="mb-8 flex items-center gap-3">
            <CubeIcon className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold">SmartLIS</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Login to your account
          </h1>
          <p className="mt-2 text-muted-foreground">
            Welcome back! Please enter your details.
          </p>

          <div className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                className="bg-secondary/50 border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required className="bg-secondary/50 border-border" />
            </div>

            <div className="flex items-center justify-end">
              <Link
                href="#"
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <div className="space-y-3">
              <Button className="w-full" onClick={handleSignIn}>
                Sign in
              </Button>
              <Button variant="outline" className="w-full">
                <GlobeIcon className="mr-2 h-4 w-4" />
                Sign in with Google
              </Button>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="#" className="font-semibold text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <div className="hidden items-center justify-center bg-primary/10 p-8 md:flex">
          <img
            src="https://placehold.co/600x400.png"
            alt="Illustration"
            className="h-full w-full rounded-lg object-cover"
            data-ai-hint="illustration abstract technology"
          />
        </div>
      </div>
    </div>
  );
}