import React from 'react'
import { Wrapper } from "../../../components/wrapper/Wrapper";
import { PlayButton } from "../../../components/playButton/PlayButton";
import "./style.scss"
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const OfficialVideos = ({videoResults, setVideoId, setShow, isLoadingVideoResult}) => 
{
    // console.log(videoResults);
    return (
        !isLoadingVideoResult ? (
            <div className="official-videos-container">
            <Wrapper>
                <span className="official-video-heading">Official videos</span>
                <div className="videos">
                    {
                        videoResults.map((result) => 
                        {
                            return (
                                <div className="video-content">
                                        <div className="video-thumbnail-container" key={result.key}>
                                            <div className="thumbnail"
                                                onClick=
                                                    {
                                                        ()=>
                                                        {
                                                            setVideoId(result?.key);
                                                            setShow(true);
                                                        }
                                                    }
                                            >
                                                <LazyLoadImage
                                                    src={`https://img.youtube.com/vi/${result?.key}/mqdefault.jpg`}
                                                    effect="blur"
                                                    className="img"
                                                />
                                                <PlayButton />
                                            </div>
                                        </div>
                                        <span className="title">{result.name}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </Wrapper>
        </div>
        ) : (
            <div>Loading ......</div>
        )
    )
}
