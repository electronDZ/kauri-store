"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Settings as SettingsIcon, ShieldCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col items-center justify-center relative overflow-hidden p-8">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gradient-to-b from-kauri-green/5 to-transparent pointer-events-none"></div>

            {/* Header */}
            <div className="absolute top-12 w-full text-center space-y-2 z-10">
                <h1 className="text-3xl font-semibold font-heading text-white">
                    Kauri Store System
                </h1>
                <div className="flex items-center justify-center gap-2">
                    <SettingsIcon className="w-5 h-5 text-white/60" />
                    <p className="text-base text-white/60">Settings</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-2xl gap-6">
                {/* Low-fidelity Notice */}
                <div className="w-full p-6 rounded-xl bg-white/5 border border-white/20 backdrop-blur-sm mb-4">
                    <p className="text-center text-lg font-medium text-white/80">
                        This is a low-fidelity prototype. Settings have no functionality.
                    </p>
                </div>

                {/* Settings Cards */}
                <div className="w-full grid grid-cols-1 gap-6">
                    <Button
                        onClick={() => {}}
                        className="h-64 flex flex-col items-center justify-center gap-6 bg-white/5 hover:bg-white/10 border border-white/30 text-white rounded-2xl group transition-all duration-300 hover:scale-[1.02] shadow-lg cursor-default"
                    >
                        <div className="flex flex-col items-center gap-2">
                            <span className="font-bold text-3xl">General Settings</span>
                            <span className="text-lg font-medium opacity-80">System configuration and preferences</span>
                        </div>
                    </Button>

                    <Button
                        onClick={() => {}}
                        className="h-64 flex flex-col items-center justify-center gap-6 bg-white/5 hover:bg-white/10 border border-white/30 text-white rounded-2xl group transition-all duration-300 hover:scale-[1.02] shadow-lg cursor-default"
                    >
                        <div className="flex flex-col items-center gap-2">
                            <span className="font-bold text-3xl">Network</span>
                            <span className="text-lg font-medium opacity-80">Connection status and configuration</span>
                        </div>
                    </Button>

                    <Button
                        onClick={() => {}}
                        className="h-64 flex flex-col items-center justify-center gap-6 bg-white/5 hover:bg-white/10 border border-white/30 text-white rounded-2xl group transition-all duration-300 hover:scale-[1.02] shadow-lg cursor-default"
                    >
                        <div className="flex flex-col items-center gap-2">
                            <span className="font-bold text-3xl">Diagnostics</span>
                            <span className="text-lg font-medium opacity-80">Run system checks and view logs</span>
                        </div>
                    </Button>
                </div>

                {/* Return Button */}
                <Button
                    onClick={() => router.push("/robot/login?verified=true")}
                    className="mt-4 h-16 px-10 bg-kauri-green hover:bg-kauri-green/90 text-black border-none rounded-xl font-semibold text-xl transition-all duration-300 hover:scale-[1.02] shadow-lg"
                >
                    <ArrowLeft className="w-6 h-6 mr-2" />
                    Return to Login
                </Button>
            </div>

            {/* Footer */}
            <div className="absolute bottom-12 text-center pointer-events-none">
                <ShieldCheck className="w-6 h-6 text-white/30 mx-auto mb-2" />
                <p className="text-sm text-white/40">Authorized access only</p>
            </div>
        </div>
    );
}
