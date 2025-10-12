"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ResetPassword = () => {
  const params = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setLoading(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    if (res.ok) {
      window.location.href = "/authentication";
      toast.success("Senha redefinida com sucesso!");
    } else {
      toast.error("Erro ao redefinir senha.");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center py-20">
      <div className="max-w-md w-full p-6 border rounded-xl">
        <h2 className="text-xl font-semibold mb-3">Criar nova senha</h2>
        <p className="text-sm text-gray-500 mb-6">
          Digite uma nova senha para sua conta.
        </p>

        <div className="space-y-3">
          <Label htmlFor="password">Nova senha</Label>
          <Input
            id="password"
            type="password"
            placeholder="Digite sua nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button className="mt-5 w-full" onClick={handleReset} disabled={loading}>
          {loading ? "Redefinindo..." : "Redefinir senha"}
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;
