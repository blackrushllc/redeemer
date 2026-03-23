"use client";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { AICopilot } from "./AICopilot";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 bg-muted/20">
            {children}
          </div>
          <AICopilot />
        </main>
      </div>
    </div>
  );
}
