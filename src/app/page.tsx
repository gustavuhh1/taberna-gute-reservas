"use client";

import Image from "next/image";
import Header from "../components/common/header";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/common/footer";
import About from "@/components/common/about";
import Galery from "@/components/common/galery";

export default function Home() {
  return (
    <>
      <Header />
      <div className="full-w h-full flex flex-col justify-center">
        <main className="px-5 py-5 space-y-8 bg-[url('/card_navbar.png')] bg-cover bg-center inset-shadow-[250px_0px_125px_-3px_rgba(0,0,0,0.7)]">
          <h1 className="text-4xl md:text-5xl font-bold font-titulo">Taberna do Gute</h1>
          <p>Uma experiência única de culinária alemã com toques brasileiros</p>
          <p>
            Localizado em Horizonte, Ceará, nosso restaurante oferece um ambiente
            aconchegante e uma gastronomia única, com pratos elaborados pelo Chef Artur
            Schmidt.
          </p>
          <div className="flex flex-col max-w-[180px] gap-3">
            <Button size="xl" className="font-medium text-md text-black bg-amber-200">
              Reservar Mesa
            </Button>
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
