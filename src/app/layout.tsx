import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/common/header";

export const metadata: Metadata = {
  title: "Taberna do Gute",
  description: "Faça sua reserva no taberna do gute",
};

import { Providers } from "./components/Providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <Header />
        <Providers>
          <NuqsAdapter>{children}</NuqsAdapter>
        </Providers>
        <Toaster position="top-right" closeButton />
      </body>
    </html>
  );
}
