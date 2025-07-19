import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "./tailwind.css"
import NavBar from '../components/NavBar'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Singularity Voices",
  description: "Experience the future of voice technology",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon.png" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        {<NavBar />}
        {children}
      </body>
    </html>
  )
} 