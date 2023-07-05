import { fillRatingData } from "@/utils";
import axios from "axios";
import * as React from "react";

export const RatingContext = React.createContext(null);

const RatingProvider = ({
  children,
}) => {
  const [ratings, setratings] = React.useState([])
  const [loading, setloading] = React.useState(true)

  const fetchRatings = async (title_id) => {
    setloading(true)
    await axios.get(`/api/v1/titles/${title_id}/ratings`).then(async response => {
      const result = await fillRatingData({ data: response.data.items })
      setratings(result)
      setloading(false)
    }).catch(err => {
      setratings([])
      setloading(false)
      console.log(err)
    })
  }

  return (
    <RatingContext.Provider
      value={{
        fetchRatings,
        ratings,
        loading
      }}
    >
      {children}
    </RatingContext.Provider>
  );
};

export default RatingProvider;