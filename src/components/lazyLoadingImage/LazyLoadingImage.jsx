import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const LazyLoadingImage = ({src, alt = "", className = ""}) => 
{
  return (
    <LazyLoadImage
        alt={alt}
        effect="blur"
        src={src}
        className={className}
    />
  )
}
