import axios from "axios";
import * as React from "react";

export const TitleContext = React.createContext(null);

const TitleProvider = ({
  children,
}) => {
  const [item, setitem] = React.useState(null)
  const [loading, setloading] = React.useState(true)
  const [searchresults, setsearchresults] = React.useState([])

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

  const handleSearch = (query) => {
    axios.get(`/api/v1/search?query=${query}`).then(response => {
      setsearchresults(response.data.items)
      setloading(false)
    }).catch(error => {
      setloading(false)
      console.log(error)
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
        setsearchresults
      }}
    >
      {children}
    </TitleContext.Provider>
  );
};

export default TitleProvider;