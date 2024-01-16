import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter,FaLinkedin } from "react-icons/fa";
import { Wrapper } from "../wrapper/Wrapper";
import "./style.scss";

export const Footer = () => 
{
    return (
        <footer className="footer">
            <Wrapper>
                <ul className="menu-items">
                    <li className="menuItem">Terms Of Use</li>
                    <li className="menuItem">Privacy-Policy</li>
                    <li className="menuItem">About</li>
                    <li className="menuItem">Blog</li>
                    <li className="menuItem">FAQ</li>
                </ul>
                <div className="info-text">
                All content included on this site in or made available through any TMDb Service, such as text, graphics, logos, button icons, images, audio clips, video clips, digital downloads, data compilations, and software, is the property of IMDb or its content suppliers and protected by United States and international copyright laws.
                </div>
                <div className="social-icons">
                    <span className="icon">
                        <FaFacebookF />
                    </span>
                    <span className="icon">
                        <FaInstagram />
                    </span>
                    <span className="icon">
                        <FaTwitter />
                    </span>
                    <span className="icon">
                        <FaLinkedin />
                    </span>
                </div>
            </Wrapper>
        </footer>
    );
};