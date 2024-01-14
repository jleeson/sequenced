import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const viewport = {
  themeColor: 'black',
}
 
export const metadata = {
  title: "ADD Tracker",
  description: "Given my ADHD, I wanted to make a tool that can help manage, monitor, and moderate it.",
  generator: "Next.js",
  manifest: "/manifest.json",
  authors: [
    {
      name: "Daniel Wedding"
    }
  ],
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-512x512.png" },
    { rel: "icon", url: "icons/icon-512x512.png" }
  ]
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
