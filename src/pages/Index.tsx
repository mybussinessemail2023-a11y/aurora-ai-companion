import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/layout/Header";
import BackgroundEffects from "@/components/layout/BackgroundEffects";
import AmbientDisplay from "@/components/ambient/AmbientDisplay";
import ChatInterface from "@/components/chat/ChatInterface";
import MissionControl from "@/components/missions/MissionControl";

export default function Index() {
  const [activeView, setActiveView] = useState<"chat" | "missions">("chat");

  return (
    <main className="h-screen w-screen bg-background overflow-hidden relative">
      {/* Animated background */}
      <BackgroundEffects />

      {/* Ambient status display */}
      <AmbientDisplay />

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <Header activeView={activeView} onViewChange={setActiveView} />

        {/* Content area with view transitions */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {activeView === "chat" ? (
              <motion.div
                key="chat"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <ChatInterface />
              </motion.div>
            ) : (
              <motion.div
                key="missions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <MissionControl />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
