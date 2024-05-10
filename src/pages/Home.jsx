import Footer from "../Components/Common/Footer"
import Header from "../Components/Common/Header"
import Banner from "./Banner"
import Groupofcompanies from "./Groupofcompanies"
import Map from "./Map"
import Ourclients from "./Ourclients"
import Process from "./Process"
import Services from "./Services"
import Solutions from "./Solutions"
import Visionandmission from "./Visionandmission"
import { Helmet } from "react-helmet-async"
const Home = (props) => {

  return (
    <div>
      <Helmet>
        <title>Get the Best Courier Service in Dubai - C3xpress</title>
        <meta name='description' content='Get the Best Courier Service in Dubai: Fast, Reliable & Secure Delivery with C3xpress for all your needs. Get a FREE quote & experience the difference! ' />
        <>
          {/* HTML Meta Tags */}
          <title>Get the Best Courier Service in Dubai - C3xpress</title>
          <meta
            name="description"
            content="Get the Best Courier Service in Dubai: Fast, Reliable & Secure Delivery with C3xpress for all your needs. Get a FREE quote & experience the difference! "
          />
          <link rel="canonical" href="https://c3xpress.com/" />
          <meta name="og:site_name" content="C3xpress" />
          <meta name="og:url" content="https://www.c3xpress.com/" />
          <meta name="og:type" content="website" />
          <meta name="og:image" content="https://www.c3xpress.com/logo/logo.png" />
          {/* Facebook Meta Tags */}
          <meta property="og:url" content="https://www.c3xpress.com/" />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Get the Best Courier Service in Dubai - C3xpress"
          />
          <meta
            property="og:description"
            content="Get the Best Courier Service in Dubai: Fast, Reliable & Secure Delivery with C3xpress for all your needs. Get a FREE quote & experience the difference!"
          />
          <meta property="og:image" content="https://www.c3xpress.com/logo/logo.png" />
          {/* Twitter Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="c3xpress.com" />
          <meta property="twitter:url" content="https://www.c3xpress.com/" />
          <meta
            name="twitter:title"
            content="Get the Best Courier Service in Dubai - C3xpress"
          />
          <meta
            name="twitter:description"
            content="Get the Best Courier Service in Dubai: Fast, Reliable & Secure Delivery with C3xpress for all your needs. Get a FREE quote & experience the difference!"
          />
          <meta name="twitter:image" content="https://www.c3xpress.com/logo/logo.png" />
        </>
      </Helmet>
      <Header />

      {<Banner userAuthData={props.userAuthData && props.userAuthData} />}
      <Process />
      <Services />
      <Visionandmission />
      <Groupofcompanies />
      <Solutions />
      <Ourclients />
      <Map />
      <Footer />
      <a className="webwhat" href="https://api.whatsapp.com/send?phone=971600504030">
        <img
          title="ChatX"
          src="https://handsintechnology.in/1assets/images/WhatsApp.png"
          alt="Whats app"
          style={{
            height: "7%",
            position: "fixed",
            bottom: 15,
            left: 10,
            zIndex: 9999999
          }}
        />{" "}
      </a>
    </div>
  )
}

export default Home
