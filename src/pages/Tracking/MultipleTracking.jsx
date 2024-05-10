import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTrackingDetails } from '../../redux/reducers/TrackingDetailsReducer'
import { toast } from 'react-toastify'
import { useTrackByReferenceMutation, useTrackByTrackingMutation } from '../../service/apiServices';

const MultipleTracking = () => {
  const dispatch = useDispatch()
  const trackingDetailsState = useSelector((state) => state.TrackingDetailsReducer)
  const [trackByReference] = useTrackByReferenceMutation();
  const [trackByTracking] = useTrackByTrackingMutation();
  const [TrackingData, setTrackingData] = useState({})
  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'trackingType') {
      dispatch(setTrackingDetails({ trackingType: value }))
    } else {
      setTrackingData((prev) => ({ ...prev, [name]: value }))
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (TrackingData.airWayBillNo) {
      const airWayBillNo = TrackingData.airWayBillNo.split('\n').map((item) => ({ AirWayBillNo: item }));

      const data = { TrackingAWB: airWayBillNo };

      dispatch(setTrackingDetails({ error: false, loading: true }));

      try {
        //console.log("data", data)
        //console.log("trackingType", trackingDetailsState.trackingType)
        const res = await (trackingDetailsState.trackingType === 'Reference'
          ? trackByReference(data).unwrap()
          : trackByTracking(data).unwrap());

        dispatch(setTrackingDetails({
          data: res.data.AirwayBillTrackList,
          error: false,
          loading: false,
        }));

        const element = document.getElementById('trackingResultDiv');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (error) {
        console.error(error);

        dispatch(setTrackingDetails({ data: [], error: true, loading: false, message: error.data?.message }));
      }
    } else {
      toast.error('Please Enter Tracking Id');
    }
  };
  //console.log("", trackingDetailsState.trackingType)
  return (
    <form
      className="form-inline for_form "
      method="post"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <div className="col-md-5 md-input-wrapper form-group for_form_input">
        <textarea
          className="md-form-control"
          name="airWayBillNo"
          id="airWayBillNo"
          value={TrackingData.airWayBillNo}
          onChange={handleChange}
          placeholder="Please enter reference numbers,one per line"
          required=""
          defaultValue={""}
        />
      </div>
      <div className="col-md-4 md-input-wrapper form-group for_form_input">
        <select
          className="md-form-control"
          name="trackingType"
          id="trackingType"
          required=""
          value={trackingDetailsState.trackingType}
          onChange={handleChange}
        >
          <option
            className="md-form-control-select"
            value={"Airwaybiil"}

          >
            Airwaybiil Number
          </option>
          <option
            className="md-form-control-select"
            value={"Reference"}

          >
            Reference Number
          </option>
          <option
            className="md-form-control-select"
            value={"Booking"}
            disabled=""
          >
            Booking Number
          </option>
        </select>
      </div>
      <div className="col-md-3">
        <button onClick={handleSubmit} className="btn btn-tracking w-100 mt-3">
          Track Now
          <i className="fa fa-arrow-right" />
        </button>
      </div>
    </form>
  )
}

export default MultipleTracking