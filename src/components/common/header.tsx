"use client";

import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormsReserve } from "./forms-reserve";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  ClipboardClockIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  UserRoundPenIcon,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

const Header = () => {
  const { data: session } = authClient.useSession();

  return (
    <header className="flex justify-between p-5 bg-indigo-950 text-white">
      <Link href={"/"}>
        <h1>Taberna do Gute</h1>
      </Link>

      <nav className="">
        <ul className="gap-5 flex items-center justify-center">
          <Sheet>
            <SheetTrigger asChild={true}>
              <Button className="border-2" variant="ghost" size="sm">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="px-5">
                {session?.user ? (
                  <div className="flex flex-col">
                    <div className="flex justify-between space-y-6 items-center gap-3">
                      <Avatar>
                        <AvatarImage src={session?.user?.image as string | undefined} />
                        <AvatarFallback>
                          {session?.user?.name
                            ? session.user.name.split(" ")[0]?.[0]?.toUpperCase()
                            : ""}
                          {session?.user?.name
                            ? session.user.name.split(" ")[1]?.[0]?.toUpperCase()
                            : ""}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-semibold">{session?.user?.name}</h3>
                        <span className="text-muted-foreground block text-xs">
                          {session?.user?.email}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => authClient.signOut()}
                      >
                        <LogOutIcon />
                      </Button>
                    </div>
                    <Separator />
                    <div className="">
                      <Link href={"/minhas-reservas"} className="flex gap-5 py-3 px-2">
                        <ClipboardClockIcon />
                        Reservas
                      </Link>
                      <Separator />
                      <div className="flex flex-col">
                        <Link href={"/profile"} className="flex gap-5 py-3 px-2">
                          <UserRoundPenIcon />
                          Meu perfil
                        </Link>
                      </div>
                      <Separator/>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold">Olá. Faça seu login!</h2>
                    <Button size="icon" asChild variant="outline">
                      <Link href="/authentication">
                        <LogInIcon />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
