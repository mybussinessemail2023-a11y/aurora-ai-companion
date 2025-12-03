import { motion } from "framer-motion";
import { Plus, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import GoalCard from "./GoalCard";

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

const SAMPLE_MISSIONS: Mission[] = [
  {
    id: "1",
    title: "Launch Startup MVP",
    description: "Build and deploy the minimum viable product",
    progress: 70,
    tasks: [
      { id: "1-1", title: "Complete authentication system", completed: true },
      { id: "1-2", title: "Build dashboard UI", completed: true },
      { id: "1-3", title: "Integrate payment gateway", completed: true },
      { id: "1-4", title: "Deploy to production", completed: false },
      { id: "1-5", title: "User testing & feedback", completed: false },
    ],
  },
  {
    id: "2",
    title: "Learn Machine Learning",
    description: "Master the fundamentals of ML/AI",
    progress: 40,
    tasks: [
      { id: "2-1", title: "Complete Python basics", completed: true },
      { id: "2-2", title: "Study linear algebra", completed: true },
      { id: "2-3", title: "Neural networks course", completed: false },
      { id: "2-4", title: "Build first model", completed: false },
      { id: "2-5", title: "Kaggle competition", completed: false },
    ],
  },
  {
    id: "3",
    title: "Fitness Goals 2024",
    description: "Health and wellness milestones",
    progress: 25,
    tasks: [
      { id: "3-1", title: "Establish morning routine", completed: true },
      { id: "3-2", title: "Run 5K without stopping", completed: false },
      { id: "3-3", title: "Complete 30-day challenge", completed: false },
      { id: "3-4", title: "Hit target weight", completed: false },
    ],
  },
];

export default function MissionControl() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-aurora-gradient flex items-center justify-center glow-cyan">
                <Rocket className="w-5 h-5 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold">Mission Control</h2>
            </div>
            <p className="text-muted-foreground">
              Track your goals and Aurora will help you achieve them
            </p>
          </div>

          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan">
            <Plus className="w-4 h-4 mr-2" />
            New Mission
          </Button>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4"
        >
          <div className="bg-card glass glass-border rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {SAMPLE_MISSIONS.length}
            </div>
            <div className="text-sm text-muted-foreground">Active Missions</div>
          </div>
          <div className="bg-card glass glass-border rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-accent">
              {SAMPLE_MISSIONS.reduce(
                (acc, m) => acc + m.tasks.filter((t) => t.completed).length,
                0
              )}
            </div>
            <div className="text-sm text-muted-foreground">Tasks Completed</div>
          </div>
          <div className="bg-card glass glass-border rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-secondary">
              {Math.round(
                SAMPLE_MISSIONS.reduce((acc, m) => acc + m.progress, 0) /
                  SAMPLE_MISSIONS.length
              )}
              %
            </div>
            <div className="text-sm text-muted-foreground">Overall Progress</div>
          </div>
        </motion.div>

        {/* Mission Cards */}
        <div className="space-y-4">
          {SAMPLE_MISSIONS.map((mission, index) => (
            <GoalCard key={mission.id} mission={mission} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
