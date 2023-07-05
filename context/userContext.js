import { ACCESS_TOKEN } from "@/utils/constants";
import { getTokenFromCookies } from "@/utils/cookies.utils";
import { verifyToken } from "@/utils/jwt.utils";
import * as React from "react";

export const UserContext = React.createContext(null);

const UserProvider = ({
  children,
}) => {
  const token = getTokenFromCookies(ACCESS_TOKEN)
  const [user, setuser] = React.useState({})

  const getUser = async () => {
    const user = await verifyToken(token)
    setuser(user)
  }
  React.useEffect(() => {
    getUser()
    return () => {
      setuser({})
    }
  }, [token])


  return (
    <UserContext.Provider
      value={{
        user
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;