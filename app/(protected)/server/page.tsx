import { UserInfo } from "@/components/user-info";
import { curentUser } from "@/lib/auth";

const ServerPage = async () => {
  const user = await curentUser();
  
  return ( 
      <UserInfo label="🗄️Server Component" user={user} /> 
  );
};

export default ServerPage;