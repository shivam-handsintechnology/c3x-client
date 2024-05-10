import { useState } from "react";
import "./Dashboard.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AirWayBillHistory from "../../Components/AirwayBils/AirWayBillHistory";
import AirWayBillGeneration from "../../Components/AirwayBils/AirWayBillGeneration";
import { APi_Url, useMultipleCreateAirwayBillMutation, usePostAirwayBillPDFFormatDataMutation } from "../../service/apiServices";
import useFormSubmission from "../../hooks/useFormSubmission";
import moment from "moment";
import SmalLoader from "../../heplers/Loaders/SmallLoader";
import ErrorComponent from "../../heplers/ErrorComponent";
import { handlePdfDownload } from "../../heplers/PdfDownloader";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ManageBulkBatchNumber from "./ManageBulkBatchNumber";
import PrepadAccountStatusLeftMoney from "../../Components/Common/PrepadAccountStatusLeftMoney";
const Managingshipping = (props) => {
  const [selectedFIle, setselectedFIle] = useState(null)
  const userData = useSelector((state) => state.UserReducer);
  console.log("user data", userData?.data.data.user.AccountNo)
  const [AccountNo, setAccountNo] = useState(userData?.data?.data?.user?.AccountNo);
  const [AirwayBillNumber, setAirwayBillNumber] = useState('');
  const [MultipleAirwayBillData, setMultipleAirwayBillData] = useState({
    loading: false,
    error: null,
    Data: null,
  })
  const [PrintType, setPrintType] = useState("LABEL")
  const TodayDate = moment().format("MMM Do YY");
  // //console.log(TodayDate)
  const initialData = {
    AccountNo: AccountNo,
    AirwayBillNumber: "",
    RequestUser: "",
    Country: "AE",
    PrintType: "LABEL",
  };
  const [PostBatchAirWayBillData, { data, error, isLoading }] = useMultipleCreateAirwayBillMutation();
  const hanleDownloadAirwayBatchPdfFormate = async (Batch) => {
    try {
      const data = await PostBatchAirWayBillData({
        AccountNo: AccountNo,
        AirwayBillNumber: Batch,
        RequestUser: "",
        Country: "AE",
        PrintType: PrintType,
      }).unwrap()
      setMultipleAirwayBillData({ loading: false, Data: data, error: null })
      console.log("ddddddd", data.data)
      handlePdfDownload(data.data, Batch)
    } catch (error) {
      console.log("error")
      setMultipleAirwayBillData({ loading: false, Data: null, error: error.data.message })
      toast.error(error?.data?.message)
    }
  }

  const { Data, setFormData, formData, errors, handleSubmit, handleChange } =
    useFormSubmission(usePostAirwayBillPDFFormatDataMutation, {
      ...initialData,
      PrintType: PrintType,

    });

  const handleMultipleAirwayBillSubmit = async (e) => {
    e.preventDefault();
    try {
      setMultipleAirwayBillData({ error: null, loading: true, AirwayBillNumber: "" })

      // return false
      const Bearertoken = localStorage.getItem("token")
      var myHeaders = new Headers();
      myHeaders.append("authorization", "Bearer " + Bearertoken);
      var formdata = new FormData();
      formdata.append("AirwayBill", selectedFIle);
      formdata.append("AccountNo", AccountNo);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch(APi_Url + "MultipleCreateAirwayBill", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log({ status: result.statusCode })

          if (result.statusCode === 201) {
            setMultipleAirwayBillData({ loading: false, Data: result.data, error: null })
          }
          else if (result.statusCode >= 400) {
            setMultipleAirwayBillData({ loading: false, Data: null, error: result.message })
          }
        })
        .catch(error => {
          console.log("error", error)
          setMultipleAirwayBillData({ loading: false, Data: null, error: "Something is Wrong Please Try Again" })
        });
      // Handle success or any other logic
    } catch (error) {
      // Handle error
      setMultipleAirwayBillData({ loading: false, Data: null, error: "Something is wrong please try again" })
      console.log({ error })
    }
  };
  const handleBatchAirWayBillSubmit = async (e) => {
    e.preventDefault();
    try {
      await PostBatchAirWayBillData({
        AirwayBillNumber: AirwayBillNumber,
        AccountNo: AccountNo,
        RequestUser: "",
        Country: "AE",
        PrintType: PrintType,
      }).unwrap()
      // Handle success or any other logic
    } catch (error) {
      // Handle error
      console.log(error.data.message)
      // console.log({ error })
      toast.error(error?.data?.message)
    }
  };
  console.log(data, error, isLoading)
  return (
    <main id="content" role="main">
      <div className="main-content">
        <div className="container-fluid">
          <h2 className="page-title">Manage Shipping  | <PrepadAccountStatusLeftMoney/> </h2> 
          <div className="card customcss">
            <div className="card-body">
              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
                style={{ justifyContent: "center" }}
              >
                {props.userAuthData.data &&
                  props.userAuthData.data.data &&
                  props.userAuthData.data.data.user &&
                  props.userAuthData.data.data.user.dashboard &&
                  props.userAuthData.data.data.user.dashboard
                    .Airway_Bill_Generation && (
                    <Tab eventKey="home" title="Airway Bill Generation">
                      <AirWayBillGeneration
                        userAuthData={props.userAuthData}

                      />
                    </Tab>
                  )}

                {props.userAuthData.data &&
                  props.userAuthData.data.data &&
                  props.userAuthData.data.data.user &&
                  props.userAuthData.data.data.user.dashboard &&
                  props.userAuthData.data.data.user.dashboard
                    .Air_Way_bill_history &&
                  (<Tab eventKey="profile" title="Airway Bill History">
                    <AirWayBillHistory
                      userAuthData={props.userAuthData}
                      handlePdfDownload={handlePdfDownload}
                    />
                  </Tab>)}
                {
                  props.userAuthData.data &&
                  props.userAuthData.data.data &&
                  props.userAuthData.data.data.user &&
                  props.userAuthData.data.data.user.dashboard &&
                  props.userAuthData.data.data.user.dashboard
                    .Print_Airway_Bill && (
                    <Tab eventKey="contact" title="Airway Bill Print">
                      <div
                        className="row  mt-5 mb-5"
                        style={{ justifyContent: "center" }}
                      >
                        <div className="col-auto">
                          <label
                            htmlFor="inputPassword6"
                            className="col-form-label"
                          >
                            AWB Number
                          </label>
                        </div>
                        <div className="col-auto d-flex">
                          <input
                            type="text"
                            name="AirwayBillNumber"
                            onChange={(e) =>
                              handleChange("AirwayBillNumber", e.target.value)
                            }
                            value={formData["AirwayBillNumber"]}
                            id="inputPassword6"
                            className="form-control"
                            aria-describedby="passwordHelpInline"
                          />
                          <select onChange={(e) =>
                            handleChange("PrintType", e.target.value)
                          }
                            className="form-select" aria-label="Default select example">
                            <option value="LABEL">Label</option>
                            <option value="A4">A4</option>
                          </select>

                          <button onClick={handleSubmit} className="searchbb">
                            Search
                          </button>
                        </div>
                      </div>
                      <>
                        {errors.loading ? (
                          <SmalLoader />
                        ) : errors.error ? (
                          <ErrorComponent message={errors.message} />
                        ) : Data ? (
                          <div className="d-flex  ">
                            <div className="">
                              Your Bill No :{" "}
                              <span>{formData["AirwayBillNumber"]}</span>
                            </div>
                            <div className="  ">
                              <button
                                onClick={() =>
                                  handlePdfDownload(Data, formData.AirwayBillNumber)
                                }
                                className="btn btn-primary"
                              >
                                Download
                              </button>
                            </div>
                          </div>
                        ) : (
                          <span>No records Found</span>
                        )}
                      </>
                    </Tab>
                  )
                }
                {
                  props.userAuthData.data &&
                  props.userAuthData.data.data &&
                  props.userAuthData.data.data.user &&
                  props.userAuthData.data.data.user.dashboard &&
                  props.userAuthData.data.data.user.dashboard
                    .Print_Airway_Bill && (
                    <Tab eventKey="BulkAIrwaylBillPrint" title="Bulk Airway Bill Print">

                      <form onSubmit={handleBatchAirWayBillSubmit}>
                        <div
                          className="row  mt-5 mb-5"
                          style={{ justifyContent: "center" }}
                        >
                          <div className="col-lg-4 col-md-4">

                            <input
                              type="text"
                              name="AirwayBillNumber"
                              placeholder=" Batch  Number"
                              onChange={(e) => setAirwayBillNumber(e.target.value)}
                              id="inputPassword6"
                              className="form-control"
                              aria-describedby="passwordHelpInline"
                            />
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <select onChange={(e) => setPrintType(e.target.value)} className="form-select" aria-label="Default select example">
                              <option value="LABEL">Label</option>
                              <option value="A4">A4</option>
                            </select>
                          </div>
                          <div className="col-lg-4 col-md-4">

                            <button onClick={handleBatchAirWayBillSubmit} className="searchbb">
                              Search
                            </button>
                          </div>

                        </div>
                      </form>
                      <>
                        {error ? (
                          <SmalLoader />
                        ) : error ? (
                          <ErrorComponent message={error.message} />
                        ) : data ? (
                          <div className="d-flex  ">
                            <div className="">
                              Your Bill No :{" "}
                              <span>{AirwayBillNumber}</span>
                            </div>
                            <div className="  ">
                              <button
                                onClick={() =>
                                  hanleDownloadAirwayBatchPdfFormate(AirwayBillNumber)

                                }
                                className="btn btn-primary"
                              >
                                Download
                              </button>
                            </div>
                          </div>
                        ) : (
                          <span>No records Found</span>
                        )}
                      </>
                      <ManageBulkBatchNumber handlePdfDownload={handlePdfDownload} />
                    </Tab>
                  )
                }
                {props.userAuthData.data &&
                  props.userAuthData.data.data &&
                  props.userAuthData.data.data.user &&
                  props.userAuthData.data.data.user.dashboard &&
                  props.userAuthData.data.data.user.dashboard
                    .Airway_Bill_Generation && (
                    <Tab eventKey="bulk" title="Bulk Generations">
                      <>
                        <div className='row mt-5 mb-5' style={{ justifyContent: 'center' }}>
                          <div className='col-lg-6'>
                            <form onSubmit={handleMultipleAirwayBillSubmit}>
                              <div className="input-group mb-3">
                                {userData.data && userData.data.data.user.Role == "Admin" && (

                                  <input
                                    type="text"
                                    onChange={(e) => setAccountNo(e.target.value)}
                                    value={AccountNo}
                                    id="inputPassword6"
                                    className="form-control"
                                    aria-describedby="passwordHelpInline"
                                    placeholder='Account No'
                                  />
                                )}
                                <input type="file" onChange={(e) => setselectedFIle(e.target.files[0])} name="AirwayBill" className="form-control" id="inputGroupFile02" />

                                <button
                                  onClick={handleMultipleAirwayBillSubmit}
                                  className="btn btn-primary"
                                >
                                  Upload
                                </button>

                              </div>
                            </form>
                          </div>

                          <>
                            <a
                              className="btn btn-success"
                              href="https://www.c3xpress.com/Sample.xlsx"
                              download="Sample.xlsx"
                            >
                              Download Sample File
                            </a>
                          </>
                          <>
                            {MultipleAirwayBillData.loading ? (
                              <SmalLoader />
                            ) : MultipleAirwayBillData.error ? (
                              <ErrorComponent message={MultipleAirwayBillData.error} />
                            ) : MultipleAirwayBillData?.Data?.BatchNumber ? (
                              <div className="d-flex  ">
                                <div className="">
                                  Your Bill No :{" "}
                                  <span>{MultipleAirwayBillData?.Data?.BatchNumber}</span>
                                </div>
                                <div className="  ">
                                  <select onChange={(e) => setPrintType(e.target.value)} className="form-select" aria-label="Default select example">
                                    <option value="LABEL">Label</option>
                                    <option value="A4">A4</option>
                                  </select>
                                  <button
                                    onClick={() => hanleDownloadAirwayBatchPdfFormate(MultipleAirwayBillData?.Data?.BatchNumber)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <span></span>
                            )}
                          </>

                        </div>

                      </>
                    </Tab>
                  )}

              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Managingshipping;
