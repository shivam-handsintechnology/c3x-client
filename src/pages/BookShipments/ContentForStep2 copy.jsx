import { useEffect, useState } from "react";
import {
  useGetCountryMasterQuery,
  usePostCityListMutation,
} from "../../service/apiServices";
import useFormSubmission from "../../hooks/useFormSubmission";
import Coutrycodes from "../../service/CountryCodes.json";
export default function ContentForStep2({
  SchadulePickupProps,
  onChangeData,
  ShipmentType,
}) {
  const { Data, setFormData, formData, errors, handleSubmit } =
    SchadulePickupProps;
  //console.log("ShipmentType...>", formData.BookingData.ShipmentType)
  const [Country, setCountry] = useState(
    formData.BookingData.ShipmentType === "dom" ? "AE" : ""
  );
  const CountryMaster = useGetCountryMasterQuery(Country);
  const CityHandle = useFormSubmission(usePostCityListMutation, {
    Country: formData["BookingData"]["SendersCountry"],
  });
  useEffect(() => {
    if (formData.BookingData.SendersCountry) {
      CityHandle.setFormData({
        Country: formData["BookingData"]["SendersCountry"],
      });
    }
  }, [formData["BookingData"]["SendersCountry"]]);
  useEffect(() => {
    CityHandle.handleSubmit(CityHandle.formData);
  }, [CityHandle.formData]);

  //console.log("form", formData);

  //console.log(">>>ShipmentType", ShipmentType)
  return (
    <div className="location-form mt-5 ">
      <h4
        className=" text-center"
        style={{ color: "#28337A", fontWeight: "600" }}
      >
        Enter Pickup Location
      </h4>
      {/* Content for Step 2 */}
      <form className="mb-3">
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <div className="m-2">
            <label style={{ fontWeight: "600" }}>Pickup Address Details:</label>
            <input
              placeholder="Appartment Number and Building Name"
              type="text"
              name="SendersAddress1"
              value={formData["BookingData"]["SendersAddress1"]}
              onChange={onChangeData}
              className="form-control"
              style={{
                fontSize: "14px",
                width: "100%",
                border: "none",
                borderBottom: "1px solid grey",
              }}
            />
          </div>
          <div className="m-2">
            <label style={{ fontWeight: "600" }}>Area</label>
            <input
              placeholder="Enter Area"
              type="text"
              name="SendersAddress2"
              value={formData["BookingData"]["SendersAddress2"]}
              onChange={onChangeData}
              className="form-control"
              style={{
                fontSize: "14px",
                width: "100%",
                border: "none",
                borderBottom: "1px solid grey",
              }}
            />
          </div>
        </div>
        {/* <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <div className="m-2">
            <label style={{ fontWeight: "600" }}>Landmark</label>
            <input
              placeholder="Enter Landmark"
              type="text"
              className="form-control"
              style={{
                fontSize: "14px",
                width: "100%",
                border: "none",
              }}
            />
          </div>
          <div className="m-2">
            <label style={{ fontWeight: "600" }}>Your Name</label>
            <input
              placeholder="Enter Name"
              type="text"
              className="form-control"
              style={{
                fontSize: "14px",
                width: "100%",
                border: "none",
              }}
            />
          </div>
        </div> */}
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <div className="m-2">
            <label style={{ fontWeight: "600" }}>Mobile Number</label>
            <input
              placeholder="Sender Mobile Number"
              type="number" onKeyDown={(e) => {
                // Disable keyboard arrows
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                  e.preventDefault();
                }
              }}
              onWheel={(e) => {
                // Disable mouse wheel
                e.target.blur();
              }}
              name="SendersMobileNo"
              value={formData["BookingData"]["SendersMobileNo"]}
              onChange={onChangeData}
              className="form-control"
              style={{
                fontSize: "14px",
                width: "100%",
                border: "none",
                borderBottom: "1px solid grey",
              }}
            />
          </div>
          <div className="m-2">
            <label style={{ fontWeight: "600" }}>Your Email address</label>
            <input
              name="SendersEmail"
              value={formData["BookingData"]["SendersEmail"]}
              onChange={onChangeData}
              placeholder="Enter Email"
              type="text"
              className="form-control"
              style={{
                fontSize: "14px",
                width: "100%",
                border: "none",
                borderBottom: "1px solid grey",
              }}
            />
          </div>
        </div>
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <div className="m-2">
            <label style={{ fontWeight: "600" }}>Your Name</label>
            <input
              placeholder="Enter Name"
              type="text"
              name="SendersContactPerson"
              value={formData["BookingData"]["SendersContactPerson"]}
              onChange={onChangeData}
              className="form-control"
              style={{
                fontSize: "14px",
                width: "100%",
                border: "none",
                borderBottom: "1px solid grey",
              }}
            />
          </div>
          <div className="m-2 ">
            <div style={{ marginLeft: "8px" }}>
              <label style={{ fontWeight: "600" }}>Country</label>
            </div>
            <select
              className="thirststep m-2"
              style={{
                border: "none",
                width: "17  0px",
                border: "none",
                width: "175px",
                borderBottom: "1px solid grey",
              }}
              name="SendersCountry"
              value={formData["BookingData"]["SendersCountry"]}
              onChange={onChangeData}
            >
              <option value={""}>Select Country</option>
              {!CountryMaster.isLoading &&
                CountryMaster.data &&
                CountryMaster.data.data.CountryListLocation &&
                CountryMaster.data.data.CountryListLocation.length > 0 ? (
                CountryMaster.data.data.CountryListLocation.map(
                  (item, index) => (
                    <option value={item.CountryCode}>{item.CountryName}</option>
                  )
                )
              ) : (
                <option value={""}>{"No Options Available"}</option>
              )}
            </select>
          </div>
        </div>

        <div className="d-flex " style={{ justifyContent: "space-between" }}>
          <div>
            <div style={{ marginLeft: "9px" }}>
              <label style={{ fontWeight: "600" }}>City</label>
            </div>
            <select
              name="SendersCity"
              value={formData["BookingData"]["SendersCity"]}
              onChange={onChangeData}
              className="thirststep "
              style={{
                border: "none",
                width: "185px",
                border: "none",
                borderBottom: "1px solid grey",
              }}
            >
              <option value={""}>Select City</option>
              {!CityHandle.errors.loading &&
                CityHandle.Data &&
                CityHandle.Data.CityListLocation &&
                CityHandle.Data.CityListLocation.length > 0 ? (
                CityHandle.Data.CityListLocation.map((item, index) => (
                  <option value={item.CityCode} id={item.CityCode}>{item.CityName}</option>
                ))
              ) : (
                <option value={""}>No City Found</option>
              )}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}
