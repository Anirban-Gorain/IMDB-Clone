import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Wrapper } from "../../components/wrapper/Wrapper";
import Select from 'react-select';
import dayjs from "dayjs";

import "./style.scss";


export const Explore = () =>
{
	const {mediaType} = useParams();
	const [exploreResults, setExploreResults] = useState([]);
	const {genres} = useSelector((state) => state.home);
	// Options

	const lastYear = dayjs().format("YYYY")
	const yearOptions = [...Array(lastYear - 1900 + 1)].map((elem, index) => {return {value: 1900 + index, label: 1900 + index}});
	const [year, setYear] = useState(lastYear);
	
	const [popularity, setPopularity] = useState("popularity.desc");
	const popularOptions = [
		{value: "popularity.desc", label: "Descending"},
		{value: "popularity.ase", label: "Ascending"}
	]

	const [includeGenres, setIncludeGenres] = useState("all");
	const [excludeGenres, setExcludeGenres] = useState("none");
	const genresOptions = Object.values(genres).map((elem) => {return {value: elem.toLowerCase(), label: elem}});

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
									options={yearOptions} 
									defaultValue={[{value: lastYear, label: lastYear}]}
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
					<h1>Items</h1>
				</div>
			</Wrapper>
		</div>
	)
}
