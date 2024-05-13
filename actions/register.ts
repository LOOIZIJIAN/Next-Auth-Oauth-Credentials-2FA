"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcyrpt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verfication-token";

export const register = async (values:z.infer<typeof RegisterSchema>)=>{
  const validatedFields = RegisterSchema.safeParse(values);
  if(!validatedFields.success){
    return {error: "Invalid fields"};
  }
  
  const {email, name, password} = validatedFields.data;
  const hashedPassword = await bcyrpt.hash(password, 10);
  const existingUser = await getUserByEmail(email);

  if(existingUser){
    return {error:"User already exists"};
  }

  await db.user.create({
    data:{
      email,
      name,
      password: hashedPassword,
    }
  });

  const verificationToken = await getVerificationTokenByToken(email);


  return {success:"User Created!"};

}