"use client";

import { Button } from "@/components/ui/button";
import Footer from "@/components/common/footer";
import About from "@/components/common/about";
import Galery from "@/components/common/galery";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Home() {
  const session = authClient.useSession();
  const router = useRouter();
  return (
    <>
      <div className="full-w h-full flex flex-col justify-center">
        <main className="px-5 py-12 space-y-8 bg-[url('/card_navbar.png')] bg-cover bg-center inset-shadow-[320px_0px_140px_-3px_rgba(0,0,20,0.9)]">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-titulo">
            Taberna do Gute
          </h1>
          <p className="text-2xl md:text-3xl text-orange-300 font-medium mb-6 font-titulo">
            Uma experiência única de culinária alemã com toques brasileiros
          </p>
          <p className="text-white/80 mb-10 text-lg">
            Localizado em Horizonte, Ceará, nosso restaurante oferece um ambiente
            aconchegante e uma gastronomia única, com pratos elaborados pelo Chef Artur
            Schmidt.
          </p>
          <div className="flex flex-col max-w-[180px] gap-3">
            <Link
              href={session.data ? "/reservas" : "/authentication"}
              onClick={
                session.data
                  ? () => {router.push("/reservas")}
                  : () => toast.warning("Se autentique antes de realizar uma reserva!")
              }
            >
              <Button
                size="xl"
                className="w-full font-medium text-md text-black bg-amber-200"
              >
                Reservar Mesa
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="xl"
              className="font-medium text-md text-orange-300 border border-orange-300"
            >
              Ver Cardápio
            </Button>
          </div>
        </main>
        <About />
        <Galery />
        <Footer />
      </div>
    </>
  );
}
