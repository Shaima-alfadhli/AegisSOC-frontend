"use client";

import type { DashboardMetrics } from "@/lib/api";
import { ShieldAlert, Ban, Brain } from "lucide-react";
import { useT } from "@/components/providers/LocaleProvider";

function Sparkline({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values, 1);
  const w = 72;
  const h = 28;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - (v / max) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h} className="opacity-80">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        points={pts}
      />
    </svg>
  );
}

export function ThreatSummaryCards({
  m,
  peakAlerts,
}: {
  m: DashboardMetrics;
  peakAlerts: number;
}) {
  const { t } = useT();

  const cards = [
    {
      titleKey: "threats.criticalThreats",
      value: String(m.active_threats.Critical ?? 0),
      delta: "+18% " + t("metrics.fromYesterday"),
      deltaUp: true,
      icon: ShieldAlert,
      iconClass: "text-red-400 bg-red-500/15 border-red-500/25",
      spark: [2, 3, 2, 4, 5, 6, 8, 7, 9, 12],
      sparkColor: "#ef4444",
    },
    {
      titleKey: "threats.highRiskEvents",
      value: String(m.active_threats.High ?? 0),
      delta: "+12% " + t("metrics.fromYesterday"),
      deltaUp: true,
      icon: ShieldAlert,
      iconClass: "text-orange-400 bg-orange-500/15 border-orange-500/25",
      spark: [8, 10, 9, 12, 14, 16, 18, 20, 22, 28],
      sparkColor: "#f97316",
    },
    {
      titleKey: "threats.blockedAttacks",
      value: String(peakAlerts),
      delta: "+35% " + t("metrics.fromYesterday"),
      deltaUp: true,
      icon: Ban,
      iconClass: "text-sky-400 bg-sky-500/15 border-sky-500/25",
      spark: [40, 55, 60, 80, 90, 110, 130, 140, 150, 156],
      sparkColor: "#38bdf8",
    },
    {
      titleKey: "threats.aiDetectionAccuracy",
      value: `${m.ai_confidence}%`,
      delta: "+2.1% " + t("metrics.fromYesterday"),
      deltaUp: true,
      icon: Brain,
      iconClass: "text-emerald-400 bg-emerald-500/15 border-emerald-500/25",
      spark: [94, 95, 96, 96, 97, 97, 98, 98, 98, 98],
      sparkColor: "#22c55e",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.titleKey}
            className="flex min-h-[120px] flex-col rounded-2xl aegis-panel-flat p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div
                className={`grid size-9 shrink-0 place-items-center rounded-xl border ${c.iconClass}`}
              >
                <Icon className="size-4" />
              </div>
              <Sparkline values={c.spark} color={c.sparkColor} />
            </div>
            <div className="mt-3 text-xs text-white/45">{t(c.titleKey)}</div>
            <div className="mt-1 text-3xl font-semibold tracking-tight text-white">
              {c.value}
            </div>
            <div
              className={
                c.deltaUp ? "mt-1 text-xs text-red-400" : "mt-1 text-xs text-emerald-400"
              }
            >
              {c.delta}
            </div>
          </div>
        );
      })}
    </div>
  );
}
