import React from 'react'
import { HeroBanner } from "./heroBanner/HeroBanner";
import { Trending } from "./trending/Trending";
import { Popular } from "./popular/Popular";

export const Home = () =>
{
  return (
    <>
      <HeroBanner />
      <Trending />
      <Popular />
    </>
  )
}