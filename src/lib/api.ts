import {
  aiGovernanceEvents,
  aiGovernanceMetrics,
  type AiGovernanceEvent,
  type AiGovernanceMetrics,
} from "@/lib/data/aiGovernanceData";

const ENV_API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const IS_STATIC_HOST = process.env.NEXT_PUBLIC_STATIC_HOST === "true";

/** Same-origin proxy in the browser — avoids CORS (see next.config rewrites). */
export const API_PROXY_BASE = "/api/backend";

const DIRECT_API_BASES = [
  ENV_API_BASE,
  "http://127.0.0.1:8011",
  "http://localhost:8011",
  "http://127.0.0.1:8010",
  "http://localhost:8010",
  "http://127.0.0.1:8000",
  "http://localhost:8000",
].filter(Boolean) as string[];

export function apiBaseCandidates(): string[] {
  if (IS_STATIC_HOST) return [];
  if (typeof window !== "undefined") {
    return [API_PROXY_BASE, ...DIRECT_API_BASES];
  }
  return [...DIRECT_API_BASES, API_PROXY_BASE];
}

export const API_BASE = DIRECT_API_BASES[0] ?? API_PROXY_BASE;

async function tryFetch(url: string, init?: RequestInit, timeoutMs = 1800) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(t);
  }
}

/** Demo data only — no backend route yet; skip network to avoid multi-second timeouts. */
const LOCAL_MOCK_PATHS = new Set([
  "/api/ai-governance/metrics",
  "/api/ai-governance/events",
]);

