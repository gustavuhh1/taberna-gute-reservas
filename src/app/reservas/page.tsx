"use server";

import { Button } from "@/components/ui/button";
import TabelaReservaClient from "./components/tabela-reserva";
import TabelaReserva from "./components/tabela-reserva-action";
import Link from "next/link";

const ReservasPage = () => {
  return (
    <div className="flex flex-col p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl pl-5">Minhas Reservas</h1>
        <Link
          href={"/reservas/criar"}
          className="rounded border border-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors duration-200 p-2"
        >
          Fazer Reserva
        </Link>
      </div>
      <div className="mt-15 border rounded">
        <TabelaReserva />
      </div>
    </div>
  );
};

export default ReservasPage;
