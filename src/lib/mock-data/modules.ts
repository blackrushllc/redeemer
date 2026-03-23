export interface Module {
  id: string;
  name: string;
  description: string;
  riskScore: number;
  confidenceScore: number;
  filesCount: number;
  deadCodeLines: number;
  tags: string[];
}

export const mockModules: Module[] = [
  {
    id: "mod-auth",
    name: "Authentication",
    description: "PHP session-based auth, LDAP integration, user roles.",
    riskScore: 85,
    confidenceScore: 72,
    filesCount: 42,
    deadCodeLines: 1200,
    tags: ["critical", "high-risk", "PII"],
  },
  {
    id: "mod-billing",
    name: "Billing & Invoicing",
    description: "PDF generation, payment gateway integration (old Stripe API).",
    riskScore: 70,
    confidenceScore: 65,
    filesCount: 35,
    deadCodeLines: 850,
    tags: ["financial", "legacy-api"],
  },
  {
    id: "mod-reports",
    name: "Reporting Engine",
    description: "Large SQL queries, CSV exports, dynamic filters.",
    riskScore: 40,
    confidenceScore: 90,
    filesCount: 28,
    deadCodeLines: 400,
    tags: ["heavy-sql", "read-only"],
  },
  {
    id: "mod-admin",
    name: "Admin Dashboard",
    description: "User management, system configuration, logs viewer.",
    riskScore: 55,
    confidenceScore: 80,
    filesCount: 50,
    deadCodeLines: 2100,
    tags: ["internal", "low-priority"],
  },
  {
    id: "mod-jobs",
    name: "Background Jobs",
    description: "Cron-based tasks, email queue, data synchronization.",
    riskScore: 65,
    confidenceScore: 60,
    filesCount: 15,
    deadCodeLines: 300,
    tags: ["infrastructure", "unstable"],
  },
];
