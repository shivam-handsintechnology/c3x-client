import assest9 from "../assets/images/Asset 9.png"
import assest10 from "../assets/images/Asset 10.png"
import assest11 from "../assets/images/Asset 11.png"
const Process = () => {
    return (
        <div>
            <div className="container-fluid container_gray_bg tracking-result">
                <div className="container">
                    <section id="trackingResultSection">
                        <div className="container">
                            <div className="row" id="trackingResultDiv"></div>
                        </div>
                    </section>
                    <section id="service">
                        <div className="container pt-1 pb-3">
                            <div className="col-12">
                                <div className="sec-title text-center">
                                    <h2 className="wow animated bounceInLeft text-center">Process</h2>
                                    <h1>WORKING PROCESS FOR C3X</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 col-sm-6 col-xs-12 text-center wow animated zoomIn">
                                    <div className="service-item service_raj">
                                        <div className="service-icon ">
                                            <img src={assest9} />
                                        </div>
                                        <h3>make online order</h3>
                                        <p>
                                            From finance, retail, and travel, to social media,
                                            cybersecurity, adtech, and more.{" "}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="col-md-4 col-sm-6 col-xs-12 text-center wow animated zoomIn"
                                    data-wow-delay="0.3s"
                                >
                                    <div className="service-item service_raj">
                                        <div className="service-icon">
                                            <img src={assest10} />
                                        </div>
                                        <h3>bring your product</h3>
                                        <p>
                                            From finance, retail, and travel, to social media,
                                            cybersecurity, adtech, and more.{" "}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="col-md-4 col-sm-6 col-xs-12 text-center wow animated zoomIn"
                                    data-wow-delay="0.9s"
                                >
                                    <div className="service-item service_raj">
                                        <div className="service-icon">
                                            <img src={assest11} />
                                        </div>
                                        <h3>get transportaition</h3>
                                        <p>
                                            From finance, retail, and travel, to social media,
                                            cybersecurity, adtech, and more.{" "}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* end Service section */}
                </div>
            </div>
        </div>
    )
}

export default Process