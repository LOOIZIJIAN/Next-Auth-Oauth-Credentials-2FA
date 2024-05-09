"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcyrpt from "bcrypt";
import { db } from "@/lib/db";

export const register = async (values:z.infer<typeof RegisterSchema>)=>{
  const validatedFields = RegisterSchema.safeParse(values);
  if(!validatedFields.success){
    return {error: "Invalid fields"};
  }
  
  const {email, name, password} = validatedFields.data;
  const hashedPassword = await bcyrpt.hash(password, 10);
  const existingUser = await db.user.findUnique({
    where:{
      email,
    }
  });

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


  return {success:"User Created!"};

}