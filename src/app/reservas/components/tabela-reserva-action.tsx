import prisma from "@/lib/prisma";
import TabelaReservaClient from "./tabela-reserva";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function TabelaReserva() {
  const session = await auth.api.getSession({
    headers: await headers(), // some endpoints might require headers
  });

  const reservas = await prisma.reserva.findMany({
    where: { 
      userId: session?.user.id, 
      status: { not: "CANCELADO" } 
    },
    select: {
      id: true,
      dataReserva: true,
      quantidadePessoas: true,
      possuiPet: true,
      observacoes: true,
      status: true,
    },
    orderBy: { status: "asc" },
  });

  return <TabelaReservaClient reservas={reservas} />;
}
