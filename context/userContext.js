import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/utils/constants";
import { getTokenFromCookies, saveTokenInCookies } from "@/utils/cookies.utils";
import { verifyToken } from "@/utils/jwt.utils";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import axios from "axios";
import * as React from "react";

export const UserContext = React.createContext(null);

const UserProvider = ({
  children,
}) => {
  const token = getTokenFromCookies(ACCESS_TOKEN)
  const [user, setuser] = React.useState({})
  const [loading, setloading] = React.useState(false)

  const getUser = async () => {
    const user = await verifyToken(token)
    setuser(user)
  }
  React.useEffect(() => {
    getUser()
  }, [token])

  const updateProfile = (values) => {
    setloading(true)
    axios.put(`/api/v1/user/profile`, {
      display_name: values.display_name
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      setloading(false)
      saveTokenInCookies(ACCESS_TOKEN, response.data.access_token)
      saveTokenInCookies(REFRESH_TOKEN, response.data.refresh_token)
      notifications.show({
        title: 'Profile updated succssfully',
        message: "",
        color: "green",
        icon: <IconCheck />,
      });
    }).catch(err => {
      setloading(false)
      console.log(err)
    })
  }


  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        setloading,
        updateProfile
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;