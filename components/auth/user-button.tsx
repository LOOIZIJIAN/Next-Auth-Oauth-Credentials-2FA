"use client";

import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
 } from "@/components/ui/dropdown-menu";
 import {
  Avatar,
  AvatarImage,
  AvatarFallback,
 } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "./logout-button";
import { ExitIcon } from "@radix-ui/react-icons";

 export const UserButton = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""}/>
            <AvatarFallback className="bg-sky-500">
              <FaUser className="text-white"/>  
            </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-20" align="end">
        <LogoutButton>
          <ExitIcon className="w-4 h-4 mr-2 mt-1"/>
          Logout
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
 }