"use client";

import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { UserMenuDropdown } from "@/components/shared/UserMenuDropdown";
import { useT } from "@/components/providers/LocaleProvider";
import { Bell } from "lucide-react";

export function TopBarActions({ notificationCount = 6 }: { notificationCount?: number }) {
  const { t } = useT();

  return (
    <div className="flex shrink-0 items-center gap-2 sm:gap-3">
      <LanguageToggle compact />

      <button
        type="button"
        className="relative grid size-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/5"
        aria-label={t("common.notifications")}
      >
        <Bell className="size-4 text-white/70" />
        <span className="absolute -end-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
          {notificationCount}
        </span>
      </button>

      <div className="flex h-10 shrink-0 items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 text-sm text-emerald-100">
        <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
        {t("common.aiActive")}
      </div>

      <UserMenuDropdown />
    </div>
  );
}
