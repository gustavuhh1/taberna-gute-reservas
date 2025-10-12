"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const EsqueceuSenha = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const onSubmit = async () => {
    setIsLoading(true);

    const res = await fetch("/api/auth/request-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      toast.success("Um link de redefinição foi enviado ao seu e-mail.");
    } else {
      toast.error("Erro ao enviar e-mail. Verifique o endereço digitado.");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex justify-center py-15">
      <Card className="flex flex-col p-5 max-w-lg w-full">
        <CardHeader className="p--5">
          <CardTitle>Redefinição de senha</CardTitle>
          <CardDescription>
            Informe o e-mail cadastrado e enviaremos um link para você criar uma nova
            senha com segurança.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input value={email} onChange={(e) => {setEmail(e.target.value)}} id="email" placeholder="Insira Email" required type="email" />
          </div>
          <Button onClick={() => onSubmit()} disabled={isLoading} type="submit" variant={"outline"}>
            Enviar email
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EsqueceuSenha;
