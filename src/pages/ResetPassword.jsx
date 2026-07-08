import React, { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom"; // Added useNavigate
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Loader2, AlertTriangle, Eye, EyeOff } from "lucide-react"; // Added Eye icons
import AuthLayout from "@/components/AuthLayout";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate(); // Hook for navigation
    const resetToken = searchParams.get("token");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Visibility state
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Added basic policy check
        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            await base44.auth.resetPassword({ resetToken, newPassword });
            navigate("/login"); // Cleaner redirect
        } catch (err) {
            setError(err.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    // ... (Keep existing guard clause if !resetToken)

    return (
        <AuthLayout icon={Lock} title="New password" subtitle="Enter your new password below">
            {error && (
                <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm font-medium">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Reusable Password Input Logic */}
                {[
                    { label: "New Password", value: newPassword, setter: setNewPassword },
                    { label: "Confirm Password", value: confirmPassword, setter: setConfirmPassword }
                ].map((field, idx) => (
                    <div key={idx} className="space-y-2">
                        <Label>{field.label}</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                type={showPassword ? "text" : "password"}
                                className="pl-10 pr-10 h-12"
                                placeholder="••••••••"
                                value={field.value}
                                onChange={(e) => field.setter(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>
                ))}

                <Button type="submit" className="w-full h-12" disabled={loading}>
                    {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Resetting...</> : "Reset password"}
                </Button>
            </form>
        </AuthLayout>
    );
}