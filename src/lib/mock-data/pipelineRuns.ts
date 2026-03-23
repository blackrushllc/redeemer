export interface PipelineRun {
  id: string;
  step: "scan" | "analyze" | "pseudo" | "diagram" | "generate";
  status: "completed" | "running" | "failed" | "pending";
  startTime: string;
  endTime?: string;
  logs: string[];
}

export const mockPipelineRuns: PipelineRun[] = [
  {
    id: "run-1",
    step: "scan",
    status: "completed",
    startTime: "2026-03-22T14:00:00Z",
    endTime: "2026-03-22T14:02:15Z",
    logs: [
      "Scanning directory: src/",
      "Detected 142 PHP files",
      "Detected 5 JS files",
      "Detected SQL schema hints in src/db/",
      "Indexing symbols...",
      "Scan complete."
    ],
  },
  {
    id: "run-2",
    step: "analyze",
    status: "completed",
    startTime: "2026-03-22T14:03:00Z",
    endTime: "2026-03-22T14:10:45Z",
    logs: [
      "Analyzing dependencies...",
      "Building call graph...",
      "Detecting issues...",
      "Found 12 security smells",
      "Found 45 dead code candidates",
      "Analysis complete."
    ],
  },
  {
    id: "run-3",
    step: "pseudo",
    status: "completed",
    startTime: "2026-03-22T14:11:00Z",
    endTime: "2026-03-22T14:15:20Z",
    logs: [
      "Building pseudo artifacts...",
      "Generating module.yaml for 5 modules",
      "Mapping source traceability...",
      "Pseudo build complete."
    ],
  },
  {
    id: "run-4",
    step: "diagram",
    status: "running",
    startTime: "2026-03-22T14:28:00Z",
    logs: [
      "Generating module graph...",
      "Generating entity relationship diagram...",
      "Processing Request Flow: Auth..."
    ],
  },
  {
    id: "run-5",
    step: "generate",
    status: "pending",
    startTime: "2026-03-22T14:28:00Z",
    logs: [],
  },
];
