import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerifacationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;  

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email address",
    html: `<p>Click <a href="${confirmLink}">here</a> to verify your email.</p>`,
  })
  console.log("send email!");
}