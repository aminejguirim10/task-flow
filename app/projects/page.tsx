import { ServerSession } from "@/lib/session"
import { redirect } from "next/navigation"

const ProjectsPage = async () => {
  const session = await ServerSession()
  if (!session) {
    redirect("/login")
  }
  return <div>ProjectsPage</div>
}

export default ProjectsPage
