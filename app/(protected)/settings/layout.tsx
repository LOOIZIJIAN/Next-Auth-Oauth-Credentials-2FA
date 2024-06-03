import { Navbar } from "../_components/navbar";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await auth();
  return(
    <SessionProvider session={session}>
      <div className="w-full h-full flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100 to-blue-600">
        <Navbar/>
        {children}
      </div>
    </SessionProvider>
  )
}

export default ProtectedLayout;