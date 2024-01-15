import { fetchDataFromApi } from "../utils/api";
import {useState, useEffect} from "react";

export const fetchAPI = (url) =>
{
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const res = fetchDataFromApi(url);

    useEffect(() =>
    {
        setError(null);
        setIsLoading(true);

        res.then((res) => 
        {
            setIsLoading(false);
            setResult(res);
        }).catch((err) => 
        {
            setIsLoading(false);
            setError(err);
        })
    }, [url]);
    

    return {result, error, isLoading};
}