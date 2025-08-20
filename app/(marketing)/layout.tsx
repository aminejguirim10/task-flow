import Header from "@/components/layout/header"
import { ServerSession } from "@/lib/session"

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await ServerSession()
  return (
    <div>
      <Header isAuthenticated={Boolean(session)} />
      {children}
    </div>
  )
}
