import React from 'react'
import { Wrapper } from "../../../components/wrapper/Wrapper";
import { PlayButton } from "../../../components/playButton/PlayButton";
import "./style.scss"
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "../../../index.scss";

export const OfficialVideos = ({videoResults, setVideoId, setShow, isLoadingVideoResult}) => 
{
    console.log(isLoadingVideoResult);
    const OfficialVideoSkeleton = ()=>
    {
        return (
            <div className="video-content">
                <div className="video-thumbnail-container">
                    <div className="thumbnail skeleton"></div>
                </div>
                <div className="title skeleton"></div>
            </div>
        )
    }

    return (
        (videoResults?.length > 0) && <div className="official-videos-container">
            <Wrapper>
                <span className="official-video-heading">Official videos</span>
                <div className="videos">
                    {
                        !isLoadingVideoResult ? (
                            videoResults.map((result) => 
                            {
                                return (
                                    <div className="video-content" key={result.key}>
                                            <div className="video-thumbnail-container">
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
                        ) : (
                            <>
                                {OfficialVideoSkeleton()}
                                {OfficialVideoSkeleton()}
                                {OfficialVideoSkeleton()}
                                {OfficialVideoSkeleton()}
                                {OfficialVideoSkeleton()}
                                {OfficialVideoSkeleton()}
                                {OfficialVideoSkeleton()}
                                {OfficialVideoSkeleton()}
                                {OfficialVideoSkeleton()}
                                {OfficialVideoSkeleton()}
                            </>
                        )
                    }
                </div>
            </Wrapper>
        </div>
        )
}
