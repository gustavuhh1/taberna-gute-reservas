import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

interface SetPasswordPayload {
  newPassword: string
  confirmPassword: string
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    const user = session?.user;

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body: SetPasswordPayload = await req.json();

    const { newPassword, confirmPassword } = body;

    if (confirmPassword && newPassword) {
      const data = await auth.api.setPassword({
        body: {
          newPassword,
        },
        headers: req.headers,
      });
      console.log(data.status)
    }
    return NextResponse.json({ status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Erro ao atualizar perfil:", err);
    return NextResponse.json(
      { error: err.message || "Erro interno ao atualizar perfil" },
      { status: 500 }
    );
  }
}
