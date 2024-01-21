import React, { useState } from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Wrapper } from "../../components/wrapper/Wrapper";
import { DetailsBanner } from "./detailsBanner/DetailsBanner";
import { Cast } from "./cast/Cast";
import { useParams } from "react-router-dom"; 
import { fetchAPI } from "../../customHooks/customHooks";
import { VideoPlayer } from "../../components/videoPlayer/VideoPlayer.jsx";
import { OfficialVideos } from "./officialVideos/OfficialVideos";
import { RecommendedMovies } from "./recommendedMovies/RecommendedMovies";
import { SimilarMovies } from "./similarMovies/SimilarMovies";


import "./style.scss";

export const Details = () =>
{
	const {mediaType, id} = useParams();
	const {result, isLoading} = fetchAPI(`/${mediaType}/${id}`);
	const {result: workers, isLoading: isLoadingCrew} = fetchAPI(`/${mediaType}/${id}/credits`);
	const {result: videoResult, isLoading: isLoadingVideoResult} = fetchAPI(`/${mediaType}/${id}/videos`);
	const [show, setShow] = useState(false);
	const [videoId, setVideoId] = useState(null);

	// console.log(isLoading, isLoadingCrew, isLoadingVideoResult);

	// Filtering all the YT videos

	const ytVideos = videoResult?.results?.filter((val) => val.site === "YouTube");

	return (
		<>
			{
				ytVideos?.length>0 && <VideoPlayer setShow={setShow} show={show} videoId={videoId}/>
			}
			{
				<DetailsBanner 
				isLoading={(isLoading || isLoadingCrew || isLoadingVideoResult)} 
				result={result}  
				crewResult={workers}
				videoId={ytVideos?.[0]?.key}
				setVideoId={setVideoId}
				setShow={setShow}
				/>
			}
			<Cast isLoading={(isLoadingCrew)} casts={workers?.cast}/>
			{
				<OfficialVideos 
					isLoadingVideoResult={isLoadingVideoResult}
					videoResults={ytVideos}
					setVideoId={setVideoId}
					setShow={setShow}
				/>
			}
			<SimilarMovies id={id} category={mediaType}/>
			<RecommendedMovies id={id} category={mediaType}/>
		</>
	)
}
