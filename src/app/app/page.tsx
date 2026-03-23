"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  AlertTriangle, 
  Zap, 
  FileCode, 
  Layers, 
  Target, 
  History, 
  Clock,
  CheckCircle2,
  Circle,
  Activity,
  Terminal as TerminalIcon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { mockProject, mockModules, mockIssues, mockPipelineRuns } from "@/lib/mock-data";

export default function Dashboard() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const stats = [
    { label: "Detected Languages", value: "PHP, SQL, JS", icon: FileCode, color: "text-blue-500" },
    { label: "Risk Score", value: "78/100", icon: AlertTriangle, color: "text-red-500" },
    { label: "Dead Code Count", value: "4,850 lines", icon: Zap, color: "text-yellow-500" },
    { label: "Issue Count", value: "84 findings", icon: Target, color: "text-orange-500" },
    { label: "Modules Discovered", value: "5 modules", icon: Layers, color: "text-primary" },
    { label: "AI Confidence Level", value: "82%", icon: BarChart3, color: "text-green-500" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Project Overview</h1>
        <p className="text-muted-foreground mt-1">{mockProject.name} — Last analysis run {new Date(mockProject.lastAnalysis).toLocaleString()}</p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {stats.map((stat, i) => (
          <motion.div key={i} variants={item}>
            <Card className="rounded-2xl border-none bg-card/50 shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-background border flex items-center justify-center ${stat.color} shadow-inner`}>
                  <stat.icon size={24} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Status */}
        <Card className="lg:col-span-2 rounded-2xl border-none bg-card/50 shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Activity size={18} className="text-primary" />
              Pipeline Status
            </CardTitle>
            <Badge variant="outline" className="animate-pulse bg-primary/5 text-primary border-primary/20">Live</Badge>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative">
              <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-muted/50 -z-10" />
              <div className="space-y-8">
                {mockPipelineRuns.map((run, i) => (
                  <div key={run.id} className="flex gap-4">
                    <div className="relative mt-1">
                      {run.status === "completed" ? (
                        <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/50 flex items-center justify-center text-green-500">
                          <CheckCircle2 size={16} />
                        </div>
                      ) : run.status === "running" ? (
                        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/50 flex items-center justify-center text-primary animate-spin">
                          <Activity size={16} />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-muted border flex items-center justify-center text-muted-foreground">
                          <Circle size={16} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-bold capitalize">{run.step} Step</p>
                        <span className="text-[10px] font-mono text-muted-foreground">{run.startTime.split('T')[1].substring(0, 5)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <Progress value={run.status === "completed" ? 100 : run.status === "running" ? 65 : 0} className="h-1" />
                         <span className="text-[10px] font-medium text-muted-foreground uppercase">{run.status}</span>
                      </div>
                      {run.logs.length > 0 && (
                        <div className="mt-2 bg-slate-950 rounded-lg p-3 font-mono text-[11px] text-slate-400 space-y-1">
                          {run.logs.slice(-2).map((log, li) => (
                            <div key={li} className="flex gap-2">
                              <span className="text-slate-600">[{run.step}]</span>
                              <span>{log}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Terminal / Recent Activity */}
        <Card className="rounded-2xl border-none bg-slate-950 shadow-2xl overflow-hidden flex flex-col">
          <div className="h-10 bg-slate-900 flex items-center px-4 justify-between border-b border-slate-800">
             <div className="flex items-center gap-2">
               <TerminalIcon size={14} className="text-slate-500" />
               <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Terminal Output</span>
             </div>
             <div className="flex gap-1">
               <div className="w-2 h-2 rounded-full bg-slate-700" />
               <div className="w-2 h-2 rounded-full bg-slate-700" />
               <div className="w-2 h-2 rounded-full bg-slate-700" />
             </div>
          </div>
          <ScrollArea className="flex-1 p-4 font-mono text-[11px] leading-relaxed">
            <div className="space-y-1">
              <div className="text-slate-500">[2026-03-22 14:00:01] INFO bidi scan initiated...</div>
              <div className="text-slate-500">[2026-03-22 14:02:15] SUCCESS Scan complete. 147 files indexed.</div>
              <div className="text-slate-500">[2026-03-22 14:03:00] INFO Analyzing modules...</div>
              <div className="text-red-400">[2026-03-22 14:04:12] WARN Potential SQLi detected in src/auth/login.php</div>
              <div className="text-yellow-400">[2026-03-22 14:05:45] WARN Unused function format_date_old found.</div>
              <div className="text-slate-300 animate-pulse">$ bidi diagrams build --from pseudo</div>
              <div className="text-slate-500">[2026-03-22 14:28:10] RUN Generating module graph...</div>
              <div className="text-slate-500">[2026-03-22 14:28:35] RUN Generating entity relationship diagram...</div>
              <div className="text-slate-500">[2026-03-22 14:28:55] RUN Processing Request Flow: Auth...</div>
              <div className="mt-4 flex gap-2">
                <span className="text-primary tracking-tighter">➜</span>
                <span className="text-slate-300">_</span>
              </div>
            </div>
          </ScrollArea>
        </Card>
      </div>
      
      {/* Risk Hotspots placeholder */}
      <Card className="rounded-2xl border-none bg-card/50 shadow-sm p-6">
         <CardHeader className="px-0 pt-0 pb-4">
            <CardTitle className="text-lg font-bold">Module Risk Hotspots</CardTitle>
         </CardHeader>
         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {mockModules.map((mod) => (
              <div key={mod.id} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium truncate">{mod.name}</span>
                  <span className={cn(
                    "font-bold",
                    mod.riskScore > 80 ? "text-red-500" : mod.riskScore > 60 ? "text-orange-500" : "text-green-500"
                  )}>{mod.riskScore}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      mod.riskScore > 80 ? "bg-red-500" : mod.riskScore > 60 ? "bg-orange-500" : "bg-green-500"
                    )}
                    style={{ width: `${mod.riskScore}%` }}
                  />
                </div>
              </div>
            ))}
         </div>
      </Card>
    </div>
  );
}

