"use client";

import { AlertCard } from "@/components/mobile/AlertCard";
import { Bell, CheckCircle } from "lucide-react";
import { useMobile } from "@/app/mobile/context/MobileContext";

export default function LiveAlerts() {
    const { alerts, resolveAlert, triggerMisplacedItem, reportMissingItemCandidate, finishAudit } = useMobile();

    return (
        <div className="p-6 space-y-6 min-h-screen pb-24">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl! font-bold font-heading text-foreground">Live Alerts</h1>
                    <p className="text-sm text-muted-foreground">Secret Audit Findings</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Bell className="w-6 h-6 text-foreground" />
                            {alerts.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-kauri-alert text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-bounce">
                                    {alerts.length}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className="space-y-4">
                {alerts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 border-2 border-dashed border-border rounded-lg bg-card/50">
                        <div className="w-12 h-12 rounded-full bg-kauri-safe/10 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-kauri-safe" />
                        </div>
                        <div>
                            <h3 className="font-medium text-foreground">All Clear!</h3>
                            <p className="text-sm text-muted-foreground">No issues detected by the robot.</p>
                        </div>
                    </div>
                ) : (
                    alerts.map((alert) => (
                        <AlertCard
                            key={alert.id}
                            id={alert.id}
                            type={alert.type}
                            itemName={alert.itemName}
                            detail={alert.detail}
                            message={alert.message}
                            actionLabel={alert.actionLabel}
                            onResolve={resolveAlert}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
