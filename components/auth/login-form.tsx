"use client";
import { CardWrapper } from "./card-wrapper";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
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
import { login } from "@/actions/login";
import { useState, useTransition } from "react";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>  ("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onsubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {         
          setSuccess(data?.success);               
          setError(data?.error);              
      })
    });
  }

  return ( 
    <CardWrapper
      headerLabel="Welcome back!"
      backButtonHref="/auth/register"
      backButtonlabel="Don't have an account? Register here!"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit((onsubmit))} className="space-x-6">
          <div className="space-y-4">
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
              Login
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
   );
}
 
