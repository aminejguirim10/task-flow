import { features } from "@/constants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Features = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="font-heading text-2xl font-semibold text-[#8E6770] sm:text-3xl">
          Everything you need to plan and execute
        </h2>
        <p className="text-muted-foreground mt-3">
          Powerful features that fit your workflow
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <feature.icon className="text-accent h-5 w-5" /> {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              {feature.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default Features
