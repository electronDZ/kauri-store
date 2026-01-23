"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, LogIn, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function MobileLoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Any username and password will grant access
        setTimeout(() => {
            router.push("/mobile");
        }, 500);
    };

    const handleFingerprintLogin = () => {
        setIsLoading(true);
        // Simulate fingerprint authentication
        setTimeout(() => {
            router.push("/mobile");
        }, 800);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col p-6">
            {/* Logo - Top */}
            <div className="flex justify-center pt-4 pb-8">
                <Image
                    src="/images/KAURI_logo.png"
                    alt="KAURI"
                    width={120}
                    height={36}
                    className="h-8 w-auto object-contain"
                    priority
                />
            </div>

            {/* Centered Content */}
            <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-md space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl! font-bold font-heading text-foreground uppercase tracking-wider">Store Manager</h1>
                        <p className="text-sm text-muted-foreground">Secure Mobile Access</p>
                    </div>

                    {/* Login Form */}
                    <div className="bg-card border border-border rounded-lg p-6 shadow-sm space-y-6">
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Username</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                                <Input
                                    type="text"
                                    placeholder="Enter your username"
                                    className="pl-12"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoFocus
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="pl-12"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            <LogIn className="w-4 h-4" />
                            Log In
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Or</span>
                        </div>
                    </div>

                    {/* Fingerprint Login */}
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleFingerprintLogin}
                        disabled={isLoading}
                    >
                        <Fingerprint className="w-4 h-4" />
                        Log In with Fingerprint
                    </Button>
                    </div>

                    {/* Footer */}
                    <div className="text-center space-y-1">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Restricted Access</p>
                        <p className="text-[10px] text-muted-foreground">Kauri Store • Manager Portal</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
