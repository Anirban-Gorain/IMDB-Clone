import React, {useState, useEffect} from 'react'
import "./style.scss";
import { Wrapper } from "../../components/wrapper/Wrapper";
import logo from "../../assets/movix-logo.svg"
import {useNavigate} from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

export const Header = () =>
{
  const [headerShowEffectClass, setHeaderShowEffectClass] = useState("top");
  const [lastScrollYPosition, setLastScrollYPosition] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [input, setInput] = useState("")
  const navigate = useNavigate();


  // Scrolling

  const handleScrollEffect = (e) =>
  {
    let scrollYPos = window.scrollY;

    if(lastScrollYPosition>200)
    {
      if(scrollYPos>lastScrollYPosition)
        setHeaderShowEffectClass("hide");
      else
        setHeaderShowEffectClass("show");

    }
    else
    {
      setHeaderShowEffectClass("top");
    }

    setLastScrollYPosition(scrollYPos);
  }

  useEffect(() => 
  {
    window.addEventListener("scroll", handleScrollEffect);
  
    return () => 
    {
      window.removeEventListener("scroll", handleScrollEffect)
    }
  }, [lastScrollYPosition])

  const searchQueryHandler = (e) =>
  {
      if((e.type==="keyup" && input.length>0 && e.key==="Enter") || (e.type==="click" && input.length>0))
      {
        navigate(`/search/${input}`);
        setShowSearchPanel(false);
      }
  }

  return (
    <header className={`header ${(showMobileMenu)?"mobile-view" : ""} ${headerShowEffectClass}`}>
      <Wrapper>
        <div className="logo" onClick={() => navigate("/")}>
            <img src={logo} alt="" />
        </div>

        <ul className="menu-items">
          <li className="menu-item"
            onClick={()=>navigate("/explore/movies")}
          >Movies</li>
          <li className="menu-item"
            onClick={()=>navigate("/explore/tv")}
          >TV-shows</li>
          <li className="menu-item">
            <HiMagnifyingGlass 
              onClick={()=>
              {
                setShowSearchPanel(true);
              }}
            />
          </li>
        </ul>

        <div className="mobile-menu-items">
          <HiMagnifyingGlass 
            onClick={()=>
              {
                setShowSearchPanel(true);
                setShowMobileMenu(false);
              }}
          />
          {
            showMobileMenu ? (
              /* Show the menu */
              <RxCross2 
                onClick={()=>
                {
                  setShowMobileMenu((prev)=>!prev);
                }}
              />

            ) : ( 
              /* Show the hamburger icon */
              <GiHamburgerMenu 
                onClick={()=>
                {
                  setShowSearchPanel(false);
                  setShowMobileMenu((prev)=>!prev);
                }}
              />
            )
        }
        </div>

        {showSearchPanel && (
                <div className="search-bar">
                    <Wrapper>
                        <div className="search-input">
                            <input
                                type="text"
                                placeholder="Search for a movie or tv show...."
                                onKeyUp={searchQueryHandler}
                                value={input}
                                onChange={(e)=>
                                  {
                                      setInput(e.target.value);
                                  }}
                            />
                            <RxCross2
                                onClick={() => setShowSearchPanel(false)}
                            />
                        </div>
                    </Wrapper>
                </div>
        )}
      </Wrapper>
    </header>
  )
}
