const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return ( 
    <div className="flex h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100 to-blue-300">
      {children}
    </div>
   );
}
 
export default AuthLayout;