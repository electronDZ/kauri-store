"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Scan, ShieldCheck, Lock, UserCheck } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [scanState, setScanState] = useState<"idle" | "scanning" | "success">("idle");

    useEffect(() => {
        // 1. Initial Delay
        const initTimer = setTimeout(() => {
            setScanState("scanning");
        }, 1000);

        // 2. Scan Duration (3s)
        const scanTimer = setTimeout(() => {
            setScanState("success");
        }, 4000);

        // 3. Redirect (1.5s after success)
        const redirectTimer = setTimeout(() => {
            router.push("/mobile");
        }, 5500);

        return () => {
            clearTimeout(initTimer);
            clearTimeout(scanTimer);
            clearTimeout(redirectTimer);
        };
    }, [router]);

    return (
        <div className="h-screen w-full bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gradient-to-b from-kauri-green/5 to-transparent pointer-events-none"></div>

            {/* Header */}
            <div className="absolute top-12 w-full text-center space-y-2 z-10">
                <h1 className="text-xl font-bold font-heading uppercase tracking-widest text-white/90">
                    Kauri Store System
                </h1>
                <div className="flex items-center justify-center gap-2">
                    <Lock className="w-3 h-3 text-white/50" />
                    <p className="text-xs text-white/50 font-mono tracking-wide">SECURE ACCESS REQ.</p>
                </div>
            </div>

            {/* Scanner Visuals */}
            <div className="relative z-10">
                <div className="relative w-64 h-80 rounded-2xl border-2 border-white/20 overflow-hidden bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-2xl">

                    {/* Corner Brackets */}
                    <div className={`absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 transition-all duration-500 rounded-tl-lg ${scanState === "success" ? "border-kauri-green" : "border-white"}`}></div>
                    <div className={`absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 transition-all duration-500 rounded-tr-lg ${scanState === "success" ? "border-kauri-green" : "border-white"}`}></div>
                    <div className={`absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 transition-all duration-500 rounded-bl-lg ${scanState === "success" ? "border-kauri-green" : "border-white"}`}></div>
                    <div className={`absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 transition-all duration-500 rounded-br-lg ${scanState === "success" ? "border-kauri-green" : "border-white"}`}></div>

                    {/* Content */}
                    {scanState === "success" ? (
                        <div className="flex flex-col items-center gap-4 animate-in zoom-in duration-500">
                            <div className="w-20 h-20 rounded-full bg-kauri-green/20 flex items-center justify-center border border-kauri-green">
                                <UserCheck className="w-10 h-10 text-kauri-green" />
                            </div>
                            <span className="text-kauri-green font-bold text-lg tracking-widest uppercase">Authorized</span>
                        </div>
                    ) : (
                        <div className="w-full h-full relative">
                            {/* Simulated Face Outline */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                <Scan className="w-32 h-32 text-white animate-pulse" />
                            </div>

                            {/* Scan Line */}
                            {scanState === "scanning" && (
                                <div className="absolute left-0 right-0 h-0.5 bg-kauri-green shadow-[0_0_15px_rgba(34,197,94,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
                            )}
                        </div>
                    )}
                </div>

                {/* Status Text */}
                <div className="absolute -bottom-24 left-0 right-0 text-center space-y-1 h-12">
                    <p className="text-sm font-mono text-white/70 uppercase tracking-widest">
                        {scanState === "idle" && "Initializing Camera..."}
                        {scanState === "scanning" && "Scanning Face ID..."}
                        {scanState === "success" && "Identity Verified"}
                    </p>
                    {scanState === "scanning" && (
                        <p className="text-[10px] text-white/30 animate-pulse">Please hold still</p>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-12 text-center">
                <ShieldCheck className="w-6 h-6 text-white/20 mx-auto mb-2" />
                <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Authorized Personnel Only</p>
            </div>

        </div>
    );
}
