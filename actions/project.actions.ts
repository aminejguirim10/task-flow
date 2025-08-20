"use server"

import { prisma } from "@/lib/db"
import { projectSchema } from "@/lib/schema"
import type { PRIORITY } from "@prisma/client"

export async function createProject(formData: FormData) {
  try {
    const raw = formData.get("payload")
    if (typeof raw !== "string") {
      return { ok: false, error: "Payload manquant" }
    }

    const parsedJson = JSON.parse(raw)
    const parsed = projectSchema.safeParse(parsedJson)

    if (!parsed.success) {
      return { ok: false, error: "Payload invalide" }
    }

    const { project } = parsed.data

    const created = await prisma.project.create({
      data: {
        userId: project.userId,
        title: project.title,
        description: project.description,
        timeline: project.timeline,
        milestone: project.milestones ?? [],
        tasks: {
          create: project.tasks.map((t) => ({
            title: t.title,
            description: t.description,
            priority: t.priority as PRIORITY,
            estimatedTime: t.estimatedTime,
            category: t.category,
            dependencies: t.dependencies ?? [],
            tags: t.tags ?? [],
            completed: false,
          })),
        },
      },
      select: { id: true },
    })

    return { ok: true, id: created.id }
  } catch (err) {
    console.error("createProject error", err)
    return { ok: false, error: (err as Error).message }
  }
}

export async function updateTaskStatus(formData: FormData) {
  try {
    const taskId = formData.get("taskId")
    const completedRaw = formData.get("completed")

    if (typeof taskId !== "string") {
      return { ok: false, error: "taskId manquant" }
    }

    const completed = String(completedRaw) === "true"

    const updated = await prisma.task.update({
      where: { id: taskId },
      data: { completed },
      select: { id: true, completed: true },
    })

    return { ok: true, task: updated }
  } catch (err) {
    console.error("updateTaskStatus error", err)
    return { ok: false, error: (err as Error).message }
  }
}
