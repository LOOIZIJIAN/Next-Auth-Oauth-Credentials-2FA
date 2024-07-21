"use client";
import { CardWrapper } from "./card-wrapper";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ResetSchema } from "@/schemas";
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
import { useState, useTransition } from "react";
import { reset } from "@/actions/reset";

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>  ("");
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onsubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      reset(values).then((data) => {         
          setSuccess(data?.success);               
          setError(data?.error);              
      })
    });
  }

  return ( 
    <CardWrapper
      headerLabel="Forgot password?"
      backButtonHref="/auth/login"
      backButtonlabel="Back to login"
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
            <FormError message={error}/>
            <FormSuccess message={success}/>
            <Button type="submit" className="w-full" disabled={isPending}>
              Sent reset email
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
   );
}
 
