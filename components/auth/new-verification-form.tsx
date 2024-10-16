"use client"

import { useSearchParams } from "next/navigation"
import { CardWrapper } from "./card-wrapper"
import { BeatLoader } from "react-spinners"
import { useEffect, useCallback, useState, Suspense } from "react"
import { newVerification } from "@/actions/new-verification"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;
    
    if (!token) {
      setError("Missing token")
      return;
    }
    newVerification(token).then((data) => {
      setError(data.error)
      setSuccess(data.success)
    }).catch(() => {
      setError("An error occurred")
    })
  }, [token, success, error])

  useEffect(() => {
    onSubmit();
  }, [onSubmit])


  return (
    <Suspense>
      <CardWrapper headerLabel="Confirm your verification" backButtonHref="/auth/login" backButtonlabel="back to login">
      <div className="flex items-center w-full justify-center">
        {!error && !success && <BeatLoader color="#2563EB" />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
    </Suspense>
  )
}