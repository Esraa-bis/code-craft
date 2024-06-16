import "../assets/css/footer.css";

//
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <LogoAndArabicBtn />
        <Teach />
        <FooterLinks />
        <Copyrights />
      </footer>
    </>
  );
}
function LogoAndArabicBtn() {
  return (
    <>
      <section className="LogoAndArabicBtn">
        <img src={Logo} alt="code craft logo" className="logo w-6 h-6" />
      </section>
    </>
  );
}
function Teach() {
  return (
    <div className="teach-section">
      <div className="teach-content">
        <h3>Upload your course On Code Craft</h3>
        <p>Create an online video course, reach students, and earn money</p>
      </div>
      <div className="teach-button">
        <Link to="/TeachOnCodeCraft" className="upload-course-btn">
          Teach On Code Craft
        </Link>
      </div>
    </div>
  );
}

function FooterLinks() {
  return (
    <section className="FooterLinks">
      <div className="footer-column">
        <Link className="FooterLink" to="/AboutUs">
          About Us
        </Link>
        <Link className="FooterLink" to="/ContactUs">
          Contact Us
        </Link>

        {/* <Link className="FooterLink">Help And Support</Link> */}
      </div>
      <div className="footer-column">
        <Link className="FooterLink" to="/Discussion">
          Discussions
        </Link>
        <Link className="FooterLink" to="/policy">
          Policy
        </Link>
      </div>
      <div></div>
    </section>
  );
}

function Copyrights() {
  const [year] = useState(new Date().getFullYear());
  return (
    <div className="copyright">
      <p>&copy; {year} Code Craft. All rights reserved.</p>
    </div>
  );
}
