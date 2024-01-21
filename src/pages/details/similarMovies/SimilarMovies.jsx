import React from 'react';
import { Wrapper } from "../../../components/wrapper/Wrapper";
import { Carousel } from "../../../components/carousel/Carousel";
import { fetchAPI } from "../../../customHooks/customHooks";
import "./style.scss";

export const SimilarMovies = ({id, category}) => 
{
    const {result, isLoading} = fetchAPI(`/${category}/${id}/similar`);

    return (
        (result?.results?.length > 0) && <div className="similar-section">
            <Wrapper>
                <span className="carousel-heading">
                    Similar movies
                </span>
            </Wrapper>
            <Carousel results={result?.results} isLoading={isLoading} category={category}/>
        </div>
    )
}
