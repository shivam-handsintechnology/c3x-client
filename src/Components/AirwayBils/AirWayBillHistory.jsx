import { Tab } from "bootstrap";
import React, { useEffect, useRef, useState } from "react";
import { useGetShipmentHistoryDataMutation, usePostAirwayBillPDFFormatDataMutation, usePostCityListMutation, useGetUserServiceTypesDataQuery } from "../../service/apiServices";
import { ManageShipingIntialData } from "../../service/initialData";
import useDataFetch from "../../hooks/DataFetchHook";
import usePagination from "../../hooks/UsePagination";
import { downloadExcel, DownloadTableExcel } from "react-export-table-to-excel";
import moment from "moment";
import useFormSubmission from "../../hooks/useFormSubmission";
import MyComponent from "../MyComponent";
import UsePagination from "../../hooks/UsePagination";
import SmalLoader from "../../heplers/Loaders/SmallLoader";
import ProtectComponent from "../Common/ProtectComponent";
import ErrorComponent from "../../heplers/ErrorComponent";
import Loader from "../../heplers/Loaders/Loader";
import { useSelector } from "react-redux";
const fieldsToReset = [
  { value: "AirWayBillNo", label: "AirWay Bill No" },
  { value: "Consignee", label: "Consignee" },
  { value: "ConsigneeCity", label: "Consignee City" },
  { value: "ConsigneeName", label: "Consignee Name" },
  { value: "ConsigneePhone", label: "Consignee Phone" },
  { value: "ServiceType", label: "ServiceType" },
  { value: "Shipper", label: "Shipper" },
  { value: "ShipperPhone", label: "Shipper Phone" },
  { value: "ShipperReference", label: "Shipper Reference" },
];
// import ReactPaginate from "react-paginate";
const AirWayBillHistory = ({ userAuthData, handlePdfDownload }) => {
  const { data, error, isLoading, refetch } = useGetUserServiceTypesDataQuery();
  const CityHandle = useFormSubmission(usePostCityListMutation, { Country: "" })
  const userData = useSelector((state) => state.UserReducer);

  const PdfForm = useFormSubmission(usePostAirwayBillPDFFormatDataMutation, {
    AirwayBillNumber: "",
    RequestUser: "",
    Country: "AE",
    PrintType: "LABEL",
    AccountNo: userAuthData.data && userAuthData.data.data.user.AccountNo,

  });
  const [Status, setStatus] = useState("all")
  const tableRef = useRef(null);
  let { Data, setFormData, formData, errors, handleSubmit } =
    useFormSubmission(
      useGetShipmentHistoryDataMutation,
      { ...ManageShipingIntialData, AccountNo: userAuthData.data && userAuthData.data.data.user.AccountNo }
    );
  const [currentData, setcurrentMovies] = useState([]);
  const [fieldname, setfieldname] = useState("AirWayBillNo");
  // Number of items to display per page
  const { pageComponent, setNumberOfPages, pageNumber, itemsPerPage } = UsePagination()

  useEffect(() => {
    // For All Data Sources
    console.log("Data", Data)
    if (Data && Data.AwbList && Data.AwbList.length > 0) {
      let data = Status !== "all" ? Data.AwbList.filter((item) => item.Status == Status) : Data.AwbList
      setNumberOfPages(Math.ceil(data.length / itemsPerPage))
      setcurrentMovies(data.slice((pageNumber - 1) * itemsPerPage, (pageNumber - 1) * itemsPerPage + itemsPerPage))
    } else {
      setNumberOfPages(0)
    }

  }, [pageNumber, Data, itemsPerPage, Status])

  const handleChange = (event) => {
    const { name, value } = event.target;

    // List of fields with labels and default values to reset


    // If the current field is in the fieldsToReset list, reset the other fields
    if (fieldsToReset.some(field => field.value === name)) {
      setFormData(prev => {
        // Iterate through fieldsToReset and reset their values
        const resetFields = fieldsToReset.reduce((acc, field) => {
          if (prev.hasOwnProperty(field.value)) {
            acc[field.value] = ""; // Set each field to its default value (empty string)
          }
          return acc;
        }, {});

        // Return the updated form data with reset fields and the updated current field
        return {
          ...prev,
          ...resetFields,
          [name]: value // Set the new value for the field being changed
        };
      });
      return;
    }

    // For all other fields, update their value as usual
    setFormData(prev => ({ ...prev, [name]: value }));
  };



  function handleDownloadExcel() {
    if (!Data || (Data && Data.AwbList.length === 0)) {
      alert("Data is not available");
    } else {

      let data = Data.AwbList.map((item) => {
        const { Rate, ...rest } = item
        return rest;
      });
      let header = Object.keys(data[0])



      downloadExcel({
        fileName: "AirwayBillHistory" + moment().format("DD-MM-YYYY"),
        sheet: "react-export-table-to-excel",
        tablePayload: {
          header: header,
          body: data,
        },
      });
    }
  }

  useEffect(() => {
    PdfForm.Data && handlePdfDownload(PdfForm.Data, PdfForm.formData.AirwayBillNumber)
  }, [PdfForm.Data])
  useEffect(() => {
    PdfForm.handleSubmit()
  }, [PdfForm.formData.AirwayBillNumber])
  useEffect(() => {
    CityHandle.handleSubmit()
  }, [])
  const startIndex = (pageNumber - 1) * itemsPerPage;

  return (
    < >
      <div className="row mb-5 mt-4" style={{ alignItems: 'center' }}>
        {userData.data && userData.data.data.user.Role == "Admin" && (<div className="col-lg-3 ">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Account No
          </label>
          <input
            type="text"
            name="AccountNo"

            value={formData.AccountNo}
            className="form-control"
            placeholder="Account No"
            readOnly={userData.data && userData.data.data.user.Role == "Admin" ? false : true}
            onChange={handleChange}

          />
        </div>)}

        <div className="col-lg-3 ">
          <label htmlFor="exampleInputEmail1" className="form-label">
            From Date*
          </label>
          <input
            type="date"
            name="ShipmentFromDate"
            value={
              formData.ShipmentFromDate
            }
            onChange={handleChange}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="col-lg-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            To Date*
          </label>
          <input
            name="ShipmentToDate"
            value={
              formData.ShipmentToDate
            }
            onChange={handleChange}
            type="date"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="col-lg-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            {fieldsToReset.find((item) => item.value === fieldname).label}
          </label>
          <select value={fieldname} name={fieldname} onChange={(e) => {
            setfieldname(e.target.value)
            setFormData(prev => ({ ...prev, [fieldname]: "" }));
          }}>
            {
              fieldsToReset.map((item) => (
                <option value={item.value}>
                  {item.label}
                </option>
              ))
            }
          </select>
          {
            fieldname === "ConsigneeCity" ?
              (<select
                name={fieldname}
                value={formData[fieldname]}
                onChange={handleChange}
                className="form-control"
              >
                <option value={""}>Select City</option>
                {!CityHandle.errors.loading &&
                  CityHandle.Data && CityHandle.Data.CityListLocation &&
                  CityHandle.Data.CityListLocation.length > 0 ?
                  CityHandle.Data.CityListLocation.map((item, index) => (
                    <option value={item.CityCode} >{item.CityName}</option>
                  )) : <option value={""}>No City Found</option>
                }
              </select>
              )

              : fieldname === "ServiceType" ? (
                <select
                  className="form-control"
                  name={fieldname}
                  value={formData[fieldname]}
                  onChange={handleChange}
                >
                  <option value={""}>Select Service Type</option>
                  {data && data.data.ServiceType && data.data.ServiceType.length > 0 ? data?.data?.ServiceType.map((item, index) => {
                    return <option value={item.value}>{item.title}</option>;
                  }) : <option> No Options Available</option>}
                </select>
              )
                : (

                  <input
                    type="text"
                    name={fieldname}
                    value={formData[fieldname]}
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="search "
                    placeholder="Search"
                  />
                )
          }
        </div>
        {/* <div className="col-lg-3 mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">
        Status
      </label>
      <select
        className="form-control"
        value={""}
        //  onChange={handleStatusChange}
      >
        <option value="Active">Active</option>
        <option value="InActive">InActive</option>
      </select>
    </div> */}
        <div className="col-lg-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
          </label>
          <br />
          <button
            type="button"
            onClick={handleSubmit}
            className=" btn btn-danger"
            style={{ marginRight: "10px", marginLeft: "5px" }}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleDownloadExcel}
            className="btn btn-secondary "
          >
            Export
          </button>
        </div>
      </div>
      {errors.loading ? <Loader /> : errors.error ? (<ErrorComponent message={errors.message} />) : (<>
        {currentData.length > 0 && (
          <select value={Status} onChange={(e) => {

            if (e.target.value === "Pending") {
              setStatus("Pending")
            } else if (e.target.value === "Delivered") {
              setStatus("Delivered")
            } else {
              setStatus("all")
            }
          }}>
            <option value="all">All</option>
            <option value="Delivered">Delivered</option>
            <option value="Pending">Pending</option>
          </select>
        )}


        <table ref={tableRef} className="table table-bordered table-data">
          <thead className="table-head">
            <tr className="table-head">
              <th scope="col">Sr.No</th>
              <th scope="col">Date</th>
              <th scope="col">Airway Bill No</th>
              <th scope="col">Ref</th>
              <th scope="col">Shipper</th>
              <th scope="col">Country</th>
              <th scope="col">Consignee</th>
              <th scope="col"> City</th>
              {/* <th scope="col">Consignee Country</th> */}
              <th scope="col">Pieces</th>
              <th scope="col">Weight</th>
              <th scope="col">COD Amt</th>
              <th scope="col">Service Type</th>
              <th scope="col">Status</th>
              {!userAuthData && userAuthData.isLoading && userAuthData && userAuthData.data &&
                userAuthData && userAuthData.data.data.AccountData.PayTypeDescription === "Prepaid" &&
                (<th scope="col">Rate</th>)}

              <th scope="col">Download</th>
            </tr>
          </thead>
          <tbody>
            {errors.loading ? (
              <tr>
                <td colSpan="3"><SmalLoader /></td>
              </tr>
            ) : errors.error ? (
              <></>
            ) : (
              currentData &&
                currentData.length > 0 ?
                currentData.map((item, index) => (
                  <tr key={item.Awbno}>
                    <td>{startIndex + index + 1}</td>
                    <td>{item.Dated}</td>
                    <td style={{ width: item.Awbno.length }}>{item.Awbno}</td>
                    <td>{item.ShipperReference}</td>
                    <td>{item.Shipper}</td>
                    <td>{item.OriginName}</td>
                    <td>{item.Consignee}</td>
                    <td>{item.DestinationName}</td>
                    {/* <td>{item.DestinationName}</td> */}
                    <td>{item.PCS}</td>
                    <td>{item.Weight}</td>
                    <td>{item.CODAmount}</td>
                    <td style={{ width: item.ServiceType.length }}>{item.ServiceType}</td>
                    <td>{item.Status}</td>
                    {!userAuthData && userAuthData.isLoading && userAuthData && userAuthData.data &&
                      userAuthData && userAuthData.data.data.AccountData.PayTypeDescription === "Prepaid" &&
                      (<td>{item.Rate}</td>)}

                    <td>

                      <button className="download-button " onClick={() => {
                        PdfForm.setFormData(prev => ({ ...prev, AirwayBillNumber: item.Awbno, }))

                      }} style={{ border: "none" }}>
                        {" "}
                        <i class="fa fa-download" aria-hidden="true"></i>
                      </button>

                    </td>
                  </tr>
                )) : <tr>
                  <td colSpan="3">{"No Records Found"}</td>
                </tr>
            )}
          </tbody>
        </table>
      </>)}

      <>
      </>
      {pageComponent()}
    </>
  );
};

export default AirWayBillHistory;
