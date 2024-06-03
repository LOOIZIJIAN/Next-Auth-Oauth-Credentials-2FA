'use server'

import { signOut } from "@/auth"

export const logout = async () => {
  //to some cleanup before logout

  await signOut();
}