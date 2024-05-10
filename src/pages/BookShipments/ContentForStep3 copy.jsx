import { useState } from "react";
import {
  useGetCountryMasterQuery,
  usePostCityListMutation,
} from "../../service/apiServices";
import useFormSubmission from "../../hooks/useFormSubmission";
import { useEffect } from "react";
export default function ContentForStep3({ SchadulePickupProps, onChangeData }) {
  const { Data, setFormData, formData, errors, handleSubmit, handleChange } =
    SchadulePickupProps;
  const [Country, setCountry] = useState(
    formData.BookingData.ShipmentType === "dom" ? "AE" : ""
  );
  const CountryMaster = useGetCountryMasterQuery(Country);
  const CityHandle = useFormSubmission(usePostCityListMutation, {
    Country: formData["BookingData"]["ReceiversCountry"],
  });
  useEffect(() => {
    if (formData.BookingData.SendersCountry) {
      CityHandle.setFormData({
        Country: formData["BookingData"]["ReceiversCountry"],
      });
    }
  }, [formData["BookingData"]["ReceiversCountry"]]);
  useEffect(() => {
    CityHandle.handleSubmit(CityHandle.formData);
  }, [CityHandle.formData]);

  //console.log(">>", formData["BookingData"])
  return (
    <div className="location-form mt-3 mb-3">
      <h4
        className="mt-4 mb-3 text-center"
        style={{ color: "#28337A", fontWeight: "600" }}
      >
        Enter Drop-off Location
      </h4>
      <form>
        <div>
          <label style={{ fontWeight: "600" }}>
            Contact person or Company name
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            className="form-control"
            style={{
              fontSize: "14px",
              width: "100%",
              // border: "none",
            }}
            name="ReceiversContactPerson"
            value={formData["BookingData"]["ReceiversContactPerson"]}
            onChange={onChangeData}
          />
        </div>
        <div
          className="d-flex mt-2"
          style={{ justifyContent: "space-between" }}
        >
          <div className="m-2">
            <label style={{ fontWeight: "600" }}>
              Drop-off Address Details
            </label>
            <input
              placeholder="House Name and Building Number"
              type="text"
              className="form-control"
              style={{
                fontSize: "14px",
                width: "100%",
                // border: "none",
              }}
              name="ReceiversAddress1"
              value={formData["BookingData"]["ReceiversAddress1"]}
              onChange={onChangeData}
            />
          </div>
          <div className="m-2">
            <label style={{ fontWeight: "600" }}>Street </label>
            <input
              placeholder="Enter Street"
              type="text"
              className="form-control"
              style={{
                fontSize: "14px",
                width: "100%",
                // border: "none",
              }}
              name="ReceiversAddress2"
              value={formData["BookingData"]["ReceiversAddress2"]}
              onChange={onChangeData}
            />
          </div>
        </div>
        <div className="m-2">
          <label style={{ fontWeight: "600" }}>Mobile Number</label>
          <input
            placeholder="Enter Receiver Mobile Number"
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
            className="form-control"
            style={{
              fontSize: "14px",
              width: "100%",
              // border: "none",
            }}
            name="ReceiversMobile"
            value={formData["BookingData"]["ReceiversMobile"]}
            onChange={onChangeData}
          />
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
                // border: "none",
               
              }}
            />
          </div>
          <div className="m-2">
            <label style={{ fontWeight: "600" }}>Mobile Number</label>
            <input
              placeholder="Enter Receiver Mobile Number"
              type="text"
              className="form-control"
              style={{
                fontSize: "14px",
                width: "100%",
                // border: "none",
                
              }}
              name="ReceiversMobile"
              value={formData["BookingData"]["ReceiversMobile"]}
              onChange={onChangeData}
            />
          </div>
        </div> */}
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <div className="m-2">
            <label style={{ fontWeight: "600" }}>Country</label>
            <select
              className="form-control"
              style={{
                fontSize: "14px",

                // border: "none",
              }}
              name="ReceiversCountry"
              value={formData["BookingData"]["ReceiversCountry"]}
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
          <div className="m-2">
            <label style={{ fontWeight: "600" }}>City</label>
            <select
              className="form-control"
              style={{
                fontSize: "14px",
                width: "185px",
              }}
              name="ReceiversCity"
              value={formData["BookingData"]["ReceiversCity"]}
              onChange={onChangeData}
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
