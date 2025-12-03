import { motion } from "framer-motion";
import { CheckCircle2, Circle, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import ProgressRing from "./ProgressRing";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface Mission {
  id: string;
  title: string;
  description?: string;
  progress: number;
  tasks: Task[];
}

interface GoalCardProps {
  mission: Mission;
  index: number;
}

export default function GoalCard({ mission, index }: GoalCardProps) {
  const completedTasks = mission.tasks.filter((t) => t.completed).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="p-6 bg-card glass glass-border hover:border-primary/30 transition-all duration-300">
        <div className="flex items-start gap-4">
          {/* Progress Ring */}
          <ProgressRing progress={mission.progress} />

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="text-lg font-semibold text-foreground truncate">
                  {mission.title}
                </h3>
                {mission.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {mission.description}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded-full shrink-0">
                <Target className="w-3 h-3" />
                <span>
                  {completedTasks}/{mission.tasks.length}
                </span>
              </div>
            </div>

            {/* Tasks */}
            <div className="space-y-2">
              {mission.tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-2 text-sm"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                  <span
                    className={
                      task.completed
                        ? "text-muted-foreground line-through"
                        : "text-foreground"
                    }
                  >
                    {task.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
