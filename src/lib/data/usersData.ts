export type UserRecord = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "Active" | "Disabled";
  lastLogin: string;
  mfa: "Enabled" | "Disabled";
  avatarInitials: string;
  phone?: string;
  location?: string;
};

export const demoUsers: UserRecord[] = [
  {
    id: "u1",
    name: "admin.finance",
    email: "admin.finance@aegissoc.demo",
    role: "System Administrator",
    department: "Finance",
    status: "Active",
    lastLogin: "2 min ago",
    mfa: "Enabled",
    avatarInitials: "AF",
    phone: "+966 50 000 0001",
    location: "Riyadh, Saudi Arabia",
  },
  {
    id: "u2",
    name: "Shaima",
    email: "shaima@aegissoc.demo",
    role: "SOC Analyst",
    department: "Security Operations",
    status: "Active",
    lastLogin: "Online",
    mfa: "Enabled",
    avatarInitials: "SH",
    phone: "+966 55 000 0002",
    location: "Riyadh, Saudi Arabia",
  },
  {
    id: "u3",
    name: "j_alharbi",
    email: "j.alharbi@aegissoc.demo",
    role: "SOC Analyst",
    department: "Security Operations",
    status: "Active",
    lastLogin: "15 min ago",
    mfa: "Enabled",
    avatarInitials: "JA",
  },
  {
    id: "u4",
    name: "m_alshehri",
    email: "m.alshehri@aegissoc.demo",
    role: "IT Administrator",
    department: "IT",
    status: "Active",
    lastLogin: "1 hr ago",
    mfa: "Enabled",
    avatarInitials: "MA",
  },
  {
    id: "u5",
    name: "s_khalid",
    email: "s.khalid@aegissoc.demo",
    role: "Manager",
    department: "Sales",
    status: "Active",
    lastLogin: "3 hr ago",
    mfa: "Disabled",
    avatarInitials: "SK",
  },
  {
    id: "u6",
    name: "a_nasser",
    email: "a.nasser@aegissoc.demo",
    role: "Staff",
    department: "HR",
    status: "Active",
    lastLogin: "5 hr ago",
    mfa: "Enabled",
    avatarInitials: "AN",
  },
  {
    id: "u7",
    name: "svc_deploy",
    email: "svc.deploy@aegissoc.demo",
    role: "Service Account",
    department: "Engineering",
    status: "Active",
    lastLogin: "12 hr ago",
    mfa: "Disabled",
    avatarInitials: "SD",
  },
  {
    id: "u8",
    name: "legacy_api",
    email: "legacy.api@aegissoc.demo",
    role: "API User",
    department: "Engineering",
    status: "Disabled",
    lastLogin: "30 days ago",
    mfa: "Disabled",
    avatarInitials: "LA",
  },
];
