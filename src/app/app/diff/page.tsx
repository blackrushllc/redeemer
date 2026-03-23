"use client";

import { useState } from "react";
import { 
  FileDiff, 
  Filter, 
  CheckCircle2, 
  AlertCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function DiffReview() {
  const [selectedDiff, setSelectedDiff] = useState("auth-module");

  const diffs = [
    { id: "auth-module", title: "Auth Module Definition", type: "pseudo", date: "2 mins ago", author: "AI Copilot" },
    { id: "login-flow", title: "Login Flow Logic", type: "pseudo", date: "1 hour ago", author: "John Doe" },
    { id: "db-schema", title: "Database Entity Mapping", type: "diagram", date: "3 hours ago", author: "AI Copilot" },
  ];

  return (
    <div className="h-full flex flex-col gap-4 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Diff & Review</h1>
          <p className="text-sm text-muted-foreground">Compare versions of pseudo-artifacts, diagrams, and generated code.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" className="rounded-xl gap-2">
             <Filter size={14} />
             <span>Filter Changes</span>
           </Button>
           <Button size="sm" className="rounded-xl bg-primary hover:bg-primary/90 gap-2">
             <CheckCircle2 size={14} />
             <span>Approve All Changes</span>
           </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Change List */}
        <Card className="w-80 bg-card/50 border-none shadow-sm overflow-hidden flex flex-col shrink-0">
           <div className="h-12 border-b flex items-center px-4 shrink-0 font-bold text-xs uppercase tracking-wider text-muted-foreground">
             Recent Changes
           </div>
           <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                 {diffs.map((diff) => (
                   <button
                    key={diff.id}
                    onClick={() => setSelectedDiff(diff.id)}
                    className={cn(
                      "w-full p-3 rounded-xl text-left transition-all group",
                      selectedDiff === diff.id ? "bg-primary/10 border-primary/20" : "hover:bg-muted/50"
                    )}
                   >
                      <div className="flex items-center justify-between mb-1">
                         <Badge variant="outline" className="text-[9px] uppercase font-bold py-0 h-4">{diff.type}</Badge>
                         <span className="text-[10px] text-muted-foreground">{diff.date}</span>
                      </div>
                      <p className="text-xs font-bold truncate group-hover:text-primary transition-colors">{diff.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">By {diff.author}</p>
                   </button>
                 ))}
              </div>
           </ScrollArea>
        </Card>

        {/* Diff View */}
        <Card className="flex-1 bg-card/50 border-none shadow-sm overflow-hidden flex flex-col">
           <div className="h-12 border-b flex items-center justify-between px-4 bg-muted/20 shrink-0">
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                    <FileDiff size={16} className="text-primary" />
                    <span className="text-sm font-bold">Comparing: v0.8.2 vs v0.9.0</span>
                 </div>
                 <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-[10px]">+14 -2 lines</Badge>
              </div>
              <div className="flex items-center gap-2">
                 <Button variant="ghost" size="sm" className="h-8 text-[11px] rounded-lg">View Side-by-Side</Button>
                 <Button variant="ghost" size="sm" className="h-8 text-[11px] rounded-lg">Unified</Button>
              </div>
           </div>
           
           <div className="flex-1 flex overflow-hidden">
              <div className="flex-1 border-r flex flex-col">
                 <div className="h-8 bg-muted/30 border-b flex items-center px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Base (v0.8.2)</div>
                 <ScrollArea className="flex-1 p-4 font-mono text-xs leading-relaxed bg-slate-950/50">
                    <div className="space-y-0.5">
                       <p className="text-slate-500">1  name: Authentication</p>
                       <p className="text-slate-500">2  id: auth</p>
                       <p className="text-slate-500">3  description: Handles user login and sessions.</p>
                       <p className="bg-red-500/10 text-red-400 border-l-2 border-red-500 -mx-4 px-4">4 -dependencies: []</p>
                       <p className="text-slate-500">5  interfaces:</p>
                       <p className="text-slate-500">6    - login(username, password)</p>
                       <p className="text-slate-500">7    - logout()</p>
                    </div>
                 </ScrollArea>
              </div>
              <div className="flex-1 flex flex-col">
                 <div className="h-8 bg-muted/30 border-b flex items-center px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Head (v0.9.0)</div>
                 <ScrollArea className="flex-1 p-4 font-mono text-xs leading-relaxed bg-slate-950/50">
                    <div className="space-y-0.5">
                       <p className="text-slate-500">1  name: Authentication</p>
                       <p className="text-slate-500">2  id: auth</p>
                       <p className="text-slate-500">3  description: Handles user login and sessions.</p>
                       <p className="bg-green-500/10 text-green-400 border-l-2 border-green-500 -mx-4 px-4">4 +dependencies:</p>
                       <p className="bg-green-500/10 text-green-400 border-l-2 border-green-500 -mx-4 px-4">5 +  - database</p>
                       <p className="bg-green-500/10 text-green-400 border-l-2 border-green-500 -mx-4 px-4">6 +  - config</p>
                       <p className="text-slate-500">7  interfaces:</p>
                       <p className="text-slate-500">8    - login(username, password)</p>
                       <p className="text-slate-500">9    - logout()</p>
                       <p className="bg-green-500/10 text-green-400 border-l-2 border-green-500 -mx-4 px-4">10+    - check_session()</p>
                    </div>
                 </ScrollArea>
              </div>
           </div>

           <div className="h-16 border-t p-4 flex items-center justify-between shrink-0 bg-background/50">
              <div className="flex items-center gap-2 text-xs text-muted-foreground italic">
                 <AlertCircle size={14} className="text-primary" />
                 This change was suggested by AI to improve traceability.
              </div>
              <div className="flex items-center gap-2">
                 <Button variant="outline" size="sm" className="rounded-lg h-9">Reject</Button>
                 <Button size="sm" className="rounded-lg h-9 bg-green-600 hover:bg-green-700">Approve Change</Button>
              </div>
           </div>
        </Card>
      </div>
    </div>
  );
}
