import ProjectTasks from "@/components/app/project-tasks"
import { prisma } from "@/lib/db"
import { ServerSession } from "@/lib/session"
import { notFound, redirect } from "next/navigation"

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  const project = await prisma.project.findUnique({
    where: { id },
    select: { title: true, description: true },
  })

  if (!project) return notFound()

  return {
    title: project.title,
    description: project.description,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await ServerSession()
  if (!session) {
    redirect("/login")
  }
  const { id } = await params

  const project = await prisma.project.findUnique({
    where: { id },
    include: { tasks: true },
  })

  if (!project) return notFound()

  if (project.userId !== session.user.id) {
    redirect("/chat")
  }

  return (
    <div className="bg-background min-h-screen">
      <main className="mx-auto max-w-7xl px-4 py-8">
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
