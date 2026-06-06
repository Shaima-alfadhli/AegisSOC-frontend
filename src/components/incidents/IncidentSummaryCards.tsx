"use client";

import { AlertTriangle, CheckCircle2, Clock, FolderOpen } from "lucide-react";
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

export function IncidentSummaryCards() {
  const { t } = useT();

  const cards = [
    {
      titleKey: "metrics.totalIncidents",
      value: "128",
      delta: "+15 " + t("metrics.fromYesterday"),
      deltaUp: true,
      icon: FolderOpen,
      iconClass: "text-cyan-300 bg-cyan-500/15 border-cyan-500/25",
      spark: [90, 95, 100, 105, 110, 118, 122, 128],
      sparkColor: "#38bdf8",
    },
    {
      titleKey: "metrics.openIncidents",
      value: "42",
      delta: "+8 " + t("metrics.fromYesterday"),
      deltaUp: true,
      icon: AlertTriangle,
      iconClass: "text-red-300 bg-red-500/15 border-red-500/25",
      spark: [28, 30, 32, 35, 36, 38, 40, 42],
      sparkColor: "#ef4444",
    },
    {
      titleKey: "metrics.resolvedIncidents",
      value: "86",
      delta: "+25 " + t("metrics.fromYesterday"),
      deltaUp: false,
      icon: CheckCircle2,
      iconClass: "text-emerald-300 bg-emerald-500/15 border-emerald-500/25",
      spark: [50, 55, 60, 65, 70, 75, 80, 86],
      sparkColor: "#22c55e",
    },
    {
      titleKey: "metrics.mttr",
      value: "02:47:18",
      delta: "-12% " + t("metrics.fromLastWeek"),
      deltaUp: false,
      icon: Clock,
      iconClass: "text-amber-300 bg-amber-500/15 border-amber-500/25",
      spark: [100, 95, 92, 88, 85, 82, 80, 78],
      sparkColor: "#f59e0b",
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
