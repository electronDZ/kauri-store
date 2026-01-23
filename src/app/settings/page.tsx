"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-black text-white p-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <Button
                    variant="solid"
                    onClick={() => router.push("/robot/login?verified=true")}
                    className="bg-white text-black hover:bg-white/90 font-bold px-4"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Return
                </Button>
                <div className="flex items-center gap-2">
                    <SettingsIcon className="w-6 h-6 text-kauri-green" />
                    <h1 className="text-2xl font-heading uppercase tracking-widest">Robot Settings</h1>
                </div>
            </div>

            <div className="grid gap-6 max-w-2xl mx-auto">
                <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <h2 className="text-lg font-bold mb-2">General Settings</h2>
                    <p className="text-white/50 text-sm">System configuration and preferences.</p>
                </div>

                <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <h2 className="text-lg font-bold mb-2">Network</h2>
                    <p className="text-white/50 text-sm">Connection status and configuration.</p>
                </div>

                <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <h2 className="text-lg font-bold mb-2">Diagnostics</h2>
                    <p className="text-white/50 text-sm">Run system checks and view logs.</p>
                </div>
            </div>
        </div>
    );
}
