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
  ChevronRight
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

          {/* Mock Product Screenshot Collage */}
          <motion.div 
            className="mt-24 relative max-w-6xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative z-10 rounded-2xl border bg-card shadow-2xl overflow-hidden aspect-[16/10]">
              <div className="h-12 border-b bg-muted/30 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="flex-1 text-center text-xs text-muted-foreground font-medium uppercase tracking-widest">
                syndorela.com
                </div>
              </div>
              <div className="flex h-full">
                <div className="w-48 border-r bg-muted/10 p-4 space-y-4">
                  <div className="h-4 w-full bg-muted/20 rounded" />
                  <div className="h-4 w-3/4 bg-muted/20 rounded" />
                  <div className="h-4 w-5/6 bg-muted/20 rounded" />
                </div>
                <div className="flex-1 p-8 grid grid-cols-3 gap-6">
                  <div className="col-span-2 space-y-6">
                    <div className="h-32 w-full bg-primary/5 border border-primary/10 rounded-xl animate-pulse" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-muted/20 rounded-xl" />
                      <div className="h-24 bg-muted/20 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-full bg-muted/10 border border-dashed rounded-xl flex items-center justify-center">
                      <Workflow className="text-muted-foreground/30" size={48} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/5 rounded-2xl border-2 border-primary/20 backdrop-blur-xl rotate-[-6deg] -z-10 shadow-2xl hidden lg:block" />
            <div className="absolute -bottom-12 -right-12 w-80 h-48 bg-card/50 rounded-2xl border border-primary/10 backdrop-blur-xl rotate-[3deg] -z-10 shadow-2xl hidden lg:block" />
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
