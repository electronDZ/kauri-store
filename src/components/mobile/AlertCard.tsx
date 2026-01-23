import { AlertTriangle, MapPin, CheckCircle, Clock } from "lucide-react";

interface AlertCardProps {
    id: string;
    type: "theft" | "misplaced" | "missing" | "warning";
    itemName: string;
    detail: string; // Time for theft, Location for misplaced
    message: string;
    actionLabel?: string;
    onResolve: (id: string) => void;
}

export function AlertCard({ id, type, itemName, detail, message, actionLabel, onResolve }: AlertCardProps) {
    const isHighPriority = type === "theft" || type === "missing" || type === "warning";

    const styles = isHighPriority
        ? {
            container: "bg-red-50/50 border-red-200 border-l-4 border-l-destructive",
            icon: "text-destructive",
            title: "text-destructive",
            text: "text-red-800",
            button: "bg-white border border-red-200 text-destructive hover:bg-red-50",
        }
        : {
            container: "bg-amber-50/50 border-amber-200 border-l-4 border-l-amber-500",
            icon: "text-amber-600",
            title: "text-amber-900",
            text: "text-amber-800",
            button: "bg-white border border-amber-200 text-amber-700 hover:bg-amber-50",
        };

    const Icon = isHighPriority ? AlertTriangle : MapPin;

    return (
        <div className={`p-4 rounded-lg border ${styles.container} shadow-sm animate-in zoom-in-95 duration-300`}>
            <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full bg-white/50 ${styles.icon}`}>
                    <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                        <h3 className={`font-medium ${styles.title}`}>{itemName}</h3>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-white/50 ${styles.text}`}>
                            {isHighPriority ? "High Priority" : "Low Priority"}
                        </span>
                    </div>

                    <p className={`text-sm ${styles.text}`}>
                        {message}
                    </p>

                    <div className={`flex items-center gap-1 text-xs ${styles.text} opacity-80 pb-2`}>
                        {isHighPriority ? <Clock className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                        {detail}
                    </div>

                    <button
                        onClick={() => onResolve(id)}
                        className={`w-full py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${styles.button}`}
                    >
                        <CheckCircle className="w-4 h-4" />
                        {actionLabel || "Mark as Resolved"}
                    </button>
                </div>
            </div>
        </div>
    );
}
