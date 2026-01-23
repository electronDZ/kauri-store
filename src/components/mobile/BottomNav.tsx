"use client";

import { LayoutDashboard, Radio, Users, Bot } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMobile } from "@/app/mobile/context/MobileContext";

export function BottomNav() {
    const pathname = usePathname();
    const { alerts } = useMobile();

    const isActive = (path: string) => pathname === path;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-2 pb-6 z-50 max-w-md mx-auto">
            <div className="flex justify-around items-center">
                <Link href="/mobile" className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${isActive("/mobile") ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-primary"}`}>
                    <LayoutDashboard className="w-6 h-6" />
                    <span className="text-xs font-medium uppercase tracking-wide">Dashboard</span>
                </Link>
                <Link href="/mobile/live" className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${isActive("/mobile/live") ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-primary"}`}>
                    <Bot className="w-6 h-6" />
                    <span className="text-xs font-medium uppercase tracking-wide">Live</span>
                </Link>
                <Link href="/mobile/alerts" className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors relative ${isActive("/mobile/alerts") ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-primary"}`}>
                    <div className="relative">
                        <Radio className="w-6 h-6" />
                        {alerts.length > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-background animate-in zoom-in spin-in-12 duration-300">
                                {alerts.length}
                            </span>
                        )}
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wide">Alerts</span>
                </Link>
                <Link href="/mobile/staff" className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${isActive("/mobile/staff") ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-primary"}`}>
                    <Users className="w-6 h-6" />
                    <span className="text-xs font-medium uppercase tracking-wide">Staff</span>
                </Link>
            </div>
        </div>
    );
}
