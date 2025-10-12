import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: "http://localhost:3000/authentication/redefinir-senha",
      },
    });
    return new Response("Email enviado", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Erro ao enviar email", { status: 400 });
  }
}
