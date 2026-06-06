export type AiEventAction = "Allowed" | "Blocked" | "Flagged";
export type AiEventSeverity = "Critical" | "High" | "Medium" | "Low";
export type AiDataCategory =
  | "PII"
  | "Financial"
  | "PCI"
  | "Credentials"
  | "Internal"
  | "Public"
  | "Shadow AI";

export type AiGovernanceEvent = {
  id: string;
  user: string;
  department: string;
  tool: string;
  action: AiEventAction;
  severity: AiEventSeverity;
  data_category: AiDataCategory;
  risk_score: number;
  minutes_ago: number;
  policy_id: string;
  policy_name: string;
  prompt_preview: string;
  dlp_rule?: string;
  status: "Open" | "Under Review" | "Resolved";
};

export type AiGovernanceMetrics = {
  ai_requests_today: number;
  requests_delta_vs_yesterday: number;
  blocked_attempts: number;
  shadow_ai_detected: number;
  compliance_rate: number;
  flagged_for_review: number;
};

export type AiPolicy = {
  id: string;
  name: string;
  status: "active" | "draft";
  department: string;
  allowed_tools: string[];
  blocked_tools: string[];
};

export const aiGovernanceMetrics: AiGovernanceMetrics = {
  ai_requests_today: 847,
  requests_delta_vs_yesterday: 12,
  blocked_attempts: 23,
  shadow_ai_detected: 7,
  compliance_rate: 97,
  flagged_for_review: 14,
};

export const aiPolicies: AiPolicy[] = [
  {
    id: "POL-001",
    name: "Finance Department AI Policy",
    status: "active",
    department: "Finance",
    allowed_tools: ["Microsoft Copilot"],
    blocked_tools: ["chatgpt.com", "claude.ai"],
  },
  {
    id: "POL-002",
    name: "Credit & Lending AI Policy",
    status: "active",
    department: "Credit",
    allowed_tools: ["Microsoft Copilot", "Internal AI"],
    blocked_tools: ["chatgpt.com", "gemini.google.com"],
  },
  {
    id: "POL-003",
    name: "SOC & IT AI Policy",
    status: "active",
    department: "Security Operations",
    allowed_tools: ["Microsoft Copilot", "Internal AI", "GitHub Copilot"],
    blocked_tools: ["chatgpt.com"],
  },
];

export const aiGovernanceEvents: AiGovernanceEvent[] = [
  {
    id: "aig_1001",
    user: "admin.finance",
    department: "Finance",
    tool: "chatgpt.com",
    action: "Blocked",
    severity: "Critical",
    data_category: "Financial",
    risk_score: 98,
    minutes_ago: 3,
    policy_id: "POL-001",
    policy_name: "Finance Department AI Policy",
    prompt_preview: "Summarize this customer account: IBAN SA0380000000608010167519…",
    dlp_rule: "DLP-IBAN",
    status: "Open",
  },
  {
    id: "aig_1002",
    user: "s_khalid",
    department: "Sales",
    tool: "Microsoft Copilot",
    action: "Allowed",
    severity: "Low",
    data_category: "Public",
    risk_score: 12,
    minutes_ago: 8,
    policy_id: "POL-001",
    policy_name: "Finance Department AI Policy",
    prompt_preview: "Draft a professional follow-up email for a banking client meeting",
    status: "Resolved",
  },
  {
    id: "aig_1003",
    user: "m_alshehri",
    department: "IT",
    tool: "claude.ai",
    action: "Blocked",
    severity: "High",
    data_category: "Shadow AI",
    risk_score: 85,
    minutes_ago: 14,
    policy_id: "POL-003",
    policy_name: "SOC & IT AI Policy",
    prompt_preview: "Review this API integration code and suggest improvements…",
    dlp_rule: "TOOL-DENY",
    status: "Under Review",
  },
  {
    id: "aig_1004",
    user: "j_alharbi",
    department: "Security Operations",
    tool: "Internal AI",
    action: "Allowed",
    severity: "Low",
    data_category: "Internal",
    risk_score: 18,
    minutes_ago: 19,
    policy_id: "POL-003",
    policy_name: "SOC & IT AI Policy",
    prompt_preview: "Summarize last week's failed login trends by region",
    status: "Resolved",
  },
  {
    id: "aig_1005",
    user: "a_nasser",
    department: "HR",
    tool: "Microsoft Copilot",
    action: "Flagged",
    severity: "High",
    data_category: "PII",
    risk_score: 72,
    minutes_ago: 27,
    policy_id: "POL-001",
    policy_name: "Finance Department AI Policy",
    prompt_preview: "Employee record review — National ID 1023456789, salary band…",
    dlp_rule: "DLP-NID",
    status: "Under Review",
  },
  {
    id: "aig_1006",
    user: "svc_deploy",
    department: "Engineering",
    tool: "GitHub Copilot",
    action: "Blocked",
    severity: "Critical",
    data_category: "Credentials",
    risk_score: 96,
    minutes_ago: 34,
    policy_id: "POL-003",
    policy_name: "SOC & IT AI Policy",
    prompt_preview: "Fix auth — API_KEY=sk-live-4eC39HqLyjWDarjt…",
    dlp_rule: "DLP-API-KEY",
    status: "Open",
  },
  {
    id: "aig_1007",
    user: "admin.finance",
    department: "Finance",
    tool: "Microsoft Copilot",
    action: "Blocked",
    severity: "Critical",
    data_category: "PCI",
    risk_score: 99,
    minutes_ago: 41,
    policy_id: "POL-001",
    policy_name: "Finance Department AI Policy",
    prompt_preview: "Validate card: 4532 1488 0343 6467, expiry 09/27…",
    dlp_rule: "DLP-PAN",
    status: "Open",
  },
  {
    id: "aig_1008",
    user: "s_khalid",
    department: "Sales",
    tool: "gemini.google.com",
    action: "Blocked",
    severity: "High",
    data_category: "Shadow AI",
    risk_score: 78,
    minutes_ago: 52,
    policy_id: "POL-001",
    policy_name: "Finance Department AI Policy",
    prompt_preview: "Create a product comparison for our premium banking packages",
    dlp_rule: "TOOL-DENY",
    status: "Under Review",
  },
];
