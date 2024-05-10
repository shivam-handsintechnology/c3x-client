import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useGetServiceTypesDataQuery, usePostCityListMutation, useGetCountryMasterQuery } from "../../service/apiServices";
import Loader from "../../heplers/Loaders/Loader";
import useFormSubmission from "../../hooks/useFormSubmission";
const UsersData = (props) => {
  const CountryMaster = useGetCountryMasterQuery(props.formData.address && props.formData.address?.Country ? props.formData?.address.Country : "");
  const CityHandle = useFormSubmission(usePostCityListMutation, { Country: props.formData?.address?.Country })

  let UserData = useSelector((state) => state.UserReducer);
  const onChangeData = (e) => {
    const { name, checked } = e.target
    props.setFormData((prevData) => ({
      ...prevData,
      dashboard: {
        ...prevData.dashboard,
        [name]: checked,
      },
    }));
  };
  const { isAdmin, isAuth } = props
  const updateStatus = async (e, item) => {
    e.preventDefault();
    try {
      const res = await props
        .mutateUpdate({
          _id: item._id,
          isActive: e.target.checked,
        })
        .unwrap();
      props.setIsDelete(res);
    } catch (error) {
      console.error({ error });
    }
  };
  const handleChnageAddress = (name, value) => {
    props.setFormData(prev => ({ ...prev, address: { ...prev.address, [name]: value } }))
  }
  useEffect(() => {
    props.formData._id && CountryMaster.refetch()
  }, [props.formData?._id])
  useEffect(() => {
    if (props.formData.address && props.formData.address.Country) {
      CityHandle.setFormData({ Country: props.formData?.address?.Country })
    }
  }, [props.formData?.address?.Country])
  useEffect(() => {
    if (props.formData?.address?.Country) {
      CityHandle.handleSubmit()
    }
  }, [CityHandle.formData])
  console.log("address data", props.formData?.address)

  const { data, error, isLoading, refetch } = useGetServiceTypesDataQuery("");
  console.log("props", props)
  return (
    <div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Sr.No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Account Number</th>
            {/* {UserData && UserData.data.data.user.Role == "Admin" && <th scope="col">Role</th>}  */}
            <th scope="col">Status</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.isLoading ? (
            <Loader />
          ) : props.error ? (
            <tr>
              <td colSpan="6">{"No Records Found"}</td>
            </tr>
          ) : (
            props.data.data.users.length > 0 &&
            props.data.data.users.map((item, index) => (
              <tr key={item._id}>
                <td>{props.startIndex + index + 1}</td>
                <td>{item.full_name}</td>
                <td>{item.email}</td>
                <td>{item.AccountNo}</td>
                {/* {UserData && UserData.data.data.user.Role == "Admin" && ( <td>
                  <div className="form-check  form-switch " style={{ display: "flex", justifyContent: "center" }}>
                    <select className="form-control" name="Role" value={item.Role} onChange={(e) => updateRole(item._id, e.target.value)}>
                      <option value={"User"}>Customer</option>
                      <option value={"Admin"}>Admin</option>
                    </select>
                  </div>
                </td>)} */}

                <td>
                  <div className="form-check  form-switch " style={{ display: "flex", justifyContent: "center" }}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"

                      checked={item.isActive}
                      onChange={(e) => updateStatus(e, item)}
                    />
                  </div>
                </td>
                <td>
                  <Button variant="primary" onClick={() => {
                    props.handleShow()
                    props.setFormData(item)
                  }}>
                    Edit
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => props.deleteUser(item._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>



      <Modal size={"lg"} show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '18px' }}>Edit {props.isAdmin ? "Add User" : "Sub User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body><form method="post" onSubmit={props.handleSubmit}>
          {props.formData && (
            <div className="footer_form_outer">
              <label className="form-label">Full Name</label>
              <input
                placeholder={"Full Name"}
                name="Senders Contact Person"
                className="form-control mb-3"
                value={props.formData?.address?.SendersContactPerson}
                onChange={(e) => props.setFormData(prev => ({ ...prev, address: { ...prev.address, SendersContactPerson: e.target.value } }))}
                autoComplete="off"

                required=""
                type="text"
              />
              <label className="form-label">UserName</label>
              <input
                placeholder={"UserName"}
                name="username"
                className="form-control mb-3"
                value={props.formData["username"]}
                onChange={(e) => props.setFormData(prev => ({ ...prev, username: e.target.value }))}
                autoComplete="off"

                required=""
                type="text"
              />
              <label className="form-label">Password</label>
              <input
                placeholder={"Password"}
                name="password"
                className="form-control mb-3"
                value={props.formData["password"]}
                onChange={(e) => props.setFormData(prev => ({ ...prev, password: e.target.value }))}
                autoComplete="off"
                required=""
                type="text"
              />
              <label className="form-label">Account No</label>
              <input
                placeholder={"Account No"}
                name="AccountNo"
                className="form-control"
                value={props.formData["AccountNo"]}
                onChange={(e) => props.setFormData(prev => ({ ...prev, AccountNo: e.target.value }))}
                autoComplete="off"

                required=""
                type="text"
              />
              <label htmlFor="exampleInputEmail1" className="form-label">
                Country
              </label>
              <select
                name="Country"
                onChange={(e) => handleChnageAddress(e.target.name, e.target.value)}
                value={props.formData?.address?.Country}
                className="form-control"
              >
                <option value={""}>Select Country</option>
                {!CountryMaster.isLoading && CountryMaster.data.data.CountryListLocation
                  && CountryMaster.data.data.CountryListLocation.length > 0 &&
                  CountryMaster.data.data.CountryListLocation.map((item, index) => (
                    <option value={item.CountryCode}>{item.CountryName}</option>
                  ))}
              </select>

              <label htmlFor="exampleInputEmail1" className="form-label">
                City
              </label>
              <select
                name="City"

                onChange={(e) => {
                  const selectedOption = e.target.options[e.target.selectedIndex]
                  const selectedId = selectedOption.getAttribute("id");
                  handleChnageAddress("Origin", selectedId)
                  handleChnageAddress(e.target.name, e.target.value)
                }}
                value={props.formData?.address?.City}
                className="form-control"
              >
                <option value={""}>Select City</option>
                {!CityHandle.errors.loading &&
                  CityHandle.Data && CityHandle.Data.CityListLocation &&
                  CityHandle.Data.CityListLocation.length > 0 ?
                  CityHandle.Data.CityListLocation.map((item, index) => (
                    <option value={item.CityName} id={item.CityCode}>{item.CityName}</option>
                  )) : <option value={""}>City Not Found</option>
                }
              </select>

              <label htmlFor="exampleInputEmail1" className="form-label">
                Phone
              </label>
              <PhoneInput
                className="form-control"
                name="phone_number"
                value={props.formData?.address?.phone_number}
                international
                placeholder="Phone  Number"
                //  defaultCountry={props.formData?.address?.Country}
                onChange={(v) => {
                  handleChnageAddress("phone_number", v);
                }}
              />


              <label htmlFor="exampleInputEmail1" className="form-label">
                Telephone Number
              </label>
              <PhoneInput
                className="form-control"
                name="telephone_number"
                value={props.formData?.address?.telephone_number}
                international
                placeholder="telephone number"
                // defaultCountry={props.formData?.address?.telephone_number}
                onChange={(v) => {
                  handleChnageAddress("telephone_number", v);
                }}
              />
              <div className="row">
                {UserData && UserData.data.data.user.Role == "User" && <div className={"col-lg-12 col-md-12"} style={{ marginTop: "30px" }}>
                  <table className="table" style={{ border: "none" }}>
                    <thead>
                      <tr style={{ backgroundColor: "palegoldenrod" }}>
                        <th scope="col" style={{ color: 'white', backgroundColor: 'rgb(44 162 198)' }}>
                          Menu
                        </th>
                        <th scope="col" style={{ color: 'white', backgroundColor: 'rgb(44 162 198)' }}>
                          Function
                        </th>
                        <th
                          style={{ color: 'white', backgroundColor: 'rgb(44 162 198)' }}
                          className="width-450"
                        />
                        <th
                          scope="col"
                          style={{ color: 'white', backgroundColor: 'rgb(44 162 198)' }}
                          className="text-center"
                        >
                          Accessibility
                        </th>
                      </tr>
                    </thead>
                    <tbody>

                      {/* <tr>
                          <td className="text-uppercase">MANAGE SUB USERS</td>
                          <td>Manage Sub Users</td>
                          <td className="width-450" />
                          <td>
                            <div
                              className="custom-control custom-checkbox mb-3 accesibilityy"
                              style={{ justifyContent: "center", display: "flex" }}
                            >
                              <input
                                type="checkbox"
                                id="manage_sub_users"
                                checked={props.formData.dashboard.Manage_Sub_Users}
                                onChange={onChangeData}
                                name="Manage_Sub_Users"
                                className="custom-control-input create-booking"

                                defaultValue="Manage Sub Users"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="manage_sub_users"
                              />
                            </div>
                          </td>
                        </tr> */}


                      <tr>
                        <td className="text-uppercase">
                          Pickup Request
                        </td>
                        <td>Create Booking</td>
                        <td className="width-450" />
                        <td>
                          <div
                            className="custom-control custom-checkbox mb-3 accesibilityy"
                            style={{ justifyContent: "center", display: "flex" }}
                          >
                            <input
                              type="checkbox"
                              id="manage_sub_users"
                              checked={props.formData.dashboard.Pickup_Request}
                              onChange={onChangeData}
                              name="Pickup_Request"
                              className="custom-control-input create-booking"

                              defaultValue="Manage Sub Users"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="manage_sub_users"
                            />
                          </div>
                        </td>
                      </tr>



                      <tr>
                        <td className="text-uppercase">PICKUP HISTORY </td>
                        <td>View Booking History</td>
                        <td className="width-450" />
                        <td>
                          <div
                            className="custom-control custom-checkbox mb-3 accesibilityy"
                            style={{ justifyContent: "center", display: "flex" }}
                          >
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="view_booking_history"
                              checked={props.formData.dashboard.Pickup_History}
                              onChange={onChangeData}
                              name="Pickup_History"
                              defaultValue="View booking history"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="view_booking_history"
                            />
                          </div>
                        </td>
                      </tr>


                      <tr>
                        <td className="text-uppercase">PRINT AIRWAYBILL</td>
                        <td>Print Airway Bill </td>
                        <td className="width-450" />
                        <td>
                          <div
                            className="custom-control custom-checkbox mb-3 accesibilityy"
                            style={{ justifyContent: "center", display: "flex" }}
                          >
                            <input
                              type="checkbox"
                              id="print_airway_bill"
                              className="custom-control-input"
                              checked={props.formData.dashboard.Print_Airway_Bill}
                              onChange={onChangeData}
                              name="Print_Airway_Bill"
                              defaultValue="Print airway bill"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="print_airway_bill"
                            />
                          </div>
                        </td>
                      </tr>



                      <tr>
                        <td className="text-uppercase">AIRWAY BILL GENERATION </td>
                        <td>Pickup With AWB</td>
                        <td className="width-450" />
                        <td>
                          <div
                            className="custom-control custom-checkbox mb-3 accesibilityy"
                            style={{ justifyContent: "center", display: "flex" }}
                          >
                            <input
                              type="checkbox"
                              id="pickup_with_awb"
                              checked={props.formData.dashboard.Airway_Bill_Generation}
                              onChange={onChangeData}
                              className="custom-control-input"
                              name="Airway_Bill_Generation"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="pickup_with_awb"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="text-uppercase">AIRWAY BILL HISTORY</td>
                        <td>View AWB Booking History</td>
                        <td className="width-450" />
                        <td>
                          <div
                            className="custom-control custom-checkbox mb-3 accesibilityy"
                            style={{ justifyContent: "center", display: "flex" }}
                          >
                            <input
                              type="checkbox"
                              id="view_awb_booking_history"
                              className="custom-control-input"
                              name="Air_Way_bill_history"
                              checked={props.formData.dashboard.Air_Way_bill_history}
                              onChange={onChangeData}
                              defaultValue="View awb booking history"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="view_awb_booking_history"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>}

                {
                  isAdmin && <>
                    <div className="col-md-12 col-lg-12" style={{ marginTop: "30px" }}>
                      <table className="table" style={{ border: "none" }}>
                        <thead>
                          <tr style={{ backgroundColor: "palegoldenrod" }}>
                            <th scope="col" style={{ color: 'white', backgroundColor: 'rgb(44 162 198)' }}>
                              Service Type Name
                            </th>
                            <th scope="col" style={{ color: 'white', backgroundColor: 'rgb(44 162 198)' }}>
                              Service Type Value
                            </th>
                            <th
                              style={{ color: 'white', backgroundColor: 'rgb(44 162 198)' }}
                              className="width-450"
                            />
                            <th
                              scope="col"
                              style={{ color: 'white', backgroundColor: 'rgb(44 162 198)' }}
                              className="text-center"
                            >
                              Accessibility
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data && data.data.ServiceType && data.data.ServiceType.length > 0 && data.data.ServiceType.map((item, index) => (
                            <tr>
                              <td className="text-uppercase">{item.title}</td>
                              <td>{item.value}</td>
                              <td className="width-450" />
                              <td>
                                <div
                                  className="custom-control custom-checkbox mb-3 accesibilityy"
                                  style={{ justifyContent: "center", display: "flex" }}
                                >
                                  <input
                                    type="checkbox"
                                    id="manage_sub_users"
                                    checked={props.formData.service_types && props.formData.service_types.includes(item._id)}
                                    onChange={(e) => {
                                      try {
                                        const { name, checked } = e.target
                                        props.setFormData((prevData) => ({
                                          ...prevData,
                                          service_types: checked ? [...prevData.service_types, item._id] : prevData.service_types.filter((id) => id !== item._id),
                                        }));
                                      } catch (error) {
                                        console.log(error)
                                      }
                                    }}
                                    name="service_types"
                                    className="custom-control-input create-booking"

                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="manage_sub_users"
                                  />
                                </div>
                              </td>
                            </tr>
                          ))
                          }


                        </tbody>
                      </table>
                    </div>
                  </>


                }
              </div>
            </div>

          )}
        </form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            props.handleClose()
            props.handleSubmit()
          }}>

            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UsersData;
