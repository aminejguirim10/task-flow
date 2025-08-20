"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Tag, CheckCircle2, Circle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high" | "urgent"
  estimatedTime: string
  category: string
  dependencies?: string[]
  tags?: string[]
  completed?: boolean
}

interface TaskCardProps {
  task: Task
  taskNumber: number
  onToggleComplete?: (taskId: string) => void
}

const priorityConfig = {
  low: { color: "bg-green-100 text-green-800 border-green-200", icon: Circle },
  medium: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: Circle },
  high: {
    color: "bg-orange-100 text-orange-800 border-orange-200",
    icon: AlertCircle,
  },
  urgent: {
    color: "bg-red-100 text-red-800 border-red-200",
    icon: AlertCircle,
  },
}

export function TaskCard({
  task,
  taskNumber,
  onToggleComplete,
}: TaskCardProps) {
  const PriorityIcon = priorityConfig[task.priority].icon

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        task.completed && "opacity-60"
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-1 items-start gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="mt-0.5 h-6 w-6 p-0"
              onClick={() => onToggleComplete?.(task.id)}
            >
              {task.completed ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <Circle className="text-muted-foreground h-5 w-5" />
              )}
            </Button>
            <div className="flex-1">
              <div>
                <CardTitle
                  className={cn(
                    "font-heading line-clamp-1 text-lg leading-tight font-semibold",
                    task.completed && "text-muted-foreground line-through"
                  )}
                >
                  {task.title}
                </CardTitle>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="border-slate-300 bg-slate-100 font-mono text-xs text-slate-700"
                >
                  T-{taskNumber}
                </Badge>

                <Badge
                  variant="outline"
                  className={priorityConfig[task.priority].color}
                >
                  <PriorityIcon className="mr-1 h-3 w-3" />
                  {task.priority}
                </Badge>
                <Badge variant="secondary">{task.category}</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p
          className={cn(
            "text-muted-foreground mb-4 line-clamp-5 h-[110px] text-sm leading-relaxed",
            task.completed && "line-through"
          )}
        >
          {task.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-muted-foreground flex flex-col items-start gap-4 text-sm">
            <div className="flex items-center gap-1 text-green-700">
              <Clock className="h-4 w-4" />
              {task.estimatedTime}
            </div>
            {task.tags && task.tags.length > 0 && (
              <div className="flex items-center gap-1 text-blue-500">
                <Tag className="h-4 w-4" />
                <span>{task.tags.join(", ")}</span>
              </div>
            )}
          </div>
        </div>

        {task.dependencies && task.dependencies.length > 0 && (
          <div className="mt-3 border-t pt-3">
            <p className="text-muted-foreground text-xs font-semibold">
              Depends on: {task.dependencies.map((dep) => `${dep}`).join(", ")}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
