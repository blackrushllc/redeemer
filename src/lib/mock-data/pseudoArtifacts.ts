export interface PseudoArtifact {
  id: string;
  name: string;
  type: "module" | "flow" | "entity" | "decision";
  path: string;
  content: string;
  format: "markdown" | "yaml";
  sourceFiles: string[];
  confidence: number;
  status: "draft" | "reviewed" | "approved" | "uncertain";
  issues?: string[];
  modernizationNotes?: string;
}

export const mockPseudoArtifacts: PseudoArtifact[] = [
  {
    id: "ps-auth-mod",
    name: "Auth Module",
    type: "module",
    path: "pseudo/modules/auth/module.yaml",
    format: "yaml",
    sourceFiles: ["src/auth/login.php", "src/auth/session.php"],
    confidence: 0.85,
    status: "reviewed",
    content: `name: Authentication
id: auth
description: Handles user login, session management, and role-based access control.
dependencies:
  - database
  - config
interfaces:
  - login(username, password)
  - logout()
  - check_session()
entities:
  - User
  - Role
  - Session`,
    modernizationNotes: "Recommend switching to JWT-based authentication for better scalability and security.",
  },
  {
    id: "ps-login-flow",
    name: "Login Flow",
    type: "flow",
    path: "pseudo/modules/auth/flows/login.flow.md",
    format: "markdown",
    sourceFiles: ["src/auth/login.php"],
    confidence: 0.72,
    status: "uncertain",
    issues: ["SQL injection in legacy code", "MD5 hashing used"],
    content: `# Login Flow
1. User provides credentials.
2. System validates credentials against database (Legacy uses MD5).
3. If valid, system starts a PHP session.
4. User is redirected to dashboard.

## Security Observations
- Input is not sanitized (SQLi risk).
- Password hashing is obsolete.
- Session is stored on server disk.`,
  },
];
