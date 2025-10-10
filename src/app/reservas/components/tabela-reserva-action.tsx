import prisma from "@/lib/prisma";
import { authClient } from "@/lib/auth-client";
import TabelaReservaClient from "./tabela-reserva";

export default async function TabelaReserva() {
  const session = await authClient.getSession();

  const reservas = await prisma.reserva.findMany({
    where: { 
      userId: session.data?.user.id, 
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
