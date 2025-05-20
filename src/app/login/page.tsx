// app/login/page.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (email.length > 0 && password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }
  , [email, password]);

  const handleLogin = () => {
    setError("");
    setLoading(true);
    axios
      .post("/api/users/login", { email, password })
      .then((response) => {
        if (response.data.success) {
          toast.success("Logged in successfully");
          router.push("/profile");
        } else {
          setError(response.data.error || "Login failed. Please try again.");
          toast.error(response.data.error || "Login failed. Please try again.");
        }
      })
      .catch((error: unknown) => {
        console.error("Error during login:", error);
        let errorMessage = "An error occurred during login. Please try again.";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleForgetPassword = async() => {
    if(!email) {
      toast.error("Please enter your email");
      return;
    }
    const res = await axios.post("/api/users/generateresetemail", { email })
    if (res.data.success) {
      toast.success("Password reset email sent successfully");
      setShowPassword(true);
    } else {
      toast.error(res.data.error || "Failed to send password reset email");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">



      <Card className="w-[350px] shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
          
        </CardHeader>
        <CardContent>

          {showPassword && (
            <div className="text-center text-sm text-blue-500 cursor-pointer">
              <p>Check your email for password reset link</p>
            </div>
          )}

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="mb-2">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <Label className="mb-2" htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full mt-4" disabled={buttonDisabled}>
                {loading ? "Logging in..." : "Login"}
              </Button>
              <p onClick={handleForgetPassword} className="text-center text-sm text-blue-500 cursor-pointer">forgot password</p>
              <p  className="text-center text-sm">don&apos;t have account. <Link href={"/signup"}>
              <span className="text-blue-500 cursor-pointer">Signup</span> </Link></p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
