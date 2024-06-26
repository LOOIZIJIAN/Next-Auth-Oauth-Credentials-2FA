'use client';

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
  const user = useCurrentUser();
  const handleSignOut =  () => {
     logout();
  }
  return ( 
    <div>
      <button onClick={handleSignOut} type="submit">Sign Out</button>
    </div>
   );
}
 
export default SettingsPage;