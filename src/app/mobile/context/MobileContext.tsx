"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface Alert {
    id: string;
    type: "theft" | "misplaced" | "missing";
    itemName: string;
    detail: string;
    message: string;
}

const INITIAL_ALERTS: Alert[] = [];

export type RobotStatus = "idle" | "assistant" | "patrol";

interface MobileContextType {
    alerts: Alert[];
    resolveAlert: (id: string) => void;

    // Core Logic State
    robotStatus: RobotStatus;
    customerCount: number;
    toggleCustomerSimulation: () => void;
    addCustomers: (n: number) => void;

    // Audit Actions
    triggerMisplacedItem: () => void;
    reportMissingItemCandidate: () => void;
    finishAudit: () => void; // Manually or automatically finish tour

    securityStatus: "safe" | "warning";
}

const MobileContext = createContext<MobileContextType | undefined>(undefined);

// 15 Minutes in MS
const AUDIT_INTERVAL_MS = 15 * 60 * 1000;

export function MobileProvider({ children }: { children: ReactNode }) {
    const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);

    // Logic State
    const [robotStatus, setRobotStatus] = useState<RobotStatus>("idle");
    const [customerCount, setCustomerCount] = useState(0);
    const [lastAuditTime, setLastAuditTime] = useState<number>(Date.now() - AUDIT_INTERVAL_MS - 1000); // Ready to audit initially
    const [auditLog, setAuditLog] = useState<string[]>([]); // Items potentially missing

    // PRIORITY 1: HUMAN PRESENCE OVERRIDE
    useEffect(() => {
        if (customerCount > 0) {
            // IMMEDIATE OVERRIDE
            setRobotStatus("assistant");
            console.log("[CORE] Customer detected. Aborting all tasks. Entering Assistant Mode.");

            // Clear current audit log if interrupted? 
            // The prompt says "Abort current navigation path instantly". 
            // We'll keep the log but stop the 'patrol' status.
        } else {
            // If customers leave, go to Idle (wait for audit logic to pick up)
            if (robotStatus === "assistant") {
                setRobotStatus("idle");
            }
        }
    }, [customerCount]);

    // PRIORITY 2: AUTONOMOUS AUDITING (Interval Logic)
    useEffect(() => {
        const checkAuditEligibility = () => {
            if (customerCount > 0) return; // Blocked by humans
            if (robotStatus !== "idle") return; // Already busy

            const now = Date.now();
            if (now - lastAuditTime >= AUDIT_INTERVAL_MS) {
                console.log("[CORE] Interval reached. Shop empty. Starting Audit Patrol.");
                setRobotStatus("patrol");
                // Reset Log
                setAuditLog([]);
            }
        };

        const interval = setInterval(checkAuditEligibility, 5000); // Check every 5s
        return () => clearInterval(interval);
    }, [customerCount, robotStatus, lastAuditTime]);


    // Action: Toggle Customer
    const toggleCustomerSimulation = () => {
        setCustomerCount(prev => prev === 0 ? 1 : 0);
    };

    // Protocol A: Misplaced Item (Immediate)
    const triggerMisplacedItem = () => {
        const newAlert: Alert = {
            id: Math.random().toString(36).substr(2, 9),
            type: "misplaced",
            itemName: "Leather Belt",
            detail: "Found in Cosmetics Section",
            message: "Protocol A: Immediate Misplaced Item Alert."
        };
        setAlerts(prev => [newAlert, ...prev]);
    };

    // Protocol B: Missing Item (Delayed)
    const reportMissingItemCandidate = () => {
        console.log("[AUDIT] Possible missing item logged.");
        setAuditLog(prev => [...prev, "Silk Scarf (SKU-992)"]);
    };

    // Finish Audit (Can be called by Patrol component when animation ends)
    const finishAudit = () => {
        if (robotStatus !== "patrol") return;

        console.log("[CORE] Audit Complete. Processing Logs.");

        // Process Missing Items
        if (auditLog.length > 0) {
            const missingAlerts: Alert[] = auditLog.map(item => ({
                id: Math.random().toString(36).substr(2, 9),
                type: "missing",
                itemName: item,
                detail: "Confirmed after full tour",
                message: "Protocol B: Item confirmed missing."
            }));
            setAlerts(prev => [...missingAlerts, ...prev]);
        }

        setLastAuditTime(Date.now());
        setRobotStatus("idle");
    };

    const resolveAlert = (id: string) => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    };

    const securityStatus = alerts.length > 0 ? "warning" : "safe";

    return (
        <MobileContext.Provider value={{
            alerts,
            resolveAlert,
            robotStatus,
            customerCount,
            toggleCustomerSimulation,
            triggerMisplacedItem,
            reportMissingItemCandidate,
            finishAudit,
            securityStatus,
            addCustomers: (n: number) => setCustomerCount(prev => prev + n)
        }}>
            {children}
        </MobileContext.Provider>
    );
}

export function useMobile() {
    const context = useContext(MobileContext);
    if (context === undefined) {
        throw new Error("useMobile must be used within a MobileProvider");
    }
    return context;
}
