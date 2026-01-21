"use client";

import { useState, useEffect } from "react";
import { MetricCard } from "@/components/mobile/MetricCard";
import { Users, ShieldCheck, Activity, UserCheck } from "lucide-react";
import { useMobile } from "@/app/mobile/context/MobileContext";

export default function MobileDashboard() {


  const { securityStatus, robotStatus, customerCount } = useMobile();

  return (
    <div className="p-4 space-y-6 animate-in fade-in duration-500">

      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-4xl! font-bold font-heading text-foreground">Store Health Monitor</h1>
        <p className="text-sm text-muted-foreground">Real-time store analytics</p>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <MetricCard
            title="Customers in Store"
            value={customerCount.toString()}
            icon={Users}
            status="neutral"
          />
        </div>
        <MetricCard
          title="Staff on Floor"
          value="1"
          icon={UserCheck}
          status="neutral"
        />
        <MetricCard
          title="Security Status"
          value={securityStatus === "warning" ? "Attention" : "Safe"}
          icon={ShieldCheck}
          status={securityStatus}
          description="Last check: 15m ago"
        />
      </div>

      {/* Robot Status Section */}
      <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-between shadow-sm">
        <h3 className="text-sm! font-medium text-foreground uppercase tracking-wide">Robot Status</h3>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${robotStatus === "assistant" ? "bg-amber-500" : "bg-kauri-sage-dark"}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${robotStatus === "assistant" ? "bg-amber-500" : "bg-kauri-sage-dark"}`}></span>
          </span>
          <span className="text-xs font-bold text-foreground">
            {robotStatus === "assistant" ? "Assisting Customer" : "Patrol Mode"}
          </span>
        </div>
      </div>

      {/* Live Feed Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-[12px]! font-semibold text-foreground uppercase tracking-wider">Live Traffic Feed</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-kauri-alert animate-pulse"></span>
              <span className="text-[8px] font-bold text-kauri-alert uppercase tracking-wider">Live</span>
            </div>
          </div>
        </div>

        {/* Graph Placeholder */}
        <div className="h-48 rounded-lg border border-dashed border-border bg-card/50 flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-primary/10 to-transparent"></div>
          {/* Detailed Traffic Graph - Past Data showing activity, dropping to 0 at "Now" */}
          <svg className="w-full h-full text-primary" viewBox="0 0 300 100" preserveAspectRatio="none">
            {/* Grid Lines */}
            <line x1="0" y1="25" x2="300" y2="25" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
            <line x1="0" y1="50" x2="300" y2="50" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
            <line x1="0" y1="75" x2="300" y2="75" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />

            {/* Time Labels */}
            <text x="10" y="95" className="text-[10px] fill-muted-foreground font-mono">9AM</text>
            <text x="100" y="95" className="text-[10px] fill-muted-foreground font-mono">1PM</text>
            <text x="200" y="95" className="text-[10px] fill-muted-foreground font-mono">5PM</text>
            <text x="280" y="95" className="text-[10px] fill-muted-foreground font-mono">NOW</text>

            {/* Curve: Activity during day (peaks) then dropping to near zero at end */}
            <path d="M0,100 L0,80 C30,70 50,40 75,30 S 120,60 150,55 S 200,20 225,25 S 270,90 300,98 V100 H0 Z"
              fill="currentColor" fillOpacity="0.2" />
            <path d="M0,80 C30,70 50,40 75,30 S 120,60 150,55 S 200,20 225,25 S 270,90 300,98"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

            {/* Current Status Indicator at the end of the line */}
            <circle cx="300" cy="98" r="3" fill="currentColor" className="animate-pulse" />

            {/* People Count Indicators at different time points */}
            {/* 9AM - 8 people */}
            <text x="10" y="75" className="text-[8px] fill-primary font-bold">👥 8</text>

            {/* ~11AM - 15 people (peak morning) */}
            <text x="75" y="25" className="text-[8px] fill-primary font-bold">👥 15</text>

            {/* 1PM - 12 people */}
            <text x="100" y="50" className="text-[8px] fill-primary font-bold">👥 12</text>

            {/* ~3PM - 18 people (peak afternoon) */}
            <text x="150" y="50" className="text-[8px] fill-primary font-bold">👥 18</text>

            {/* 5PM - 20 people (highest peak) */}
            <text x="200" y="15" className="text-[8px] fill-primary font-bold">👥 20</text>

            {/* ~6:30PM - 5 people */}
            <text x="225" y="20" className="text-[8px] fill-primary font-bold">👥 5</text>

            {/* NOW - 2 people */}
            <text x="270" y="85" className="text-[8px] fill-primary font-bold">👥 2</text>
          </svg>

        </div>
        <p className="text-[10px] text-muted-foreground text-center">
          Updated just now from Sensor Grid A
        </p>
      </div>

    </div>
  );
}
