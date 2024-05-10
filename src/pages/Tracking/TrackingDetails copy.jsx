import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBillingId } from '../../redux/reducers/TrackingDetailsReducer'
import TrackingTable from './TrackingTable';
import Loader from '../../heplers/Loader';

const TrackingDetails = () => {
    // Function to find duplicates
    function findDuplicates(trackingLogDetails) {
        const seen = new Set();
        const duplicates = [];

        for (const log of trackingLogDetails) {
            if (seen.has(log.ActivityDate)) {
                duplicates.push(log.ActivityDate);
            } else {
                seen.add(log.ActivityDate);
            }
        }

        return duplicates;
    }
    const dispatch = useDispatch()
    const trackingDetailsState = useSelector((state) => state.TrackingDetailsReducer)
    const [ShowSetails, setShowDetails] = useState(false)
    const handleShow = (id) => {
        setShowDetails(!setShowDetails)
        dispatch(setBillingId(id))
    }
    //console.log(trackingDetailsState.data)


    return (
        <>
            <div className='container'>
                <div className="row" id="trackingResultDiv">
                    <div className="w-100  mt-3 ">
                        <div className="pl-3 text-center track-another-shipment">
                            <span className="sub-title pt-2">Result Summary</span>
                            <button
                                type="button"
                                onclick="moveToTrackShipment()"
                                className="btn btn-tracking bg-blue text-center remove-trck pr-3 pl-3 p-2"
                            >
                                Track Another Shipment
                            </button>
                        </div>
                        {trackingDetailsState.Loading ? (<Loader />) : trackingDetailsState.error ? (<Erro>Error Accured</Erro>) : trackingDetailsState.data.length > 0 ? trackingDetailsState.data.map((item, index) => {

                            return (
                                <>
                                    <div key={index} className="col-md-12">
                                        <div className="media">
                                            <div className="position-relative w-100">
                                                <div className="summary-forbss">
                                                    <b>Airway Bill No : {item?.AirWayBillNo}</b>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="media d-flex result-summary-status inactive-grey mt-30">
                                            <div className="title-hold">
                                                <h4 className="green-title">Returned To Shipper To : TEST</h4>
                                                <h6>
                                                    <span className="para-1">
                                                        Origin :{item?.Origin} {" "}
                                                        <span className="para-1">
                                                            Destination : {item?.Destination}
                                                        </span>
                                                    </span>
                                                </h6>
                                                {item.TrackingLogDetails && item.TrackingLogDetails.length > 0 && (
                                                    <p>
                                                        <span className="delivery-date">{item?.TrackingLogDetails[0]["ActivityDate"]}</span>
                                                        <span className="delivery-time right-border"> {item?.TrackingLogDetails[0]["ActivityTime"]}</span>
                                                        <span className="destination">{item?.TrackingLogDetails[0]["Location"]}</span>
                                                    </p>
                                                )}

                                            </div>
                                        </div>
                                        <div className="step-counter">
                                            <div className="stepper-wrapper">
                                                {/* {
                                                    item.ShipmentProgress &&  [...Array(item.ShipmentProgress).keys()].map((v,i)=>(
                                                        <div className="stepper-item completed active margin-left-10">
                                                        <div className="step-counter">✓</div>
                                                    </div>
                                                    ))
                                                } */}
                                                <div className="stepper-item completed active margin-left-10">
                                                    <div className="step-counter">✓</div>
                                                </div>
                                                <div className="stepper-item completed active margin-left-10">
                                                    <div className="step-counter">✓</div>
                                                </div>
                                                <div className="stepper-item completed active margin-left-10">
                                                    <div className="step-counter">✓</div>
                                                </div>
                                                <div className="stepper-item completed active margin-left-10">
                                                    <div className="step-counter">✓</div>
                                                </div>
                                                <div className="stepper-item completed active margin-left-10">
                                                    <div className="step-counter">✓</div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="panel-body">
                                            <div className="card-body summary-details-tabs px-0 pt-3 pb-0 ">
                                                <div className="table-responsive">
                                                    <table className="table table-bordered table-responsive para-1">
                                                        <TrackingTable key={index} trackingLogDetails={item.TrackingLogDetails} />
                                                    </table>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }) : <>
                            Data Not found
                        </>}

                    </div>
                </div>
            </div>
        </>
    )
}

export default TrackingDetails