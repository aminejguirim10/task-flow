import { projectSchema } from "@/lib/schema"
import { groq } from "@ai-sdk/groq"
import { streamObject } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { prompt } = await req.json()

  // Extract any number from the prompt (not just before "tasks")
  const numberMatches = prompt.match(/\b(\d+)\b/g)
  let requestedTaskCount = null

  if (numberMatches) {
    // Take the last number found in the prompt as it's likely the task count
    const numbers = numberMatches.map((n: any) => Number.parseInt(n))
    // Filter reasonable task counts (between 1 and 200)
    const validCounts = numbers.filter((n: any) => n >= 1 && n <= 200)
    if (validCounts.length > 0) {
      requestedTaskCount = validCounts[validCounts.length - 1]
    }
  }

  // Determine task count range based on user request
  let taskCountGuidance = "5-12"
  if (requestedTaskCount) {
    if (requestedTaskCount <= 5) {
      taskCountGuidance = `exactly ${requestedTaskCount}`
    } else if (requestedTaskCount <= 50) {
      taskCountGuidance = `${requestedTaskCount} (or as close as possible)`
    } else {
      taskCountGuidance = `${requestedTaskCount} (break into sub-tasks and detailed steps as needed)`
    }
  }

  const result = streamObject({
    model: groq("meta-llama/llama-4-maverick-17b-128e-instruct"),
    schema: projectSchema,
    prompt: `You are a professional project manager and productivity expert. Generate a comprehensive task breakdown for the following project or goal: "${prompt}"

    Create a detailed project plan with:
    - A clear project title and description
    - ${taskCountGuidance} well-structured tasks that are specific, actionable, and measurable
    - Appropriate priority levels based on importance and dependencies
    - Realistic time estimates for each task
    - Logical task dependencies where applicable
    - Relevant categories and tags for organization
    - Key milestones to track progress
    - Overall timeline estimate

    ${requestedTaskCount ? `CRITICAL: The user specifically requested ${requestedTaskCount} tasks. You MUST generate exactly this number. Do not generate fewer tasks.` : ""}

    MANDATORY REQUIREMENTS for each task:
    - Title: Must be unique, specific, and action-oriented (minimum 3 words, maximum 8 words)
    - Description: Must be detailed and comprehensive (minimum 25 words) explaining WHAT needs to be done, WHY it's important, and HOW to approach it
    - Each task must be distinctly different from others
    - Use varied vocabulary - avoid repetitive phrasing
    - Include specific deliverables or outcomes in descriptions
    - Mention tools, resources, or methods when relevant

    Make sure tasks are:
    - Specific and actionable with clear deliverables
    - Properly sequenced with logical dependencies
    - Varied in priority (distribute across low, medium, high, urgent)
    - Realistic in scope and time estimates
    - Professional and well-organized with rich context
    
    ${requestedTaskCount && requestedTaskCount > 15 ? "For larger task counts, include detailed sub-tasks, preparation steps, review phases, testing phases, documentation, and implementation details to reach the exact requested number." : ""}
    
    QUALITY CHECK: Every task must have a meaningful, unique title and a comprehensive description that provides clear guidance on execution.`,
  })

  return result.toTextStreamResponse()
}
