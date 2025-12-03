import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble, { Message } from "./MessageBubble";
import InputBar from "./InputBar";
import TypingIndicator from "./TypingIndicator";
import VoiceVisualizer from "../voice/VoiceVisualizer";

const INITIAL_MESSAGE: Message = {
  id: "1",
  role: "assistant",
  content: "Good morning. I'm Aurora, your AI companion. How can I assist you today?",
  timestamp: new Date(),
};

const MOCK_RESPONSES = [
  "I understand. Let me help you with that. Based on what you've shared, I can provide several approaches to address this.",
  "That's an interesting question. Here's what I think you should consider...",
  "I've analyzed your request and have some recommendations ready for you.",
  "Let me process that information. I see several opportunities here that we could explore together.",
  "Great point. I'll work on that and provide you with a comprehensive response.",
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsStreaming(true);

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)],
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsStreaming(false);
  };

  const toggleVoiceMode = () => {
    setIsVoiceMode(!isVoiceMode);
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto px-4">
      {/* Messages area */}
      <ScrollArea className="flex-1 py-6" ref={scrollRef}>
        <div className="space-y-6">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isStreaming && <TypingIndicator />}
        </div>
      </ScrollArea>

      {/* Voice visualizer */}
      {isVoiceMode && (
        <div className="py-4">
          <VoiceVisualizer isActive={isVoiceMode} />
        </div>
      )}

      {/* Input area */}
      <InputBar
        onSend={handleSend}
        isVoiceMode={isVoiceMode}
        onToggleVoice={toggleVoiceMode}
        disabled={isStreaming}
      />
    </div>
  );
}
