import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import fallBackPoster from "../../assets/no-poster.png";

import "./style.scss";
import 'react-lazy-load-image-component/src/effects/blur.css';

export const MovieCard = ({result, clickHandler}) => 
{
	const {url} = useSelector((state) => state.home);

	return (
		<div 
			className="card-container"
			onClick={clickHandler}
		>
		<div className="card-img">
			<LazyLoadImage 
			src={(result?.poster_path) ? url.poster + result?.poster_path : fallBackPoster}
			effect="blur"
			/>
		</div>
		<div className="details">
			<div className="title">
				{result?.title || result?.name}
			</div>
			<div className="date">
				{dayjs(result?.release_date || result?.first_air_date).format("MMM D, YYYY")}
			</div>
		</div>
		</div>
	)
}
