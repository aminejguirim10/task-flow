import { howItWorks } from "@/constants"

const HowItWorks = () => {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-16">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="font-heading mb-4 text-2xl font-semibold text-[#4860B8] sm:text-3xl">
          How it works
        </h2>
        <p className="text-muted-foreground">
          Get started in three simple steps
        </p>
      </div>
      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
        {howItWorks.map((item) => (
          <div className="group text-center" key={item.number}>
            <div className="bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors">
              <span className="text-primary text-xl font-bold">
                {item.number}
              </span>
            </div>
            <h3 className="font-heading mb-2 text-lg font-semibold">
              {item.title}
            </h3>
            <p className="text-muted-foreground text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks
