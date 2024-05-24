"use client"

import { useSearchParams } from "next/navigation"
import { CardWrapper } from "./card-wrapper"
import { BeatLoader } from "react-spinners"

export const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  return (
    <CardWrapper headerLabel="Confirm your verification" backButtonHref="/auth/login" backButtonlabel="back to login">
      <div className="flex items-center w-full justify-center">
        <BeatLoader />
      </div>
    </CardWrapper>
  )
}