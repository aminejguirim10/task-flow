"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { authSchema } from "@/lib/schema"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { LoaderCircle } from "lucide-react"
import { GithubIcon, GoogleIcon } from "@/components/shared/icons"
import { authClient } from "@/lib/auth-client"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof authSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(authSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)
  const [isGooogleLoading, setIsGoogleLoading] = React.useState<boolean>(false)
  async function onSubmit(data: FormData) {
    setIsLoading(true)
    const { data: signInData, error } = await authClient.signIn.magicLink({
      email: data.email.toLowerCase(),
      callbackURL: "/chat",
    })

    setIsLoading(false)
    if (error) {
      toast.error("Something went wrong.", {
        description: "Your sign in request failed. Please try again.",
      })
    }

    if (signInData) {
      reset()
      toast.success("Check your email for the sign in link.", {
        description: "We sent you a magic link to sign in.",
      })
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGooogleLoading || isGitHubLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={cn(buttonVariants())}
            disabled={isLoading || isGooogleLoading || isGitHubLoading}
          >
            {isLoading && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <button
          type="button"
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={async () => {
            setIsGoogleLoading(true)
            const { error } = await authClient.signIn.social({
              provider: "google",
              callbackURL: "/chat",
            })
            console.log(error)
          }}
          disabled={isLoading || isGooogleLoading || isGitHubLoading}
        >
          {isGooogleLoading ? (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <GoogleIcon className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </button>
        <button
          type="button"
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={async () => {
            setIsGitHubLoading(true)
            await authClient.signIn.social({
              provider: "github",
              callbackURL: "/chat",
            })
          }}
          disabled={isLoading || isGooogleLoading || isGitHubLoading}
        >
          {isGitHubLoading ? (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <GithubIcon className="mr-2 h-4 w-4" />
          )}{" "}
          Github
        </button>
      </div>
    </div>
  )
}
