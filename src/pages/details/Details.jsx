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


import "./style.scss";

export const Details = () =>
{
	const {mediaType, id} = useParams();
	const {result, isLoading} = fetchAPI(`/${mediaType}/${id}`);
	const {result: workers, isLoading: isLoadingCrew} = fetchAPI(`/${mediaType}/${id}/credits`);
	const {result: videoResult, isLoading: isLoadingVideoResult} = fetchAPI(`/${mediaType}/${id}/videos`);
	const [show, setShow] = useState(false);
	const [videoId, setVideoId] = useState(null);
	
	// Filtering all the YT videos

	const ytVideos = videoResult?.results?.filter((val) => val.site === "YouTube");

	return (
		<>
			{
				ytVideos?.length>0 && <VideoPlayer setShow={setShow} show={show} videoId={videoId}/>
			}
			{
				ytVideos?.length>0 && <DetailsBanner 
				isLoading={(isLoading || isLoadingCrew || isLoadingVideoResult)} 
				result={result}  
				crewResult={workers}
				videoId={ytVideos[0]?.key}
				setVideoId={setVideoId}
				setShow={setShow}
				/>
			}
			<Cast isLoading={(isLoadingCrew)} casts={workers?.cast}/>
			{
				ytVideos?.length>0 && <OfficialVideos 
					isLoadingVideoResult={isLoadingVideoResult}
					videoResults={ytVideos}
					setVideoId={setVideoId}
					setShow={setShow}
				/>
			}
		</>
	)
}
