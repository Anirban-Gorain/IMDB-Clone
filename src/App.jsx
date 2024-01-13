import { useState, useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getAPIConfiguration } from "./store/homeSlice";

// Components

import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { PageNotFound } from "./pages/404/PageNotFound";
import { Details } from "./pages/details/Details";
import { Explore } from "./pages/explore/Explore";
import { Home } from "./pages/home/Home";
import { SearchResult } from "./pages/searchResult/SearchResult";

function App()
{
  const dispatch = useDispatch();

  useEffect(() =>
  {
    APITest();
  }, []);

  const APITest = () =>
  {
    try
     {

      const response = fetchDataFromApi("/movie/popular");
      response.then((res) => dispatch(getAPIConfiguration(res)));

    } 
    catch (error)
    {

      console.log(error);

    }
  };

  return
  <>

  </>;
}

export default App;
