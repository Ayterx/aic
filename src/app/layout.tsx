import "~/styles/globals.css"

import { type Metadata } from "next"
import clsx from "clsx"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import { Footer } from "~/components/footer"
import { GridLayout } from "~/components/gridStyle"
import { Navbar } from "~/components/navbar"

export const metadata: Metadata = {
  title: "AIC",
  icons: [{ rel: "icon", url: "/favicon.ico" }]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: "dark" }}>
      <body
        className={clsx(
          "min-h-screen max-w-[100vw] overflow-x-hidden bg-neutral-900 font-sans text-neutral-100 antialiased",
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <noscript>
          <div className="absolute left-0 top-0 z-50 w-full bg-red-500 p-4 font-bold text-neutral-100">
            This application works when JavaScript is enabled. Please enable it to continue.
          </div>
        </noscript>

        <Navbar />

        <main className="relative mx-auto min-h-[calc(100vh-4rem)] max-w-4xl pb-4 pt-12">
          <GridLayout style="x" />
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}
