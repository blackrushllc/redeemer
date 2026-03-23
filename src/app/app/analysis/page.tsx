"use client";

import { 
  ShieldAlert, 
  Zap, 
  Activity, 
  FileText,
  AlertCircle,
  TrendingDown
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { mockModules, mockIssues } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function AnalysisReports() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analysis & Reports</h1>
          <p className="text-muted-foreground mt-1">Comprehensive findings from the deep repository scan.</p>
        </div>
        <Button className="rounded-xl gap-2">
          <FileText size={16} />
          Export PDF Report
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1 bg-primary/5 border-primary/10 rounded-2xl">
          <CardContent className="p-6 space-y-4">
             <div className="space-y-1">
               <p className="text-xs font-bold text-primary uppercase tracking-wider">Overall Health</p>
               <p className="text-4xl font-black">62/100</p>
             </div>
             <Progress value={62} className="h-2 bg-primary/20" />
             <p className="text-xs text-muted-foreground leading-relaxed">
               Your codebase is in the <span className="text-primary font-bold">Caution</span> zone. High technical debt and security risks detected in Authentication and Billing modules.
             </p>
          </CardContent>
        </Card>

        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
           <Card className="bg-card/50 border-none shadow-sm rounded-2xl">
             <CardContent className="p-6 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground uppercase">Security Smells</span>
                  <ShieldAlert size={18} className="text-red-500" />
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold">12</p>
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                    <TrendingDown size={12} className="rotate-180" />
                    +4 since last scan
                  </p>
                </div>
             </CardContent>
           </Card>
           <Card className="bg-card/50 border-none shadow-sm rounded-2xl">
             <CardContent className="p-6 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground uppercase">Dead Code</span>
                  <Zap size={18} className="text-yellow-500" />
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold">18.4%</p>
                  <p className="text-xs text-green-500 flex items-center gap-1 mt-1 font-medium">
                    <TrendingDown size={12} />
                    -2.1% after cleanup
                  </p>
                </div>
             </CardContent>
           </Card>
           <Card className="bg-card/50 border-none shadow-sm rounded-2xl">
             <CardContent className="p-6 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground uppercase">Modernization Conf.</span>
                  <Activity size={18} className="text-green-500" />
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold">82%</p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">
                    High mapping accuracy
                  </p>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-card/50 border-none p-1 rounded-xl h-12">
          <TabsTrigger value="overview" className="rounded-lg px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm">Overview</TabsTrigger>
          <TabsTrigger value="modules" className="rounded-lg px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm">Modules</TabsTrigger>
          <TabsTrigger value="issues" className="rounded-lg px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm">Issues & Risks</TabsTrigger>
          <TabsTrigger value="dependencies" className="rounded-lg px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm">Dependencies</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card className="bg-card/50 border-none shadow-sm rounded-2xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">Architectural Distribution</CardTitle>
                  <CardDescription>Lines of code per functional area</CardDescription>
                </CardHeader>
                <CardContent className="pb-8">
                   <div className="space-y-4">
                      {mockModules.map((mod, i) => (
                        <div key={mod.id} className="space-y-1.5">
                           <div className="flex items-center justify-between text-xs">
                             <span className="font-medium">{mod.name}</span>
                             <span className="text-muted-foreground">{Math.round(mod.filesCount * 100 / 170)}%</span>
                           </div>
                           <Progress value={mod.filesCount * 100 / 50} className={cn("h-1.5", i === 0 ? "bg-primary/20" : "")} />
                        </div>
                      ))}
                   </div>
                </CardContent>
             </Card>

             <Card className="bg-card/50 border-none shadow-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Risk Breakdown</CardTitle>
                  <CardDescription>Primary sources of modernization risk</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-8">
                   <div className="relative w-48 h-48 rounded-full border-[12px] border-muted flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-[12px] border-primary border-t-transparent border-r-transparent rotate-[45deg]" />
                      <div className="text-center">
                         <p className="text-2xl font-black">78%</p>
                         <p className="text-[10px] uppercase font-bold text-muted-foreground">High Risk</p>
                      </div>
                   </div>
                   <div className="ml-8 space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                         <div className="w-2 h-2 rounded-full bg-primary" />
                         <span>Security Smells</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                         <div className="w-2 h-2 rounded-full bg-blue-500" />
                         <span>Complexity</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                         <div className="w-2 h-2 rounded-full bg-yellow-500" />
                         <span>Dependencies</span>
                      </div>
                   </div>
                </CardContent>
             </Card>
          </div>
        </TabsContent>

        <TabsContent value="modules" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockModules.map((mod) => (
            <Card key={mod.id} className="bg-card/50 border-none shadow-sm rounded-2xl group hover:bg-card hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-6">
                 <div className="flex items-start justify-between">
                    <div className="space-y-1">
                       <h3 className="font-bold text-lg">{mod.name}</h3>
                       <p className="text-sm text-muted-foreground line-clamp-1">{mod.description}</p>
                    </div>
                    <Badge variant={mod.riskScore > 70 ? "destructive" : "secondary"} className="rounded-lg">
                      {mod.riskScore > 70 ? "High Risk" : "Stable"}
                    </Badge>
                 </div>
                 <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase">Files</p>
                       <p className="text-sm font-bold">{mod.filesCount}</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase">Dead Code</p>
                       <p className="text-sm font-bold">{mod.deadCodeLines} LoC</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase">Confidence</p>
                       <p className="text-sm font-bold text-green-500">{mod.confidenceScore}%</p>
                    </div>
                 </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
           {mockIssues.map((issue) => (
             <Card key={issue.id} className="bg-card/50 border-none shadow-sm rounded-2xl">
               <CardContent className="p-4 flex items-start gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                    issue.severity === "critical" ? "bg-red-500/10 text-red-500" : 
                    issue.severity === "high" ? "bg-orange-500/10 text-orange-500" : "bg-blue-500/10 text-blue-500"
                  )}>
                    <AlertCircle size={20} />
                  </div>
                  <div className="flex-1 space-y-1">
                     <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm">{issue.title}</h4>
                        <Badge variant="outline" className="capitalize text-[10px]">{issue.severity}</Badge>
                     </div>
                     <p className="text-xs text-muted-foreground">{issue.description}</p>
                     <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded">{issue.location}</span>
                        <span className="text-[10px] font-bold text-primary uppercase">{issue.category}</span>
                     </div>
                  </div>
                  <Button variant="ghost" size="sm" className="rounded-lg text-[10px] h-8">View Code</Button>
               </CardContent>
             </Card>
           ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
