import { useEffect, useState } from "react";
import Loader from "../../heplers/Loaders/Loader";
import { toast } from "react-toastify";
import { MinimumDate } from "../../heplers/DateValidator";
import { useNavigate } from "react-router-dom";
export default function ContentForStep3({
  SchadulePickupProps,
  onChangeData,
  ShipmentType,
  IsDimension,
  handleDimesionChange,
  handleChangeDimension,
  dimension,
  setCurrentStep,
  handleChangeData,
  Calculate
}) {
  var { Data, setFormData, formData, errors, isPosting } =
    SchadulePickupProps;

  // useEffect(() => {
  //   //console.log("errors", errors);
  //   if (errors.error) {
  //     toast.error(errors.message);
  //     Data = null;
  //   }
  // }, [errors]);
  const [isOnline, setisOnline] = useState(false)
  console.log("Caluclate", Calculate.CalucalteData)
  if (isPosting) {
    return <Loader />
  } else if (Calculate.isLoading) {
    return <Loader />
  }
  else {

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
                      <option value={"09-12"}>09-12</option>
                      <option value={"09-17"}>09-17</option>
                      <option value={"12-16"}>12-16</option>
                      <option value={"12-17"}>12-17</option>
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
            <div className=" text-center">
              <button type="button" className="btn btn-tracking bg-blue text-center pr-3 pl-3 mt-2" onClick={Calculate.handleCalculate}>
                Calculate
              </button>
            </div>
            {Calculate.CalucalteData && (
              <div className="labelthird " >
                <div className="text-center" style={{ fontWeight: "600", fontSize: "20px" }}>  <span className="labelthird text-center" >Amount:</span> <span>{Calculate.CalucalteData.NetAmount}</span></div>
                <div className="row justify-content-center mt-3">
                  <div className="col-md-6 col-xs-4 text-start  p-0">
                    <div className="wizard-form-radio delevery-option text-start p-0 text-center">
                      <input
                        checked={isOnline ? false : true}
                        name="paytype"
                        id="cod"
                        type="radio"
                        defaultValue="cod"
                        className="paymenttype"
                        onChange={() => {
                          setisOnline(false)
                          setFormData((prevData) => ({
                            ...prevData,
                            BookingData: {
                              ...prevData.BookingData,
                              PaidAmount: 0,
                              CashOnPickup: 50,
                            },
                          }))
                        }
                        }
                      />
                      <span className="checkmark" />
                      <label htmlFor="cod">Cash on Pickup</label>
                    </div>
                  </div>

                  <div className="col-md-6 col-xs-4 ">
                    <div className="wizard-form-radio delevery-option text-center">
                      <input
                        checked={isOnline ? true : false}
                        name="paytype"
                        id="cod"
                        type="radio"
                        defaultValue="onlinepayment"
                        className="paymenttype"
                        onChange={() => {
                          setisOnline(true)
                          setFormData((prevData) => ({
                            ...prevData,
                            BookingData: {
                              ...prevData.BookingData,
                              PaidAmount: 50,
                              CashOnPickup: 0,
                            },
                          }))
                        }}
                      />
                      <span className="checkmark" />
                      <label htmlFor="onlinepayment">Online Payment</label>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </form>
        </div>
      </div>
    );
  }
}
