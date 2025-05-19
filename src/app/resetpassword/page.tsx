"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function ResetPasswordPage() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get("token");
        if (token) {
            setToken(token);
        }
    }, []);

    const handleResetPassword = async () => {
        setLoading(true);
        try {
            const response = await axios.post("/api/users/resetpassword", {
                token,
                password: data.password,
            });
            if (response.data.success) {
                toast.success(response.data.message);
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } else {
                toast.error(response.data.message || "Failed to reset password");
            }
        } catch (error: any) {
            setError(error.response?.data?.message || "An error occurred while resetting the password");
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h2 className="text-red-500">{data.confirmPassword !== data.password && "Passwords do not match. Password and confirm password must be the same."}</h2>
            <h1 className="text-2xl font-bold">Reset Password</h1>
            <p className="mt-4 text-gray-600">Please enter your new password.</p>
            <form className="mt-6 space-y-4">
                <input
                    type="password"
                    placeholder="New Password"
                    className="w-full px-4 py-2 border rounded-md"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="w-full px-4 py-2 border rounded-md"
                    value={data.confirmPassword}
                    onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                />
                <button 
                    disabled={loading}
                    onClick={(e) => { e.preventDefault(); handleResetPassword(); }}
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    {loading ? "Resetting Password..." : "Reset Password"}
                </button>
            </form>
        </div>
    )
}