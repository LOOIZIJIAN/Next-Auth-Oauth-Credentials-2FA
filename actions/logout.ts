'use server'

import { signOut } from "@/auth"
import { redirect } from "next/dist/server/api-utils";

export const logout = async () => {
  //to some cleanup before logout
  await signOut();
}