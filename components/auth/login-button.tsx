"use client";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({ children, mode, asChild }: LoginButtonProps) => { 
  const onclick = () => {
    console.log("LoginButton clicked");
  }
  return (
    <span onClick={onclick} className="cursor-pointer">
      {children}
    </span>
  );
}