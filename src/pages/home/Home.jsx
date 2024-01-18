import React from 'react'
import { HeroBanner } from "./heroBanner/HeroBanner";
import { Trending } from "./trending/Trending";

export const Home = () =>
{
  return (
    <>
      <HeroBanner />
      <Trending />
    </>
  )
}