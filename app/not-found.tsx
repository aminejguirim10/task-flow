import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, SearchX } from "lucide-react"

export default function NotFoundPage() {
  return (
    <div className="bg-background min-h-screen w-full">
      <div className="container mx-auto grid min-h-screen place-items-center px-6 py-16 md:px-16">
        <Card className="mx-auto w-full max-w-2xl border shadow-sm">
          <CardContent className="p-8 text-center sm:p-10">
            <div className="from-accent/20 to-primary/20 ring-border mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr ring-1">
              <SearchX className="text-accent h-8 w-8" />
            </div>
            <div className="from-primary to-accent bg-gradient-to-r bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
              404
            </div>
            <h1 className="font-heading mt-2 text-lg font-semibold sm:text-xl">
              Page not found
            </h1>
            <p className="text-muted-foreground mx-auto mt-2 max-w-md text-sm sm:text-base">
              Sorry, the page you’re looking for doesn’t exist or may have been
              moved.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild className="group/button px-6">
                <Link href="/">
                  Back to home
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="px-6">
                <Link href="/projects">Browse projects</Link>
              </Button>
              <Button asChild variant="ghost" className="px-6">
                <Link href="/chat">Open chat</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
