import type { ActivityItem, Incident } from "@/lib/api";
import { aiGovernanceEvents, aiPolicies } from "@/lib/data/aiGovernanceData";
import {
  actionLabels,
  buildConversationRows,
  buildNavSearchItems,
  buildReportsSearchRows,
  buildSettingsSearchRows,
  buildThreatIntelRows,
  COUNTRY_AR,
  DEPARTMENT_AR,
  INCIDENT_TITLE_AR,
  INCIDENT_TYPE_AR,
  normalizeSearchText,
  pickLocalized,
  ROLE_AR,
  severityLabels,
  statusLabels,
  verdictLabels,
} from "@/lib/data/searchBilingual";
import { demoUsers } from "@/lib/data/usersData";
import type { Locale } from "@/lib/i18n/translations";
import { labelSeverity } from "@/lib/i18n/translations";
import { enrichIncident, titleToType } from "@/lib/utils/incidentMeta";

export type SearchResultItem = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  category: string;
};

export function normalizeQuery(q: string) {
  return normalizeSearchText(q);
}

export function queryTokens(query: string): string[] {
  return normalizeQuery(query).split(/\s+/).filter(Boolean);
}

function haystack(...parts: (string | null | undefined)[]) {
  return normalizeSearchText(parts.filter(Boolean).join(" "));
}

/** Every token must appear somewhere in the combined haystack (EN + AR). */
export function textMatches(query: string, ...parts: (string | null | undefined)[]) {
  const tokens = queryTokens(query);
  if (tokens.length === 0) return true;
  const hay = haystack(...parts);
  return tokens.every((t) => hay.includes(t));
}

export function incidentSearchText(inc: Incident): string {
  const enriched = enrichIncident(inc);
  const type = titleToType[enriched.title] ?? enriched.incident_type ?? enriched.title;
  const assessment = enriched.ai_assessment;
  return [
    enriched.id,
    enriched.display_id,
    enriched.title,
    INCIDENT_TITLE_AR[enriched.title],
    type,
    INCIDENT_TYPE_AR[type],
    enriched.user,
    enriched.source_ip,
    enriched.country,
    COUNTRY_AR[enriched.country],
    enriched.city,
    enriched.severity,
    severityLabels(enriched.severity ?? ""),
    enriched.status,
    statusLabels(enriched.status ?? ""),
    enriched.ai_verdict,
    verdictLabels(enriched.ai_verdict ?? ""),
    enriched.owner,
    enriched.description,
    enriched.department,
    DEPARTMENT_AR[enriched.department ?? ""],
    enriched.role,
    ROLE_AR[enriched.role ?? ""],
    enriched.isp,
    enriched.ai_summary,
    enriched.ai_risk_level,
    String(enriched.ai_risk_score ?? ""),
    assessment?.summary,
    assessment?.interpretation,
    assessment?.analyst_note,
    assessment?.risk_level,
    severityLabels(assessment?.risk_level ?? ""),
    ...(assessment?.recommended_actions ?? []),
    enriched.secure_layer?.label,
    enriched.secure_layer?.ai_safe_preview,
    ...(enriched.secure_layer?.steps?.map((s) => `${s.name} ${s.detail}`) ?? []),
  ]
    .filter(Boolean)
    .join(" ");
}

export function activitySearchText(act: ActivityItem): string {
  return [act.id, act.kind, act.message, act.user ?? ""].filter(Boolean).join(" ");
}

export function aiEventSearchText(
  ev: (typeof aiGovernanceEvents)[number]
): string {
  return [
    ev.id,
    ev.user,
    ev.department,
    DEPARTMENT_AR[ev.department],
    ev.tool,
    ev.action,
    actionLabels(ev.action),
    ev.severity,
    severityLabels(ev.severity),
    ev.data_category,
    ev.prompt_preview,
    ev.policy_id,
    ev.policy_name,
    ev.dlp_rule ?? "",
    ev.status,
    statusLabels(ev.status),
    String(ev.risk_score),
  ].join(" ");
}

export function userSearchText(u: (typeof demoUsers)[number]): string {
  return [
    u.id,
    u.name,
    u.email,
    u.role,
    ROLE_AR[u.role],
    u.department,
    DEPARTMENT_AR[u.department],
    u.status,
    u.status === "Active" ? "نشط" : "معطل",
    u.lastLogin,
    u.mfa,
    u.mfa === "Enabled" ? "مفعّل" : "معطل",
    u.phone ?? "",
    u.location ?? "",
    u.location?.includes("Saudi") ? "السعودية" : "",
  ].join(" ");
}

