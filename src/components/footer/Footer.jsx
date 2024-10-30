import React from "react";
import Facebook from '../../assets/socialMedia/facebook.png';
import Instagram from '../../assets/socialMedia/instagram.png';
import Gmail from '../../assets/socialMedia/gmail.png';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <footer>
                <div className="socialsContainer">
                    <div className="socialsLeft">
                        <a href="https://www.facebook.com/?locale=es_LA" target="_blank" className="socialMedia">
                            <img  className = 'imgSocialMedia' src={Facebook} alt="facebook" />
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" className="socialMedia">
                            <img  className = 'imgSocialMedia' src = {Instagram} alt="instagram" />
                        </a>
                        <a href="https://www.google.com/intl/es-419/gmail/about/" target="_blank" className="socialMedia">
                            <img  className = 'imgSocialMedia'  src = {Gmail} alt="gmail" />
                        </a>
                    </div>
                    <p className="creator">© Created by Agustin Raggi agustinraggi@gmail.com</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer;
