import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

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