export function buildSearchResults(
  query: string,
  incidents: Incident[],
  activity: ActivityItem[],
  locale: Locale = "en"
): SearchResultItem[] {
  const nq = normalizeQuery(query);
  if (!nq) return [];

  const out: SearchResultItem[] = [];

  for (const item of buildNavSearchItems()) {
    if (!textMatches(nq, item.titleEn, item.titleAr, item.subtitleEn, item.subtitleAr, item.extra)) {
      continue;
    }
    out.push({
      id: item.id,
      title: pickLocalized(item.titleEn, item.titleAr, locale),
      subtitle: pickLocalized(item.subtitleEn, item.subtitleAr, locale),
      href: item.href,
      category: item.category,
    });
  }

  for (const item of buildSettingsSearchRows()) {
    if (!textMatches(nq, item.titleEn, item.titleAr, item.subtitleEn, item.subtitleAr, item.extra)) {
      continue;
    }
    out.push({
      id: item.id,
      title: pickLocalized(item.titleEn, item.titleAr, locale),
      subtitle: pickLocalized(item.subtitleEn, item.subtitleAr, locale),
      href: item.href,
      category: "Settings",
    });
  }

  for (const item of buildThreatIntelRows()) {
    if (!textMatches(nq, item.titleEn, item.titleAr, item.subtitleEn, item.subtitleAr, item.extra)) {
      continue;
    }
    out.push({
      id: item.id,
      title: pickLocalized(item.titleEn, item.titleAr, locale),
      subtitle: pickLocalized(item.subtitleEn, item.subtitleAr, locale),
      href: item.href,
      category: "Threat Intel",
    });
  }

  for (const inc of incidents) {
    if (!textMatches(nq, incidentSearchText(inc))) continue;
    const enriched = enrichIncident(inc);
    const title =
      locale === "ar" && INCIDENT_TITLE_AR[enriched.title]
        ? INCIDENT_TITLE_AR[enriched.title]
        : enriched.title;
    out.push({
      id: `inc_${inc.id}`,
      title,
      subtitle: `${labelSeverity(locale, enriched.severity)} · ${enriched.user} · ${enriched.source_ip}`,
      href: "/incidents",
      category: "Incidents",
    });
  }

  for (const u of demoUsers) {
    if (!textMatches(nq, userSearchText(u))) continue;
    out.push({
      id: `user_${u.id}`,
      title: u.name,
      subtitle: `${locale === "ar" ? ROLE_AR[u.role] ?? u.role : u.role} · ${u.email}`,
      href: "/users",
      category: "Users",
    });
  }

  for (const r of buildReportsSearchRows()) {
    if (!textMatches(nq, r.nameEn, r.nameAr, r.typeEn, r.typeAr)) continue;
    out.push({
      id: `rpt_${r.id}`,
      title: pickLocalized(r.nameEn, r.nameAr, locale),
      subtitle: pickLocalized(r.typeEn, r.typeAr, locale),
      href: "/reports",
      category: "Reports",
    });
  }

  for (const act of activity) {
    if (!textMatches(nq, activitySearchText(act))) continue;
    out.push({
      id: `act_${act.id}`,
      title: act.message,
      subtitle: act.kind,
      href: "/threats",
      category: "Activity",
    });
  }

  for (const ev of aiGovernanceEvents) {
    if (!textMatches(nq, aiEventSearchText(ev))) continue;
    const actionLabel =
      locale === "ar"
        ? (ev.action === "Allowed" ? "مسموح" : ev.action === "Blocked" ? "محظور" : "للمراجعة")
        : ev.action;
    out.push({
      id: `aig_${ev.id}`,
      title: `${actionLabel} — ${ev.user}`,
      subtitle: `${ev.tool} · ${ev.data_category} · ${locale === "ar" ? "خطر" : "Risk"} ${ev.risk_score}`,
      href: "/ai-governance",
      category: "AI Governance",
    });
  }

  for (const pol of aiPolicies) {
    if (
      !textMatches(
        nq,
        pol.id,
        pol.name,
        pol.department,
        DEPARTMENT_AR[pol.department],
        pol.status,
        pol.status === "active" ? "نشط" : "مسودة",
        ...pol.allowed_tools,
        ...pol.blocked_tools
      )
    ) {
      continue;
    }
    out.push({
      id: `pol_${pol.id}`,
      title: pol.name,
      subtitle: `${DEPARTMENT_AR[pol.department] ?? pol.department} · ${pol.status}`,
      href: "/ai-governance",
      category: "AI Governance",
    });
  }

  for (const c of buildConversationRows()) {
    if (!textMatches(nq, c.en, c.ar)) continue;
    out.push({
      id: `chat_${c.en}`,
      title: pickLocalized(c.en, c.ar, locale),
      subtitle: locale === "ar" ? "محادثة AI" : "AI conversation",
      href: "/ai-assistant",
      category: "AI Assistant",
    });
  }

  const seen = new Set<string>();
  return out.filter((r) => {
    const key = `${r.category}:${r.title}:${r.href}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function filterIncidents(query: string, incidents: Incident[]) {
  if (!normalizeQuery(query)) return incidents;
  return incidents.filter((inc) => textMatches(query, incidentSearchText(inc)));
}

export function filterActivity(query: string, items: ActivityItem[]) {
  if (!normalizeQuery(query)) return items;
  return items.filter((act) => textMatches(query, activitySearchText(act)));
}

export function filterAiEvents<T extends (typeof aiGovernanceEvents)[number]>(
  query: string,
  events: T[]
): T[] {
  if (!normalizeQuery(query)) return events;
  return events.filter((e) => textMatches(query, aiEventSearchText(e)));
}

export function filterReports<T extends { name: string; type: string }>(
  query: string,
  items: T[]
) {
  if (!normalizeQuery(query)) return items;
  return items.filter((r) => textMatches(query, r.name, r.type));
}

export function filterUsers<T extends (typeof demoUsers)[number]>(
  query: string,
  users: T[]
): T[] {
  if (!normalizeQuery(query)) return users;
  return users.filter((u) => textMatches(query, userSearchText(u)));
}
