import React from "react";
import "./styles/footer.css";
import mail from "../assets/icons/mail.png";
import facebook from "../assets/icons/facebook.svg";
import linkedin from "../assets/icons/linkedin.svg";
import twitter from "../assets/icons/square-x-twitter.svg";
import facebookIcon from "../assets/icons/Facebook-Icon.svg";
import linkedinIcon from "../assets/icons/Linkedin-Icon.svg";
import twitterIcon from "../assets/icons/Twitter-Icon.svg";

const Footer = () => {
  return (
    <footer className="footer">
      {/* <h3 className="footer__title">Empowering. Streamlined. Inclusive.</h3>
      <p className="footer__description">
        We're here to make your job search effortless, and hire the right talent
        to fuel their growth so they can focused on building future .
      </p>
      <div className="footer__subscribe">
        <div className="subscribe__title">Subscribe Newsletters</div>
        <div className="subscribe__input">
          <input type="text" placeholder="Email" />
          <img src={mail} alt="send" />
        </div>
      </div> */}
      <div className="footer__links">
        <h2>LOGO</h2>
        <p>© 2023. All Rights Reserved. </p>
        <ul className="footer__links-social">
          <li>
            <img src={facebookIcon} alt="" />
          </li>
          <li>
            <img src={linkedinIcon} alt="" />
          </li>
          <li>
            <img src={twitterIcon} alt="" />
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
