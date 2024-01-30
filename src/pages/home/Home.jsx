import React from 'react'
import { Trending } from "./trending/Trending";
// import { HeroBanner } from "./heroBanner/HeroBanner";
import { Popular } from "./popular/Popular";
import { TopRated } from "./topRated/TopRated";

export const Home = () =>
{
  return (
    <>
      {/* <HeroBanner /> */}
      <Trending />
      <Popular />
      <TopRated />
    </>
  )
}