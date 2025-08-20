import { ArrowRight, Brain, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Hero = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <div className="text-accent mb-3 inline-flex items-center rounded-full border px-3 py-1 text-xs">
            <Sparkles className="mr-2 h-4 w-4" />
            Plan projects faster with AI
          </div>
          <h1 className="font-heading text-3xl leading-tight font-bold sm:text-4xl md:text-5xl">
            Transform your ideas into actionable project plans
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl text-base sm:text-lg">
            Describe your project in natural language and let AI generate a
            complete task breakdown with priorities, timelines, and
            dependencies.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="group/button px-6">
              <Link href="/register">
                Get started free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="bg-transparent px-6">
              <Link href="/login">Sign in</Link>
            </Button>
          </div>

          <div className="text-muted-foreground mt-4 text-xs">
            No credit card required • Magic link & social login
          </div>
        </div>

        <div className="relative">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2 text-lg">
                <Sparkles className="text-accent h-5 w-5" />
                Generate Tasks with AI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="text-muted-foreground flex-1 rounded-md border p-2 text-sm">
                  Describe your project or goal...
                </div>
                <div className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm">
                  Generate
                </div>
              </div>
              <Card className="border-dashed">
                <CardContent className="py-10">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="bg-accent/10 mb-4 rounded-full p-4">
                      <Brain className="text-accent h-8 w-8" />
                    </div>
                    <h3 className="font-heading mb-2 text-base font-semibold">
                      Ready to boost your productivity?
                    </h3>
                    <p className="text-muted-foreground max-w-md text-sm">
                      Our AI will generate a comprehensive task breakdown with
                      priorities, timelines, and dependencies.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Hero
