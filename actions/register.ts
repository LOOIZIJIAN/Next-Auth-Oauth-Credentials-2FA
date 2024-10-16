"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcyrpt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { sendVerifacationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

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

  const verificationToken = await generateVerificationToken(email);
  await sendVerifacationEmail(
    verificationToken?.email as string,
    verificationToken?.token as string
  );
  console.log("token:"+verificationToken);

  return {success:"Comformation email sent."};

}