import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter,FaLinkedin } from "react-icons/fa";
import { Wrapper } from "../wrapper/Wrapper";
import "./style.scss";

export const Footer = () => 
{
    return (
        <footer className="footer">
            <Wrapper>
                <div className="info-text">
                Hey 🙂, I am Anirban Gorain , a Frontend Developer 👨‍💻 skilled in HTML, CSS, JavaScript, React, and SCSS. Strong 💪 background in Data Structures and Algorithms and CS fundamentals. Eager to explore new technologies and create impactful solutions. Let's innovate together, 🙏.
                </div>
                <div className="social-icons">
                    <Link to="https://www.linkedin.com/in/anirban-gorain-2bb20419b/" target="_blank" className="icon-link">
                        <span className="icon">
                            <FaLinkedin />
                        </span>
                    </Link>
                    {/* <Link to="https://www.facebook.com/anirban.gorain.73/" className="icon-link">
                        <span className="icon">
                            <FaTwitter />
                        </span>
                    </Link> */}
                    <Link to="https://www.facebook.com/anirban.gorain.73/" target="_blank" className="icon-link">
                        <span className="icon">
                            <FaFacebookF />
                        </span>
                    </Link>

                </div>
            </Wrapper>
        </footer>
    );
};