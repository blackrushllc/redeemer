export interface Issue {
  id: string;
  title: string;
  category: "security" | "dead-code" | "performance" | "maintainability";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  location: string;
  module?: string;
}

export const mockIssues: Issue[] = [
  {
    id: "iss-1",
    title: "SQL Injection Risk in Login",
    category: "security",
    severity: "critical",
    description: "User input is directly interpolated into SQL query without sanitization or prepared statements.",
    location: "src/auth/login.php:12",
    module: "Authentication",
  },
  {
    id: "iss-2",
    title: "Obsolete Password Hashing (MD5)",
    category: "security",
    severity: "high",
    description: "MD5 is cryptographically broken and should not be used for password storage.",
    location: "src/auth/login.php:9",
    module: "Authentication",
  },
  {
    id: "iss-3",
    title: "Unused Helper Function `format_date_old`",
    category: "dead-code",
    severity: "low",
    description: "This function is defined but not called anywhere in the codebase.",
    location: "src/utils/date_helpers.php:45",
    module: "Admin Dashboard",
  },
];
