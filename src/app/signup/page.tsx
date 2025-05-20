"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup response:", response.data);

      if (response.data.success) {
        toast.success(
          "Account created successfully! Please check your email to verify your account."
        );
        router.push("/login");
      } else {
        setError(response.data.error || "Signup failed. Please try again.");
        toast.error(response.data.error || "Signup failed. Please try again.");
      }
    } catch (error: unknown) {
      console.error("Error during signup:", error);
      let errorMessage = "An error occurred during signup. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);



  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-[350px] shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Signup</CardTitle>
        </CardHeader>

        {error && (
          <div className="text-red-500 text-sm text-center mb-4">{error}</div>
        )}

        <CardContent>
          {" "}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSignup();
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="name" className="mb-2">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Rajiv Kumar"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="mb-2">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="mb-2">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <Button disabled={buttonDisabled} type="submit" className="w-full">
              {loading ? "Loading..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-primary underline hover:opacity-80">
            Log in
          </a>
        </p>
      </Card>
    </div>
  );
}
