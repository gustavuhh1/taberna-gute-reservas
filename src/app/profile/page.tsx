"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface UserProps {
  user: {
    email: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    emailVerified: boolean;
    name: string;
    image: string | null;
    role: string | null;
  };
}

interface UpdateProfilePayload {
  name?: string;
  image?: string; // pode ser URL externa ou base64
  currentPassword?: string;
  newPassword?: string;
}

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [nome, setNome] = useState(user?.name ?? "");
  const [imagePreview, setImagePreview] = useState(user?.image ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      const payload: UpdateProfilePayload = {
        name: nome,
        image: imagePreview, // pode ser URL ou base64
        ...(currentPassword && newPassword ? { currentPassword, newPassword } : {}),
      };

      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao atualizar perfil");
      }

      return res.json();
    },
    onSuccess: (data: UserProps) => {
      toast.success("Perfil atualizado com sucesso!");
      setCurrentPassword("");
      setNewPassword("");
      setImagePreview(data.user.image ?? imagePreview);
      setNome(data.user.name ?? nome);
      setIsEditing(false);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate();
  };

  return (
    <div className="flex flex-col space-y-10 justify-center items-center p-15">
      <h1 className="text-3xl font-semibold">Meu Perfil</h1>
      <div className="relative group">
        <Avatar className="w-40 h-40 border-4 border-zinc-300">
          <AvatarImage src={imagePreview} />
          <AvatarFallback>{user?.name?.[0]?.toUpperCase() ?? "?"}</AvatarFallback>
        </Avatar>

        {isEditing && (
          <Button
            variant="outline"
            size="sm"
            className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs hover:bg-black hover:text-white"
            onClick={() => fileInputRef.current?.click()}
          >
            Alterar imagem
          </Button>
        )}

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <Card className="w-full max-w-md ">
        <CardHeader className="p-5">
          <CardTitle>Suas informações pessoais</CardTitle>
          <CardDescription className="wrap-break-word max-w-75">
            Mantenha seus dados sempre atualizados para que o estabelecimento possa entrar
            em contato facilmente e garantir uma melhor experiência nas suas reservas.
          </CardDescription>
          <CardAction className="flex flex-col items-end gap-1">
            <Switch
              checked={isEditing}
              onCheckedChange={setIsEditing}
              id="editing-mode"
            />
            <Label htmlFor="editing-mode">Editar perfil</Label>
          </CardAction>
        </CardHeader>
        <CardContent className="px-5">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                {/* CAMPO NOME */}

                <Label htmlFor="name">Nome</Label>
                <Input
                  readOnly={!isEditing}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  id="name"
                  type="text"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <Label htmlFor="email">Email</Label>
                  {user?.emailVerified ? (
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="link" className="text-green-600 font-semibold">
                          Email Verificado
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src="/verified-badge.png"
                              alt="Selo verificado"
                            />
                            <AvatarFallback>OK</AvatarFallback>
                          </Avatar>

                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold text-green-700">
                              Seu email está verificado ✅
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Isso ajuda o estabelecimento a confiar mais em seus pedidos
                              de reserva e garante maior segurança nas comunicações.
                            </p>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ) : (
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button
                          variant="link"
                          type="button"
                          className="text-red-600 font-semibold"
                        >
                          Email não verificado
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-84">
                        <div className="flex items-center gap-4">
                          <AlertCircle className="text-red-600 h-10 w-10 flex-shrink-0" />
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold text-red-700">
                              Seu email ainda não foi verificado ⚠️
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Recomendamos verificar seu email para aumentar a segurança e
                              permitir que o estabelecimento confirme seus pedidos de
                              reserva.
                            </p>
                            <Link
                              href="/verificar-email"
                              className="text-red-600 text-sm font-medium hover:underline"
                            >
                              Verificar agora →
                            </Link>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  )}
                </div>
                {/* CAMPO EMAIL */}
                <Input
                  readOnly
                  value={user?.email}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="current-password">Senha atual</Label>
                </div>
                <Input
                  disabled={!isEditing}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="************"
                  id="current-password"
                  type="password"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="new-password">Nova senha</Label>
                </div>
                <Input
                  disabled={!isEditing}
                  value={newPassword}
                  placeholder="************"
                  onChange={(e) => setNewPassword(e.target.value)}
                  id="new-password"
                  type="password"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2 mb-5">
          <Button
            disabled={!isEditing || updateProfileMutation.status === "pending"}
            onClick={handleSubmit}
            className="w-full"
          >
            {updateProfileMutation.status === "pending"
              ? "Salvando..."
              : "Salvar alterações"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfilePage;
