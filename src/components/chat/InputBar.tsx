import { useState } from "react";
import { Send, Mic, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface InputBarProps {
  onSend: (message: string) => void;
  isVoiceMode: boolean;
  onToggleVoice: () => void;
  disabled?: boolean;
}

export default function InputBar({
  onSend,
  isVoiceMode,
  onToggleVoice,
  disabled,
}: InputBarProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="pb-6">
      <div className="flex items-center gap-3 p-4 bg-card glass glass-border rounded-2xl">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message or use voice..."
          className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder:text-muted-foreground"
          disabled={isVoiceMode || disabled}
        />

        <Button
          size="icon"
          variant="ghost"
          onClick={onToggleVoice}
          className={`rounded-full transition-all ${
            isVoiceMode
              ? "bg-destructive/20 text-destructive hover:bg-destructive/30"
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          {isVoiceMode ? (
            <Square className="w-5 h-5" />
          ) : (
            <Mic className="w-5 h-5" />
          )}
        </Button>

        <Button
          size="icon"
          onClick={handleSend}
          disabled={!input.trim() || isVoiceMode || disabled}
          className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan transition-all"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-2">
        Aurora can make mistakes. Verify important information.
      </p>
    </div>
  );
}
