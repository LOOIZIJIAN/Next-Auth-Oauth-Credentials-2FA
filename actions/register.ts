"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { error } from "console";

export const register = async (values:z.infer<typeof RegisterSchema>)=>{
  const validatedFields = RegisterSchema.safeParse(values);
  if(!validatedFields.success){
    return {error: "Invalid fields"};
  }
  // Here we would do the actual login logic
  return {success:"Email sent!"};

}