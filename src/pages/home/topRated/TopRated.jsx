import React, { useState } from "react";
import { Wrapper } from "../../../components/wrapper/Wrapper";
import { Carousel } from "../../../components/carousel/Carousel";
import { SwitchTabs } from "../../../components/switchTabs/SwitchTabs";
import { fetchAPI } from "../../../customHooks/customHooks";
import "./style.scss";

export const TopRated = () => 
{
    const [category, useCategory] = useState("tv");
    const {result, isLoading} = fetchAPI(`/${category}/top_rated`);

    return (
        <div className="carousel-section">
            <Wrapper>
                <span className="carousel-heading">
                    Top-Rated
                </span>
                <div className="wrap-filters">
                    <SwitchTabs sendToParent={useCategory} options={["TV", "Movie"]} />
                </div>
            </Wrapper>
            <Carousel results={result?.results} isLoading={isLoading} category={category}/>
        </div>
    )
}
