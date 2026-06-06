import type { Incident } from "@/lib/api";
import { cn } from "@/lib/utils/cn";

export type SeverityLevel = Incident["severity"];

/** Badge/pill in tables and panels */
export function severityBadgeClass(severity: SeverityLevel): string {
  if (severity === "Critical")
    return "bg-red-500/20 text-red-200 border-red-500/30";
  if (severity === "High")
    return "bg-orange-500/20 text-orange-100 border-orange-500/35";
  if (severity === "Medium")
    return "bg-yellow-500/20 text-yellow-100 border-yellow-500/35";
  return "bg-white/10 text-white/70 border-white/15";
}

/** Small dot indicators */
export function severityDotClass(severity: SeverityLevel): string {
  if (severity === "Critical") return "bg-red-500";
  if (severity === "High") return "bg-orange-500";
  if (severity === "Medium") return "bg-yellow-400";
  return "bg-sky-400/80";
}

export const severitySparkColors: Record<SeverityLevel, string> = {
  Critical: "#ef4444",
  High: "#f97316",
  Medium: "#eab308",
  Low: "#38bdf8",
};

export function severitySummaryIconClass(severity: SeverityLevel): string {
  if (severity === "Critical")
    return "text-red-400 bg-red-500/15 border-red-500/25";
  if (severity === "High")
    return "text-orange-400 bg-orange-500/15 border-orange-500/25";
  if (severity === "Medium")
    return "text-yellow-400 bg-yellow-500/15 border-yellow-500/25";
  return "text-sky-400 bg-sky-500/15 border-sky-500/25";
}

export function severityBadge(severity: SeverityLevel, className?: string) {
  return cn(
    "inline-flex rounded-md border px-2 py-0.5 text-xs font-medium",
    severityBadgeClass(severity),
    className
  );
}
