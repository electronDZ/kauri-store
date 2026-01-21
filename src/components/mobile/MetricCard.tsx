import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  status?: "safe" | "warning" | "neutral";
  icon?: LucideIcon;
  description?: string;
}

export function MetricCard({ title, value, status = "neutral", icon: Icon, description }: MetricCardProps) {
  const statusColors = {
    safe: "bg-kauri-safe/10 text-kauri-safe border-kauri-safe/20",
    warning: "bg-destructive/10 text-destructive border-destructive/20", // Use destructive for clear Red
    neutral: "bg-card text-foreground border-border",
  };

  return (
    <div className={`p-5 rounded-lg border ${statusColors[status]} flex flex-col justify-between shadow-sm transition-all hover:translate-y-[-2px] h-full`}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium opacity-80 tracking-tight font-sans uppercase">{title}</span>
          {Icon && <Icon className="w-5 h-5 opacity-80" />}
        </div>
        <div className="text-3xl font-bold tracking-tight font-heading leading-none">{value}</div>
      </div>
      {description && (
        <div className="mt-2 text-xs opacity-80 font-medium">
          {description}
        </div>
      )}
    </div>
  );
}
