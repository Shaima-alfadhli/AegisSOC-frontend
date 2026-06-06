import { translations, type Locale } from "@/lib/i18n/translations";

const en = translations.en;
const ar = translations.ar;

export const COUNTRY_AR: Record<string, string> = {
  Russia: "روسيا",
  "Saudi Arabia": "السعودية",
  Singapore: "سنغافورة",
  UAE: "الإمارات",
  Germany: "ألمانيا",
};

export const INCIDENT_TITLE_AR: Record<string, string> = {
  "Impossible Travel Login": "تسجيل دخول سفر مستحيل",
  "Multiple Failed Logins": "محاولات تسجيل دخول فاشلة متعددة",
  "Privilege Escalation": "تصعيد صلاحيات",
  "Unusual Data Download": "تنزيل بيانات غير اعتيادي",
  "New Device Login": "تسجيل دخول من جهاز جديد",
  "Malware Detected": "اكتشاف برمجيات خبيثة",
  "Suspicious API Activity": "نشاط API مشبوه",
  "Phishing Email Reported": "بلاغ بريد تصيّد",
};

export const INCIDENT_TYPE_AR: Record<string, string> = {
  Identity: "هوية",
  Authentication: "مصادقة",
  "Privilege Abuse": "إساءة صلاحيات",
  "Data Exfiltration": "تسريب بيانات",
  "Suspicious Login": "دخول مشبوه",
  Malware: "برمجيات خبيثة",
  "API Abuse": "إساءة API",
  Phishing: "تصيّد",
};

export const DEPARTMENT_AR: Record<string, string> = {
  Finance: "المالية",
  Operations: "العمليات",
  IT: "تقنية المعلومات",
  Sales: "المبيعات",
  HR: "الموارد البشرية",
  Engineering: "الهندسة",
  Legal: "القانونية",
  "Security Operations": "عمليات أمنية",
  Credit: "الائتمان",
};

export const ROLE_AR: Record<string, string> = {
  "System Administrator": "مدير نظام",
  "SOC Analyst": "محلل SOC",
  "IT Administrator": "مدير IT",
  Manager: "مدير",
  Staff: "موظف",
  Developer: "مطور",
  DevOps: "DevOps",
  Counsel: "مستشار قانوني",
  Analyst: "محلل",
};

export function normalizeSearchText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\u0640/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه");
}

export function severityLabels(severity: string): string {
  const s = severity as keyof typeof en.severity;
  return [en.severity[s], ar.severity[s]].filter(Boolean).join(" ");
}

export function statusLabels(status: string): string {
  const s = status as keyof typeof en.status;
  return [en.status[s], ar.status[s]].filter(Boolean).join(" ");
}

export function actionLabels(action: string): string {
  const a = action as keyof typeof en.action;
  return [en.action[a], ar.action[a]].filter(Boolean).join(" ");
}

export function verdictLabels(verdict: string): string {
  const v = verdict as keyof typeof en.verdict;
  return [en.verdict[v], ar.verdict[v]].filter(Boolean).join(" ");
}

export function buildNavSearchItems() {
  const keys = [
    ["nav_dash", "dashboard", "dashboardSub", "/"],
    ["nav_threats", "threats", "threatsSub", "/threats"],
    ["nav_inc", "incidents", "incidentsSub", "/incidents"],
    ["nav_aigov", "aiGovernance", "aiGovernanceSub", "/ai-governance"],
    ["nav_ai", "aiAssistant", "aiAssistantSub", "/ai-assistant"],
    ["nav_users", "users", "usersSub", "/users"],
    ["nav_reports", "reports", "reportsSub", "/reports"],
    ["nav_settings", "settings", "settingsSub", "/settings"],
  ] as const;

  return keys.map(([id, labelKey, subKey, href]) => ({
    id,
    titleEn: en.nav[labelKey],
    titleAr: ar.nav[labelKey],
    subtitleEn: en.nav[subKey],
    subtitleAr: ar.nav[subKey],
    href,
    category: "Pages",
    extra: [en.nav[labelKey], ar.nav[labelKey], en.nav[subKey], ar.nav[subKey]].join(" "),
  }));
}

export function buildReportsSearchRows() {
  return [
    { id: "r1", nameEn: en.reportsPage.reportDailySoc, nameAr: ar.reportsPage.reportDailySoc, typeEn: en.reportsPage.operational, typeAr: ar.reportsPage.operational },
    { id: "r2", nameEn: en.reportsPage.reportCriticalIncidents, nameAr: ar.reportsPage.reportCriticalIncidents, typeEn: en.reportsPage.incident, typeAr: ar.reportsPage.incident },
    { id: "r3", nameEn: en.reportsPage.reportWeeklyThreats, nameAr: ar.reportsPage.reportWeeklyThreats, typeEn: en.reportsPage.threatIntel, typeAr: ar.reportsPage.threatIntel },
    { id: "r4", nameEn: en.reportsPage.reportCompliance, nameAr: ar.reportsPage.reportCompliance, typeEn: "Compliance", typeAr: "امتثال" },
    { id: "r5", nameEn: en.reportsPage.reportAiLog, nameAr: ar.reportsPage.reportAiLog, typeEn: en.reportsPage.aiType, typeAr: ar.reportsPage.aiType },
    { id: "r6", nameEn: en.reportsPage.reportExecutive, nameAr: ar.reportsPage.reportExecutive, typeEn: "Executive", typeAr: "تنفيذي" },
  ];
}

