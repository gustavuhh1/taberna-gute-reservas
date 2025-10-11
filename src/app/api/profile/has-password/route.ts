import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  // Verifica se o usuário tem uma conta do tipo 'credentials'
  const credentialsAccount = await prisma.account.findFirst({
    where: {
      userId: user.id,
      providerId: "google",
    },
    select: { id: true },
  });

  const hasPassword = !!credentialsAccount;

  return NextResponse.json({ hasPassword });
}
