"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import { set } from "mongoose";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const verifyUserEmail = async () => {
    setError("");
    setLoading(true);
    await axios
      .post("/api/users/verifyemail", { token })
      .then((response) => {
        toast.success(response.data.message);
        setIsVerified(true);
        router.push("/login");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Verification failed");
        setError(error.response?.data?.message || "Verification failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 flex flex-col items-center border border-white/20">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-orange-400 to-yellow-300 mb-4 shadow-lg">
          {/* Envelope icon */}
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2 text-white">
          Verify Your Email
        </h1>
        <h2 className="text-base mb-4 px-3 py-1 rounded bg-orange-400 text-black font-mono break-all">
          {token ? `Token: ${token}` : <span>No token found</span>}
        </h2>
        {loading ? (
          <p className="text-blue-200 animate-pulse">Verifying...</p>
        ) : isVerified ? (
          <div className="flex flex-col items-center">
            <svg
              className="w-10 h-10 text-green-400 mb-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-green-300 font-semibold">
              Your email has been verified successfully!
            </p>
            <p className="text-white/80 mt-2 text-sm">
              You can now{" "}
              <span
                className="underline text-blue-300 cursor-pointer"
                onClick={() => router.push("/login")}
              >
                login
              </span>
              .
            </p>
          </div>
        ) : (
          <p className="text-white/80">
            Please wait while we verify your email...
          </p>
        )}
        {error && (
          <p className="text-red-400 mt-4 font-semibold">{error}</p>
        )}
      </div>
    </div>
  );
}
