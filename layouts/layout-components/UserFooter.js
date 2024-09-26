"use client"
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaLocationPin, FaPhone, FaXTwitter, FaYoutube } from "react-icons/fa6";
import "./UserFooter.css";
const UserFooter = () => {
  return (
    <div className="user-footer global-background-gradient px-2" style={{ backgroundColor: 'rgb(1, 7, 63)' }}>
      <div className="midbox-inner">
        <div className="footer-section row">
          <div className="footer-about col-md-4 col-sm-4 col-12">
            <img src="/assets/images/MainLogo.png" alt="Brand Logo" />
            <div className="wiki">
              <ul>
                <li>
                  <a
                    href="https://www.facebook.com/blalclinicallab/?utm_source=WiseStamp&amp;amp%3Butm_medium=email&amp;amp%3Butm_term&amp;amp%3Butm_content&amp;amp%3Butm_campaign=signature"
                    target="_black"
                  >
                    <span > <FaFacebookF /></span>

                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/Blalclinicallab" target="_black">
                    <FaXTwitter />

                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/channel/UCBhmPyrCSDREuEDTGBX_Pbg?utm_source=WiseStamp&amp;utm_medium=email&amp;utm_term=&amp;utm_content=&amp;utm_campaign=signature"
                    target="_black"
                  >
                    <FaYoutube />

                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/Blalclinicallab"
                    target="_black"
                  >
                    <FaInstagram />


                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/blalclinicallab/mycompany/?viewAsMember=true"
                    target="_black"
                  >
                    <FaLinkedinIn />

                  </a>
                </li>
              </ul>
            </div>

            {/* <div className="app-box">
              <a
                href="https://play.google.com/store/apps/details?id=com.blal"
                target="_black"
              >
                <img
                  src="/assets/icons/play-store.webp"
                  alt="play-store-icon"
                />
              </a>
              <a
                href="https://apps.apple.com/in/app/dr-b-lal-labs/id1624695538"
                target="_black"
              >
                <img
                  src="/assets/icons/app-store.webp"
                  alt="apple-store-icon"
                />
              </a>
            </div> */}
            {/* <div className="footer-awards-recognition">
              <h3>Awards &amp; Recognition</h3>
              <ul>
                <li>
                  <img src="/assets/icons/awards/1.webp" alt="award-icon1" />
                </li>
                <li>
                  <img src="/assets/icons/awards/2.webp" alt="award-icon2" />
                </li>
                <li>
                  <img src="/assets/icons/awards/3.webp" alt="award-icon3" />
                </li>
                <li>
                  <img src="/assets/icons/awards/4.webp" alt="award-icon4" />
                </li>
                <li>
                  <img src="/assets/icons/awards/5.webp" alt="award-icon5" />
                </li>
              </ul>
            </div> */}
          </div>

          <div className="footer-links col-md-7 col-sm-7 col-12 ">
            <div className="row">
              <div className="footer-navbox col-md-3 col-sm-3">
                <a href="/about-us" style={{ textDecoration: 'none' }}>
                  {" "}
                  <h4 className="footer-nav-des" >About Us</h4>
                </a>
                {/* <h4 className="but  footer-nav-mob">
                  About Us
                  <i className="fas fa-chevron-down"></i>
                </h4> */}
                <ul className="footerbox">
                  <li>
                    <a target="_self" href="/about-us">
                      Company Profile
                    </a>
                  </li>
                  <li>
                    <a href="/awards-recognitions">Awards &amp; Accreditations</a>
                  </li>
                  <li>
                    <a href="/about-us/milestones">Milestones</a>
                  </li>
                  <li>
                    <a href="/career">Career</a>
                  </li>
                  <li>
                    <a href="/blog">Blogs</a>
                  </li>
                </ul>
              </div>
              <div className="footer-navbox col-md-3 col-sm-3">
                <h4 className="footer-nav-des">Useful Links</h4>
                {/* <h4 className="but  footer-nav-mob">
                  Useful Links <i className="fas fa-chevron-down"></i>
                </h4> */}
                <ul className="footerbox">
                  <li>
                    <a href="/health-packages">Health Packages</a>
                  </li>
                  <li>
                    <a href="/home-collection">Tests</a>
                  </li>
                  <li>
                    <a href="/near-by">Find a Center </a>
                  </li>
                  <li>
                    <a href="/privacypolicy">Privacy &amp; Policy</a>
                  </li>
                  <li>
                    <a href="/terms_and_conditions">Terms &amp; Conditions </a>
                  </li>
                </ul>
              </div>
              {/* <div className="footer-navbox col-md-3 col-sm-3">
                <h4 className="footer-nav-des">Doctors</h4>
                <h4 className="but  footer-nav-mob">
                  Doctors <i className="fas fa-chevron-down"></i>
                </h4>
                <ul className="footerbox">
                  <li>
                    <a target="_self" href="/healthbulletin">
                      Health Bulletin
                    </a>
                  </li>
                </ul>
                <h4 className="footer-nav-des">Patients</h4>
                <h4 className="but  footer-nav-mob">
                  Patients <i className="fas fa-chevron-down"></i>
                </h4>
                <ul className="footerbox">
                  <li>
                    <a style={{ color: "#fff", cursor: "pointer" }}>My Report</a>
                  </li>
                </ul>
              </div> */}
              <div className="footer-navbox col-md-3 col-sm-3">
                <a href="/contact-us" style={{ textDecoration: 'none' }}>
                  <h4 className="footer-nav-des">Contact Us</h4>
                </a>
                {/* <h4 className="but  footer-nav-mob">
                  Contact Us <i className="fas fa-chevron-down"></i>
                </h4> */}
                <ul className="footerbox">
                  <li>
                    <a style={{ color: "#fff", cursor: "pointer", display: 'flex', gap: '5px' }}>

                      <FaLocationPin style={{ color: 'rgb(204 241 122)', fontSize: '27px' }} /> D6-Opposite, Chamatkareshwar Mahadev, Banipark, Jaipur 302016</a>
                  </li>

                  <li>
                    <a style={{ color: "#fff", cursor: "pointer", display: 'flex', gap: '5px' }}><FaPhone style={{ color: 'rgb(204 241 122)', fontSize: '17px' }} />+91 9739923174</a>
                  </li>


                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="user-copyright">
          <div className="wh">
            © Copyright 2024{" "}
            <a href="/" style={{ color: "inherit" }}>
              Endolabs
            </a>
            , All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserFooter;
