import { Skeleton } from "@/components/ui/skeleton"

export default function LoginLoadingPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center max-sm:px-12">
      <div className="absolute top-4 left-4 md:top-8 md:left-8">
        <Skeleton className="h-9 w-24 rounded-md" />
      </div>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto h-6 w-6" />
          <Skeleton className="mx-auto h-7 w-40 rounded" />
          <Skeleton className="mx-auto h-4 w-64" />
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2">
              <Skeleton className="h-3 w-28" />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="px-8 text-center">
          <Skeleton className="mx-auto h-4 w-56" />
        </div>
      </div>
    </div>
  )
}
