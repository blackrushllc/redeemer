"use client";

import { useState } from "react";
import { 
  Cloud,
  Shield,
  Activity,
  Box,
  Layers,
  Rocket, 
  Zap,
  Settings2, 
  ArrowRight, 
  Code2, 
  FileCode,
  Globe,
  Database,
  TestTube2,
  Split,
  Terminal,
  Play
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const mockGeneratedCode = `import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 201, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}`;

export default function GenerationStudio() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setGenerated(true);
          setIsGenerating(false);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Generation Studio</h1>
          <p className="text-muted-foreground mt-1">Produce modern target services from your pseudo-artifacts with high-fidelity control.</p>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0 overflow-hidden pb-6">
        {/* Core Stack Config Panel */}
        <Card className="w-[280px] bg-card/50 border-none shadow-sm overflow-hidden flex flex-col shrink-0">
          <div className="h-12 border-b flex items-center px-4 shrink-0 font-bold text-xs uppercase tracking-widest gap-2">
            <Settings2 size={14} className="text-primary" />
            Core Stack
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
               <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Language & Framework</label>
                  <Select defaultValue="nestjs">
                     <SelectTrigger className="rounded-xl border-none bg-muted/50 text-xs">
                        <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="nestjs">NestJS (TypeScript)</SelectItem>
                        <SelectItem value="fastapi">FastAPI (Python)</SelectItem>
                        <SelectItem value="springboot">Spring Boot (Java)</SelectItem>
                        <SelectItem value="go-gin">Gin (Go)</SelectItem>
                        <SelectItem value="rust-axum">Axum (Rust)</SelectItem>
                     </SelectContent>
                  </Select>
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Data Layer</label>
                  <Select defaultValue="prisma">
                     <SelectTrigger className="rounded-xl border-none bg-muted/50 text-xs">
                        <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="prisma">Prisma (Postgres)</SelectItem>
                        <SelectItem value="typeorm">TypeORM (Postgres)</SelectItem>
                        <SelectItem value="sqlalchemy">SQLAlchemy (MySQL)</SelectItem>
                        <SelectItem value="ent">Ent (Postgres)</SelectItem>
                        <SelectItem value="mongoose">Mongoose (MongoDB)</SelectItem>
                     </SelectContent>
                  </Select>
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">API Protocol</label>
                  <Select defaultValue="rest">
                     <SelectTrigger className="rounded-xl border-none bg-muted/50 text-xs">
                        <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="rest">RESTful API</SelectItem>
                        <SelectItem value="graphql">GraphQL (Apollo)</SelectItem>
                        <SelectItem value="grpc">gRPC (Protobuf)</SelectItem>
                        <SelectItem value="trpc">tRPC</SelectItem>
                     </SelectContent>
                  </Select>
               </div>

               <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Artifacts</label>
                  <div className="space-y-2">
                     {[
                       { id: "routes", label: "Routes/Controllers", icon: Globe },
                       { id: "services", label: "Logic Services", icon: Zap },
                       { id: "models", label: "Domain Models", icon: Database },
                       { id: "tests", label: "Unit/E2E Tests", icon: TestTube2 },
                     ].map(item => (
                       <div key={item.id} className="flex items-center justify-between group">
                          <div className="flex items-center gap-2">
                             <item.icon size={12} className="text-muted-foreground group-hover:text-primary transition-colors" />
                             <span className="text-[11px]">{item.label}</span>
                          </div>
                          <Checkbox defaultChecked className="scale-75" />
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </ScrollArea>
        </Card>

        {/* New Pane: Advanced Options */}
        <Card className="w-[320px] bg-card/50 border-none shadow-sm overflow-hidden flex flex-col shrink-0">
          <div className="h-12 border-b flex items-center px-4 shrink-0 font-bold text-xs uppercase tracking-widest gap-2">
            <Layers size={14} className="text-primary" />
            Modernization Strategy
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
               <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Target Architecture</label>
                  <div className="grid grid-cols-1 gap-2">
                     {[
                       { id: "monolith", label: "Clean Monolith", desc: "Modular monolith", icon: Box },
                       { id: "microservices", label: "Microservices", desc: "Distributed services", icon: Split },
                       { id: "serverless", label: "Serverless", desc: "AWS Lambda / Functions", icon: Cloud },
                     ].map(item => (
                        <div key={item.id} className="p-3 rounded-xl bg-muted/30 border border-transparent hover:border-primary/50 cursor-pointer transition-all">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                 <item.icon size={16} />
                              </div>
                              <div>
                                 <p className="text-xs font-bold">{item.label}</p>
                                 <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <Separator />

               <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Hypothetical Capabilities</label>
                  <div className="space-y-3">
                     {[
                       { id: "observability", label: "Full Observability", desc: "Prometheus, Grafana, OpenTelemetry", icon: Activity },
                       { id: "security", label: "Zero-Trust Security", desc: "mTLS, JWT, RBAC, OAuth2", icon: Shield },
                       { id: "docs", label: "Auto-SDK Generation", desc: "Generate SDKs for 5+ languages", icon: FileCode },
                     ].map(item => (
                       <div key={item.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                             <div className="flex items-center gap-2">
                                <item.icon size={14} className="text-primary" />
                                <span className="text-xs font-medium">{item.label}</span>
                             </div>
                             <Checkbox defaultChecked className="scale-75" />
                          </div>
                          <p className="text-[10px] text-muted-foreground ml-6 leading-relaxed">
                            {item.desc}
                          </p>
                       </div>
                     ))}
                  </div>
               </div>

               <Separator />

               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Strict Mode</label>
                     <Checkbox className="scale-75" />
                  </div>
                  <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                    Reject any logic that cannot be 100% automatically modernised.
                  </p>
               </div>

               <Button 
                onClick={handleGenerate} 
                disabled={isGenerating}
                className="w-full rounded-xl bg-primary hover:bg-primary/90 h-12 shadow-lg shadow-primary/20 font-bold gap-2 mt-2"
               >
                 {isGenerating ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Play size={16} fill="currentColor" />}
                 {isGenerating ? "Executing Pipeline..." : "Generate Modern Project"}
               </Button>
            </div>
          </ScrollArea>
        </Card>

        {/* Output Panel (Results) */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
           {isGenerating || generated ? (
             <>
               <Card className="bg-card/50 border-none shadow-sm p-6 space-y-4 shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <Rocket size={20} />
                       </div>
                       <div>
                          <h3 className="font-bold">Generation Progress</h3>
                          <p className="text-xs text-muted-foreground">Target: NestJS + PostgreSQL</p>
                       </div>
                    </div>
                    <Badge variant="outline" className="font-mono text-xs">{progress}%</Badge>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="grid grid-cols-4 gap-4">
                     {["Auth", "Users", "Models", "Tests"].map((step, i) => (
                       <div key={step} className="flex items-center gap-2">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            progress > (i + 1) * 25 ? "bg-green-500" : "bg-muted animate-pulse"
                          )} />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{step}</span>
                       </div>
                     ))}
                  </div>
               </Card>

               <div className="flex-1 flex gap-4 min-h-0">
                  <Card className="flex-1 bg-card/50 border-none shadow-sm overflow-hidden flex flex-col">
                     <div className="h-10 border-b flex items-center justify-between px-4 bg-muted/10 shrink-0">
                        <div className="flex items-center gap-2">
                           <Terminal size={14} className="text-muted-foreground" />
                           <span className="text-[10px] font-bold uppercase tracking-widest">Generation Logs</span>
                        </div>
                     </div>
                     <ScrollArea className="flex-1 p-4 font-mono text-[11px] leading-relaxed text-slate-400">
                        <div className="space-y-1">
                           <p className="text-primary font-bold">{"[START] Generation process initiated..."}</p>
                           <p>{"[INFO] Loading pseudo-artifacts for 'auth'..."}</p>
                           <p>{"[INFO] Applying NestJS boilerplate..."}</p>
                           {progress > 30 && <p>{"[OK] Generated auth.controller.ts"}</p>}
                           {progress > 50 && <p>{"[OK] Generated auth.service.ts"}</p>}
                           {progress > 70 && <p>{"[OK] Generated user.entity.ts"}</p>}
                           {progress > 90 && <p className="text-green-500 font-bold">{"[SUCCESS] Module 'auth' generation complete."}</p>}
                           {generated && (
                             <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20 text-primary">
                                <p className="font-bold">Summary:</p>
                                <p>• 12 files generated</p>
                                <p>• 854 lines of TypeScript</p>
                                <p>• 4 TODOs for uncertain logic</p>
                             </div>
                           )}
                        </div>
                     </ScrollArea>
                  </Card>

                  <Card className="flex-[2] bg-card/50 border-none shadow-sm overflow-hidden flex flex-col relative group">
                     <div className="h-10 border-b flex items-center justify-between px-4 bg-muted/10 shrink-0">
                        <div className="flex items-center gap-2">
                           <Code2 size={14} className="text-primary" />
                           <span className="text-[10px] font-bold uppercase tracking-widest">Generated: auth.controller.ts</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 text-[10px] rounded-lg">Copy Code</Button>
                     </div>
                     <div className="flex-1 min-h-0">
                        <Editor
                          height="100%"
                          defaultLanguage="typescript"
                          theme="vs-dark"
                          value={generated ? mockGeneratedCode : "// Generating..."}
                          options={{
                            readOnly: true,
                            minimap: { enabled: false },
                            fontSize: 12,
                            fontFamily: "var(--font-mono)",
                            padding: { top: 15 },
                            scrollBeyondLastLine: false,
                          }}
                        />
                     </div>
                  </Card>
               </div>
             </>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-6">
                <div className="w-24 h-24 rounded-[40px] bg-primary/5 border border-primary/10 flex items-center justify-center relative">
                   <Rocket size={48} className="text-primary animate-pulse" />
                   <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border flex items-center justify-center">
                      <Settings2 size={16} className="text-muted-foreground" />
                   </div>
                </div>
                <div className="max-w-md space-y-2">
                   <h2 className="text-2xl font-bold tracking-tight">Ready to Modernize?</h2>
                   <p className="text-muted-foreground">
                     Configure your target stack on the left and click &quot;Start Generation&quot; to produce high-quality, type-safe code from your pseudo-artifacts.
                   </p>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                   <div className="p-4 rounded-2xl bg-card border border-dashed flex items-center gap-3 text-left">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                        <ArrowRight size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold">1. Select Stack</p>
                        <p className="text-[10px] text-muted-foreground">Frameworks, ORMs, and test suites.</p>
                      </div>
                   </div>
                   <div className="p-4 rounded-2xl bg-card border border-dashed flex items-center gap-3 text-left">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                        <Rocket size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold">2. Generate</p>
                        <p className="text-[10px] text-muted-foreground">Instant code with full traceability.</p>
                      </div>
                   </div>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
