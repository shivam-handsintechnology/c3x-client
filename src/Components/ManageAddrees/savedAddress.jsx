import React, { useEffect, useState } from "react";
import { useGetAddressDataQuery, usePostUpdateAddressDataMutation, usePostAddressDataMutation, usePostCityListMutation, usePostDeleteAddressDataMutation, useGetCountryMasterQuery, } from "../../service/apiServices";
import useFormSubmission from "../../hooks/useFormSubmission";
import UsePagination from "../../hooks/UsePagination";
import Loader from "../../heplers/Loaders/Loader";
import { getcountryNameByCode } from "../../heplers/DateValidator";
import { Button, Modal } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { toast } from "react-toastify";
const SavedAddress = (props) => {
  const [visibleAddresses, setVisibleAddresses] = useState([]);
  const [addressesToShow, setAddressesToShow] = useState(1); // Initially, show 5 addresses
  const [AAddresFormData, setAddressFormData] = useState({ title: "", company_name: "", address_line_1: "", address_line_2: "", phone_number: "", Country: "AE", City: "", ZipCode: "", telephone_number: "", Origin: "" })
  const [selectedAddress, setSelectedAddress] = useState({
    id: null,
    name: "Add",
  });

  const [isAvailable, setIsAvailable] = useState(false);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [show, setShow] = useState(false);
  const [IsDelete, setIsDelete] = useState(null);
  const [mutate] = usePostDeleteAddressDataMutation();
  const [mutateAdd] = usePostAddressDataMutation();
  const [mutateUpdate] = usePostUpdateAddressDataMutation();
  const { Data, setFormData, formData, errors, handleSubmit, handleChange } =
    useFormSubmission(usePostUpdateAddressDataMutation, {});
  const CountryMaster = useGetCountryMasterQuery("");
  const CityHandle = useFormSubmission(usePostCityListMutation, {
    Country:
      selectedAddress && selectedAddress.name == "Edit"
        ? formData.Country
        : AAddresFormData.Country,
  });

  const { pageComponent, setNumberOfPages, pageNumber, itemsPerPage } = UsePagination();
  const { data, error, isLoading, refetch } = useGetAddressDataQuery({
    search,
    page: pageNumber,
    limit,
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteUser = async (item) => {
    try {
      const res = await mutate(item).unwrap();
      console.log(res)
      setIsDelete(res);
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddressSubmit = async (e) => {
    try {
      const res = await mutateAdd(AAddresFormData).unwrap();
      console.log(res)
      setIsDelete(res);
      handleClose()
    } catch (error) {
      console.error("error >>>>>", error.data);
      toast.error(error?.data?.message)
    }
  };
  const UpdateAddress = (name, value, id) => {
    setFormData((prev) => {
      const { Active, ...rest } = prev;
      return {
        ...rest,
        _id: id,
        [name]: value,
      };
    });
  };
  const handleChangeAddress = (name, value) => {
    setAddressFormData((prev) => ({ ...prev, [name]: value }));
  };
  const startIndex = (pageNumber - 1) * limit;
  useEffect(() => {
    CityHandle.setFormData({
      Country:
        selectedAddress && selectedAddress.name == "Edit"
          ? formData.Country
          : AAddresFormData.Country,
    });
  }, [formData.Country, AAddresFormData.Country]);
  useEffect(() => {
    CityHandle.handleSubmit();
  }, [CityHandle.formData.Country]);
  useEffect(() => {
    refetch();
  }, [Data, IsDelete, search]);
  useEffect(() => {
    if (data) {
      setNumberOfPages(Math.ceil(data.data.totalpages));
      // Update visibleAddresses to show only the first 'addressesToShow' addresses
      console.log("addressesToShow", data.data.Address.length)
      setVisibleAddresses(addressesToShow >= data.data.Address.length ? data.data.Address : data.data.Address.slice(0, addressesToShow));
      // setSelectedAddress({
      //   id:
      //     data.data.Address.length > 0 &&
      //     data.data.Address[0]["_id"],
      //   name: "Edit",
      // });
      // if (data.data.Address.length > 0) {
      //   let UseAddress = data.data.Address[0]
      //   if (window.location.pathname === "/Schedulepickupbooking") {
      //     props.setFormData((prevFormData) => ({
      //       ...prevFormData,
      //       BookingData: {
      //         ...prevFormData.BookingData,
      //         ProductType: UseAddress.ProductType,
      //         ShipmentType: UseAddress.ShipmentType,
      //         ServiceType: UseAddress.ServiceType,
      //         SendersAddress1: UseAddress.address_line_1,
      //         SendersAddress2: UseAddress.address_line_2,
      //         SendersCity: UseAddress.City,
      //         SendersPinCode: UseAddress.ZipCode,
      //         SendersCountry: UseAddress.Country ? UseAddress.Country : "AE",
      //         SendersPhone: UseAddress.phone_number,
      //         SendersMobile: UseAddress.telephone_number,
      //         BookingCreatedBy: props.user.AccountNo,
      //         SendersEmail: UseAddress.SendersEmail,
      //         SendersCompany: UseAddress.company_name,
      //         SendersContactPerson: UseAddress.SendersContactPerson,
      //         BookingAddress1: UseAddress.address_line_1,
      //         BookingAddress2: UseAddress.address_line_2,
      //         BookingCity: UseAddress.City,
      //         BookingPinCode: UseAddress.ZipCode,
      //         BookingCountry: UseAddress.Country ? UseAddress.Country : "AE",
      //         BookingPhone: UseAddress.telephone_number,
      //         BookingMobile: UseAddress.phone_number,
      //         BookingEmail: UseAddress.SendersEmail,
      //         BookingCompanyName: UseAddress.company_name,
      //         BookingContactPerson: UseAddress.SendersContactPerson,
      //         Origin: UseAddress.Origin,

      //       },
      //     }));

      //   } else {
      //     props.setFormData((prevFormData) => ({
      //       ...prevFormData,
      //       AirwayBillData: {
      //         ...prevFormData.AirwayBillData,

      //         SendersAddress1:
      //           UseAddress.address_line_1,
      //         SendersAddress2:
      //           UseAddress.address_line_2,
      //         SendersCity: UseAddress.City,
      //         SendersPinCode: UseAddress.ZipCode,
      //         SendersCountry: UseAddress.Country,
      //         SendersPhone:
      //           UseAddress.phone_number,
      //         SendersMobile: UseAddress.telephone_number,
      //         SendersCompany: UseAddress.company_name,
      //         SendersEmail: UseAddress.SendersEmail,
      //         Origin: UseAddress.Origin,
      //         SendersContactPerson: UseAddress.SendersContactPerson ? UseAddress.SendersContactPerson : "",
      //       },
      //     }));
      //   }
      // }
    }
  }, [data, addressesToShow]);
  console.log("PropsFormdata", props.formData)
  return (
    <>
      <div
        aria-label="Select a delivery address "
        className="a-section deliverydelivery"
        role="form"
      >
        <div className="a-row a-spacing-small">
          <div className="a-column a-span10">
            <h3 className="a-color-state">
              <span className="a-letter-space" />
              Select a sender address
            </h3>
          </div>
        </div>
        <div className="a-fixed-left-grid">
          <div className="a-fixed-left-grid-inner" style={{ paddingLeft: 35 }}>
            <div
              className="a-fixed-left-grid-col a-col-right"
              style={{ paddingLeft: "0%", float: "left" }}
            >
              <div className="a-row a-spacing-none">
                <div className="a-box-group a-spacing-small">
                  <div className="a-box">
                    <div className="a-box-inner">
                      {isLoading ? (
                        <Loader />
                      ) : data && data.data.Address && data.data.Address.length > 0 ? (
                        visibleAddresses.map((item) => (
                          <fieldset>
                            <div className="a-row address-row list-address-selected">
                              <span className="a-declarative">
                                <div className="a-radio">
                                  <label>
                                    <input
                                      type="radio"
                                      name="submissionURL"
                                      onChange={() => {
                                        setSelectedAddress({
                                          id: item._id,
                                          name: "Edit",
                                        });
                                      }}
                                      checked={
                                        selectedAddress &&
                                          selectedAddress.id == item._id
                                          ? true
                                          : false
                                      }
                                    />
                                    <i className="a-icon a-icon-radio" />
                                    <span className="a-label a-radio-label">
                                      <span className="a-text-bold">
                                        {" "}
                                        <span className="break-word">
                                          {" "}
                                          {item.SendersContactPerson}{" "}
                                        </span>{" "}
                                      </span>
                                      <span className="break-word">
                                        {item.address_line_1 +
                                          item.address_line_2 +
                                          ", " +
                                          item.ZipCode ? item.ZipCode : "" +
                                          ", " +
                                          item.City +
                                          ", " +
                                        getcountryNameByCode(item.Country)}
                                      </span>
                                      <span className="address-edit-link">
                                        <span className="a-declarative">
                                          {" "}
                                          <abbr
                                            className="a-link-normal"
                                            onClick={() => {
                                              handleShow();
                                              setFormData(item);
                                            }}
                                          >
                                            {" "}
                                            Edit address{" "}
                                          </abbr>{" "}
                                          <span className="a-declarative" />{" "}
                                        </span>

                                      </span>

                                    </span>
                                  </label>
                                </div>
                              </span>
                              <div className="address-edit-link">
                                <a onClick={() => deleteUser(item)} className="btn btn-danger">
                                  Delete
                                </a>
                              </div>

                            </div>
                          </fieldset>
                        ))
                      ) : (
                        <></>
                      )}
                      <div className="a-row a-spacing-extra-large addressbook-footer">
                        {data && data.data.Address && data.data.Address.length > 0 &&
                          <span className="a-declarative">
                            {/* ... */}
                            <button
                              disabled={addressesToShow === data && data.data.Address && data.data.Address.length}
                              onClick={() => addressesToShow > data && data.data.Address && data.data.Address.length ? null : setAddressesToShow(addressesToShow + 1)} // Show 5 more addresses on each click
                              className="bg-blue mr-5"
                              type="button"
                            >
                              See  More
                            </button>
                            <button
                              disabled={addressesToShow === 1}
                              onClick={() => {
                                addressesToShow === 1 ? null :
                                  setAddressesToShow(addressesToShow - 1)

                              }} // Show 5 more addresses on each click
                              className="bg-blue"
                              type="button"
                            >
                              less More
                            </button>
                          </span>
                        }

                      </div>

                      <div className="a-row a-spacing-extra-large addressbook-footer">
                        <span className="a-declarative">
                          <img
                            alt=""
                            src="https://m.media-amazon.com/images/G/31/checkout/assets/addAddress._CB454652023_.png"
                            className="add-address-image cursor-pointer"
                          />
                          <a
                            id="add-new-address-popover-link"
                            className="a-size-base a-link-normal"
                            href="#"
                            onClick={() => {
                              setSelectedAddress({ id: null, name: "Add" });
                              handleShow();
                            }}
                          >
                            Add a new address
                          </a>
                          <span className="a-declarative" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="a-box a-box-title">
                    <div className="a-box-inner">
                      <span
                        id="shipToThisAddressButton"
                        className="a-button a-button-primary primary-action-button"
                      >
                        <span className="a-button-inner">
                          <span
                            id="shipToThisAddressButton-announce"
                            className="a-button-text a-text-center"
                            onClick={() => {
                              if (!selectedAddress.id) {
                                toast.error("Please select address");
                              } else {
                                console.log("selectedAddress", data.data.Address, selectedAddress.id)
                                if (
                                  data.data.Address &&
                                  data.data.Address.length > 0
                                ) {
                                  let UseAddress = data.data.Address.find(
                                    (item) => item._id == selectedAddress.id
                                  );
                                  console.log({ UseAddress })
                                  if (window.location.pathname === "/Schedulepickupbooking") {
                                    props.setFormData((prevFormData) => ({
                                      BookingData: {
                                        ...prevFormData.BookingData,
                                        SendersAddress1: UseAddress.address_line_1 ? UseAddress.address_line_1 : "",
                                        SendersAddress2: UseAddress.address_line_2 ? UseAddress.address_line_2 : "",
                                        SendersCity: UseAddress.City,
                                        Origin: UseAddress.Origin ? UseAddress.Origin : "",
                                        SendersPinCode: UseAddress.ZipCode ? UseAddress.ZipCode : "",
                                        SendersCountry: UseAddress.Country ? UseAddress.Country : "AE",
                                        SendersPhone: UseAddress.telephone_number ? UseAddress.telephone_number : "",
                                        SendersMobile: UseAddress.phone_number ? UseAddress.phone_number : "",
                                        SendersEmail: UseAddress.SendersEmail ? UseAddress.SendersEmail : "",
                                        BookingCreatedBy: props.user.AccountNo,
                                        SendersCompany: UseAddress.company_name ? UseAddress.company_name : "",
                                        SendersContactPerson: UseAddress.SendersContactPerson ? UseAddress.SendersContactPerson : "",
                                        BookingAddress1: UseAddress.address_line_1 ? UseAddress.address_line_1 : "",
                                        BookingAddress2: UseAddress.address_line_2 ? UseAddress.address_line_2 : "",
                                        BookingCity: UseAddress.City ? UseAddress.City : "",
                                        BookingPinCode: UseAddress.ZipCode ? UseAddress.ZipCode : "",
                                        BookingCountry: UseAddress.Country ? UseAddress.Country : "AE",
                                        BookingPhone: UseAddress.telephone_number ? UseAddress.telephone_number : "",
                                        BookingMobile: UseAddress.phone_number ? UseAddress.phone_number : "",
                                        BookingEmail: UseAddress.SendersEmail ? UseAddress.SendersEmail : "",
                                        BookingCompanyName: UseAddress.company_name ? UseAddress.company_name : "",
                                        BookingContactPerson: UseAddress.SendersContactPerson ? UseAddress.SendersContactPerson : "",


                                      },
                                    }));

                                  } else {
                                    props.setFormData((prevFormData) => ({
                                      ...prevFormData,
                                      AirwayBillData: {
                                        ...prevFormData.AirwayBillData,
                                        SendersAddress1:
                                          UseAddress.address_line_1 ? UseAddress.address_line_1 : "",
                                        SendersAddress2:
                                          UseAddress.address_line_2 ? UseAddress.address_line_2 : "",
                                        SendersCity: UseAddress.City ? UseAddress.City : "",
                                        Origin: UseAddress.Origin ? UseAddress.Origin : "",
                                        SendersPinCode: UseAddress.ZipCode ? UseAddress.ZipCode : "",
                                        SendersCountry: UseAddress.Country ? UseAddress.Country : "",
                                        SendersPhone: UseAddress.telephone_number ? UseAddress.telephone_number : "",
                                        SendersMobile: UseAddress.phone_number ? UseAddress.phone_number : "",
                                        SendersCompany: UseAddress.company_name ? UseAddress.company_name : "",

                                        SendersContactPerson: UseAddress.SendersContactPerson ? UseAddress.SendersContactPerson : "",
                                        SendersEmail: UseAddress.SendersEmail ? UseAddress.SendersEmail : "",

                                      },
                                    }));
                                  }
                                }
                              }
                            }}
                          >
                            Use this address
                          </span>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "18px" }}>Edit Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="post" onSubmit={handleSubmit}>
            {formData && (
              <div className="footer_form_outer">
                <label>Name</label>
                <input
                  placeholder={"Name"}
                  name="SendersContactPerson"
                  className="form-control"
                  value={
                    selectedAddress && selectedAddress.name == "Edit"
                      ? formData["SendersContactPerson"]
                      : AAddresFormData["SendersContactPerson"]
                  }
                  onChange={(e) => {
                    selectedAddress && selectedAddress.name == "Edit"
                      ? UpdateAddress(
                        e.target.name,
                        e.target.value,
                        formData._id
                      )
                      : handleChangeAddress(e.target.name, e.target.value);
                  }}
                  autoComplete="off"
                  required=""
                  type="text"
                />
                <label>Company Name</label>
                <input
                  placeholder={"Company Name"}
                  name="company_name"
                  className="form-control"
                  value={
                    selectedAddress && selectedAddress.name == "Edit"
                      ? formData["company_name"]
                      : AAddresFormData["company_name"]
                  }
                  onChange={(e) => {
                    selectedAddress && selectedAddress.name == "Edit"
                      ? UpdateAddress(
                        e.target.name,
                        e.target.value,
                        formData._id
                      )
                      : handleChangeAddress(e.target.name, e.target.value);
                  }}
                  autoComplete="off"
                  required=""
                  type="text"
                />
                <label>Country</label>

                <select
                  name="Country"
                  value={
                    selectedAddress && selectedAddress.name == "Edit"
                      ? formData["Country"]
                      : AAddresFormData["Country"]
                  }
                  onChange={(e) => {
                    selectedAddress && selectedAddress.name == "Edit"
                      ? UpdateAddress(
                        e.target.name,
                        e.target.value,
                        formData._id
                      )
                      : handleChangeAddress(e.target.name, e.target.value);
                  }}
                  className="form-control"
                >
                  <option value={""}>Select Country</option>
                  {!isLoading &&
                    CountryMaster.data &&
                    CountryMaster.data.data.CountryListLocation &&
                    CountryMaster.data.data.CountryListLocation.length > 0 &&
                    CountryMaster.data.data.CountryListLocation.map(
                      (data, index) => (
                        <option value={data.CountryCode}>
                          {data.CountryName}
                        </option>
                      )
                    )}
                </select>
                <label>City</label>
                <select
                  name="City"
                  className="form-control"
                  value={
                    selectedAddress && selectedAddress.name == "Edit"
                      ? formData["City"]
                      : AAddresFormData["City"]
                  }
                  onChange={(e) => {
                    const selectedOption = e.target.options[e.target.selectedIndex]
                    const selectedId = selectedOption.getAttribute("id");
                    if (selectedAddress && selectedAddress.name == "Edit") {
                      UpdateAddress(
                        "Origin",
                        selectedId,
                        formData._id
                      )
                      UpdateAddress(
                        e.target.name,
                        e.target.value,
                        formData._id
                      )
                    }
                    else {
                      handleChangeAddress(e.target.name, e.target.value)
                      handleChangeAddress("Origin", selectedId)
                    }
                  }}
                >
                  <option value={""}>Select City</option>
                  {!CityHandle.errors.loading &&
                    CityHandle.Data &&
                    CityHandle.Data.CityListLocation &&
                    CityHandle.Data.CityListLocation.length > 0 ? (
                    CityHandle.Data.CityListLocation.map((item, index) => (
                      <option value={item.CityName} id={item.CityCode}>
                        {item.CityName}
                      </option>
                    ))
                  ) : (
                    <option value={""}>No City Found</option>
                  )}
                </select>
                <label>Address Line 1</label>
                <input
                  placeholder={"Address Line 1"}
                  name="address_line_1"
                  className="form-control"
                  value={
                    selectedAddress && selectedAddress.name == "Edit"
                      ? formData["address_line_1"]
                      : AAddresFormData["address_line_1"]
                  }
                  onChange={(e) => {
                    selectedAddress && selectedAddress.name == "Edit"
                      ? UpdateAddress(
                        e.target.name,
                        e.target.value,
                        formData._id
                      )
                      : handleChangeAddress(e.target.name, e.target.value);
                  }}
                  autoComplete="off"
                  required=""
                  type="text"
                />
                <label>Address Line 2</label>
                <input
                  placeholder={"Address Line 2"}
                  name="address_line_2"
                  className="form-control"
                  value={
                    selectedAddress && selectedAddress.name == "Edit"
                      ? formData["address_line_2"]
                      : AAddresFormData["address_line_2"]
                  }
                  onChange={(e) => {
                    selectedAddress && selectedAddress.name == "Edit"
                      ? UpdateAddress(
                        e.target.name,
                        e.target.value,
                        formData._id
                      )
                      : handleChangeAddress(e.target.name, e.target.value);
                  }}
                  autoComplete="off"
                  required=""
                  type="text"
                />
                <label>Zip Code</label>
                <input
                  placeholder={"Zip Code"}
                  name="ZipCode"
                  className="form-control"
                  value={
                    selectedAddress && selectedAddress.name == "Edit"
                      ? formData["ZipCode"]
                      : AAddresFormData["ZipCode"]
                  }
                  onChange={(e) => {
                    selectedAddress && selectedAddress.name == "Edit"
                      ? UpdateAddress(
                        e.target.name,
                        e.target.value,
                        formData._id
                      )
                      : handleChangeAddress(e.target.name, e.target.value);
                  }}
                  autoComplete="off"
                  required=""
                  type="text"
                />
                <label>Phone Number</label>

                <PhoneInput
                  // className="form-control"
                  countryCallingCodeEditable={false}
                  placeholder={"Phone Number"}
                  name="phone_number"
                  value={
                    selectedAddress && selectedAddress.name == "Edit"
                      ? formData["phone_number"]
                      : AAddresFormData["phone_number"]
                  }
                  onChange={(e) => {
                    selectedAddress && selectedAddress.name == "Edit"
                      ? UpdateAddress("phone_number", e, formData._id)
                      : handleChangeAddress("phone_number", e);
                  }}
                  international
                  defaultCountry={
                    selectedAddress && selectedAddress.name == "Edit"
                      ? formData["Country"]
                      : AAddresFormData["Country"]
                  }
                />
                <label>Phone Number</label>

                <PhoneInput
                  // className="form-control"
                  placeholder={"Telephone Number"}
                  countryCallingCodeEditable={false}
                  name="telephone_number"
                  value={
                    selectedAddress && selectedAddress.name == "Edit"
                      ? formData["telephone_number"]
                      : AAddresFormData["telephone_number"]
                  }
                  onChange={(e) => {
                    selectedAddress && selectedAddress.name == "Edit"
                      ? UpdateAddress("telephone_number", e, formData._id)
                      : handleChangeAddress("telephone_number", e);
                  }}
                  international
                  defaultCountry={
                    selectedAddress && selectedAddress.name == "Edit"
                      ? formData["Country"]
                      : AAddresFormData["Country"]
                  }
                />
              </div>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={(e) => {

              selectedAddress && selectedAddress.name == "Edit"
                ? handleSubmit() && handleClose()
                : handleAddressSubmit(e);
            }}
          >
            {selectedAddress && selectedAddress.name == "Edit"
              ? "Update"
              : "Add"}
          </Button>
        </Modal.Footer>
      </Modal >
    </>
  );
};

export default SavedAddress;
