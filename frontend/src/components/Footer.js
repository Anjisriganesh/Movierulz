import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPinterestP, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bms-footer">
      <div className="bms-footer-top">

        <div className="footer-column">
          <h4>COUNTRIES</h4>
          <p>Indonesia | Singapore | Sri Lanka | West Indies</p>
        </div>

        <div className="footer-column">
          <h4>HELP</h4>
          <p>
            About Us | Contact Us | Current Openings | Press Release | Press Coverage |
            FAQs | Terms and Conditions | Privacy Policy
          </p>
        </div>

        <div className="footer-column">
          <h4>MOVIERULZ EXCLUSIVES</h4>
          <p>
            Lollapalooza India | BookASmile | Corporate Vouchers | Gift Cards |
            List My Show | Offers | Stream | Trailers
          </p>
        </div>

      </div>

      <div className="bms-footer-center">
        <span className="bms-logo">MovieRulz</span>
      </div>

      <div className="bms-footer-socials">
        <FaFacebookF />
        <FaTwitter />
        <FaInstagram />
        <FaYoutube />
        <FaPinterestP />
        <FaLinkedinIn />
      </div>

      <div className="bms-footer-bottom">
        <p id='g'>© 2026 MovieRulz. All rights reserved.</p>
        <p>
          The content and images used on this site are copyright protected and copyrights vest with the respective owners.
          The usage of the content and images on this website is intended to promote the works and no endorsement of the
          artist shall be implied. Unauthorized use is prohibited and punishable by law.
        </p>
      </div>
    </footer>
  );
}
