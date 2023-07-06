import { fillRatingData } from "@/utils";
import * as React from "react";
import axios from "axios";
import { useRouter } from "next/router";

export const RatingContext = React.createContext(null);

const RatingProvider = ({
  children,
}) => {
  const [ratings, setratings] = React.useState({})
  const [loading, setloading] = React.useState(true)
  const router = useRouter()
  const page = router.query.page ? router.query.page : 1

  const fetchUserRatings = async (user_id) => {
    setloading(true)
    await axios.get(`/api/v1/user/${user_id}/ratings?page=${page}&per_page=20`).then(async response => {
      setratings(response.data)
      setloading(false)
    }).catch(err => {
      setratings({})
      setloading(false)
      console.log(err)
    })
  }

  return (
    <RatingContext.Provider
      value={{
        ratings,
        loading,
        fetchUserRatings,
        setloading
      }}
    >
      {children}
    </RatingContext.Provider>
  );
};

export default RatingProvider;