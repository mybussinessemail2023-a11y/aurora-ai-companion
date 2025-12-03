import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { format } from "date-fns";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  streaming?: boolean;
}

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isAssistant = message.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex gap-3 ${isAssistant ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Avatar */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
          isAssistant
            ? "bg-aurora-gradient glow-cyan"
            : "bg-muted"
        }`}
      >
        {isAssistant ? (
          <Bot className="w-5 h-5 text-primary-foreground" />
        ) : (
          <User className="w-5 h-5 text-muted-foreground" />
        )}
      </div>

      {/* Message content */}
      <div className={`flex flex-col gap-1 max-w-[70%] ${!isAssistant && "items-end"}`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isAssistant
              ? "bg-card glass glass-border"
              : "bg-primary/10 border border-primary/20"
          }`}
        >
          <p className="text-base leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>

        <span className="text-xs text-muted-foreground px-2">
          {format(message.timestamp, "h:mm a")}
        </span>
      </div>
    </motion.div>
  );
}
