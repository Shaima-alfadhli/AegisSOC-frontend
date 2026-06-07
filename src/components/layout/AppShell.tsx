"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { TopBarActions } from "@/components/layout/TopBarActions";
import { GlobalSearch } from "@/components/shared/GlobalSearch";
import { useT } from "@/components/providers/LocaleProvider";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { t } = useT();

  return (
    <div className="flex min-h-screen w-full flex-row flex-nowrap items-stretch bg-[var(--bg)] rtl:flex-row-reverse">
      <Sidebar />
      <main className="flex min-h-screen min-w-0 flex-1 flex-col">
        <div className="sticky top-0 z-40 -mx-5 border-b border-white/8 bg-[var(--bg)]/95 px-5 py-3 backdrop-blur-md lg:-mx-6 lg:px-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <GlobalSearch
              placeholder={t("common.searchAll")}
              className="min-w-0 flex-1"
              fullWidth
            />
            <TopBarActions />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-5 p-5 pb-8 lg:p-6 lg:pb-8">
          {children}
        </div>
      </main>
    </div>
  );
}