export function buildConversationRows() {
  return [
    { en: en.aiAssistantPage.histImpossibleTravel, ar: ar.aiAssistantPage.histImpossibleTravel },
    { en: en.aiAssistantPage.histFailedLogin, ar: ar.aiAssistantPage.histFailedLogin },
    { en: en.aiAssistantPage.histPrivilege, ar: ar.aiAssistantPage.histPrivilege },
    { en: en.aiAssistantPage.histWeekly, ar: ar.aiAssistantPage.histWeekly },
    { en: "Malware endpoint quarantine", ar: "عزل برمجيات خبيثة على نقطة نهاية" },
    { en: "Phishing email investigation", ar: "تحقيق بريد تصيّد" },
    { en: "Suspicious API activity", ar: "نشاط API مشبوه" },
    { en: "Data exfiltration review", ar: "مراجعة تسريب بيانات" },
  ];
}

export function buildSettingsSearchRows() {
  return [
    {
      id: "set_profile",
      titleEn: `${en.settingsPage.profile} — Shaima`,
      titleAr: `${ar.settingsPage.profile} — Shaima`,
      subtitleEn: `${en.nav.role} · shaima@aegissoc.demo`,
      subtitleAr: `${ar.nav.role} · shaima@aegissoc.demo`,
      href: "/settings",
      extra: [en.settingsPage.profile, ar.settingsPage.profile, en.nav.role, ar.nav.role, "shaima", "riyadh", "الرياض"].join(" "),
    },
    {
      id: "set_ai",
      titleEn: en.settingsPage.aiEngine,
      titleAr: ar.settingsPage.aiEngine,
      subtitleEn: "Copilot · OpenAI · Ollama",
      subtitleAr: "Copilot · OpenAI · Ollama",
      href: "/settings",
      extra: [en.settingsPage.aiEngine, ar.settingsPage.aiEngine, "ollama", "gpt", "محرك"].join(" "),
    },
    {
      id: "set_notif",
      titleEn: en.settingsPage.notifications,
      titleAr: ar.settingsPage.notifications,
      subtitleEn: en.settingsPage.notifCritical,
      subtitleAr: ar.settingsPage.notifCritical,
      href: "/settings",
      extra: [
        en.settingsPage.notifications,
        ar.settingsPage.notifications,
        en.settingsPage.notifCritical,
        ar.settingsPage.notifCritical,
        en.settingsPage.notifCopilot,
        ar.settingsPage.notifCopilot,
        en.settingsPage.notifDaily,
        ar.settingsPage.notifDaily,
        en.settingsPage.notifLogin,
        ar.settingsPage.notifLogin,
      ].join(" "),
    },
    {
      id: "set_appearance",
      titleEn: en.settingsPage.appearance,
      titleAr: ar.settingsPage.appearance,
      subtitleEn: en.settingsPage.appearanceHint,
      subtitleAr: ar.settingsPage.appearanceHint,
      href: "/settings",
      extra: [en.settingsPage.appearance, ar.settingsPage.appearance, "dark", "داكن", "theme", "سمة"].join(" "),
    },
  ];
}

export function buildThreatIntelRows() {
  return [
    {
      id: "th_intel_1",
      titleEn: "Lateral movement detected",
      titleAr: ar.threatsPage.lateralMovement,
      subtitleEn: en.threatsPage.affectedAssets,
      subtitleAr: ar.threatsPage.affectedAssets,
      href: "/threats",
      extra: [en.threatsPage.lateralMovement, ar.threatsPage.lateralMovement, en.threatsPage.servers, ar.threatsPage.servers, "حركة", "جانبية"].join(" "),
    },
    {
      id: "th_feed_1",
      titleEn: "Brute force blocked",
      titleAr: ar.threatsPage.feedBruteForce,
      subtitleEn: en.threatsPage.liveThreatFeed,
      subtitleAr: ar.threatsPage.liveThreatFeed,
      href: "/threats",
      extra: [en.threatsPage.feedBruteForce, ar.threatsPage.feedBruteForce, "brute", "force", "تخمين", "هجوم"].join(" "),
    },
    {
      id: "th_feed_2",
      titleEn: "Malware blocked",
      titleAr: ar.threatsPage.feedMalware,
      subtitleEn: en.threatsPage.liveThreatFeed,
      subtitleAr: ar.threatsPage.liveThreatFeed,
      href: "/threats",
      extra: [en.threatsPage.feedMalware, ar.threatsPage.feedMalware, "malware", "برمجيات", "خبيثة"].join(" "),
    },
  ];
}

export function pickLocalized(titleEn: string, titleAr: string, locale: Locale) {
  return locale === "ar" ? titleAr : titleEn;
}
