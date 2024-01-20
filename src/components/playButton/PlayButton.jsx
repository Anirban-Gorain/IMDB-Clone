import "./style.scss";

import React from 'react'

export const PlayButton = ({eventHandler}) => 
{
  return (
    <div className="video-play-button"
      onClick={eventHandler}
    >
        <span></span>
    </div>
  )
}
