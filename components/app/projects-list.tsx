"use client"

import { useMemo, useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Project } from "@prisma/client"
import { deleteProject } from "@/actions/project.actions"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trash2, ArrowRight, Search, SearchX } from "lucide-react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type FullProject = Project & { totalTasks?: number; tasksCompleted?: number }

export default function ProjectsList({
  projects,
  userId,
}: {
  projects: FullProject[]
  userId: string
}) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [isPending, startTransition] = useTransition()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return projects
    return projects.filter((p) => p.title.toLowerCase().includes(q))
  }, [query, projects])

  const onDelete = async (id: string) => {
    setDeletingId(id)
    try {
      const res = await deleteProject(id, userId)
      if (!res?.ok) throw new Error(res?.error || "Failed to delete")
      toast.success("Project deleted")
      startTransition(() => router.refresh())
    } catch (e: any) {
      toast.error(e?.message || "Delete error")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">My projects</h1>
        <div className="relative w-full sm:w-80">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search by title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mx-auto w-full max-w-2xl pt-10 md:pt-20">
          <Card className="border shadow-sm">
            <CardContent className="p-8 text-center sm:p-10">
              <div className="from-accent/20 to-primary/20 ring-border mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr ring-1">
                <SearchX className="text-accent h-8 w-8" />
              </div>
              <h2 className="from-primary to-accent bg-gradient-to-r bg-clip-text text-xl font-extrabold tracking-tight text-transparent sm:text-2xl">
                No projects found
              </h2>
              <p className="text-muted-foreground mx-auto mt-2 max-w-md text-sm sm:text-base">
                {query
                  ? "No results match your search. Try clearing the filter or adjust your keywords."
                  : "You don’t have any projects yet. Start by exploring or chatting with the assistant."}
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                {query && (
                  <Button
                    variant="default"
                    className="px-6"
                    onClick={() => setQuery("")}
                  >
                    Clear search
                  </Button>
                )}
                <Button asChild variant="outline" className="px-6">
                  <Link href="/chat">Open chat</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => {
            const total = p.totalTasks
            const done = p.tasksCompleted
            const progress =
              typeof total === "number" && total > 0 && typeof done === "number"
                ? Math.round((done / total) * 100)
                : undefined
            return (
              <Card
                key={p.id}
                className="group cursor-pointer transition-shadow hover:shadow-md"
                onClick={() => {
                  if (!isPending) {
                    router.push(`/projects/${p.id}`)
                  }
                }}
              >
                <CardHeader className="border-b">
                  <CardTitle className="line-clamp-1 h-[20px]">
                    {p.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {p.description}
                  </CardDescription>
                  <CardAction>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                          disabled={deletingId === p.id || isPending}
                          className="text-destructive hover:text-destructive"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete project</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the project and remove its tasks from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            onClick={(e) => e.stopPropagation()}
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={(e) => {
                              e.stopPropagation()
                              onDelete(p.id)
                            }}
                            disabled={deletingId === p.id || isPending}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardAction>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
                    <Badge variant="secondary">Timeline: {p.timeline}</Badge>
                    {Array.isArray(p.milestone) && p.milestone.length > 0 && (
                      <Badge variant="outline">
                        {p.milestone.length} milestones
                      </Badge>
                    )}
                  </div>

                  {typeof progress === "number" && (
                    <div className="space-y-2">
                      <div className="text-muted-foreground flex items-center justify-between text-xs">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-muted-foreground text-xs">
                      {typeof total === "number" ? `${total} tasks` : ""}
                    </div>
                    <Button
                      variant="default"
                      onClick={() => router.push(`/projects/${p.id}`)}
                      className="group/button hover:cursor-pointer"
                      disabled={isPending}
                    >
                      Open
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/button:translate-x-0.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
