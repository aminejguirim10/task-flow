import ChatTasks from "@/components/chat-tasks"
import { ServerSession } from "@/lib/session"
import { redirect } from "next/navigation"

const ChatPage = async () => {
  const session = await ServerSession()
  if (!session) {
    redirect("/login")
  }
  return <ChatTasks userId={session.user.id} />
}

export default ChatPage
