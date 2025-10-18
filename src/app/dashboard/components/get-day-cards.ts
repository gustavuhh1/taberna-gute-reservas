import prisma from "@/lib/prisma";

// Função para fornecer dados dos cards principais do dashboard
export async function getDashboardDayCards() {
  const agora = new Date();

  // Limites de hoje
  const inicioHoje = new Date(agora);
  inicioHoje.setHours(0, 0, 0, 0);
  const fimHoje = new Date(agora);
  fimHoje.setHours(23, 59, 59, 999);

  // 1. Reservas do dia e total de pessoas no dia
  const reservasHoje = await prisma.reserva.findMany({
    where: {
      dataReserva: {
        gte: inicioHoje,
        lte: fimHoje,
      },
    },
    select: {
      quantidadePessoas: true,
      status: true,
    },
  });

  const reservasPendentes = await prisma.reserva.count({
    where: {
      status: "PENDENTE",
      dataReserva: {
        gte: inicioHoje,
        lte: fimHoje,
      },
    },
  });

  // 3. Reservas Ativas agora
  const reservasAtivas = await prisma.reserva.count({
    where: {
      //TODO: Adição do status ANDAMENTO (Validar quanto tempo durou a reserva)
      status: "ACEITO",
      dataReserva: {
        gte: inicioHoje,
        lte: fimHoje,
      },
    },
  });

  return {
    reservasDoDia: reservasHoje.length,
    pessoasNoDia: reservasHoje.reduce((sum, r) => sum + (r.quantidadePessoas || 0), 0),
    reservasPendentes,
    reservasAtivas,
  };
}
