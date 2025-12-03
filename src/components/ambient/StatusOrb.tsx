import { motion } from "framer-motion";

interface StatusOrbProps {
  status: "active" | "thinking" | "idle";
}

export default function StatusOrb({ status }: StatusOrbProps) {
  const colors = {
    active: "bg-primary",
    thinking: "bg-aurora-purple",
    idle: "bg-muted-foreground",
  };

  const labels = {
    active: "Active & Listening",
    thinking: "Processing...",
    idle: "Standing by",
  };

  return (
    <div className="flex items-center gap-3">
      <motion.div
        animate={{
          scale: status === "active" ? [1, 1.1, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: status === "active" ? Infinity : 0,
          ease: "easeInOut",
        }}
        className={`w-3 h-3 rounded-full ${colors[status]} ${
          status === "active" ? "animate-aurora-pulse" : ""
        }`}
      />
      <span className="text-sm font-medium">{labels[status]}</span>
    </div>
  );
}
