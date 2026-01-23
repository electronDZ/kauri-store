"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Scan, ShieldCheck, Lock, UserCheck, Settings, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // distinct states for the flow:
    // 'idle' -> click to start
    // 'scanning' -> simulated face id
    // 'success' -> verified
    // 'choices' -> proceed or settings
    const [scanState, setScanState] = useState<"idle" | "scanning" | "success" | "choices">("idle");

    useEffect(() => {
        // If we come back from settings (verified=true), show choices immediately
        if (searchParams.get("verified") === "true") {
            setScanState("choices");
        }
    }, [searchParams]);

    const startScanning = () => {
        setScanState("scanning");
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (scanState === "scanning") {
            // Scan Duration (3s)
            timer = setTimeout(() => {
                setScanState("success");
            }, 3000);
        } else if (scanState === "success") {
            // Show success for 1.5s then go to choices
            timer = setTimeout(() => {
                setScanState("choices");
            }, 1500);
        }

        return () => clearTimeout(timer);
    }, [scanState]);

    const handleProceed = () => {
        router.push("/robot");
    };

    const handleSettings = () => {
        router.push("/settings");
    };

    return (
        <div className="h-screen w-full bg-black text-white flex flex-col items-center justify-center relative overflow-hidden" onClick={scanState === "idle" ? startScanning : undefined}>

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

            {/* MAIN CONTENT AREA */}
            <div className="relative z-10 flex flex-col items-center">

                {/* 1. IDLE STATE: Touch to Start */}
                {scanState === "idle" && (
                    <div className="flex flex-col items-center gap-8 animate-in fade-in duration-700 cursor-pointer p-12 rounded-2xl hover:bg-white/5 transition-colors">
                        <div className="w-32 h-32 rounded-full border-2 border-white/20 flex items-center justify-center animate-pulse">
                            <Scan className="w-12 h-12 text-white/70" />
                        </div>
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-bold tracking-widest uppercase">Touch to Access</h2>
                            <p className="text-white/50 font-mono text-sm">Face ID Verification Required</p>
                        </div>
                    </div>
                )}

                {/* 2 & 3. SCANNING & SUCCESS STATES: Face ID Visuals */}
                {(scanState === "scanning" || scanState === "success") && (
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
                                <div className="absolute left-0 right-0 h-0.5 bg-kauri-green shadow-[0_0_15px_rgba(34,197,94,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
                            </div>
                        )}
                    </div>
                )}

                {/* 4. CHOICES STATE: Proceed or Settings */}
                {scanState === "choices" && (
                    <div className="flex flex-col items-center gap-8 animate-in zoom-in duration-500 w-full max-w-lg px-6">
                        <div className="text-center space-y-1 mb-4">
                            <h2 className="text-2xl font-bold uppercase tracking-widest">Welcome, Manager</h2>
                            <p className="text-white/50">System Unlocked</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            <Button
                                onClick={handleProceed}
                                className="h-32 flex flex-col items-center justify-center gap-4 bg-kauri-green hover:bg-kauri-green/90 text-black border-none rounded-xl group transition-all duration-300 hover:scale-[1.02]"
                            >
                                <div className="bg-black/20 p-4 rounded-full group-hover:bg-black/10 transition-colors">
                                    <Bot className="w-8 h-8" />
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-lg uppercase tracking-wider">Kauri Screen</span>
                                    <span className="text-xs opacity-70">Customer Interface</span>
                                </div>
                            </Button>

                            <Button
                                onClick={handleSettings}
                                variant="outline"
                                className="h-32 flex flex-col items-center justify-center gap-4 bg-white/5 hover:bg-white/10 border-white/20 text-white rounded-xl group transition-all duration-300 hover:scale-[1.02]"
                            >
                                <div className="bg-white/10 p-4 rounded-full group-hover:bg-white/20 transition-colors">
                                    <Settings className="w-8 h-8" />
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-lg uppercase tracking-wider">Settings</span>
                                    <span className="text-xs opacity-50">System Configuration</span>
                                </div>
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Status Text (Only for scanning/success) */}
            {(scanState === "scanning" || scanState === "success") && (
                <div className="absolute bottom-32 left-0 right-0 text-center space-y-1 h-12">
                    <p className="text-sm font-mono text-white/70 uppercase tracking-widest">
                        {scanState === "scanning" && "Scanning Face ID..."}
                        {scanState === "success" && "Identity Verified"}
                    </p>
                    {scanState === "scanning" && (
                        <p className="text-[10px] text-white/30 animate-pulse">Please hold still</p>
                    )}
                </div>
            )}

            {/* Footer */}
            <div className="absolute bottom-12 text-center pointer-events-none">
                <ShieldCheck className="w-6 h-6 text-white/20 mx-auto mb-2" />
                <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Authorized Personnel Only</p>
            </div>

        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense>
            <LoginContent />
        </Suspense>
    );
}
