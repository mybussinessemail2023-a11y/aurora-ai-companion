import { motion } from "framer-motion";
import { MessageSquare, Rocket, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  activeView: "chat" | "missions";
  onViewChange: (view: "chat" | "missions") => void;
}

export default function Header({ activeView, onViewChange }: HeaderProps) {
  return (
    <header className="h-16 border-b border-border/50 glass flex items-center justify-between px-6 relative z-10">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-10 h-10 rounded-full bg-aurora-gradient flex items-center justify-center glow-cyan"
        >
          <span className="text-lg font-bold text-primary-foreground">A</span>
        </motion.div>
        <div>
          <h1 className="text-lg font-semibold text-glow-cyan">Aurora</h1>
          <p className="text-xs text-muted-foreground">Your AI Companion</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-1 bg-muted/30 p-1 rounded-lg">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewChange("chat")}
          className={`gap-2 transition-all ${
            activeView === "chat"
              ? "bg-primary/20 text-primary hover:bg-primary/30"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Chat
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewChange("missions")}
          className={`gap-2 transition-all ${
            activeView === "missions"
              ? "bg-primary/20 text-primary hover:bg-primary/30"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Rocket className="w-4 h-4" />
          Missions
        </Button>
      </nav>

      {/* Settings */}
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-foreground"
      >
        <Settings className="w-5 h-5" />
      </Button>
    </header>
  );
}
