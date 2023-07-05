import axios from "axios";
import { useRouter } from "next/router";
import * as React from "react";

export const TitleContext = React.createContext(null);

const TitleProvider = ({
  children,
}) => {
  const [item, setitem] = React.useState(null)
  const [loading, setloading] = React.useState(true)
  const [searchresults, setsearchresults] = React.useState([])
  const [data, setdata] = React.useState({})
  const router = useRouter()
  const page = router.query.page ? router.query.page : 0

  const fetchTitle = async (id) => {
    await axios.get(`/api/v1/titles/${id}`).then(response => {
      setitem(response.data ? response.data : null)
      setloading(false)
    }).catch(err => {
      setitem(null)
      setloading(false)
      console.log(err)
    })
  }

  const handleSearch = async (query) => {
    await axios.get(`/api/v1/search?query=${query}`).then(response => {
      setsearchresults(response.data.items)
      setloading(false)
    }).catch(error => {
      setloading(false)
      console.log(error)
    })
  }

  const fetchTitles = async () => {
    await axios.get(`/api/v1/titles?page=${page}&per_page=20`).then(response => {
      setdata(response.data)
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
      }}
    >
      {children}
    </TitleContext.Provider>
  );
};

export default TitleProvider;