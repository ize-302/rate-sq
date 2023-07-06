import axios from "axios";
import { useRouter } from "next/router";
import * as React from "react";

export const TitleContext = React.createContext(null);

const TitleProvider = ({
  children,
}) => {
  const [item, setitem] = React.useState(null)
  const [loading, setloading] = React.useState(true)
  const [loadingratings, setloadingratings] = React.useState(true)
  const [searchresults, setsearchresults] = React.useState([])
  const [data, setdata] = React.useState({})
  const [usertitlesdata, setusertitlesdata] = React.useState({})
  const [ratings, setratings] = React.useState([])
  const router = useRouter()
  const page = router.query.page ? router.query.page : 1

  const fetchTitle = async (id) => {
    setloading(true)
    await axios.get(`/api/v1/titles/${id}`).then(response => {
      setitem(response.data ? response.data : null)
      setloading(false)
    }).catch(err => {
      setitem(null)
      setloading(false)
      console.log(err)
    })
  }


  const fetchTitleRatings = async (show_id) => {
    setloadingratings(true)
    await axios.get(`/api/v1/titles/${show_id}/ratings`).then(response => {
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

  const fetchTitles = async () => {
    setloading(true)
    await axios.get(`/api/v1/titles?page=${page}&per_page=20`).then(response => {
      setdata(response.data)
      setloading(false)
    }).catch(err => {
      console.log(err)
      setloading(false)
    })
  }

  const fetchUserTitles = async (user_id) => {
    setloading(true)
    await axios.get(`/api/v1/user/${user_id}/titles?page=${page}&per_page=20`).then(response => {
      setusertitlesdata(response.data)
      setloading(false)
    }).catch(err => {
      console.log(err)
      setloading(false)
    })
  }



  return (
    <TitleContext.Provider
      value={{
        item,
        setitem,
        fetchTitle,
        loading,
        setloading,
        searchresults,
        handleSearch,
        setsearchresults,
        data,
        setdata,
        fetchTitles,
        usertitlesdata,
        fetchUserTitles,
        fetchTitleRatings,
        ratings,
        loadingratings,
        setloadingratings
      }}
    >
      {children}
    </TitleContext.Provider>
  );
};

export default TitleProvider;