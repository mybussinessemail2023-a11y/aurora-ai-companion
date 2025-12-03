import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface VoiceVisualizerProps {
  isActive: boolean;
}

export default function VoiceVisualizer({ isActive }: VoiceVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bars = 50;
    const barWidth = canvas.width / bars;
    const heights = Array(bars).fill(20);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < bars; i++) {
        // Smooth random height changes
        const targetHeight = Math.random() * canvas.height * 0.6 + 20;
        heights[i] += (targetHeight - heights[i]) * 0.1;

        const height = heights[i];
        const x = i * barWidth;
        const y = (canvas.height - height) / 2;

        // Create gradient for each bar
        const gradient = ctx.createLinearGradient(x, y, x, y + height);
        gradient.addColorStop(0, "hsl(192, 91%, 50%)"); // Cyan
        gradient.addColorStop(1, "hsl(263, 70%, 50%)"); // Purple

        ctx.fillStyle = gradient;
        ctx.fillRect(x + 1, y, barWidth - 2, height);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full h-24 flex flex-col items-center justify-center gap-4"
    >
      <canvas
        ref={canvasRef}
        width={600}
        height={80}
        className="rounded-lg max-w-full"
      />
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
        <span>Listening...</span>
      </div>
    </motion.div>
  );
}
