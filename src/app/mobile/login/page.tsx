"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, LogIn, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function MobileLoginPage() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple mock authentication for prototype
        if (password === "1234") {
            router.push("/mobile");
        } else {
            setError("Invalid password");
            setTimeout(() => setError(""), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex flex-col items-center justify-center p-6">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-kauri-green/5 via-transparent to-transparent"></div>

            <div className="w-full max-w-md space-y-8 relative z-10">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Image
                        src="/images/KAURI_logo.png"
                        alt="KAURI"
                        width={180}
                        height={54}
                        className="h-14 w-auto object-contain"
                        priority
                    />
                </div>

                {/* Header */}
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center justify-center gap-2 mb-2">
                        <ShieldCheck className="w-6 h-6 text-kauri-green" />
                    </div>
                    <h1 className="text-3xl font-bold font-heading uppercase tracking-wider">Store Manager</h1>
                    <p className="text-white/60 text-base">Secure Mobile Access</p>
                </div>

                {/* Login Form */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-sm font-medium uppercase tracking-wide text-white/80">Access Code</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="bg-black/50 border-white/20 pl-12 pr-4 py-6 text-white placeholder:text-white/30 text-base rounded-xl focus:border-kauri-green focus:ring-2 focus:ring-kauri-green/20 transition-all"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                <p className="text-red-400 text-sm text-center font-medium">{error}</p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-kauri-green text-black hover:bg-kauri-green/90 font-bold py-6 text-base rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <LogIn className="w-5 h-5 mr-2" />
                            Access Dashboard
                        </Button>
                    </form>
                </div>

                {/* Footer */}
                <div className="text-center space-y-2">
                    <p className="text-xs text-white/40 uppercase tracking-widest">Restricted Access</p>
                    <p className="text-[10px] text-white/30">Kauri Store • Manager Portal</p>
                </div>
            </div>
        </div>
    );
}
