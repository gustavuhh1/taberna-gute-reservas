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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import {
  ClipboardClockIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  Moon,
  Sun,
  UserRoundPenIcon,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";

const Header = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [sheet, setSheet] = useState(false)
  const { setTheme } = useTheme();

  return (
    <header className="flex justify-between items-center p-5 bg-indigo-950 text-white">
      <Link href={"/"}>
        <Image
          src={"/logo.jpg"}
          width={46}
          height={46}
          alt={"Logo Taberna do Gute"}
          className="rounded-full"
        />
      </Link>

      <nav className="">
        <ul className="gap-5 flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun color="#000000" className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet open={sheet} onOpenChange={setSheet}>
            <SheetTrigger asChild={true}>
              <Button className="border-2" variant="ghost" size="icon">
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
                        onClick={() => {
                          authClient.signOut();
                          setSheet(false);
                          router.replace("/authentication");
                        }}
                      >
                        <LogOutIcon />
                      </Button>
                    </div>
                    <Separator />
                    <div className="">
                      <Link href={"/reservas"} className="flex gap-5 py-3 px-2">
                        <ClipboardClockIcon />
                        Minhas reservas
                      </Link>
                      <Separator />
                      <div className="flex flex-col">
                        <Link href={"/profile"} className="flex gap-5 py-3 px-2">
                          <UserRoundPenIcon />
                          Meu perfil
                        </Link>
                      </div>
                      <Separator />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold">Olá. Faça seu login!</h2>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        setSheet(false);
                        router.replace("/authentication");
                      }}
                    >
                      <LogInIcon />
                    </Button>
                  </div>
                )}
              </div>
              <div className="mx-auto mt-auto pb-3">
                <p className="text-sm font-light">powered by Taberna do Gute©</p>
              </div>
            </SheetContent>
          </Sheet>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
