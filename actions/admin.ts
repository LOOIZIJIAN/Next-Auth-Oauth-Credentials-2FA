'use server';

import { curentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { error } from "console";

export const admin = async () => {
  const role  = await curentRole();
  if(role === UserRole.ADMIN) {
    return {success: "Allowed!"}
  }
  return {error: "Forbidden!"}
}