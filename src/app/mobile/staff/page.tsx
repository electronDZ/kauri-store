"use client";

import { useState } from "react";
import { Upload, Plus, ScanFace } from "lucide-react";
import { StaffListItem } from "@/components/mobile/StaffListItem";

interface StaffMember {
    id: string;
    name: string;
    role: "Store Manager" | "Sales Assistant";
    isActive: boolean;
}

const INITIAL_STAFF: StaffMember[] = [
    { id: "1", name: "Alice Green", role: "Store Manager", isActive: true },
    { id: "2", name: "Bob Eco", role: "Sales Assistant", isActive: false },
    { id: "3", name: "Charlie Stone", role: "Sales Assistant", isActive: false },
];

export default function StaffAccess() {
    const [activeTab, setActiveTab] = useState<"list" | "register">("list");
    const [staffList, setStaffList] = useState<StaffMember[]>(INITIAL_STAFF);
    const [newStaffName, setNewStaffName] = useState("");
    const [newStaffRole, setNewStaffRole] = useState<"Store Manager" | "Sales Assistant">("Sales Assistant");
    const [isUploading, setIsUploading] = useState(false);

    const handleToggle = (id: string, currentState: boolean) => {
        setStaffList((prev) =>
            prev.map((member) =>
                member.id === id ? { ...member, isActive: !currentState } : member
            )
        );
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newStaffName) return;

        const newMember: StaffMember = {
            id: Math.random().toString(36).substr(2, 9),
            name: newStaffName,
            role: newStaffRole,
            isActive: true,
        };

        setStaffList([...staffList, newMember]);
        setNewStaffName("");
        setActiveTab("list");
    };

    return (
        <div className="p-6 space-y-6 min-h-screen pb-24">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-heading text-foreground">Staff Access</h1>
                    <p className="text-sm text-muted-foreground">Manage Face ID Credentials</p>
                </div>
                <button
                    onClick={() => setActiveTab(activeTab === "list" ? "register" : "list")}
                    className="p-2 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
                >
                    {activeTab === "list" ? <Plus className="w-5 h-5" /> : <span className="text-xs font-bold px-2 uppercase tracking-wide">Cancel</span>}
                </button>
            </header>

            {activeTab === "register" ? (
                <form onSubmit={handleRegister} className="space-y-6 animate-in slide-in-from-right duration-300">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Full Name</label>
                            <input
                                type="text"
                                value={newStaffName}
                                onChange={(e) => setNewStaffName(e.target.value)}
                                placeholder="e.g. Jane Doe"
                                className="w-full p-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Role</label>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setNewStaffRole("Store Manager")}
                                    className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium uppercase tracking-wide transition-colors ${newStaffRole === "Store Manager" ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:bg-accent"}`}
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        Store Manager
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setNewStaffRole("Sales Assistant")}
                                    className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium uppercase tracking-wide transition-colors ${newStaffRole === "Sales Assistant" ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:bg-accent"}`}
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        Sales Assistant
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Biometric Registration</label>
                            <div className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center gap-3 bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
                                onClick={() => {
                                    setIsUploading(true);
                                    setTimeout(() => setIsUploading(false), 2000); // Simulate upload
                                }}
                            >
                                <div className={`p-4 rounded-full bg-card shadow-sm transition-transform group-hover:scale-105 ${isUploading ? "animate-pulse" : ""}`}>
                                    <ScanFace className="w-8 h-8 text-primary" />
                                </div>
                                <div className="text-center">
                                    <span className="text-sm font-medium text-foreground block uppercase tracking-wide">
                                        {isUploading ? "Scanning Face..." : "Upload Face Scan"}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {isUploading ? "Please wait" : "Tap to simulate capture"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium shadow-lg hover:bg-primary/90 transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wide"
                    >
                        Register Personnel
                    </button>
                </form>
            ) : (
                <div className="space-y-4 animate-in slide-in-from-left duration-300">
                    <div className="pb-2 border-b border-border">
                        <h2 className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">
                            Authorized Personnel
                        </h2>
                    </div>
                    <div className="space-y-2">
                        {staffList.map((member) => (
                            <StaffListItem key={member.id} member={member} onToggle={handleToggle} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
