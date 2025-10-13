import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Taberna do Gute",
  description: "Faça sua reserva no taberna do gute",
};

import { Providers } from "./components/Providers";
import { ThemeProvider } from "@/components/theme-provider";

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            <Providers>
              <NuqsAdapter>{children}</NuqsAdapter>
            </Providers>
            <Toaster position="top-right" closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
