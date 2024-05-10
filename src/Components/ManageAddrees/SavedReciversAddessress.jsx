import React, { useEffect, useState } from "react";
import {
  useGetrecieveraddressAddressDataQuery,
  usePostDeleterecieveraddressAddressDataMutation, usePostUpdaterecieveraddressAddressDataMutation
} from "../../service/apiServices";
import UsePagination from "../../hooks/UsePagination";
import Loader from "../../heplers/Loaders/Loader";
import { getcountryNameByCode } from "../../heplers/DateValidator";
const SavedReciversAddessress = (props) => {
  const [visibleAddresses, setVisibleAddresses] = useState([]);
  const [addressesToShow, setAddressesToShow] = useState(1); // Initially, show 5 addresses

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [IsDelete, setIsDelete] = useState(null);
  const [mutate] = usePostDeleterecieveraddressAddressDataMutation();

  const { pageComponent, setNumberOfPages, pageNumber, itemsPerPage } = UsePagination();
  const { data, error, isLoading, refetch } = useGetrecieveraddressAddressDataQuery({
    search,
    page: pageNumber,
    limit,
  });
  useEffect(() => {
    refetch();
  }, [IsDelete, search]);
  useEffect(() => {
    if (data) {
      setNumberOfPages(Math.ceil(data.data.totalpages));
      setVisibleAddresses(addressesToShow >= data.data.Address.length ? data.data.Address : data.data.Address.slice(0, addressesToShow));
      // props.setSelectedAddress({
      //   id:
      //     data.data.Address.length > 0 &&
      //     data.data.Address[0]["_id"],
      //   name: "Edit",
      // });
      // if (data.data.Address.length > 0) {
      //   let UseAddress = data.data.Address[0]
      //   // if (window.location.pathname === "/Schedulepickupbooking") {
      //   //   props.setFormData((prevFormData) => ({
      //   //     ...prevFormData,
      //   //     BookingData: {
      //   //       ...prevFormData.BookingData,
      //   //       ReceiversEmail: UseAddress.ReceiversEmail,
      //   //       ReceiversCompany: UseAddress.company_name,
      //   //       ReceiversCountry: UseAddress.Country,
      //   //       ReceiversCity: UseAddress.City,
      //   //       ReceiversAddress1:
      //   //         UseAddress.address_line_1,
      //   //       ReceiversAddress2:
      //   //         UseAddress.address_line_2,
      //   //       ReceiversPinCode: UseAddress.ZipCode,
      //   //       ReceiversPhone:
      //   //         UseAddress.telephone_number,
      //   //       ReceiversMobile:
      //   //         UseAddress.phone_number,
      //   //       ReceiversContactPerson:
      //   //         UseAddress.ReceiversContactPerson,

      //   //       BookingAddress1: UseAddress.address_line_1,
      //   //       BookingAddress2: UseAddress.address_line_2,
      //   //       BookingCity: UseAddress.City,
      //   //       BookingPinCode: UseAddress.ZipCode,
      //   //       BookingCountry: UseAddress.Country,
      //   //       BookingPhone: UseAddress.telephone_number,
      //   //       BookingMobile: UseAddress.phone_number,
      //   //       BookingEmail: UseAddress.ReceiversEmail,
      //   //       BookingCompanyName: UseAddress.company_name,
      //   //       BookingContactPerson: UseAddress.ReceiversContactPerson,
      //   //     },
      //   //   }));

      //   // } else {
      //   //   props.setFormData((prevFormData) => ({
      //   //     ...prevFormData,
      //   //     AirwayBillData: {
      //   //       ...prevFormData.AirwayBillData,
      //   //       ReceiversEmail: UseAddress.ReceiversEmail,
      //   //       ReceiversCompany: UseAddress.company_name,
      //   //       ReceiversCountry: UseAddress.Country,
      //   //       ReceiversCity: UseAddress.City,
      //   //       Destination: UseAddress.City,
      //   //       Origin: UseAddress.City,
      //   //       ReceiversAddress1:
      //   //         UseAddress.address_line_1,
      //   //       ReceiversAddress2:
      //   //         UseAddress.address_line_2,
      //   //       ReceiversPinCode: UseAddress.ZipCode,
      //   //       ReceiversPhone:
      //   //         UseAddress.telephone_number,
      //   //       ReceiversMobile:
      //   //         UseAddress.phone_number,
      //   //       ReceiversContactPerson:
      //   //         UseAddress.ReceiversContactPerson,
      //   //     },
      //   //   }));
      //   // }
      // }
    }
  }, [data, addressesToShow]);
  const deleteUser = async (item) => {
    try {
      const res = await mutate(item).unwrap();
      // //console.log(res)
      setIsDelete(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        aria-label="Select a delivery address "
        className="a-section"
        role="form"
      >
        <div className="a-row a-spacing-small">
          <div className="a-column a-span10">
            <h3 className="a-color-state">
              <span className="a-letter-space" />
              Select a Reciever address
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
                                        props.setSelectedAddress({
                                          id: item._id,
                                          name: "Edit",
                                        });
                                      }}
                                      checked={
                                        props.selectedAddress &&
                                          props.selectedAddress.id == item._id
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
                                          {item.ReceiversContactPerson}{" "}
                                        </span>{" "}
                                      </span>
                                      <span className="break-word">
                                        {item.address_line_1 +
                                          item.address_line_2 +
                                          ", " +
                                          item.ZipCode?item.ZipCode:"" +
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
                        {
                          data && data.data.Address && data.data.Address.length > 0 && (<span className="a-declarative">
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
                          </span>)
                        }

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
                              if (!props.selectedAddress.id) {
                                toast.error("Please select address");
                              } else {
                                if (
                                  data.data.Address &&
                                  data.data.Address.length > 0
                                ) {
                                  let UseAddress = data.data.Address.find(
                                    (item) => item._id == props.selectedAddress.id
                                  );
                                  //console.log({ UseAddress })
                                  if (window.location.pathname === "/Schedulepickupbooking") {
                                    props.setFormData((prevFormData) => ({
                                      ...prevFormData,
                                      BookingData: {
                                        ...prevFormData.BookingData,
                                        ReceiversCompany: UseAddress.company_name,
                                        ReceiversCountry: UseAddress.Country,
                                        ReceiversCity: UseAddress.City,
                                        ReceiversAddress1:
                                          UseAddress.address_line_1,
                                        ReceiversAddress2:
                                          UseAddress.address_line_2,
                                        ReceiversPinCode: UseAddress.ZipCode,
                                        ReceiversPhone:
                                          UseAddress.telephone_number,
                                        ReceiversMobile:
                                          UseAddress.phone_number,
                                        ReceiversContactPerson:
                                          UseAddress.ReceiversContactPerson,
                                          ReceiversEmail:UseAddress.ReceiversEmail,

                                        BookingAddress1: UseAddress.address_line_1,
                                        BookingAddress2: UseAddress.address_line_2,
                                        BookingCity: UseAddress.City,
                                        Destination: UseAddress.Destination,
                                        BookingPinCode: UseAddress.ZipCode,
                                        BookingCountry: UseAddress.Country,
                                        BookingPhone: UseAddress.telephone_number,
                                        BookingMobile: UseAddress.phone_number,
                                        BookingEmail: UseAddress.ReceiversEmail,
                                        BookingCompanyName: UseAddress.company_name,
                                        BookingContactPerson: UseAddress.ReceiversContactPerson,
                                      },
                                    }));

                                  } else {
                                    props.setFormData((prevFormData) => ({
                                      ...prevFormData,
                                      AirwayBillData: {
                                        ...prevFormData.AirwayBillData,
                                        ReceiversCompany: UseAddress.company_name,
                                        ReceiversCountry: UseAddress.Country,
                                        ReceiversCity: UseAddress.City,
                                        Destination: UseAddress.Destination,
                                        ReceiversAddress1:
                                          UseAddress.address_line_1,
                                        ReceiversAddress2:
                                          UseAddress.address_line_2,
                                        ReceiversPinCode: UseAddress.ZipCode,
                                        ReceiversPhone:
                                          UseAddress.telephone_number,
                                        ReceiversMobile:
                                          UseAddress.phone_number,
                                        ReceiversContactPerson:
                                          UseAddress.ReceiversContactPerson,
                                        // BookingAddress1: UseAddress.address_line_1,
                                        // BookingAddress2: UseAddress.address_line_2,
                                        // BookingCity: UseAddress.City,
                                        // BookingPinCode: UseAddress.ZipCode,
                                        // BookingCountry: UseAddress.Country,
                                        // BookingPhone: UseAddress.telephone_number,
                                        // BookingMobile: UseAddress.phone_number,
                                        // BookingEmail:UseAddress.ReceiversEmail,
                                        // BookingCompanyName: UseAddress.company_name,
                                        // BookingContactPerson: UseAddress.ReceiversContactPerson,
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

    </>
  );
};

export default SavedReciversAddessress;
