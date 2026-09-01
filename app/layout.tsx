import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Abriendo Camino - Un paso cada día para caminar con Dios",
  description: "Experiencia interactiva de formación espiritual. 5 momentos: Lee, Descubre, Conecta, Camina, Completado.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
