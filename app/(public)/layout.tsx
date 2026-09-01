import { ReactNode } from "react"

export default function PublicLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <main className="min-h-screen flex flex-col">
      {children}
    </main>
  )
}