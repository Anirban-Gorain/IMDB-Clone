import React from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Wrapper } from "../../components/wrapper/Wrapper";
import { DetailsBanner } from "./detailsBanner/DetailsBanner";
import { Cast } from "./cast/Cast";
import { useParams } from "react-router-dom"; 
import { fetchAPI } from "../../customHooks/customHooks";


import "./style.scss";

export const Details = () =>
{
	const {mediaType, id} = useParams();
	const {result, isLoading} = fetchAPI(`/${mediaType}/${id}`);
	const {result: workers, isLoading: isLoadingCrew} = fetchAPI(`/${mediaType}/${id}/credits`);
	const {result: videoResult, isLoading: isLoadingResult} = fetchAPI(`/${mediaType}/${id}/videos`);
	
	// Filtering all the YT videos

	const ytVideos = videoResult?.results?.filter((val) => val.site === "YouTube");

	console.log(workers);

	return (
		<>
			<DetailsBanner 
				isLoading={(isLoading || isLoadingCrew || isLoadingResult)} 
				result={result}  
				crewResult={workers}
				videoResult={ytVideos}
			/>
			<Cast isLoading={(isLoadingCrew)} casts={workers?.cast}/>
		</>
	)
}
