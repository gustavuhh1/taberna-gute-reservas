"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z
  .object({
    name: z.string("Nome inválido.").trim().min(1, "Nome é obrigatório."),
    email: z.email({ error: "E-mail inválido." }),
    password: z
      .string("Senha inválida.")
      .min(8, "Senha possuir pelo menos 8 caracteres."),
    passwordConfirmation: z
      .string("Senha inválida.")
      .min(8, "Senha possuir pelo menos 8 caracteres."),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirmation;
    },
    {
      error: "As senha não coincidem.",
      path: ["passwordConfirmation"],
    }
  );

type FormValues = z.infer<typeof formSchema>;
const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const handleSignInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      image: " ",
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          if (ctx.error.code == "INVALID_EMAIL_OR_PASSWORD") {
            toast.error("Email ou senha inválidos.");
            form.setError("email", {
              message: "E-mail ou senha inválidos.",
            });
            form.setError("password", {
              message: "E-mail ou senha inválidos.",
            });
            return;
          }
          if (ctx.error.code === "USER_ALREADY_EXISTS") {
            toast.error("Email já cadastrado.");
            form.setError("email", {
              message: "E-mail já cadastrado.",
            });
            return;
          }
          toast.error(ctx.error.message);
        },
      },
    });
    setIsLoading(false);
  }
  return (
    <>
      <Card className="flex flex-col p-5">
        <CardHeader className="p--5">
          <CardTitle>Crie sua conta</CardTitle>
          <CardDescription>Preencha os campos para se cadastrar</CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" type="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite sua senha" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirme sua senha"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} type="submit" variant={"outline"}>
                Criar conta
              </Button>
              <Button
                disabled={isLoading}
                type="button"
                onClick={handleSignInWithGoogle}
                variant="outline"
                className=""
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
                Cadastro com Google
              </Button>
            </CardContent>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default SignUpForm;
