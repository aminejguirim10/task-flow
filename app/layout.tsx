import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import VercelAnalytics from "@/components/layout/vercel-analytics"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    absolute: "TaskFlow",
    template: "%s | TaskFlow",
  },
  description:
    "Transform your ideas into reality with TaskFlow. Discover the power of seamless task management.",

  metadataBase: new URL(`${process.env.BETTER_AUTH_URL}`),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
        <VercelAnalytics />
      </body>
    </html>
  )
}
