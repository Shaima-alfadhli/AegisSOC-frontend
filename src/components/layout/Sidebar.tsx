"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { useT } from "@/components/providers/LocaleProvider";
import {
  Bot,
  BrainCircuit,
  Home,
  ShieldAlert,
  Siren,
  Users,
  FileText,
  Settings,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useT();

  const items = [
    { icon: Home, label: t("nav.dashboard"), href: "/" },
    { icon: ShieldAlert, label: t("nav.threats"), href: "/threats" },
    { icon: Siren, label: t("nav.incidents"), href: "/incidents" },
    { icon: BrainCircuit, label: t("nav.aiGovernance"), href: "/ai-governance" },
    { icon: Bot, label: t("nav.aiAssistant"), href: "/ai-assistant" },
    { icon: Users, label: t("nav.users"), href: "/users" },
    { icon: FileText, label: t("nav.reports"), href: "/reports" },
    { icon: Settings, label: t("nav.settings"), href: "/settings" },
  ];

  return (
    <aside className="aegis-sidebar hidden shrink-0 grow-0 lg:flex lg:w-[248px] lg:flex-col lg:bg-black/20">
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl">
          <Image
            src="/brand/aegissoc-logo.png"
            alt="AegisSOC"
            width={40}
            height={40}
            priority
            className="object-contain"
          />
        </div>
        <div className="font-semibold tracking-tight text-white">AegisSOC</div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {items.map(({ icon: Icon, label, href }) => {
          const active =
            href === "/" ? pathname === "/" : pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start text-sm transition",
                active
                  ? "border border-cyan-400/25 bg-cyan-400/15 ps-4 text-white shadow-[inset_0_0_20px_rgba(59,231,255,0.08)]"
                  : "border border-transparent text-white/65 hover:bg-white/5 hover:text-white"
              )}
            >
              {active ? (
                <span className="absolute start-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-e-full bg-cyan-400" />
              ) : null}
              <Icon
                className={cn("size-4 shrink-0", active ? "text-cyan-300" : "")}
              />
              <span className="truncate">{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 pb-6 pt-2">
        <div className="flex items-center gap-3 rounded-2xl aegis-panel-flat px-3 py-3">
          <Image
            src="/avatars/shaima.png"
            alt="Shaima"
            width={40}
            height={40}
            className="size-10 shrink-0 rounded-full object-cover object-top ring-2 ring-white/10"
          />
          <div className="min-w-0 flex-1 text-start">
            <div className="truncate text-sm font-medium">Shaima</div>
            <div className="text-xs text-white/50">{t("nav.role")}</div>
            <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              {t("common.online")}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
