"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { ArrowLeft, Mail } from "lucide-react";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/forgot-password`,
        { email }
      );
      setEmailSent(true);
      toast.success("Password reset email sent successfully");
    } catch (error) {
      toast.error("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full flex flex-col items-center justify-center space-y-6">
          <Image
            src="/tourmaker-logo.png"
            alt="TourMaker Logo"
            width={200}
            height={100}
          />

          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Check Your Email
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <p className="text-gray-600">
                We've sent a password reset link to:
              </p>
              <p className="font-semibold text-gray-900">{email}</p>
              <p className="text-sm text-gray-500">
                If you don't see the email, check your spam folder.
              </p>
              <Button
                onClick={handleBackToLogin}
                variant="outline"
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full flex flex-col items-center justify-center space-y-6">
        <Image
          src="/tourmaker-logo.png"
          alt="TourMaker Logo"
          width={200}
          height={100}
        />

        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Forgot Password?
            </CardTitle>
            <p className="text-center text-gray-600 mt-2">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="text-sm text-blue-600 hover:text-blue-800 underline inline-flex items-center"
                >
                  <ArrowLeft className="w-3 h-3 mr-1" />
                  Back to Login
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
