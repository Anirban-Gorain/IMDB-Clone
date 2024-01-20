import React, { useState } from 'react'
import { useSelector} from "react-redux";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Wrapper } from "../../../components/wrapper/Wrapper";
import { Genres } from "../../../components/genres/Genres";
import { PlayButton } from "../../../components/playButton/PlayButton";
import { CircleRating } from "../../../components/circleRating/CircleRating";
import { VideoPlayer } from "../../../components/videoPlayer/VideoPlayer.jsx";
import dayjs from "dayjs";
import "../../../index.scss";

import "./style.scss";

export const DetailsBanner = ({isLoading, result, crewResult, videoResult}) => 
{
    const {url} = useSelector((state) => state.home);
    const genres = result?.genres.map((data) => data.id);
    const [showVideo, setShowVideo] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const [show, setShow] = useState(false);

    // console.log(videoResult?.length);

    const toHoursAndMinutes = (totalMinutes) => 
    {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const directors = crewResult?.crew.filter((obj) => obj.known_for_department == 'Directing').map((obj) => obj.name).filter((value, ind, self) => self.indexOf(value) === ind).slice(0, 5);
    const writers = crewResult?.crew.filter((obj) => obj.known_for_department == 'Writing').map((obj) => obj.name).filter((value, ind, self) => self.indexOf(value) === ind).slice(0, 5);

    return (
        !isLoading ? (
            <div className="detail-banner">
                {
                    videoResult?.length>0 && <VideoPlayer setShow={setShow} show={show} videoId={videoResult[0].key}/>
                }
                    <div className="detail-banner-backdrop-img">
                        <LazyLoadImage
                            src={url?.poster + result?.backdrop_path}
                            effect="blur"
                        />
                    </div>
                    <div className="overlay"></div>
                    <Wrapper>
                        <div className="content">
                            <div className="left-section">
                                <LazyLoadImage
                                    src={url?.poster + result?.poster_path}
                                    effect="blur"
                                />
                            </div>
                            <div className="right-section">
                                <div className="row title">
                                        {`${result?.title || result?.name} (${dayjs(result?.first_air_date || result?.release_date).format("YYYY")})`}
                                </div>
                                {
                                    !!result?.tagline && <div className="row tagline">
                                        {result?.tagline}
                                    </div>
                                }
                                {
                                    genres?.length>0 && <div className="row">
                                            <Genres genresIds={genres}/>
                                    </div>
                                }
                                <div className="row rating-trailer">
                                    <CircleRating rating={result?.vote_average}/>
                                    <PlayButton 
                                        eventHandler={() => setShow(true)}
                                    />

                                    
                                </div>
                                <div className="row overview">
                                    <h2>Overview</h2>
                                    <span>{result?.overview}</span>
                                </div>
                                <div className="row infos border-bottom">
                                    {
                                        result?.status && <span className="info">
                                            <span className="bold">
                                                Status -
                                            </span>
                                            <span className="data"> {result?.status} </span>
                                        </span>
                                    }
                                    {
                                        (!!result?.release_date || !!result?.first_air_date) && <span className="info">
                                            <span className="bold">
                                                Release Date - 
                                            </span>
                                            <span className="data"> {dayjs(result.release_date || result.first_air_date).format("MMM D, YYYY")} </span>
                                        </span>
                                    }
                                    {
                                        result?.runtime && <span className="info">
                                            <span className="bold">
                                                Duration - 
                                            </span>
                                            <span className="data"> {toHoursAndMinutes(result?.runtime)} </span>
                                        </span>
                                    }
                                </div>
                                    {
                                        directors.length >0 &&<div className="row infos border-bottom">
                                                <span className="info">
                                                    <span className="bold">
                                                        Director -
                                                    </span>
                                                    <span className="data">
                                                        {
                                                            directors.map((value, ind, self) => 
                                                            {
                                                                return <span key={ind}>
                                                                    {" " + value}
                                                                    {(self.length-1 != ind) ? "," : ""}
                                                                </span>
                                                            })
                                                        }
                                                    </span>
                                                </span>
                                        </div>
                                    }
                                    {
                                        writers.length >0 &&<div className="row infos border-bottom">
                                                <span className="info">
                                                    <span className="bold">
                                                        Writers -
                                                    </span>
                                                    <span className="data">
                                                        {
                                                            writers.map((value, ind, self) => 
                                                            {
                                                                return <span key={ind}>
                                                                    {" " + value}
                                                                    {(self.length-1 != ind) ? "," : ""}
                                                                </span>
                                                            })
                                                        }
                                                    </span>
                                                </span>
                                        </div>
                                    }
                            </div>
                        </div>
                    </Wrapper>
            </div>) 
                    
            :(
                
                <Wrapper>
                    <div className="details-banner-skeleton">
                            <div className="left skeleton"></div>
                            <div className="right">
                                <div className="rows skeleton"></div>
                                <div className="rows skeleton"></div>
                                <div className="rows skeleton"></div>
                                <div className="rows skeleton"></div>
                                <div className="rows skeleton"></div>
                                <div className="rows skeleton"></div>
                            </div>
                    </div>
                </Wrapper>
            )
    )
}
