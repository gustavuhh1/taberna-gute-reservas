import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, dataReserva, quantidadePessoas, possuiPet, observacoes } = body;

    if (!userId || !dataReserva || !quantidadePessoas) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando." },
        { status: 400 }
      );
    }

    const novaReserva = await prisma.reserva.create({
      data: {
        userId,
        dataReserva: new Date(dataReserva),
        quantidadePessoas,
        possuiPet: !!possuiPet,
        observacoes,
      },
    });

    return NextResponse.json(novaReserva, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    return NextResponse.json({ error: "Erro ao criar reserva." }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    const user = session?.user;

    if (!user?.role && user?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Usuário não autorizado." },
        { status: 401 }
      );
    }

    const queryReservas = await prisma.reserva.findMany({
      select: {
        id: true,
        dataReserva: true,
        quantidadePessoas: true,
        possuiPet: true,
        observacoes: true,
        status: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            email: true,
            image: true,
            emailVerified: true,
          },
        },
      },
     orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(queryReservas, { status: 200 });
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    return NextResponse.json({ error: "Erro ao criar reserva." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {

    const session = await auth.api.getSession({ headers: req.headers });
    const user = session?.user;
    console.log(req.credentials)

    if (!user?.role && user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Usuário não autorizado." }, { status: 401 });
    }

    const body = await req.json();
    const { ids, novoStatus } = body;
    console.log("IDs recebidos para atualização:", ids);
    if (!ids || !Array.isArray(ids) || ids.length === 0 || !novoStatus) {
      return NextResponse.json(
        { error: "Parâmetros inválidos." },
        { status: 400 }
      );
    }
    const atualizacoes = await prisma.$transaction(
      ids.map((id: string) =>
        prisma.reserva.update({
          where: { id },
          data: { status: novoStatus },
        })
      )
    );
    return NextResponse.json(atualizacoes, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar status das reservas:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar status das reservas." },
      { status: 500 }
    );
  }
}