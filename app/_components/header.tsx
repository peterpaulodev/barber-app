"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarImage } from "./ui/avatar";
import MenuSheet from "./menu-sheet";

const Header = () => {
  const { data: session } = authClient.useSession();
  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <header className="flex items-center justify-between bg-white px-5 py-6">
      <Image src="/logo.svg" alt="Logo" width={100} height={26.09} />
      <div className="flex items-center gap-2">
        {session ? (
          <>
            <Avatar>
              <AvatarImage
                src={session.user.image || ""}
                alt={session.user.name || "User"}
              />
            </Avatar>
            <span className="text-foreground text-sm">
              Olá, {session.user.name}
            </span>
            <Button variant="outline" size="icon" onClick={handleLogout}>
              <LogOutIcon />
            </Button>
          </>
        ) : (
          <Button variant="outline" size="icon" onClick={handleLogin}>
            <LogInIcon />
          </Button>
        )}

        <MenuSheet />
      </div>
    </header>
  );
};

export default Header;
