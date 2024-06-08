import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";
import SidebarProvider from "@/providers/SidebarProvider";
import ParticlesBackground from "@/components/Particle";
import SearchProvider from "@/providers/SearchProvider";
import UserProvider from "@/providers/LoggedInProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TD group",
  description: "The future of the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/img/logo/Logo-removebg.png" sizes="any" />
      </head>
      <body className={inter.className}>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        > */}
        <UserProvider>
          <SidebarProvider>
            <SearchProvider>
              <div className="no-scrollbar">
                {children}
              </div>
            </SearchProvider>

          </SidebarProvider>
          {/* </ThemeProvider> */}
        </UserProvider>
      </body>
    </html>
  );
}
