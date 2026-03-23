"use client";

import Link from "next/link";
import { Search, Bell, Play, Rocket, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <header className="h-16 border-b bg-card/30 backdrop-blur-xl flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Select defaultValue="legacy-crm">
            <SelectTrigger className="w-[200px] border-none bg-transparent hover:bg-muted font-medium">
              <SelectValue placeholder="Select Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="legacy-crm">Legacy CRM & Auth</SelectItem>
              <SelectItem value="billing-api">Billing Microservice</SelectItem>
              <SelectItem value="inventory-system">Inventory Monolith</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="h-4 w-[1px] bg-border mx-2" />

        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          {segments.map((segment, i) => (
            <div key={segment} className="flex items-center gap-2">
              <span className="capitalize">{segment}</span>
              {i < segments.length - 1 && <ChevronRight size={14} />}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input 
            placeholder="Search code, artifacts, issues..." 
            className="pl-10 bg-muted/50 border-none rounded-xl focus-visible:ring-primary"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border bg-background text-[10px] font-mono text-muted-foreground pointer-events-none">
            ⌘K
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 rounded-xl">
            <Play size={14} className="text-green-500 fill-green-500" />
            <span>Run Analysis</span>
          </Button>
          <Link href="/app/generate">
            <Button size="sm" className="gap-2 rounded-xl bg-primary hover:bg-primary/90">
              <Rocket size={14} />
              <span>Generate</span>
            </Button>
          </Link>
        </div>

        <div className="h-8 w-[1px] bg-border mx-1" />

        <Button variant="ghost" size="icon" className="rounded-xl relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full bg-muted overflow-hidden">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/40 text-primary font-bold text-xs">
            JD
          </div>
        </Button>
      </div>
    </header>
  );
}
