import React, { useEffect, useState } from "react";
import UseMultiStepForm from "../../hooks/UseMultiStepForm";
import { usePostasaGuestSchedulePickupDataMutation, usePostRateFInderMutation } from "../../service/apiServices";
import useFormSubmission from "../../hooks/useFormSubmission";
import { InitialShcdulePickupdata } from "../../service/initialData";
import ContentForStep1 from "./ContentForStep1";
import ContentForStep2 from "./ContentForStep2";
import ContentForStep3 from "./ContentForStep3";
import ContentForStep4 from "./ContentForStep4 backup 10 jan 2024"
import { Row, Col } from "react-bootstrap";
import ThankYouPage from "../ThankYouPage"
import "./Book.css";
import { useNavigate, useLocation } from "react-router-dom";
import { validateSchadulePickupFormHomePageOne, validateSchadulePickupFormHomePagetWO } from "../../heplers/Validators/SchadulePickupValidator"
import { toast } from "react-toastify";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
const Bookshipment = () => {

  const { state } = useLocation()
  var intialData = InitialShcdulePickupdata
  if (state) {
    let ProductType = state.ProductType
    delete InitialShcdulePickupdata.BookingData.Product

    if (state.ShipmentType === "inter") {
      intialData = { BookingData: { ...InitialShcdulePickupdata.BookingData, SendersCountry: state.Origin, ReceiversCountry: state.Destination, PackageType: ProductType, ProductType: ProductType, ShipmentType: state.ShipmentType, ServiceType: "IMP" } }
    } else if (state.ShipmentType === "dom") {
      intialData = {
        BookingData: {
          ...InitialShcdulePickupdata.BookingData, SendersCountry: "AE",
          ReceiversCountry: "AE", PackageType: ProductType, ProductType: ProductType, ShipmentType: state.ShipmentType, ServiceType: state.ServiceType
        }
      }
    }
  } else {
    intialData = {
      BookingData: {
        ...InitialShcdulePickupdata.BookingData, ServiceType: "NOR", ShipmentType: "dom", ProductType: "XPS", PackageType: "XPS",
      }
    }
  }
  const SchadulePickupProps = useFormSubmission(
    usePostasaGuestSchedulePickupDataMutation,
    intialData
  )
  //console.log("BookingData", SchadulePickupProps.formData.BookingData)
  const navigate = useNavigate()

  const onChangeData = (e) => {
    const { name, value } = e.target;
    //console.log("name", name, value)
    SchadulePickupProps.setFormData((prevData) => ({
      ...prevData,
      BookingData: {
        ...prevData.BookingData,
        PackageType: name === "PackageType" ? value : prevData.BookingData.PackageType,
        ProductType: name === "PackageType" ? value : prevData.BookingData.PackageType,
        ShipmentType: name === "ShipmentType" ? value : prevData.BookingData.ShipmentType,
        [name]: value,
      },
    }));
  };
  const handleChangeData = (name, value) => {
    SchadulePickupProps.setFormData((prevData) => ({
      ...prevData,
      BookingData: {
        ...prevData.BookingData,
        [name]: value,
      },
    }));
  }
  const [dimension, setdimenstion] = useState({
    L: "",
    B: "",
    H: ""
  })
  const [IsDimension, setisDimension] = useState(false)
  const handleDimesionChange = () => {
    setisDimension(!IsDimension)
  }
  const handleChangeDimension = (name, value) => {
    let nam = name;
    if (nam === "L") {
      nam = "Length"
    } else if (nam === "B") {
      nam = "Breadth"
    } else if (nam === "H") {
      nam = "Height"
    }

    if (value === "") {
      toast.error("Please enter " + nam);
    } else {
      // Update the dimension state
      setdimenstion(prevDim => ({
        ...prevDim,
        [name]: value
      }));

      // Wait for the dimension state to update
      const dimensionWeight = dimension.L * dimension.B * dimension.H
      // Wait for the dimension state to update

      // Update formData with the new dimensions
      setTimeout(() => {
        SchadulePickupProps.setFormData(prevFormData => ({
          ...prevFormData,
          BookingData: {
            ...prevFormData.BookingData,
            Dimension: `${dimension.L}x${dimension.B}x${dimension.H}`,
            // Weight: dimensionWeight
          }

        }));
      }, 0);
    }
  };
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prevStep) => (prevStep < 4 ? prevStep + 1 : prevStep));
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };
  const [CalucalteData, setCalucalteData] = useState({})
  const [calculate, { isLoading }] = usePostRateFInderMutation()
  const handleCalculate = async () => {
    try {
      const { formData } = SchadulePickupProps
      console.log("dimension", formData["BookingData"]["Dimension"])
      let payload = {
        "Destination": formData["BookingData"]["ReceiversCity"],
        "Dimension": formData["BookingData"]["Dimension"] ? formData["BookingData"]["Dimension"] : "",
        "Origin": formData["BookingData"]["Origin"],
        "Product": formData["BookingData"]["ProductType"],
        "ServiceType": formData["BookingData"]["ServiceType"],
        "Weight": formData["BookingData"]["Weight"],
      }
      const res = await calculate(payload).unwrap()
      console.log(">>>>>>res", res)
      setCalucalteData(res.data)
      handleChangeData("PaidAmount", res.data.NetAmount)
    } catch (error) {
      console.log({ error })
    }
  }
  const handleNextButtonClick = () => {
    let message = ""
    if (currentStep == 1) {

      nextStep()

    }
    if (currentStep == 2) {
      let errorCheck = validateSchadulePickupFormHomePageOne(SchadulePickupProps.formData.BookingData)
      //console.log(">>", errorCheck)
      if (errorCheck.error) {
        message = errorCheck.error.details.length > 0 && errorCheck.error.details[0].message
        message = message.replace(/"/g, '')
        toast.error(message)
      } else {
        nextStep()
      }
    }
    else if (currentStep == 3) {
      let errorCheck = validateSchadulePickupFormHomePagetWO(SchadulePickupProps.formData.BookingData)
      //console.log(">>", errorCheck)
      if (errorCheck.error) {
        message = errorCheck.error.details.length > 0 && errorCheck.error.details[0].message
        message = message.replace(/"/g, '')
        toast.error(message)
      } else {
        nextStep()
      }
    }
    else if (currentStep == 4) {
      if (CalucalteData.NetAmount && CalucalteData.NetAmount > 0) {
        SchadulePickupProps.handleSubmit()
      }
    }
  };

  //console.log("SchadulePickupProps", SchadulePickupProps.formData)
  const renderScreen = () => {
    switch (currentStep) {
      case 1:
        return (
          <ContentForStep1
            SchadulePickupProps={SchadulePickupProps}
            onChangeData={onChangeData}
            ShipmentType={state && state.ShipmentType}
            handleChangeData={handleChangeData}
          />
        );
      case 2:
        return (
          <ContentForStep2
            SchadulePickupProps={SchadulePickupProps}
            onChangeData={onChangeData}
            ShipmentType={state && state.ShipmentType}
            handleChangeData={handleChangeData}
          />
        );
      case 3:
        return (
          <ContentForStep3
            SchadulePickupProps={SchadulePickupProps}
            onChangeData={onChangeData}
            ShipmentType={state && state.ShipmentType}
            handleChangeData={handleChangeData}
          />
        );
      case 4:
        return (
          <ContentForStep4
            SchadulePickupProps={SchadulePickupProps}
            onChangeData={onChangeData}
            ShipmentType={state && state.ShipmentType}
            IsDimension={IsDimension}
            handleDimesionChange={handleDimesionChange}
            handleChangeDimension={handleChangeDimension}
            dimension={dimension}
            setCurrentStep={setCurrentStep}
            handleChangeData={handleChangeData}
            Calculate={{ handleCalculate, CalucalteData, setCalucalteData, isLoading }}

          />
        );
      case 5:
        return (
          <ThankYouPage
            state={SchadulePickupProps.Data}
          />
        );
      default:
        return null;
    }
  };

  const renderStepPointers = () => {
    const steps = [1, 2, 3, 4, 5];
    // const { handleBack, handleNext, steps, step, isFirstStep, isLastStep}=UseMultiStepForm([ ])
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <div>
          <div style={{ fontSize: "17px" }}>
            {" "}
            {"Ship Your Package in Four steps"}
          </div>
          <br />
          <div className="mt-3">
            {steps.map((step, index) => (
              <React.Fragment key={step}>
                {index > 0 && (
                  <svg height="30" width="100">
                    <line
                      x1="5"
                      y1="15"
                      x2="95"
                      y2="15"
                      style={{
                        stroke:
                          index + 1 === currentStep
                            ? "#2ca2c6"
                            : index + 1 < currentStep
                              ? "#2ca2c6"
                              : "gray",
                        strokeWidth: 2,
                      }}
                    />
                  </svg>
                )}
                <span
                  style={{
                    display: "inline-block",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    background:
                      index + 1 === currentStep
                        ? "#2ca2c6" // Current step color
                        : index + 1 < currentStep
                          ? "#2ca2c6" // Completed step color
                          : "gray", // Incomplete step color
                    margin: "0 5px",
                    cursor: "pointer",
                    textAlign: "center",
                    lineHeight: "28px",
                    color: "white", // Text color
                  }}
                // onClick={() => setCurrentStep(step)}
                >
                  {step}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div>
        <div className="d-flex justify-content-center" style={{ marginTop: '160px', marginBottom: '10px' }}>
          <h2 style={{ color: "#2ca2c6", fontWeight: "bold" }}>
            Book a Shipment
          </h2>
        </div>

        <Row className=" d-flex justify-content-center" style={{ marginBottom: '100px' }}>
          <Col lg={7} className="box-ship ">
            {" "}
            <div
              style={{
                marginTop: "20px",
                padding: "5px",
              }}
            >
              {renderStepPointers()}

              <div>
                {renderScreen()}
                {currentStep !== 5 && (<div
                  className=" d-flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <button
                    className=""
                    onClick={() => { currentStep === 1 ? navigate(-1) : previousStep() }}

                    // disabled={currentStep === 1}
                    style={{
                      borderRadius: "20px",
                      width: "max-content",
                      padding: "5px 60px",
                      margin: "10px",
                      border: "grey",
                    }}
                  >
                    Back
                  </button>
                  <button
                    className="next "
                    onClick={handleNextButtonClick}

                    style={{
                      borderRadius: "20px",
                      width: "max-content",

                      padding: "5px 60px",
                      margin: "10px",

                      border: "none",

                    }}
                  >
                    {currentStep === 4 ? "Submit" : "Next"}
                  </button>
                </div>)}

              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default Bookshipment;
