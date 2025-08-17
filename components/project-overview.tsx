import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, Clock } from "lucide-react"

interface ProjectOverviewProps {
  title: string
  description: string
  timeline: string
  milestones: string[]
  totalTasks: number
  completedTasks: number
}

export function ProjectOverview({
  title,
  description,
  timeline,
  milestones,
  totalTasks,
  completedTasks,
}: ProjectOverviewProps) {
  const completionPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="font-heading mb-2 text-2xl font-bold">
              {title}
            </CardTitle>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
          <Badge variant="secondary" className="ml-4">
            {completedTasks}/{totalTasks} tasks
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-muted-foreground text-sm">
                {Math.round(completionPercentage)}%
              </span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground">Timeline:</span>
              <span className="font-medium">{timeline}</span>
            </div>

            {milestones.length > 0 && (
              <div className="flex items-start gap-2 text-sm">
                <Target className="text-muted-foreground mt-0.5 h-4 w-4" />
                <div>
                  <span className="text-muted-foreground">Key Milestones:</span>
                  <ul className="mt-1 space-y-1">
                    {milestones.map((milestone, index) => (
                      <li key={index} className="text-muted-foreground text-xs">
                        • {milestone}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
