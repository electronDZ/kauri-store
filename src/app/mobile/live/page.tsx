"use client";

import { useMobile } from "@/app/mobile/context/MobileContext";
import { Maximize2, Video, Bot } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RobotMap() {
    const { robotStatus, customerCount, toggleCustomerSimulation, triggerMisplacedItem, addCustomers } = useMobile();
    const [isLive, setIsLive] = useState(false);

    const [patrolIndex, setPatrolIndex] = useState(0);
    const router = useRouter(); // Import useRouter

    // Patrol coordinates for the robot (using percentages to be responsive and safe)
    // New Path: Entrance -> Left Aisle -> Sneaker Wall -> Right Aisle -> Cashier Check -> Entrance
    const patrolPoints = [
        { top: "85%", left: "20%" },  // Left Wall Bottom (Women Jackets)
        { top: "50%", left: "20%" },  // Left Wall Mid
        { top: "25%", left: "20%" },  // Left Wall Top (Women Pants)
        { top: "25%", left: "50%" },  // Sneaker Wall (Center)
        { top: "25%", left: "80%" },  // Right Wall Top (Men Jackets)
        { top: "50%", left: "80%" },  // Right Wall Mid
        { top: "60%", left: "70%" },  // Cashier Check
        { top: "85%", left: "80%" },  // Right Wall Bottom (Men Pants)
        { top: "90%", left: "50%" },  // Entrance Return
    ];

    // Cycle through patrol points when in checking mode
    useState(() => {
        const interval = setInterval(() => {
            setPatrolIndex(prev => (prev + 1) % patrolPoints.length);
        }, 8000); // 8 seconds per segment
        return () => clearInterval(interval);
    });

    return (
        <div className="p-6 space-y-6 min-h-screen pb-24 relative overflow-hidden bg-background">
            <header className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                    <Bot className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <h1 className="text-2xl! font-bold font-heading text-foreground">Live</h1>
                    <p className="text-sm text-muted-foreground">Store Monitor & Control</p>
                </div>
            </header>

            {/* Map Container */}
            <div className="relative w-full aspect-[4/5] bg-card rounded-xl border border-border shadow-sm overflow-hidden p-2 group">
                {/* Floor Texture/Grid */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                </div>

                {/* Store Layout SVG */}
                <svg className="w-full h-full text-foreground/20" viewBox="0 0 400 500">
                    {/* Outer Walls */}
                    <rect x="5" y="5" width="390" height="490" fill="none" stroke="currentColor" strokeWidth="6" />

                    {/* --- TOP SECTION --- */}

                    {/* Back Stock Room */}
                    <rect x="5" y="5" width="390" height="60" fill="currentColor" fillOpacity="0.1" />
                    <text x="200" y="35" dominantBaseline="middle" textAnchor="middle" className="text-[12px] font-bold fill-muted-foreground uppercase tracking-widest">[ BACK STOCK ROOM ]</text>

                    {/* Fitting Rooms */}
                    {/* Left */}
                    <g transform="translate(5, 5)">
                        <rect width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2" />
                        <text x="30" y="25" textAnchor="middle" className="text-[10px] font-bold fill-muted-foreground">Fitting Room</text>
                        <text x="30" y="40" textAnchor="middle" className="text-[8px] font-bold fill-muted-foreground">[CURTAIN]</text>
                    </g>
                    {/* Right */}
                    <g transform="translate(335, 5)">
                        <rect width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2" />
                        <text x="30" y="25" textAnchor="middle" className="text-[10px] font-bold fill-muted-foreground">Fitting Room</text>
                        <text x="30" y="40" textAnchor="middle" className="text-[8px] font-bold fill-muted-foreground">[CURTAIN]</text>
                    </g>

                    {/* Sneaker Wall */}
                    <rect x="80" y="80" width="240" height="20" rx="2" fill="currentColor" fillOpacity="0.2" />
                    <text x="200" y="90" dominantBaseline="middle" textAnchor="middle" className="text-[10px] font-bold fill-muted-foreground">[ SNEAKER WALL ]</text>


                    {/* --- CENTER ISLANDS --- */}

                    {/* Island 3 (Top) - Guinadi */}
                    <rect x="150" y="140" width="100" height="40" rx="10" fill="currentColor" fillOpacity="0.1" />
                    <text x="200" y="160" textAnchor="middle" className="text-[9px] font-bold fill-muted-foreground">ISLAND 3</text>
                    <text x="200" y="172" textAnchor="middle" className="text-[8px] fill-muted-foreground">(Guinadi)</text>

                    {/* Island 2 (Mid) - Sacheto */}
                    <rect x="150" y="220" width="100" height="40" rx="10" fill="currentColor" fillOpacity="0.1" />
                    <text x="200" y="240" textAnchor="middle" className="text-[9px] font-bold fill-muted-foreground">ISLAND 2</text>
                    <text x="200" y="252" textAnchor="middle" className="text-[8px] fill-muted-foreground">(Sacheto/Bags)</text>

                    {/* Island 1 (Bottom) - Cosmetics */}
                    <rect x="150" y="300" width="100" height="40" rx="10" fill="currentColor" fillOpacity="0.1" />
                    <text x="200" y="320" textAnchor="middle" className="text-[9px] font-bold fill-muted-foreground">ISLAND 1</text>
                    <text x="200" y="332" textAnchor="middle" className="text-[8px] fill-muted-foreground">(Cosmetics)</text>


                    {/* --- RIGHT SIDE --- */}

                    {/* Cashier */}
                    <g transform="translate(260, 200)">
                        <rect width="30" height="80" fill="none" stroke="currentColor" strokeWidth="2" />
                        <text x="15" y="40" textAnchor="middle" transform="rotate(-90, 15, 40)" className="text-[10px] font-bold fill-muted-foreground tracking-widest">CASHIER</text>
                    </g>

                    {/* Right Wall Sections (Men) */}
                    <text x="360" y="140" textAnchor="middle" className="text-[10px] font-bold fill-muted-foreground">Men</text>
                    <text x="360" y="152" textAnchor="middle" className="text-[8px] fill-muted-foreground">JACKETS</text>

                    <text x="360" y="240" textAnchor="middle" className="text-[10px] font-bold fill-muted-foreground">Men</text>
                    <text x="360" y="252" textAnchor="middle" className="text-[8px] fill-muted-foreground">SHIRTS & KNIT</text>

                    <rect x="365" y="350" width="10" height="60" fill="currentColor" fillOpacity="0.2" />
                    <text x="350" y="370" textAnchor="middle" className="text-[10px] font-bold fill-muted-foreground">Men</text>
                    <text x="350" y="382" textAnchor="middle" className="text-[8px] fill-muted-foreground">PANTS (Racks)</text>


                    {/* --- LEFT SIDE --- */}

                    {/* Left Wall Sections (Women) */}
                    {/* Women Pants (Racks) */}
                    <rect x="25" y="140" width="10" height="60" fill="currentColor" fillOpacity="0.2" />
                    <text x="55" y="160" textAnchor="middle" className="text-[10px] font-bold fill-muted-foreground">Women</text>
                    <text x="55" y="172" textAnchor="middle" className="text-[8px] fill-muted-foreground">PANTS (Racks)</text>

                    {/* Women Shirts */}
                    <text x="55" y="240" textAnchor="middle" className="text-[10px] font-bold fill-muted-foreground">Women</text>
                    <text x="55" y="252" textAnchor="middle" className="text-[8px] fill-muted-foreground">SHIRTS & KNIT</text>

                    {/* Women Jackets */}
                    <text x="55" y="370" textAnchor="middle" className="text-[10px] font-bold fill-muted-foreground">Women</text>
                    <text x="55" y="382" textAnchor="middle" className="text-[8px] fill-muted-foreground">JACKETS</text>


                    {/* --- BOTTOM --- */}

                    {/* Main Entrance */}
                    <rect x="120" y="460" width="160" height="30" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
                    <text x="200" y="475" dominantBaseline="middle" textAnchor="middle" className="text-[12px] font-bold fill-muted-foreground uppercase tracking-widest">MAIN ENTRANCE</text>

                </svg>

                {/* Robot Marker */}
                {/* Animated with CSS transitions based on mode */}
                {/* Robot Marker */}
                {/* Animated with CSS transitions based on mode */}
                <div
                    className={`absolute w-10 h-10 rounded-full shadow-xl border-[3px] border-background flex items-center justify-center transition-all duration-[8000ms] ease-linear z-10
                        ${robotStatus === "assistant" ? "bg-amber-500 duration-1000" : robotStatus === "patrol" ? "bg-primary" : "bg-zinc-400 duration-1000"}
                    `}
                    style={{
                        top: robotStatus === "assistant" ? "80%" : robotStatus === "patrol" ? patrolPoints[patrolIndex].top : "5%",
                        left: robotStatus === "assistant" ? "50%" : robotStatus === "patrol" ? patrolPoints[patrolIndex].left : "50%"
                    }}
                >
                    <Bot className="w-5 h-5 text-white" />
                    {/* Ping Effect */}
                    <div className={`absolute -inset-2 rounded-full border-2 opacity-50 
                        ${robotStatus === "patrol" ? "border-primary animate-ping" :
                            robotStatus === "assistant" ? "border-amber-500 animate-pulse" : "hidden"}`}>
                    </div>
                    {/* Field of View Cone (Decorative) */}
                    <div className={`absolute w-24 h-24 bg-gradient-to-t from-primary/20 to-transparent -z-10 rounded-full blur-xl transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
                </div>

                {/* Labels */}

            </div>

            {/* Status Indicator */}
            <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-3 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Robot Status</span>
                        <span className="text-sm font-bold text-foreground font-heading">
                            {robotStatus === "assistant" ? "ASSISTANT MODE" : robotStatus === "patrol" ? "AUDIT PATROL" : "IDLE / STANDBY"}
                        </span>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${robotStatus === "assistant" ? "bg-amber-500" : robotStatus === "patrol" ? "bg-primary" : "bg-zinc-400"}`}></div>
                </div>

                {/* Customer Simulation Control */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground uppercase">Sensors</span>
                        <span className={`text-xs font-bold ${customerCount > 0 ? "text-amber-600" : "text-zinc-500"}`}>
                            {customerCount > 0 ? "HUMAN DETECTED" : "AREA CLEAR"}
                        </span>
                    </div>
                    <button
                        onClick={toggleCustomerSimulation}
                        className="text-[10px] px-2 py-1 bg-secondary rounded border border-input hover:bg-accent transition-colors"
                    >
                        {customerCount > 0 ? "Clear Area" : "Simulate Customer"}
                    </button>
                </div>
            </div>

            {/* Live Feed Button */}
            <button
                onClick={() => setIsLive(true)}
                className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-medium shadow-md hover:bg-primary/90 transition-all active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-wide"
            >
                <Video className="w-5 h-5" />
                Access to Live Feed
            </button>

            {/* Live Feed Modal Overlay */}
            {/* Live Feed Modal Overlay */}
            {isLive && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-0 animate-in fade-in duration-300">
                    <div className="w-full h-full flex flex-col relative bg-black">
                        {/* Feed Header */}
                        <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.6)]"></div>
                                    <span className="text-sm font-mono text-red-500 font-bold tracking-widest drop-shadow-md">LIVE REC</span>
                                </div>
                                <span className="text-xs font-mono text-white/70 mt-1">CAM-04 [ROBOT_EYE_L]</span>
                            </div>
                            <button
                                onClick={() => setIsLive(false)}
                                className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/10"
                            >
                                <Maximize2 className="w-5 h-5 rotate-45" />
                            </button>
                        </div>

                        {/* Video Content */}
                        <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-zinc-900">
                            {/* Overlay Grid */}
                            <div className="absolute inset-0 z-10 opacity-20 pointer-events-none"
                                style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                            </div>

                            {/* CRT Scanline Effect */}
                            <div className="absolute inset-0 z-10 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-50 mix-blend-overlay"></div>
                            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent via-white/5 to-transparent h-[20%] w-full animate-[scan_3s_linear_infinite] opacity-30"></div>

                            <video
                                src="/project-feed.mp4"
                                className="w-full h-full object-cover opacity-80"
                                autoPlay
                                muted
                                playsInline
                                onEnded={() => {
                                    // Sequence: Detect Human -> Log Alert -> Redirect to Dashboard
                                    triggerMisplacedItem(); // Keep alert as part of demo flow
                                    addCustomers(2); // Set count to 2
                                    setIsLive(false); // Close modal
                                    router.push("/mobile"); // Smooth transition to dashboard to see changes
                                }}
                            >
                            </video>

                            {/* Central Reticle */}
                            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                                <div className="w-64 h-64 border border-white/20 rounded-lg flex items-center justify-center relative">
                                    <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
                                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
                                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
                                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"></div>
                                </div>
                            </div>



                            <div className="absolute bottom-32 text-white/50 font-mono text-xs text-center p-4 z-10">
                                Connecting to Optical Sensors...<br />
                                <span className="text-green-400">Signal Stable (98%)</span>
                            </div>
                        </div>

                        {/* Bottom Controls */}
                        <div className="h-32 bg-black/80 backdrop-blur-lg border-t border-white/10 p-6 z-20 flex justify-between items-center">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-white/50 font-mono uppercase">Robot Status</span>
                                <span className="text-lg font-bold text-white font-heading">{robotStatus === "assistant" ? "ASSISTING" : "PATROL MODE"}</span>
                            </div>

                            <button
                                onClick={() => setIsLive(false)}
                                className="px-6 py-3 bg-white text-black text-sm font-bold rounded-full uppercase tracking-wide hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
                            >
                                Terminate Feed
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
