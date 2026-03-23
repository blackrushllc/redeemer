export interface CopilotMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  context?: string;
  suggestedActions?: string[];
}

export const mockCopilotChat: CopilotMessage[] = [
  {
    id: "m1",
    role: "assistant",
    content: "Hello! I'm your AI modernization copilot. I have context on your legacy CRM codebase. How can I help you today?",
    timestamp: "2026-03-22T14:30:00Z",
    suggestedActions: [
      "Explain the billing flow",
      "Summarize auth risks",
      "Identify dead code candidates"
    ],
  },
  {
    id: "m2",
    role: "user",
    content: "Explain the billing flow and identify the 3 riskiest assumptions.",
    timestamp: "2026-03-22T14:31:00Z",
  },
  {
    id: "m3",
    role: "assistant",
    content: `The billing flow in your legacy PHP app is primarily centered around \`src/billing/invoice_gen.php\`.

**Flow Overview:**
1. A cron job triggers the billing run.
2. It fetches all active subscriptions using a large raw SQL join.
3. For each customer, it calculates the usage and generates a PDF using a legacy library.
4. It calls the Stripe API (v2015-04-07) to process payments.

**Riskiest Assumptions:**
- **Database Consistency:** The SQL query assumes that all records in \`subscriptions\` have a matching \`customer_id\` in the \`users\` table, but there are no foreign keys in the legacy schema.
- **API Availability:** The Stripe API call is synchronous and lacks a retry mechanism. If Stripe is down, the billing run fails mid-way without recording progress.
- **Concurrency:** The billing run is not idempotent. Running it twice on the same day will double-charge customers.`,
    timestamp: "2026-03-22T14:31:15Z",
    context: "src/billing/invoice_gen.php",
    suggestedActions: [
      "Create a migration plan for Billing",
      "Draft a pseudo-artifact for idempotency",
      "Check Stripe API version compatibility"
    ],
  },
];
