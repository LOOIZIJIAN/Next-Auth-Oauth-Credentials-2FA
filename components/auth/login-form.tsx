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

export const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onsubmit = (data: z.infer<typeof LoginSchema>) => {
    console.log(data);
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
                  <Input {...field} placeholder="looi@email.com" type="email"/>
                </FormControl>
                <FormMessage/>
              </FormItem>
              
            )}/>
            <FormField control={form.control} name="password" render={({ field })=>(
                <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="******" type="password"/>
                </FormControl>
                <FormMessage/>
              </FormItem>          
            )}/>
            <FormError message="Invalid Credential !"/>
            <FormSuccess message="Email Sent !"/>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
   );
}
 
