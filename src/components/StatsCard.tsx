import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  gradient: string;
}

export const StatsCard = ({ title, value, change, icon: Icon, gradient }: StatsCardProps) => {
  const isPositive = change.startsWith('+');

  return (
    <div className="card-3d p-6 group cursor-pointer animate-float">
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "p-3 rounded-xl bg-gradient-to-br",
          gradient,
          "group-hover:scale-110 transition-transform duration-300"
        )}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          isPositive 
            ? "bg-success/20 text-success" 
            : "bg-destructive/20 text-destructive"
        )}>
          {change}
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-gradient">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      
      <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
        <div 
          className={cn("h-full bg-gradient-to-r", gradient, "animate-pulse")}
          style={{ width: "70%" }}
        />
      </div>
    </div>
  );
};