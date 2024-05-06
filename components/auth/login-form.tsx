import { CardWrapper } from "./card-wrapper";

export const LoginForm = () => {
  return ( 
    <CardWrapper
      headerLabel="Welcome back!"
      backButtonHref="/auth/register"
      backButtonlabel="Don't have an account? Register here!"
      showSocial
    >
      Login form !
    </CardWrapper>
   );
}
 
