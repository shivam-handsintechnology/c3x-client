import React from 'react'
import { Row, Col } from "react-bootstrap";
import Vision from "../../../assets/images/Asset 13.png"
const Brief = ({ AwbDetails }) => {
    return (
        <div className='blocks-tab'>

            <p>
                <Row>
                    <Col lg={6}>
                        <div className='box-transact p-3 source-module'>
                            <Row>
                                <Col lg={3}>
                                    <div className='image-circle'>
                                        <img src={Vision} alt="Vision" className='img-fluid' />
                                    </div>

                                </Col>
                                <Col lg={9}>
                                    <h6 className='text-dark'>Sender</h6>
                                    <h2>{AwbDetails.Origin}</h2>
                                    <h6 className='text-dark'>{AwbDetails?.Shipper}</h6>
                                    <label>05000000000</label>
                                    <br />
                                    <div className='d-inline-flex mt-3'>
                                        <div className='tracking-icons'><img src="/src/assets/settings/footerlogo.png" /></div>
                                        <label className='locate-label mx-1'> {AwbDetails?.OriginName} </label>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className='box-transact p-3 source-module  '>
                            <Row>
                                <Col lg={3}>
                                    <div className='image-circle'>
                                        <img src={Vision} alt="Vision" className='img-fluid' />
                                    </div>
                                </Col>
                                <Col lg={9}>
                                    <h6 className='text-dark'>Recipient</h6>
                                    <h2>{AwbDetails.Destination}</h2>
                                    <h6 className='text-dark'>{AwbDetails?.Consignee}</h6>
                                    <label>05000000000</label>
                                    <br />
                                    <div className='d-inline-flex mt-3'>
                                        <div className='tracking-icons'><img src="/src/assets/settings/footerlogo.png" /></div>
                                        <label className='locate-label mx-1'> {AwbDetails?.DestinationName} </label>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className='box-transact p-3'>
                            <h6 className='text-dark text-center'> ITEM DETAILS</h6>
                            <Row>
                                <Col lg={6}>
                                    <div className='d-inline-flex mt-3'>
                                        <div className='tracking-icons'><img src="/src/assets/settings/footerlogo.png"/></div>
                                        <div className='d-grid'>
                                            <label className='locate-label mx-1'> Weight  </label>
                                            <label className='locate-label mx-1'> {AwbDetails?.Weight} kg </label>
                                        </div>
                                    </div>

                                </Col>
                                <Col lg={6}>
                                    <div className='d-inline-flex mt-3'>
                                        <div className='tracking-icons'><img src="/src/assets/settings/footerlogo.png" /></div>
                                        <div className='d-grid'>
                                            <label className='locate-label mx-1'> Service Type

                                            </label>
                                            <label className='locate-label mx-1'> {
                                                AwbDetails?.ServiceType}
                                            </label>
                                        </div>
                                    </div>
                                </Col>

                                <Col lg={6}>
                                    <div className='d-inline-flex mt-3'>
                                        <div className='tracking-icons'><img src="/src/assets/settings/footerlogo.png" /></div>
                                        <div className='d-grid'>
                                            <label className='locate-label mx-1'> Item Value </label>
                                            <label className='locate-label mx-1'> {AwbDetails?.Content} </label>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={8}>


                                    <div className='d-grid  mt-3'>
                                        <label className='locate-label mx-1'> Item Description / Special Instructions : </label>
                                        <label className='locate-label mx-1'> {AwbDetails?.Content} </label>
                                    </div>

                                </Col>
                                <Col >

                                    <div className='d-grid  mt-3'>
                                        <label className='locate-label mx-1'> No Of Pieces </label>
                                        <label className='locate-label mx-1'> {AwbDetails?.PCS} </label>
                                    </div>

                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className='box-transact p-3'>

                            <h6 className='text-dark text-center'>   PAYMENT INFO</h6>
                            <Row>
                                <Col lg={6}>
                                    <div className='d-inline-flex mt-3'>
                                        <div className='tracking-icons'><img src="/src/assets/settings/footerlogo.png" /></div>
                                        <div className='d-grid'>
                                            <label className='locate-label mx-1'>Payment Method
                                            </label>
                                            <label className='locate-label mx-1'> N/A </label>
                                        </div>
                                    </div>

                                </Col>
                                <Col lg={6}>
                                    <div className='d-inline-flex mt-3'>
                                        <div className='tracking-icons'><img src="/src/assets/settings/footerlogo.png" /></div>
                                        <div className='d-grid'>
                                            <label className='locate-label mx-1'> Service Charge Paid By </label>
                                            <label className='locate-label mx-1'>Shipper </label>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6}>

                                    <div className='d-grid mt-3'>
                                        <label className='locate-label mx-1'> Shipment Charges </label>
                                    </div>
                                </Col>
                                <Col lg={3}>
                                    <div className='d-grid mt-3'>
                                        <label className='locate-label mx-1'> {AwbDetails?.Rate} </label>
                                    </div>
                                </Col>

                                <Col lg={6}>
                                    <div className='d-grid mt-3'>
                                        <label className='locate-label mx-1'> CASH ON DELIVERY </label>

                                    </div>
                                </Col>
                                <Col lg={3}>
                                    <div className='d-grid mt-3'>
                                        <label className='locate-label mx-1'>{AwbDetails?.CODAmount} </label>
                                    </div>
                                </Col>

                            </Row>
                        </div>
                    </Col>
                </Row>
            </p>
        </div>
    )
}

export default Brief