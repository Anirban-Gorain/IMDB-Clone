import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import { Wrapper } from "../../components/wrapper/Wrapper";
import { MovieCard } from "../../components/movieCard/MovieCard";
import { LoadingCircle } from "../../components/loadingCircle/LoadingCircle.jsx";
import InfiniteScroll from 'react-infinite-scroll-component';
import { FaRobot } from "react-icons/fa6";
import "./style.scss";

export const SearchResult = () =>
{
	const {query} = useParams();
	const [pageNumber, setPageNumber] = useState(1);
	const [totalRes, setTotalRes] = useState(1);
	const [movieResults, setMovieResults] = useState();
	const navigate = useNavigate();

	// Setting up the initial data.

	useEffect(() => 
	{
		(async() => 
		{
			try 
			{
				const response = await fetchDataFromApi(`/search/multi?&query=${query}&page=${pageNumber}`);
				setMovieResults(response.results);
				setTotalRes(response.total_results);
				setPageNumber((prev) => prev+1);

			} catch (error) 
			{
				console.log(error);	
			}
		})();
	}, [query])
	
	// For subsequent data.

	async function nextMovieResults()
	{
		try 
		{
			const response = await fetchDataFromApi(`/search/multi?&query=${query}&page=${pageNumber}`);
			setPageNumber((prev) => prev+1);
			setMovieResults((prev) => 
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

	console.log(totalRes);

	return (
		<div className="search-res-container">
			<Wrapper>
				<span className="search-res-heading">
					{
					(movieResults?.length != 0) ? (
							movieResults && <span>{`Search ${movieResults?.length > 1 ? "results" : "result"} for '${query}'`}</span>
						) : (
							movieResults &&<span>{`Sorry, No result is found`}</span>
						)
					}
				</span>
				
				<div className="search-results-items">
					{
						movieResults?.length != 0 ? (
							<InfiniteScroll
								dataLength={movieResults?.length || []}
								next={nextMovieResults}
								hasMore={movieResults?.length!=totalRes}
								loader={<LoadingCircle />}
							>
							{
								movieResults?.map((result, ind) => 
								{
									return(
										<MovieCard 
											key={ind} 
											result={result} 
											clickHandler={()=>navigate(`/${result?.media_type}/${result?.id}`)}
										/>
									)
								})
							}
							</InfiniteScroll>
						) : (
							<div className="not-found">
								<div className="not-found-icon">
									<FaRobot />
								</div>
							</div>
						)
					}
				</div>
			</Wrapper>
		</div>
	)
}
