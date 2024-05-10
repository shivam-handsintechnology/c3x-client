import logo from "../../../src/assets/settings/footerlogo.png"
import instagram from "../../../src/assets/images/insta.png"
import facebook from "../../../src/assets/images/facebook.png"
import twitter from "../../../src/assets/images/twitter.png"
import bankimage from "../../../src/assets/images/bankimgaesbg.png"
import linkedin from "../../../src/assets/images/link.png"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Footer = () => {
  const [cookieAccepted, setCookieAccepted] = useState(
    localStorage.getItem("cookieAccepted") === "true"
  );
  const hideCookieElement = () => {
    setCookieAccepted(true);
    localStorage.setItem("cookieAccepted", "true");
    document.getElementById("cookie_box").style.display = "none";
  };
  const rejectCookieElement = () => {
    setCookieAccepted(true);
    localStorage.setItem("cookieAccepted", "false");
    document.getElementById("cookie_box").style.display = "none";
  };
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      {!cookieAccepted && (<div className="cookie_box" id="cookie_box">
        <img src="https://webstockreview.net/images/clipart-cookies-vector-9.png" />
        <h3>Cookie Policy</h3>
        <p>
          We use cookies on this website to make sure that you get the best possible experience on our site. <a href="#">Learn more</a>
        </p>
        <div className="d-flex justify-content-between">
          <button onClick={hideCookieElement} id="activeBtn">Accept</button>
          <button onClick={rejectCookieElement} id="activeBtn">Close</button>
        </div>
      </div>)}


      <footer className="footer_box_outer">
        <div className="footer_box_cover">
          <div className="footer-main">
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-lg-4 col-md-6 footer-widget footer-about footer_border">
                  <img
                    loading="lazy"
                    width="100px"
                    className="footer-logo"
                    src={logo}
                    alt="Constra"
                  />
                  <p>
                    Feel free to contact us with any questions regarding C3X makes
                    deliveries happen faster for businesses and consumers. We`ve
                    developed a unique same-day and next-day delivery network
                    positioned to enhance the speed and flexibility of last-mile
                    delivery. We help consumers send international parcels more
                    cost-effectively.
                  </p>
                  <div className="footer-social text-center mb-3">
                    <ul>
                      <li>
                        <a href="#" aria-label="Twitter">
                          <img src={twitter} />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.facebook.com/c3xpress"
                          aria-label="Facebook"
                        >
                          <img src={facebook} />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.instagram.com/c3x_couriers/"
                          aria-label="Github"
                        >
                          <img src={instagram} />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.linkedin.com/company/c3x-couriers"
                          aria-label="Instagram"
                        >
                          <img src={linkedin} />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-7 col-md-6">
                  <div className="row">
                    <div className="col-lg-5 col-md-6 mt-5 footer-widget mt-f-30">
                      <h3 className="widget-title">Services</h3>
                      <ul className="list-arrow">
                        <li>
                          <Link to="/services/Export_airland_sea">
                            Export Air, Land &amp; Sea
                          </Link>
                        </li>
                        <li>
                          <Link to="/services/Ecommerce_fulfilment">
                            E-Commerce Fulfilment
                          </Link>
                        </li>
                        <li>
                          <Link to="/services/Ecommerce_delivery">
                            E-commerce Delivery
                          </Link>
                        </li>
                        <li>
                          <Link to="/services/import_and_clearance_express">
                            Import and Clearance
                          </Link>
                        </li>
                        <li>
                          <Link to="/services/international_couriers">
                            International Couriers
                          </Link>
                        </li>
                        <li>
                          <Link to="/services/domestic_couriers">
                            Domestic Couriers
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-7 col-md-6 footer-widget mt-5 mt-f-30">
                      <h3 className="widget-title  ">Working Hours</h3>
                      <div className="working-hours">
                        We work 6 days a week, every day excluding major holidays.
                        Contact us if you have an emergency, with our Hotline and
                        Contact form.
                        <br />
                        <br /> Monday - Saturday:{" "}
                        <span className="text-right">08:00 am - 06:00 pm </span>
                        <img className="mt-4" style={{ width: '220px', background: 'white', padding: '2px 5px' }} src={bankimage} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-top" />
            <div className="container">
              <div className="copyright ">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <div className="copyright-info">
                      <span>Copyright © 2023 C3X. All Rights Reserved.</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="footer-menu text-center text-md-right">
                      <ul className="list-unstyled">
                        <li>
                          <Link to="/Termsconditions">Terms &amp; Conditions</Link>
                        </li>
                        <li>
                          <Link to="/Privacypolicy">Privacy Policy</Link>
                        </li>
                        <li>
                          <Link to="/Contact">Contact</Link>
                        </li>
                        <li>
                          <Link to="/Career">Careers</Link>
                        </li>
                        <li>
                          <Link to="/Helpdesk">Help Desk</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Footer
