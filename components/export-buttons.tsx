"use client"
import { Button } from "@/components/ui/button"
import { Download, Calendar, Check, Loader2, Save } from "lucide-react"
import type { Task } from "@/lib/schema"
import { useState, useEffect } from "react"
import { Project } from "@prisma/client"
import { createProject } from "@/actions/project.actions"
import { useRouter } from "next/navigation"

interface ExportButtonsProps {
  tasks: Task[]
  projectTitle: string
  project?: Project
  showSaveDB: boolean
}

export function ExportButtons({
  tasks,
  projectTitle,
  project,
  showSaveDB,
}: ExportButtonsProps) {
  const [showCalendarTasks, setShowCalendarTasks] = useState(false)
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set())
  const [pendingTasks, setPendingTasks] = useState<Set<string>>(new Set())
  const [saveResult, setSaveResult] = useState<
    { ok: true; id: string } | { ok: false; error: string } | null
  >(null)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const savedExportedTasks = localStorage.getItem("exported-calendar-tasks")
    if (savedExportedTasks) {
      setCompletedTasks(new Set(JSON.parse(savedExportedTasks)))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      "exported-calendar-tasks",
      JSON.stringify([...completedTasks])
    )
  }, [completedTasks])

  const getTaskId = (task: Task, projectTitle: string) => {
    return `${projectTitle}-${task.title}-${task.description.substring(0, 50)}`.replace(
      /[^a-zA-Z0-9]/g,
      "-"
    )
  }

  const exportToCSV = () => {
    const headers = [
      "Title",
      "Description",
      "Priority",
      "Category",
      "Estimated Time",
      "Dependencies",
      "Status",
    ]
    const csvContent = [
      headers.join(","),
      ...tasks.map((task) =>
        [
          `"${task.title}"`,
          `"${task.description}"`,
          task.priority,
          task.category,
          task.estimatedTime,
          `"${task.dependencies?.join("; ") || ""}"`,
          "Pending",
        ].join(",")
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute(
      "download",
      `${projectTitle.replace(/[^a-z0-9]/gi, "_")}_tasks.csv`
    )
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const openCalendarEvent = (task: Task, originalTaskIndex: number) => {
    const taskId = getTaskId(task, projectTitle)
    const baseUrl =
      "https://calendar.google.com/calendar/render?action=TEMPLATE"

    const WORK_START_HOUR = 9
    const WORK_END_HOUR = 18
    const WORK_HOURS_PER_DAY = WORK_END_HOUR - WORK_START_HOUR // 9 hours

    const startDate = new Date()
    startDate.setHours(WORK_START_HOUR, 0, 0, 0) // Start at 9 AM

    let totalWorkMinutes = 0

    // Calculate total work minutes from all previous tasks
    for (let i = 0; i < originalTaskIndex; i++) {
      const prevTask = tasks[i]
      const timeMatch = prevTask.estimatedTime.match(
        /(\d+(?:\.\d+)?)\s*(hour|hr|h|minute|min|m)/i
      )
      let durationMinutes = 120 // default 2 hours

      if (timeMatch) {
        const value = Number.parseFloat(timeMatch[1])
        const unit = timeMatch[2].toLowerCase()
        if (unit.startsWith("h")) {
          durationMinutes = value * 60
        } else if (unit.startsWith("m")) {
          durationMinutes = value
        }
      }
      totalWorkMinutes += durationMinutes
    }

    // Calculate which day and time within that day
    const totalWorkHours = totalWorkMinutes / 60
    const daysOffset = Math.floor(totalWorkHours / WORK_HOURS_PER_DAY)
    const remainingHours = totalWorkHours % WORK_HOURS_PER_DAY

    // Set the start date with day offset
    startDate.setDate(startDate.getDate() + daysOffset)
    startDate.setHours(
      WORK_START_HOUR + Math.floor(remainingHours),
      (remainingHours % 1) * 60,
      0,
      0
    )

    // Calculate current task duration
    const timeMatch = task.estimatedTime.match(
      /(\d+(?:\.\d+)?)\s*(hour|hr|h|minute|min|m)/i
    )
    let durationMinutes = 120 // default 2 hours

    if (timeMatch) {
      const value = Number.parseFloat(timeMatch[1])
      const unit = timeMatch[2].toLowerCase()
      if (unit.startsWith("h")) {
        durationMinutes = value * 60
      } else if (unit.startsWith("m")) {
        durationMinutes = value
      }
    }

    const endDate = new Date(startDate)
    endDate.setMinutes(startDate.getMinutes() + durationMinutes)

    // Check if task extends beyond work hours (allow exactly at END_HOUR)
    if (
      endDate.getHours() > WORK_END_HOUR ||
      (endDate.getHours() === WORK_END_HOUR && endDate.getMinutes() > 0)
    ) {
      // Move to next day at 9 AM
      startDate.setDate(startDate.getDate() + 1)
      startDate.setHours(WORK_START_HOUR, 0, 0, 0)
      endDate.setTime(startDate.getTime() + durationMinutes * 60000)
    }

    // Build local datetime in Google Calendar format YYYYMMDDTHHmmss (local time)
    const formatLocalDate = (date: Date) => {
      const pad = (n: number) => String(n).padStart(2, "0")
      const y = date.getFullYear()
      const m = pad(date.getMonth() + 1)
      const d = pad(date.getDate())
      const hh = pad(date.getHours())
      const mm = pad(date.getMinutes())
      const ss = pad(date.getSeconds())
      return `${y}${m}${d}T${hh}${mm}${ss}`
    }

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    const params = new URLSearchParams({
      text: `${projectTitle}: ${task.title}`,
      details: `${task.description}\n\nPriority: ${task.priority}\nCategory: ${task.category}\nEstimated Time: ${task.estimatedTime}${task.dependencies?.length ? `\nDependencies: ${task.dependencies.join(", ")}` : ""}\n\nScheduled: ${startDate.toLocaleDateString()} ${startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
      dates: `${formatLocalDate(startDate)}/${formatLocalDate(endDate)}`,
      ctz: timeZone,
    })

    window.open(`${baseUrl}&${params.toString()}`, "_blank")

    setPendingTasks((prev) => new Set([...prev, taskId]))
  }

  const markTaskAsDone = (task: Task) => {
    const taskId = getTaskId(task, projectTitle)
    setCompletedTasks((prev) => new Set([...prev, taskId]))
    setPendingTasks((prev) => {
      const newSet = new Set(prev)
      newSet.delete(taskId)
      return newSet
    })
  }

  const exportToGoogleCalendar = () => {
    setShowCalendarTasks(true)
  }

  const availableTasks = tasks.filter(
    (task) => !completedTasks.has(getTaskId(task, projectTitle))
  )
  const exportedCount = tasks.length - availableTasks.length
  const handleSave = async () => {
    if (!project) return
    try {
      setSaving(true)
      setSaveResult(null)
      const fd = new FormData()
      fd.append("payload", JSON.stringify({ project }))
      const res = await createProject(fd)
      setSaveResult(res as any)
      if (res.ok && res.id) {
        router.push(`/projects/${res.id}`)
      }
    } catch (e: any) {
      setSaveResult({ ok: false, error: e?.message || "Unknown error" })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {showSaveDB && (
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save to DB
              </>
            )}
          </Button>
        )}
        <Button
          disabled={saving}
          onClick={exportToCSV}
          variant="outline"
          className="flex items-center gap-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 hover:from-green-100 hover:to-emerald-100 hover:text-green-800"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Button>

        <Button
          disabled={saving}
          onClick={exportToGoogleCalendar}
          variant="outline"
          className="flex items-center gap-2 border-blue-200 bg-gradient-to-r from-blue-50 to-sky-50 text-blue-700 hover:from-blue-100 hover:to-sky-100 hover:text-blue-800"
        >
          <Calendar className="h-4 w-4" />
          Google Calendar
          {exportedCount > 0 && (
            <span className="ml-1 rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
              {exportedCount} done
            </span>
          )}
        </Button>
      </div>
      {showSaveDB && saveResult && (
        <p
          className={`text-sm ${
            saveResult.ok ? "text-green-600" : "text-red-600"
          }`}
        >
          {saveResult.ok
            ? `Saved (id: ${saveResult.id})`
            : `Failed: ${saveResult.error}`}
        </p>
      )}
      {showCalendarTasks && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-blue-900">
              Export to Google Calendar
            </h3>
            <Button
              disabled={saving}
              variant="ghost"
              size="sm"
              onClick={() => setShowCalendarTasks(false)}
              className="text-blue-600 hover:text-blue-800"
            >
              ✕
            </Button>
          </div>

          {availableTasks.length === 0 ? (
            <div className="py-4 text-center">
              <Check className="mx-auto mb-2 h-8 w-8 text-green-600" />
              <p className="font-medium text-green-700">
                All tasks have been exported to Google Calendar!
              </p>
              <p className="mt-1 text-sm text-green-600">
                {exportedCount} tasks completed
              </p>
            </div>
          ) : (
            <>
              <p className="mb-4 text-sm text-blue-700">
                Click "Add to Calendar" to open Google Calendar, then click
                "Mark as Done" after you save the event:
              </p>
              <div className="max-h-60 space-y-2 overflow-y-auto">
                {availableTasks.map((task) => {
                  const taskId = getTaskId(task, projectTitle)
                  const isPending = pendingTasks.has(taskId)
                  const originalIndex = tasks.findIndex((t) => t.id === task.id)

                  return (
                    <div
                      key={task.id}
                      className="flex items-center justify-between rounded-md border border-blue-200 bg-white p-3 hover:bg-blue-50"
                    >
                      <div className="flex-1">
                        <div className="text-sm font-medium">{task.title}</div>
                        <div className="text-xs text-gray-600">
                          {task.priority} • {task.estimatedTime}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => openCalendarEvent(task, originalIndex)}
                          className="bg-blue-600 hover:bg-blue-700"
                          disabled={isPending || saving}
                        >
                          {isPending ? "Opened" : "Add to Calendar"}
                        </Button>
                        {isPending && (
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={saving}
                            onClick={() => markTaskAsDone(task)}
                            className="border-green-200 text-green-700 hover:bg-green-50"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-3 text-sm text-blue-600">
                Progress: {exportedCount}/{tasks.length} tasks exported
                {availableTasks.length > 0 &&
                  ` • ${availableTasks.length} remaining`}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
