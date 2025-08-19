import ProjectTasks from "@/components/project-tasks"
import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const project = await prisma.project.findUnique({
    where: { id },
    include: { tasks: true },
  })

  if (!project) return notFound()

  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <ProjectTasks
          title={project.title}
          description={project.description}
          timeline={project.timeline}
          milestones={project.milestone}
          tasks={project.tasks.map((t, i) => ({
            id: t.id,
            title: t.title,
            description: t.description,
            priority: t.priority,
            estimatedTime: t.estimatedTime,
            category: t.category,
            dependencies: t.dependencies ?? [],
            tags: t.tags ?? [],
            completed: t.completed,
            taskNumber: i + 1,
          }))}
        />
      </main>
    </div>
  )
}
