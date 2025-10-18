import { UsersIcon, CalendarDaysIcon, Home, Settings, User2, ChevronUp } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Menu items.
const items = [
  {
    title: "Início",
    url: "#",
    icon: Home,
  },
  {
    title: "Reservas",
    url: "/reservas",
    icon: CalendarDaysIcon,
  },
  {
    title: "Clientes",
    url: "#",
    icon: UsersIcon,
  },
  {
    title: "Configurações",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="">
        <SidebarHeader>
          <div className="flex justify-evenly gap-2 w-full items-center pt-2">
            <Image
              src={"/logo.jpg"}
              className="rounded-full"
              width={70}
              height={40}
              alt="Logo Taberna Gute"
            />
            <div>
              <h2 className="font-semibold text-xl">Taberna Gute</h2>
              <h2 className="font-semibold text-2xl">Dashboard</h2>
            </div>
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Username
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>    
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
