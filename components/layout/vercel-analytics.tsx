"use client"
import { Analytics } from "@vercel/analytics/next"

const VercelAnalytics = () => {
  return <Analytics mode="production" />
}

export default VercelAnalytics