async function getJson<T>(path: string): Promise<T> {
  if (IS_STATIC_HOST || LOCAL_MOCK_PATHS.has(path)) {
    return mockGet<T>(path);
  }
  let lastErr: unknown = null;
  for (const base of apiBaseCandidates()) {
    try {
      const res = await tryFetch(`${base}${path}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      return (await res.json()) as T;
    } catch (e) {
      lastErr = e;
    }
  }
  // fallback for demo if backend isn't running
  return mockGet<T>(path, lastErr);
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const isCopilot = path === "/api/ai/copilot";
  if (IS_STATIC_HOST && isCopilot) {
    return mockPost<T>(path, body);
  }
  const timeoutMs = isCopilot ? 120_000 : 1800;
  let lastErr: unknown = null;
  for (const base of apiBaseCandidates()) {
    try {
      const res = await tryFetch(
        `${base}${path}`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        },
        timeoutMs
      );
      if (!res.ok) {
        const errBody = await res.text().catch(() => "");
        throw new Error(errBody || `Request failed: ${res.status}`);
      }
      return (await res.json()) as T;
    } catch (e) {
      lastErr = e;
    }
  }
  if (isCopilot) {
    throw lastErr instanceof Error ? lastErr : new Error("Copilot request failed");
  }
  return mockPost<T>(path, body, lastErr);
}

export type DashboardMetrics = {
  security_score: number;
  security_status: string;
  active_threats: Record<string, number>;
  incidents_today: number;
  incidents_delta_vs_yesterday: number;
  ai_confidence: number;
};

export type ThreatActivityPoint = {
  ts: number;
  alerts: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
};

export type SecureLayerMeta = {
  label: string;
  accepted: boolean;
  steps: { name: string; ok: boolean; detail: string }[];
  ai_safe_preview?: string;
};

export type AiCopilotResponse = {
  summary: string;
  interpretation?: string;
  risk_score: number;
  risk_level?: string;
  recommended_actions: string[];
  analyst_decision_required?: boolean;
  analyst_note?: string;
  model: string;
  provider: string;
  created_at: string;
};

export type Incident = {
  id: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  title: string;
  user: string;
  source_ip: string;
  country: string;
  minutes_ago: number;
  ai_verdict: string;
  incident_type?: string;
  status?: "Open" | "Investigating" | "Under Review" | "Resolved";
  owner?: string;
  display_id?: string;
  description?: string;
  city?: string;
  isp?: string;
  department?: string;
  role?: string;
  source_type?: "seed" | "live";
  secure_layer?: SecureLayerMeta;
  ai_assessment?: AiCopilotResponse;
  ai_assessment_status?: string;
  ai_summary?: string;
  ai_risk_score?: number;
  ai_risk_level?: string;
};

export type ActivityItem = {
  id: string;
  kind: string;
  message: string;
  user?: string | null;
  time_iso: string;
};

export type AiChatResponse = {
  reply: string;
  model: string;
  provider: string;
  created_at: string;
};

export type { AiGovernanceEvent, AiGovernanceMetrics } from "@/lib/data/aiGovernanceData";

function mockGet<T>(path: string, _err?: unknown): T {
  if (path === "/api/status") {
    return {
      ok: true,
      data_source: "mock",
      data_source_label: "GitHub Pages demo (static mock data)",
      ai: { mode: "mock", configured: false, provider: "mock", model: "mock" },
    } as T;
  }
  if (path === "/api/dashboard/metrics") {
    return {
      security_score: 94,
      security_status: "Secure",
      active_threats: { Critical: 12, High: 28, Medium: 14, Low: 27 },
      incidents_today: 25,
      incidents_delta_vs_yesterday: -6,
      ai_confidence: 98,
    } as T;
  }
  if (path === "/api/dashboard/threat-activity") {
    const base: Array<[number, number]> = [
      [0, 20],
      [1, 18],
      [2, 22],
      [3, 35],
      [4, 60],
      [5, 110],
      [6, 156],
      [7, 80],
      [8, 55],
      [9, 45],
      [10, 40],
      [11, 38],
      [12, 42],
      [13, 47],
      [14, 52],
      [15, 44],
      [16, 40],
      [17, 36],
      [18, 30],
      [19, 28],
      [20, 24],
      [21, 22],
      [22, 20],
      [23, 18],
    ];
    return base.map(([ts, alerts]) => ({
      ts,
      alerts,
      critical: Math.max(1, Math.floor(alerts / 18)),
      high: Math.max(2, Math.floor(alerts / 12)),
      medium: Math.max(3, Math.floor(alerts / 9)),
      low: Math.max(4, Math.floor(alerts / 7)),
    })) as T;
  }
  if (path === "/api/incidents") {
    return [
      {
        id: "inc_1001",
        severity: "Critical",
        title: "Impossible Travel Login",
        user: "admin.finance",
        source_ip: "185.220.101.23",
        country: "Russia",
        minutes_ago: 2,
        ai_verdict: "Malicious",
      },
      {
        id: "inc_1002",
        severity: "High",
        title: "Multiple Failed Logins",
        user: "j_alharbi",
        source_ip: "103.45.27.89",
        country: "Singapore",
        minutes_ago: 8,
        ai_verdict: "Suspicious",
      },
      {
        id: "inc_1003",
        severity: "High",
        title: "Privilege Escalation",
        user: "m_alshehri",
        source_ip: "110.15.3.4",
        country: "Saudi Arabia",
        minutes_ago: 15,
        ai_verdict: "Malicious",
      },
      {
        id: "inc_1004",
        severity: "Medium",
        title: "Unusual Data Download",
        user: "s_khalid",
        source_ip: "74.177.11.90",
        country: "UAE",
        minutes_ago: 22,
        ai_verdict: "Suspicious",
      },
      {
        id: "inc_1005",
        severity: "Medium",
        title: "New Device Login",
        user: "a_nasser",
        source_ip: "172.66.12.11",
        country: "Germany",
        minutes_ago: 35,
        ai_verdict: "Unknown",
      },
      {
        id: "inc_1006",
        severity: "High",
        title: "Malware Detected",
        user: "admin.finance",
        source_ip: "185.220.101.24",
        country: "Saudi Arabia",
        minutes_ago: 41,
        ai_verdict: "Malicious",
      },
      {
        id: "inc_1007",
        severity: "High",
        title: "Suspicious API Activity",
        user: "svc_deploy",
        source_ip: "10.12.44.8",
        country: "Saudi Arabia",
        minutes_ago: 52,
        ai_verdict: "Suspicious",
      },
      {
        id: "inc_1008",
        severity: "Low",
        title: "Phishing Email Reported",
        user: "l_ahmed",
        source_ip: "198.51.100.2",
        country: "UAE",
        minutes_ago: 68,
        ai_verdict: "Suspicious",
      },
    ] as T;
  }
  if (path === "/api/ai-governance/metrics") {
    return aiGovernanceMetrics as T;
  }
  if (path === "/api/ai-governance/events") {
    return aiGovernanceEvents as T;
  }
  if (path === "/api/activity") {
    return [
      {
        id: "act_1",
        kind: "blocked_login",
        message: "Blocked suspicious login attempt",
        user: "admin.finance",
        time_iso: "2026-05-27T12:41:00.000Z",
      },
      {
        id: "act_2",
        kind: "risk_increase",
        message: "Risk score raised for admin.finance (new risk score: 92)",
        user: "admin.finance",
        time_iso: "2026-05-27T12:37:00.000Z",
      },
      {
        id: "act_3",
        kind: "new_device",
        message: "New device detected (Windows 11 · Riyadh, Saudi Arabia)",
        user: "j_alharbi",
        time_iso: "2026-05-27T12:34:00.000Z",
      },
      {
        id: "act_4",
        kind: "malware_blocked",
        message: "Malware threat blocked",
        user: null,
        time_iso: "2026-05-27T12:31:00.000Z",
      },
      {
        id: "act_5",
        kind: "password_change",
        message: "User password changed",
        user: "j_alharbi",
        time_iso: "2026-05-27T12:25:00.000Z",
      },
    ] as T;
  }
  throw _err instanceof Error ? _err : new Error("fetch failed");
}

function mockPost<T>(path: string, body: unknown, _err?: unknown): T {
  if (path === "/api/ai/copilot") {
    const payload = body as {
      mode?: string;
      prompt?: string;
      messages?: { role: string; content: string }[];
      locale?: "en" | "ar";
    };
    const isAr = payload.locale === "ar";

    if (payload.mode === "chat" && payload.messages?.length) {
      const last = payload.messages[payload.messages.length - 1]?.content ?? "";
      const snippet = last.length > 120 ? `${last.slice(0, 120)}…` : last;
      return {
        reply: isAr
          ? `**تحليل:** ${snippet}\n\n**المخاطر:** 72/100 (مرتفع) — قرار المحلل مطلوب قبل أي إجراء حساس.\n\n**خطوات مقترحة:**\n- مراجعة سجلات المصادقة\n- التحقق من MFA\n- تصعيد إذا تكرر`
          : `**Analysis:** ${snippet}\n\n**Risk:** 72/100 (High) — analyst approval required before sensitive actions.\n\n**Suggested steps:**\n- Review authentication logs\n- Verify MFA status\n- Escalate if pattern repeats`,
        model: "mock-demo",
        provider: "aegissoc-static",
        created_at: new Date().toISOString(),
      } as T;
    }

    const prompt =
      payload.prompt ??
      payload.messages?.filter((m) => m.role === "user").pop()?.content ??
      "";
    const h = Array.from(String(prompt)).reduce((a, c) => (a * 33 + c.charCodeAt(0)) >>> 0, 5381);
    const risk = 60 + (h % 35);
    const needsAnalyst = risk >= 70;
    return {
      summary:
        "Suspicious user behavior detected. Possible credential compromise.",
      interpretation:
        "Inconsistent login geography in a short interval points to stolen credentials; correlate MFA and device trust before closure.",
      risk_score: risk,
      risk_level: risk >= 85 ? "Critical" : risk >= 70 ? "High" : "Medium",
      recommended_actions: [
        "Correlate auth logs and VPN sessions (24h)",
        "Propose session revocation — analyst approval required",
        "Open investigation if compromise is confirmed",
      ],
      analyst_decision_required: needsAnalyst,
      analyst_note: needsAnalyst
        ? "High/Critical: SOC analyst must approve freeze or production changes."
        : "Standard triage — analyst may accept AI-suggested playbook steps.",
      model: "mock",
      provider: "mock",
      created_at: new Date().toISOString(),
    } as T;
  }
  throw _err instanceof Error ? _err : new Error("fetch failed");
}

export type ApiStatus = {
  ok: boolean;
  data_source: string;
  data_source_label: string;
  ai: { mode: string; configured: boolean; provider: string; model: string };
  log_transport?: {
    encryption_in_transit: boolean;
    decrypt_at_ingest?: boolean;
    algorithm?: string;
  };
  soc_model?: { role: string; analyst_decides_high_risk?: boolean };
};

/** Ping backend (for client components). Tries proxy first, then direct URLs. */
export async function pingBackend(): Promise<ApiStatus | null> {
  if (IS_STATIC_HOST) {
    return mockGet<ApiStatus>("/api/status");
  }
  for (const base of apiBaseCandidates()) {
    try {
      const res = await tryFetch(`${base}/api/status`, { cache: "no-store" });
      if (!res.ok) continue;
      return (await res.json()) as ApiStatus;
    } catch {
      /* try next base */
    }
  }
  return null;
}

export const api = {
  status: () => getJson<ApiStatus>("/api/status"),
  metrics: () => getJson<DashboardMetrics>("/api/dashboard/metrics"),
  threatActivity: () =>
    getJson<ThreatActivityPoint[]>("/api/dashboard/threat-activity"),
  incidents: () => getJson<Incident[]>("/api/incidents"),
  activity: () => getJson<ActivityItem[]>("/api/activity"),
  aiGovernanceMetrics: () =>
    getJson<AiGovernanceMetrics>("/api/ai-governance/metrics"),
  aiGovernanceEvents: () =>
    getJson<AiGovernanceEvent[]>("/api/ai-governance/events"),
  copilot: (payload: {
    incident_id?: string | null;
    prompt: string;
    locale?: "en" | "ar";
    mode?: "analyze";
  }) => postJson<AiCopilotResponse>("/api/ai/copilot", { ...payload, mode: "analyze" }),
  chat: (payload: {
    messages: { role: "user" | "assistant"; content: string }[];
    locale?: "en" | "ar";
  }) => postJson<AiChatResponse>("/api/ai/copilot", { ...payload, mode: "chat" }),
};

