import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#f3f1e0] bg-cover bg-center">
      <div className="absolute inset-0 bg-black opacity-20 z-0"></div>
      <Image
        className="absolute top-10 left-1/2 -translate-x-1/2 z-10"
        src="/logo.jpg"
        alt="Logo da Taberna"
        width={200}
        height={200}
      />
      <section className="relative z-10 max-w-3xl mx-auto p-6 text-white flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-9xl pb-15">404</h1>
        <h2 className="text-2xl">Pagina não encontrada</h2>

        <Link
          className="underline underline-offset-3 hover:text-blue-500 flex gap-2 items-center mt-6"
          href={"/"}
        >
          <LogOutIcon />
          Voltar para o inicio
        </Link>
      </section>
    </div>
  );
}
