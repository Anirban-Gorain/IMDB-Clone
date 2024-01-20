import React, { useState, useEffect} from 'react';
import ReactPlayer from 'react-player/youtube';
import "./style.scss";
import { IoIosClose } from "react-icons/io";

export const VideoPlayer = ({show, setShow, videoId}) => 
{
  const [play, setPlay] = useState(false);

  useEffect(() => 
  {
    if(show === true)
    setPlay(true);
    
  }, [show])
  

  return (
   <div 
      className={`video-overlay ${show ? "show" : "hide"}`}
      onClick={() => 
      {
        setShow(false);
        setPlay(false);
      }}
    >
        <div className="container">
          <span className="close-btn"><IoIosClose /></span>
          <ReactPlayer 
              className="player"
              url={`https://www.youtube.com/watch?v=${videoId}`}
              controls={true}
              playing={play}
          />
        </div>
    </div> 
  )
}
