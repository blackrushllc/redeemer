"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FolderTree, 
  BarChart3, 
  Code2, 
  Rocket, 
  Diff, 
  Terminal, 
  Settings,
  ShieldCheck,
  Workflow
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/app" },
  { label: "Repo Explorer", icon: FolderTree, href: "/app/repo" },
  { label: "Analysis & Reports", icon: BarChart3, href: "/app/analysis" },
  { label: "Pseudo-Project", icon: Code2, href: "/app/pseudo" },
  { label: "Diagram Studio", icon: Workflow, href: "/app/diagrams" },
  { label: "Generate", icon: Rocket, href: "/app/generate" },
  { label: "Diff & Review", icon: Diff, href: "/app/diff" },
  { label: "CLI Integration", icon: Terminal, href: "/app/cli" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-card/30 backdrop-blur-xl flex flex-col h-full shrink-0">
      <div className="p-6 border-b">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            <ShieldCheck size={20} />
          </div>
          <span>Syndorela</span>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon size={18} className={cn("shrink-0", isActive ? "" : "text-muted-foreground group-hover:text-primary transition-colors")} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200"
        >
          <Settings size={18} />
          <span className="font-medium">Settings</span>
        </Link>
      </div>
    </aside>
  );
}
