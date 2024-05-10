
import { useDispatch, useSelector } from 'react-redux';
import { setSchedulePickupDetails, setSchedulePickupData } from '../../redux/reducers/ShcedulePickupReducer';
import './Dashboard.css';
import { useEffect } from 'react';
import { postApi } from "../../service/axiosInterceptors"
import { usePostSchedulePickupyDataMutation } from '../../service/apiServices';
import useFormSubmission from '../../hooks/useFormSubmission';
import { InitialShcdulePickupdata } from '../../service/initialData';
import { Consignee, Shipment } from '../../service/JsxHtmlTemplates';

const Schedulepickupbooking = (props) => {
  // //console.log({props})
  const { Data, setFormData, formData, errors, handleSubmit, handleChange } = useFormSubmission(usePostSchedulePickupyDataMutation, { ...InitialShcdulePickupdata })

  const onChangeData = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      BookingData: {
        ...prevData.BookingData,
        [name]: value,
      }

    }));
  }
  // //console.log(Data,errors)
  return (
    <main id="content" role="main">
      <div className="main-content">
        <div className="container-fluid">
          <h2 className="page-title">Pickup Schedule Request</h2>
          <div className="card customcss">
            <div className="card-body">
              <form>
                <div>
                  <form>
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                          Account
                        </label>
                        <input
                          type="text"
                          name="AccountNo"
                          disabled
                          value={props?.data?.data?.full_name}
                          className="form-control"
                        />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                          Product*
                        </label>
                        <select
                          name="ProductType"
                          onChange={onChangeData}
                          value={formData["BookingData"]["ProductType"]}
                          className="form-control"
                        >
                          <option value={"XPS"}>XPS</option>
                          <option value={"SPs"}>SPs</option>
                        </select>
                      </div>
                      <div className="col-lg-6">
                        <h2 className="page-title backgorindd">Shipper</h2>
                        <div className="col-lg-12 mb-3">
                          <label htmlFor="exampleInputPassword1" className="form-label">
                            Company Name
                          </label>
                          <input
                            type="text"
                            name="SendersCompany"
                            value={formData["BookingData"]["SendersCompany"]}
                            onChange={onChangeData}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder=" Company Name"
                          />
                        </div>
                        <div className="col-lg-12 mb-3">
                          <label htmlFor="exampleInputPassword1" className="form-label">
                            Contact Name
                          </label>
                          <input
                            type="text"
                            name="SendersContactPerson"
                            value={formData["BookingData"]["SendersContactPerson"]}
                            onChange={onChangeData}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder=" Company Name"
                          />
                        </div>
                        <div className="col-lg-12 mb-3">
                          <label htmlFor="exampleInputPassword1" className="form-label">
                            Address Line 1
                          </label>
                          <input
                            type="text"
                            name="SendersAddress1"
                            value={formData["BookingData"]["SendersAddress1"]}
                            onChange={onChangeData}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder=" Company Name"
                          />
                        </div>
                        <div className="col-lg-12 mb-3">
                          <label htmlFor="exampleInputPassword1" className="form-label">
                            Address Line 2
                          </label>
                          <input
                            type="text"
                            name="SendersAddress2"
                            value={formData["BookingData"]["SendersAddress2"]}
                            onChange={onChangeData}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder=" Company Name"
                          />
                        </div>
                        <div className="col-lg-12 mb-3">
                          <label htmlFor="exampleInputPassword1" className="form-label">
                            Country
                          </label>
                          <input
                            type="text"
                            name="SendersCountry"
                            value={formData["BookingData"]["SendersCountry"]}
                            onChange={onChangeData}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder=" Company Name"
                          />
                        </div>
                        <div className="col-lg-12 mb-3">
                          <label htmlFor="exampleInputPassword1" className="form-label">
                            City
                          </label>
                          <input
                            type="text"
                            name="SendersCity"
                            value={formData["BookingData"]["SendersCity"]}
                            onChange={onChangeData}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder=" Company Name"
                          />
                        </div>
                        <div className="col-lg-12 mb-3">
                          <label htmlFor="exampleInputPassword1" className="form-label">
                            Phone
                          </label>
                          <input
                            type="text"
                            name="SendersPhone"
                            value={formData["BookingData"]["SendersPhone"]}
                            onChange={onChangeData}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder=" Company Name"
                          />
                        </div>
                        <div className="col-lg-12 mb-3">
                          <label htmlFor="exampleInputPassword1" className="form-label">
                            Mobile
                          </label>
                          <input
                            type="text"
                            name="SendersMobile"
                            value={formData["BookingData"]["SendersMobile"]}
                            onChange={onChangeData}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder=" Company Name"
                          />
                        </div>
                        <div className="col-lg-12 mb-3">
                          <label htmlFor="exampleInputPassword1" className="form-label">
                            Email
                          </label>
                          <input
                            type="text"
                            name="SendersEmail"
                            value={formData["BookingData"]["SendersEmail"]}
                            onChange={onChangeData}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder=" Company Name"
                          />
                        </div>
                        <div className="col-lg-12 mb-3">
                          <label htmlFor="exampleInputPassword1" className="form-label">
                            Country
                          </label>
                          <input
                            type="text"
                            name="SendersCountry"
                            value={formData["BookingData"]["SendersCountry"]}
                            onChange={onChangeData}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder=" Company Name"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <h2 className="page-title backgorindd">Consignee</h2>
                        {Consignee.map((data, index) => (
                          <div className="col-lg-12 mb-3">
                            <label
                              htmlFor={"exampleInputPassword1" + index}
                              className="form-label"
                              key={index}
                            >
                              {data.label}
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder={" " + data.label}
                                name={data.name}
                                onChange={onChangeData}
                                value={formData["BookingData"][data.name]}
                                readOnly
                              />
                            </label>
                          </div>
                        ))}
                        <div className="col-lg-12 mb-3">
                          <label htmlFor="exampleInputPassword1" className="form-label">
                            Shippment Type*
                          </label>
                          <select className="form-control">
                            <option>abcds</option>
                            <option>abcds</option>
                            <option>abcds</option>
                            <option>abcds</option>
                          </select>
                        </div>
                        <div className="col-lg-12 mb-3">
                          <label htmlFor="exampleInputPassword1" className="form-label">
                            Product*
                          </label>
                          <select className="form-control">
                            <option>abcds</option>
                            <option>abcds</option>
                            <option>abcds</option>
                            <option>abcds</option>
                          </select>
                        </div>

                      </div>
                      <div className="col-lg-12">
                        <h2 className="page-title backgorindd">Shipment Information</h2>
                        <div className="row">
                          {Shipment.map((data, index) => (
                            <div className="col-lg-6 mb-3">
                              <label htmlFor="exampleInputEmail1" className="form-label">
                                {data.label}
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder={" " + data.label}
                                name={data.name}
                                onChange={onChangeData}
                                value={formData["BookingData"][data.name]}
                              />
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="btn btn-primary"
                          style={{ marginRight: "10px", marginLeft: "5px" }}
                        >
                          Submit
                        </button>
                        <button
                          type="button"

                          className="btn btn-danger"
                        >
                          Reset
                        </button>
                        {errors.loading ? (<span>{"wait"}</span>) : errors.error ? (<span className="text-danger">{errors.message}</span>) : (<span className="text-success">{errors.message}</span>)}
                      </div>

                    </div>
                  </form>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>

  );
};

export default Schedulepickupbooking;