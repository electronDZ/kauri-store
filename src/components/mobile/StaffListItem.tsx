import { User, Shield, Power, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch"; // Assuming we might need a switch, but I'll implement a simple one or use standard HTML input if ui/switch isn't available. Checking package.json... radix-ui/react-switch is available.

interface StaffMember {
    id: string;
    name: string;
    role: "Store Manager" | "Sales Assistant";
    isActive: boolean;
}

interface StaffListItemProps {
    member: StaffMember;
    onToggle: (id: string, currentState: boolean) => void;
    onRemove: (id: string) => void;
}

export function StaffListItem({ member, onToggle, onRemove }: StaffListItemProps) {
    return (
        <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${member.role === "Store Manager" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {member.role === "Store Manager" ? <Shield className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>
                <div>
                    <div className="font-medium text-foreground">{member.name}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">{member.role}</div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <span className={`text-xs font-medium uppercase tracking-wide ${member.isActive ? "text-kauri-safe" : "text-muted-foreground"}`}>
                    {member.isActive ? "Active" : "Inactive"}
                </span>
                <button
                    onClick={() => onToggle(member.id, member.isActive)}
                    className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${member.isActive ? "bg-[var(--kauri-safe)]" : "bg-input"}`}
                >
                    <span className={`w-4 h-4 rounded-full bg-white border-2 ${member.isActive ? "border-white/80 shadow-[0_2px_6px_rgba(0,0,0,0.25)]" : "border-border/60 shadow-md"} absolute transition-transform ${member.isActive ? "translate-x-7" : "translate-x-1"}`} />
                </button>
                <button
                    onClick={() => onRemove(member.id)}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
