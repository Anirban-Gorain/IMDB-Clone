import React from 'react';
import { Wrapper } from "../../../components/wrapper/Wrapper";
import { Carousel } from "../../../components/carousel/Carousel";
import { fetchAPI } from "../../../customHooks/customHooks";
import "./style.scss";

export const RecommendedMovies = ({id, category}) => 
{
    const {result, isLoading} = fetchAPI(`/${category}/${id}/recommendations`);

    return (
        (result?.results?.length > 0) && <div className="recommended-section">
            <Wrapper>
                <span className="carousel-heading">
                    Recommended movies
                </span>
            </Wrapper>
            <Carousel results={result?.results} isLoading={isLoading} category={category}/>
        </div>
    )
}
