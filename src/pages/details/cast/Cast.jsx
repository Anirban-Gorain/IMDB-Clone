import React, { useRef, useEffect, useCallback } from 'react';
import { useSelector } from "react-redux";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "../../../components/wrapper/Wrapper";
import dayjs from 'dayjs';
import 'react-lazy-load-image-component/src/effects/blur.css';
import "./style.scss";
import fallbackProfileImg from "../../../assets/avatar.png";

export const Cast = ({casts, isLoading}) => 
{
  const {url} = useSelector((state) => state.home);
  const castItemsContainer = useRef();

  const castSkeleton = () =>
  {
    return (
      <div className="cast-item cast-item-skeleton">
        <div className="profile skeleton">
          <div className="poster-img"></div>
        </div>
        <div className="details">
          <div className="cast-name skeleton"></div>
          <div className="original-name skeleton"></div>
        </div>
      </div>
    )
  }

  const handleSlider = useCallback((dir) => {
    const slideAmount = dir === "right" ? (castItemsContainer.current.scrollLeft + castItemsContainer.current.offsetWidth - 50) : (castItemsContainer.current.scrollLeft - castItemsContainer.current.offsetWidth -50);
    castItemsContainer.current.scrollTo({ left: slideAmount, behavior: "smooth" });
  }, [castItemsContainer]);
  

  useEffect(() => {
    castItemsContainer.current.scrollTo({left: 0, behavior: "instant"})
  }, [isLoading])
  
  return (
      <div className="cast-container">
        <Wrapper>
          <span className="cast-heading">
              Top-Rated
          </span>
        
          <div className="cast">
            <CiCircleChevLeft className="arrow left" 
              onClick={() => handleSlider("left")}
            />
            <CiCircleChevRight className="arrow right" 
              onClick={() => handleSlider("right")}
            />
            <div 
              className="cast-items"
              ref={castItemsContainer}
            >
              {
                !isLoading ? (
                      casts?.map((result, index) => {
                          const profileSrc = (result.profile_path) ? url?.profile + result?.profile_path : fallbackProfileImg;
                          return (
                            <div key={index} className="cast-item">
                              <div 
                                className="profile"
                              >
                                  <LazyLoadImage
                                    src={profileSrc}
                                    effect="blur"
                                  />
                              </div>
                              <div className="details">
                                <div className="cast-name">{result?.character || result?.name}</div>
                                <div className="original-name">{result?.original_name}</div>
                              </div>
                            </div>
                          )
                      })
                  ) : (
                    <>
                      {castSkeleton()}
                      {castSkeleton()}
                      {castSkeleton()}
                      {castSkeleton()}
                      {castSkeleton()}
                      {castSkeleton()}
                      {castSkeleton()}
                      {castSkeleton()}
                      {castSkeleton()}
                      {castSkeleton()}
                      {castSkeleton()}
                      {castSkeleton()}
                      {castSkeleton()}
                    </>
                  )
              }
            </div>
          </div>
        </Wrapper>
      </div>
  )
}
