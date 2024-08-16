import Header1 from "../Components/Common/Header1"
import Footer from "../Components/Common/Footer"
import aboutus from "../assets/images/aboutus-dummy.jpg"
import { Helmet } from "react-helmet-async"
const Aboutus = ({ pageURL }) => {
    return (
        <div>
            <Helmet>
                {/* HTML Meta Tags */}
                <title>About Us | International Courier Company - C3xpress</title>
                <link rel="canonical" href={pageURL} />
                <meta name="description" content="Global Delivery Experts: C3xpress! Know about our trusted international courier services & commitment to excellence. Get a FREE quote today!" />
                <link rel="canonical" content="https:www.c3xpress.com about-us" />
                <meta name="og:site_name" content="C3xpress" />
                <meta name="og:url" content="https://www.c3xpress.com/" />
                <meta name="og:type" content="website" />
                <meta name="og:image" content="https://www.c3xpress.com/logo/logo.png" />
                {/* Facebook Meta Tags */}
                <meta property="og:url" content="https://www.c3xpress.com/" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="About Us | International Courier Company - C3xpress" />
                <meta property="og:description" content="Global Delivery Experts: C3xpress! Know about our trusted international courier services & commitment to excellence. Get a FREE quote today!" />
                <meta property="og:image" content="https://www.c3xpress.com/logo/logo.png" />
                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="c3xpress.com" />
                <meta property="twitter:url" content="https://www.c3xpress.com/" />
                <meta name="twitter:title" content="About Us | International Courier Company - C3xpress" />
                <meta name="twitter:description" content="Global Delivery Experts: C3xpress! Know about our trusted international courier services & commitment to excellence. Get a FREE quote today!" />
                <meta name="twitter:image" content="https://www.c3xpress.com/logo/logo.png" />
            </Helmet>
            <Header1 />
            <div className="p-inner_head p-inner_contact">
                <div className="p-page_title">
                    <div className="container">
                        <ul className="p-breadcrumb">
                            <li>
                                <a href="https://c3xpress.com/">Home</a>
                            </li>
                            <li>
                                <span>About Us</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="p-why_choose">
                <div className="container p-page_inner">
                    <div className="row clearfix p-why_choose" style={{ alignItems: 'center' }}>
                        <div className="col-md-8 col-lg-8 pull-right">
                            <div className="p-section_title">
                                <div className="p-section_head">
                                    <h1>About Us</h1>
                                </div>
                            </div>
                            <div className="p-our_booth_text">
                                <p>Company Overview </p>
                                <p></p>
                                <p>
                                    <span style={{ fontSize: 15 }}>
                                        <span style={{ fontFamily: "myriadpro-regular,poppins" }}>
                                            C3X makes deliveries happen faster for businesses and consumers.
                                            We’ve developed a unique same-day and next-day delivery network
                                            positioned to enhance the speed and flexibility of last-mile
                                            delivery. We help consumers send international parcels more
                                            cost-effectively and get products more quickly while lowering
                                            the cost of distribution for the businesses they buy from. In
                                            addition to being an ideal delivery partner for e-retailers and
                                            e-commerce companies, we offer expertise in a wide range of
                                            solutions across a wide range of industries that support
                                            time-critical delivery ranging from business to business, banks,
                                            and financial services, to healthcare logistics. We are part of
                                            the Bin Yaber Group, a conglomerate of various industries
                                            ranging from the Hotel industry, driving schools, real estate
                                            &amp; property management, to car care and express deliveries.
                                            We share a passion for great service, leveraged by the use of
                                            our in-house systems to monitor each aspect of your parcel
                                            journey with our drivers to ensure a reliable and on-time
                                            delivery seven days a week, enabling our expanding delivery
                                            couriers to reach more people every day.
                                        </span>
                                    </span>
                                </p>
                                <p />
                            </div>
                        </div>
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 p-about_img mt-12" style={{ marginTop: '6.5rem' }}>
                            <div className="photo_frame_box">
                                <img
                                    src={aboutus}
                                    className="img-fluid"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="diff_hr" />
            </div>

            <Footer />
        </div>
    )
}

export default Aboutus