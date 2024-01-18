import React, { useRef, useEffect, useCallback } from 'react';
import { useSelector } from "react-redux";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import noPosterPlaceHolder from "../..//assets/no-poster.png";
import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";
import { Genres } from "../genres/Genres";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import { CircleRating } from "../circleRating/CircleRating";
import 'react-lazy-load-image-component/src/effects/blur.css';
import "./style.scss";
import "../../index.scss";


export const Carousel = ({results, isLoading, category}) => 
{
  console.log(isLoading);
  const {url, genres} = useSelector((state) => state.home);
  const carousalItemsContainer = useRef();
  const navigate = useNavigate();

  const carouselSkeleton = () =>
  {
    return (
      <div className="carousel-item carousel-item-skeleton">
        <div className="poster skeleton">
          <div className="poster-img"></div>
        </div>
        <div className="details">
          <div className="text skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    )
  }

  const handleSlider = useCallback((dir) => {
    const slideAmount = dir === "right" ? (carousalItemsContainer.current.scrollLeft + carousalItemsContainer.current.offsetWidth - 50) : (carousalItemsContainer.current.scrollLeft - carousalItemsContainer.current.offsetWidth -50);
    carousalItemsContainer.current.scrollTo({ left: slideAmount, behavior: "smooth" });
  }, [carousalItemsContainer]);
  

  useEffect(() => {
    carousalItemsContainer.current.scrollTo({left: 0, behavior: "instant"})
  }, [isLoading])
  
  return (
    <div className="carousel">
      <CiCircleChevLeft className="arrow left" 
        onClick={() => handleSlider("left")}
      />
      <CiCircleChevRight className="arrow right" 
        onClick={() => handleSlider("right")}
      />
      <div 
        className="carousel-items"
        ref={carousalItemsContainer}
      >
        {
          !isLoading ? (
                results.map((result, index) => {
                    return (
                      <div key={index} className="carousel-item">
                        <div 
                          className="poster"
                          onClick={() => {navigate(`/${result.media_type || category}/${result.id}`); console.log("Ya");}}
                        >
                            <Genres genresIds={result?.genre_ids.slice(0, 3)}/>
                            <CircleRating rating={result?.vote_average}/>
                            <LazyLoadImage
                              src={url?.profile + result?.poster_path}
                              effect="blur"
                            />
                        </div>
                        <div className="details">
                          <div className="text">{result?.name || result?.title}</div>
                          <div className="date">{dayjs(result.release_date || result.first_air_date).format("MMM D, YYYY")}</div>
                        </div>
                      </div>
                    )
                })
            ) : (
              <>
                {carouselSkeleton()}
                {carouselSkeleton()}
                {carouselSkeleton()}
                {carouselSkeleton()}
                {carouselSkeleton()}
                {carouselSkeleton()}
                {carouselSkeleton()}
                {carouselSkeleton()}
                {carouselSkeleton()}
                {carouselSkeleton()}
                {carouselSkeleton()}
                {carouselSkeleton()}
                {carouselSkeleton()}
              </>
            )
        }
      </div>
    </div>
  )
}
