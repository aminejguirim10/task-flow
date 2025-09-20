import { createAuthClient } from "better-auth/client"
import {
  magicLinkClient,
  lastLoginMethodClient,
} from "better-auth/client/plugins"
export const authClient = createAuthClient({
  plugins: [magicLinkClient(), lastLoginMethodClient()],
})
