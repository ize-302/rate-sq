import axios from "axios";
import { useRouter } from "next/router";
import * as React from "react";

export const ShowContext = React.createContext(null);

const ShowProvider = ({
  children,
}) => {
  const [item, setitem] = React.useState(null)
  const [loading, setloading] = React.useState(true)
  const [loadingratings, setloadingratings] = React.useState(true)
  const [searchresults, setsearchresults] = React.useState([])
  const [data, setdata] = React.useState({})
  const [usershowsdata, setusershowsdata] = React.useState({})
  const [ratings, setratings] = React.useState([])
  const router = useRouter()
  const page = router.query.page ? router.query.page : 1

  const fetchShow = async (id) => {
    setloading(true)
    await axios.get(`/api/v1/shows/${id}`).then(response => {
      setitem(response.data ? response.data : null)
      setloading(false)
    }).catch(err => {
      setitem(null)
      setloading(false)
      console.log(err)
    })
  }


  const fetchShowRatings = async (show_id) => {
    setloadingratings(true)
    await axios.get(`/api/v1/shows/${show_id}/ratings`).then(response => {
      setratings(response.data)
      setloadingratings(false)
    }).catch(err => {
      setratings([])
      console.log(err)
      setloadingratings(false)
    })
  }

  const handleSearch = async (query) => {
    setloading(true)
    await axios.get(`/api/v1/search?query=${query}`).then(response => {
      setsearchresults(response.data.items)
      setloading(false)
    }).catch(error => {
      setloading(false)
      console.log(error)
    })
  }

  const fetchShows = async () => {
    setloading(true)
    await axios.get(`/api/v1/shows?page=${page}&per_page=20`).then(response => {
      setdata(response.data)
      setloading(false)
    }).catch(err => {
      console.log(err)
      setloading(false)
    })
  }

  const fetchUserShows = async (user_id) => {
    setloading(true)
    await axios.get(`/api/v1/user/${user_id}/shows?page=${page}&per_page=20`).then(response => {
      setusershowsdata(response.data)
      setloading(false)
    }).catch(err => {
      console.log(err)
      setloading(false)
    })
  }



  return (
    <ShowContext.Provider
      value={{
        item,
        setitem,
        fetchShow,
        loading,
        setloading,
        searchresults,
        handleSearch,
        setsearchresults,
        data,
        setdata,
        fetchShows,
        usershowsdata,
        fetchUserShows,
        fetchShowRatings,
        ratings,
        loadingratings,
        setloadingratings
      }}
    >
      {children}
    </ShowContext.Provider>
  );
};

export default ShowProvider;