import React from 'react';
import "./style.scss";

export const Wrapper = ({ children }) => 
{
  return (
    <div className={"wrapper"}>
        {children}
    </div>
  )
}
