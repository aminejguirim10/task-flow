import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const Cta = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <Card className="mx-auto max-w-4xl">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="font-heading text-xl font-semibold">
              Start planning smarter today
            </h3>
            <p className="text-muted-foreground mt-1 text-sm">
              It takes less than a minute to create your first AI-generated
              project plan.
            </p>
          </div>
          <Button asChild className="group/button px-6">
            <Link href="/register">
              Get started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  )
}

export default Cta
