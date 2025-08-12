"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Blocks, Chrome } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const handleSignIn = () => {
    // This is where you would handle authentication.
    // For now, we'll just redirect to the dashboard.
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="grid w-full max-w-6xl grid-cols-1 rounded-lg shadow-2xl md:grid-cols-2">
        <div className="flex flex-col justify-center p-12">
          <div className="mb-10 flex items-center gap-2">
            <Blocks className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">TheCubeFactory</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-muted-foreground">
            Please enter your details
          </p>

          <div className="mt-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="font-normal">
                  Remember for 30 days
                </Label>
              </div>
              <Link
                href="#"
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot password
              </Link>
            </div>

            <div className="space-y-4">
              <Button className="w-full" onClick={handleSignIn}>
                Sign in
              </Button>
              <Button variant="outline" className="w-full">
                <Chrome className="mr-2 h-4 w-4" />
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
        <div className="hidden items-center justify-center rounded-r-lg bg-primary/10 p-12 md:flex">
          <img
            src="https://placehold.co/600x400.png"
            alt="Illustration"
            className="h-full w-full rounded-lg object-cover"
            data-ai-hint="illustration abstract"
          />
        </div>
      </div>
    </div>
  );
}
