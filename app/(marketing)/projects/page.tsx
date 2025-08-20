import ProjectsList from "@/components/app/projects-list"
import { prisma } from "@/lib/db"
import { ServerSession } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function ProjectsPage() {
  const session = await ServerSession()
  if (!session) redirect("/login")

  const projects = await prisma.project.findMany({
    where: { userId: session.user.id },
    include: {
      tasks: { select: { completed: true } },
    },
    orderBy: { id: "desc" },
  })

  const normalized = projects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    timeline: p.timeline,
    milestone: p.milestone,
    userId: p.userId,
    totalTasks: p.tasks.length,
    tasksCompleted: p.tasks.filter((t) => t.completed).length,
  }))

  return (
    <div className="bg-background min-h-screen">
      <main className="mx-auto max-w-7xl px-4 py-8">
        <ProjectsList projects={normalized} userId={session.user.id} />
      </main>
    </div>
  )
}
