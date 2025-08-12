"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CubeIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

export default function LoginPage() {
  const router = useRouter();

  const handleSignIn = () => {
    // This is where you would handle authentication.
    // For now, we'll just redirect to the dashboard.
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <div className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center p-8 lg:p-16">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center gap-2 self-start">
              <CubeIcon className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">SmartLIS</span>
            </div>

            <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="mb-8 text-muted-foreground">
              Please enter your details
            </p>

            <div className="space-y-4">
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
                  <Label htmlFor="remember" className="text-sm font-medium">Remember for 30 days</Label>
                </div>
                <Link
                  href="#"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password
                </Link>
              </div>

              <div className="space-y-3 pt-4">
                <Button className="w-full" onClick={handleSignIn}>
                  Sign in
                </Button>
                <Button variant="outline" className="w-full">
                  <GitHubLogoIcon className="mr-2 h-4 w-4" />
                  Sign in with Google
                </Button>
              </div>
              <p className="pt-4 text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="#" className="font-semibold text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="hidden items-center justify-center bg-primary/10 p-8 md:flex">
          <img
            src="https://placehold.co/800x800.png"
            alt="Illustration"
            className="h-full w-full max-w-md rounded-lg object-cover"
            data-ai-hint="illustration abstract support"
          />
        </div>
      </div>
    </div>
  );
}
