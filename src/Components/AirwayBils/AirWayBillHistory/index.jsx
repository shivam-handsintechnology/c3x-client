import React, { useEffect, useRef, useState } from "react";
import { useGetShipmentHistoryDataMutation, usePostAirwayBillPDFFormatDataMutation, useTrackByTrackingMutation, usePostCityListMutation, useGetUserServiceTypesDataQuery } from "../../../service/apiServices";
import { ManageShipingIntialData } from "../../../service/initialData";
import useFormSubmission from "../../../hooks/useFormSubmission";
import UsePagination from "../../../hooks/UsePagination";
import { downloadExcel } from "react-export-table-to-excel";
import moment from "moment";
import TransactionHistory from "./TransactionHistory";
import { useDispatch, useSelector } from "react-redux";
import ErrorComponent from "../../../heplers/ErrorComponent";
import Loader from "../../../heplers/Loaders/Loader";
import SmalLoader from "../../../heplers/Loaders/SmallLoader";
import { setTrackingDetails } from "../../../redux/reducers/TrackingDetailsReducer";
import { fieldsToReset } from "../../../utils/data.json"

const AirWayBillHistory = ({ userAuthData, handlePdfDownload }) => {
  const dispatch = useDispatch()
  const [trackByTracking] = useTrackByTrackingMutation();
  const { data: serviceTypesData } = useGetUserServiceTypesDataQuery();
  const CityHandle = useFormSubmission(usePostCityListMutation, { Country: "" });
  const userData = useSelector((state) => state.UserReducer);
  const PdfForm = useFormSubmission(usePostAirwayBillPDFFormatDataMutation, {
    AirwayBillNumber: "",
    RequestUser: "",
    Country: "AE",
    PrintType: "LABEL",
    AccountNo: userAuthData?.data?.data?.user?.AccountNo,
  });

  const [status, setStatus] = useState("all");
  const tableRef = useRef(null);
  const { Data, setFormData, formData, errors, handleSubmit } = useFormSubmission(
    useGetShipmentHistoryDataMutation,
    { ...ManageShipingIntialData, AccountNo: userAuthData?.data?.data?.user?.AccountNo }
  );
  const [currentData, setCurrentData] = useState([]);
  const [fieldName, setFieldName] = useState("AirWayBillNo");
  const { pageComponent, setNumberOfPages, pageNumber, itemsPerPage } = UsePagination();
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const [selectedAwbNoDetails, setSelectedAwbNoDetails] = useState(null);

  useEffect(() => {
    if (Data?.AwbList?.length > 0) {
      const filteredData = status !== "all" ? Data.AwbList.filter((item) => item.Status === status) : Data.AwbList;
      setNumberOfPages(Math.ceil(filteredData.length / itemsPerPage));
      setCurrentData(filteredData.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage));
    } else {
      setNumberOfPages(0);
    }
  }, [pageNumber, Data, itemsPerPage, status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (fieldsToReset.some(field => field.value === name)) {
      setFormData(prev => ({
        ...prev,
        ...fieldsToReset.reduce((acc, field) => ({ ...acc, [field.value]: "" }), {}),
        [name]: value
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDownloadExcel = () => {
    if (!Data?.AwbList?.length) {
      alert("Data is not available");
    } else {
      const data = Data.AwbList.map(({ Rate, ...rest }) => rest);
      const header = Object.keys(data[0]);
      downloadExcel({
        fileName: `AirwayBillHistory${moment().format("DD-MM-YYYY")}`,
        sheet: "react-export-table-to-excel",
        tablePayload: { header, body: data },
      });
    }
  };

  const handleModal = async (awbNo) => {

    try {
      dispatch(setTrackingDetails({ error: false, loading: true }));

      setShowTransactionHistory(true);
      const data = {
        "TrackingAWB":
          [
            {
              "AirWayBillNo": awbNo.Awbno
            }
          ],
      }
      const res = await trackByTracking(data).unwrap()

      dispatch(setTrackingDetails({
        data: res.data.AirwayBillTrackList,
        error: false,
        loading: false,
      }));
      setSelectedAwbNoDetails(awbNo);
    } catch (error) {
      console.log("error>>>", error)
      dispatch(setTrackingDetails({ error: true, loading: false }));
    }
  };

  const closeTransactionHistory = () => {
    setShowTransactionHistory(false);
    setSelectedAwbNoDetails(null);
  };

  useEffect(() => {
    if (PdfForm.Data) handlePdfDownload(PdfForm.Data, PdfForm.formData.AirwayBillNumber);
  }, [PdfForm.Data]);

  useEffect(() => {
    PdfForm.handleSubmit();
  }, [PdfForm.formData.AirwayBillNumber]);

  useEffect(() => {
    CityHandle.handleSubmit();
  }, []);

  const renderInputField = () => {
    if (fieldName === "ConsigneeCity") {
      return (
        <select name={fieldName} value={formData[fieldName]} onChange={handleChange} className="form-control">
          <option value="">Select City</option>
          {CityHandle.Data?.CityListLocation?.map((item, index) => (
            <option key={index} value={item.CityCode}>{item.CityName}</option>
          ))}
        </select>
      );
    } else if (fieldName === "ServiceType") {
      return (
        <select name={fieldName} value={formData[fieldName]} onChange={handleChange} className="form-control">
          <option value="">Select Service Type</option>
          {serviceTypesData?.data?.ServiceType?.map((item, index) => (
            <option key={index} value={item.value}>{item.title}</option>
          ))}
        </select>
      );
    } else {
      return (
        <input
          type="text"
          name={fieldName}
          value={formData[fieldName]}
          onChange={handleChange}
          className="form-control"
          placeholder="Search"
        />
      );
    }
  };

  return (
    <>
      <div className="row mb-5 mt-4" style={{ alignItems: 'center' }}>
        {userData.data?.data?.user?.Role === "Admin" && (
          <div className="col-lg-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Account No</label>
            <input
              type="text"
              name="AccountNo"
              value={formData.AccountNo}
              className="form-control"
              placeholder="Account No"
              readOnly={userData.data?.data?.user?.Role !== "Admin"}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="col-lg-3">
          <label htmlFor="exampleInputEmail1" className="form-label">From Date*</label>
          <input
            type="date"
            name="ShipmentFromDate"
            value={formData.ShipmentFromDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-lg-3">
          <label htmlFor="exampleInputPassword1" className="form-label">To Date*</label>
          <input
            name="ShipmentToDate"
            value={formData.ShipmentToDate}
            onChange={handleChange}
            type="date"
            className="form-control"
          />
        </div>
        <div className="col-lg-3">
          <select
            value={fieldName}
            onChange={(e) => {
              setFieldName(e.target.value);
              setFormData(prev => ({ ...prev, [fieldName]: "" }));
            }}
          >
            {fieldsToReset.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
          {renderInputField()}
        </div>
        <div className="col-lg-3">
          <label htmlFor="exampleInputEmail1" className="form-label"></label>
          <br />
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-danger"
            style={{ marginRight: "10px", marginLeft: "5px" }}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleDownloadExcel}
            className="btn btn-secondary"
          >
            Export
          </button>
        </div>
      </div>

      {errors.loading ? (
        <Loader />
      ) : errors.error ? (
        <ErrorComponent message={errors.message} />
      ) : (
        <>
          {currentData.length > 0 && (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
            </select>
          )}

          {showTransactionHistory && selectedAwbNoDetails && Object.keys(selectedAwbNoDetails).length > 0 ? (
            <TransactionHistory AwbDetails={selectedAwbNoDetails} onClose={closeTransactionHistory} />
          ) : (
            <div>
              <table ref={tableRef} className="table table-bordered table-data">
                <thead className="table-head">
                  <tr>
                    <th scope="col">Sr.No</th>
                    <th scope="col">Date</th>
                    <th scope="col">Airway Bill No</th>
                    <th scope="col">Ref</th>
                    <th scope="col">Shipper</th>
                    <th scope="col">Country</th>
                    <th scope="col">Consignee</th>
                    <th scope="col">City</th>
                    <th scope="col">Pieces</th>
                    <th scope="col">Weight</th>
                    <th scope="col">COD Amt</th>
                    <th scope="col">Service Type</th>
                    <th scope="col">Status</th>
                    {userAuthData?.data?.data?.AccountData?.PayTypeDescription === "Prepaid" && (
                      <th scope="col">Rate</th>
                    )}
                    <th scope="col">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {errors.loading ? (
                    <tr>
                      <td colSpan="3"><SmalLoader /></td>
                    </tr>
                  ) : errors.error ? (
                    <tr>
                      <td colSpan="3">Error occurred</td>
                    </tr>
                  ) : (
                    currentData.map((item, index) => (
                      <tr key={item.Awbno}>
                        <td>{(pageNumber - 1) * itemsPerPage + index + 1}</td>
                        <td>{item.Dated}</td>
                        <td style={{ cursor: "pointer" }} onClick={() => handleModal(item)}>{item.Awbno}</td>
                        <td>{item.ShipperReference}</td>
                        <td>{item.Shipper}</td>
                        <td>{item.OriginName}</td>
                        <td>{item.Consignee}</td>
                        <td>{item.DestinationName}</td>
                        <td>{item.PCS}</td>
                        <td>{item.Weight}</td>
                        <td>{item.CODAmount}</td>
                        <td>{item.ServiceType}</td>
                        <td>{item.Status}</td>
                        {userAuthData?.data?.data?.AccountData?.PayTypeDescription === "Prepaid" && (
                          <td>{item.Rate}</td>
                        )}
                        <td>
                          <button
                            className="download-button"
                            onClick={() => PdfForm.setFormData(prev => ({ ...prev, AirwayBillNumber: item.Awbno }))}
                            style={{ border: "none" }}
                          >
                            <i className="fa fa-download" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
      {pageComponent()}
    </>
  );
};

export default AirWayBillHistory;