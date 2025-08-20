import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectsLoadingPage() {
  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-7 w-40" />
          <div className="relative w-full sm:w-80">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="transition-shadow">
              <CardHeader className="space-y-2 border-b">
                <CardTitle>
                  <Skeleton className="h-5 w-48" />
                </CardTitle>
                <Skeleton className="h-4 w-64" />
                <div className="flex justify-end">
                  <Skeleton className="h-9 w-9 rounded-md" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-5 w-24" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                  <Skeleton className="h-2 w-full" />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-9 w-20 rounded-md" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
