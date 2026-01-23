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
        <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col items-center justify-center relative overflow-hidden" onClick={scanState === "idle" ? startScanning : undefined}>

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gradient-to-b from-kauri-green/5 to-transparent pointer-events-none"></div>

            {/* Header */}
            <div className="absolute top-12 w-full text-center space-y-2 z-10">
                <h1 className="text-2xl font-semibold font-heading text-white">
                    Kauri Store System
                </h1>
                <div className="flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4 text-white/60" />
                    <p className="text-sm text-white/60">Secure Access</p>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="relative z-10 flex flex-col items-center">

                {/* 1. IDLE STATE: Touch to Start */}
                {scanState === "idle" && (
                    <div className="flex flex-col items-center gap-8 animate-in fade-in duration-700 cursor-pointer p-12 rounded-2xl hover:bg-white/5 transition-colors">
                        <div className="w-36 h-36 rounded-full border-2 border-white/30 flex items-center justify-center bg-white/5">
                            <Scan className="w-16 h-16 text-white/80" />
                        </div>
                        <div className="text-center space-y-3">
                            <h2 className="text-3xl font-semibold">Tap to Begin</h2>
                            <p className="text-white/60 text-base">Face recognition required</p>
                        </div>
                    </div>
                )}

                {/* 2 & 3. SCANNING & SUCCESS STATES: Face ID Visuals */}
                {(scanState === "scanning" || scanState === "success") && (
                    <div className="relative w-72 h-96 rounded-3xl border border-white/20 overflow-hidden bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-xl">
                        {/* Content */}
                        {scanState === "success" ? (
                            <div className="flex flex-col items-center gap-6 animate-in zoom-in duration-500">
                                <div className="w-24 h-24 rounded-full bg-kauri-green/20 flex items-center justify-center border-2 border-kauri-green">
                                    <UserCheck className="w-12 h-12 text-kauri-green" />
                                </div>
                                <span className="text-kauri-green font-semibold text-xl">Verified</span>
                            </div>
                        ) : (
                            <div className="w-full h-full relative">
                                {/* Simulated Face Outline */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                    <Scan className="w-40 h-40 text-white" />
                                </div>
                                {/* Subtle Scan Line */}
                                <div className="absolute left-0 right-0 h-1 bg-kauri-green/60 shadow-[0_0_10px_rgba(34,197,94,0.4)] animate-[scan_2s_ease-in-out_infinite]"></div>
                            </div>
                        )}
                    </div>
                )}

                {/* 4. CHOICES STATE: Proceed or Settings */}
                {scanState === "choices" && (
                    <div className="flex flex-col items-center gap-10 animate-in zoom-in duration-500 w-full max-w-2xl px-8">
                        <div className="text-center space-y-2 mb-2">
                            <h2 className="text-3xl font-semibold">Welcome</h2>
                            <p className="text-white/60 text-base">What would you like to do?</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            <Button
                                onClick={handleProceed}
                                className="h-56 flex flex-col items-center justify-center gap-6 bg-kauri-green hover:bg-kauri-green/90 text-black border-none rounded-2xl group transition-all duration-300 hover:scale-[1.02] shadow-lg"
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <span className="font-bold text-2xl">Kauri Screen</span>
                                    <span className="text-base font-medium opacity-90">Customer Interface</span>
                                </div>
                            </Button>

                            <Button
                                onClick={handleSettings}
                                variant="outline"
                                className="h-56 flex flex-col items-center justify-center gap-6 bg-white/5 hover:bg-white/10 border-white/30 text-white rounded-2xl group transition-all duration-300 hover:scale-[1.02] shadow-lg"
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <span className="font-bold text-2xl">Settings</span>
                                    <span className="text-base font-medium opacity-80">System Configuration</span>
                                </div>
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Status Text (Only for scanning/success) */}
            {(scanState === "scanning" || scanState === "success") && (
                <div className="absolute bottom-32 left-0 right-0 text-center space-y-2 h-16">
                    <p className="text-base text-white/80">
                        {scanState === "scanning" && "Scanning..."}
                        {scanState === "success" && "Identity verified"}
                    </p>
                    {scanState === "scanning" && (
                        <p className="text-sm text-white/50">Please hold still</p>
                    )}
                </div>
            )}

            {/* Footer */}
            <div className="absolute bottom-12 text-center pointer-events-none">
                <ShieldCheck className="w-5 h-5 text-white/30 mx-auto mb-2" />
                <p className="text-xs text-white/40">Authorized access only</p>
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
