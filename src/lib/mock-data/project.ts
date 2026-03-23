export interface Project {
  id: string;
  name: string;
  sourceRepo: string;
  workspacePath: string;
  targetStacks: string[];
  createdAt: string;
  lastAnalysis: string;
}

export const mockProject: Project = {
  id: "proj-1",
  name: "Legacy CRM & Auth System",
  sourceRepo: "/projects/legacy-php-monolith",
  workspacePath: "/projects/crm-modernization",
  targetStacks: ["NestJS", "React", "PostgreSQL"],
  createdAt: "2026-03-01T10:00:00Z",
  lastAnalysis: "2026-03-22T14:30:00Z",
};
