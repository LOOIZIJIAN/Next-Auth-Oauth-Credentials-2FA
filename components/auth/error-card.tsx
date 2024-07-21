import { CardWrapper } from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"; 
const ErrorCard = () => {
  return (  
    <CardWrapper headerLabel="Opps! Something went wrong!" backButtonHref="/auth/login" backButtonlabel="Back to login">
      <div className="flex justify-center w-full items-center">
        <ExclamationTriangleIcon className="text-destructive/100"/>
      </div>
    </CardWrapper>
  );
}
 
export default ErrorCard;