"use client";

import { useState } from "react";
import { 
  Folder, 
  File, 
  ChevronRight, 
  ChevronDown, 
  Search, 
  Filter,
  Info,
  History,
  ShieldAlert,
  Tag as TagIcon,
  Code2
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { mockRepoTree, FileNode } from "@/lib/mock-data";

export default function RepoExplorer() {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set(["src", "src/auth"]));

  const toggleDir = (path: string) => {
    const next = new Set(expandedDirs);
    if (next.has(path)) next.delete(path);
    else next.add(path);
    setExpandedDirs(next);
  };

  const renderTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map((node) => {
      const isExpanded = expandedDirs.has(node.path);
      const isSelected = selectedFile?.path === node.path;

      if (node.type === "directory") {
        return (
          <div key={node.path}>
            <button
              onClick={() => toggleDir(node.path)}
              className={cn(
                "flex items-center gap-2 w-full px-2 py-1.5 text-sm hover:bg-muted/50 rounded-lg transition-colors group",
                isSelected && "bg-muted"
              )}
              style={{ paddingLeft: `${depth * 12 + 8}px` }}
            >
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              <Folder size={16} className="text-primary/70 fill-primary/10" />
              <span className="font-medium">{node.name}</span>
            </button>
            {isExpanded && node.children && renderTree(node.children, depth + 1)}
          </div>
        );
      }

      return (
        <button
          key={node.path}
          onClick={() => setSelectedFile(node)}
          className={cn(
            "flex items-center gap-2 w-full px-2 py-1.5 text-sm hover:bg-muted/50 rounded-lg transition-colors group",
            isSelected && "bg-primary/10 text-primary"
          )}
          style={{ paddingLeft: `${depth * 12 + 24}px` }}
        >
          <File size={16} className={cn(isSelected ? "text-primary" : "text-muted-foreground")} />
          <span>{node.name}</span>
          {node.risk === "high" && (
            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-red-500" />
          )}
        </button>
      );
    });
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Repository Explorer</h1>
          <p className="text-sm text-muted-foreground">Browse and analyze source artifacts.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" className="gap-2 rounded-xl">
             <Filter size={14} />
             <span>Filters</span>
           </Button>
           <Button variant="outline" size="sm" className="gap-2 rounded-xl">
             <History size={14} />
             <span>History</span>
           </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* Left: Tree */}
        <Card className="w-80 flex flex-col bg-card/50 border-none shadow-sm overflow-hidden">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
              <Input placeholder="Search files..." className="pl-9 h-9 bg-muted/50 border-none rounded-lg text-xs" />
            </div>
          </div>
          <ScrollArea className="flex-1 p-2">
            {renderTree(mockRepoTree)}
          </ScrollArea>
        </Card>

        {/* Center: Preview */}
        <Card className="flex-1 bg-card/50 border-none shadow-sm overflow-hidden flex flex-col">
          {selectedFile ? (
            <>
              <div className="h-12 border-b flex items-center justify-between px-4 bg-muted/20">
                <div className="flex items-center gap-2">
                  <File size={16} className="text-muted-foreground" />
                  <span className="text-sm font-mono">{selectedFile.path}</span>
                  <Badge variant="secondary" className="text-[10px] uppercase">{selectedFile.language}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 text-[11px] rounded-lg">Raw</Button>
                  <Button variant="ghost" size="sm" className="h-8 text-[11px] rounded-lg">Blame</Button>
                </div>
              </div>
              <div className="flex-1 min-h-0">
                <Editor
                  height="100%"
                  defaultLanguage={selectedFile.language || "plaintext"}
                  theme="vs-dark"
                  value={selectedFile.content || "// No content available for this mock file."}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 13,
                    fontFamily: "var(--font-mono)",
                    padding: { top: 20 },
                    scrollBeyondLastLine: false,
                    lineNumbers: "on",
                    glyphMargin: true,
                    folding: true,
                  }}
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4">
               <div className="w-16 h-16 rounded-3xl bg-muted flex items-center justify-center">
                 <FolderTree size={32} className="opacity-20" />
               </div>
               <p className="text-sm">Select a file to preview its content and metadata.</p>
            </div>
          )}
        </Card>

        {/* Right: Metadata */}
        <Card className="w-80 bg-card/50 border-none shadow-sm overflow-hidden flex flex-col">
          <div className="h-12 border-b flex items-center px-4 shrink-0 font-bold text-sm">
            Metadata & Insights
          </div>
          <ScrollArea className="flex-1">
            {selectedFile ? (
              <div className="p-4 space-y-6">
                <div className="space-y-3">
                   <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                     <TagIcon size={12} />
                     Applied Tags
                   </h4>
                   <div className="flex flex-wrap gap-2">
                     {selectedFile.tags?.map(tag => (
                       <Badge key={tag} variant="outline" className="rounded-lg bg-background font-normal border-primary/20 text-primary">
                         {tag}
                       </Badge>
                     )) || <span className="text-xs text-muted-foreground italic">No tags applied</span>}
                   </div>
                </div>

                <Separator />

                <div className="space-y-3">
                   <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                     <ShieldAlert size={12} />
                     Risk Assessment
                   </h4>
                   <div className={cn(
                     "p-3 rounded-xl border flex items-start gap-3",
                     selectedFile.risk === "high" ? "bg-red-500/5 border-red-500/20" : "bg-green-500/5 border-green-500/20"
                   )}>
                     <div className={cn(
                       "mt-0.5",
                       selectedFile.risk === "high" ? "text-red-500" : "text-green-500"
                     )}>
                       <Info size={16} />
                     </div>
                     <div>
                       <p className="text-xs font-bold capitalize">{selectedFile.risk || "Low"} Risk</p>
                       <p className="text-[11px] text-muted-foreground mt-1">
                         {selectedFile.risk === "high" 
                           ? "This file contains critical vulnerabilities or high-complexity logic." 
                           : "This file is relatively straightforward and safe to modernize."}
                       </p>
                     </div>
                   </div>
                </div>

                <Separator />

                <div className="space-y-3">
                   <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                     <History size={12} />
                     Git Activity
                   </h4>
                   <div className="space-y-4">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                          {selectedFile.blame?.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-xs font-bold">{selectedFile.blame?.author}</p>
                          <p className="text-[10px] text-muted-foreground">Last changed {selectedFile.blame?.lastChange}</p>
                        </div>
                     </div>
                   </div>
                </div>

                <Separator />

                <div className="space-y-3">
                   <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                     <Code2 size={12} />
                     Linked Pseudo-Artifacts
                   </h4>
                   <div className="space-y-2">
                     <div className="p-2 rounded-lg bg-muted/50 border border-dashed flex items-center justify-between group cursor-pointer hover:border-primary/50 transition-colors">
                        <span className="text-[11px] font-medium">Auth Module</span>
                        <ChevronRight size={12} className="text-muted-foreground group-hover:text-primary" />
                     </div>
                   </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground italic text-sm">
                No file selected
              </div>
            )}
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}

function FolderTree({ size, className }: { size: number, className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <Folder size={size} />
      <div className="absolute -bottom-1 -right-1">
        <div className="w-4 h-4 rounded-full bg-background flex items-center justify-center">
          <ChevronRight size={10} />
        </div>
      </div>
    </div>
  );
}
