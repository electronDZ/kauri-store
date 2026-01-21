import { BottomNav } from "@/components/mobile/BottomNav";
import { MobileProvider } from "@/app/mobile/context/MobileContext";

export default function MobileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <MobileProvider>
            <div className="min-h-screen bg-background pb-20 font-sans">
                <div className="w-full md:max-w-md md:mx-auto min-h-screen relative bg-background shadow-2xl overflow-hidden md:border-x border-border">
                    <div className="w-full bg-foreground text-primary-foreground text-[10px] font-mono text-center py-1 uppercase tracking-widest">
                        Medium Fidelity Prototype
                    </div>
                    {children}
                    <BottomNav />
                </div>
            </div>
        </MobileProvider>
    );
}
