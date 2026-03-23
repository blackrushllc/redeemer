"use client";

import { useState, useCallback } from "react";
import ReactFlow, { 
  Background, 
  Controls, 
  Panel,
  Node,
  Edge,
  applyEdgeChanges,
  applyNodeChanges,
  OnNodesChange,
  OnEdgesChange,
} from "reactflow";
import "reactflow/dist/style.css";
import { 
  Workflow, 
  Share2, 
  Download, 
  Layers, 
  Database, 
  ArrowRightLeft,
  Info,
  ChevronRight,
  Maximize2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const initialNodes: Node[] = [
  { 
    id: "mod-auth", 
    data: { label: "Authentication" }, 
    position: { x: 250, y: 50 },
    className: "p-4 rounded-xl border-2 border-primary bg-primary/10 font-bold text-center w-40 h-24 flex items-center justify-center shadow-lg shadow-primary/10"
  },
  { 
    id: "mod-billing", 
    data: { label: "Billing" }, 
    position: { x: 100, y: 200 },
    className: "p-4 rounded-xl border border-muted-foreground/30 bg-card font-bold text-center w-40 h-20 flex items-center justify-center shadow-sm"
  },
  { 
    id: "mod-users", 
    data: { label: "Users" }, 
    position: { x: 400, y: 200 },
    className: "p-4 rounded-xl border border-muted-foreground/30 bg-card font-bold text-center w-40 h-20 flex items-center justify-center shadow-sm"
  },
  { 
    id: "db", 
    data: { label: "Legacy DB (MySQL)" }, 
    position: { x: 250, y: 350 },
    className: "p-4 rounded-xl border-2 border-dashed border-muted-foreground/50 bg-muted/20 font-bold text-center w-48 h-20 flex items-center justify-center"
  },
];

const initialEdges: Edge[] = [
  { id: "e-auth-users", source: "mod-auth", target: "mod-users", animated: true, label: "verifies" },
  { id: "e-billing-users", source: "mod-billing", target: "mod-users", label: "fetches" },
  { id: "e-auth-db", source: "mod-auth", target: "db", label: "SQL" },
  { id: "e-billing-db", source: "mod-billing", target: "db", label: "SQL" },
  { id: "e-users-db", source: "mod-users", target: "db", label: "SQL" },
];

export default function DiagramStudio() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onNodeClick = (_: React.MouseEvent, node: Node) => setSelectedNode(node);

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Diagram Studio</h1>
          <p className="text-sm text-muted-foreground">Visualize architecture, flows, and entity relationships.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" className="rounded-xl gap-2">
             <Share2 size={14} />
             <span>Share</span>
           </Button>
           <Button variant="outline" size="sm" className="rounded-xl gap-2">
             <Download size={14} />
             <span>Export</span>
           </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        <Card className="flex-1 bg-card/50 border-none shadow-sm overflow-hidden relative group">
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <Tabs defaultValue="modules">
               <TabsList className="bg-background/80 backdrop-blur-md border shadow-lg h-10 p-1 rounded-xl">
                  <TabsTrigger value="modules" className="rounded-lg text-xs gap-2">
                    <Layers size={14} />
                    Module Graph
                  </TabsTrigger>
                  <TabsTrigger value="entities" className="rounded-lg text-xs gap-2">
                    <Database size={14} />
                    Entity Graph
                  </TabsTrigger>
                  <TabsTrigger value="flows" className="rounded-lg text-xs gap-2">
                    <ArrowRightLeft size={14} />
                    Request Flow
                  </TabsTrigger>
               </TabsList>
            </Tabs>
          </div>

          <div className="absolute top-4 right-4 z-10">
             <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur-md shadow-lg rounded-xl">
                <Maximize2 size={16} />
             </Button>
          </div>

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            fitView
            className="bg-muted/5"
          >
            <Background color="#333" gap={20} />
            <Controls className="!bg-background !border-muted !rounded-xl overflow-hidden !shadow-lg" />
            <Panel position="bottom-center" className="bg-background/80 backdrop-blur-md px-4 py-2 border rounded-2xl shadow-2xl flex items-center gap-6">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Module</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded border border-muted-foreground/50" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Dependency</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-3 h-1 bg-primary animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Active Flow</span>
               </div>
            </Panel>
          </ReactFlow>
        </Card>

        {/* Side Panel */}
        <Card className="w-80 bg-card/50 border-none shadow-sm overflow-hidden flex flex-col">
          <div className="h-12 border-b flex items-center px-4 shrink-0 font-bold text-sm">
            Node Details
          </div>
          <ScrollArea className="flex-1">
             {selectedNode ? (
               <div className="p-4 space-y-6">
                  <div className="space-y-2">
                     <h3 className="text-lg font-bold">{selectedNode.data.label}</h3>
                     <Badge variant="outline" className="text-[10px] uppercase bg-primary/5 text-primary border-primary/20 font-bold">Module Node</Badge>
                  </div>

                  <div className="p-3 rounded-xl bg-muted/50 border text-xs space-y-2">
                     <p className="font-bold flex items-center gap-2">
                       <Info size={14} className="text-primary" />
                       Summary
                     </p>
                     <p className="text-muted-foreground leading-relaxed">
                       This node represents the {selectedNode.data.label} functional area identified during the scan. It has 42 incoming and 12 outgoing relationships.
                     </p>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                     <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Properties</h4>
                     <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 rounded-lg bg-background border text-center">
                           <p className="text-[10px] text-muted-foreground uppercase">Stability</p>
                           <p className="text-sm font-bold text-green-500">85%</p>
                        </div>
                        <div className="p-2 rounded-lg bg-background border text-center">
                           <p className="text-[10px] text-muted-foreground uppercase">Complexity</p>
                           <p className="text-sm font-bold text-orange-500">High</p>
                        </div>
                     </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                     <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Linked Artifacts</h4>
                     <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer group">
                           <span className="text-xs font-medium">module.yaml</span>
                           <ChevronRight size={14} className="text-muted-foreground group-hover:text-primary" />
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer group">
                           <span className="text-xs font-medium">login.flow.md</span>
                           <ChevronRight size={14} className="text-muted-foreground group-hover:text-primary" />
                        </div>
                     </div>
                  </div>

                  <Button className="w-full rounded-xl gap-2 mt-4" variant="outline">
                    <Workflow size={16} />
                    Refine Sub-Graph
                  </Button>
               </div>
             ) : (
               <div className="h-full flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                  <Layers size={48} className="opacity-10 mb-4" />
                  <p className="text-sm italic">Select a node in the diagram to view detailed properties and linked artifacts.</p>
               </div>
             )}
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
