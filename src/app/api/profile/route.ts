import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";


interface UpdateProfilePayload {
  name?: string;
  image?: string;
  currentPassword?: string;
  newPassword?: string;
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    const user = session?.user;
    console.log(user)

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body: UpdateProfilePayload = await req.json();

    const { name, image, currentPassword, newPassword } = body;

    // 🔹 Verifica se imagem é base64 ou URL
    let finalImage: string | undefined;
    if (image) {
      console.log(image)
      if (
        image.startsWith("data:image/") || // base64
        image.startsWith("http") // URL externa (ex: Google)
      ) {
        finalImage = image;
      }
    }

    // 🔹 Atualiza nome e imagem via Prisma
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(name && { name }),
        ...(finalImage && { image: finalImage }),
        updatedAt: new Date(),
      },
    });

    // 🔹 Atualiza senha via Better-auth, se enviada
    if (currentPassword && newPassword) {
      console.log("entrou error")
      await auth.api.changePassword({
        body: {
          currentPassword,
          newPassword,
          revokeOtherSessions: true,
        },
        headers: req.headers,
      });
      

    }
    return NextResponse.json({ user: updatedUser });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Erro ao atualizar perfil:", err);
    return NextResponse.json(
      { error: err.message || "Erro interno ao atualizar perfil" },
      { status: 500 }
    );
  }
}