"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { MenuIcon, LogInIcon } from "lucide-react";

const MenuSheet = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    setOpen(false);
  };

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    setOpen(false);
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    setOpen(false);
  };

  const categories = [
    { label: "Cabelo", value: "hair" },
    { label: "Barba", value: "beard" },
    { label: "Sobrancelha", value: "eyebrow" },
    { label: "Bigode", value: "mustache" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex w-80 flex-col p-0">
        {session ? (
          <>
            <SheetHeader className="border-border border-b px-6 py-4">
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            {/* User Profile Section */}
            <div className="border-border flex flex-col items-start gap-3 border-b px-6 py-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={session.user.image || ""}
                  alt={session.user.name || "User"}
                />
              </Avatar>
              <div className="flex flex-col gap-1">
                <p className="text-foreground font-semibold">
                  {session.user.name}
                </p>
                <p className="text-muted-foreground text-sm">
                  {session.user.email}
                </p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-0 px-6 py-4">
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  className="h-auto justify-start px-0 py-3 text-base font-normal"
                  onClick={() => handleNavigation("/bookings")}
                >
                  Meus agendamentos
                </Button>
              </SheetClose>
            </div>

            {/* Categories */}
            <div className="border-border mb-auto flex flex-col gap-0 border-t px-6 py-4">
              <p className="text-muted-foreground mb-3 text-xs font-semibold uppercase">
                Categorias
              </p>
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant="ghost"
                  className="text-foreground h-auto justify-start px-0 py-2 text-base font-normal"
                >
                  {category.label}
                </Button>
              ))}
            </div>

            {/* Logout Button */}
            <div className="border-border border-t px-6 py-4">
              <Button
                variant="outline"
                className="text-destructive hover:text-destructive w-full justify-center font-semibold"
                onClick={handleLogout}
              >
                Sair
              </Button>
            </div>
          </>
        ) : (
          <>
            <SheetHeader className="border-border border-b px-6 py-4">
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            {/* Menu Items - Logged Out */}
            <div className="flex flex-col gap-0 px-6 py-4">
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  className="h-auto justify-start px-0 py-3 text-base font-normal"
                  onClick={() => handleNavigation("/")}
                >
                  Início
                </Button>
              </SheetClose>

              <Button
                variant="ghost"
                className="h-auto justify-start px-0 py-3 text-base font-normal"
              >
                Sobre
              </Button>
            </div>

            {/* Categories */}
            <div className="border-border mb-auto flex flex-col gap-0 border-t px-6 py-4">
              <p className="text-muted-foreground mb-3 text-xs font-semibold uppercase">
                Categorias
              </p>
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant="ghost"
                  className="text-foreground h-auto justify-start px-0 py-2 text-base font-normal"
                >
                  {category.label}
                </Button>
              ))}
            </div>

            {/* Login Button */}
            <div className="border-border border-t px-6 py-4">
              <Button
                className="w-full justify-center gap-2"
                onClick={handleLogin}
              >
                <LogInIcon className="h-4 w-4" />
                Entrar
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
