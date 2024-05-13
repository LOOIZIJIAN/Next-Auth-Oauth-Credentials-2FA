"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";

export const login = async (values:z.infer<typeof LoginSchema>)=>{
  const validatedFields = LoginSchema.safeParse(values);
  if(!validatedFields.success){
    return {error: "Invalid fields"};
  }
  
  const {email, password} = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if(!existingUser || !existingUser.password|| !existingUser.email){
    return {error: "Email not found"};
  }

  if(!existingUser.emailVerified){
    const verificationToken = await generateVerificationToken(existingUser.email); 
    return {success: "Verify email send!"};
  }
  try {
    await signIn("credentials", {email, password, redirectTo: DEFAULT_LOGIN_REDIRECT});
    return {success: "Logged in!"};
  } catch (error) {
    if (error instanceof AuthError){
      switch (error.type) {
        case "CredentialsSignin":
          return {error: "Invalid credentials"};
      
        default: return {error: "An error occurred"};

      }
    }
    throw error;
  }
}