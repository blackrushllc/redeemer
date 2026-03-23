"use client";

import { useState } from "react";
import { 
  Sparkles, 
  Send, 
  X, 
  ChevronRight, 
  ChevronLeft,
  MessageSquare,
  History,
  Lightbulb,
  Zap,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { mockCopilotChat } from "@/lib/mock-data";

export function AICopilot() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState(mockCopilotChat);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: inputValue,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
    setInputValue("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: "I'm processing that based on the current context. I'll analyze the modules and give you a summary shortly.",
        timestamp: new Date().toISOString(),
        suggestedActions: ["View related modules", "Generate migration plan"]
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div 
      className={cn(
        "relative flex flex-col border-l bg-card/30 backdrop-blur-xl transition-all duration-300 ease-in-out shrink-0 overflow-hidden",
        isOpen ? "w-[400px]" : "w-12"
      )}
    >
      {!isOpen ? (
        <div className="flex flex-col items-center py-4 gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(true)}
            className="rounded-full bg-primary/10 text-primary hover:bg-primary/20"
          >
            <Sparkles size={20} />
          </Button>
          <div className="h-[1px] w-8 bg-border" />
          <Button variant="ghost" size="icon" className="text-muted-foreground"><MessageSquare size={20} /></Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground"><Target size={20} /></Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground"><Zap size={20} /></Button>
        </div>
      ) : (
        <>
          <div className="h-16 border-b flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-2 font-semibold">
              <Sparkles className="text-primary" size={18} />
              <span>AI Copilot</span>
              <Badge variant="outline" className="text-[10px] uppercase font-bold text-primary border-primary/20 bg-primary/5">Beta</Badge>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-xl">
              <ChevronRight size={18} />
            </Button>
          </div>

          <div className="flex-1 min-h-0 flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-6">
                {messages.map((msg) => (
                  <div key={msg.id} className={cn("flex flex-col gap-2", msg.role === "user" ? "items-end" : "items-start")}>
                    <div className={cn(
                      "max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
                      msg.role === "user" 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10" 
                        : "bg-muted shadow-sm"
                    )}>
                      {msg.content}
                    </div>
                    {msg.suggestedActions && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {msg.suggestedActions.map((action) => (
                          <button 
                            key={action}
                            className="text-[11px] px-2 py-1 rounded-lg border bg-background hover:bg-muted transition-colors text-muted-foreground flex items-center gap-1"
                          >
                            <Lightbulb size={12} className="text-primary" />
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t bg-background/50">
              <div className="flex flex-col gap-3">
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  <Badge variant="secondary" className="whitespace-nowrap cursor-pointer hover:bg-muted font-normal text-xs py-1 px-3 rounded-full border bg-background/50">#repo</Badge>
                  <Badge variant="secondary" className="whitespace-nowrap cursor-pointer hover:bg-muted font-normal text-xs py-1 px-3 rounded-full border bg-background/50">#analysis</Badge>
                  <Badge variant="secondary" className="whitespace-nowrap cursor-pointer hover:bg-muted font-normal text-xs py-1 px-3 rounded-full border bg-background/50">#pseudo</Badge>
                </div>
                <div className="relative">
                  <Input 
                    placeholder="Ask anything..." 
                    className="pr-10 bg-muted/50 border-none rounded-xl focus-visible:ring-primary"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  />
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-primary hover:text-primary hover:bg-primary/10 rounded-lg"
                    onClick={handleSend}
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
