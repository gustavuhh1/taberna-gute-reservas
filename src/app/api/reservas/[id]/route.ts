import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    await prisma.reserva.update({
      where: { id },
      data: { status: "CANCELADO" },
    });

    //TODO: adicioncar dados em outra tabela de Historico

    return NextResponse.json({ message: "Reserva cancelada com sucesso!" });
  } catch (error) {
    console.error("Erro ao cancelar reserva:", error);
    return NextResponse.json({ error: "Erro ao cancelar reserva." }, { status: 500 });
  }
}
