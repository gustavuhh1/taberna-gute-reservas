import { auth } from "@/lib/auth";

interface ResetPasswordPayload {
  token: string;
  password: string;
}

export async function POST(req: Request) {
  const { token, password }: ResetPasswordPayload = await req.json();

  try {
    if(token && password){
      const data = await auth.api.resetPassword({
        body: {
          newPassword: password,
          token,
        },
      });
      console.log(data)
      return new Response("Email enviado", { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return new Response("Erro ao enviar email", { status: 400 });
  }
}
