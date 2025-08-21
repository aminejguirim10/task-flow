import { MetadataRoute } from "next"
import { prisma } from "@/lib/db"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await prisma.project.findMany({
    select: { id: true },
  })
  return [
    {
      url: `${process.env.BETTER_AUTH_URL}`,
      priority: 1,
    },
    {
      url: `${process.env.BETTER_AUTH_URL}/login`,
      priority: 0.6,
    },
    {
      url: `${process.env.BETTER_AUTH_URL}/register`,
      priority: 0.6,
    },
    {
      url: `${process.env.BETTER_AUTH_URL}/chat`,
      priority: 0.8,
    },
    {
      url: `${process.env.BETTER_AUTH_URL}/projects`,
      priority: 0.7,
    },

    ...projects.map((project) => ({
      url: `${process.env.BETTER_AUTH_URL}/projects/${project.id}`,
      priority: 0.6,
    })),
  ]
}
