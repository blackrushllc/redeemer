"use client";

import { useState } from "react";
import { 
  Terminal as TerminalIcon, 
  Copy, 
  Check, 
  Info, 
  Settings2, 
  Command,
  ChevronRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export default function CLIIntegration() {
  const [copied, setCopied] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState("scan");
  const [flags, setFlags] = useState({
    workspace: "./modernization",
    source: "~/code/legacy-app",
    withGit: true,
    withBlame: true,
    json: false,
    verbose: true,
  });

  const commands = [
    { id: "init", title: "init", desc: "Initialize workspace" },
    { id: "scan", title: "scan", desc: "Scan and index repository" },
    { id: "analyze", title: "analyze", desc: "Perform deep analysis" },
    { id: "pseudo", title: "pseudo build", desc: "Build pseudo-artifacts" },
    { id: "diagrams", title: "diagrams build", desc: "Generate architecture diagrams" },
    { id: "generate", title: "generate", desc: "Generate target codebase" },
  ];

  const generateCommand = () => {
    let cmd = `bidi ${selectedCommand}`;
    if (flags.workspace) cmd += ` --workspace ${flags.workspace}`;
    if (flags.source) cmd += ` --source ${flags.source}`;
    if (flags.withGit) cmd += ` --with-git`;
    if (flags.withBlame) cmd += ` --with-blame`;
    if (flags.json) cmd += ` --json`;
    if (flags.verbose) cmd += ` --verbose`;
    return cmd;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CLI Integration</h1>
          <p className="text-muted-foreground mt-1">Configure and preview commands for the Syndorela engine.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="rounded-xl gap-2">
             <Command size={16} />
             View Full Reference
           </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Command Selector */}
        <div className="w-72 space-y-4 shrink-0">
           <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-2">Subcommands</h3>
           <div className="space-y-1">
              {commands.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={() => setSelectedCommand(cmd.id)}
                  className={cn(
                    "w-full p-3 rounded-xl text-left transition-all group flex items-center justify-between",
                    selectedCommand === cmd.id ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "hover:bg-card/50"
                  )}
                >
                   <div>
                      <p className="text-sm font-bold">bidi {cmd.title}</p>
                      <p className={cn("text-[10px]", selectedCommand === cmd.id ? "text-primary-foreground/70" : "text-muted-foreground")}>{cmd.desc}</p>
                   </div>
                   <ChevronRight size={14} className={cn(selectedCommand === cmd.id ? "opacity-100" : "opacity-0 group-hover:opacity-100 transition-opacity")} />
                </button>
              ))}
           </div>

           <Card className="bg-primary/5 border-primary/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                 <Info size={14} className="text-primary" />
                 <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Pro Tip</span>
              </div>
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                You can use a <span className="text-foreground font-medium">workspace.yaml</span> file to store these flags permanently and just run <code className="bg-muted px-1 rounded text-primary">bidi run</code>.
              </p>
           </Card>
        </div>

        {/* Builder & Terminal */}
        <div className="flex-1 flex flex-col gap-6">
           <Card className="bg-card/50 border-none shadow-sm flex flex-col overflow-hidden">
              <div className="h-12 border-b flex items-center px-4 justify-between shrink-0">
                 <div className="flex items-center gap-2">
                    <Settings2 size={16} className="text-primary" />
                    <span className="text-sm font-bold">Command Builder</span>
                 </div>
              </div>
              <div className="p-6 grid grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase text-muted-foreground">Workspace Path</label>
                       <input 
                         className="w-full bg-background border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                         value={flags.workspace}
                         onChange={(e) => setFlags({...flags, workspace: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase text-muted-foreground">Source Path</label>
                       <input 
                         className="w-full bg-background border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                         value={flags.source}
                         onChange={(e) => setFlags({...flags, source: e.target.value})}
                       />
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4 h-fit">
                    {[
                      { id: "withGit", label: "With Git Metadata" },
                      { id: "withBlame", label: "With Git Blame" },
                      { id: "json", label: "JSON Output" },
                      { id: "verbose", label: "Verbose Logs" },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 rounded-xl border bg-background/50">
                         <span className="text-xs">{item.label}</span>
                         <Checkbox 
                           checked={flags[item.id as keyof typeof flags] as boolean} 
                           onCheckedChange={(val) => setFlags({...flags, [item.id]: !!val})} 
                         />
                      </div>
                    ))}
                 </div>
              </div>

              <div className="p-4 bg-slate-950 border-t border-slate-900 relative group">
                 <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-red-500" />
                       <div className="w-2 h-2 rounded-full bg-yellow-500" />
                       <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 gap-2"
                      onClick={copyToClipboard}
                    >
                       {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                       <span className="text-[10px] uppercase font-bold tracking-widest">{copied ? "Copied" : "Copy Command"}</span>
                    </Button>
                 </div>
                 <div className="font-mono text-sm p-2 text-slate-300 overflow-x-auto whitespace-nowrap">
                    <span className="text-primary">$ </span>
                    {generateCommand()}
                 </div>
              </div>
           </Card>

           <Card className="bg-slate-950 border-none shadow-2xl flex-1 overflow-hidden flex flex-col">
              <div className="h-10 bg-slate-900 flex items-center px-4 justify-between border-b border-slate-800">
                 <div className="flex items-center gap-2 text-slate-500">
                    <TerminalIcon size={14} />
                    <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Example Output Snippet</span>
                 </div>
              </div>
              <ScrollArea className="flex-1 p-6 font-mono text-xs leading-relaxed text-slate-400">
                 <div className="space-y-1">
                    <p className="text-slate-500 italic"># Running {selectedCommand}...</p>
                    <p>{"[RUN]  Scan initiated on ~/code/legacy-app"}</p>
                    <p>{"[INFO] Scanning for PHP, SQL, JS..."}</p>
                    <p>{"[INFO] Found 142 PHP files"}</p>
                    <p className="text-blue-400">{"[DEBG] Indexing symbols in src/auth/login.php"}</p>
                    <p className="text-blue-400">{"[DEBG] Indexing symbols in src/billing/invoice_gen.php"}</p>
                    <p className="text-yellow-400">{"[WARN] Potential dead code detected in src/utils/old_helpers.php"}</p>
                    <p>{"[INFO] Symbols indexed: 1,452"}</p>
                    <p className="text-green-500 font-bold">{"[OK]   Scan complete."}</p>
                    <div className="mt-4 flex animate-pulse">
                      <div className="w-2 h-5 bg-primary" />
                    </div>
                 </div>
              </ScrollArea>
           </Card>
        </div>
      </div>
    </div>
  );
}
