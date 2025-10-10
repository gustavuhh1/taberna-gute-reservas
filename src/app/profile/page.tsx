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
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { authClient } from "@/lib/auth-client";
import { format } from "date-fns";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { toast } from "sonner";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [nome, setNome] = useState(session?.user.name);
  const [imagePreview, setImagePreview] = useState(user?.image ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!imageFile) return toast.error("Selecione uma imagem primeiro!");

    const formData = new FormData();
    formData.append("file", imageFile);

    const res = await fetch("/api/profile/image", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      toast.success("Imagem atualizada com sucesso!");
      setImageFile(null);
    } else {
      toast.error("Erro ao atualizar imagem.");
    }
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
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
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
                  {!user?.emailVerified ? (
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
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input
                  disabled={!isEditing}
                  value={"*********"}
                  id="password"
                  type="password"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2 mb-5">
          <Button disabled={!isEditing} type="submit" className="w-full">
            Salvar alterações
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ProfilePage;
