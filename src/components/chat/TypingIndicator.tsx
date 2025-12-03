export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-primary animate-typing-1" />
        <div className="w-2 h-2 rounded-full bg-primary animate-typing-2" />
        <div className="w-2 h-2 rounded-full bg-primary animate-typing-3" />
      </div>
      <span className="text-sm">Aurora is thinking...</span>
    </div>
  );
}
