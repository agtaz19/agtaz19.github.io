import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import AuthLayout from "@/components/AuthLayout";
import GoogleIcon from "@/components/GoogleIcon";
import { toast } from "@/components/ui/use-toast";

export default function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [otpCode, setOtpCode] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password.length < 8) return setError("Password must be at least 8 characters");
        if (password !== confirmPassword) return setError("Passwords do not match");

        setLoading(true);
        try {
            await base44.auth.register({ email, password });
            setShowOtp(true);
        } catch (err) {
            setError(err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async () => {
        setError("");
        setLoading(true);
        try {
            const result = await base44.auth.verifyOtp({ email, otpCode });
            if (result?.access_token) base44.auth.setToken(result.access_token);
            navigate("/");
        } catch (err) {
            setError("Invalid verification code");
        } finally {
            setLoading(false);
        }
    };

    // ... (rest of the component logic)

    return (
        <AuthLayout 
            icon={showOtp ? Mail : UserPlus} 
            title={showOtp ? "Verify your email" : "Create your account"} 
            subtitle={showOtp ? `We sent a code to ${email}` : "Sign up to get started"}
        >
            {/* Logic for rendering OTP view vs Registration form */}
            {!showOtp ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* ... Inputs ... */}
                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 pr-10"
                            required
                        />
                        <button 
                            type="button" 
                            className="absolute right-3 top-3 text-muted-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    {/* ... */}
                </form>
            ) : (
                <div className="space-y-6">
                    <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode} className="justify-center">
                        <InputOTPGroup>
                            {[...Array(6)].map((_, i) => <InputOTPSlot key={i} index={i} />)}
                        </InputOTPGroup>
                    </InputOTP>
                    <Button className="w-full" onClick={handleVerify} disabled={loading || otpCode.length < 6}>
                        {loading ? <Loader2 className="animate-spin mr-2" /> : "Verify"}
                    </Button>
                </div>
            )}
        </AuthLayout>
    );
}