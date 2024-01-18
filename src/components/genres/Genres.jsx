import { useSelector } from "react-redux";
import React from 'react'
import "./style.scss";

export const Genres = ({ genresIds }) => 
{
    const {genres} = useSelector((state) => state.home);

    return (
      <div className="genres-container">
        {
            genresIds.map((val, ind) => 
            {
                return (
                    <div 
                        key={ind}
                        className="genres"
                    >{genres[val]}</div>
                )
            })
        }
      </div>
    );
  };