"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  ArrowRight, 
  Terminal, 
  Zap, 
  Workflow, 
  Code2, 
  Search, 
  MessageSquare,
  ChevronRight,
  RefreshCw,
  Database,
  Layers,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
              <ShieldCheck size={20} />
            </div>
            <span>Syndorela</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#how-it-works" className="hover:text-primary transition-colors">How it works</Link>
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#cli" className="hover:text-primary transition-colors">CLI</Link>
            <Link href="/docs" className="hover:text-primary transition-colors">Documentation</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-sm font-medium">Log in</Button>
            <Link href="/app">
              <Button className="rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                Launch Workspace <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="container mx-auto relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -z-10" />
          
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="px-4 py-1.5 rounded-full border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-wider uppercase mb-6">
                Next-Gen Legacy Modernization
              </Badge>
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
                Convert legacy code into an editable pseudo-project.
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Analyze, tag, and visualize your legacy monoliths. Generate modern, type-safe replacements with AI-powered traceability and confidence.
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/app">
                <Button size="lg" className="h-14 px-8 rounded-2xl text-lg font-semibold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 group">
                  Launch Demo Workspace
                  <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl text-lg font-semibold border-2">
                View Sample Project
              </Button>
            </motion.div>
          </div>

          {/* Visual Pipeline Representation */}
          <motion.div 
            className="mt-24 relative max-w-6xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative z-10 rounded-2xl border bg-card shadow-2xl overflow-hidden aspect-[16/10] bg-slate-950 flex flex-col">
              {/* Header */}
              <div className="h-12 border-b border-slate-800 bg-slate-900/50 flex items-center px-4 justify-between">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">
                  Redeemer Pipeline Visualizer v1.0
                </div>
                <div className="w-12" />
              </div>

              {/* Main Content */}
              <div className="flex-1 relative p-8 flex items-center justify-around">
                {/* Background Grid/Lines */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                     style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                
                {/* Step 1: Import */}
                <motion.div whileHover={{ scale: 1.05 }} className="relative z-10 flex flex-col items-center gap-4 group">
                  <div className="w-28 h-28 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap p-3 gap-2 items-center justify-center shadow-inner group-hover:border-primary/50 transition-colors relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 group-hover:opacity-10 transition-opacity">
                      <Database size={64} className="text-slate-400" />
                    </div>
                    <div className="px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-[9px] font-bold text-blue-400 relative z-10">PHP 5.6</div>
                    <div className="px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/30 text-[9px] font-bold text-red-400 relative z-10">COBOL</div>
                    <div className="px-1.5 py-0.5 rounded bg-orange-500/10 border border-orange-500/30 text-[9px] font-bold text-orange-400 relative z-10">Java EE</div>
                    <div className="px-1.5 py-0.5 rounded bg-gray-500/10 border border-gray-500/30 text-[9px] font-bold text-gray-400 relative z-10">VB6</div>
                    <div className="px-1.5 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/30 text-[9px] font-bold text-yellow-400 relative z-10">ColdFusion</div>
                    <div className="px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-[9px] font-bold text-purple-400 relative z-10">Delphi</div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">1. Import Legacy</p>
                    <p className="text-[10px] text-slate-500">Monolithic Applications</p>
                  </div>
                </motion.div>

                {/* Connector */}
                <div className="flex-1 max-w-[60px] h-[2px] bg-slate-800 relative">
                  <motion.div 
                    animate={{ left: ['0%', '100%'] }} 
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#3b82f6]" 
                  />
                </div>

                {/* Step 2 & 3: Pseudo-project */}
                <motion.div whileHover={{ scale: 1.05 }} className="relative z-10 flex flex-col items-center gap-4 group">
                  <div className="w-36 h-36 rounded-3xl bg-primary/10 border-2 border-primary/30 flex flex-col items-center justify-center shadow-lg shadow-primary/10 relative group-hover:border-primary transition-colors overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 group-hover:opacity-10 transition-opacity">
                      <Cpu size={80} className="text-primary" />
                    </div>
                    <Code2 className="text-primary mb-2 relative z-10" size={48} />
                    <div className="flex flex-col items-center relative z-10">
                      <span className="text-[10px] font-mono font-bold text-primary px-2 py-0.5 bg-primary/20 rounded-full mb-1">PSEUDO-CODE</span>
                      <span className="text-[8px] text-primary/70 uppercase tracking-tighter italic">Editable Artifacts</span>
                    </div>
                    {/* Animated scanning line */}
                    <motion.div 
                      animate={{ top: ['0%', '100%', '0%'] }} 
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute left-0 right-0 h-px bg-primary/40 shadow-[0_0_10px_#3b82f6] z-0" 
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">2 & 3. Analyze & Edit</p>
                    <p className="text-[10px] text-slate-500">Transform Logic via Pseudo-Project</p>
                  </div>
                </motion.div>

                {/* Split Connector */}
                <div className="flex-1 max-w-[80px] h-32 relative">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 128" preserveAspectRatio="none">
                    <path d="M 0 64 L 40 64 L 80 32" fill="none" stroke="#1e293b" strokeWidth="2" />
                    <path d="M 0 64 L 40 64 L 80 96" fill="none" stroke="#1e293b" strokeWidth="2" />
                    <motion.circle r="3" fill="#3b82f6" animate={{ offsetDistance: ["0%", "100%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} style={{ offsetPath: "path('M 0 64 L 40 64 L 80 32')" }} />
                    <motion.circle r="3" fill="#10b981" animate={{ offsetDistance: ["0%", "100%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} style={{ offsetPath: "path('M 0 64 L 40 64 L 80 96')" }} />
                  </svg>
                </div>

                {/* Step 4: Export Paths */}
                <div className="flex flex-col gap-8 relative">
                   <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                      <Layers size={100} className="text-slate-400" />
                   </div>
                  {/* 4a: Refactored Legacy */}
                  <motion.div whileHover={{ scale: 1.05 }} className="relative z-10 flex items-center gap-4 group">
                    <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center group-hover:border-primary/50 transition-colors">
                      <RefreshCw size={24} className="text-slate-400 group-hover:text-primary transition-colors" />
                      <span className="text-[8px] font-bold text-slate-500 mt-1 uppercase">Refactored</span>
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-slate-300 uppercase">4a. Modernized Core</p>
                      <p className="text-[9px] text-slate-500">Refactored Legacy Stack</p>
                    </div>
                  </motion.div>

                  {/* 4b: Modern Stack */}
                  <motion.div whileHover={{ scale: 1.05 }} className="relative z-10 flex items-center gap-4 group">
                    <div className="w-24 h-24 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex flex-wrap p-2 gap-1.5 items-center justify-center shadow-lg shadow-emerald-500/5 group-hover:border-emerald-500/50 transition-colors">
                      <div className="px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-[9px] font-bold text-cyan-400">Next.js</div>
                      <div className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[9px] font-bold text-emerald-400">Go</div>
                      <div className="px-1.5 py-0.5 rounded bg-orange-500/10 border border-orange-500/30 text-[9px] font-bold text-orange-400">Rust</div>
                      <div className="px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30 text-[9px] font-bold text-indigo-400">Zig</div>
                      <div className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-[9px] font-bold text-amber-400">HTMX</div>
                      <div className="px-1.5 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-[9px] font-bold text-sky-400">Deno</div>
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-emerald-400 uppercase">4b. Entirely New Stack</p>
                      <p className="text-[9px] text-slate-500">Full Tech Migration</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Footer Info */}
              <div className="h-10 border-t border-slate-800 bg-slate-900/30 flex items-center px-6 justify-between text-[10px] font-mono text-slate-500">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> SYSTEM READY</span>
                  <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> PIPELINE ACTIVE</span>
                </div>
                <div className="flex gap-4">
                  <span>LATENCY: 12ms</span>
                  <span>AI CONFIDENCE: 99.4%</span>
                </div>
              </div>
            </div>
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/5 rounded-2xl border-2 border-primary/20 backdrop-blur-xl rotate-[-6deg] -z-10 shadow-2xl hidden lg:block" />
            <div className="absolute -bottom-12 -right-12 w-80 h-48 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 backdrop-blur-xl rotate-[3deg] -z-10 shadow-2xl hidden lg:block" />
          </motion.div>
        </div>
      </section>

      {/* CLI Section */}
      <section id="cli" className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <h2 className="text-4xl font-bold tracking-tight">CLI-First Workflow</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Syndorela is built for engineers. Our CLI suite handles the heavy lifting—scanning, indexing, and analyzing millions of lines of code locally on your machine.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Terminal, title: "bidi scan", desc: "Deterministic repo scanning and indexing." },
                  { icon: Code2, title: "bidi pseudo build", desc: "Generate intermediate pseudo-artifacts." },
                  { icon: Zap, title: "bidi generate", desc: "Produce modern, type-safe target code." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="mt-1 w-8 h-8 rounded-lg bg-background border flex items-center justify-center text-primary shrink-0">
                      <item.icon size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full max-w-xl">
              <Card className="bg-slate-950 border-slate-800 shadow-2xl overflow-hidden rounded-2xl">
                <div className="h-10 bg-slate-900/50 border-b border-slate-800 flex items-center px-4 gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <span className="ml-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">bash</span>
                </div>
                <div className="p-6 font-mono text-sm leading-relaxed">
                  <div className="flex gap-3 mb-2 text-slate-300">
                    <span className="text-primary">$</span>
                    <span>bidi scan --source ~/old-crm</span>
                  </div>
                  <div className="text-slate-500 mb-4">
                    {"[RUN] Scanning directory: src/"}<br />
                    {"[OK]  Detected 142 PHP files"}<br />
                    {"[OK]  Indexing symbols..."}
                  </div>
                  <div className="flex gap-3 mb-2 text-slate-300">
                    <span className="text-primary">$</span>
                    <span>bidi pseudo build --module auth</span>
                  </div>
                  <div className="text-slate-500">
                    {"[RUN] Building pseudo/modules/auth/module.yaml"}<br />
                    {"[RUN] Mapping 12 source files to 3 pseudo-artifacts"}<br />
                    {"[OK]  Pseudo build complete (confidence 85%)"}
                  </div>
                  <div className="mt-4 flex animate-pulse">
                    <div className="w-2 h-5 bg-primary" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t mt-auto">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-bold text-lg">
            <ShieldCheck className="text-primary" size={24} />
            <span>Syndorela</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Syndorela Platform. Built for the future of legacy systems.
          </p>
          <div className="flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-primary transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
