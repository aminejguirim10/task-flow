import Link from "next/link"
import { GithubIcon } from "@/components/shared/icons"

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-card/70 border-t backdrop-blur-md">
      <div className="container mx-auto px-6 py-8 md:px-16">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-muted-foreground text-sm">
            © {year} Amine Jguirim. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="https://github.com/aminejguirim10"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
