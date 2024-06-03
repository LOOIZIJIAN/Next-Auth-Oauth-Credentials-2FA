import { auth } from "@/auth"

export const curentUser = async () => {
  const session = await auth();
  return session?.user;
}

export const curentRole = async () => {
  const session = await auth();
  return session?.user?.role;
}