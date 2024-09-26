import React, { useState } from "react";
import { Modal, Button, Row, Col, Tabs, Tab } from "react-bootstrap";
import Brief from "../AirWayBillHistory/Brief"
import History from "../AirWayBillHistory/History"
const TransactionHistory = ({ awbNo, onClose }) => {

    const [key, setKey] = useState("home");
    const [activeTab, setActiveTab] = useState("tab1");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    return (
        <Modal className="transaction" show={true} onHide={onClose} centered size="lg">
            <Modal.Header className="d-block">

                <Row style={{ width: "100%" }}>
                    <Col lg={3} md={6}>
                        <h6 className="text-dark">tracking:{awbNo}</h6>
                        <h6 className="text-dark">Shipper Ref : 2150151072</h6>

                    </Col>
                    <Col lg={3} md={6}>
                        <div className="d-inline-flex">
                            <div className="tracking-icons">
                                <i className="fa fa-plus"></i>
                            </div>
                            <span className="mx-2">
                                <h6 className="text-dark"> In scan</h6>
                                <h6 className="text-dark">11th Sep 2024 | 08:45 am</h6>
                            </span>
                        </div>

                    </Col>
                    <Col lg={3} md={6}>
                        <div className="d-inline-flex">
                            <div className="tracking-icons">
                                <i className="fa fa-arrow-up"></i>
                            </div>

                            <span className="mx-2">
                                <h6 className="text-dark">   Airway Created on</h6>
                                <h6 className="text-dark">11th Sep 2024 | 08:45 am</h6>
                            </span>
                        </div>

                    </Col>
                </Row>
                <br />

                <div className="tab-buttons transaction d-inline-flex">
                    <div
                        className={activeTab === "tab1" ? "active" : ""}
                        onClick={() => handleTabClick("tab1")}
                    >
                        <h6 className="text-dark "> Brief</h6>
                    </div>
                    <div
                        className={activeTab === "tab2" ? "active" : ""}
                        onClick={() => handleTabClick("tab2")}
                    >
                        <h6 className="text-dark mx-4">  History </h6>

                    </div>
                    <div
                        className={activeTab === "tab3" ? "active" : ""}
                        onClick={() => handleTabClick("tab3")}
                    >
                        <h6 className="text-dark mx-4"> POD</h6>
                    </div>
                    <div
                        className={activeTab === "tab4" ? "active" : ""}
                        onClick={() => handleTabClick("tab4")}
                    >
                        <h6 className="text-dark mx-4"> POR</h6>
                    </div>
                </div>

            </Modal.Header>
            <Modal.Body>
                <div className="tabs-container">


                    {/* Tab content */}
                    <div className="tab-content">
                        {activeTab === "tab1" && (
                            <div>
                               <Brief/>
                            </div>
                        )}
                        {activeTab === "tab2" && (
                            <div>
                                <History/>
                            </div>
                        )}
                        {activeTab === "tab3" && (
                            <div className="blocks-tab">
                                <p>Proof of Delivery</p>
                            </div>
                        )}
                        {activeTab === "tab4" && (
                            <div className="blocks-tab">
                               
                                <p>Proof of Return.</p>
                            </div>
                        )}
                    </div>


                </div>
                <h5>Transaction History for AWB No: {awbNo}</h5>
                {/* <p>
                
                    This is a random text inside the modal representing the transaction history.
                    You can replace this with dynamic content related to the Airway Bill Number {awbNo}.
                </p> */}
            </Modal.Body>

        </Modal>
    );
};

export default TransactionHistory;
