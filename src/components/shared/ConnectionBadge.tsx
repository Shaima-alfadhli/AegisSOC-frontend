"use client";

import { useEffect, useState } from "react";
import { pingBackend } from "@/lib/api";
import { useT } from "@/components/providers/LocaleProvider";

type ApiStatus = {
  ok: boolean;
  data_source: string;
  data_source_label: string;
  ai: { mode: string; configured: boolean };
  log_transport?: { encryption_in_transit: boolean };
};

export function ConnectionBadge() {
  const { t } = useT();
  const [status, setStatus] = useState<ApiStatus | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await pingBackend();
      if (cancelled) return;
      if (data?.ok) {
        setStatus(data);
        setError(false);
      } else {
        setError(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
        {t("connection.offline")}
      </div>
    );
  }

  if (!status) return null;

  return (
    <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-3 py-2 text-xs text-white/70">
      <span className="font-medium text-cyan-200">{t("connection.connected")}</span>
      <span className="mx-1.5 text-white/25">·</span>
      {t("connection.dataSource")}: {status.data_source_label}
      <span className="mx-1.5 text-white/25">·</span>
      AI: {status.ai.mode === "live" ? "OpenAI" : "mock"}
      {status.log_transport?.encryption_in_transit ? (
        <>
          <span className="mx-1.5 text-white/25">·</span>
          {t("connection.logsEncrypted")}
        </>
      ) : null}
    </div>
  );
}
