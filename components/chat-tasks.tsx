"use client"

import type React from "react"

import { useState } from "react"
import { experimental_useObject as useObject } from "@ai-sdk/react"
import { taskSchema } from "@/lib/schema"
import type { Task } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskCard } from "@/components/task-card"
import { ProjectOverview } from "@/components/project-overview"
import { ExportButtons } from "@/components/export-buttons"
import { Sparkles, Plus, Loader2, Brain } from "lucide-react"

export default function ChatTasks() {
  const [prompt, setPrompt] = useState("")
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set())

  const { submit, object, isLoading, error, stop } = useObject({
    api: "/api/chat",
    schema: taskSchema,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return
    submit({ prompt })
    setPrompt("")
    setCompletedTasks(new Set()) // Reset completed tasks for new project
  }

  const handleToggleComplete = (taskId: string) => {
    setCompletedTasks((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(taskId)) {
        newSet.delete(taskId)
      } else {
        newSet.add(taskId)
      }
      return newSet
    })
  }

  const project = object?.project

  // Type guard to ensure the task is complete according to our Task type
  const isCompleteTask = (t: any): t is Task =>
    t &&
    typeof t.id === "string" &&
    typeof t.title === "string" &&
    typeof t.description === "string" &&
    typeof t.priority === "string" &&
    typeof t.estimatedTime === "string" &&
    typeof t.category === "string"

  // Ensure a typed array of tasks, filtering out partial objects during streaming
  const tasks: Task[] = (project?.tasks ?? []).filter(isCompleteTask)
  const completedCount = tasks.filter((task) =>
    completedTasks.has(task.id)
  ).length

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="bg-card/50 sticky top-0 z-10 border-b backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-lg p-2">
                <Brain className="text-primary-foreground h-6 w-6" />
              </div>
              <div>
                <h1 className="font-heading text-2xl font-bold">
                  AI Task Manager Pro
                </h1>
                <p className="text-muted-foreground text-sm">
                  Generate intelligent task breakdowns with AI
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* AI Task Generation Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <Sparkles className="text-accent h-5 w-5" />
              Generate Tasks with AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-3">
                <Input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your project or goal... (e.g., 'Build a mobile app for fitness tracking')"
                  className="flex-1"
                  disabled={isLoading}
                />
                {isLoading ? (
                  <Button
                    type="button"
                    onClick={stop}
                    variant="destructive"
                    className="px-6"
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Stop
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!prompt.trim()}
                    className="px-6"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Generate
                  </Button>
                )}
              </div>

              {error && (
                <div className="bg-destructive/10 border-destructive/20 rounded-md border p-3">
                  <p className="text-destructive text-sm">{error.message}</p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && !project && (
          <Card>
            <CardContent className="py-12">
              <div className="flex flex-col items-center justify-center text-center">
                <Loader2 className="text-accent mb-4 h-8 w-8 animate-spin" />
                <h3 className="font-heading mb-2 text-lg font-semibold">
                  AI is analyzing your project...
                </h3>
                <p className="text-muted-foreground">
                  Creating a comprehensive task breakdown with priorities and
                  timelines
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Project Overview and Tasks */}
        {project && (
          <div className="space-y-6">
            <ProjectOverview
              title={project?.title ?? "Untitled Project"}
              description={project?.description ?? ""}
              timeline={project?.timeline ?? ""}
              milestones={(project?.milestones ?? []).filter(
                (m): m is string => typeof m === "string"
              )}
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
                  tasks={tasks}
                  projectTitle={project?.title ?? "Project"}
                />
              </CardContent>
            </Card>

            {/* Tasks Grid */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-heading text-xl font-semibold">
                  Tasks ({completedCount}/{tasks.length} completed)
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tasks.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    task={{
                      ...task,
                      completed: completedTasks.has(task.id),
                    }}
                    taskNumber={index + 1} // Added taskNumber prop starting from 1
                    onToggleComplete={handleToggleComplete}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!project && !isLoading && (
          <Card>
            <CardContent className="py-12">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="bg-accent/10 mb-4 rounded-full p-4">
                  <Brain className="text-accent h-8 w-8" />
                </div>
                <h3 className="font-heading mb-2 text-lg font-semibold">
                  Ready to boost your productivity?
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Describe any project or goal, and our AI will generate a
                  comprehensive task breakdown with priorities, timelines, and
                  dependencies.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
