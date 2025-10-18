import prisma from "@/lib/prisma";


export async function getReservasPorPeriodo() {
  const agora = new Date();

  // Definir limites de tempo
  const inicioHoje = new Date(agora);
  inicioHoje.setHours(0, 0, 0, 0);

  const fimHoje = new Date(agora);
  fimHoje.setHours(23, 59, 59, 999);

  // Início da semana (domingo)
  const inicioSemana = new Date(agora);
  inicioSemana.setDate(agora.getDate() - agora.getDay());
  inicioSemana.setHours(0, 0, 0, 0);


  // Início do mês
  const inicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1);

  const [hoje, estaSemana, esteMes, proximaSemana] = await Promise.all([
    // Reservas para hoje
    prisma.reserva.findMany({
      where: {
        dataReserva: {
          gte: inicioHoje,
          lte: fimHoje,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        dataReserva: "asc",
      },
    }),

    // Reservas desta semana
    prisma.reserva.aggregate({
      where: {
        dataReserva: {
          gte: inicioSemana,
        },
      },
      _count: {
        id: true,
      },
      _sum: {
        quantidadePessoas: true,
      },
    }),

    // Reservas deste mês
    prisma.reserva.aggregate({
      where: {
        dataReserva: {
          gte: inicioMes,
        },
      },
      _count: {
        id: true,
      },
      _sum: {
        quantidadePessoas: true,
      },
    }),

    // Próximos 7 dias (visão futura)
    prisma.reserva.groupBy({
      by: ["dataReserva", "status"],
      where: {
        dataReserva: {
          gte: agora,
          lte: new Date(agora.getTime() + 7 * 24 * 60 * 60 * 1000),
        },
      },
      _count: {
        id: true,
      },
      _sum: {
        quantidadePessoas: true,
      },
    }),
  ]);

  return {
    hoje: {
      reservas: hoje,
      total: hoje.length,
      totalPessoas: hoje.reduce((sum: number, r: { quantidadePessoas: number }) => sum + r.quantidadePessoas, 0),
    },
    estaSemana: {
      totalReservas: estaSemana._count.id,
      totalPessoas: estaSemana._sum.quantidadePessoas || 0,
    },
    esteMes: {
      totalReservas: esteMes._count.id,
      totalPessoas: esteMes._sum.quantidadePessoas || 0,
    },
    proximosDias: proximaSemana,
  };
}
