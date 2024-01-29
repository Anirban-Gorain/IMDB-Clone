import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Wrapper } from "../../components/wrapper/Wrapper";
import { fetchDataFromApi } from "../../utils/api";
import { MovieCard } from "../../components/movieCard/MovieCard";
import { LoadingCircle } from "../../components/loadingCircle/LoadingCircle.jsx";
import InfiniteScroll from 'react-infinite-scroll-component';
import { FaRobot } from "react-icons/fa6";
import { useNavigate } from "react-router";
import Select from 'react-select';
import dayjs from "dayjs";


import "./style.scss";


export const Explore = () =>
{
	const {mediaType} = useParams();
	const [exploreResults, setExploreResults] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const [totalRes, setTotalRes] = useState(1);
	const [url, setUrl] = useState();
	const navigate = useNavigate();
	const {genres} = useSelector((state) => state.home);
	// Options

	const lastYear = dayjs().format("YYYY")
	const yearOptions = [...Array(lastYear - 1900 + 1)].map((elem, index) => {return {value: 1900 + index, label: 1900 + index}});
	const [year, setYear] = useState("all");
	
	const [popularity, setPopularity] = useState("popularity.desc");
	const popularOptions = [
		{value: "popularity.desc", label: "Descending"},
		{value: "popularity.ase", label: "Ascending"}
	]

	const [includeGenres, setIncludeGenres] = useState("all");
	const [excludeGenres, setExcludeGenres] = useState("none");
	const genresOptions = Object.values(genres).map((elem) => {return {value: elem.toLowerCase(), label: elem}});

	
	console.log(exploreResults);
	
	useEffect(() => {
		setExploreResults([]);
		const constructURL = `/discover/${mediaType === "movies" ? "movie" : "tv"}?${year === "all" ? "" : (mediaType === "movies" ? "primary_release_year=" : "first_air_date_year=") + year}&sort_by=${popularity}${includeGenres === "all" ? "" : "&with_genres=" + includeGenres}${excludeGenres === "none" ? "" : "&without_genres=" + excludeGenres}&page=${1}`;
		setUrl(constructURL);

		(async () => {
			try {
				const response = await fetchDataFromApi(constructURL);
				setExploreResults(response.results);
				setTotalRes(response.total_results);
				setPageNumber(2);
	
			} catch (error) {
				console.log(error);
			}
		})();
	}, [year, popularity, includeGenres, excludeGenres, mediaType]);

	async function nextMovieResults()
	{
		try 
		{
			const response = await fetchDataFromApi(url);
			console.log(response);
			setPageNumber((prev) => prev+1);
			setExploreResults((prev) => 
			{
				const newData = [...prev, ...response.results];
				return newData;
			});
			
		} 
		catch (error) 
		{
			console.log(error);	
		}
	}

	console.log(exploreResults);

	return (
		<div className="explore-container">
			<Wrapper>
				<div className="filter-and-heading">
					<div className="heading">
						<span>{`Search ${exploreResults?.length > 1 ? "results" : "result"} for queries`}</span>
					</div>
					<div className="filters">
						<div className="filter-group">
							<div className="filter-heading-wrapper">
								<label htmlFor="year">Year</label>
								<Select 
									id="year"
									options={[{value: "all", label: "All"}, ...yearOptions]} 
									defaultValue={[{value: "all", label: "All"}]}
									onChange={(e) => setYear(e.value)}
									className={"filter"}
								/>
							</div>	
							<div className="filter-heading-wrapper">
								<label htmlFor="Popularity">Popularity</label>
								<Select 
									id="Popularity"
									options={popularOptions} 
									defaultValue={[{value: "popularity.desc", label: "Descending"}]}
									onChange={(e) => setPopularity(e.value)}
									className={"filter"}
								/>
							</div>	
						</div>
						<div className="filter-group">
							<div className="filter-heading-wrapper">
								<label htmlFor="inc-genres">Inc-Genres</label>
								<Select 
									id="inc-genres"
									options={[{value:"all", label: "All"}, ...genresOptions]} 
									defaultValue={[{value:"all", label: "All"}]}
									onChange={(e) => {setIncludeGenres(e.value); console.log(e);}}
									className={"filter"}
								/>
							</div>	
							<div className="filter-heading-wrapper">
								<label htmlFor="Exc-Genres">Exc-Genres</label>
								<Select 
									id="Exc-Genres"
									options={[{value:"none", label: "None"}, ...genresOptions]}  
									defaultValue={[{value:"none", label: "None"}]}
									onChange={(e) => setExcludeGenres(e.value)}
									className={"filter"}
								/>
							</div>	
						</div>
					</div>
				</div>

				<div className="explore-items">
					{
						exploreResults?.length != 0  && <InfiniteScroll
							dataLength={exploreResults?.length || []}
							next={nextMovieResults}
							hasMore={exploreResults?.length!=totalRes}
							loader={<LoadingCircle />}
						>
							{
								exploreResults?.map((result, ind) => 
								{
									return(
										<MovieCard 
											key={ind} 
											result={result} 
											clickHandler={()=>navigate(`/${mediaType == "movies" ? "movie" : "tv"}/${result?.id}`)}
										/>
									)
								})
							}
						</InfiniteScroll>
					}

					{
						exploreResults?.length == 0 && <LoadingCircle />
					}


				</div>
			</Wrapper>
		</div>
	)
}
