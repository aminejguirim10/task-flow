"use client"

import { useState, useTransition, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectOverview } from "@/components/app/project-overview"
import { ExportButtons } from "@/components/shared/export-buttons"
import { TaskCard } from "@/components/app/task-card"
import { updateTaskStatus } from "@/actions/project.actions"
import { PRIORITY } from "@prisma/client"

type UITask = {
  id: string
  title: string
  description: string
  priority: PRIORITY
  estimatedTime: string
  category: string
  dependencies?: string[]
  tags?: string[]
  completed?: boolean
  taskNumber: number
}

export default function ProjectTasks({
  title,
  description,
  timeline,
  milestones,
  tasks,
}: {
  title: string
  description: string
  timeline: string
  milestones: string[]
  tasks: UITask[]
}) {
  const [local, setLocal] = useState<Record<string, boolean>>(() =>
    tasks.reduce(
      (acc, t) => {
        acc[t.id] = !!t.completed
        return acc
      },
      {} as Record<string, boolean>
    )
  )
  const [isPending, startTransition] = useTransition()

  const completedCount = useMemo(
    () => tasks.filter((t) => local[t.id]).length,
    [local, tasks]
  )

  const onToggleComplete = (taskId: string) => {
    setLocal((prev) => ({ ...prev, [taskId]: !prev[taskId] }))
    startTransition(async () => {
      const fd = new FormData()
      fd.append("taskId", taskId)
      fd.append("completed", String(!local[taskId]))
      const res = await updateTaskStatus(fd)
      if (!res.ok) {
        // revert on error
        setLocal((prev) => ({ ...prev, [taskId]: !prev[taskId] }))
      }
    })
  }

  return (
    <div className="space-y-6">
      <ProjectOverview
        title={title}
        description={description}
        timeline={timeline}
        milestones={milestones}
        totalTasks={tasks.length}
        completedTasks={completedCount}
      />

      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg">
            Export & Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ExportButtons
            tasks={tasks.map((t) => ({
              id: t.id,
              title: t.title,
              description: t.description,
              priority: t.priority,
              estimatedTime: t.estimatedTime,
              category: t.category,
              dependencies: t.dependencies ?? [],
              tags: t.tags ?? [],
            }))}
            projectTitle={title}
            showSaveDB={false}
            completedTaskIds={
              new Set(
                Object.entries(local)
                  .filter(([_, v]) => v)
                  .map(([k]) => k)
              )
            }
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg">
            Tasks ({completedCount}/{tasks.length} completed)
            {isPending && (
              <span className="text-muted-foreground ml-2 text-xs">
                Updating…
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={{ ...task, completed: local[task.id] }}
                taskNumber={task.taskNumber}
                onToggleComplete={onToggleComplete}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
