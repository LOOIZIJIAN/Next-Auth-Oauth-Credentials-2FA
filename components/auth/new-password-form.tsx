"use client";
import { CardWrapper } from "./card-wrapper";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
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
import { Suspense, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";

export const NewPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>  ("");
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onsubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      newPassword(values, token).then((data) => {         
          setSuccess(data?.success);               
          setError(data?.error);              
      })
    });
  }

  return ( 
   <Suspense>
     <CardWrapper
      headerLabel="Enter a new password"
      backButtonHref="/auth/login"
      backButtonlabel="Back to login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit((onsubmit))} className="space-x-6">
          <div className="space-y-4">
            <FormField control={form.control} name="password" render={({ field })=>(
                <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="******" type="password" disabled={isPending}/>
                </FormControl>
                <FormMessage/>
              </FormItem>     
            )}/>
            <FormError message={error}/>
            <FormSuccess message={success}/>
            <Button type="submit" className="w-full" disabled={isPending}>
              Reset password
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
   </Suspense>
   );
}
 
