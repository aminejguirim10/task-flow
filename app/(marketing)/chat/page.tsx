import ChatTasks from "@/components/app/chat-tasks"
import { ServerSession } from "@/lib/session"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Chat",
  description:
    "Chat to enhance your productivity and make the most out of your tasks.",
}

const ChatPage = async () => {
  const session = await ServerSession()
  if (!session) {
    redirect("/login")
  }

  return <ChatTasks userId={session.user.id} />
}

export default ChatPage
