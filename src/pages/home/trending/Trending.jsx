import React, { useState } from "react";
import { Wrapper } from "../../../components/wrapper/Wrapper";
import { Carousel } from "../../../components/carousel/Carousel";
import { SwitchTabs } from "../../../components/switchTabs/SwitchTabs";
import { fetchAPI } from "../../../customHooks/customHooks";
import "./style.scss"

export const Trending = () => 
{
    const [time, useTime] = useState("day");
    const [category, useCategory] = useState("tv");
    const {result, isLoading} = fetchAPI(`/trending/${category}/${time}`);

    return (
        <div className="carousel-section">
            <Wrapper>
                <span className="carousel-heading">
                    Trending
                </span>
                <div className="wrap-filters">
                    <SwitchTabs sendToParent={useTime} options={["Day", "Week"]} />
                    <SwitchTabs sendToParent={useCategory} options={["TV", "Movie", "All"]} />
                </div>
            </Wrapper>

            <Carousel results={result?.results} isLoading={isLoading}/>
        </div>
    )
}
