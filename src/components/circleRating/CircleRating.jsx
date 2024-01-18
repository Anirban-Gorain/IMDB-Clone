import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "./style.scss";
import 'react-circular-progressbar/dist/styles.css';

export const CircleRating = ({rating}) => 
{
    rating = rating.toFixed(1);
    return (
            <div className="circle-rating">
                <CircularProgressbar
                    value={rating}
                    maxValue={10}
                    text={rating}
                    background={"white"}
                    backgroundPadding={2}
                    styles={buildStyles({
                        pathColor:
                            rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                    })}
                />
            </div>
    )
}
