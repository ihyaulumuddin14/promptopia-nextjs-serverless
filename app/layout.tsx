import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "Promptopia",
   description: "Discover & Share AI Prompts",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <Provider>
            <div className="main">
               <div className="gradient" />
            </div>

            <main className="app">
               <Nav />
               <Suspense fallback={<div>Loading beb...</div>}>
                  {children}
               </Suspense>
            </main>
         </Provider>
      </body>
    </html>
  );
}
