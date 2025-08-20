import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ChatLoadingPage() {
  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-6 w-56" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-28" />
            </div>
            <div className="rounded-md border p-3">
              <Skeleton className="h-4 w-56" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center gap-3 text-center">
              <Skeleton className="h-16 w-16 rounded-full" />
              <Skeleton className="h-6 w-72" />
              <Skeleton className="h-4 w-[28rem] max-w-full" />
              <Skeleton className="h-4 w-80 max-w-full" />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
