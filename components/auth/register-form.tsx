"use client";
import { CardWrapper } from "./card-wrapper";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { register } from "@/actions/register";
import { useState, useTransition } from "react";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>  ("");
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onsubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {         
          setSuccess(data.success);               
          setError(data.error);             
      })
    });
  }

  return ( 
    <CardWrapper
      headerLabel="Create an account!"
      backButtonHref="/auth/login"
      backButtonlabel="Already have an account? Login here!"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit((onsubmit))} className="space-x-6">
          <div className="space-y-4">
            <FormField control={form.control} name="name" render={({ field })=>(
                  <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="looi" disabled={isPending}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>            
              )}/>
            <FormField control={form.control} name="email" render={({ field })=>(
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="looi@email.com" type="email" disabled={isPending}/>
                </FormControl>
                <FormMessage/>
              </FormItem>            
            )}/>
            <FormField control={form.control} name="password" render={({ field })=>(
                <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="******" type="password" disabled={isPending}/>
                </FormControl>
                <FormMessage/>
              </FormItem>          
            )}/>
            <FormError message={error}/>
            <FormSuccess message={success}/>
            <Button type="submit" className="w-full" disabled={isPending}>
              Register
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
   );
}
 
