import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
const imagensComida = [
  { src: "/card_sobremesa.png", title: "Sobremesas Artesanais" },
  { src: "/card_cheftucao.png", title: "Especialidade da casa" },
  { src: "/card_navbar.png", title: "Culinária Alemã" },
  { src: "/card_prato.png", title: "Pratos Especiais" },
  { src: "/card_drink.png", title: "Bebidas Exclusivas" },
  { src: "/card_sorvete.png", title: "Doces e Sobremesas" },
];

const Galery = () => {
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <section className="py-16 px-6 max-w-screen-xl mx-auto">
      <div className="flex justify-center">
        <h1 className="text-4xl font-titulo text-center text-gray-900 mb-12 relative inline-block after:content-[''] after:block after:h-1 after:w-16 after:bg-blue-800 after:mx-auto after:mt-2">
          Nossa Galeria
        </h1>
      </div>
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-xs rounded-xl"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="">
          {imagensComida.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="">
                  <CardContent className="flex items-center justify-center rounded-xl">
                    <Image
                      key={index}
                      src={image.src}
                      alt={image.title}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-auto w-full rounded-xl object-cover max-h-[300px]"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default Galery;
