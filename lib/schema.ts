import { z } from "zod"

export const projectSchema = z.object({
  project: z.object({
    userId: z.string(),
    title: z.string().describe("The main project or goal title"),
    description: z.string().describe("Brief description of the project"),
    tasks: z.array(
      z.object({
        id: z.string().describe("Unique identifier for the task"),
        title: z.string().describe("Clear, actionable task title"),
        description: z
          .string()
          .describe("Detailed description of what needs to be done"),
        priority: z
          .enum(["low", "medium", "high", "urgent"])
          .describe("Task priority level"),
        estimatedTime: z
          .string()
          .describe("Estimated time to complete (e.g., '2 hours', '1 day')"),
        category: z
          .string()
          .describe(
            "Task category (e.g., 'Development', 'Design', 'Research')"
          ),
        dependencies: z
          .array(z.string())
          .optional()
          .describe("IDs of tasks that must be completed first"),
        tags: z
          .array(z.string())
          .optional()
          .describe("Relevant tags for organization"),
      })
    ),
    timeline: z.string().describe("Overall project timeline estimate"),
    milestones: z.array(z.string()).describe("Key project milestones"),
  }),
})

export type TaskProject = z.infer<typeof projectSchema>
export type Task = z.infer<typeof projectSchema>["project"]["tasks"][0]

export const authSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .describe("User email"),
})
