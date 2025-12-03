import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Brain, Clock, ChevronRight, ChevronLeft } from "lucide-react";
import StatusOrb from "./StatusOrb";
import { Button } from "@/components/ui/button";

interface AmbientDisplayProps {
  isThinking?: boolean;
}

export default function AmbientDisplay({ isThinking = false }: AmbientDisplayProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const status = isThinking ? "thinking" : "active";

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute top-20 left-4 z-20"
    >
      <div
        className={`bg-card/80 glass glass-border rounded-2xl transition-all duration-300 ${
          isCollapsed ? "w-12 p-3" : "w-64 p-4"
        }`}
      >
        {isCollapsed ? (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsCollapsed(false)}
            className="w-full h-auto p-0"
          >
            <div className="w-3 h-3 rounded-full bg-primary animate-aurora-pulse" />
          </Button>
        ) : (
          <>
            {/* Header with collapse button */}
            <div className="flex items-center justify-between mb-4">
              <StatusOrb status={status} />
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsCollapsed(true)}
                className="h-6 w-6 text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>

            {/* Context info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                <span>
                  {currentTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Activity className="w-4 h-4 text-accent" />
                <span>No active tasks</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Brain className="w-4 h-4 text-secondary" />
                <span>Ready to assist</span>
              </div>
            </div>

            {/* Quick stats */}
            <div className="mt-4 pt-4 border-t border-border/50">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center p-2 rounded-lg bg-muted/30">
                  <div className="text-lg font-bold text-primary">3</div>
                  <div className="text-xs text-muted-foreground">Missions</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/30">
                  <div className="text-lg font-bold text-accent">12</div>
                  <div className="text-xs text-muted-foreground">Tasks</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
