"use client";

import { useState } from "react";
import { 
  FileCode2, 
  ChevronRight, 
  ChevronDown, 
  FileText, 
  Code2, 
  History,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Split,
  Plus,
  ArrowUpRight,
  Eye,
  FileJson
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { mockPseudoArtifacts, PseudoArtifact } from "@/lib/mock-data";

export default function PseudoExplorer() {
  const [selectedArtifact, setSelectedArtifact] = useState<PseudoArtifact | null>(mockPseudoArtifacts[0]);
  const [viewMode, setViewMode] = useState<"rendered" | "raw">("raw");

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pseudo-Project Editor</h1>
          <p className="text-sm text-muted-foreground">Edit the intermediate representation of your legacy code.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" className="rounded-xl gap-2">
             <History size={14} />
             <span>Versions</span>
           </Button>
           <Button variant="default" size="sm" className="rounded-xl gap-2">
             <CheckCircle size={14} />
             <span>Validate All</span>
           </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* Left: Artifact Tree */}
        <Card className="w-72 flex flex-col bg-card/50 border-none shadow-sm overflow-hidden">
          <div className="p-3 border-b flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Pseudo Files</span>
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md"><Plus size={14} /></Button>
          </div>
          <ScrollArea className="flex-1 p-2">
            <div className="space-y-1">
               <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-bold text-muted-foreground">
                  <ChevronDown size={14} />
                  <span>modules</span>
               </div>
               <div className="ml-4 space-y-1">
                  <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-bold text-muted-foreground">
                    <ChevronDown size={14} />
                    <span>auth</span>
                  </div>
                  <div className="ml-4 space-y-1">
                    {mockPseudoArtifacts.map((art) => (
                      <button
                        key={art.id}
                        onClick={() => setSelectedArtifact(art)}
                        className={cn(
                          "flex items-center gap-2 w-full px-2 py-1.5 text-xs rounded-lg transition-colors text-left",
                          selectedArtifact?.id === art.id ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/50 text-muted-foreground"
                        )}
                      >
                        {art.format === "yaml" ? <FileJson size={14} /> : <FileText size={14} />}
                        <span className="truncate">{art.name}</span>
                        {art.status === "uncertain" && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-yellow-500" />
                        )}
                      </button>
                    ))}
                  </div>
               </div>
            </div>
          </ScrollArea>
        </Card>

        {/* Center: Editor */}
        <Card className="flex-1 bg-card/50 border-none shadow-sm overflow-hidden flex flex-col">
          <div className="h-12 border-b flex items-center justify-between px-4 bg-muted/20">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FileCode2 size={16} className="text-primary" />
                <span className="text-sm font-mono">{selectedArtifact?.path}</span>
              </div>
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "rendered" | "raw")}>
                <TabsList className="h-8 p-0.5 bg-background/50">
                  <TabsTrigger value="raw" className="h-7 text-[10px] px-3">Editor</TabsTrigger>
                  <TabsTrigger value="rendered" className="h-7 text-[10px] px-3">Rendered</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 text-[11px] rounded-lg gap-1.5 text-yellow-500 hover:text-yellow-600 hover:bg-yellow-500/10">
                <AlertCircle size={14} />
                <span>Mark Uncertain</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 text-[11px] rounded-lg gap-1.5">
                <Split size={14} />
                <span>Split Module</span>
              </Button>
              <Button size="sm" className="h-8 text-[11px] rounded-lg bg-green-600 hover:bg-green-700">Approve</Button>
            </div>
          </div>
          <div className="flex-1 min-h-0 bg-slate-950">
            {viewMode === "raw" ? (
              <Editor
                height="100%"
                defaultLanguage={selectedArtifact?.format === "yaml" ? "yaml" : "markdown"}
                theme="vs-dark"
                value={selectedArtifact?.content || ""}
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  fontFamily: "var(--font-mono)",
                  padding: { top: 20 },
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                }}
              />
            ) : (
              <ScrollArea className="h-full p-8 bg-background">
                <div className="max-w-2xl mx-auto prose prose-invert">
                  {selectedArtifact?.format === "yaml" ? (
                    <pre className="p-4 bg-muted rounded-xl text-xs">
                      {selectedArtifact.content}
                    </pre>
                  ) : (
                    <div className="space-y-4">
                       <h1 className="text-3xl font-bold">{selectedArtifact?.name}</h1>
                       <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                          {selectedArtifact?.content.replace(/# .*\n/, '')}
                       </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            )}
          </div>
        </Card>

        {/* Right: Traceability & Suggestions */}
        <Card className="w-80 bg-card/50 border-none shadow-sm overflow-hidden flex flex-col">
           <div className="h-12 border-b flex items-center px-4 shrink-0 font-bold text-sm">
             Context & Decisions
           </div>
           <ScrollArea className="flex-1">
             <div className="p-4 space-y-6">
                <div className="space-y-3">
                   <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                     <ArrowUpRight size={12} />
                     Source Traceability
                   </h4>
                   <div className="space-y-2">
                      {selectedArtifact?.sourceFiles.map(file => (
                        <div key={file} className="p-2 rounded-lg bg-muted/50 border flex items-center justify-between group cursor-pointer hover:border-primary/50 transition-colors">
                           <span className="text-[11px] font-mono truncate max-w-[180px]">{file}</span>
                           <Eye size={12} className="text-muted-foreground group-hover:text-primary shrink-0" />
                        </div>
                      ))}
                   </div>
                </div>

                <Separator />

                <div className="space-y-3">
                   <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                     <Lightbulb size={12} className="text-yellow-500" />
                     Modernization Tips
                   </h4>
                   <Card className="bg-yellow-500/5 border-yellow-500/20 rounded-xl overflow-hidden">
                      <div className="p-3">
                         <p className="text-[11px] leading-relaxed italic">
                           {selectedArtifact?.modernizationNotes || "AI suggests keeping this artifact as-is but wrapping it in a facade for the new service layer."}
                         </p>
                      </div>
                      <div className="px-3 py-2 bg-yellow-500/10 border-t border-yellow-500/20 flex items-center justify-between">
                         <span className="text-[10px] font-bold text-yellow-600">AI Recommendation</span>
                         <Button variant="ghost" size="sm" className="h-5 text-[10px] text-yellow-600 p-0">Apply</Button>
                      </div>
                   </Card>
                </div>

                <Separator />

                <div className="space-y-3">
                   <div className="flex items-center justify-between">
                     <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                       <Code2 size={12} />
                       Linked Decisions
                     </h4>
                     <Badge variant="outline" className="text-[9px]">2 New</Badge>
                   </div>
                   <div className="space-y-2">
                      <div className="p-2 rounded-lg border bg-background/50 space-y-1">
                         <p className="text-[11px] font-bold">Replace MD5 Hashing</p>
                         <p className="text-[10px] text-muted-foreground">Status: <span className="text-green-500 font-medium">Approved</span></p>
                      </div>
                      <div className="p-2 rounded-lg border bg-background/50 space-y-1 opacity-60">
                         <p className="text-[11px] font-bold">Migrate to NestJS Guards</p>
                         <p className="text-[10px] text-muted-foreground">Status: <span className="text-blue-500 font-medium">Draft</span></p>
                      </div>
                   </div>
                   <Button variant="outline" size="sm" className="w-full h-8 text-[11px] rounded-lg border-dashed">
                      Add Decision
                   </Button>
                </div>
             </div>
           </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
