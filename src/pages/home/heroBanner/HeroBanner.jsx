import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../../../customHooks/customHooks";
import { useSelector } from "react-redux";
import { Wrapper } from "../../../components/wrapper/Wrapper";
import { LazyLoadingImage } from "../../../components/lazyLoadingImage/LazyLoadingImage"
import "./style.scss";


export const HeroBanner = () =>
{
    const [bgSrc, setBgSrc] = useState("");
    const [input, setInput] = useState("")
    const {result, isLoading} = fetchAPI("/movie/popular");
    const navigate = useNavigate();
    const {url} = useSelector((state) => state.home);
    
    useEffect(() => 
    {   const len = result?.results?.length;
        setBgSrc(url?.backdrop + result?.results[Math.floor((len * Math.random()))].backdrop_path);
    }, [result]);

    const searchQueryHandler = (e) =>
    {
        if((e.type==="keyup" && input.length>0 && e.key==="Enter") || (e.type==="click" && input.length>0))
            navigate(`/search/${input}`);
    }
    
    return (
        <div className="hero-banner">
            {
                (!isLoading) &&
                <div className="hero-image">
                    <LazyLoadingImage src={bgSrc} />
                </div>
                
            }

            <div className="gradient-layer"></div>
            <Wrapper>
                <div className="hero-banner-content">
                    <span className="title">Welcome</span>
                    <span className="sub-title">Millions of movies, TV shows, and artists to discover. Explore now</span>
                    <div className="search-input">
                        <input type="text" 
                            value={input}
                            onChange={(e)=>
                                {
                                    setInput(e.target.value);
                                }}
                            onKeyUp={searchQueryHandler}
                        />
                        <button
                            onClick={searchQueryHandler}
                        >Search</button>
                    </div>
                </div>
            </Wrapper>
        </div>
    )
}
