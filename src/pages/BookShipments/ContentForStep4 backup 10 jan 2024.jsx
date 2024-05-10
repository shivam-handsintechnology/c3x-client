import { useEffect, useState } from "react";
import Loader from "../../heplers/Loaders/Loader";
import { toast } from "react-toastify";
import { MinimumDate } from "../../heplers/DateValidator";
import { useNavigate } from "react-router-dom";
import { usePostRateFInderMutation } from "../../service/apiServices"
export default function ContentForStep3({
  SchadulePickupProps,
  onChangeData,
  ShipmentType,
  IsDimension,
  handleDimesionChange,
  handleChangeDimension,
  dimension,
  setCurrentStep
}) {
  var { Data, setFormData, formData, errors, handleSubmit, handleChange } =
    SchadulePickupProps;
  useEffect(() => {
    //console.log("errors", errors);
    if (errors.error) {
      toast.error(errors.message);
      Data = null;
    }
  }, [errors]);

  // const [calculate, { isLoading }] = usePostRateFInderMutation()
  // const handleCalculate = async () => {
  //   try {
  //     console.log("dimension", formData["BookingData"]["Dimension"])
  //     let payload = {
  //       "Destination": formData["BookingData"]["ReceiversCity"],
  //       "Dimension": formData["BookingData"]["Dimension"] ? formData["BookingData"]["Dimension"] : "",
  //       "Origin": formData["BookingData"]["Origin"],
  //       "Product": formData["BookingData"]["ProductType"],
  //       "ServiceType": formData["BookingData"]["ServiceType"],
  //       "Weight": formData["BookingData"]["Weight"],
  //     }
  //     const res = await calculate(payload).unwrap()
  //     console.log(">>>>>>res", res)
  //   } catch (error) {
  //     console.log({ error })
  //   }

  // }
  return (
    <div className="location-form mt-3 mb-2">
      <div className="text-center mt-2">
        <h4 style={{ color: "#28337A", fontWeight: "600" }}>
          Shipment for Information
        </h4>
      </div>
      <div>
        <form>
          <div>
            <div>
              <label
                className="labelthird"
                style={{ margin: "5px", width: "100%" }}
              >
                <div style={{ fontWeight: "600" }}>Instruction :</div>
                <input
                  name="SpecialInstruction"
                  onChange={(e) => {
                    onChangeData(e)
                  }}
                  value={formData["BookingData"]["SpecialInstruction"]}
                  type="text"
                  className="thirststep mt-0"
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: "1px solid grey",
                  }}
                />
              </label>
            </div>

            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div>
                <label className="labelthird m-2 p-0">

                  <div style={{ fontWeight: "600" }}>Pickup Date</div>

                </label>
                <input
                  name="ShipmentReadyDate"
                  onChange={(e) => {
                    onChangeData(e)
                  }}
                  value={formData["BookingData"]["ShipmentReadyDate"]}
                  type="date"
                  min={MinimumDate()}
                  className="form-control  "
                  style={{ border: "none", width: "140px" }}
                />


              </div>
              <div>
                <label className="labelthird m-2">
                  <div style={{ fontWeight: "600" }}>Pickup Time Slot:</div>
                  <select
                    name="ShipmentReadyTime"
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                    value={formData["BookingData"]["ShipmentReadyTime"]}
                    className="form-control thirststep"
                    style={{
                      border: "none",
                      width: "100%",
                      borderBottom: "1px solid grey",
                    }}
                  >
                    <option>Select Pickup Time Range</option>
                    <option value={"12:00"}>12:00</option>
                    <option value={"13:00"}>13:00</option>
                    <option value={"14:00"}>14:00</option>
                    <option value={"15:00"}>15:00</option>
                  </select>
                </label>
              </div>
            </div>

            <div
              className="d-flex "
              style={{ justifyContent: "space-between" }}
            >
              {" "}
              <label className="labelthird m-2">
                <div style={{ fontWeight: "600" }}>Weight:</div>
                <input
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
                  name="Weight"
                  onChange={(e) => {
                    onChangeData(e)
                  }}
                  value={formData["BookingData"]["Weight"]}
                  className="form-control thirststep"
                  placeholder="Weight(in kgs)"
                  style={{
                    border: "none",
                    borderBottom: "1px solid grey",
                  }}
                />
              </label>
              <label className="labelthird m-2">
                <div style={{ fontWeight: "600" }}>Number of Pieces:</div>
                <input
                  name="NumberofPeices"
                  onChange={(e) => {
                    onChangeData(e)
                    setFormData(prevFormData => ({
                      ...prevFormData,
                      BookingData: {
                        ...prevFormData.BookingData,
                        NumberofShipments: e.target.value
                      }
                    }));
                  }}
                  value={formData["BookingData"]["NumberofPeices"]}
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
                  className="form-control thirststep"
                  style={{
                    border: "none",
                    borderBottom: "1px solid grey",
                  }}
                />
              </label>
            </div>

            <div>
              <input
                type="checkbox"
                className="m-2"
                onChange={handleDimesionChange}
              />
              I know the dimension of my shipment
            </div>

            {IsDimension && (
              <div className="m-2">
                <label>
                  <div style={{ fontWeight: "600" }}>Dimensions:</div>
                  <div
                    className="d-flex"
                    style={{ justifyContent: "space-between" }}
                  >
                    {" "}
                    <input
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
                      className="m-2"
                      placeholder="L(cm)"
                      name="L"
                      onChange={(e) =>
                        handleChangeDimension("L", e.target.value)
                      }
                      value={dimension.L}
                      style={{
                        width: "80px",
                        border: "none",
                        borderBottom: "1px solid grey",
                      }}
                    />
                    <input
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
                      name="B"
                      onChange={(e) =>
                        handleChangeDimension("B", e.target.value)
                      }
                      value={dimension.B}
                      className="m-2"
                      placeholder="B(cm)"
                      style={{
                        width: "80px",
                        border: "none",
                        borderBottom: "1px solid grey",
                      }}
                    />
                    <input
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
                      className="m-2"
                      name="H"
                      onChange={(e) =>
                        handleChangeDimension("H", e.target.value)
                      }
                      value={dimension.H}
                      placeholder="H(cm)"
                      style={{
                        width: "80px",
                        border: "none",
                        borderBottom: "1px solid grey",
                      }}
                    />
                  </div>
                </label>
              </div>
            )}
          </div>
          {/* <button type="button" onClick={handleCalculate}>
            Calculate
          </button> */}
          <div className="text-center mb-3 mt-2">
            {errors.loading ? (
              <Loader />
            ) : errors.error ? (
              <span className="text-danger">{""}</span>
            ) : Data && Data.PickupRequestNo && setCurrentStep(5)
            }

            <span className="text-success">
              {Data &&
                Data.PickupRequestNo &&
                "Your Pickup Request Number is " + Data.PickupRequestNo}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
